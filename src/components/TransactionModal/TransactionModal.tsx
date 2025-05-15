import React, { useState } from 'react';
import './TransactionModal.css';

interface TransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddTransaction: (
		amount: number,
		description: string,
		type: 'income' | 'expense'
	) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
	isOpen,
	onClose,
	onAddTransaction,
}) => {
	const [amount, setAmount] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [type, setType] = useState<'income' | 'expense'>('income');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const amountValue = parseFloat(amount);
		if (isNaN(amountValue) || amountValue <= 0) {
			alert('Please enter a valid amount');
			return;
		}

		if (!description.trim()) {
			alert('Please enter a description');
			return;
		}

		onAddTransaction(amountValue, description, type);
		resetForm();
		onClose();
	};

	const resetForm = () => {
		setAmount('');
		setDescription('');
		setType('income');
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header">
					<h2>Add Transaction</h2>
					<button className="close-button" onClick={onClose}>
						×
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="type">Transaction Type</label>
						<div className="type-selector">
							<button
								type="button"
								className={`type-button ${type === 'income' ? 'active' : ''}`}
								onClick={() => setType('income')}
							>
								Income
							</button>
							<button
								type="button"
								className={`type-button ${type === 'expense' ? 'active' : ''}`}
								onClick={() => setType('expense')}
							>
								Expense
							</button>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							min="0.01"
							step="0.01"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="0.00"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="What was this transaction for?"
							required
						/>
					</div>
					<div className="form-actions">
						<button type="button" className="cancel-button" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="submit-button">
							Add Transaction
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TransactionModal;
