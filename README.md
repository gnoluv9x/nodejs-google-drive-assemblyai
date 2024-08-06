- Nodejs connect to google drive api
- Nodejs speech to text using assemblyAi

### Để lấy refresh token

1. Tạo 1 credential với OAuth client id => client secret và client id
2. Truy cập trang [Oauth playground](https://developers.google.com/oauthplayground)
   - Click cài đặt, tích vào Use your... => nhập client id và secret bên trên
   - Bên trái chọn dịch vụ Drive api sau đó click Authorize url
   - Cấp quyền cho ứng dụng
   - Quay trở lại trang playground click Exchange authorization... => nhận được refresh token và access_token
