interface OrderStatus {
  orderStatus?: string;
}

const ReviewButton = ({ orderStatus }: OrderStatus) => {
  const isCompleted = orderStatus === "수령 완료";

  return (
    <button
      className={`mt-3 w-[290px] mx-4 border-[1px] py-3 ${isCompleted ? "orange-hover-button" : ""}`}
      style={{
        visibility: isCompleted ? "visible" : "hidden",
        opacity: isCompleted ? 1 : 0,
        pointerEvents: isCompleted ? "auto" : "none",
      }}
    >
      리뷰 작성
    </button>
  );
};

export default ReviewButton;
