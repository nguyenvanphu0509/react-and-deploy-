import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import api from '@/lib/axios'
import { toast } from 'sonner'

const AddTask = ({ handleNewTaskAdd }) => {
    const [newTaskTitle, setnewTaskTitle] = useState("");
    const addTask = async () => {
        if (newTaskTitle.trim()) {  // kiem tra chuoi rong hay khong, cat bot khong trang
            try {
                //axios.post(url, data, config)

                await api.post("/tasks", { title: newTaskTitle });
                toast.success(`nhiem vu ${newTaskTitle} duoc them vao thanh cong `);
                handleNewTaskAdd(); // thong bao voi component cha la ng dung moi tao nhiem vu moi va de render lai
            } catch (error) {
                console.log("loi xay ra khi them nhiem vu moi ", error);
                toast.error("loi xay ra khi them nhiem vu moi. ");
            }
            setnewTaskTitle(""); // them xong thi gan bang empty de sau dung lai nua
        } else {
            toast.error("ban can nhap noi dung cua nhiem vu ");
        }
    };
    // event (moi khi 1 su kien xay ra react se tu dong truyen 1 doi tuong dai dien cho su kien do vao ham handle  )
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    }
    //disabled={!newTaskTitle.trim()} cai nay la no style trong button roi nhe, no tu style opacity mo di 50 va khong the kich vao duoc disabled:pointer-events-none - Vô hiệu hóa mọi sự kiện click/hover
    return (
        <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
            <div className='flex flex-col gap-3 sm:flex-row'>
                {/* ring is lop vong bao ben ngoai border 
                value: la html thuan co
                onChange la cua react, con onchange cua html thuan, tuong tu voi onKeyPress luon
                tac dung cua tung be: 
                value: hien thi noi dung 
                const [text, setText] = useState("Hello");
                <Input value={text} />  
                → Ô input hiển thị "Hello"
                Công dụng:

                Đồng bộ state với UI
                Tạo "controlled component" (React quản lý giá trị)
                Reset input: setText("") → ô input tự xóa
                
                . onChange - Bắt sự kiện thay đổi
                Chạy mỗi khi user gõ/xóa ký tự.
                onChange={(e) => setText(e.target.value)}
                e.target.value = nội dung mới trong ô input
                Công dụng:

                Cập nhật state theo input
                Validate real-time
                Xử lý data (vd: chuyển thành chữ hoa)

                    onKeyPress:chay khi user bam phim trong o input
                Công dụng:

            Bắt phím Enter để submit
            Chặn ký tự không mong muốn
            Tạo shortcut (Ctrl+S, Esc...)
                */}

                <Input
                    type="text"
                    placeholder="can phai lam gi?"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle} // control content display in box 
                    onChange={(even) => setnewTaskTitle(even.target.value)} // cap nhat state theo dung noi dung thay doi
                    onKeyPress={handleKeyPress} // no se chay khi user go phim trong o input
                />
                <Button
                    variant='gradient'
                    size='xl'
                    className="px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className='size-5' /> Them
                </Button>
            </div>
        </Card>
    )
}

export default AddTask