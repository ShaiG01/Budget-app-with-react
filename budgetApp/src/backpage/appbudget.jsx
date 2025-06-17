import React, { useState, useEffect, useRef } from 'react';
import Nav from './nav';
import CreateBudget from './createBudgetModal';
import Budgetcard from './budgetCard';

function AppBudget(props) {
  const [useNav, setNav] = useState(false);
  const [createBudget, setCreateBudget] = useState(false);
  const [budget, setBudget] = useState([]);
  const [currency, setCurrency] = useState('$');
  const [currentBudget, setCurrentBudget] = useState('')
  const [scaleInput, setScaleInpit] = useState('0%')
  const totalSpentRef = useState(0)

useEffect(() => {
  const storedBudgetRaw = localStorage.getItem('budget');
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'))
  if (storedBudgetRaw) {
    try {
      const storedBudget = JSON.parse(storedBudgetRaw);
      if (Array.isArray(storedBudget)) {
        setBudget(storedBudget);
         const budgetTotals = storedBudget.map(b => {
          const stored = localStorage.getItem(`expenses-${b.budgetName}`);
          const expenses = stored ? JSON.parse(stored) : [];
          const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
          return total;
        });
        setCurrentBudget(budgetTotals)
        
      }
    } catch (error) {
      console.error('Failed to parse budget from localStorage:', error);
    }
  }

 
}, [currentBudget]);





  const handDeleteBudget = (indexToDelete) => {
    const filtered = budget.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('budget', JSON.stringify(filtered))
    setBudget(filtered); 
  };

  return (
    <>
      <div
      
        className={`overflow-scroll w-screen h-screen bg-white absolute ${
          props.mode === 'budget' ? 'scale-100' : 'scale-0'
        }`}
      >
        <nav className="navigation flex justify-end items-center w-screen h-[7vw] bg-blue-500">
          <button
            onClick={() => setCreateBudget(true)}
            className="text-[1vw] createBtn mr-[3vw] bg-white w-[10vw] h-[5vw] rounded shadow-md header text-blue-800 hover:bg-gray-200 transition duration-300 ease cursor-pointer"
          >
            Create Budget +
          </button>
          <button className="text-[1vw] createBtn mr-[3vw] bg-white w-[10vw] h-[5vw] rounded shadow-md header text-blue-800 hover:bg-gray-200 transition duration-300 ease cursor-pointer">
            Income Sources
          </button>
          <span
            onClick={() => setNav((prev) => !prev)}
            className={`absolute left-0 text-center text-[3vw] text-white cursor-pointer hover:bg-blue-800 transition duration-300 ease w-[10vw] ${
              useNav ? 'bg-blue-800' : 'bg-none'
            }`}
          >
            &#9776;
          </span>
          <h1 className="greeting absolute left-[11vw] text-[2vw] header text-white">
            Hello, {props.username}!
          </h1>
        </nav>
       
        <div className="budgetCards p-3 w-screen h-screen absolute">
          {budget.map((budg, index) => (
            <Budgetcard
              key={index}
              currentSpending={currentBudget[index]}
              onDelete={() => handDeleteBudget(index)} 
              currency={currency}
              maxspending={budg.maxSpending}
              name={budg.budgetName}
              scaleInput={(parseFloat(currentBudget[index])/parseFloat(budg.maxSpending)) * 100}
            />
          ))}
        </div>

        <Nav openNav={useNav} />
      </div>

      {createBudget && (
        <CreateBudget
          onExit={() => setCreateBudget((prev) => !prev)}
          create={createBudget}
        />
      )}
    </>
  );
}

export default AppBudget;
