import { axiosInstance } from ".";

// get user info
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/users/user-info");
    return response;
  } catch (error) {
    console.log(error);
  }
};
