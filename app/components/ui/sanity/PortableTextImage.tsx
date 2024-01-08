import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface IImageProps {
  src: string;
  width: number;
  height: number;
  loader: any;
}
const ImageComponent = ({ value }: any) => {
  const imageProps = useNextSanityImage(
    client,
    value
  ) as unknown as IImageProps;
  return (
    <div className="mx-[-30px] md:mx-[-40px] my-10 max-w-[780px]  relative">
      <Image
        src={imageProps.src}
        alt={value.alt || " "}
        loading="lazy"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default ImageComponent;
