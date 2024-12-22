const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./Models/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());

//conncting to mongoDB
mongoose.connect(process.env.MONGO_URL);    

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

app.get('/test',(req,res)=>{
    res.json('test ok')
})

const jwtSecret = '7834iuegnjrgu4y8u34ynerh8u9y4wnjn';
// Registration part
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json({ id: userDoc.id, name: userDoc.name, email: userDoc.email });
    } catch (error) {
        console.error(error);
        res.status(422).json({ error: 'Failed to register user' });
    }
});

// Login part
app.post('/login',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                 if(err) throw err;
                 res.cookie('token',token).json(userDoc);
            });
        }else{
            res.status(422).json("pass not ok");
        }
    }else{
        res.json('oops! no user exists');
    }
})
app.listen(4000);