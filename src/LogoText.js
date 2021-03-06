import React, { useContext, useEffect, useRef } from "react";
import ThemeColorContext from "./ThemeColorContext.js";

export default function LogoText({ children }) {
  const ref = useRef();
  const themeColor = useContext(ThemeColorContext);
  const style = `
    transition-all 
    duration-1000
    text-5xl 
    font-bold
    ${themeColor.text300} 
    `;
  const start = `opacity-0`;
  const fin = `opacity-100`;

  function animation() {
    ref.current.className = style + fin;
  }

  useEffect(() => {
    animation();
  });

  return (
    <p ref={ref} className={style + start}>
      {children}
    </p>
  );
}
