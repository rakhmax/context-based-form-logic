import { ComponentPropsWithoutRef, FC } from "react";
import block from "module-clsx";

import styles from "./footer.module.scss";

const b = block(styles);

export interface FooterProps extends ComponentPropsWithoutRef<"div"> {
  align?: "start" | "center" | "end";
  gap?: "8" | "16";
}

export const Footer: FC<FooterProps> = ({
  children,
  className,
  gap,
  align = "center",
  ...rest
}) => (
  <div className={b("root", { align, gap }, className)} {...rest}>
    {children}
  </div>
);
