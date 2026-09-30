import axios from "axios";
import api from "./axios";

export const getproducts = async({search="",category="",page=1,limit=10,sort="newest"}) => {
        const res = await api.get("/products",{
            params:{search,category,page,limit,sort}
        })
        console.log(res.data);
        

        return res.data
}


export const getproductsById = async (id) => {
    const res = await api.get(`/products/${id}`)
    console.log(res.data);
    
    return res.data
}