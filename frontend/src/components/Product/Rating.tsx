import RatingStar from "./RatingStar";

type RatingProps = {
  value: number;
  text: string | number;
};

const Rating = ({ value, text }: RatingProps) => {
  return (
    <div className="flex">
      <RatingStar value={value} />
      <RatingStar value={value} offset={1} />
      <RatingStar value={value} offset={2} />
      <RatingStar value={value} offset={3} />
      <RatingStar value={value} offset={4} />
      <span className="text-sm font-bold pl-1">{text && text}</span>
    </div>
  );
};
export default Rating;
