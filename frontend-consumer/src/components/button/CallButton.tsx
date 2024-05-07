import phone from "@/assets/search/phone.png";

const CallButton = () => {
  return (
    <button className="flex items-center">
      <img className="w-4" src={phone} alt="전화" />
      <p className="ml-1 text-gray-400 text-xxs">전화</p>
    </button>
  );
};

export default CallButton;
