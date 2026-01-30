import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTask, filter, handleTaskChanged }) => {
    if (!filteredTask || filteredTask.length === 0) {
        return <TaskEmptyState filter={filter} />
    }
    return (
        // tham so truyen vao ham co san nhu .map, .filter, .forEach. thi phai dung (), con truyen trong component goi la props roi, trong ham map se co 3 tham so, tham so dau tien se la phan tu hien tai, phan tu thu hai la index
        <div className='space-y-3'>
            {filteredTask.map((task, index) => (
                <TaskCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                    handleTaskChanged={handleTaskChanged}
                />
            ))}
        </div>
    )
}

export default TaskList;