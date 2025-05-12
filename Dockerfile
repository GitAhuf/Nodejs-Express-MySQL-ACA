# Imagen base de Node.js
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos del proyecto
COPY . .

# Exponer el puerto de la aplicación (ajústalo si es diferente)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "dev"]
