const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, phone, query } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'test.test.com',
        port: 2048,
        auth: {
            user: 'test',
            pass: 'test'
        }
    });

    let mailOptions = {
        from: 'mcsam@mcsam.in', // Update to the appropriate sender email
        to: 'your-email@gmail.com', // Update to your receiving email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nQuery: ${query}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
