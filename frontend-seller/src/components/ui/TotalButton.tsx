import { ButtonTypes } from "../../types/@common/ButtonTypes";

const TotalButton:React.FC<ButtonTypes> = (props) => {
  return (
    <button className="common-btn"
    onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default TotalButton;