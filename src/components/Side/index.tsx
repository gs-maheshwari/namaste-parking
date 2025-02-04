"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Links, Routes } from "@/lib";

import styles from "./Side.module.css";

const isActive = (path: string, route: string) => {
  if (route === Routes.DASHBOARD) {
    return path === Routes.DASHBOARD;
  } else {
    return path.includes(route);
  }
};

const Side = () => {
  const path = usePathname();

  return (
    <nav className={styles.side}>
      {Links.map((link) => (
        <div key={link.route} className={styles.linkWrapper}>
          <Link
            href={link.route}
            className={`${styles.link} ${
              isActive(path, link.route) ? styles.activeLink : ""
            }`}
          >
            {link.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Side;
