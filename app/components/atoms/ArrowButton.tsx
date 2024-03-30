import { Button } from "@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

interface Props {
  onClick: () => void;
  orientation: string;
  disabled: boolean;
}

const ArrowButton = ({ onClick, orientation, disabled }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className=" h-12 w-12 rounded-full hidden md:flex"
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
