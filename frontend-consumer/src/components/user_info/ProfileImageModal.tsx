// ProfileImageModal.tsx
import React, { useState, useEffect } from "react";

interface ProfileImageModalProps {
  profileImg?: string;
  onClose: () => void;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  profileImg,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    // 프로필 사진 업로드 로직 구현
    console.log("업로드된 이미지:", selectedImage);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-[300px] rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">프로필 사진 변경</h2>
        <div className="center">
          <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md mb-4">
            <img
              className="w-32 h-32 rounded-full"
              src={profileImg}
              alt="프로필 사진"
            />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 text-xs"
        />
        <button className="footer-button w-full" onClick={handleImageUpload}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default ProfileImageModal;
