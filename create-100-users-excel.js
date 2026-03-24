const ExcelJS = require('exceljs');

async function create100UsersExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Header
    worksheet.columns = [
        { header: 'username', key: 'username', width: 20 },
        { header: 'email', key: 'email', width: 30 }
    ];

    // Tạo 100 users
    for (let i = 1; i <= 100; i++) {
        worksheet.addRow({
            username: `user${String(i).padStart(3, '0')}`,
            email: `user${String(i).padStart(3, '0')}@example.com`
        });
    }

    // Lưu file
    await workbook.xlsx.writeFile('100_users.xlsx');
    console.log('Đã tạo file 100_users.xlsx với 100 users!');
}

create100UsersExcel();
