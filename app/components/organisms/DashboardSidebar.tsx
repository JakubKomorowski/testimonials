"use client";
import React from "react";
import Logo from "../atoms/Logo";
import DashboardSidebarLinkItem from "../atoms/DashboardSidebarLinkItem";
import {
  DASHBOARD_COLLECT_MENU_LIST,
  DASHBOARD_OVERVIEW_MENU_LIST,
} from "@/routes";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";

const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

const DashboardSidebar = () => {
  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4">
      <div className="mb-10">
        <Logo />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          label="Select an animal"
          className="max-w-xs"
          variant="bordered"
          placeholder="Select an animal"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="my-8">
        <p className="text-gray-400 mb-2">Dashboard</p>
        <ul>
          {DASHBOARD_OVERVIEW_MENU_LIST.map((menu) => {
            return (
              <li key={menu.text}>
                <DashboardSidebarLinkItem {...menu}>
                  {menu.text}
                </DashboardSidebarLinkItem>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-gray-400 mb-2">Collect</p>
      <ul>
        {DASHBOARD_COLLECT_MENU_LIST.map((menu) => {
          return (
            <li key={menu.text}>
              <DashboardSidebarLinkItem {...menu}>
                {menu.text}
              </DashboardSidebarLinkItem>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
