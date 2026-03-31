const mongoose = require('mongoose');
const userModel = require('./schemas/users');

async function getUserIds() {
    try {
        await mongoose.connect('mongodb://localhost:27017/NNPTUD-S3');
        console.log('Connected to MongoDB');

        const users = await userModel.find({ isDeleted: false }).limit(5);
        
        console.log('\n=== DANH SACH USER IDs ===\n');
        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`);
            console.log(`  ID: ${user._id}`);
            console.log(`  Username: ${user.username}`);
            console.log(`  Email: ${user.email}`);
            console.log('');
        });

        if (users.length >= 2) {
            console.log('=== COPY 2 IDs NAY DE TEST ===');
            console.log(`User 1 ID: ${users[0]._id}`);
            console.log(`User 2 ID: ${users[1]._id}`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getUserIds();
