import React from 'react'
import {useState} from "react"
//import { useNavigate } from "react-router-dom"

function Register() {
  //a hook
  //const history = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function registerUser(event){
    //prevents funtion from responding with default values on this page
    //Here because func has a behavior of refishing/redirecting to that 
    //particular page that you have specifeied as an action
    event.preventDefault()
    //fetch fromn the server port which is attached to an api/register route
    //sends reponse from fetch url to the backend
    const response = await fetch("http://localhost:1337/api/register ",{
      //you need a method to execute fetch
      method : "POST",
      //tells the backend that the content type sent will be application/json
      headers:{
        "Content-Type": "application/json"
      },
      //pass the body as th following object
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
    const data = await response.json()
    //If data.status is ok then it push to login page
    //This checks if the user is trying to register twice with the same name and email. If true, it pushes you
    //to ligin page. It does this by checking status === "ok" which is sent from the backend to the frontend
    //when you login successfully 
    if (data.status === 'ok') {
      window.location.href = "/login"
			//history.push('/login')
		}  
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit ={registerUser}>
        <input
          value = {name}
          onChange = {(e) => setName(e.target.value)}
          type = "text"
          placeholder = "Name"
        /> 
        <br/> 
        <input
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          type = "email"
          placeholder = "Email"
        />
        <br/>
        <input
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          type = "password"
          placeholder = "Password"
        />
        <input type = "submit" value = "Register"/>
      </form>
    </div>
  )
 
}

export default Register