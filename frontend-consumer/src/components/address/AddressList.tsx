interface AddressListProps {
  address?: string; // 'address' prop은 string이거나 undefined일 수 있습니다.
}

const AddressList: React.FC<AddressListProps> = ({ address }) => {
  if (!address) {
    return <div>주소 정보가 없습니다.</div>; // 주소가 없는 경우 처리
  }
  return (
    <div>
      <li className="flex items-center justify-between p-4">
        <span>{address}</span>
        <button>선택</button>
      </li>
    </div>
  );
};

export default AddressList;
