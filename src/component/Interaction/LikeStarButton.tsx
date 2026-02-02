import star_color from "@/img/favorite_color.png";
import star from "@/img/favorite.png";
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
  const { toggleLike } = useFeedDetail(fid);

  return (
    <button
      onClick={(e) => {
        (e.stopPropagation(), toggleLike(fid));
      }}
    >
      <img src={isLiked ? star_color : star} alt="star-icon" />
      <span>{likeCount}</span>
    </button>
  );
}
