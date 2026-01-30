import Task from "../models/Task.js"

//aggregation pipelines
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const newTask = await task.save(); // stored new task in db
        res.status(201).json(newTask);
    } catch (error) {
        console.log("error when call createTask", error);
        res.status(500).json({ message: " error backend system" });
    }

};
export const getAllTasks = async (req, res) => {
    const { filter = 'today' } = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //2025 - 01 -30 00:00
            break;
        }

        case 'week': {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }

        case 'month': {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }

        case 'all':
        default: {
            startDate = null;
        }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        //const tasks = await Task.find().sort({ createdAt: 1 }); // .find la lay toan bo du lieu tu collection task
        // aggregate nhan vao 1 mang cac buoc du lieu, moi phan tu trong mang la 1 doi tuong, moi doi tuong la 1 buoc
        /*Nhớ 5 stage cốt lõi trước:
        $match loc du lieu Giống WHERE trong SQL Nên đặt $match ở đầu pipeline để giảm lượng dữ liệu cần xử lý, giúp truy vấn nhanh hơn.
        $sort sap xep Giống ORDER BY trong SQL.
        $group chon/ bien doi field 
        $project Giống SELECT trong SQL. Dùng để lấy các field mong muốn, ẩn các field không cần thiết, hoặc tạo field mới từ field cũ.
        Giá trị: 1 là hiện, 0 là ẩn.
                $facet:
                Cho phép thực hiện nhiều pipeline con bên trong một stage duy nhất trên cùng một tập dữ liệu đầu vào.
        Ứng dụng phổ biến nhất: Làm phân trang (Pagination). Vừa muốn lấy danh sách dữ liệu của trang đó, vừa muốn đếm tổng số bản ghi.
        $lookup (Join): Dùng để liên kết dữ liệu từ collection khác (Giống LEFT OUTER JOIN).
        */


        const result = await Task.aggregate([
            { $match: query }, // neu la object {}, thi se loc ko co dk => cho tat ca thong qua
            {

                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    // $count: Nhiệm vụ: Đếm số lượng document,count = tên field bên trong (do $count: "count" đặt), cho nay thuc su la no dem status:active do nha

                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completedCount: [{ $match: { status: "complete" } }, { $count: "count" }]

                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completedCount = result[0].completedCount[0]?.count || 0;

        // res.json chi nhan 1 tham so nen phai gom 3 giá trị vào 1 object!
        res.status(200).json({
            tasks,
            activeCount,
            completedCount
        });

    } catch (error) {
        console.log("error when call getAllTasks", error);
        res.status(500).json({ message: "error backend system" });
    }
};

/* req.params.id this is way to take id from url, the next parameter is object want update 
in express allows update a part, while most other framework must update all fields in object because is put, patch must update for a fields, distinguish between put and patch   */
export const updateTasks = async (req, res) => {
    try {
        const { title, status, completeAt } = req.body;
        const updateTask = await Task.findByIdAndUpdate(req.params.id, {
            title,
            status,
            completeAt
        }, { new: true } // completed update it will return value new or if without it, it will return value isn't update
        );
        if (!updateTask) {
            return res.status(404).json({ message: "the mission isn't exist" })
        }
        res.status(200).json(updateTask);
    } catch (error) {
        console.log("error when call updateTasks", error);
        res.status(500).json({ message: " error backend system" });
    }
};
export const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) {
            return res.status(404).json({ message: "the mission isn't exist" })
        }
        res.status(200).json(deleteTask);
    } catch (error) {
        console.log("error when call deleteTasks", error);
        res.status(500).json({ message: " error backend system" });
    }
};

/*2026-01-25T08:12:55.708Z
giai thich:
Phân tích chi tiết:
2026-01-25: Phần ngày tháng (Năm - Tháng - Ngày).
T: Ký tự ngăn cách giữa phần Ngày và phần Giờ (T viết tắt của Time).
08:12:55: Phần thời gian (Giờ : Phút : Giây).
.708: Phần miligiây (1 giây được chia làm 1000 đơn vị, ở đây là 708/1000 giây).
Z: Viết tắt của Zulu Time, hay còn gọi là múi giờ số 0 (UTC / GMT).
2. Tại sao lại có chữ Z (Múi giờ)?
Đây là điểm quan trọng nhất cần lưu ý khi làm việc với Database:
Khi có chữ Z ở cuối, nó hiểu đây là giờ chuẩn quốc tế (UTC+0).
Tại Việt Nam (múi giờ UTC+7): Thời gian thực tế của bạn sẽ nhanh hơn giờ này 7 tiếng.
Ví dụ: Trong chuỗi là 08:12:55, thì giờ Việt Nam tương ứng sẽ là: 15:12:55 (tức 3 giờ chiều ngày 25/01/2026).
*/