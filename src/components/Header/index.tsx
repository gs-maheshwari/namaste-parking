"use client";

import { signOut } from "@/actions";
import { User } from "@/types";
import { Button } from "../ui";

import styles from "./Header.module.css";

const Header = ({ user }: { user: User }) => {
  return (
    <header className={styles.header}>
      <span className={styles.email}>{user.email}</span>
      <Button variant="outline" onClick={() => signOut()}>
        Sign Out
      </Button>
    </header>
  );
};

export default Header;
