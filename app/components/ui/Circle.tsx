import Image from "next/image";

interface Props {
  text: string;
  title: string;
  icon: string;
  iconAlt: string;
}

const Circle = ({ text, title, icon, iconAlt }: Props) => {
  return (
    <div className="rounded-full shadow-[0px_4px_50px_0px_#00000040]  w-[260px] h-[260px] xl:w-[280px] xl:h-[280px] bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3 lg:gap-4 items-center h-[180px] lg:h-[200px] w-[80%]">
        <div className="h-12 w-12  mb-1">
          <Image
            src={`/Icons/${icon}.svg`}
            alt={iconAlt}
            width={40}
            height={20}
            className="h-full w-full"
          />
        </div>

        <h4 className=" font-semibold ">{title}</h4>
        <p className="text-center text-sm text-grey-600">{text}</p>
      </div>
    </div>
  );
};

export default Circle;
