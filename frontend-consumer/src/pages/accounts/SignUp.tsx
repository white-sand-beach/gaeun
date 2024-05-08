import { useEffect, useState } from "react";
import NicknameCheck from "../../components/user_info/NicknameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";
import ProfileImageModal from "../../components/user_info/ProfileImageModal";
import SignUpButton from "../../components/button/SignUpButton";
import "../../components/modal/Modal.css";
import ProfileForm from "../../services/accounts/ProfileInfoService";
import UserState from "../../types/UserState";
// import { ProfileInfoProps } from "../../types/UserInfo";

// import ProfileUpdateService from "../../services/ProfileUpdateService";

import edit from "../../assets/profile/edit.png";

const SignUp = () => {
  const [profileData, setProfileData] = useState<UserState>({
    profileImage: "",
    socialType: "",
    nickname: "",
    email: "",
  });

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

  useEffect(() => {
    ProfileForm()
      .then((data) => {
        setProfileData(data); 
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 호출되도록 함

  return (
    <div className="pt-14">
      <div className="mt-8 center">
        <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : profileData.profileImage
            }
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
              profileImage={profileData.profileImage}
              onClose={closeModal}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center mt-14">
        <NicknameCheck nickname={profileData.nickname} />
      </div>

      <div className="flex justify-center mt-14">
        <PhoneCheck phoneNumber={profileData.phoneNumber} />
      </div>
      {/* <ProfileUpdateService
        nickname={nickname}
        profileImage={profileImage}
        phoneNumber={phoneNumber}
      /> */}
      <div className="center my-14">
        <SignUpButton
          nickname={profileData.nickname}
          profileImage={
            uploadedImage
              ? URL.createObjectURL(uploadedImage)
              : profileData.profileImage
          }
          phoneNumber={profileData.phoneNumber}
        />
      </div>
    </div>
  );
};

export default SignUp;
