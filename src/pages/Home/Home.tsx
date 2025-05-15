import React, { useState, useEffect } from 'react';
import FinanceOverview from '../../components/FinanceOverview/FinanceOverview';
import TransactionItem from '../../components/TransactionItem/TransactionItem';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import type { Transaction } from '../../types';
import './Home.css';

const Home: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [transactions, setTransactions] = useState<Transaction[]>(() => {
		const savedTransactions = localStorage.getItem('transactions');
		if (savedTransactions) {
			// Parse the saved transactions and convert date strings back to Date objects
			return JSON.parse(savedTransactions).map((transaction: any) => ({
				...transaction,
				date: new Date(transaction.date),
			}));
		}
		return [];
	});

	// Save transactions to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	// Calculate balance
	const balance = transactions.reduce((total, transaction) => {
		return transaction.type === 'income'
			? total + transaction.amount
			: total - transaction.amount;
	}, 0);

	const handleAddTransaction = (
		amount: number,
		description: string,
		type: 'income' | 'expense'
	) => {
		const newTransaction: Transaction = {
			id: Date.now().toString(),
			amount,
			description,
			type,
			date: new Date(),
		};

		setTransactions([newTransaction, ...transactions]);
	};

	const handleReset = () => {
		if (
			window.confirm(
				'Are you sure you want to reset all transactions? This cannot be undone.'
			)
		) {
			setTransactions([]);
		}
	};
	const handleDeleteTransaction = (id: string) => {
		if (window.confirm('Are you sure you want to delete this transaction?')) {
			setTransactions(
				transactions.filter((transaction) => transaction.id !== id)
			);
		}
	};

	return (
		<div className="home-container">
			<header className="app-header">
				<div className="header-content">
					<h1>Finance Tracker</h1>
					<button onClick={handleReset} className="reset-button">
						Reset All
					</button>
				</div>
			</header>

			<main className="main-content">
				<FinanceOverview
					balance={balance}
					transactions={transactions}
					onAddClick={() => setIsModalOpen(true)}
				/>

				<div className="transactions-section">
					<h2>Transaction History</h2>
					<div className="transactions-list">
						{transactions.length > 0 ? (
							transactions.map((transaction) => (
								<TransactionItem
									key={transaction.id}
									transaction={transaction}
									onDelete={handleDeleteTransaction}
								/>
							))
						) : (
							<div className="empty-state">
								No transactions yet. Add your first transaction!
							</div>
						)}
					</div>
				</div>
			</main>

			<TransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onAddTransaction={handleAddTransaction}
			/>
		</div>
	);
};

export default Home;
