import { API_ROUTES } from "@/app/constants/apiRoutes";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { updateProfile, clearProfile, profileError } from "./profileSlice";

interface UserData {
  avatar: string;
  name: string;
  lastName: string;
  id: string;
  birthday: string;
  platform: { name: string; gamerTag: string };
}

interface ApiResponse {
  data: {
    [key: string]: string; // Adjust based on your API response structure
  };
}

// Define the shape of the error response
interface ErrorResponse {
  response?: {
    data?: {
      data?: {
        [key: string]: string; // Adjust based on your API error structure
      };
    };
  };
}

const token = Cookies.get("authToken");

export const updateUserProfile = (formData: UserData) => async (dispatch) => {

console.log(formData)
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_ROUTES.MAIN}${API_ROUTES.USER.PROFILE.UPDATE_PROFILE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateProfile(response.data));
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    dispatch(profileError(axiosError));
    // Log the error response data keys
    if (axiosError.response?.data?.data) {
      const errorKeys = Object.keys(axiosError.response.data.data);

      // Optionally, log the key-value pairs
      errorKeys.forEach((key) => {
        console.log(`${key}: ${axiosError.response?.data?.data[key]}`);
      });
    } else {
      console.log("Authentication failed. No error data found.");
    }
  }
};
