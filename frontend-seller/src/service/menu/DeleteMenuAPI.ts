import axios from "axios";
import Cookies from "universal-cookie";

const DeleteMenuAPI = () => {
  const cookies = new Cookies()
  const accessToken = cookies.get("accessToken")
  const DeleteMenu = (menuId:any) => {
    const isConfirm = confirm(
      "메뉴를 삭제하시겠습니까?"
    );
    if (isConfirm) {

      axios.delete(import.meta.env.VITE_BASE_URL + `/api/menus/${menuId}`, {
        withCredentials: true,
        params: {
        "menu-id": menuId
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        "storeId": cookies.get("storeId"),
      }
    },)
    .then(res => {
      console.log(res)
      window.alert("메뉴 삭제 성공")
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
      window.alert("메뉴 삭제 실패")
    })
  }
  };
  return {
    DeleteMenu
  };
};

export default DeleteMenuAPI;