// src/components/ExpenseList/ExpenseList.tsx
import React, { useState } from 'react';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
// UPDATED
import type { ExpenseCardProps, ExpenseCategory } from '../ExpenseCard/ExpenseCard';
import './ExpenseList.css';

// UPDATED
type Expense = ExpenseCardProps;
type FilterOption = 'All' | ExpenseCategory;

// UPDATED
interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense?: (id: number) => void;
}

// UPDATED
const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onDeleteExpense     
}) => {
// UPDATED
  const [filterCategory, setFilterCategory] = useState<FilterOption>('All');

  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === filterCategory);

  const filteredTotal = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // UPDATED
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value as FilterOption);
  };

  return (
    <div className="expense-list">
      <div className="expense-controls">
        <h2>Your Expenses</h2>
        
        <div className="filter-controls">
          <label htmlFor="category-filter">Filter by category:</label>
          <select 
            id="category-filter"
            value={filterCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="expense-summary">
        <p>
          Total: ${filteredTotal.toFixed(2)} ({filteredExpenses.length} expenses)
        </p>
      </div>

      <div className="expense-items">
      
        {filteredExpenses.length === 0 ? (
          <p className="no-expenses">
            No expenses found. Add some expenses to get started!
          </p>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              onDelete={onDeleteExpense}
              // OPTIONAL:
              // highlighted={expense.amount > 50} // Highlight expensive items
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;