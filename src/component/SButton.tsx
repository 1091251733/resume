import { Tooltip, Button } from "@heroui/react";
import { ReactNode } from "react";
interface SButtonProps {
  tooltip?: ReactNode | string;
  tooltipColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "foreground";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "none" | "full";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?:
    | "shadow"
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "ghost";
  disable?: boolean;
  loading?: boolean;
  icon?: boolean;
  className?: string;
  children: React.ReactNode; // 这里定义children作为插槽内容
  onClick: () => void;
}

function SButton({
  tooltip,
  tooltipColor = "default",
  size = "md",
  radius = "md",
  color = "default",
  variant = "solid",
  disable = false,
  loading = false,
  icon = false,
  children,
  className,
  onClick,
}: SButtonProps): any {
  const buttonContent = (
    <Button
      className={className}
      size={size}
      radius={radius}
      color={color}
      variant={variant}
      isDisabled={disable}
      isLoading={loading}
      isIconOnly={icon}
      onPress={onClick}
    >
      {children}
    </Button>
  );

  return tooltip ? (
    <Tooltip
      showArrow
      placement="bottom"
      color={tooltipColor}
      content={tooltip}
    >
      {buttonContent}
    </Tooltip>
  ) : (
    buttonContent
  );
}

export default SButton;
