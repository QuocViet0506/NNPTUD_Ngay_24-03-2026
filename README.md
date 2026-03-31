# NNPTUD_Ngay_24-03-2026

## Chức năng đã hoàn thành

### 1. Upload File
- Upload 1 ảnh: `POST /api/v1/upload/an_image`
- Upload nhiều ảnh: `POST /api/v1/upload/multiple_images`
- Upload Excel: `POST /api/v1/upload/excel`

### 2. Import Users từ Excel
- Endpoint: `POST /api/v1/upload/import-users`
- Tự động tạo password random 16 ký tự
- Gán role "user"
- Gửi email chứa username và password qua Mailtrap

### 3. Xem file đã upload
- `GET /uploads/:filename`

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

```bash
npm start
```

## Cấu hình

- MongoDB: `mongodb://localhost:27017/NNPTUD-S3`
- Port: 3000
- Mailtrap: Cấu hình trong `utils/mailHandler.js`
