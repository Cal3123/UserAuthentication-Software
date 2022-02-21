import {useState} from "react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function loginUser(event){
    //prevents funtion from responding with default values on this page
    //Here because func has a behavior of refishing/redirecting to that 
    //particular page that you have specifeied as an action
    event.preventDefault()
    //fetch fromn the server port which is attached to an api/register route
    //sends reponse from fetch url
    const response = await fetch("http://localhost:1337/api/login ",{
      //you need a method to execute fetch
      method : "POST",
      //tells the backend that the content type sent will be application/json
      headers:{
        "Content-Type": "application/json"
      },
      //pass the body as th following object
      body: JSON.stringify({
        email,
        password
      }),
    })
    const data = await response.json()

    //This is a messsage if user is valid
		if (data.user) {
      //stores token once user
		  localStorage.setItem('token', data.user)
			alert('Login successful')
      //this rediects back to '/quote' if login is successful
			window.location.href = "/dashboard"
		} else {
			alert('Please check your username and password')
		}    
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit ={loginUser}>
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
        <br/>
        <input
          type = "submit"
          value = "Login"
        />
      </form>
    </div>
  )
 
}

export default Login