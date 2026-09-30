import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Alert, Box, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material';
import ProductCard from '../../components/ProductCard';

const Products = () => {

    const [search , setSearch] = useState("")

    const [category,setCategory] = useState("")

    const [sort,setSort] = useState("newest")

    const [page,setPage] = useState(1)
    
    
    const {data , isLoading , isError} = useProducts({
        search,category,sort,limit:10,page
    })
    console.log(data);
    

    const products = data?.products || []

    const pagination = data?.pagination


    return (
        <Container sx={{py:4}}>
            <Typography variant='h4' sx={{mb:3}}>Products</Typography>
            <Box sx={{display:"flex",gap:2,mb:4,flexWrap:"wrap"}}>
                <TextField sx={{minWidth:250}} label="search products" value={search} onChange={(e) => {
                setSearch(e.target.value) 
                setPage(1)}} />
                <FormControl sx={{minWidth:180}}>
                    <InputLabel>Category</InputLabel>
                    <Select label="category" value={category} onChange={(e) => {
                    setCategory(e.target.value) 
                    setPage(1)}}>
                        <MenuItem value="">
                            All Categories
                        </MenuItem>

                        <MenuItem value="Mobile">
                            Mobile
                        </MenuItem>

                        <MenuItem value="Laptop">
                            Laptop
                        </MenuItem>

                        <MenuItem value="Electronics">
                            Electronics
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{minWidth:180}}>
                    <InputLabel>Sort</InputLabel>
                    <Select label="sort" value={sort} onChange={(e) => {
                    setSort(e.target.value) 
                    setPage(1)}}>
                        <MenuItem value="newest">
                            Newest
                        </MenuItem>

                        <MenuItem value="price_asc">
                            Price: Low to High
                        </MenuItem>

                        <MenuItem value="price_desc">
                            Price: High to Low
                        </MenuItem>

                        <MenuItem value="name_asc">
                            Name: A-Z
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {isLoading && (
                <Box sx={{display:"flex",justifyContent:"center",py:5}}>
                    <CircularProgress/>
                </Box>
            )
            }

            {isError && (
                <Alert severity='error'> 
                    Failed to load products
                </Alert>
            )
            }

            {!isLoading && !isError && (
                <Grid container spacing={3}>
                    {
                        products.map(product => {
                            return (
                                <Grid key={product.id} size={{xs:12,sm:6,md:4,lg:3}}>
                                    <ProductCard product={product}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )}

            {!isLoading && products.length === 0 && (
                <Typography sx={{textAlign:"center",py:5}}>No Products Found</Typography>
            )}

            {pagination && pagination.totalPages > 1 && (
                <Box sx={{display:"flex",justifyContent:"center",mt:5}}>
                    <Pagination count={pagination.totalPages} page={pagination.currentPage} onChange={(_,value) => {
                        setPage(value)
                    }}/>
                </Box>
            )}
        </Container>
    );
}

export default Products;
