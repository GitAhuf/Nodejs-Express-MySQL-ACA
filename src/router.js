// src/router.js
import express from "express";
import {
  agregarEstudiante,
  listarEstudiantes,
  eliminarEstudiante,
  actualizarEstudiante,
  obtenerDetallesEstudiante,
  obtenerDetallesEstudianteUpdate,
} from "./estudianteController.js";

import {
  mostrarLogin,
  procesarLogin,
  logout,
} from "./authController.js";

import { ensureAuth } from "./middleware/auth.js";

const router = express.Router();

// ─── RUTAS PÚBLICAS (Login/Logout) ─────────────────────────────

// Mostrar formulario de login
router.get("/login", mostrarLogin);

// Procesar envío de login
router.post("/login", procesarLogin);

// Logout
router.post("/logout", logout);

// ─── PROTECCIÓN: cualquier ruta DEFINIDA A PARTIR DE AQUÍ requiere sesión ─
router.use(ensureAuth);

// ─── Landing (home después del login) ───────────────────────────
router.get("/", (req, res) => {
  res.render("inicio");
});

// ─── CRUD Estudiantes ────────────────────────────────────────────

// Listar
router.get(
  "/Crud-Completo-con-NodeJS-Express-y-MySQL",
  async (req, res) => {
    try {
      const estudiantes = await listarEstudiantes();
      res.render("pages/estudiantes", { estudiantes });
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
);

// Crear
router.post("/estudiantes", async (req, res) => {
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  try {
    await agregarEstudiante({ nombre_alumno, email_alumno, curso_alumno });
    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// Ver detalles
router.get("/detalles/:id", async (req, res) => {
  try {
    const estudiante = await obtenerDetallesEstudiante(req.params.id);
    res.render("pages/detalles_estudiante", { estudiante });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// Formulario de actualización
router.get(
  "/formulario-actualizar-estudiante/:id",
  async (req, res) => {
    try {
      const estudiante =
        await obtenerDetallesEstudianteUpdate(req.params.id);
      res.render("pages/update_estudiante", { estudiante });
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
);

// Actualizar
router.post(
  "/actualizar-estudiante/:id",
  async (req, res) => {
    const { nombre_alumno, email_alumno, curso_alumno } = req.body;
    try {
      await actualizarEstudiante(req.params.id, {
        nombre_alumno,
        email_alumno,
        curso_alumno,
      });
      res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
);

// Borrar
router.post("/borrar-estudiante/:id", async (req, res) => {
  try {
    await eliminarEstudiante(req.params.id);
    res.redirect("/Crud-Completo-con-NodeJS-Express-y-MySQL");
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

export default router;
