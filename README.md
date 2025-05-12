# Node.js CRUD con Express y MySQL (con Docker y Login)

Proyecto de ejemplo que implementa un CRUD completo de “estudiantes” sobre MySQL, con:
- Autenticación básica (email + contraseña hasheada con bcrypt + sesiones)
- Vistas EJS y responsive menu
- Configuración mediante `.env` → cambio automático entre local (Docker) y RDS (AWS)
- Docker multi-stage (Alpine) para imagen de Node ligera (~216 MB)
- Inicialización automática de esquema y datos en MySQL

---

## 📋 Características

- **CRUD** de estudiantes: Listar, Crear, Ver Detalle, Actualizar, Borrar  
- **Login / Logout**: sesión basada en cookies  
- **Docker Compose**:  
  - `docker-compose.yml` → producción (solo app)  
  - `docker-compose.override.yml` → desarrollo (app + MySQL local)  
- **Multi-stage Dockerfile** en Alpine: imagen de producción pequeña  
- **Auto-init SQL**: scripts en `docker-entrypoint-initdb.d/` para tablas `users` y `estudiantes`

---

## 🔧 Prerrequisitos

- [Node.js 20+](https://nodejs.org/)  
- [Docker & Docker Compose](https://docs.docker.com/)  
- (Opcional) Cuenta AWS RDS y AWS CLI configurada  

---

## ⚙️ Instalación local (sin Docker)

1. Clona el repositorio:  
   ```bash
   git clone <tu-repo-url> && cd Nodejs-Express-MySQL-ACA

2. Instala dependencias:
    bash
    Copiar
    Editar
    npm install

3. Crea un archivo .env en raíz, conteniendo:
    PORT=3600
    DB_HOST=db
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=miPassword
    DB_NAME=CrudNodejs
    SESSION_SECRET=unSecretoMuySegurísimo123!

4. (Opcional) Inicializa tu propia base MySQL local o apunta a un RDS cambiando DB_HOST y credenciales.

📂 Estructura de proyecto
    ├── src/
    │   ├── app.js                # Configuración Express, sesiones y router
    │   ├── router.js             # Rutas públicas (login) y protegidas (CRUD)
    │   ├── db.js                 # Pool MySQL (mysql2/promise)
    │   ├── authController.js     # Login / Logout
    │   ├── estudianteController.js
    │   └── middleware/auth.js    # ensureAuth
    ├── views/
    │   ├── includes/             # head.ejs, header.ejs, scripts.ejs
    │   ├── login.ejs
    │   └── pages/                # estudiantes.ejs, detalles_estudiante.ejs, update_estudiante.ejs
    ├── public/                   # imágenes, CSS, JS front
    ├── docker-entrypoint-initdb.d/
    │   └── init.sql             # esquema y datos iniciales
    ├── Dockerfile                # multi-stage Alpine
    ├── docker-compose.yml        # producción (solo app)
    ├── docker-compose.override.yml # desarrollo (app + db)
    ├── .env                      # variables dev
    ├── .env.production           # variables prod (RDS)
    └── package.json

🚀 Modo Desarrollo (Docker)
    # baja todo y limpia volúmenes:
    docker compose down -v --remove-orphans

    # arranca con hot-reload y MySQL local:
    docker compose up --build

    App en http://localhost:3600/
    MySQL en localhost:3307
    Cambios en código se reflejan al instante

🛠️ Modo Producción (Docker + RDS)

1. Asegúrate de tener .env.production con tu endpoint RDS:
    PORT=3600
    DB_HOST=mi-endpoint-rds.xxxxxx.us-east-2.rds.amazonaws.com
    DB_PORT=3306
    DB_USER=adminRDS
    DB_PASSWORD=superSecretoRDS
    DB_NAME=CrudNodejs
    SESSION_SECRET=unSecretoMuySegurísimo123!

2. Solo levanta la app (sin DB local):
    docker compose -f docker-compose.yml up --build -d

    🔐 Credenciales de prueba
    Email: admin@example.com

    Password: la que generaste para el hash en init.sql (por ejemplo MiPass123!)
📦 Comandos útiles
    npm scripts

    npm run dev → ts-node-dev o node --watch src/app.js

    (añade build y start si migras a TS/compilas)

    Docker Compose

    docker compose down -v --remove-orphans

    docker compose up --build (dev)

    docker compose -f docker-compose.yml up --build -d (prod)

    Ver tamaño de imagen
    docker images | grep nodejs-express-mysql-aca-app

🤝 Contribuir

1. Haz fork y crea una rama:
    git checkout -b feature/mi-nueva-funcionalidad
2. Implementa el cambio y haz commit.

3. Abre un Pull Request describiendo tu propuesta.