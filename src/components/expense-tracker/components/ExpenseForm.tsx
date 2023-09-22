import { z } from "zod";
import { categories } from "../categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string({ invalid_type_error: "Description is required" })
    .min(3, { message: "Minimum characters allowed is 3" })
    .max(50, { message: "Max characters allowed is 50" }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <small className="text-danger">{errors.description.message}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          {...register("amount", { required: true, valueAsNumber: true })}
        />

        {errors.amount && (
          <small className="text-danger">{errors.amount.message}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          {...register("category", { required: true })}
        >
          <option value=""></option>
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <small className="text-danger">{errors.category.message}</small>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
