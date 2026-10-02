import { useQuery } from "@tanstack/react-query"
import { getproducts, getproductsById } from "../api/productApi"

export const useProducts = ({
    search = "",
    category = "",
    page = 1,
    limit = 10,
    sort = "newest"
}) => {
    return useQuery({
        queryKey:["products",
            {
                search,
                category,
                page,
                limit,
                sort
            }
        ],
        queryFn:() => getproducts({
            search,
            category,
            page,
            limit,
            sort
        })
    })
}

export const useProduct = (id) => {
    return useQuery({
        queryKey:["product",id],
        queryFn:() => getproductsById(id),
        enabled:!!id
    })
}