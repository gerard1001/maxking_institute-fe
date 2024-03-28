import Image from "next/image";
import React, { JSXElementConstructor } from "react";
import { IconType } from "react-icons";

interface SectionTitleProps {
  title: string;
  icon?: IconType;
  image?: string;
  rightSideActions?: JSX.Element;
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <div className="py-2 border-b border-muted-foreground/30 flex items-center justify-between">
      <div className="flex items-start gap-2">
        <h1 className="text-accent text-xl font-bold uppercase">
          {props.title}
        </h1>
        {props.icon ? (
          <props.icon className="text-xl" />
        ) : (
          <Image src={`${props.image}`} width={25} height={25} alt="Norman" />
        )}
      </div>
      <div>{props.rightSideActions}</div>
    </div>
  );
};

export default SectionTitle;
