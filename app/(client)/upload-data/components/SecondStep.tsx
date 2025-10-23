import React from "react";
import { useFormContext } from "react-hook-form";
import { StepContext } from "../page";

export default function SecondStep() {
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
          <span className="label-text">Info financiera</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("financialInfo", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.financialInfo && (
          <span className="text-red-500">
            {errors.financialInfo.message?.toString()}
          </span>
        )}
      </div>
      <button
        disabled={!!errors.financialInfo || !watch("financialInfo")}
        type={"button"}
        className="btn ml-auto"
        onClick={() => setStep(step + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
