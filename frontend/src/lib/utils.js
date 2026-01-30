import { clsx } from "clsx"; // giup viet lop co dieu kien gon hon
import { twMerge } from "tailwind-merge" // xy ly xung dot khi merge nhieu class taiwind lai voi nhau, vi du nhu nut button cua shadcn ben trong button da co taiwindcss default roi, gio minh tu syte lai va no se merge hoac trung thi se ghi de no

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
