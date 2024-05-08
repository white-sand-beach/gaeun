import axios from "axios";
import Cookies from "universal-cookie";
import UserState from "../../types/UserState";
// import { useMutation, UseMutationResult } from "@tanstack/react-query";

// interface ProfileInfoProps {
//   nickname?: string;
//   profileImg?: string;
//   phoneNumber?: string;
// }

// interface ApiResponse {
//   message: string;
// }

const UpdateProfileForm = async ({
  nickname,
  profileImage,
  phoneNumber,
}: UserState): Promise<UserState> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const response = await axios.put(
    `${API_BASE_URL}/api/consumers`,
    { nickname, profileImage, phoneNumber },
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

export default UpdateProfileForm;

// const ProfileUpdateService = (): UseMutationResult<ApiResponse, Error, ProfileInfoProps> => {
//   const [cookies] = useCookies(["accessToken"]); // 컴포넌트 최상위에서 훅 호출

//   const mutation = useMutation<ApiResponse, Error, ProfileInfoProps>({
//     mutationFn: (profileInfo) => UpdateProfileForm(profileInfo, cookies.accessToken),
//     onSuccess: (data) => {
//       console.log(data);
//     },
//     onError: (error: Error) => {
//       console.error(error.message);
//     },
//   });

//   return mutation;
// };

// export default ProfileUpdateService;
