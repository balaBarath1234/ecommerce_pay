import api from "./axios";

export const registerUser = async(userData) =>  {
    try {
        const res = await api.post("/auth/register",userData)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (userData) => {
    try {
        const res = await api.post("/auth/login",userData)
        return res.data 
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const res = await api.get("/auth/me")
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = async () => {
    try {
        const res = await api.post("/auth/logout")
        return res.data
    } catch (error) {
        console.log(error);
    }
}