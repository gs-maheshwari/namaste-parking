"use client"

import { useEffect } from "react"

import styles from './styles.module.css';
import { Button } from "@/components";

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={styles.flexColumn}>
            <h1>Something went wrong!</h1>
            <Button onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
}

export default Error