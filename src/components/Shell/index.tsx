import type { ReactNode } from "react"

import { getCurrentUser } from "@/services";
import Side from "../Side"
import Header from "../Header";

import styles from "./Shell.module.css"

interface ShellProps {
  children: ReactNode
}

const Shell = async ({ children } : ShellProps) => {
  const user = await getCurrentUser();
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Side />
      </aside>
      <div className={styles.mainContent}>
        <Header user={user} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}

export default Shell

