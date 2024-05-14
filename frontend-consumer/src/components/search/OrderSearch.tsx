import searchIcon from "../../assets/search/searchIcon.png";

const OrderSearch = () => {
  return (
    <div className="search w-screen mx-2">
      <input
        className="text-xs pl-2 w-11/12"
        type="text"
        placeholder="가게 이름 또는 메뉴 검색"
      />
      <button>
        <img className="mr-1" src={searchIcon} alt="검색" />
      </button>
    </div>
  );
};

export default OrderSearch;
