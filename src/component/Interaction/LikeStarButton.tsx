import star_color from "@/img/favorite_color.png";
import star from "@/img/favorite.png";
import { useFeedData } from "@/features/feed/hooks/useFeedData";

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
  const { handleToggleLike } = useFeedData({ type: null });

  return (
    <button
      onClick={(e) => {
        (e.stopPropagation(), handleToggleLike(fid));
      }}
    >
      <img src={isLiked ? star_color : star} alt="star-icon" />
      <span>{likeCount}</span>
    </button>
  );
}
