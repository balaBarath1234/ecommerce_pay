import { useQuery } from "@tanstack/react-query"
import { getproductsById } from "../api/productApi"

export const useProduct = (id) => {
    return useQuery({
        queryKey:["product",id],
        queryFn:() => getproductsById(id),
        enabled:!!id
    })
}