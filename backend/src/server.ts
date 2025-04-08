import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import siteStatRouter from "./routes/siteStat.routes";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Позволяет работать с JSON в запросах
app.use(cors()); // Разрешаем CORS
app.use(helmet()); // Защищаем API
app.use(morgan("dev")); // Логируем запросы

// Documentation API(Swagger)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", siteStatRouter);

// Тестовый маршрут
app.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
