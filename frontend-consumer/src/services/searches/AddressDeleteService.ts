import axiosInstance from "../authentication/AxiosSet";

const AddressDeleteForm = async (addressId: number): Promise<void> => {
  try {
    // DELETE 요청으로 주소 삭제
    await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/api/locations/${addressId}`);

    // 삭제 성공 알림
    alert("주소 삭제 완료.");
    localStorage.removeItem("user-location");
    // 페이지 새로고침
    window.location.reload();
  } catch (error: any) {
    // 에러 처리
    console.error(
      "Error deleting the address:",
      error.response ? error.response.data : error.message
    );
    // 선택적으로 사용자에게 에러를 알릴 수 있음
    alert("주소 삭제 중 오류가 발생했습니다.");
  }
};

export default AddressDeleteForm;
