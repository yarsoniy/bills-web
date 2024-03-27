import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Home page</h1>
      <Link href="/groups">Groups</Link>
    </>
  );
}
