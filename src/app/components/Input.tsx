import { ChangeEvent } from "react";

interface Props {
  type: string;
  placeholder: string;
  isFit?: boolean;
  value?: string | number | readonly string[];
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const CInput = (props: Props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e);
      }}
      className={`border-[1px] px-[10px] py-[4px] text-[14px] ${
        props.isFit ? "w-fit" : ""
      }`}
    />
  );
};

export default CInput;
