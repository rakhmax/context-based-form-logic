import { ComponentPropsWithoutRef, FC } from "react";
import block from "module-clsx";

import styles from "./header.module.scss";

const b = block(styles);

export type HeaderProps = ComponentPropsWithoutRef<"div">;

export const Header: FC<HeaderProps> = ({ children, className, ...rest }) => (
  <div className={b("root", className)} {...rest}>
    {children}
  </div>
);
