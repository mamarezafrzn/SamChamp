import { API_ROUTES } from "@/app/constants/apiRoutes";
import { APP_ROUTES } from "@/app/constants/appRoutes";
import axios, { AxiosError, AxiosResponse } from "@/node_modules/axios/index";
import { RootState } from "@/store";
import { ThunkAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authError, authSuccess } from "./authSlice";

interface UserData {
  email: string;
  password: string;
  password_confirmation?: string;
}
// Define the shape of the API response
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

export const auth =
  (userData: UserData, apiRoute: string) => async (dispatch) => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        `${API_ROUTES.MAIN}${apiRoute}`,
        userData
      );
      Cookies.set("authToken", response.data.data.token?.access_token);
      dispatch(authSuccess(response.data));
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      dispatch(authError(axiosError));
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

export const authPlatforms = (apiRoute: string) => async (dispatch) => {

  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_ROUTES.MAIN}${apiRoute}`
    );
    Cookies.set("authToken", response.data.data.token?.access_token);
    dispatch(authSuccess(response.data));
    console.log(response)
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    dispatch(authError(axiosError));

    if (axiosError.response?.data?.data) {
      const errorKeys = Object.keys(axiosError.response.data.data);


      errorKeys.forEach((key) => {
        console.log(`${key}: ${axiosError.response?.data?.data[key]}`);
      });
    } else {
      console.log("Authentication failed. No error data found.");
    }
  }
};

// export const authPlatforms = (
//   apiRoute: string
// ): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {

//   try {
//     const response: AxiosResponse<ApiResponse> = await axios.get(
//       `${API_ROUTES.MAIN}${apiRoute}`,
//       {
//         maxRedirects: 0,  // Prevent Axios from following redirects
//         validateStatus: (status) => status === 302 || status < 400,  // Allow 302 status
//       }
//     );
  

//     if (response.status === 302 && response.headers.location) {
//       // Redirect to the external login URL
//       // window.location.href = response.headers.location;
//     } else {
//       // Handle successful authentication response
//       const token = response.data.data.token?.access_token;
//       if (token) {
//         Cookies.set("authToken", token, { secure: true, sameSite: "strict" });
//       }
//       dispatch(authSuccess(response.data));
//     }
//   } catch (error) {
//     const axiosError = error as AxiosError<ErrorResponse>;
//     dispatch(authError(axiosError));
  
//     console.error("Authentication failed:", axiosError.message);
//   }
  
// };
