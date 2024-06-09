import instance from "./axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const getUserRole = async () => {
  try {
    const response = await instance.get("/admin/role");
    return response.data.role;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

export const deleteKonten = async (kontenId) => {
  try {
    const response = await instance.delete(`/admin/konten/${kontenId}`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error deleting konten:", error);
    return baseApiResponse(null, false);
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get("/admin/users");
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error getting users:", error);
    return baseApiResponse(null, false);
  }
};

export const grantAdmin = async (username) => {
  try {
    const response = await instance.put("/admin/grant", { username });
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error granting admin role:", error);
    return baseApiResponse(null, false);
  }
};

export const getAllKonten = async () => {
    try {
        const response = await instance.get("/admin/request");
        return baseApiResponse(response.data, true);
      } catch (error) {
        console.error("Error fetching all konten for admin:", error);
        return baseApiResponse(null, false);
      }
};

