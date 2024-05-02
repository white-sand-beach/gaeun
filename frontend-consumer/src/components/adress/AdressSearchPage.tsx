const AddressSearchPage = () => {
  return (
    <div className="container max-w-md mx-auto">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button>⟵</button>
        <h1 className="text-lg">주소 선택</h1>
        <button>편집</button>
      </header>
      <div className="p-4">
        <input
          className="w-full p-3 border rounded-lg"
          type="text"
          placeholder="지역, 도로명, 건물명으로 검색"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        <li className="flex items-center justify-between p-4">
          <span>강남구 역삼동 진달래 317</span>
          <button>선택</button>
        </li>
        <li className="flex items-center justify-between p-4">
          <span>강남구 역삼동 진달래 21 빌라 205호</span>
          <button>선택</button>
        </li>
        {/* 더 많은 주소 항목을 추가하세요 */}
      </ul>
    </div>
  );
};

export default AddressSearchPage;
