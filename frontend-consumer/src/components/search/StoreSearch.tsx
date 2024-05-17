import React, { useState } from "react";
import searchIcon from "../../assets/search/searchIcon.png";

interface StoreSearchProps {
  onSearch: (keyword: string) => void;
}

const StoreSearch = ({ onSearch }: StoreSearchProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  return (
    <div className="search">
      <input
        className={`w-[250px] py-2 text-xs pl-2 rounded-md`}
        type="text"
        placeholder={`가게 이름 및 메뉴 검색`}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>
        <img className="mr-1" src={searchIcon} alt="검색" />
      </button>
    </div>
  );
};

export default StoreSearch;
