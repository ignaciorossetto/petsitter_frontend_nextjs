import axios, { AxiosError, AxiosResponse, CancelTokenSource } from "axios";
import config from "./config";
import {
  GeoLocSittersInfoType,
  IBackendErrorResponse,
  JWTtype,
  LoginFormType,
  MessageType,
} from "@/types/types";
import { useRouter } from "next/router";

const createAxiosInstance = (jwt: JWTtype = null) => {
  const axiosInstance = axios.create({
    baseURL: config.backendUrl,
    withCredentials: true,
  });

  if (jwt) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  return axiosInstance;
};

export const authJwtRequest = async (jwt: JWTtype) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get("/api/auth");
    if (response.status === 200) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

export const getConversations = async (jwt: JWTtype, id: string) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get(`/api/conversations/all/${id}`);
    if (response.status === 200) {
      return response.data;
    } else throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const getMessages = async (
  jwt: JWTtype,
  selectedConv: string,
  cancelToken: CancelTokenSource
) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get(`/api/messages/${selectedConv}`, {
      cancelToken: cancelToken.token,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const postMessage = async (jwt: JWTtype, obj: MessageType) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.post(`/api/messages`, obj);
    if (response.status === 200) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

export const createOrGetConversation = async (jwt: JWTtype, obj: object) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.post(`/api/conversations`, obj);
    if (response.status === 200) {
      return response.data;
    } else throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const getSittersNearBy = async (
  jwt: JWTtype,
  obj: GeoLocSittersInfoType
) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get(
      `/api/sitters/getSittersNearby?radius=${obj.radius}&lat=${obj.lat}&lng=${obj.lng}`
    );
    if (response.status === 200) {
      return response.data;
    } else throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const getConversationInfo = async (
  jwt: JWTtype,
  url: string,
  receiverId: any
) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get(
      `/api/conversations${url}${receiverId}`
    );
    if (response.status === 200) {
      return response.data;
    } else throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const loginRequest = async (
  obj: LoginFormType,
  type: string = "user"
) => {
  const axiosInstance = createAxiosInstance();
  const url = `/api/auth/login?type=${type}`;
  try {
    const response = await axiosInstance.post(url, obj);
    return response;
  } catch (error: any) {
    const errors = error.response as AxiosResponse<IBackendErrorResponse>;
    if (errors.data.code === 404) {
      throw new Error("Email/contraseña invalida");
    }
    throw new Error(errors.data.message);
  }
};

export const newProfileImgRequest = async (
  jwt: JWTtype,
  img: any,
  type: string,
  id: string
) => {
  const axiosInstance = createAxiosInstance(jwt);
  const url =
    type === "user"
      ? `/api/users/${id}/profileImg?type=${type}`
      : `/api/sitters/${id}/profileImg?type=${type}`;
  try {
    const response = await axiosInstance.post(url, img, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.payload;
  } catch (error) {
    throw new Error();
  }
};

export const newAddressRequest = async (
  jwt: JWTtype,
  obj: any,
  id: string,
  type: string = "user"
) => {
  const axiosInstance = createAxiosInstance(jwt);
  const url = type === "user" ? `/api/users/${id}` : `/api/sitters/${id}`;
  try {
    const response = await axiosInstance.put(url, obj);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export const getGoogleLoggedInUserInfo = async (jwt: JWTtype) => {
  const axiosInstance = createAxiosInstance(jwt);
  const url = "api/auth/google/login";
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export const getPendingOngoingCareOrder = async (
  jwt: JWTtype,
  sitterId: string,
  userId: string,
  cancelToken: CancelTokenSource
) => {
  const axiosInstance = createAxiosInstance(jwt);
  const url = `api/care-orders?sitterId=${sitterId}&userId=${userId}`;
  try {
    const response = await axiosInstance.get(url, {
      cancelToken: cancelToken.token,
    });
    return [response.data.payload[0], response.data.preferenceId];
  } catch (error) {
    console.log("getPendingOngoingCareOrder: ", error);
    throw new Error();
  }
};

export const adminLoginRequest = async (obj: any) => {
  const axiosInstance = createAxiosInstance();
  const url = `api/auth/admin/login`;
  try {
    const response = await axiosInstance.post(url, obj);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getAdminUsers = async (
  jwt: JWTtype,
  adminId: string,
  cancelToken: CancelTokenSource
) => {
  const axiosInstance = createAxiosInstance(jwt);
  try {
    const response = await axiosInstance.get(`/api/admin/users`, {
      cancelToken: cancelToken.token,
    });
    if (response.status === 200) {
      return response.data.payload;
    }
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};
