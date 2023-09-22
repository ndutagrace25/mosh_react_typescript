import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

interface FormData {
  name: string;
  age: number;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [person, setPerson] = useState({});

  const onSubmit = (data: FieldValues) => {
    setPerson(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="" className="form-lable">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          {...register("name", { required: true, minLength: 3 })}
        />
        {errors.name?.type === "required" && (
          <small className="text-danger mt-2">Name field is required</small>
        )}
        {errors.name?.type === "minLength" && (
          <small className="text-danger mt-2">
            Name must be at least 3 characters
          </small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Age
        </label>
        <input
          id="age"
          type="number"
          className="form-control"
          {...register("age", { required: true })}
        />
        {errors.age?.type === "required" && (
          <small className="text-danger mt-2">Age field is required</small>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
