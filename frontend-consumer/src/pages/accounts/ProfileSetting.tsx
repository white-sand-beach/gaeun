import { useState } from "react";
import NicknameCheck from "../../components/user_info/NicknameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";
import ProfileImageModal from "../../components/user_info/ProfileImageModal";
import ProfileUpdateButton from "../../components/button/ProfileUpdateButton";
import LogoutButton from "../../components/button/LogoutButton";
import KakaoUnlinkButton from "../../components/auth_login/KakaoUnlinkButton";

import useUserStore from "../../store/UserStore";
import UserState from "../../types/UserState";

import edit from "../../assets/profile/edit.png";

const ProfileSetting = () => {
  const { profileImg, nickname, phoneNumber } = useUserStore(
    (state: UserState) => ({
      nickname: state.nickname,
      profileImg: state.profileImg,
      phoneNumber: state.phoneNumber,
    })
  );
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
  };

  return (
    <div className="pt-14">
      <div className="mt-8 center">
        <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md">
          <img
            className="w-32 h-32 rounded-full"
            src={uploadedImage ? URL.createObjectURL(uploadedImage) : profileImg}
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
            <ProfileImageModal profileImg={profileImg} onClose={closeModal} onImageUpload={handleImageUpload} />
          </div>
        </div>
      )}
      <div className="flex justify-center mt-14">
        <NicknameCheck nickname={nickname} />
      </div>

      <div className="flex justify-center mt-14">
        <PhoneCheck phoneNumber={phoneNumber} />
      </div>
      {/* <ProfileUpdateService
        nickname={nickname}
        profileImg={profileImg}
        phoneNumber={phoneNumber}
      /> */}
      <div className="center my-14">
        <ProfileUpdateButton
          nickname={nickname}
          profileImg={uploadedImage ? URL.createObjectURL(uploadedImage) : profileImg}
          phoneNumber={phoneNumber}
        />
      </div>
      <div className="center text-xs text-gray-400">
        <LogoutButton />
        <span className="mx-2">|</span>
        <KakaoUnlinkButton />
      </div>
    </div>
  );
};

export default ProfileSetting;
