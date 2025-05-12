// src/authController.js
import pool   from "./db.js";
import bcrypt from "bcrypt";

export const mostrarLogin = (req, res) => {
  if (req.session?.userId) {
    return res.redirect("/");
  }
  res.render("login", { error: null });
};

export const procesarLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length !== 1) {
      return res.render("login", { error: "Credenciales inválidas" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.render("login", { error: "Credenciales inválidas" });
    }

    // Guardamos ID y email en sesión
    req.session.userId    = user.id;
    req.session.userEmail = user.email;
    return res.redirect("/");
  } catch (err) {
    return res.render("login", { error: "Error interno" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Error al destruir sesión:", err);
    res.redirect("/login");
  });
};
