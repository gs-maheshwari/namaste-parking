"use client";

import { useActionState } from "react";
import { CustomErrorBoundary } from "@/components";
import { signIn } from "@/actions";

import { Input, SubmitButton } from "../ui";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [message, action] = useActionState(signIn, null);

  return (
    <CustomErrorBoundary>
      <section>
        <form action={action} className={styles.form}>
          <h3 className={styles.title}>Sign in</h3>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            required
          />
          <SubmitButton>Sign in</SubmitButton>
          {message && <p>{message}</p>}
        </form>
      </section>
    </CustomErrorBoundary>
  );
};

export default LoginForm;
