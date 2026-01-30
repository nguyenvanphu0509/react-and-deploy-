import { Toaster } from 'sonner'; // if it show error Because it's not in use, it's showing as such. this is eslint lol
import { BrowserRouter, Routes, Route } from 'react-router';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
function App() {

  /*Toaster: Là một Component "thùng chứa". Bạn đặt nó ở file cao nhất của ứng dụng (thường là App.js hoặc main.jsx). Nó đóng vai trò là nơi các thông báo sẽ hiện ra.
  toast: Là một hàm dùng để kích hoạt thông báo.
  Ví dụ: toast('Đã gửi tin nhắn!') 
  
  react-router (Thư viện điều hướng)
Đây là thư viện giúp bạn chia trang web ra thành nhiều đường dẫn khác nhau (URL) mà không làm tải lại trang.
BrowserRouter: Là Component bao bọc toàn bộ ứng dụng. Nó cho phép ứng dụng của bạn giao tiếp với thanh địa chỉ của trình duyệt.
Routes: Giống như một cái "bảng chỉ dẫn". Nó chứa tất cả các lộ trình (Route) mà trang web của bạn có.
Route: Định nghĩa một cặp Đường dẫn - Giao diện.
<Route path='*' element={<NotFound />} /> 
path='*'
là wildcard route (catch-all route) trong React Router - bắt tất cả các đường dẫn không khớp với bất kỳ route nào khác.
*/
  return (
    <>

      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )

}
export default App;
