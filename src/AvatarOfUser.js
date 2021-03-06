import React, { useState, useContext, useEffect } from "react";
import { getUserData, updateUserData } from "./UsersData.js";
import ThemeColorContext from "./ThemeColorContext.js";
import MyError from "./MyError.js";
import UserIDContext from "./UserIDContext.js";

export default function AvatarOfUser() {
  const userID = useContext(UserIDContext);
  const themeColor = useContext(ThemeColorContext);
  const [myError, setMyError] = useState("");
  const [userAvatar, setUserAvatar] = useState(
    getUserData(userID).avatar || null
  );
  const styleLikeButton = `
    transition-all 
    duration-1000
    mx-4 py-2 px-4 
    rounded shadow-md
    cursor-pointer
    focus:outline-none 
    focus:shadow-outline
    ${themeColor.bg500}
    ${themeColor.hbg700}
    `;

  useEffect(() => {
    const timeId = setTimeout(() => setMyError(""), 5000);
    return () => clearTimeout(timeId);
  }, [myError]);

  function handleInputForAva(event) {
    let file = event.currentTarget.files[0];
    if (!file) return;
    if (file.size > 1200000) {
      const newError = `
      This image is big,
      try to upload smaller image (less than 1,2Mb)
      `;
      setMyError(newError);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserAvatar(reader.result);
      updateUserData(userID, "avatar", reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
      const newError = `
      Failed to read file,
      try to upload other image
      `;
      setMyError(newError);
    };
  }

  function handleDeleteAvatar() {
    updateUserData(userID, "avatar", null);
    setUserAvatar(null);
  }

  return (
    <div className="p-4">
      {userAvatar ? (
        <img src={userAvatar} alt="avatar" className="inline-block" />
      ) : (
        <></>
      )}
      <form
        encType="multipart/form-data"
        onSubmit={(event) => event.preventDefault()}
      >
        <label
          htmlFor="avatar"
          title="Click to set your avatar"
          className={styleLikeButton}
        >
          Avatar
        </label>
        <MyError>{myError}</MyError>
        {userAvatar ? (
          <span
            title="Click to delete your avatar"
            className={styleLikeButton}
            onClick={handleDeleteAvatar}
          >
            X
          </span>
        ) : (
          <></>
        )}
        <input
          id="avatar"
          type="file"
          accept="image/png, image/jpeg"
          className="uploadAvatar"
          onChange={handleInputForAva}
        ></input>
      </form>
    </div>
  );
}
