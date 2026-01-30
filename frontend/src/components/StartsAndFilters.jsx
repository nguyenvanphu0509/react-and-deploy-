import React from 'react';
import { Badge } from './ui/badge';
import { FilterType } from '@/lib/data';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';

const StartsAndFilters = ({ completedTasksCount = 0, activeTasksCount = 0, filter = "all", setfilter }) => {
    return (
        /*flex-col: Mặc định hiển thị theo chiều dọc (trên mobile)
sm:flex-row: Khi màn hình >= 640px (tablet trở lên) thì chuyển sang chiều ngang
Breakpoints của Tailwind:
Không có prefix → Mobile (< 640px): flex-col ✅ 
Không có prefix → Áp dụng cho tất cả màn hình (bắt đầu từ nhỏ nhất)*/
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            {/* phan thong ke */}
            <div className='flex gap-3'>
                <Badge variant='secondary' className="bg-white/50 text-accent-foreground border-info/20">
                    {activeTasksCount} {FilterType.active}
                </Badge>
                <Badge variant='secondary' className="bg-white/50 text-success border-success/20">
                    {completedTasksCount} {FilterType.completed}
                </Badge>
            </div>
            {/* phan filter */}

            <div className='flex flex-col gap-2 sm:flex-row'>
                {
                    // boi vi FilterType la 1 doi tuong nen phai co Object
                    Object.keys(FilterType).map((type) => (
                        <Button
                            key={type}
                            variant={filter === type ? 'gradient' : 'ghost'}
                            size='sm'
                            className='capitalize'
                            onClick={() => setfilter(type)}
                        >
                            <Filter className='size-4' />
                            {FilterType[type]}
                        </Button>
                    ))
                }
            </div>
        </div>
    )
}

export default StartsAndFilters;