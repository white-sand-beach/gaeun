import axios from "axios";
interface AddressListProps {
  address?: string; // 'address' prop은 string이거나 undefined일 수 있습니다.
  addressId?: number | undefined;
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

const AddressList: React.FC<AddressListProps> = ({ address, addressId }) => {
  const handleDeleteClick = () => {
    console.log(addressId);
    if (addressId !== undefined) {
      locationsDelete(addressId);
    }
  };

  if (!address) {
    return <div>주소 정보가 없습니다.</div>; // 주소가 없는 경우 처리
  }
  return (
    <div>
      <li className="flex items-center justify-between p-4">
        <span>{address}</span>
        <button onClick={handleDeleteClick}>삭제</button>
      </li>
    </div>
  );
};

export default AddressList;
