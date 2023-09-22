import { useState } from "react";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "AAA", amount: 200, category: "Utilities" },
    { id: 2, description: "BBB", amount: 200, category: "Utilities" },
    { id: 3, description: "CCC", amount: 200, category: "Utilities" },
    { id: 4, description: "DDD", amount: 200, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const onDelete = (id: number) => {
    const remainingExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(remainingExpenses);
  };

  const filterCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) => {
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
          }}
        />
      </div>

      <h3>Filter</h3>
      <ExpenseFilter onSelectCategory={filterCategory} />
      <ExpenseList
        expenses={
          selectedCategory
            ? expenses.filter((item) => item.category === selectedCategory)
            : expenses
        }
        onDelete={onDelete}
      />
    </div>
  );
};

export default App;
