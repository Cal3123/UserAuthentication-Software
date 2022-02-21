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
    
    </div>
    
)
}

export default App