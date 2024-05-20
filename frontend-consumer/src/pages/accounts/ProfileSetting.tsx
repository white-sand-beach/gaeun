import { useEffect, useState } from "react";
import NicknameCheck from "../../components/user_info/NicknameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";
import ProfileImageModal from "../../components/user_info/ProfileImageModal";
import ProfileUpdateButton from "../../components/button/ProfileUpdateButton";
import LogoutButton from "../../components/button/LogoutButton";
import KakaoUnlinkButton from "../../components/auth_login/KakaoUnlinkButton";
import ProfileForm from "../../services/accounts/ProfileInfoService";
import UserState from "../../types/UserState";

import defaultImg from "../../assets/profile/defaultImg.png";
import edit from "../../assets/profile/edit.png";

const ProfileSetting = () => {
  const [profileData, setProfileData] = useState<UserState>({
    profileImage: "",
    imageUrl: "",
    nickname: "",
    phoneNumber: "",
    isDonated: false,
  });

  const headerText = "전화번호 수정";
  const buttonText = "회원정보 수정";

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
          className="mt-5 mb-8 text-xs text-gray-400 "
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

      <div className="flex justify-center mt-14">
        <PhoneCheck
          phoneNumber={profileData.phoneNumber}
          updatePhoneNumber={(newPhoneNumber) =>
            updateUserState("phoneNumber", newPhoneNumber)
          }
          headerText={headerText}
        />
      </div>
      <div className="center my-14">
        <ProfileUpdateButton
          nickname={profileData.nickname}
          profileImage={propsImageFile}
          imageUrl={propsImageUrl}
          phoneNumber={profileData.phoneNumber}
          isDonated={profileData.isDonated}
          buttonText={buttonText}
        />
      </div>
      <div className="text-xs text-gray-400 center">
        <LogoutButton />
        <span className="mx-2">|</span>
        <KakaoUnlinkButton />
      </div>
    </div>
  );
};

export default ProfileSetting;
