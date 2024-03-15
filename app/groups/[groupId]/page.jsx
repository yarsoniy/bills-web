'use client';

import Group from "@/app/groups/[groupId]/components/Group";

export default function GroupPage({params}) {
  return (
    <>
      <Group groupId={params.groupId}></Group>
    </>
  )
}