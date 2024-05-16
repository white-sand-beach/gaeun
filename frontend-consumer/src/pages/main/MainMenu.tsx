interface MainMenuProps {
  imageURL: string; // 이미지 URL은 문자열 형태입니다.
}

const MainMenu = ({ imageURL }: MainMenuProps) => {
  return (
    <div className="w-[140px] h-28">
      <img src={imageURL} alt="menu" className="object-cover w-full h-full" />
    </div>
  );
};

export default MainMenu;
