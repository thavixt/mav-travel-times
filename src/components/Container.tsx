import classNames from "classnames";
import { PropsWithChildren } from "react";

/**
 * Wraps in a `flex flex-col space-y-2` div. Must provide x-y offset via classes (right-x, top-x, etc)
 * @param param0 
 * @returns 
 */
export function Container({ children, className }: PropsWithChildren<{ className: string }>) {
  const left = className.includes('left-');
  const right = className.includes('right-');
  const top = className.includes('top-');
  const bottom = className.includes('bottom-');
  const x = left || right;
  const y = top || bottom;

  if (!x || !y) {
    throw new Error(`Missing dimensions in <Container> component. Classes: '${className}' typeof ${typeof className}`);
  }

  return (
    <div className={classNames("z-10 absolute border-2 border-slate-300 bg-slate-200 rounded-lg p-2 shadow-xl flex flex-col space-y-2", className)}>{children}</div>
  )
}