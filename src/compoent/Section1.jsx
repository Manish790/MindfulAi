import React from "react";
import Card from "./Card";
import MiniCard from "./MiniCard";
const Section1 = () => {
  return (
    <div className="   max-h-fit  pb-20 bg-gradient-to-r from-blue-400 to-white flex  flex-col items-center  ">
      <Card />
      <p className="quotation text-[5rem] font-bold text-cyan-800 text-center">
        It All Starts With A Date
      </p>
      <p className="quotation-desc text-[1.5rem] text-gray-500 text-center ">
        Learn from them and try to make it to this board. This will for sure
        </p>
        <p className="text-center">
        boost you visibility and increase your chances to find you loved one.
      </p>
      <div className=" flex flex-wrap justify-center gap-5">
         <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/01.png"
          totalMembers={699}
          miniCardDesc="Total Members"
          color="red"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/02.png"
          totalMembers={65}
          miniCardDesc="Members Online"
          color="green"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/03.png"
          totalMembers={54}
          miniCardDesc="Women Online"
          color="orange"
        />
        <MiniCard
          cardLogo="https://demos.codexcoder.com/themeforest/html/ollya/assets/images/about/icon/04.png"
          totalMembers={34}
          miniCardDesc="Men Online"
          color="purple"
        />
      </div> 
    </div>
  );
};

export default Section1;
