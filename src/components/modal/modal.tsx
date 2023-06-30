import {
  ComponentPropsWithRef,
  CSSProperties,
  FC,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from "react";
import ReactModal, { Props as ReactModalProps } from "react-modal";
import block from "module-clsx";

import { Body } from "./body";
import { Footer } from "./footer";
import { Header } from "./header";

import styles from "./modal.module.scss";

const b = block(styles);

export interface ModalBaseProps
  extends Pick<ReactModalProps, "isOpen" | "children"> {
  onClose?: (event?: MouseEvent | KeyboardEvent) => void;
}

export interface ModalProps
  extends Omit<ReactModalProps, "onRequestClose">,
    ModalBaseProps {
  width?: CSSProperties["width"] | "full";
  height?: CSSProperties["height"];
  overlayStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  scroll?: "content" | "overlay";
}

const Main: FC<ModalProps> = ({
  children,
  width,
  height,
  overlayStyle,
  contentStyle,
  scroll = "content",
  onClose,
  ...props
}) => {
  return (
    <ReactModal
      {...props}
      closeTimeoutMS={150}
      onRequestClose={onClose}
      contentElement={Content}
      overlayElement={Overlay}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: scroll === "overlay" ? "auto" : "hidden",
          padding: "3rem",
          zIndex: "9999",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          ...overlayStyle,
        },
        content: {
          position: "relative",
          inset: 0,
          border: "none",
          borderRadius: "0.5rem",
          margin: "auto",
          padding: "1.5rem",
          height,
          maxHeight: scroll === "overlay" ? "auto" : "100%",
          width: width === "full" ? "100%" : width,
          maxWidth: "100%",
          ...contentStyle,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

const Overlay = (
  props: ComponentPropsWithRef<"div">,
  contentEl: ReactElement
) => {
  const afterOpen = props.className?.includes(
    "ReactModal__Overlay--after-open"
  );
  const beforeClose = props.className?.includes(
    "ReactModal__Overlay--before-close"
  );

  return (
    <div {...props} className={b("overlay", { afterOpen, beforeClose })}>
      {contentEl}
    </div>
  );
};

const Content = (props: ComponentPropsWithRef<"div">, children: ReactNode) => {
  const afterOpen = props.className?.includes(
    "ReactModal__Content--after-open"
  );
  const beforeClose = props.className?.includes(
    "ReactModal__Content--before-close"
  );

  return (
    <div {...props} className={b("content", { afterOpen, beforeClose })}>
      {children}
    </div>
  );
};

export const Modal = Object.assign(Main, { Header, Body, Footer });
