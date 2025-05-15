import React from 'react';
import type { Transaction } from '../../types';
import './TransactionItem.css';

interface TransactionItemProps {
	transaction: Transaction;
	onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
	const formattedDate = new Date(transaction.date).toLocaleDateString();
	const formattedAmount = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(Math.abs(transaction.amount));

	return (
		<div className={`transaction-item ${transaction.type}`}>
			<div className="transaction-info">
				<span className="transaction-description">
					{transaction.description}
				</span>
				<span className="transaction-date">{formattedDate}</span>
			</div>
			<div className="transaction-amount">
				{transaction.type === 'income' ? '+' : '-'} {formattedAmount}
			</div>
			<button
				onClick={() => onDelete(transaction.id)}
				className="delete-button"
				aria-label="Delete transaction"
			>
				×
			</button>
		</div>
	);
};

export default TransactionItem;
