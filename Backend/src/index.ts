import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swagger.config"; // CORRECTO

// Rutas
import reservasRoutes from "./routes/reservas.routes";
import clientesRoutes from "./routes/clientes.routes";
import serviciosRoutes from "./routes/servicios.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoints
app.use("/api/reservas", reservasRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/servicios", serviciosRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📄 Documentación Swagger: http://localhost:${PORT}/api/docs`);
});
