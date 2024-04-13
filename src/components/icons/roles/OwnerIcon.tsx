import React from "react";

const OwnerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="icon"
    >
      <circle cx="256" cy="256" r="240" fill="#FFD700" />{" "}
      {/* Yellow circle for the base */}
      <path
        d="M256 56L64 288h192v224h192V288h192L256 56zm112 376h-80v80h-64v-80h-80v-64h80v-80h64v80h80z"
        fill="#FFF" // White color for the crown
      />
    </svg>
  );
};

export default OwnerIcon;
