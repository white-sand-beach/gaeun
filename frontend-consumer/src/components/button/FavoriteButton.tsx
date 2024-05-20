import { useLocation } from "react-router-dom";

import love from "../../assets/favorite/love.png";
import nolove from "../../assets/favorite/nolove.png";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (loved: boolean) => void;
}

const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => {
  console.log(isFavorite);

  const location = useLocation();
  const isFavoritePath = location.pathname === "/favorite";

  const toggleLove = () => {
    onToggle(!isFavorite);
  };

  return (
    <img
      className={`cursor-pointer ${isFavoritePath ? "w-6" : "w-4"}`}
      src={isFavorite ? love : nolove}
      alt="토글하트"
      onClick={toggleLove}
    />
  );
};

export default FavoriteButton;
