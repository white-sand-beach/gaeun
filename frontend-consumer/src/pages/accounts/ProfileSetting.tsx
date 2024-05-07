import { useState } from "react";
import NickNameCheck from "../../components/user_info/NickNameCheck";
import PhoneCheck from "../../components/user_info/PhoneCheck";
import ProfileImageModal from "../../components/user_info/ProfileImageModal";
import ProfileUpdateButton from "../../components/button/ProfileUpdateButton"

import useUserStore from "../../store/UserStore";
import UserState from "../../types/UserState";

import edit from "../../assets/profile/edit.png";

const ProfileSetting = () => {
  const { profileImg, nickName, phoneNumber } = useUserStore(
    (state: UserState) => ({
      nickName: state.nickName,
      profileImg: state.profileImg,
      phoneNumber: state.phoneNumber,
    })
  );
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="pt-14">
      <div className="mt-8 center">
        <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md">
          <img
            className="w-32 h-32 rounded-full"
            src={profileImg}
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
            <ProfileImageModal profileImg={profileImg} onClose={closeModal} />
          </div>
        </div>
      )}
      <div className="flex justify-center mt-14">
        <NickNameCheck nickName={nickName} />
      </div>

      <div className="flex justify-center mt-14">
        <PhoneCheck phoneNumber={phoneNumber} />
      </div>
      {/* <ProfileUpdateService
        nickName={nickName}
        profileImg={profileImg}
        phoneNumber={phoneNumber}
      /> */}
      <div className="center my-14">
        <ProfileUpdateButton
          nickName={nickName}
          profileImg={profileImg}
          phoneNumber={phoneNumber}
        />
      </div>
    </div>
  );
};

export default ProfileSetting;
