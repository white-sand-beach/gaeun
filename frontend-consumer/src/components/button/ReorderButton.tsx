import { useNavigate } from "react-router-dom";

interface StoreId {
  storeId?: number;
}

const ReorderButton = ({ storeId }: StoreId) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/shop/${storeId}`)
  }
  return (
    <button onClick={handleSubmit} className="orange-hover-button w-[140px] border-[1px] py-3">
      가게 재방문
    </button>
  );
};

export default ReorderButton;
