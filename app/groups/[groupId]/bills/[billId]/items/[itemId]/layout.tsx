import BillItemProvider from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/BillItemProvider";
import React from "react";

export default function BillItemLayout({children}: {
  children: React.ReactNode
}) {
  return <BillItemProvider>{children}</BillItemProvider>;
}