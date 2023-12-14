import { classNames, convertToSlug } from "@/lib/utils";
import { IHeading } from "@/types/PortableTextHeading";
import Link from "next/link";

interface IOutline {
  outline: IHeading[];
}

const getChildrenText = (props: IHeading) =>
  props.children
    .map((node: any) => (typeof node === "string" ? node : node.text || ""))
    .join("");

const TableOfContents = (props: IOutline) => {
  return (
    <ol className="text-sm max-w-[300px] xl:max-w-[250px]">
      {props.outline.map((heading: IHeading) => {
        let padding =
          heading.style === "h2"
            ? "ml-2 py-1"
            : heading.style === "h3"
            ? "ml-3"
            : heading.style === "h4"
            ? "ml-4"
            : "ml-0";
        return (
          <li key={heading._key} className={classNames(padding)}>
            <Link href={"#" + convertToSlug(getChildrenText(heading))}>
              {getChildrenText(heading)}
            </Link>
            {heading.subheadings.length > 0 && (
              <TableOfContents outline={heading.subheadings} />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default TableOfContents;
