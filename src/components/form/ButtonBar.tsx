import { PropsWithChildren } from "react";

export function ButtonBar({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col space-y-2">
      <hr />
      <div className="flex space-x-2 justify-center">
        {children}
      </div>
    </div>
  )
}
