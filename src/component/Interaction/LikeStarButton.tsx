import star_color from "@/img/favorite_color.png";
import star from "@/img/favorite.png";
import { useFeedData } from "@/features/feed/hooks/useFeedData";
import { useFeedDetail } from "@/features/feed/hooks/useFeedDetail";

interface LikeStarButtonProps {
  fid: string;
  isLiked: boolean;
  likeCount: number;
}
export default function LikeStarButton({
  fid,
  isLiked,
  likeCount,
}: LikeStarButtonProps) {
  const { fetchFeedStar } = useFeedDetail(fid);

  return (
    <button
      onClick={(e) => {
        (e.stopPropagation(), fetchFeedStar(fid));
      }}
    >
      <img src={isLiked ? star_color : star} alt="star-icon" />
      <span>{likeCount}</span>
    </button>
  );
}
