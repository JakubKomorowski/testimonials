import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";

type Props = {};

const WidgetBuilderSidebar = (props: Props) => {
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
      <Tabs className="mt-2" radius="sm" aria-label="Options" fullWidth>
        <Tab key="static" title="Static">
          <div className="mt-6  ">
            <Card isPressable className="h-32 ">
              <CardBody className="justify-center">
                <Image
                  src={`/testimonialClassic.png`}
                  alt="form-icon"
                  width={500}
                  height={300}
                  className=" w-full object-contain "
                />
              </CardBody>
            </Card>
          </div>
        </Tab>
        <Tab key="carousel" title="Carousel">
          <div className="mt-6  ">
            <Card isPressable className="h-32 ">
              <CardBody className="justify-center">
                <Image
                  src={`/speachBubble.png`}
                  alt="form-icon"
                  width={500}
                  height={300}
                  className=" w-full object-contain "
                />
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </aside>
  );
};

export default WidgetBuilderSidebar;
