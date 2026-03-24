const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "ea1570d8b02b30",
        pass: "0bec1012c923f8",
    },
});

async function testEmail() {
    try {
        const info = await transporter.sendMail({
            from: 'Admin@test.com',
            to: 'test@example.com',
            subject: "Test Email",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Test Email</h2>
                    <p>This is a test email from Node.js</p>
                    <p><strong>Username:</strong> testuser</p>
                    <p><strong>Password:</strong> abc123def456</p>
                </div>
            `
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

testEmail();
