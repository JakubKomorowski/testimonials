"use client";
import { db } from "@/app/firebase";
import { ROUTES } from "@/routes";
import { collection, deleteDoc, doc, DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Spinner, Tooltip } from "@nextui-org/react";
import { useProjectStore } from "@/store/store";
import { cn, sortByDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  firstTwo?: boolean;
}
const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
} as const;

const FormGroup = ({ firstTwo }: Props) => {
  const project = useProjectStore((state) => state.project);
  const [value, loadingState, errorState] = useCollectionData(
    project ? collection(db, "projects", project || "", "forms") : null
  );
  const slicedForms = sortByDate(value)?.slice(0, 2);
  const { toast } = useToast();

  // useEffect(() => {
  //   if (!project) return;
  //   (async () => {
  //     const formRef = collection(db, "projects", project, "forms");
  //     const snap = await getDocs(formRef).then((res) => res.docs);
  //     const newData = snap.map((doc) => {
  //       return doc.data();
  //     });
  //     setData(newData);
  //   })();
  // }, [project, data]);

  const copyToClipBoard = (copyMe: string) => {
    try {
      navigator.clipboard.writeText(copyMe);
      toast({
        title: "Copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
      });
    }
  };

  const handleDeleteForm = async (id: string) => {
    if (!project) return;
    const docRef = doc(db, "projects", project, "forms", id);
    await deleteDoc(docRef);
  };

  const formattedForms = firstTwo ? slicedForms : value;
  const className = firstTwo ? "bg-muted" : "";
  return (
    <section className={cn("p-6 rounded-large w-full", className)}>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Forms</h2>

        <div className="flex gap-2 items-center h-fit cursor-pointer">
          {firstTwo && (
            <Tooltip content="See all" color="foreground">
              <Link
                href={ROUTES.forms}
                className="flex gap-2 items-center h-fit cursor-pointer"
              >
                <Image
                  src={`/Icons/link.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-7 w-7 object-contain "
                />
              </Link>
            </Tooltip>
          )}

          <Tooltip content="Add form" color="foreground">
            <Link href={ROUTES.addForm}>
              <Image
                src={`/Icons/plus.svg`}
                alt="form-icon"
                width={30}
                height={30}
                className="h-7 w-7 object-contain "
              />
            </Link>
          </Tooltip>
        </div>
      </div>
      {!loadingState ? (
        <div className="flex gap-6 flex-col xl:flex-row flex-wrap">
          {formattedForms?.map((el: DocumentData) => {
            const time = new Date(el.createdAt.seconds * 1000).toLocaleString(
              "en-US",
              options
            );
            return (
              <div
                key={el.id}
                className="px-3 pt-3 pb-5  rounded-lg bg-container2 flex-1 min-w-[400px]"
              >
                <div className=" flex-1 flex">
                  <Image
                    src={`/Icons/form.svg`}
                    alt="form-icon"
                    width={30}
                    height={30}
                    className="h-8 w-8 object-contain "
                  />
                  <div className="mt-1 pl-2 ">
                    <h3 className="text-xl font-bold">{el.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Created: {time}
                    </p>
                    <p className="mb-4">Responses: 1</p>
                  </div>
                  <div className="flex gap-2 h-fit ml-auto shrink-0">
                    <Tooltip content="Edit" color="foreground">
                      <div className="cursor-pointer flex-1 shrink-0">
                        <Link href={`${ROUTES.forms}/${el.id}`}>
                          <Image
                            src={`/Icons/edit.svg`}
                            alt="form-icon"
                            width={30}
                            height={30}
                            className="h-6 w-6 object-contain "
                          />
                        </Link>
                      </div>
                    </Tooltip>
                    <Tooltip content="Delete" color="foreground">
                      <button
                        onClick={() => handleDeleteForm(el.id)}
                        className="cursor-pointer flex-1 shrink-0"
                      >
                        <Image
                          src={`/Icons/trash.svg`}
                          alt="form-icon"
                          width={30}
                          height={30}
                          className="h-6 w-6 object-contain "
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip content="Copy" placement="top-end" color="foreground">
                  <div
                    onClick={() =>
                      copyToClipBoard(
                        `https://www.trustcatcher.com${ROUTES.form}/${el.id}`
                      )
                    }
                    className="p-2 px-4 rounded-lg bg-container3 text-sm flex gap-4 items-center cursor-pointer ml-9 w-fit max-w-80"
                  >
                    <p className="text-ellipsis overflow-hidden">{`trustcatcher.com${ROUTES.form}/${el.id}`}</p>
                    <Image
                      src={`/Icons/copy.svg`}
                      alt="form-icon"
                      width={30}
                      height={30}
                      className="h-5 w-5 object-contain "
                    />
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center h-[calc(100vh-180px)]">
          <Spinner color="primary" />
        </div>
      )}
    </section>
  );
};

export default FormGroup;
