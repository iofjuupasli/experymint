import React, { useEffect, useState, useContext } from "react";
import { getUserData, getDataForType } from "./UsersData.js";
import { reduceImageData, getInQ } from "./functionAccount.js";
import SendAndShowTextData from "./SendAndShowTextData.js";
import AccountAvatar from "./AccountAvatar.js";
import ThemeColorContext from "./ThemeColorContext.js";

const textStyle = (color) => {
  return `
    text-${color}
    font-bold
    text-xl
    `;
};

function DivMain({ children }) {
  const themeColor = useContext(ThemeColorContext);
  return (
    <div
      className={`
        h-screen
        App
        text-white
        bg-gradient-to-b 
        from-${themeColor}-500
        via-${themeColor}-600 
        to-${themeColor}-300
        `}
    >
      {children}
    </div>
  );
}

function Account({ CS, userID }) {
  const [userData, setUserData] = useState(() => {
    return {};
  });
  const [resultsData, setResultsData] = useState(() => {
    return {};
  });
  const [inQ, setInQ] = useState(0);

  const [changeData, setChangeData] = useState(true);

  useEffect(() => {
    const allResults = reduceImageData(resultsData);
    const userResults = userData.results;
    if (allResults && userResults) {
      setInQ(getInQ(userResults, allResults));
    }
  }, [resultsData, userData]);

  useEffect(() => {
    setResultsData(getDataForType(userID, "results"));
  }, [userID, changeData]);

  useEffect(() => {
    setUserData(getUserData(userID));
  }, [userID, changeData]);

  function handleChangeData() {
    setChangeData(!changeData);
  }

  return userData.name ? (
    <DivMain>
      <div className="flex">
        <AccountAvatar userID={userID} />
        <div className="flex-1 w-1/4">
          <div
            className="
                  break-word
                  font-bold
                  text-5xl"
          >
            {userData.name}
          </div>
          <div title="the amount of your choice" className={textStyle(`black`)}>
            Score:{userData.score || 0}
          </div>
          <div
            title="the amount of your mistruth"
            className={textStyle(`black`)}
          >
            Mistruth:{userData.mistruth || 0}
          </div>
          <div title="the uniqum index of you" className={textStyle(`black`)}>
            Unique:{inQ || 0}
          </div>
          <SendAndShowTextData
            onChangeData={handleChangeData}
            userID={userID}
            typeTextData="filter"
          />
          <SendAndShowTextData
            onChangeData={handleChangeData}
            userID={userID}
            typeTextData="tags"
          />
        </div>
      </div>
    </DivMain>
  ) : (
    <DivMain>""</DivMain>
  );
}

export default Account;
