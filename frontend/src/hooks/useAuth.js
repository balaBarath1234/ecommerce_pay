import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../api/authApi"

export const useCurrentUser = () => {
    return  useQuery({
        queryKey:["currentuser"],
        queryFn:getCurrentUser,
        retry:false
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn:registerUser
    })
}

export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:loginUser,
        onSuccess:(data) => {
            queryClient.setQueriesData(["currentuser"],data)
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:logoutUser,
        onSuccess:() => {
            queryClient.removeQueries({
                queryKey:["currentuser"]
            })
        }
    })
}