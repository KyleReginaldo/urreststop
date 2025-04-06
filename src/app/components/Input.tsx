import { ChangeEvent } from "react";

interface Props {
  type: string;
  placeholder: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const CInput = (props: Props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.onChange(e);
      }}
      className="border-[1px] px-[10px] py-[4px] text-[14px]"
    />
  );
};

export default CInput;
