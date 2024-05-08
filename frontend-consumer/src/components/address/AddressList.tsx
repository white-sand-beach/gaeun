import { useNavigate } from "react-router-dom";
import point_white from "../../assets/search/point_white.png";
import useUserLocation from "../../store/UserLocation";
import AddressDeleteForm from "../../services/searchs/AddressDeleteService";

interface AddressListProps {
  address?: string; // 'address' prop은 string이거나 undefined일 수 있습니다.
  addressId?: number | undefined;
  alias?: string | undefined;
  roadAddress?: string | undefined;
  latitude: number;
  longitude: number;
}

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
      AddressDeleteForm(addressId);
    }
  };

  const navigate = useNavigate();

  const goAddressRegistration = () => {
    navigate("/address-correction", {
      state: { address, latitude, longitude, roadAddress, addressId },
    });
  };

  const goMain = () => {
    if (confirm("선택하신 위치로 재설정 됩니다. 진행하시겠습니까?")) {
      const update = useUserLocation.getState().updateUserState; // 스토어의 상태 업데이트 함수를 가져옵니다.
      if (update) {
        update("latitude", latitude);
        update("longitude", longitude);
        update("address", address);
        update("roadAddress", roadAddress);
        update("alias", alias);
        update("addressId", addressId);
      }

      navigate("/", {
        state: {
          lat: latitude,
          lng: longitude,
          address: address,
          roadAddress: roadAddress,
          alias: alias,
        },
      });
    } else {
      console.log("위치 재설정이 취소되었습니다.");
    }
  };

  if (!address) {
    return <div>주소 정보가 없습니다.</div>; // 주소가 없는 경우 처리
  }
  return (
    <div>
      <div
        onClick={goMain}
        className="flex items-center justify-between p-4 pb-0"
      >
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
