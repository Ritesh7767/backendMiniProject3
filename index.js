const express = require("express");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const path = require("path")
const connectDB = require('./db/connectDB')
const bcrypt = require("bcrypt")
const User = require('./model/userSchema')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/create', (req,res) => {
    const {username, email , password} = req.body
    bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            let user = await User.create({username, email, password : hash})
            const token = jwt.sign({email}, "ritesh")
            console.log(token)
            res.cookie("token", token )
            res.send(user)
        })
    })
})

app.get('/read', async (req,res) => {
    let users = await User.find()
    res.send(users)
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/verifyUser', async (req, res) => {
    const {email, password} = req.body
    let user = await User.findOne({email : email})
    if(user){
        let isMath = await bcrypt.compare(password, user.password)
        if(isMath) res.redirect("/product")
        else res.send("Email or password is incorrect")
    }
    else{
        res.send("Email or password is incorrect")
    }
})

app.get('/product' , (req,res) => {
    res.render('product')
})

app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect('/')
})

app.listen(3000)