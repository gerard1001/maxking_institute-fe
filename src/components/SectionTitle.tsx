import Image from "next/image";
import React, { JSXElementConstructor } from "react";
import { IconType } from "react-icons";

interface SectionTitleProps {
  title: string;
  icon?: IconType;
  image?: string;
  rightSideActions?: JSX.Element | JSX.Element[] | string | null;
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <div className="py-2 border-b border-muted-foreground/30 flex items-center justify-between flex-wrap">
      <div className="flex items-start gap-2 mr-10">
        <h1 className="text-accent lg:text-xl text-sm font-bold uppercase">
          {props.title}
        </h1>
        {props.icon ? (
          <props.icon className="lg:text-xl text-sm xxs:block hidden" />
        ) : (
          <img
            src={`${props.image}`}
            alt="ison image"
            className="lg:w-[20px] w-[16px] aspect-square xxs:block hidden"
          />
        )}
      </div>
      <div>{props.rightSideActions}</div>
    </div>
  );
};

export default SectionTitle;
