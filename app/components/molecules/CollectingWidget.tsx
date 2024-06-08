import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

const CollectingWidget = () => {
  return (
    <section className="bg-muted  p-6 rounded-large w-full ">
      <h2 className="text-xl font-bold mb-4">Collectiong widget</h2>
      <Card>
        <CardBody>
          <div className="flex flex-col items-center px-2">
            <p className="text-xl text-center font-semibold mb-2 ">
              Do you like Medium.com?
            </p>
            <p className="text-center  text-sm mb-3">
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
