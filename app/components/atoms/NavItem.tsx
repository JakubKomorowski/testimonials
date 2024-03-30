import Link from "next/link";

interface Props {
  href: string;
  text: string;
}

const NavItem = ({ href, text }: Props) => {
  return (
    <Link href={href} className="w-full flex justify-center">
      {text}
    </Link>
  );
};

export default NavItem;
