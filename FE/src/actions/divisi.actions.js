import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
    return {
        success : isSuccess,
        data: data || null,
    };
};

export const fetchDivisi = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/divisi`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch divisi:", error);
        return [];
    }
};