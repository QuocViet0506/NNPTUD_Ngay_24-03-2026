# HƯỚNG DẪN IMPORT USER TỪ FILE EXCEL

## Bước 1: Cấu hình Mailtrap

1. Truy cập https://mailtrap.io và đăng ký/đăng nhập
2. Vào **Inbox** → **SMTP Settings**
3. Copy **Username** và **Password**
4. Mở file `utils/mailHandler.js` và điền:

```javascript
auth: {
    user: "your_username_here",  // Thay bằng username từ Mailtrap
    pass: "your_password_here",  // Thay bằng password từ Mailtrap
}
```

## Bước 2: Khởi động MongoDB và Server

```bash
# Terminal 1: Khởi động MongoDB
mongod

# Terminal 2: Chạy server
npm start
```

## Bước 3: Tạo Role "user"

Sử dụng Postman:
- Method: **POST**
- URL: `http://localhost:3000/api/v1/roles`
- Body → **raw** → **JSON**:

```json
{
  "name": "user",
  "description": "Normal user role"
}
```

Click **Send**

## Bước 4: Tạo File Excel

Tạo file Excel với cấu trúc:

| username | email |
|----------|-------|
| user001 | user001@example.com |
| user002 | user002@example.com |
| user003 | user003@example.com |

**Lưu ý:**
- Dòng 1: Header (username, email)
- Từ dòng 2 trở đi: Dữ liệu user
- Lưu file với định dạng `.xlsx`

## Bước 5: Import Users

Sử dụng Postman:
- Method: **POST**
- URL: `http://localhost:3000/api/v1/upload/import-users`
- Body → **form-data**
  - KEY: `file` (Type: **File**)
  - VALUE: Chọn file Excel vừa tạo

Click **Send**

## Bước 6: Kiểm tra kết quả

### Response sẽ trả về:
```json
{
  "success": true,
  "message": "Import thanh cong 3 users, that bai 0 users",
  "data": {
    "success": [
      {
        "username": "user001",
        "email": "user001@example.com",
        "password": "a1b2c3d4e5f6g7h8"
      }
    ],
    "failed": []
  }
}
```

### Kiểm tra email trên Mailtrap:
1. Vào https://mailtrap.io
2. Mở **Inbox**
3. Xem các email đã gửi
4. Mỗi email sẽ chứa:
   - Username
   - Password (16 ký tự ngẫu nhiên)

## Chức năng

✅ Đọc file Excel (cột 1: username, cột 2: email)
✅ Tạo password ngẫu nhiên 16 ký tự cho mỗi user
✅ Gán role "user" tự động
✅ Gửi email chứa username và password
✅ Kiểm tra trùng lặp username/email
✅ Báo cáo chi tiết thành công/thất bại

## Lưu ý

- Password được hash bằng bcrypt trước khi lưu vào database
- Email được gửi qua Mailtrap (test email service)
- Nếu username hoặc email đã tồn tại, user đó sẽ bị bỏ qua
- Password gốc chỉ hiển thị trong email và response API
