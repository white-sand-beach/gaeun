import Review from "./Review";
import { useState, useEffect } from "react";
import { ReviewResponse, ReviewState } from "../../types/ReviewType"; // 수정된 부분: 파일명 오타 수정
import ShopReveiwGetForm from "../../services/shops/ShopReveiwGetService";

const MyReview = () => {
  const [reviewState, setReviewState] = useState<ReviewState>({
    reviewList: [],
    totalCnt: 0,
    page: 0,
    loading: false,
    hasNext: false,
    scrollPosition: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response: ReviewResponse = await ShopReveiwGetForm({
          page: reviewState.page,
          size: 10,
        });
        setReviewState((prevState) => ({
          ...prevState,
          reviewList: [
            ...prevState.reviewList,
            ...(response.data.reviewList || []),
          ],
          totalCnt: response.data.totalCnt,
          hasNext: response.data.hasNext,
        }));
        console.log(response.data);
        console.log(reviewState);
      } catch (error) {
        console.error("에러발생 에러발생! ", error);
      } finally {
        setReviewState((prevState) => ({ ...prevState, loading: false }));
      }
    };
    fetchReviews();
  }, [reviewState.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight &&
        !reviewState.loading &&
        reviewState.hasNext
      ) {
        setReviewState((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reviewState.loading, reviewState.hasNext]);

  return (
    <div className="pt-12">
      <div>
        <Review reviewList={reviewState.reviewList} />
      </div>
    </div>
  );
};

export default MyReview;
