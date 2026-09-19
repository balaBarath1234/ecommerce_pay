import { Box, InputLabel, TextField } from '@mui/material';
import React from 'react';

const CommonForm = ({formArray}) => {
    return (
        <>
        {
            formArray.map((item) => {
                return (
                    <Box component={"form"}>
                        <InputLabel>{item.name}</InputLabel>
                        <TextField size="small" type={item.type} sx={{width:"100%"}}/>
                    </Box>
                )
            })
        }
        </>
    );
}

export default CommonForm;
