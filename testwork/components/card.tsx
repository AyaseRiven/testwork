import React from "react";
import Image from "next/image";

interface CardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  footerText: string;
  tag?: "NEW" | "HOT" | "BEST" | "NONE";
  tagColor?: string;
  tagTextColor?: string;
}

const CardComponent: React.FC<CardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  footerText,
  tag = "NONE",
  tagColor = "bg-red-500",
  tagTextColor = "text-white",
}) => {
  let currentTagColor = tagColor;
  let currentTagTextColor = tagTextColor;
  let tagContent = null;

  if (tag === "NEW") {
    currentTagColor = "bg-red-500";
    currentTagTextColor = "text-white";
    tagContent = "NEW";
  } else if (tag === "HOT") {
    currentTagColor = "bg-yellow-400";
    currentTagTextColor = "text-gray-900";
    tagContent = "HOT";
  } else if (tag === "BEST") {
    currentTagColor = "bg-red-500";
    currentTagTextColor = "text-white";
    tagContent = "BEST";
  }

  return (
    <div className="relative w-full h-[480px] md:h-[500px] lg:h-[550px] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Image
        src={imageUrl}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />

      <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        {tagContent && (
          <div
            className={`absolute top-4 left-4 ${currentTagColor} ${currentTagTextColor} text-sm font-bold py-1 px-3 rounded-full shadow-md z-20`}
          >
            {tagContent}
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-lg">
          {title}
        </h3>
        <p className="text-base mb-3 opacity-90 drop-shadow-md">
          {description}
        </p>
        <p className="text-sm font-semibold opacity-80 drop-shadow">
          {footerText}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
