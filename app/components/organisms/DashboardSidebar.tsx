"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../atoms/Logo";
import DashboardSidebarLinkItem from "../atoms/DashboardSidebarLinkItem";
import {
  DASHBOARD_COLLECT_MENU_LIST,
  DASHBOARD_OVERVIEW_MENU_LIST,
} from "@/routes";
import {
  Input,
  Select,
  SelectItem,
  SelectSection,
  SelectedItems,
  Selection,
} from "@nextui-org/react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/store/store";

const DashboardSidebar = () => {
  const [value, setValue] = useState<Selection>();
  const [inputValue, setInputValue] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  const [projects, loadingState, errorState] = useCollectionData(
    collection(db, "projects")
  );
  const projectRef = collection(db, "projects");
  const selectRef = useRef<any>();
  const userProjects = projects?.filter((el) => el.userId === session?.user.id);
  const setProject = useProjectStore((state) => state.setProject);

  useEffect(() => {
    setProject(userProjects?.[0].id);
  }, [userProjects?.[0].id]);

  const handleAddProject = async () => {
    const doc = await addDoc(projectRef, {
      userId: session?.user.id,
      name: inputValue,
    });
    updateDoc(doc, {
      id: doc.id,
    });
    setInputValue("");
    setIsOpen(false);
  };

  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4">
      <div className="mb-10">
        <Logo />
      </div>
      <Popover
        isOpen={isOpen}
        triggerRef={selectRef}
        placement="right"
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <div
          className="flex w-full flex-wrap md:flex-nowrap gap-4"
          ref={selectRef}
        >
          <Select
            isOpen={openSelect}
            onOpenChange={(open) => open !== openSelect && setOpenSelect(open)}
            items={userProjects}
            label="Select a project"
            className="max-w-xs"
            variant="bordered"
            placeholder="Select a project"
            selectedKeys={value || [userProjects?.[0].id]}
            onSelectionChange={setValue}
            onChange={(e) => setProject(e.target.value)}
          >
            {userProjects ? (
              <SelectSection showDivider title="Projects">
                {userProjects.map((project) => (
                  <SelectItem
                    key={project.id}
                    value={project.id}
                    textValue={project.name}
                  >
                    {project.name}
                  </SelectItem>
                ))}
              </SelectSection>
            ) : (
              <SelectSection showDivider title="Projects">
                <SelectItem key={"default"} value={"default"}>
                  {"default"}
                </SelectItem>
              </SelectSection>
            )}

            <SelectSection>
              <SelectItem
                key={"add-project"}
                value="add-project"
                isReadOnly
                onClick={() => {
                  setIsOpen(true);
                  setOpenSelect(false);
                }}
              >
                Add project
              </SelectItem>
            </SelectSection>
          </Select>
        </div>
        <PopoverContent>
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground">
              Add new project
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full items-end">
              <Input
                label="Project name"
                size="sm"
                variant="bordered"
                value={inputValue}
                onValueChange={setInputValue}
              />
              <Button style={{ width: "initial" }} onClick={handleAddProject}>
                Add
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
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
