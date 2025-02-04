"use client";

import { useFormStatus } from "react-dom";

import Button, { ButtonProps } from "../Button";
import Spinner  from "../Spinner";

const SubmitButton = ({ children, ...btnProps }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...btnProps} disabled={pending}>
      {pending ? (
        <>
          <Spinner />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
