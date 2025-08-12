import React, { useEffect, useState } from "react";
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getData = () => {
  const date = new Date();
  return date.getHours();
};

const Header = () => {
  const [GreetingTxt, setGreetingTxt] = useState("Good Morning, user!");
  const navigate = useNavigate();

  useEffect(() => {
    if (getData() >= 12) {
      setGreetingTxt(`Good Afternoon`);
    } else if (getData() >= 16 && getData <= 2) {
      setGreetingTxt(`Good Evening`);
    } else {
      setGreetingTxt(`Good Morning`);
    }
  }, []);

  return (
      <header className="py-4 md:py-6 w-full bg-transparent">
      <div className="mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo and Greeting */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src="/icon.svg"
              alt="Logo"
              className="h-10 w-10 md:h-16 md:w-16 bg-[#fff7e4] p-2 md:p-3 border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            />
          </div>
          
          <div className="ml-3 md:ml-4 min-w-0 flex-1">
            <h1 className="text-[#1f1a14] text-lg md:text-3xl font-bold leading-tight truncate">
              {GreetingTxt}
            </h1>
            <p className="text-[#1f1a14]/70 text-xs md:text-base truncate">
              Welcome back to your finance dashboard
            </p>
          </div>
        </div>

                 {/* Profile Button - Always Visible */}
         <div className="flex-shrink-0 ml-4"> 
           <button 
             onClick={() => navigate('/Profile')}
             className="flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 bg-[#1f1a14] text-[#fff7e4] border-2 border-[#1f1a14] rounded-lg shadow-[4px_4px_0_#1f1a14] hover:shadow-[6px_6px_0_#1f1a14] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 font-medium"
           >
             <User className="h-4 w-4 md:h-5 md:w-5" />
             <span className="hidden sm:inline">Profile</span>
           </button>
         </div>
      </div>
    </header>
  );
};

export default Header;
