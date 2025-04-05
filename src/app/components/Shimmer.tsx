export interface Props {
  height?: number;
}
const Shimmer = (props: Props) => {
  return (
    <div
      className={`h-${
        props.height ?? "[200px]"
      } bg-gray-400 rounded-[8px] leading-relaxed mb-3 animate-pulse`}
    ></div>
  );
};

export default Shimmer;
