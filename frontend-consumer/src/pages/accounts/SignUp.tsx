import { useEffect, useState } from "react";
import NicknameCheck from "../../components/user_info/NicknameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";
import ProfileImageModal from "../../components/user_info/ProfileImageModal";
import ProfileUpdateButton from "../../components/button/ProfileUpdateButton";
import "../../components/modal/Modal.css";
import ProfileForm from "../../services/accounts/ProfileInfoService";
import UserState from "../../types/UserState";

import defaultImg from "../../assets/profile/defaultImg.png";
import edit from "../../assets/profile/edit.png";

const SignUp = () => {
  const [profileData, setProfileData] = useState<UserState>({
    profileImage: "",
    imageUrl: "",
    nickname: "",
    phoneNumber: "",
    isDonated: false,
  });

  const [userType, setUserType] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const headerText = "본인 인증";
  const buttonText = "회원 가입";

  const updateUserState: UserState["updateUserState"] = (key, value) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log(joinCode);
  }, [joinCode]);

  useEffect(() => {
    console.log("우하하");
    console.log(userType);
  }, [userType]);

  const handleImageUpload = (file: File | null) => {
    setUploadedImage(file);
    if (file) {
      // 프로필 사진 변경 시
      updateUserState("profileImage", file);
      updateUserState("imageUrl", undefined);
    } else {
      // 프로필 사진 삭제 시
      updateUserState("profileImage", undefined);
      updateUserState("imageUrl", undefined);
    }
  };

  const displayImage = uploadedImage
    ? URL.createObjectURL(uploadedImage)
    : profileData.imageUrl || defaultImg;

  const propsImageFile = uploadedImage ? profileData.profileImage : null;
  const propsImageUrl = uploadedImage ? undefined : profileData.imageUrl;

  useEffect(() => {
    ProfileForm()
      .then((data) => {
        setProfileData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data", error);
      });
  }, []);

  return (
    <div className="pt-14">
      <div className="mt-8 center">
        <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md">
          <img
            className="object-cover w-32 h-32 rounded-full"
            src={displayImage}
            alt="프로필 사진"
          />
          <button className="absolute bottom-2 right-3" onClick={toggleModal}>
            <img src={edit} alt="프로필 사진 변경" className="w-8 h-8" />
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <ProfileImageModal
              propsImage={displayImage}
              onClose={closeModal}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      )}
      <div className="center">
        <button
          onClick={() => handleImageUpload(null)}
          className="mt-5 mb-3 text-xs text-gray-400 "
        >
          프로필 사진 삭제
        </button>
      </div>
      <div className="flex justify-center">
        <NicknameCheck
          nickname={profileData.nickname}
          updateNickname={(newNickname) =>
            updateUserState("nickname", newNickname)
          }
        />
      </div>

      <div className="flex justify-center mt-5">
        <PhoneCheck
          phoneNumber={profileData.phoneNumber}
          updatePhoneNumber={(newPhoneNumber) =>
            updateUserState("phoneNumber", newPhoneNumber)
          }
          headerText={headerText}
        />
      </div>

      {/* 회원 유형 선택 */}
      <div className="flex justify-center mt-5">
        <div className="w-[330px]">
          <h1 className="mb-2 ml-2 text-lg font-bold ">회원유형</h1>
          <div className="flex items-center mt-4 ml-2">
            <input
              type="radio"
              id="normal"
              name="userType"
              value="normal"
              checked={userType === false}
              onChange={() => setUserType(false)}
              className="mr-2"
            />
            <label htmlFor="normal" className="mr-4">
              일반 회원
            </label>
            <input
              type="radio"
              id="join"
              name="userType"
              value="join"
              checked={userType === true}
              onChange={() => setUserType(true)}
              className="mr-2"
            />
            <label htmlFor="join">참여 회원</label>
          </div>
        </div>
      </div>

      {/* 참여 회원의 경우 참여 코드 입력란 표시 */}
      {userType === true && (
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="참여 코드를 입력하세요."
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md w-[330px]"
          />
        </div>
      )}

      <div className="mt-8 center">
        <ProfileUpdateButton
          nickname={profileData.nickname}
          profileImage={propsImageFile}
          imageUrl={propsImageUrl}
          phoneNumber={profileData.phoneNumber}
          buttonText={buttonText}
          isDonated={userType}
        />
      </div>
    </div>
  );
};

export default SignUp;
