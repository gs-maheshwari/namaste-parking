"use client";

import { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

const logError = (error: Error, info: ErrorInfo) => {
  console.error(error, info);
};

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

const CustomErrorBoundary = ({ children }: CustomErrorBoundaryProps) => (
  <ErrorBoundary fallback={<>Something went wrong</>} onError={logError}>
    {children}
  </ErrorBoundary>
);

export default CustomErrorBoundary;
