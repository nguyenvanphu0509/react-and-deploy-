import AddTask from '@/components/AddTask';
import DataTimeFilter from '@/components/DataTimeFilter';
import Footer from '@/components/Footer';
import Header from '@/components/header';
import StartsAndFilters from '@/components/StartsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListpagination';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios';
import { visibleTaskLimit } from '@/lib/data';

/*space-y-6 là Tailwind CSS class để tạo khoảng cách dọc giữa các phần tử con.
gio dung axios thay cho fetch  */
const HomePage = () => {
    const [taskBuffer, settaskBuffer] = useState([]);
    const [activeCount, setactiveCount] = useState(0);
    const [completedCount, setcompletedCount] = useState(0);
    const [filter, setfilter] = useState();
    const [dataQuery, setdataQuery] = useState("today");
    const [page, setpage] = useState(1);
    /*useState - Lưu trữ dữ liệu
    Chỉ khai báo biến state để lưu tasks
    KHÔNG tự động fetch dữ liệu
    Ban đầu taskBuffer = [] (rỗng)
    useEffect - Tự động gọi API khi load trang
    Tự động gọi fetchTasks() khi trang vừa load
    [] (dependency rỗng) → chỉ chạy 1 lần khi component mount
    Sau khi fetch xong → settaskBuffer(data) → cập nhật state
    Nếu KHÔNG có useEffect:
    Trang load xong → taskBuffer = [] (rỗng mãi)
    Không có dữ liệu hiển thị
    Phải thủ công click button mới gọi API
    Có useEffect:
    Trang load → useEffect tự động gọi API → setState → hiển thị tasks ✅
    Tóm lại:
    
    useState: Chứa dữ liệu
    useEffect: Lấy dữ liệu từ API khi trang load */


    //logic
    const fetchTasks = async () => {
        try {
            // const res = await axios.get("http://localhost:5001/api/tasks");
            const res = await axios.get(`http://localhost:5001/api/tasks?filter=${dataQuery}`);
            console.log("Backend response:", res.data); // debug

            // Backend tra ve object {tasks, activeCount, completedCount}
            settaskBuffer(res.data.tasks);
            setactiveCount(res.data.activeCount);
            setcompletedCount(res.data.completedCount);
        } catch (error) {
            console.log(" loi khi truy suat tasks: ", error);
            toast.error("loi xay ra khi truy suat tasks.");
        }
    };

    // variable loc ra tung status 
    /*filterTask là biến thường (không phải state), nên nó được tính toán lại mỗi khi component re-render (khi taskBuffer hoặc filter thay đổi). se tra ve 1 mang moi dua vao gia tri cua filter */

    const filterTask = taskBuffer.filter((task) => {
        switch (filter) {
            case "active":
                return task.status === "active";
            case "completed":
                return task.status === "complete"
            default:
                return true;
        }
    });

    const visibleTask = filterTask.slice(
        (page - 1) * visibleTaskLimit, page * visibleTaskLimit
    ); // cat mang tu vi tri bat dau den truoc vi tri ket thuc

    const numberPage = Math.ceil(filterTask.length / visibleTaskLimit);

    useEffect(() => {
        fetchTasks();
    }, [dataQuery]);

    useEffect(() => {
        setpage(1)
    }, [filter, dataQuery]);

    // Tu dong quay ve trang truoc neu trang hien tai khong co task
    useEffect(() => {
        if (visibleTask.length === 0 && page > 1) {
            setpage((prev) => prev - 1);
        }
    }, [visibleTask.length, page]);
    const handleTaskChanged = () => {
        fetchTasks();
    }

    // tao 3 ham de di chuyen trang
    const handleNext = () => {
        if (page < numberPage) {
            setpage((prev) => prev + 1);
        }
    };
    const handlePrev = () => {
        if (page > 1) {
            setpage((prev) => prev - 1);
        }
    };
    const handlePageChange = (newpage) => {
        setpage(newpage);
    };


    return (
        <div className="min-h-screen w-full bg-[#fef9f7] relative">
            {/* Warm Soft Coral & Cream */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 160, 146, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 244, 228, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 160, 146, 0.15) 0%, transparent 50%)`,
                }}
            />
            {/* Your Content/Components 
            Khi bạn truyền props từ component cha sang component con, thứ tự ghi các props không quan trọng. Quan trọng là tên (key) của prop phải khớp nhau.*/}

            <div className='container relative z-10 pt-8 mx-auto'>
                <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
                    {/* dau trang */}
                    <Header />
                    {/* tao nhiem vu */}
                    <AddTask handleNewTaskAdd={handleTaskChanged} />
                    {/* thong ke va boc loc */}
                    <StartsAndFilters activeTasksCount={activeCount} completedTasksCount={completedCount} filter={filter}
                        setfilter={setfilter} />
                    {/* danh sach nhiem vu */}
                    <TaskList filteredTask={visibleTask} filter={filter} handleTaskChanged={handleTaskChanged} />
                    {/* phan trang va loc theo date */}
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                        <TaskListPagination page={page} numberPage={numberPage} handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} />
                        <DataTimeFilter dataQuery={dataQuery} setdataQuery={setdataQuery} />
                    </div>
                    {/* chan trang */}
                    <Footer activeTasksCount={activeCount} completedTasksCount={completedCount} />
                </div>
            </div>
        </div>


    )
}

export default HomePage;