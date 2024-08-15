import { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

const BottomDockLayout = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 400px;
  height: 60px;

  background-color: #01abff;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 18px;
  font-weight: 700;
`;

interface BottomDockProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

export const BottomDock = ({ children, ...props }: BottomDockProps) => {
  return <BottomDockLayout {...props}>{children}</BottomDockLayout>;
};
