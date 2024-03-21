import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Input, Textarea, Tooltip } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { ICustomerDetails, IResponseQuestions, Iform } from "@/types/Form";
import Loading from "@/app/loading";
import { Switch } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import { nanoid } from "nanoid";
import { useFormCreationStore } from "@/store/store";
import useFormPersist from "react-hook-form-persist";

interface Props {
  currentForm: Iform;
  tabName: string;
  loading: boolean;
  // selectedChecks: any;
  // questions: IResponseQuestions[];
  // setSelectedChecks: any;
  // setQuestions: any;
}

const FormBuilderSidebar = ({ currentForm, tabName, loading }: Props) => {
  const { register, control, setValue, watch } = useFormContext();
  const [selectedChecks, setSelectedChecks] = useState<ICustomerDetails[]>([]);
  const [questions, setQuestions] = useState<IResponseQuestions[]>([]);

  const welcomeTitle =
    currentForm?.welcomeTitle &&
    watch("welcomeTitle", currentForm?.welcomeTitle);

  const responseQuestions: IResponseQuestions[] =
    currentForm?.responseQuestions &&
    watch("responseQuestions", currentForm?.responseQuestions);

  const customerDetails: ICustomerDetails[] =
    currentForm?.customerDetails &&
    watch("customerDetails", currentForm?.customerDetails);

  useEffect(() => {
    setValue("responseQuestions", currentForm?.responseQuestions);
    setValue("customerDetails", currentForm?.customerDetails);
  }, [loading]);

  // useEffect(() => {
  //   setSelectedChecks(currentForm?.customerDetails);
  // }, [currentForm?.customerDetails]);

  const handleEditQuestion = (
    e: ChangeEvent<HTMLInputElement>,
    q: IResponseQuestions
  ) => {
    const changedQuestions = responseQuestions?.map((item) => {
      if (item.id === q.id) {
        item.question = e.target.value;
      }
      return item;
    });
    setValue("responseQuestions", [...changedQuestions]);
  };

  const handleAddQuestion = () =>
    setValue("responseQuestions", [
      ...responseQuestions,
      { id: nanoid(6), question: "" },
    ]);

  const handleDeleteQuestion = (id: string) =>
    setValue(
      "responseQuestions",
      responseQuestions?.filter((item) => item.id !== id)
    );

  const handleSwitch = (name: string) => {
    const switched = customerDetails?.map((el: ICustomerDetails) => {
      if (el.name === name) {
        return {
          ...el,
          enabled: !el.enabled,
          required: el.enabled === false ? false : !el.required,
        };
      }
      return el;
    });
    setValue("customerDetails", [...switched]);
  };

  const handleSelect = (name: string) => {
    const selected = customerDetails?.map((el: ICustomerDetails) => {
      if (el.name === name) {
        return {
          ...el,
          required: !el.required,
        };
      }
      return el;
    });
    setValue("customerDetails", [...selected]);
  };

  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4 col-start-1 row-start-1">
      <div className="mb-12 flex gap-2 items-center">
        <Image
          src={`/Icons/marker.svg`}
          alt="form-icon"
          width={30}
          height={30}
          className="h-8 w-8 object-contain "
        />
        <p className="text-2xl">Form Creation</p>
      </div>
      <div className="mt-12 text-xl">{tabName}</div>
      {loading ? (
        <Loading />
      ) : tabName === "Welcome page" ? (
        <div className="mt-8 flex flex-col gap-4" key={1}>
          <Input
            radius="md"
            type="text"
            label="Welcome page title"
            // defaultValue={currentForm?.welcomeTitle}
            // defaultValue={welcomeTitle}
            value={welcomeTitle}
            variant="bordered"
            labelPlacement="outside"
            {...register("welcomeTitle")}
          />
          <Textarea
            radius="md"
            type="text"
            label="Welcome page title"
            defaultValue={currentForm?.welcomeMessage}
            variant="bordered"
            labelPlacement="outside"
            {...register("welcomeMessage")}
          />
        </div>
      ) : tabName === "Response page" ? (
        <div className="mt-8 flex flex-col gap-4" key={2}>
          <Input
            radius="md"
            type="text"
            label="Response page title"
            defaultValue={currentForm?.responseTitle}
            variant="bordered"
            labelPlacement="outside"
            {...register("responseTitle")}
          />
          {responseQuestions?.map((el: IResponseQuestions, i) => {
            return (
              <div key={el.id}>
                <Controller
                  control={control}
                  name="responseQuestions"
                  render={({ field }) => (
                    <Input
                      radius="md"
                      type="text"
                      label={`Question ${i + 1}`}
                      defaultValue={el.question}
                      onChange={(e) => handleEditQuestion(e, el)}
                      value={el.question}
                      variant="bordered"
                      labelPlacement="outside"
                      endContent={
                        <Tooltip content="Remove question">
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={() => handleDeleteQuestion(el.id)}
                          >
                            <Image
                              src="/Icons/trash.svg"
                              alt="arrow-right"
                              width={22}
                              height={22}
                            />
                          </button>
                        </Tooltip>
                      }
                    />
                  )}
                />
              </div>
            );
          })}
          <Tooltip content="Add question">
            <Button
              isIconOnly
              color="default"
              aria-label="Add question"
              className="ml-auto"
              onClick={() => handleAddQuestion()}
            >
              <Image
                src="/Icons/plus.svg"
                alt="arrow-right"
                width={30}
                height={30}
              />
            </Button>
          </Tooltip>
        </div>
      ) : tabName === "Customer details page" ? (
        <div className="flex mt-8  flex-col gap-4" key={3}>
          <Input
            radius="md"
            type="text"
            label="Customer details page title"
            defaultValue={currentForm?.customerTitle}
            variant="bordered"
            labelPlacement="outside"
            {...register("customerTitle")}
          />
          {currentForm?.customerDetails.map(({ name }) => {
            const isChecked = customerDetails.find(
              (item: ICustomerDetails) => name === item.name
            );
            return (
              <div key={name}>
                <p className="text-sm mb-1">{name}</p>
                <div className="flex items-end gap-4">
                  <Controller
                    control={control}
                    name="customerDetails"
                    render={({ field }) => (
                      <Switch
                        size="sm"
                        aria-label="Automatic updates"
                        onChange={() => handleSwitch(name)}
                        isSelected={isChecked?.enabled}
                        checked={isChecked?.enabled}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="customerDetails"
                    render={({ field }) => (
                      <Checkbox
                        size="sm"
                        onChange={() => handleSelect(name)}
                        checked={isChecked?.required && isChecked?.enabled}
                        isSelected={isChecked?.required && isChecked?.enabled}
                        isDisabled={!isChecked?.enabled}
                        className="h-fit"
                      >
                        <p className="text-sm">Required</p>
                      </Checkbox>
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4" key={4}>
          <Input
            radius="md"
            type="text"
            label="Thank you page title"
            defaultValue={currentForm?.thankYouTitle || "Than you title"}
            variant="bordered"
            labelPlacement="outside"
            {...register("thankYouTitle")}
          />
          <Textarea
            radius="md"
            type="text"
            label="Thank you page text"
            defaultValue={currentForm?.thankYouText}
            variant="bordered"
            labelPlacement="outside"
            {...register("thankYouText")}
          />
        </div>
      )}
    </aside>
  );
};

export default FormBuilderSidebar;
