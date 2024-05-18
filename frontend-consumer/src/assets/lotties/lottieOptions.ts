import loading from "../lotties/loading.json";
import sendHeart from "../lotties/sendHeart.json";
import storeListLoading from "../lotties/storeListLoading.json";

export const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const sendHeartOptions = {
  loop: true,
  autoplay: true,
  animationData: sendHeart,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const storeListLoadingOptions = {
  loop: true,
  autoplay: true,
  animationData: storeListLoading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
