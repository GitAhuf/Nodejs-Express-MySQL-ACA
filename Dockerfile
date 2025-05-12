# ─── Etapa de build ─────────────────────────────────────────────
FROM node:20-alpine AS builder

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar definiciones de dependencias
COPY package*.json ./

# Instalar todas las dependencias (dev + prod) para build-time
RUN npm ci

# Copiar el resto del código de la aplicación
COPY . .

# ─── Etapa de producción ───────────────────────────────────────────
FROM node:20-alpine

# Define que estamos en producción
ENV NODE_ENV=production

# Directorio de trabajo
WORKDIR /app

# Copiar solo package.json para producción
COPY --from=builder /app/package*.json ./

# Instalar únicamente dependencias de producción
RUN npm ci --omit=dev

# Copiar artefactos de la aplicación desde la etapa de build
COPY --from=builder /app/src ./src
COPY --from=builder /app/views ./views
COPY --from=builder /app/public ./public

# Puerto en el que escucha tu aplicación
EXPOSE 3600

# Comando para ejecutar la aplicación en producción
CMD ["node", "src/app.js"]
