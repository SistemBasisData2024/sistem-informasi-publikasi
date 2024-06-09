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

export const deleteKonten = async (konten_id) => {
  try {
    console.log(konten_id);
    const response = await instance.delete(
      `http://localhost:8463/admin/deleteKonten/${konten_id}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error deleting konten:", error);
    return baseApiResponse(null, false);
  }
};

export const getUsers = async () => {
  try {
    const response = await instance.get(`http://localhost:8463/admin/users`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error getting users:", error);
    return baseApiResponse(null, false);
  }
};

export const grantAdmin = async (username) => {
  try {

    const response = await instance.put(
      `http://localhost:8463/admin/grant`,
      {username},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error granting admin role:", error);
    return baseApiResponse(null, false);
  }
};

export const getAllKonten = async () => {
  try {
    const response = await instance.get("http://localhost:8463/admin/request");
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error fetching all konten for admin:", error);
    return baseApiResponse(null, false);
  }
};

export const approve = async (konten_id) => {
  try {
    const response = await instance.put(
      `http://localhost:8463/admin/approve`,
      {konten_id},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Error granting admin role:", error);
    return baseApiResponse(null, false);
  }
};