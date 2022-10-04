const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const CheckToken = require('./middleware/CheckToken')


app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME
})



app.post("/api/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) throw err

        if (user.length > 0) { // if username that come in has ture
            let access = await bcrypt.compare(password, user[0].password) // compare password from client that eqaul with hash in database

            if (access) {
                let token = jwt.sign({ user_id: user[0].id }, 'secret', { expiresIn: '20m' }) // gen token to keep this in client side and that can use 30 min then can't use this token

                res.json({ token: token })
            } else {
                res.json({ invalid: true })
            }
        } else {
            res.json({ invalid: true })
        }
    })
})

app.post('/api/pin_check', (req, res) => {
    let pin = req.body.pin
    let user_id = req.body.user_id
    console.log(user_id.user_id)

    db.query("SELECT * FROM users WHERE id = ?", [user_id.user_id], (err, rs) => {
        if (err) throw err

        if (rs[0].pin == pin) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    })
})

app.get("/api/user", CheckToken, (req, res) => {
    let encoded = req.user

    console.log("Encoded : ", encoded)

    if (encoded) {
        db.query("SELECT * FROM users WHERE id = ?", [encoded.user_id], (err, rs) => {
            if (err) throw err

            res.json({ payload: rs })
        })
    }
})

app.get("/api/share", CheckToken, (req, res) => {

    let user = req.user


    db.query("SELECT * FROM share WHERE id = ?", [1], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})


app.get("/api/list_users", CheckToken, (req, res) => {
    let user = req.user

    console.log("User : ", user)

    db.query("SELECT * FROM users WHERE id = ?", [user.user_id], (err, user_detail) => {

        if (err) throw err

        db.query("SELECT * FROM users", (err, list_users) => {
            if (err) throw err

            let remove_me_list_user = list_users.filter((item) => {
                return item.id != user_detail[0].id
            })

            res.json(remove_me_list_user)
        })
    })
})


app.post("/api/deposit", CheckToken, (req, res) => {
    let user = req.user
    let deposit_id = req.body.deposit_id
    let amount = req.body.amount
    let date = new Date().toLocaleDateString('th-TH')

    db.query("SELECT * FROM users WHERE username = ?", [deposit_id], (err, user) => {
        if (err) throw err

        if (user.length > 0) {
            db.query("SELECT * FROM share WHERE id = ?", [1], (err, share_detail) => {
                if (err) throw err

                let frequent_money = parseInt(share_detail[0].combine_share) + parseInt(amount)

                db.query("SELECT * FROM transaction WHERE user_id = ? ORDER BY id DESC LIMIT 1", [deposit_id], (err, times) => {
                    if (err) throw err

                    console.log("Times : ", times)


                    db.query("INSERT INTO transaction(user_id, amount, date, frequent_money, times) VALUES (?, ?, ?, ?, ?)", [deposit_id, amount, date, frequent_money, times.length > 0 ? times[0].times + 1 : 1], (err, updateTransaction) => {
                        if (err) throw err

                        db.query("UPDATE share SET combine_share = ?", [parseInt(share_detail[0].combine_share) + parseInt(amount)], (err, updateCombineShare)=>{
                            if(err) throw err

                            res.json({deposit_success: true})
                        })

                    })
                })
            })
        }else{
            res.json({invalid_id: true})
        }
    })
})


app.get('/api/list_share', CheckToken, (req, res)=>{
    let user = req.user

    if(user){
        db.query("SELECT * FROM users WHERE id = ?", [user.user_id], (err, user_detail)=>{
            if(err) throw err

            db.query("SELECT * FROM transaction WHERE user_id = ? ORDER BY times DESC", [user_detail[0].username], (err, userTransaction)=>{
                if(err) throw err

                res.json(userTransaction)
            })

        })
    }
})


app.listen(process.env.OPEN_SERVER_PORT, () => {
    console.log("Server is running on port : ", process.env.OPEN_SERVER_PORT)
})