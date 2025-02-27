import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Позволяет работать с JSON в запросах
app.use(cors()); // Разрешаем CORS
app.use(helmet()); // Защищаем API
app.use(morgan("dev")); // Логируем запросы

// Тестовый маршрут
app.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
