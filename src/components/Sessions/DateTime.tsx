"use client";

import { useEffect, useState } from "react";

const formatDate = (isoString: string) => {
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
};

export const DateTime = ({ isoDate }: { isoDate: string }) => {
  const [formattedTime, setFormattedTime] = useState("Loading...");

  useEffect(() => {
    setFormattedTime(formatDate(isoDate));
  }, [isoDate]);

  return <span>{formattedTime}</span>;
};
