import instance from "./axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const signUp = async (formData) => {
  try {
    const response = await instance.post(
      "http://localhost:8463/user/signup",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response from server");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const login = async (formData) => {
  try {
    const response = await instance.post(
      "http://localhost:8463/user/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response from server");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const request = async (formData) => {
  try {
    const response = await instance.post(
      "http://localhost:8463/user/request_post",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Response from server");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const getKonten = async () => {
  try {
    const response = await instance.get(
      "http://localhost:8463/user/request_get"
    );
    return response;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { data: [] };
  }
};

export const getUser = async () => {
  try {
    const response = await instance.get("http://localhost:8463/user");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { data: [] };
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance.post("http://localhost:8463/user/logout");
    if (response.status === 200) {
      localStorage.removeItem("authToken");
      sessionStorage.clear();
    }
  } catch (error) {
    console.error("Error logging out", error);
  }
};