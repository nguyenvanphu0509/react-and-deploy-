import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"; // thu vien nay cho phep dinh nghia ra nhieu bien the khac nhau cua 1 component

import { cn } from "@/lib/utils"

/*1. Variant (Kiểu hiển thị)

default: Nút chính, màu primary với nền đậm
destructive: Nút nguy hiểm (xóa, hủy), màu đỏ
outline: Nút viền, nền trong suốt có border
secondary: Nút phụ, màu secondary nhạt hơn
ghost: Nút trong suốt, chỉ hiện màu khi hover
link: Nút dạng link, có gạch chân khi hover
gradient: Nút gradient đặc biệt, có hiệu ứng phát sáng và scale

2. Size (Kích thước)
xs: Rất nhỏ (h-6, 24px)
sm: Nhỏ (h-8, 32px)
default: Chuẩn (h-9, 36px)
lg: Lớn (h-10, 40px)
xl: Rất lớn (h-11, 44px)
icon: Vuông cho icon (36x36px)
icon-xs: Icon nhỏ (24x24px)
icon-sm: Icon trung bình (32x32px)
icon-lg: Icon lớn (40x40px)
Component sử dụng class-variance-authority (cva) để quản lý các variants này một cách có tổ chức. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 active:scale-95 border-0"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-11 rounded-md px-8",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
