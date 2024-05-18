import { useState, useEffect } from "react";
import { ReviewResponse, ReviewState } from "../../types/ReviewType"; // 수정된 부분: 파일명 오타 수정
import ShopReveiwGetForm from "../../services/shops/ShopReveiwGetService";
import { useParams } from "react-router-dom";

import BannerSlider from "../../components/navbar/ServiceBanner";
import Review from "./Review";

const ShopReview = () => {
  const [reviewState, setReviewState] = useState<ReviewState>({
    reviewList: [],
    totalCnt: 0,
    page: 0,
    loading: false,
    hasNext: false,
    scrollPosition: 0,
  });

  const { Id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response: ReviewResponse = await ShopReveiwGetForm({
          page: reviewState.page,
          size: 10,
          storeId: Id,
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
    <div className="w-full bg-white">
      <div className="w-11/12 mx-auto mt-4 mb-4 border-2 border-orange-400 center h-14 rounded-xl">
        <BannerSlider />
      </div>
      <hr className="w-full" />
      <hr className="border-4 border-gray-100" />

      <div>
        <Review reviewList={reviewState.reviewList} />
      </div>
    </div>
  );
};

export default ShopReview;
