import React from "react";

const MiniCard = (props) => {
  const textStyle = {
    color: props.color, // Use props.color to set the color dynamically
  };
  return (
    <div className="mini-card h-[400px] w-[350px] py-[2rem] bg-white  mt-[3rem] p-[2rem] flex flex-col justify-center  rounded items-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
      <img
        src={props.cardLogo}
        alt=""
        className="rounded-full w-[8rem] h-[8rem]"
      />
      <h1 className="mt-[2rem] text-[2rem]  text-shadow-xl" style={textStyle}>
        {props.totalMembers ? props.totalMembers : props.feature}
      </h1>
      <h2 className="miniCardDesc mt-[3rem] text-lg">{props.miniCardDesc}</h2>
    </div>
  );
};

export default MiniCard;
