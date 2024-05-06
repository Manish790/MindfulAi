import React from "react";
import manishProfile from "../assesst/manish-profile.jpg";

const Card = () => {
  const registeredUsers = [
    { name: "Manish", profileImage: manishProfile },
    {
      name: "Manish",
      profileImage: manishProfile
    },
  ];

  return (
    <div className="max-w-[800px] bg-white mx-auto top-[-1.5rem] relative flex flex-col justify-center items-center p-10">
      <p className="text-3xl font-bold text-cyan-700 mb-3">
        Welcome to MindFulAi
      </p>
      <div className="text-lg text-gray-400 mb-3">
        <p>
          Love is found in those wonderful connections that acquaint our souls.
        </p>
        <p>
          Come, embark on the journey of Indian dating and discover your soulmate.
        </p>
      </div>
      <h1 className="text-2xl font-bold text-cyan-700 mb-3">
        Latest Registered Members
      </h1>
      <div className="flex gap-5">
        {registeredUsers.map((user, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-cover bg-center rounded-full"
            style={{ backgroundImage: `url(${user.profileImage})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Card;
