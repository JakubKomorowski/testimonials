import { Button } from "@/components/ui/button";
import { classNames } from "@/lib/utils";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
  onClick: () => void;
  orientation: string;
  disabled: boolean;
  preview?: boolean;
}

const ArrowButton = ({ onClick, orientation, disabled, preview }: Props) => {
  const ArrowButtonClass = preview
    ? "h-12 w-12 rounded-full hidden xl:flex"
    : "h-12 w-12 rounded-full hidden md:flex";
  return (
    <Button
      variant="ghost"
      size="icon"
      className={classNames(ArrowButtonClass)}
      disabled={disabled}
      onClick={onClick}
    >
      {orientation === "next" ? (
        <>
          <FaChevronRight size={25} color="grey" />
          <span className="sr-only">Next slide</span>
        </>
      ) : (
        <>
          <FaChevronLeft size={25} color="grey" />
          <span className="sr-only">Previous slide</span>
        </>
      )}
    </Button>
  );
};

export default ArrowButton;
