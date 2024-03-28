import GroupProvider from "@/app/groups/[groupId]/GroupProvider";
import React from "react";

export default function GroupLayout({children}: {
  children: React.ReactNode
}) {
  return <GroupProvider>{children}</GroupProvider>;
}