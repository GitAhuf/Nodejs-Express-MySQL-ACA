-- 1) TABLA PARA LOGIN
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2) INSERTAR USUARIO DE PRUEBA
-- Genera el hash con Node/bcrypt, por ejemplo:
--   node -e "console.log(require('bcrypt').hashSync('MiPass123!', 10));"
-- Sustituye el valor de abajo por tu hash real:
INSERT INTO `users` (email, password_hash) VALUES
  ('admin@example.com', '$2b$10$mVyhxiVYJDMVPyCmcFFVIufrbOYGPzPkM3BksorTMAP.ieKpgN6qe');

-- 3) TABLA DE ESTUDIANTES (tu definición original)
DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE `estudiantes` (
  `id_estudiante` int NOT NULL AUTO_INCREMENT,
  `nombre_alumno` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email_alumno` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `curso_alumno` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id_estudiante`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `estudiantes` VALUES
  (35,'Hola','53453go@gmail.com','PHP','2023-12-07'),
  (36,'Carlos x','667567@gmail.com','Python','2023-12-07'),
  (37,'nuevo','n@gmail.com','Python','2023-12-07'),
  (39,'nuevooo','n@gmail.com','PHP','2023-12-07'),
  (40,'nuevodsadasd','1eqwe12311@gmail.com','NodeJS','2023-12-07');
