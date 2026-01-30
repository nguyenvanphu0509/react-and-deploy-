import express from 'express';
import { createTask, deleteTasks, getAllTasks, updateTasks } from "../controllers/taskControllers.js"
// trong javascipt thi import va export co 2 kieu default thi ko can {}, con name thi co can {}
const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);
/*/:id là route parameter (tham số đường dẫn) trong Express.
Cách hoạt động:
:id là placeholder (chỗ trống) để nhận giá trị động từ URL
Khi client gửi request, giá trị ở vị trí này sẽ được lưu vào req.params.id */
router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);

export default router;