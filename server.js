const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dotenv.config();

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const register = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });
        console.log('user registration successfully: ', register);
        return res.status(200).json({
            success: true,
            msg: "registration successfull"
        }) 
    } catch (error) {
        console.error("Error while registering: ", error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    };
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
