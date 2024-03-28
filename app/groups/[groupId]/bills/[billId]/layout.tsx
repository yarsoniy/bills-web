import BillProvider from "@/app/groups/[groupId]/bills/[billId]/BillProvider";
import React from "react";

export default function BillLayout({children}: {
  children: React.ReactNode
}) {
  return <BillProvider>{children}</BillProvider>;
}