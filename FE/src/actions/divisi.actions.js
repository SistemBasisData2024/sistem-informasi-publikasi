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

export const fetchKontenDetails = async (konten_id) => {
  try {
    const response = await instance.get(`http://localhost:8463/divisi/konten/${konten_id}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Failed to fetch konten details:", error);
    return baseApiResponse(null, false);
  }
};

export const fetchKonten = async () => {
    try {
        const response = await instance.get(`http://localhost:8463/divisi/konten`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        console.error("Failed to fetch konten:", error);
        return baseApiResponse(null, false);
    }
};