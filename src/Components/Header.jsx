import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const getData = () => {
  const date = new Date();
  return date.getHours();
};

const Header = () => {
  const [GreetingTxt, setGreetingTxt] = useState("Good Morning, user!");
  // const [userName, setUserName] = useState("Noah");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (getData() >= 12) {
      setGreetingTxt(`Good Afternoon`);
    } else if (getData() >= 16 && getData <= 2) {
      setGreetingTxt(`Good Evening`);
    } else {
      setGreetingTxt(`Good Morning`);
    }
    // setUserName("Noah");
  }, []);


  return (
   <header className="py-4 w-full">
      <div className="mx-auto px-4 flex items-center justify-between">
        <div className="flex font-bold items-center">
          <img
            src="/icon.svg"
            alt="Logo"
            className=" h-[40px] w-[40px] md:h-[60px] md:w-[60px] bg-[#fff7e4] p-2 border-2 md:border-4"
          />
          
          <h1 className="text-[#1f1a14] text-xl md:text-[32px] ml-2 font-bold">{GreetingTxt}</h1>
        </div>

       
        <div className="hidden md:flex space-x-4"> 
          <button className="px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-[#1f1a14] border-2 hover:bg-[#fff7e4] hover:text-[#1f1a14]">
            Profile
          </button>
          <button className="px-4 py-2 bg-[#fff7e4] text-[#1f1a14] border-[#1f1a14] border-2 hover:bg-[#1f1a14] hover:text-[#fff7e4]">
            Theme
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden"> 
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-2 py-1 bg-[#1f1a14] text-[#fff7e4] border-[#1f1a14] border-2" 
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? 'X' : '☰'}
          </button>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-4 pt-2 pb-3 space-y-1`}>
        <button className="block w-full text-left px-4 py-2 bg-[#1f1a14] text-[#fff7e4] border-[#1f1a14] border-2 hover:bg-[#fff7e4] hover:text-[#1f1a14]">
          Profile
        </button>
        <button className="block w-full text-left px-4 py-2 bg-[#fff7e4] text-[#1f1a14] border-[#1f1a14] border-2 hover:bg-[#1f1a14] hover:text-[#fff7e4]">
          Theme
        </button>
      </div>
    </header>
  );
};

export default Header;
