// src/components/ExpenseCard/ExpenseCard.tsx
import React from 'react';
export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';
export type SortOption = 'date' | 'amount' | 'category';
export type FilterOption = 'All' | ExpenseCategory;

export interface ExpenseCardProps {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;         // UPDATED
  date: string;
  // Optional props
  onDelete?: (id: number) => void;    // UPDATED
  highlighted?: boolean;              // UPDATED
  showCategory?: boolean;            // UPDATED
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  id, 
  description, 
  amount, 
  category, 
  date,
  highlighted = false,                // UPDATED
  showCategory = true,                // UPDATED
  onDelete                            // UPDATED
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // UPDATED
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    // UPDATED
    <article className={`
      bg-white rounded-lg p-4 mb-3 shadow-md 
      hover:shadow-lg transition-all duration-200 
      border-l-4 border-blue-500 ${highlighted ? 'border-l-orange-500 bg-orange-50' : 'border-l-blue-500'}
    `}>
      <div className="flex justify-between items-center mb-2">
        {showCategory && (
          <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">{category}</span>
        )}
        <time className="text-gray-500 text-sm" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="space-y-4">
        <h3 className="mb-2 text-base font-medium text-gray-900">{description}</h3>
        <p className="m-0 text-lg font-bold text-green-600">{formattedAmount}</p>
        
        {onDelete && (
          <button 
            className="
              absolute top-2 right-2
              bg-red-500 hover:bg-red-600
              text-white border-0 rounded-full
              w-6 h-6 cursor-pointer text-base
              flex items-center justify-center
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-400
            " 
            onClick={handleDelete}
            aria-label="Delete expense"
          >
            ×
          </button>
        )}
      </div>
    </article>
  );
};

export default ExpenseCard;