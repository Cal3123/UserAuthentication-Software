import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid"


function App() {
return (
    <div style={{padding: '40px'}}>
        <h1>Welcome To Home</h1>
         <Button 
            style={{
            borderRadius: 35,
            backgroundColor: "#21b6ae",
            padding: "18px 36px",
            fontSize: "18px"
            }} 
            variant="contained" color="secondary" href='/login'> Go To Login Page</Button>
        <Button 
            style={{
                borderRadius: 35,
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                fontSize: "18px"
            }}
            variant="contained" color="secondary" href='/register'>Go To Register Page</Button>
    
         <h2>About</h2>
         <h2>A User Authentication Software</h2>
         <h3>The purpose of this software is to allow people without a login information to open an account, and to authenticate users with login information.</h3>
         <h3>Users with valid login information are redirected to a dashboard page/area, and people with invalid login information are denied access</h3>
         <h3>At the dashboard page, each user can update and enter a quote that is made available to only that user and not viewable to no one else</h3>
        {/*
        <Grid item style={{padding: '20px'}}>
        
        <Button 
            style={{
                borderRadius: 35,
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                fontSize: "18px"
            }}
            variant="contained" color="secondary" href='/dashboard'>Go To Dashboard Page</Button>
        </Grid>
        */}
    </div>
    
)
}

export default App