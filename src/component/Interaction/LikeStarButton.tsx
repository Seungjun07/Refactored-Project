import star_color from "@/img/favorite_color.png";
import star from "@/img/favorite.png";

interface LikeStarButtonProps {
  isLiked: boolean;
  likeCount: number;
  onToggleLike: () => void;
}
export default function LikeStarButton({
  isLiked,
  likeCount,
  onToggleLike,
}: LikeStarButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleLike();
      }}
    >
      <img src={isLiked ? star_color : star} alt="star-icon" />
      <span>{likeCount}</span>
    </button>
  );
}
