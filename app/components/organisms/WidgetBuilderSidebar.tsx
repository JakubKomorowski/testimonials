import { widgetTemplatesData } from "@/app/data/widgetTemplatesData";
import { classNames } from "@/lib/utils";
import {
  Card,
  CardBody,
  Tab,
  Tabs,
  Badge,
  Popover,
  PopoverContent,
} from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState, Key, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

const WidgetBuilderSidebar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<any>();
  const { setValue, watch } = useFormContext();
  const [tabName, setTabName] = useState<Key | string>("static");
  const card = watch("card", "classic");
  useEffect(() => {
    setValue("card", "classic");
  }, []);

  return (
    <aside className="p-4 px-6 border-r border-gray-300 row-span-4 col-start-1 row-start-1">
      <div className="mb-16 flex gap-2 items-center">
        <Image
          src={`/Icons/widget.svg`}
          alt="form-icon"
          width={30}
          height={30}
          className="h-8 w-8 object-contain "
        />
        <p className="text-2xl">Widget Creator</p>
      </div>
      <div className="text-xl">Pick a template</div>
      <Tabs
        className="mt-2"
        radius="sm"
        aria-label="Options"
        fullWidth
        selectedKey={tabName as string}
        onSelectionChange={setTabName}
      >
        <Tab key="static" title="Static">
          <div className="mt-6  ">
            <Popover
              isOpen={isOpen}
              triggerRef={selectRef}
              placement="left-start"
              onOpenChange={(open) => {
                setIsOpen(open);
              }}
            >
              <Badge
                content="i"
                size="lg"
                shape="rectangle"
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
              >
                <Card
                  isPressable
                  className={classNames(
                    "h-32",
                    card === "classic" ? "border-primary border" : ""
                  )}
                  ref={selectRef}
                  onPress={() => setValue("card", "classic")}
                >
                  <CardBody className="justify-center">
                    <Image
                      src={`/classic.png`}
                      alt="form-icon"
                      width={500}
                      height={300}
                      className=" w-full object-contain "
                    />
                  </CardBody>
                </Card>
              </Badge>
              <PopoverContent>
                <div className="px-1 py-2 w-full">
                  <p className="text-small ">
                    Max 3 testimonials can be added.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Tab>
        <Tab key="carousel" title="Carousel">
          {widgetTemplatesData.map((item) => (
            <div className="mt-6" key={item.name}>
              <Card
                isPressable
                className={classNames(
                  "h-32",
                  item.name === card ? "border-primary border" : ""
                )}
                onPress={() => setValue("card", item.name)}
              >
                <CardBody className="justify-center">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={500}
                    height={300}
                    className=" w-full object-contain "
                  />
                </CardBody>
              </Card>
            </div>
          ))}
        </Tab>
      </Tabs>
    </aside>
  );
};

export default WidgetBuilderSidebar;
