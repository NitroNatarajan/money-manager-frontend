import React from 'react';
import "../resources/analytics.css"
import { Progress } from 'antd';

function Analytics({ transactions }) {
    // transaction analytics
    const totalTransaction = transactions.length;
    const totalIncomeTransaction = transactions.filter((transaction) => transaction.type === "income").length;
    const totalExpenseTransaction = transactions.filter((transaction) => transaction.type === "expense").length;
    const totalIncomeTransactionPercentage = totalIncomeTransaction / totalTransaction * 100;
    const totalExpenseTransactionPercentage = totalExpenseTransaction / totalTransaction * 100;
    // transaction turnover 

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = transactions.filter((ele) => ele.type === "income").reduce((acc, transac) => acc + transac.amount, 0)
    const totalExpenseTurnover = transactions.filter((ele) => ele.type === "expense").reduce((acc, trans) => acc + trans.amount, 0)
    const totalIncomeTurnOverPercentage = totalIncomeTurnover / totalTurnover * 100;
    const totalExpenseTurnOverPercentage = totalExpenseTurnover / totalTurnover * 100;

    const incomeCategories = ["salary", "freelance"];
    const expenseCategories1 = ["entertainment", "education", "medical", "travel"];
    const expenseCategories2 = ["investment", "tax", "housing", "foodAndClothes"]
    return (<div>
        <div className='row analytics d-flex justify-content-center'>
            <div className='col-md-6' >
                <div className='transactions-count'>
                    <h4>Total Transactions: {totalTransaction}</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <h5>Income: {totalIncomeTransaction}</h5>
                            <h5>Expense: {totalExpenseTransaction}</h5>
                        </div>
                        <div className="progress-bars d-flex justify-content-between">
                            <Progress strokeColor="green" type="circle" percent={totalIncomeTransactionPercentage.toFixed(0)} />
                            <Progress strokeColor="red" type="circle" percent={totalExpenseTransactionPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='transactions-turnover'>
                    <h4>Total Turnover: {totalTurnover}</h4>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <h5>Income: {totalIncomeTurnover}</h5>
                            <h5>Expense: {totalExpenseTurnover}</h5>
                        </div>
                        <div className="progress-bars">
                            <Progress strokeColor="green" type="circle" percent={totalIncomeTurnOverPercentage.toFixed(0)} />
                            <Progress strokeColor="red" type="circle" percent={totalExpenseTurnOverPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-5 category-analysis">
            <div className="col-md-4">
                <div className='income-category-analysis'>
                    <h3>Income - category wise analysis</h3>
                    {incomeCategories.map((category) => {
                        const amount = transactions.filter((t) => t.type === "income" && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                        return (
                            <div>
                                <h5>{category}</h5>
                                <Progress percent={amount ? ((amount / totalIncomeTurnover) * 100).toFixed(0) : 0} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="col-md-8">
                <div className='row expense-category'>
                    <h3>Expenses - category wise analysis</h3>
                    <div className='col-md-6'>
                        <div className='expense-category-analysis'>

                            {expenseCategories1.map((category) => {
                                const amount = transactions.filter((t) => t.type === "expense" && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                                return (
                                    <div>
                                        <h5>{category}</h5>
                                        <Progress percent={amount ? ((amount / totalIncomeTurnover) * 100).toFixed(0) : 0}  />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='expense-category-analysis'>

                            {expenseCategories2.map((category) => {
                                const amount = transactions.filter((t) => t.type === "expense" && t.category === category).reduce((acc, t) => acc + t.amount, 0)
                                return (
                                    <div>
                                        <h5>{category}</h5>
                                        <Progress percent={amount ? ((amount / totalIncomeTurnover) * 100).toFixed(0) : 0} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>)
}

export default Analytics;