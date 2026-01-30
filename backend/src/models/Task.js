import mongoose from 'mongoose';

//mongoose.Schema.Types.ObjectId: Kiểu dữ liệu ID đặc trưng của MongoDB.
/*SchemaType Options (các tùy chọn cấu hình cho kiểu dữ liệu) được Mongoose xây dựng sẵn.
Mongoose chia chúng thành các nhóm chính:
A. Tùy chọn chung (Dùng được cho hầu hết các kiểu):
type: Đây là từ khóa bắt buộc để xác định kiểu dữ liệu của trường đó.
required: Kiểm tra xem dữ liệu có bắt buộc phải có hay không. Nếu bạn viết [true, 'Thông báo lỗi'], Mongoose sẽ tự động trả về thông báo đó nếu thiếu dữ liệu.
default: Giá trị mặc định nếu người dùng không cung cấp (ví dụ: default: Date.now).
unique: Đảm bảo giá trị trong trường này là duy nhất trong toàn bộ Collection (thường dùng cho email, username).
B. Tùy chọn riêng cho String:
trim: Tự động cắt bỏ khoảng trắng thừa ở hai đầu chuỗi (ví dụ: " iphone " -> "iphone").
lowercase: Tự động chuyển tất cả thành chữ thường.
uppercase: Tự động chuyển tất cả thành chữ hoa.
enum: Giới hạn giá trị chỉ được nằm trong một danh sách cho trước (như ví dụ Category của bạn).
C. Tùy chọn riêng cho Number:
min / max: Giới hạn giá trị nhỏ nhất hoặc lớn nhất.
 */
const taskScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true, // have blank in at the begin and end will erase
        },
        status: {
            type: String,
            enum: ["active", "complete"],
            default: "active",
        },
        completeAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true, // createAt va updateAt tu dong them vao
    }
);

/* name of model must capitialize,name of collection is define in file this one:
const Task = mongoose.model("Task", taskScheme);
//                         ^^^^^^ ← Tên này quyết định collection
// Mongoose tự động chuyển đổi:

"Task" (model name) → "tasks" (collection name)
Quy tắc: lowercase + thêm 's' (pluralize)
Nếu muốn đặt tên collection khác (không theo quy tắc tự động):
const Task = mongoose.model("Task", taskScheme, "my_custom_collection");
//                                                ^^^^^^^^^^^^^^^^^^^^^ tên tùy chỉnh  */

const Task = mongoose.model("Task", taskScheme);
export default Task;