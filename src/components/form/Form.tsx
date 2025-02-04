import { PropsWithChildren, useState } from "react";
import { Loader } from "../Loader";
import { BlockingOverlay } from "./BlockingOverlay";

export type FormValues = Record<string, string | number | boolean>;

interface FormProps<T extends FormValues> {
  defaultValues: T;
  pendingText?: string;
  onSubmit: (formData: T) => void | Promise<void>;
}

export function Form<T extends FormValues>(
  { children, pendingText, onSubmit }: PropsWithChildren<FormProps<T>>
) {
  const [formId] = useState(`form_${crypto.randomUUID()}`);
  const [blocking, setBlocking] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlocking(true);
  
    const formElement = document.forms.namedItem(formId)!;
    const formData = new FormData(formElement);
    const formValues = Object.fromEntries(formData.entries()) as T;
    await onSubmit(formValues);
  
    setBlocking(false);
  }

  return (
    <div className="relative">
      <BlockingOverlay active={blocking}>
        <form id={formId} onSubmit={onFormSubmit}>
          <div className="flex flex-col space-y-2">
            {children}
          </div>
        </form>
      </BlockingOverlay>
      {blocking ? (
        <div className="absolute top-0 left-0 w-full h-full">
          <Loader text={pendingText} />
        </div>
      ) : null}
    </div>
  )
}
