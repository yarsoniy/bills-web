'use client'

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
      <button onClick={handleClick}>Click me! {count}</button>
    </>
  )
}