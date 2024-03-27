import BillItemProvider from "@/app/groups/[groupId]/bills/[billId]/items/[itemId]/BillItemProvider";

export default function BillItemLayout({children}) {
  return <BillItemProvider>{children}</BillItemProvider>;
}