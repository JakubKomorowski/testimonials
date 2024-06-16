import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="w-full flex justify-center h-[calc(100vh-80px)]">
      <Spinner color="primary" />
    </div>
  );
};

export default Loading;
