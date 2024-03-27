'use client';

import Group from "@/app/groups/[groupId]/components/Group";
import BillList from "@/app/groups/[groupId]/components/BillList";

export default function GroupPage({params}) {
  return (
    <>
      <Group />
      <BillList groupId={params.groupId} />
    </>
  )
}