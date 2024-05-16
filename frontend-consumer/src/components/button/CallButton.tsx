import phone from "../../assets/search/phone.png";

interface PhoneNumber {
  storeTel: string
}

const CallButton = ({storeTel}: PhoneNumber) => {
  const makePhoneCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handlePhoneClick = () => {
    makePhoneCall(storeTel);
  };

  return (
    <button onClick={handlePhoneClick} className="flex items-center">
      <img className="w-4" src={phone} alt="전화" />
      <p className="ml-1 text-gray-400 text-xxs">전화</p>
    </button>
  );
};

export default CallButton;
