let userModel = require("../schemas/users");
let roleModel = require("../schemas/roles");
let ExcelJS = require('exceljs');
let crypto = require('crypto');
let mailHandler = require('../utils/mailHandler');

// Tạo password ngẫu nhiên 16 ký tự
function generatePassword() {
    return crypto.randomBytes(8).toString('hex'); // 16 ký tự hex
}

module.exports = {
    ImportUsersFromExcel: async function (filePath) {
        try {
            // Đọc file Excel
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(filePath);
            const worksheet = workbook.worksheets[0];

            // Tìm role "user"
            let userRole = await roleModel.findOne({ name: "user", isDeleted: false });
            if (!userRole) {
                throw new Error("Role 'user' khong ton tai. Vui long tao role 'user' truoc.");
            }

            let results = {
                success: [],
                failed: []
            };

            // Bỏ qua dòng header (dòng 1)
            for (let i = 2; i <= worksheet.rowCount; i++) {
                const row = worksheet.getRow(i);
                
                try {
                    let username = row.getCell(1).value;
                    let email = row.getCell(2).value;

                    // Bỏ qua dòng trống
                    if (!username || !email) {
                        continue;
                    }

                    // Chuyển sang string nếu cần
                    username = String(username).trim();
                    email = String(email).trim();

                    // Kiểm tra user đã tồn tại
                    let existingUser = await userModel.findOne({
                        $or: [{ username: username }, { email: email }],
                        isDeleted: false
                    });

                    if (existingUser) {
                        results.failed.push({
                            username: username,
                            email: email,
                            reason: "Username hoac email da ton tai"
                        });
                        continue;
                    }

                    // Tạo password ngẫu nhiên 16 ký tự
                    let password = generatePassword();

                    // Tạo user mới
                    let newUser = new userModel({
                        username: username,
                        email: email,
                        password: password,
                        role: userRole._id,
                        status: true
                    });

                    await newUser.save();

                    // Gửi email
                    try {
                        await mailHandler.sendMailWithPassword(email, username, password);
                        results.success.push({
                            username: username,
                            email: email,
                            password: password
                        });
                    } catch (emailError) {
                        results.success.push({
                            username: username,
                            email: email,
                            password: password,
                            emailStatus: "Loi gui email: " + emailError.message
                        });
                    }

                } catch (error) {
                    results.failed.push({
                        row: i,
                        reason: error.message
                    });
                }
            }

            return results;

        } catch (error) {
            throw error;
        }
    }
}
