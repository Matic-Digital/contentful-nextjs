import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <span className="text-gradient-pink text-lg font-extrabold">|||</span>
      <span className="text-xl font-bold">Matic</span>
    </Link>
  );
}
