//MERN
//Development = Node.js server + React server
//MEN
//E-Express


const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const app = express()
//set policy for the local develoment path
//you need to add CORS pack to access server url because Browsers are weired and require security measures
//however if you running frontend on same port as serve you won't require CORS
//Why? node.js will solve the problem
const cors = require("cors")
//In order to add authentication we add jsonwebtoken, it will allows us to sign jwebtokens and retrieve them and 
//basically work with them
const jwt = require("jsonwebtoken")
const User = require("./models/user.model")
//cors is a middleware.Middleware is a function which manipualtes the response, and paas it to the next fuction
//It sets the correct headers on the response so that the browser allos you to communicate with clause/ url origin
//because they are different host
app.use(cors())
//we are passing in express.json or .json body from the frontend
//this is to let express know that we are going to be using json in order to pass the body 
//this tells express to pass anything that comes as body into json and also populate the body in he first place
//express.json is a middleware
app.use(express.json())
//specifies a connection string npm i --save-dev dotenv
mongoose.connect("mongodb://localhost:27017/userAuthentication", {useNewUrlParser: true})
const db = mongoose.connection //db variable is created so that we can log if we are / are not connected to our database.
db.on("error", error => console.error (error)) //prints out error if we run into an error while connecting to database
db.once("open", () => console.log("Connected to Mongoose")) //runs only one time when we open up our database for the first time



app.post("/api/register", async (req, res) => {
    console.log(req.body)
    try {
        //helps you encrypt your password before storing it
		const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name ,
            email: req.body.email,
            password:  newPassword,
        })
        res.json({status: "ok"})
    } catch (err) {
        //console.log(err)
        res.json({status: "error", error: "Duplicate email"})    
    }
})

app.post("/api/login", async (req, res) => {
    //anywhere you see req.body menaing it is receiving from frontend
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

    //compares login string password with the hash password on database
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	) 

    if(isPasswordValid) {
        //jwt allows as to create a special which only we can create and can allow us to data  mine that hey!
        //this user is legit   
        const token =jwt.sign({
            email: user.email, name: user.name,
        }, "secret123")

        //res.json means it is passing a response to the First parameter url if user login data is found in database
        //sends this token down the url
        return res.json({status: "ok", user: token})
    } else {
        return res.json({status: "error", user: false})
    }
})

app.get('/api/quote', async (req, res) => {
    //because you want to perform authentication first
	const token = req.headers['x-access-token']

	try {
        //saves jwt as verify
        //synchronously verifies if your token is right or not 
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        //campares the email that was found in token and checks if it is in database
		const user = await User.findOne({ email: email })
        //returns quote of the user model
		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        //sets quote from whatever we passed from url
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
        //if it unable to verify token and store it the user model then it says invalid token
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(1337, () => {
    console.log("Server started 1337")
})