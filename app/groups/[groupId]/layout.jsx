import GroupProvider from "@/app/groups/[groupId]/GroupProvider";

export default function GroupLayout({children}) {
  return <GroupProvider>{children}</GroupProvider>;
}