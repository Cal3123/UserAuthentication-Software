//In order to provide routing on the frontend
//this packege allows us to perform react routing, that means different different pages with 
//the help of client side routing. When we deploy the frontend port into nodejs we still be doing
//client-side routing that will be supported by a server site
//BrowserRouter provides react-router-dom functionality
//Routes are the various frontend routes
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import HomeScreen from './pages/HomeScreen'

const App = () => {
	return (
		<div>
			<BrowserRouter>
                <Routes>
					<Route path="/" element={<HomeScreen/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" elememt={<Register/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App