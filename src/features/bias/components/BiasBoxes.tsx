import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// import { BIAS_URL } from "../../constant/biasUrl";
// import useLoginStore from "../../stores/LoginStore/useLoginStore";

import "./index.css";
import useBiasStore from "@/stores/BiasStore/useBiasStore";
import BiasList from "@/features/bias/components/BiasList.tsx";
import useDragScroll from "../../../hooks/useDragScroll.ts";
import type { Bias } from "@/features/bias/types/bias.ts";

export default function BiasBoxes({
  fetchBiasCategoryData,
}: {
  fetchBiasCategoryData: () => void;
}) {
  const navigate = useNavigate();
  const { scrollRef, hasDragged, dragHandlers } = useDragScroll();
  let { biasList, loading, selectedBias, fetchBiasList, setSelectedBias } =
    useBiasStore();

  // const { isLogin } = useLoginStore();
  useEffect(() => {
    fetchBiasList();
    // if (isLogin === "done") {
    // }
  }, []);

  function handleClickBias(bias: Bias) {
    if (hasDragged) return;

    setSelectedBias(bias);

    fetchBiasCategoryData();
  }

  function handleAddButton() {
    navigate("/follow_page");
    // if (isUserState) {
    //   navigate("/follow_page");
    // } else {
    //   navigate("/novalogin");
    // }
  }

  useEffect(() => {
    if (loading) {
      toast.loading("loading...");
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div
      ref={scrollRef}
      onMouseDown={dragHandlers.onMouseDown}
      onMouseMove={dragHandlers.onMouseMove}
      onMouseUp={dragHandlers.onMouseUp}
      className="bias-container"
    >
      <Toaster position="bottom-center" />
      <BiasList
        biasList={biasList}
        selectedBias={selectedBias}
        onBiasSelect={handleClickBias}
        onAddClick={handleAddButton}
      />
    </div>
  );
}

// let [isUserState, setIsUserState] = useState(false);
// function handleValidCheck() {
//   fetch("https://nova-platform.kr/home/is_valid", {
//     credentials: "include",
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         setIsUserState(true);
//         return response.json();
//       } else {
//         setIsUserState(false);
//         return Promise.reject();
//       }
//     })
//     .catch((error) => {
//       setIsUserState(false);
//     });
// }

// useEffect(() => {
//   handleValidCheck();
// }, []);
