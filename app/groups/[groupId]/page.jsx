'use client';

import Group from "@/app/groups/[groupId]/components/Group";
import BillList from "@/app/groups/[groupId]/components/BillList";

export default function GroupPage({params}) {
  return (
    <>
      <Group groupId={params.groupId} />
      <BillList groupId={params.groupId} />
    </>
  )
}