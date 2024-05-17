import { ButtonTypes } from "../../types/@common/ButtonTypes";

const TotalButton:React.FC<ButtonTypes> = (props) => {
  return (
    <button className="common-btn w-[400px] h-[60px] rounded-xl text-xl"
    onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default TotalButton;