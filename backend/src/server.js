import express from "express";
import tasksRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json()); //là middleware để parse (đọc) dữ liệu JSON từ request body. Chuyển đổi JSON string → JavaScript object:
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/tasks", tasksRoute);//à middleware mounting - gắn router vào một đường dẫn gốc (prefix).

// ensure connect with database then server actually run
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server will start on port ${PORT}`);
    });
});


