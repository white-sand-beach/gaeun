import love from "../../assets/favorite/love.png";
import nolove from "../../assets/favorite/nolove.png";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (loved: boolean) => void;
}

const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => {
  const toggleLove = () => {
    onToggle(!isFavorite);
  };

  return (
    <img
      className="w-6 cursor-pointer"
      src={isFavorite ? love : nolove}
      alt="토글하트"
      onClick={toggleLove}
    />
  );
};

export default FavoriteButton;