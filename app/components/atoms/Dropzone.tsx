import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Iform } from "@/types/Form";
import { DocumentData } from "firebase/firestore";

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
    const file = {
      name: acceptedFiles[0].name,
      size: acceptedFiles[0].size,
      type: acceptedFiles[0].type,
    };
    setValue("logo", file);
  }, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png", ".jpg", ".jpeg"],
      },
      multiple: false,
      maxSize: 5000000,
    });

  console.log(logo);

  return (
    <>
      <p className="text-sm cursor-default">Your logo</p>
      <div
        {...getRootProps({
          className:
            "cursor-pointer border-dashed border-2 border-gray-200 bg-gray-50 rounded-xl px-3 mt-2 text-sm h-40 flex items-center justify-center",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="w-full truncate mt-1">
        {fileRejections?.length === 0 ? (
          <p className="text-sm truncate">{logo?.name}</p>
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
