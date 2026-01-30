import express from "express";
import tasksRoute from "./routes/tasksRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT;

/* dùng để lấy đường dẫn tuyệt đối đến thư mục hiện tại khi sử dụng ES Modules.
Tại sao cần:

Trong CommonJS (require), có sẵn biến __dirname tự động
Trong ES Modules (import), không có __dirname mặc định
Phải tự tạo bằng path.resolve()
Công dụng:

Serve static files (HTML, CSS, JS, images)
Đọc/ghi file với đường dẫn tuyệt đối
Deploy production: serve frontend build từ backend

noi de hieu la : khi code dua vao render, minh dau biet no nam o thu muc nao o server dau
*/
const __dirname = path.resolve();

const app = express();
app.use(express.json()); //là middleware để parse (đọc) dữ liệu JSON từ request body. Chuyển đổi JSON string → JavaScript object:
if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use("/api/tasks", tasksRoute);//à middleware mounting - gắn router vào một đường dẫn gốc (prefix).


if (process.env.NODE_ENV === "production") {
    // express.static yeu cau lay tat ca file tinh gui cho ngdung khi ho truy cap
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // voi bat ky url nao nguoi dung go vao trinh duyet backend se luon tra ve trang index nay de react router tu dieu huong tiep theo
    app.use((req, res) => {
        // ghep duong dan thu muc hien tai voi page index.html 
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}
// ensure connect with database then server actually run
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server will start on port ${PORT}`);
    });
});


