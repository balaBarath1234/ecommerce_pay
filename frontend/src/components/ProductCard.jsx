import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material"
import {Link} from "react-router-dom"

const ProductCard = ({product}) => {
    return (
        <Card sx={{height:"100%",display:"flex",flexDirection:"column"}}>
            <CardMedia component={"img"} height="200" image={product.images?.[0] || "https://via.placeholder.com/300x220"} alt={product.name}/>
            <CardContent sx={{flexGrow:1}}>
                <Typography variant='h6' gutterBottom>{product.name}</Typography>
                <Typography variant='body2' color='text.secondary' sx={{mb:1}}>{product.brand}</Typography>
                <Typography variant='h6' sx={{mb:2}}>₹{product.price.toLocaleString("en-IN")}</Typography>
                <Typography variant='body2' sx={{mb:2}}>Stock:{product.stock}</Typography>
                <Box>
                    <Button component={Link} to={`/products/${product._id}`} variant='contained' fullWidth >View Product</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCard;