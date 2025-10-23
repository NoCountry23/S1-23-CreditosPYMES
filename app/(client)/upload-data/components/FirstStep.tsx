import React from "react";
import { useFormContext } from "react-hook-form";
import { StepContext } from "../page";

export default function FirstStep() {
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
          <span className="label-text">Nombre de la empresa</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          {...register("companyName", {
            required: "Este campo es obligatorio",
          })}
        />
        {errors.companyName && (
          <span className="text-red-500">
            {errors.companyName.message?.toString()}
          </span>
        )}
      </div>
      <button
        disabled={!!errors.companyName || !watch("companyName")}
        type={"button"}
        className="btn ml-auto"
        onClick={() => setStep(step + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
