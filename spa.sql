CREATE DATABASE spa CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;
USE spa;

-- ----------------------------
-- Table structure for servicios
-- ----------------------------
DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `precio` decimal(7, 2) NULL DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imagen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicios
-- ----------------------------
INSERT INTO `servicios` VALUES (1, 'Cuidado facial', 25.00, 'Contamos con diferentes tratamientos enfocados en necesidades, como reducir los efectos visibles de la edad, tratar pigmentaciones, acné y deshidratación.', '/uploads/1687462900194.png');
INSERT INTO `servicios` VALUES (2, 'Masajes', 30.00, 'Terapias profesionales enfocadas en ofrecer al cuerpo y a la mente un estado profundo de bienestar y relajación, contamos con más de 10 técnicas diferentes de masajes.', '/uploads/1687462272546.png');
INSERT INTO `servicios` VALUES (3, 'Cuidado corporal', 35.00, 'Ayudamos a moldear tu cuerpo a través de alternativas no quirúrgicas y relajantes para tratar celulitis, dar firmeza a la piel y reducir medidas, así como envolturas corporales.', '/uploads/1687463495421.png');
INSERT INTO `servicios` VALUES (4, 'Rejuvenecimiento facial', 40.00, 'Te ayudamos a que los años no se te noten ya que con nuestro tratamiento de hiervas y rituales te quitaremos como 100 años de encima', '/uploads/1687463495422.png');

-- ----------------------------
-- Table structure for testimonios
-- ----------------------------
DROP TABLE IF EXISTS `testimonios`;
CREATE TABLE `testimonios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `cliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of testimonios
-- ----------------------------
INSERT INTO `testimonios` VALUES (1, 'Yo siempre acudo a este SPA, la verdad es muy bueno siempre salgo maravillado de aquí, muy buena atención y cuidados.', 'Jhony Araujo');
INSERT INTO `testimonios` VALUES (2, 'Soy un estudiante universitario y a veces siento que el estrés afecta gravemente a mi cuerpo, cuando vengo a Relaxin, siento como si todos los males del mundo desaparecieran y me hace recuperar todas las energías que gasté programando.', 'Sergio Gonzalez');
INSERT INTO `testimonios` VALUES (3, 'Para mí la belleza es presencia, en Relaxin Spa siempre consigo el tratamiento adecuado para resaltar mi belleza.', 'Ariana Perez');

