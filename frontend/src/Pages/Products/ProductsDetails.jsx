import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { Alert, Box, Button, CircularProgress, Container, Typography } from '@mui/material';

const ProductsDetails = () => {

    const {id} = useParams()

    const {data,isLoading,isError} = useProduct(id)

    console.log(data);
    



    const product = data?.data

    if(!product){
        return (
            <Container sx={{py:5}}>
                <Typography>Product Not Found</Typography>
            </Container>
        )
    }
    return (
        <>
            {isLoading && (
                <Box sx={{display:"flex",justifyContent:"center",py:8}}>
                    <CircularProgress/>
                </Box>
            )
            }
            {isError && (
                <Container sx={{py:5}}>
                    <Alert severity='error'> 
                        Failesd to load products
                    </Alert>
                </Container>
                    
            )
            }
            <Container sx={{sx:5}}>
                <Box sx={{display:"grid",gridTemplateColumns:{xs:"1fr",md:"1fr 1fr"},gap:5}}>
                    <Box>
                        <Box component={"img"} sx={{width:"100%",maxHeight:500,objectFit:"contain"}} src={product.images?.[0] || "https://via.placeholder.com/600"} alt={product.name}/>
                        <Box>
                            <Typography variant='h3' sx={{mb:2}}>{product.name}</Typography>
                            <Typography variant='h6' color='text.secondary' sx={{mb:2}}>{product.brand}</Typography>
                            <Typography variant='h4' sx={{mb:3}}> ₹{product.price.toLocaleString("en-IN")}</Typography>
                            <Typography sx={{ mb: 2 }}>{product.description}</Typography>
                            <Typography sx={{ mb: 2 }}> Stock available: {product.stock}</Typography>
                            <Button variant='contained' size='large'>Add To Cart</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default ProductsDetails;
