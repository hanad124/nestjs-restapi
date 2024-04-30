import { axiosInstance } from ".";

export const getAllBookMarks = async () => {
  try {
    const response = await axiosInstance.get("/bookmarks");

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
