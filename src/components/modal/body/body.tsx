import { ComponentPropsWithoutRef, FC } from "react";
import block from "module-clsx";

import styles from "./body.module.scss";

const b = block(styles);

export interface BodyProps extends ComponentPropsWithoutRef<"div"> {
  align?: "start" | "center" | "end";
}

export const Body: FC<BodyProps> = ({
  children,
  className,
  align,
  ...rest
}) => (
  <div className={b("root", { align }, className)} {...rest}>
    {children}
  </div>
);
