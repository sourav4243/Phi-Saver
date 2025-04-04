"use client";

import { useEffect, useState } from "react";

export function LiveCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-green-500 font-mono">
      {count.toLocaleString()} users saving
    </span>
  );
} 