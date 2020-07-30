import React from "react";

interface IProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  buttonText: string;
}

const Button = (props: IProps) => {
  const { buttonText, onClick } = props;

  return (
    <button
      className="f6 br1 ba ph3 pv2 mb2 dib dark-green bg-white"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
