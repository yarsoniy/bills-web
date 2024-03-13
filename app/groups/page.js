'use client'

import { Button } from "@mui/material";
import { useState } from "react";

export default function GroupsPage() {
  const [count, setCount] = useState(0);

  let localCount = 0;
  
  const handleClick = () => {
    console.log(localCount++);
    setCount(count + 1);
  }
  
  return (
    <>
      <h1>Groups Page</h1>
      <Button variant="contained" onClick={handleClick}>Hello world {count}</Button>
    </>
  )
}