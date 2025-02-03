"use client";

import { useFormStatus } from "react-dom";

import Button, { ButtonProps } from "../Button";
import styles from "./SubmitButton.module.css";
import { Spinner } from "../Spinner";

const SubmitButton = ({ children, ...btnProps }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...btnProps} disabled={pending}>
      {pending ? (
        <>
          <Spinner className={styles.loader} />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
