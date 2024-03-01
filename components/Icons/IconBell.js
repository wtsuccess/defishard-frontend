import React from "react";

const IconBell = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.125 2.4375C10.125 1.4 10.9625 0.5625 12 0.5625C13.0375 0.5625 13.875 1.4 13.875 2.4375V3.9C17.8 4.75 20.75 8.25 20.75 12.4375V19.9375L23.25 22.4375V23.6875H0.75V22.4375L3.25 19.9375V12.4375C3.25 8.25 6.2 4.75 10.125 3.9V2.4375ZM12 6.1875C15.45 6.1875 18.25 8.9875 18.25 12.4375V21.1875H5.75V12.4375C5.75 8.9875 8.55 6.1875 12 6.1875ZM9.5125 24.95C9.5125 26.325 10.625 27.4375 12 27.4375C13.375 27.4375 14.4875 26.325 14.4875 24.95H9.5125Z"
      fill={color}
    />
  </svg>
);

export default IconBell;
