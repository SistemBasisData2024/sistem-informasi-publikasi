import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
    return {
        success : isSuccess,
        data: data || null,
    };
};

export const signUp = async (formData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/signup`, formData
        );
        console.log("Response from server");
        console.log(response.data);
        return baseApiResponse(response.data, true);
    } catch (error){
        console.error(error);
        return baseApiResponse(null, false);
    }
};

export const login = async (formData) => {
    try{
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`, formData
        );
        console.log("Response from server");
        console.log(response.data);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error(error);
        return baseApiResponse(null, false);
    }
};