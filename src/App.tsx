import React, { useState } from 'react';
import Header from './components/Header/Header';
import ExpenseSummary from './components/ExpenseSummary/ExpenseSummary';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import type { ExpenseCategory } from './components/ExpenseCard/ExpenseCard';

// UPDATED - Use proper interface structure
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

function App() {
  // Application state for expense data - this is the only place expenses are stored
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      description: "Lunch at downtown cafe",
      amount: 12.50,
      category: "Food",
      date: "2024-01-15"
    },
    {
      id: 2,
      description: "Monthly bus pass",
      amount: 95.00,
      category: "Transportation", 
      date: "2024-01-14"
    },
    // UPDATED
    {
      id: 3,
      description: "Movie tickets",
      amount: 25.00,
      category: "Entertainment", 
      date: "2024-01-13"
    }
  ]);

  /**
   * Adds new expense to application state
   * This function is passed down to ExpenseForm component
   * @param {Omit<Expense, 'id'>} expenseData - New expense data without ID
   */
  const handleAddExpense = (expenseData: Omit<Expense, 'id'>): void => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now()
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const handleDeleteExpense = (id: number): void => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-5">
        <Header 
          title="Expense Tracker" 
          subtitle="Manage your spending with confidence" 
        />
        
        <main className="space-y-6">
          <ExpenseSummary 
            totalAmount={totalAmount}
            expenseCount={expenses.length}
            period="This Month"
          />
          
          <ExpenseForm onSubmit={handleAddExpense} />
          
          {/* FIXED: Pass expenses directly, not as initialExpenses */}
          <ExpenseList 
            expenses={expenses} 
            // UPDATED
            onDeleteExpense={handleDeleteExpense} 
          />
        </main>
      </div>
    </div>
  );
}

export default App;
