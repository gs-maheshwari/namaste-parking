"use client";

import type { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
      <input className={styles.input} {...props} />
    </div>
  );
};

export default Input;
