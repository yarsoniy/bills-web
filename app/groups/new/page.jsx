'use client';

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NewGroup() {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  }

  return (
    <Button onClick={handleBackClick}>Back</Button>
  )
}