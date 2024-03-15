'use client';

import { useEffect, useState } from "react";

export default function GroupPage({params}) {
  const [group, setGroup] = useState({});
  
  useEffect(() => {
    fetch('/api/v1/participant_group/' + params.groupId)
      .then((response) => response.json())
      .then((data) => {setGroup(data.data)})
  }, [params.groupId])

  return (
    <>
      <h1>Group '{params.groupId}'</h1>
      <div>Title: {group.title}</div>
    </>
  )
}