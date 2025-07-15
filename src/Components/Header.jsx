import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const getData = () => {
  const date = new Date();
  return date.getHours();
};

const Header = () => {
  const [GreetingTxt, setGreetingTxt] = useState("Good Morning, user!");
  const [userName, setUserName] = useState("Noah");

  useEffect(() => {
    if (getData() >= 12) {
      setGreetingTxt(`Good Afternoon,${userName}`);
    } else if (getData() >= 16 && getData <= 2) {
      setGreetingTxt(`Good Evening, ${userName}`);
    } else {
      setGreetingTxt(`Good Morning, ${userName}`);
    }
    setUserName("Noah");
  }, []);

  return (
    <header className=" py-4 w-[100%]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex font-bold">
          <img src="/icon.svg" alt="Logo" className="h-15 w-15  bg-[#fff7e4] p-2 border-4" />
          <h1 className="text-lg text-[#1f1a14] text-[32px]  ml-2 font-bold">{GreetingTxt}</h1>
        </div>
        

        <div className="space-x-4">
          <button className="px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-[#1f1a14] border-2 hover:bg-[#fff7e4] hover:text-[#1f1a14]">
            Profile
          </button>

          <button className="px-4 py-2 bg-[#fff7e4] text-[#1f1a14] border-[#1f1a14] border-2 hover:bg-[#1f1a14] hover:text-[#fff7e4]">
            Theme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
