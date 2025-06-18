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
  const [scaleInput, setScaleInput] = useState('0%')
  const [totalExpenses, setTotalExpenses] = useState(0)
  const[refreshTrigger, setRefreshTrigger] = useState(0)
  const [openFooter, setOpenFooter] = useState(true)
  const [totalBudget, setTotalBudget] = useState(0)

  const refreshBudgets = () => {
  setRefreshTrigger(prev => prev + 1); 
};

useEffect(() => {
  const storedBudgetRaw = localStorage.getItem('budget');
  const storedExpenses = JSON.parse(localStorage.getItem('expenses'))
  const currencyData = JSON.parse(localStorage.getItem('currency'))
  setTotalExpenses(0)
  setTotalBudget(0)

  if(currencyData){
    setCurrency(currencyData.currency)
  }
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

        for(let budgetTotal of budgetTotals){
          setTotalExpenses(prev => prev + budgetTotal)
        }
        console.log(totalExpenses)
        console.log(storedBudget)
        for(let budget of storedBudget){
          const budgetAmount = parseFloat(budget.maxSpending)
          console.log(budgetAmount)
          setTotalBudget(prev => prev + budgetAmount)
        }
      }
    } catch (error) {
      console.error('Failed to parse budget from localStorage:', error);
    }
  }

 
}, [refreshTrigger]);





  const handDeleteBudget = (indexToDelete) => {
    const filtered = budget.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('budget', JSON.stringify(filtered))
    localStorage.removeItem(`expenses-${budget[indexToDelete].budgetName}`);
    setBudget(filtered); 
  };

  return (
    <>
      <div
      
        className={`overflow-hidden w-screen h-screen bg-white absolute ${
          props.mode === 'budget' ? 'scale-100' : 'scale-0'
        }`}
      >
        <nav className="navigation flex justify-end items-center w-screen h-[7vw] bg-blue-500 sticky top-0 z-1">
          <button
            onClick={() => setCreateBudget(true)}
            className="text-[1vw] p-1 createBtn mr-[3vw] bg-white w-[10vw] h-[5vw] rounded shadow-md header text-blue-800 hover:bg-gray-200 transition duration-300 ease cursor-pointer"
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
       
        <div className={`budgetCards p-3 w-screen h-[90%] absolute ${openFooter === true ? 'h-[90%]' : 'h-[100%]'}`}>
          {budget.map((budg, index) => (
            <Budgetcard
              onAddExpenses={refreshBudgets}
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

        <Nav openNav={useNav} setCurrency={setCurrency} />
          <footer className="flex flex-col w-[100%] h-[6vw] absolute bottom-0">
            <h1 onClick={()=> setOpenFooter(true)} className={`w-50 h-5 cursor-pointer text-gray-500 text-[4vw] transition duration-500 ease-in-out ${openFooter === false ? 'translate-y-0' : 'translate-y-100 hidden rotate-0'}`}>unhide</h1>
        <div className={`p-4 flex justify-between items-center w-[100%] h-[100%] bg-blue-500 transition duration-1000 ease-in-out ${openFooter === false ? 'translate-y-100 pointer-events-none' : 'pointer-events-all translate-y-0'}`}>
          <h1 onClick={()=> setOpenFooter(false)} className={`cursor-pointer text-white text-[4vw] transition duration-500 ease-in-out`}>hide</h1>
          <h1 className='footerText text-white text-[3vw]'>Total Budget: {currency}{totalBudget}</h1>
          <h1 className='footerText text-white text-[3vw]'>Total Expenses: {currency}{totalExpenses} </h1>

        </div>
      </footer>
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
