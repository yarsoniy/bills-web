import BillProvider from "@/app/groups/[groupId]/bills/[billId]/BillProvider";

export default function BillLayout({children}) {
  return <BillProvider>{children}</BillProvider>;
}