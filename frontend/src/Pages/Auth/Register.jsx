import React from 'react';
import {Box, Button, InputLabel, TextField, Typography} from "@mui/material"
import {Link} from "react-router-dom"

const Register = () => {
    return (
        <>
        <Box sx={{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"}}>
            <Box component={"form"} sx={{p:3,display:"flex",flexDirection:"column",gap:'10px',width:"400px",border:"2px solid black",borderRadius:"20px"}}>
                <Typography variant='h4'>Register</Typography>
                
                <InputLabel>Name</InputLabel>
                <TextField size='small'/>

                <InputLabel>Email</InputLabel>
                <TextField size='small'/>

                <InputLabel>Password</InputLabel>
                <TextField size='small'/>

                <Button variant='contained' sx={{backgroundColor:"black"}}>Register</Button>

                <Typography>Already Have An Account ? <Link to={"/login"}>Login</Link></Typography>
            </Box>
        </Box>
        </>
    );
}

export default Register;
