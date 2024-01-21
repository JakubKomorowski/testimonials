import { IHeading } from "@/types/PortableTextHeading";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const get = (object: any, path: any) =>
  path.reduce((prev: any, curr: any) => prev[curr], object);
const getObjectPath = (path: number[]) =>
  path.length === 0
    ? path
    : ["subheadings"].concat(path.join(".subheadings.").split("."));

export const parseOutline = (ast: IHeading[]) => {
  const outline = { subheadings: [] };
  const headings = ast;
  const path: number[] = [];
  let lastLevel = 0;

  headings.forEach((heading: IHeading) => {
    const level = Number(heading.style.slice(1));
    heading.subheadings = [];

    if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
    else if (level === lastLevel) path.pop();

    const prop = get(outline, getObjectPath(path));
    prop.subheadings.push(heading);
    path.push(prop.subheadings.length - 1);
    lastLevel = level;
  });

  return outline.subheadings;
};

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const convertDateFormat = (date: Date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;
  return new Date(date).toLocaleDateString("en-US", options);
};

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");

export const firstTwoLetters = (name: string, mail: string) => {
  const firstTwoChars = mail?.slice(0, 2).toUpperCase();
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  let initials;
  if (name) {
    initials = [...name.matchAll(rgx)] || [];
  }
  const formatedInitials = (
    (initials?.shift()?.[1] || "") + (initials?.pop()?.[1] || "")
  ).toUpperCase();
  return formatedInitials || firstTwoChars;
};
