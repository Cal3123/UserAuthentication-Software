import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
//import { useNavigate } from 'react-router-dom'
//import { useNavigate } from "@reach/router"

const Dashboard = () => {
     
    //const navigate = useNavigate();
	const [quote, setQuote] = useState('')
	const [tempQuote, setTempQuote] = useState('')

	async function populateQuote() {
		const req = await fetch('http://localhost:1337/api/quote', {    
			headers: {
                //including this in the headers x-access-token, instead of cookies
				'x-access-token': localStorage.getItem('token'),
			},
		})

        //Once we have the quote with us 
		const data = await req.json()
        //Once our data.status is ok then we 
		if (data.status === 'ok') {
			setQuote(data.quote)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
        //gets token which have been stored on local storage from server side when you login
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
            //if user does not exist  
            //take the following action
			if (!user) {
                //removes
				localStorage.removeItem('token')
                //redirects you back to login page
				window.location.href = "/login"
				//navigate('/dashboard', { replace: true })
			} else {
				populateQuote()
			}
        }
    }, [])
	

    //What this function will do is , it will set the same updateQuote but this time will be the backend
	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:1337/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setQuote(tempQuote)
			setTempQuote('')
		} else {
			alert(data.error)
		}
	}

    //provides the user an inteface to set the quote as well
	return (
		<div>
			<h1>Your quote: {quote || 'No quote found'}</h1>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
		</div>
	)
}
export default Dashboard