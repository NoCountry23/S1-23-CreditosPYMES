import React from "react";
import { useFormContext } from "react-hook-form";
import { StepContext } from "../page";

export default function ThirdStep() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const { step, setStep } = React.useContext(StepContext)!;
  return (
    <div className="flex flex-col gap-4 ">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Monto</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("amount", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.amount && (
          <span className="text-red-500">
            {errors.amount.message?.toString()}
          </span>
        )}
      </div>
      <button
        disabled={!!errors.amount || !watch("amount")}
        type={"button"}
        className="btn ml-auto"
        onClick={() => setStep(step + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
