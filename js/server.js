/**
 * @author Anton 
 * @date 29/03/20
 */

//importing required liberires
const msg = require('./constants')
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())
const users = [];

/**
 * GET method
 * This route is for testing perposes only, 
 * in real application we do not use get method 
 * because we do not want to get users data!!
 */
app.get('/register_user',(req, res) => {
    res.json(users)
})
/**
 * POST method for registration section
 * adding new user existing users array
 * @TODO add new users to MONGO_DB
 */
app.post('/register_user',async (req, res) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, msg.SALT_ROUND)        
        const user = { 
            name: req.body.name,
            password: hashed_password
        }
        users.push(user)
        res.status(msg.STAUS_CODE_CREATED).send()
    } catch {
        res.status(res.status(msg.STAUS_CODE_NOT_IMPLEMENTED).send())
    }
})

/**
 * Post method for Application 
 * login section
 * @TODO check security issues
 */
app.post("/login", async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        res.status(400).send(msg.LOGIN_FAIL_MASSAGE)
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send(msg.LOGIN_SUCCESS_MASSAGE)
        } else {
            res.send()
        }

    } catch {
        res.status(msg.STAUS_CODE_INTERNAL_SERVER_ERROR).send()
    }
})

/**
 * Starting server on port 3000
 */
app.listen(msg.SERVER_PORT)