import instance from "./axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const request = async (formData) => {
  try {
    const response = await instance.post(
      "http://localhost:8463/user/request",
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

export const fetchTahap = async () => {
  try {
    const response = await instance.get(`http://localhost:8463/notes/tahap`);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Failed to fetch konten:", error);
    return baseApiResponse(null, false);
  }
};

export const fetchKonten = async (id) => {
  try {
    const response = await instance.get(
      `http://localhost:8463/divisi/konten/${id}`
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Failed to fetch konten:", error);
    return baseApiResponse(null, false);
  }
};

export const fetchNotes = async (idData) => {
  console.log(idData);
  try {
    const response = await instance.post(
      `http://localhost:8463/notes/get`,
      idData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return baseApiResponse(null, false);
  }
};


export const addNotes = async (formData) => {
  console.log(formData);
  try {
    const response = await instance.post(
      `http://localhost:8463/notes`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return baseApiResponse(null, false);
  }
};