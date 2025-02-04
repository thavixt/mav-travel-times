import classNames from "classnames";
import { PropsWithChildren } from "react";

export const BlockingOverlay = ({ active, children }: PropsWithChildren<{ active?: boolean }>) => {
  const classes = classNames({
    'blur-md pointer-events-none select-none grayscale': active,
  });
  return (
    <div className={classes}>
      {children}
    </div>
  )
}