-- ----------------------------
-- Table structure for reservaciones
-- ----------------------------
DROP TABLE IF EXISTS `reservaciones`;
CREATE TABLE `reservaciones`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `servicio_id` int(11) NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `hora` time(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `descripcion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `titulo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imagen` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES (1, '<p>Los <strong>masajes post operatorios</strong> son una técnica terapéutica que se utiliza para ayudar a los pacientes a recuperarse después de una cirugía. Estos masajes pueden ser beneficiosos en la reducción de la inflamación, mejora de la circulación sanguínea, disminución del dolor y la ansiedad, y prevención de cicatrices. En este artículo, comentaremos los diferentes tipos de cirugías que se recomiendan y sus principales beneficios.</p><h2>Tipos de cirugías que benefician del masaje post operatorio</h2><p>El proceso de recuperación de una operación suele ser difícil, por esto, algunos cirujanos suelen recomendar los masajes post operatorios. Los cirujanos que más recomiendan este tipo de prácticas son las cirugías plásticas, ortopédicas y de columna vertebral.</p><h3>Cirugías plásticas</h3><p>Los pacientes de este tipo de procedimientos pueden beneficiarse de estos masajes porque les ayuda a reducir la inflamación, mejorar la circulación sanguínea y aliviar algunas de las molestias intrínsecas de la recuperación post operatoria.</p><h3>Cirugías ortopédicas</h3><p>En las cirugías ortopédicas, los cirujanos buscan que sus pacientes recuperen la movilidad. Por esto, suelen recomendar algunas técnicas de masaje post operatorio, sin embargo, lo más habitual es la fisioterapia y el uso de ultrasonido terapéutico.</p><h3>Cirugías de columna vertebral</h3><p>Para las cirugías de columna vertebral, esta técnica de masajes puede ayudar a aliviar el dolor y mejorar la movilidad de la columna vertebral.</p>', '¿Cómo Pueden Ayudarte En La Recuperación Los Masajes Post Operatorios?', '/uploads/1687650197244.jpg', '2023-06-25');
INSERT INTO `blog` VALUES (2, '<p>Los <strong>masajes para parejas</strong> son el momento perfecto para avivar la llama de la pasión. Entre los beneficios más relevantes se encuentra romper la monotonía. Sin duda, la cotidianeidad y el estrés laboral pueden ser perjudiciales para la intimidad entre parejas. Por ello, en Relaxin contamos con masajes que serán ideales para ti y tu media naranja.</p><h2>Encuentro de dos, una oportunidad de revivir el romance entre parejas</h2><p>En Relaxin contamos con distintos paquetes para nuestros clientes. Nos gusta consentirlas y brindarles experiencias únicas y relajantes, siempre apostando por su bienestar y belleza. Asimismo, contamos con una habitación llamada «Paraíso», cuya finalidad es recibir a dos tortolos dispuestos a poner fin a la monotonía.</p><p>Gracias a esta mágica habitación, podemos ofrecerles una experiencia de intimidad única. Este paquete incluye masajes para parejas, pueden elegir entre nuestros distintos tratamientos y disfrutar del romance en nuestro spa.</p><h2>Masajes para compartir en pareja</h2><p>Regálate un día en el spa para parejas con nuestra oferta de diferentes masajes, como comentamos antes, con el encuentro de dos podrán elegir el tipo de masaje perfecto para compartir. A continuación, te compartimos las opciones más románticas de nuestro catálogo.</p><h3>Momento holístico</h3><p>El momento holístico es un masaje que utiliza los aceites esenciales. Debido a los olores que desprende y la sensación en el cuerpo, es otra opción popular para las parejas que buscan una experiencia de spa romántica. Este tipo de masaje utiliza una combinación de aceites esenciales y técnicas de masaje para ayudar a relajar el cuerpo y la mente.</p><p>Los aceites esenciales se eligen cuidadosamente según las necesidades y preferencias de la pareja. Por ejemplo, algunos aceites esenciales se usan para ayudar a reducir el estrés, mientras que otros se usan para mejorar la circulación o aliviar el dolor muscular.</p><h3>Masajes a la vela</h3><p>Desde el nombre ya podemos intuir que se trata de una experiencia romántica, perfecta para los masajes para parejas. Este masaje consiste en una técnica de masaje única que utiliza cera caliente en lugar de aceite o loción para masajear los músculos. La cera se derrite a una temperatura suave y se aplica directamente sobre la piel.</p><p>Este tipo de masaje es excelente para las parejas que buscan algo un poco diferente. La cera caliente puede ayudar a relajar los músculos y mejorar la circulación. Además, el aroma de la cera puede ser muy relajante y calmante para los sentidos.</p>', 'Los masajes más románticos para vivir en pareja', '/uploads/1687650277742.jpg', '2023-06-24');
INSERT INTO `blog` VALUES (3, '<p>La mesoterapia es un tratamiento de belleza popular. Pero, debido a que consisten en inyectar pequeñas dosis de medicamentos y nutrientes directamente en la piel, no suele ser el tratamiento más buscado.</p><p>Si están interesadas en la mesoterapia, este artículo les ayudará a encontrar cuál de estas dos es la mejor alternativa. Explicaremos las ventajas de la virtual sobre la tradicional y por qué deberían considerar elegir para sus necesidades de cuidado de la piel.</p><h2>¿Qué es la mesoterapia?</h2><p>Antes de profundizar en las diferencias entre la mesoterapia virtual y la tradicional, es importante tener una comprensión básica de lo que es este tratamiento en general.</p><p>La mesoterapia es un tratamiento de belleza que consiste en inyectar pequeñas dosis de medicamentos y nutrientes en la piel para mejorar su apariencia y combatir distintos tipos de problemáticas. Los ingredientes utilizados en la mesoterapia varían según las necesidades del cliente y los objetivos del tratamiento. En general, este tratamiento se utiliza como tratamiento para la celulitis y rejuvenecimiento facial.</p><h2>¿Qué es la mesoterapia virtual?</h2><p>La mesoterapia virtual es una evolución de la forma tradicional. Su diferencia más característica es que utiliza tecnología de microcorrientes para entregar los nutrientes y medicamentos directamente en la piel. Por lo tanto, esta versión virtual no requiere agujas y elimina esa sensación incómoda de los piquetes de las inyecciones.</p><p>Cabe señalar que esta funciona al mejorar la penetración de los medicamentos y nutrientes que normalmente se inyectan en la mesoterapia tradicional. Algunos expertos utilizan este aparato para mejorar los resultados de los faciales en Puebla, ya que su aplicación mejora la permeabilidad de la piel.</p><h2>Ventajas de la mesoterapia virtual sobre la tradicional</h2><p>En resumen, los tratamientos con aparatología suelen tener más beneficios que los inyectables, ya que son menos incómodos y evitan los enrojecimientos. A continuación, repasamos las principales ventajas de la versión virtual de la mesoterapia.</p><h3>Menos invasiva</h3><p>En teoría, la mesoterapia tradicional no es invasiva, ya que consiste en microinyecciones. A pesar de esto, hay muchas personas con fobia a las agujas que se podrían beneficiar de la versión virtual. De ahí que, afirmemos que la mesoterapia con aparatología es menos invasiva que la tradicional.</p>', 'Mesoterapia: ¿Cuál es mejor la virtual o tradicional?', '/uploads/1687655968865.jpg', '2023-06-24');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `correo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'Luis Santiago', 'Luis@Santiago.com', '$2a$08$AoutMhcaROriyrGCzREdD.nCgdLLS2T0ivF5f7s1HVj0D8w1/kekS');
INSERT INTO `usuarios` VALUES (2, 'Jorge Azuaje', 'Jorge@Azj.com', '$2a$08$Ui7UtAym9k3VMtl1uagZGumpveF/y3rOfNE/7nDBYfrbfn1tNZZuG');


SET FOREIGN_KEY_CHECKS = 1;