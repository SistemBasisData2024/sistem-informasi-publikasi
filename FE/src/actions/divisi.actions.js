import instance from "./axios";

const baseApiResponse = (data, isSuccess) => {
    return {
        success : isSuccess,
        data: data || null,
    };
};

export const fetchDivisi = async () => {
    try {
        const response = await instance.get(`http://localhost:8463/divisi`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch divisi:", error);
        return [];
    }
};

export const fetchMembers = async () => {
    try {
        const response2 = await instance.get(`http://localhost:8463/divisi/users`);
        return response2.data;
    } catch (error) {
        console.error("Failed to fetch divisi:", error);
        return [];
    }
};
