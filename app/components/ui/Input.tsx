"use client";
import React, { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type: HTMLInputTypeAttribute;
  name: Path<T>;
  placeholder?: string;
  label: string;
};

const Input = <T extends FieldValues>({
  type,
  name,
  placeholder,
  label,
}: InputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6 w-full mt-4">
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-4 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            id={name}
            type={type}
            autoComplete={name}
            placeholder={placeholder}
            {...register(name)}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:primary-foreground sm:text-sm sm:leading-6"
          />
        </div>
        <p className="text-sm text-red-600 pt-1">
          {errors[name]?.message as string}
        </p>
      </div>
    </div>
  );
};

export default Input;
