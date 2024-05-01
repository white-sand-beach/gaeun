
import axios from "axios"
import { useCookies } from "react-cookie";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface ProfileInfoProps {
  nickName?: string,
  profileImg?: string,
  phoneNumber?: string;
}

interface ApiResponse {
  message: string;
}

const updateProfile = async (profileInfo: ProfileInfoProps, accessToken: string) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const response = await axios.put(
    `${API_BASE_URL}/consumers`,
    profileInfo,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

const ProfileUpdateService = (): UseMutationResult<ApiResponse, Error, ProfileInfoProps> => {
  const [cookies] = useCookies(["accessToken"]); // 컴포넌트 최상위에서 훅 호출

  const mutation = useMutation<ApiResponse, Error, ProfileInfoProps>({
    mutationFn: (profileInfo) => updateProfile(profileInfo, cookies.accessToken),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return mutation;
};

export default ProfileUpdateService;