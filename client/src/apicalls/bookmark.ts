import { axiosInstance } from ".";

export const getAllBookMarks = async () => {
  try {
    const response = await axiosInstance.get("/bookmarks");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBookMark = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/bookmarks/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createBookMark = async (payload: any) => {
  try {
    const response = await axiosInstance.post(
      "/bookmarks/create-bookmark",
      payload
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateBookMark = async (payload: any, id: string) => {
  try {
    const response = await axiosInstance.patch(`/bookmarks/${id}`, payload);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookMark = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/bookmarks/${id}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
