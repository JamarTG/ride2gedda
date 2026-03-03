import React from "react";
import { ICON_SIZE } from "./iconSizes";

interface DynamicIconProps {
  Icon: React.ElementType;     
  size?: number;                
  className?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  Icon,
  size = ICON_SIZE.nav,
  className,
}) => {
  return <Icon size={size} className={className} />;
};