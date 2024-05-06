import axios from "axios";
import { useNavigate } from "react-router-dom";
import point_white from "../../assets/search/point_white.png";

interface AddressListProps {
  address?: string; // 'address' prop은 string이거나 undefined일 수 있습니다.
  addressId?: number | undefined;
  alias?: string | undefined;
  roadAddress?: string | undefined;
  latitude: number;
  longitude: number;
}

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsInJvbGUiOiJST0xFX0NPTlNVTUVSIiwiaWF0IjoxNzE0NzI1MzUzLCJleHAiOjE3MTUwNzA5NTN9.pkGYbeXouRp304ff14eFGgofRQGM7dYUN6A65v9RfGw";

const locationsDelete = (addressId: number) => {
  axios
    .delete(`${import.meta.env.VITE_API_URL}/api/locations/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("주소 삭제완료.");
      window.location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      console.log(error);
    });
};

const AddressList: React.FC<AddressListProps> = ({
  address,
  addressId,
  alias,
  roadAddress,
  latitude,
  longitude,
}) => {
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 이벤트 버블링을 막아 상위 li 태그의 클릭 이벤트가 호출되지 않도록 함
    if (addressId !== undefined) {
      locationsDelete(addressId);
    }
  };

  const navigate = useNavigate();

  const goAddressRegistration = () => {
    navigate("/address-correction", {
      state: { address, latitude, longitude, roadAddress, addressId },
    });
  };

  if (!address) {
    return <div>주소 정보가 없습니다.</div>; // 주소가 없는 경우 처리
  }
  return (
    <div>
      <div className="flex items-center justify-between p-4 pb-0">
        <img className="w-6 ml-2 h-7" src={point_white} alt="point_white" />
        <div className="flex-col w-full pl-4">
          <div className="font-bold">{roadAddress}</div>
          <div>{address}</div>
          <div>{alias}</div>
        </div>
      </div>
      <div className="flex justify-end mr-3 space-x-2">
        <button
          onClick={goAddressRegistration}
          className="px-3 py-1 text-sm bg-gray-300 rounded-full"
        >
          수정
        </button>
        <button
          className="px-3 py-1 text-sm text-white bg-red-500 rounded-full"
          onClick={handleDeleteClick}
        >
          삭제
        </button>
      </div>
      <hr className="w-full my-2" />
    </div>
  );
};

export default AddressList;
