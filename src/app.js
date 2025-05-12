import express from "express";
import cors   from "cors";
import path   from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();

// Reconstruir __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3600;

// ─── Middlewares ─────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static & Views ──────────────────────────────────────────────────────
app.use(
  "/public",
  express.static(path.join(__dirname, "..", "public"))
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// ─── Routes ──────────────────────────────────────────────────────────────
app.use("/", router);

// ─── Start ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor en ejecución: http://127.0.0.1:${PORT}`);
});
