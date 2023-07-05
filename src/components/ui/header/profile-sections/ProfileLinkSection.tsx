import React from "react";
import { Button } from "@/components/shadcn/button";
import { BsPersonFill, BsBellFill, BsFillGearFill } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import type { IconType } from "react-icons";
interface Item {
  icon: IconType;
  label: string;
  link: string;
}
const menuItems = [
  {
    icon: <BsPersonFill />,
    label: "Profile",
    link: "about/profile",
  },
  {
    icon: <BsFillGearFill />,
    label: "Settings",
    link: "/",
  },
  {
    icon: <BsBellFill />,
    label: "Notification",
    link: "/",
  },
];
const renderedItems = menuItems.map((item, index) => (
  <Button
    key={index} // Add a key for each item for React's diffing algorithm
    className={`w-full flex align-middle items-center bg-accent-light ${
      index === 0
        ? "rounded-t-md"
        : index === menuItems.length - 1
        ? "rounded-b-md"
        : null
    }`}
    variant="menu"
  >
    <div className="flex-grow flex items-start">
      {item.icon}
      <span className="ml-2">{item.label}</span>
    </div>
    <div className="flex-shrink-0">
      <SlArrowRight />
    </div>
  </Button>
));

const ProfileLinkSection = () => {
  return (
    <div className="flex flex-col text-left z-50 items-start w-full rounded-t-md rounded-b-lg shadow-sm mt-2">
      {renderedItems}
    </div>
  );
};

export default ProfileLinkSection;
