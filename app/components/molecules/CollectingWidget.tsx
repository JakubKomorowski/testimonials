import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

const CollectingWidget = () => {
  return (
    <section className="bg-muted  p-6 rounded-large w-full ">
      <h2 className="text-xl font-bold mb-4">Collecting widget</h2>
      <Card className="p-4 py-3 min-w-[200px] max-w-[350px]">
        <CardBody>
          <div className="flex flex-col items-center ">
            <p className="text-xl text-center font-semibold mb-4 ">
              Do you like Medium.com?
            </p>
            <p className="text-center  text-sm mb-8">
              We would love to feature your testimonial on our site. You can
              promote your website too.
            </p>
            <Button
              size="sm"
              color="secondary"
              className="text-white mb-2 w-full text-sm"
            >
              Record a video
            </Button>
            <Button size="sm" color="primary" className="text-sm mb-2 w-full">
              Send in text
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default CollectingWidget;
