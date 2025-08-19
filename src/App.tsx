import { ExpenseItem } from "./components/ExpenseItem";
import './App.css';

function App() {
  const sampleExpense = [
    {
      id: "1",
      description: "Lunch at Joe's Pizza",
      amount: 15.50,
      category: "Food",
      date: "2024-08-13"
    },
    {
      id: "2",
      description: "Monthly Metrocard",
      amount: 132.00,
      category: "Transportation",
      date: "2024-08-01"
    },
    {
      id: "3",
      description: "Coffee & Pastry",
      amount: 8.75,
      category: "Food",
      date: "2024-08-13"
    },
  ]

  return (
    <>
      <header className="app-header">
        <h1>My Expense Tracker</h1>
        <p>Professional expense management made simple</p>
      </header>

      <main className="expense-list">
        {sampleExpense.map(expense => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            description={expense.description}
            amount={expense.amount}
            category={expense.category}
            date={expense.date}
          />
        ))}
      </main>
    </>
  )
}

export default App
