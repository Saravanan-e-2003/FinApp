import React, { useEffect, useState } from "react";

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
  }, []);

  return (
    <header className="bg-white shadow-md py-4 w-[100%]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          <img src="../public/vite.svg" alt="Logo" className="h-10 w-10" />
        </div>

        <h1 className="text-lg text-gray-700">{GreetingTxt}</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Profile
          </button>

          <button className="px-4 py-2 bg-gray-200 text-white-800 rounded hover:bg-blue-700">
            Theme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
