// src/components/ExpenseCard/ExpenseCard.tsx
import React from 'react';
import './ExpenseCard.css';

// UPDATED
export type ExpenseCategory = 'Food' | 'Transportation' | 'Entertainment' | 'Other';

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
    <article className={`expense-card ${highlighted ? 'expense-card--highlighted' : ''}`}>
      <div className="expense-header">
        // UPDATED
        {showCategory && (
          <span className="expense-category">{category}</span>
        )}
        <time className="expense-date" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="expense-body">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>
        
        {onDelete && (
          <button 
            className="expense-delete" 
            onClick={handleDelete}
            aria-label="Delete expense"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        )}
      </div>
    </article>
  );
};

export default ExpenseCard;