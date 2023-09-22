import { categories } from "../categories";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="form-select my-3"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option value={category} key={index}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
