import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Iform } from "@/types/Form";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

interface Props {
  currentForm?: Iform & DocumentData;
}
const Dropzone = ({ currentForm }: Props) => {
  const { setValue, watch } = useFormContext();
  const logo = watch("logo", currentForm?.logo);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileWithPreview = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
    setValue("logo", fileWithPreview);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
    maxSize: 5000000,
  });

  const handleDeleteLogo = () => {
    setValue("logo", {
      path: "",
      preview: "",
      name: "",
      downloadUrl: "",
      size: 0,
      type: "image/jpeg",
      lastModified: currentForm?.logo.lastModified,
    });
  };

  const fileAcceptedClass =
    "cursor-pointer border-dashed border-2 border-blue-200 bg-blue-50 rounded-xl px-3 mt-2 text-sm h-40 flex items-center justify-center";
  const fileRejectedClass =
    "cursor-pointer border-dashed border-2 border-red-200 bg-red-50 rounded-xl px-3 mt-2 text-sm h-40 flex items-center justify-center";
  const fileDefaultClass =
    "cursor-pointer border-dashed border-2 border-gray-200 bg-gray-50 rounded-xl px-3 mt-2 text-sm h-40 flex items-center justify-center";

  return (
    <>
      <p className="text-sm cursor-default">Your logo</p>
      <div
        {...getRootProps({
          className: isDragAccept
            ? fileAcceptedClass
            : isDragReject
            ? fileRejectedClass
            : fileDefaultClass,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/Icons/upload.svg"
              alt="upload"
              width={30}
              height={30}
              className="w-8"
            />
            <p className="text-center">Drop the image here ...</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/Icons/upload.svg"
              alt="upload"
              width={30}
              height={30}
              className="w-8"
            />
            <p className="text-center">
              Drag 'n' drop, or click to select an image
            </p>
          </div>
        )}
      </div>
      <div className="w-full truncate mt-1">
        {fileRejections?.length === 0 ? (
          logo?.name && (
            <div className="flex p-2">
              <p className="text-sm truncate">{logo.name}</p>
              <Tooltip content="Delete" color="foreground">
                <button
                  onClick={handleDeleteLogo}
                  className="focus:outline-none w-10"
                  type="button"
                >
                  <Image
                    src="/Icons/close.svg"
                    width={20}
                    height={20}
                    alt="delete"
                    className="cursor-pointer"
                  />
                </button>
              </Tooltip>
            </div>
          )
        ) : (
          <p className="text-sm truncate">
            {" "}
            {fileRejections[0]?.errors[0]?.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Dropzone;
