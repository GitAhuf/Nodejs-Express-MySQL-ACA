// src/app.js
import express    from "express";
import cors       from "cors";
import session    from "express-session";
import path       from "path";
import { fileURLToPath } from "url";
import dotenv     from "dotenv";
import router     from "./router.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3600;

// ─── Middlewares Globales ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1) Sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET, // define SESSION_SECRET en .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // en prod con HTTPS true
  })
);

// 2) Hacer session disponible en las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ─── Static & Views ──────────────────────────────────────────────────────
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "public"))
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// ─── Rutas ────────────────────────────────────────────────────────────────
// Aquí ya vendrá el router y con ello el ensureAuth podrá leer req.session
app.use("/", router);

// ─── Levantar servidor ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor en ejecución: http://127.0.0.1:${PORT}`);
});
