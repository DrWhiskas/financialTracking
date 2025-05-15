import React from "react";
import type { Transaction } from "../../types";
import './FinanceOverview.css';

interface FinanceOverviewProps {
  transactions: Transaction[];
  balance: number;
  onAddClick: () => void;
}


export default function FinanceOverview({
	transactions,
	balance,
	onAddClick,
}: FinanceOverviewProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('de-DE', {
			style: 'currency',
			currency: 'EUR',
		}).format(amount);
	};
	// Calculate total income and expenses
	const totalIncome = transactions
		.filter((t) => t.type === 'income')
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpense = transactions
		.filter((t) => t.type === 'expense')
		.reduce((sum, t) => sum + t.amount, 0);

	return (
		<div className="finance-overview">
			<div className="balance-card">
				<h2>Current Balance</h2>
				<div className="balance-amount">{formatCurrency(balance)}</div>
				<button className="add-transaction-button" onClick={onAddClick}>
					Add Transaction
				</button>
			</div>

			<div className="summary-cards">
				<div className="summary-card income">
					<h3>Income</h3>
					<span className="summary-amount">+{formatCurrency(totalIncome)}</span>
				</div>
				<div className="summary-card expense">
					<h3>Expenses</h3>
					<span className="summary-amount">
						-{formatCurrency(totalExpense)}
					</span>
				</div>
			</div>
		</div>
	);

};
