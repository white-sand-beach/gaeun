// ProfileImageModal.tsx
import React, { useState, useEffect } from "react";
import UserState from "../../types/UserState";
import "../modal/Modal.css";
import defaultImg from "../../assets/profile/defaultImg.png"

interface ProfileImageModalProps {
  propsImage?: string;
  onClose: () => void;
  onImageUpload: (file: File | null) => void;
}

const ProfileImageModal: React.FC<UserState & ProfileImageModalProps> = ({
  propsImage,
  onClose,
  onImageUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      onImageUpload(selectedImage);
      onClose();
    } catch (error) {
      console.error("업로드 실패:", error);
    }
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
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-[300px] rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">프로필 사진 변경</h2>
        <div className="center">
          <div className="relative flex justify-center items-center w-36 h-36 rounded-full border-[1px] border-gray-200 shadow-md mb-4">
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={
                selectedImage ? URL.createObjectURL(selectedImage) : (propsImage || defaultImg)
              }
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
