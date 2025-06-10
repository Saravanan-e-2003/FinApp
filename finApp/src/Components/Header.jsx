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
    <header>
      <h1>{GreetingTxt}</h1>
      <div>
        <button>Profile</button>
        <button>Theme</button>
      </div>
    </header>
  );
};

export default Header;
