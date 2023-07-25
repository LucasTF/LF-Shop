import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingStarProps = {
  value: number;
  offset?: number;
};

const RatingStar = ({ value, offset = 0 }: RatingStarProps) => {
  const Star = () => {
    if (value >= 1 + offset) return <FaStar />;
    if (value >= 0.5 + offset) return <FaStarHalfAlt />;
    return <FaRegStar />;
  };

  return (
    <span className="text-yellow-400">
      <Star />
    </span>
  );
};
export default RatingStar;
