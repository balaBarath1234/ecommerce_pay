import { Box, InputLabel, TextField } from '@mui/material';
import React from 'react';

const CommonForm = ({formArray,register,errors}) => {
    return (
        <>
        {
            formArray.map((item) => {
                return (
                    <Box key={item.name} sx={{display:"flex",flexDirection:"column"}}>
                        <InputLabel>{item.label}</InputLabel>
                        <TextField size="small" type={item.type} sx={{width:"100%"}}
                            {...register(item.name),item.validation}
                            error={!!errors[item.name]}
                            helperText={errors[item.name]?.message}
                        />
                    </Box>
                )
            })
        }
        </>
    );
}

export default CommonForm;
