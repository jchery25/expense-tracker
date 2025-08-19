import React from "react";

import './ExpenseItem.css';

interface ExpenseItemProps {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
}

export function ExpenseItem({
    id,
    description,
    amount,
    category, 
    date
}: ExpenseItemProps){
    return(
        <div className="expense-item">
            <div className="expense-info">
                <h3 className="expense-description">{description}</h3>
                <span className="expense-category">{category}</span>
            </div>
            <div className="expense-details">
                <span className="expense-amount">${amount.toFixed(2)}</span>
                <span className="expense-date">{date}</span>
            </div>
        </div>
    )
}