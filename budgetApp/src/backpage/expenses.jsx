import ExpensesCard from "./expensesCard"
import React, {useState, useEffect, useRef} from 'react'

function Expenses({open, exit, budgetName, currency, onAddExpenses}){

    const [addExpenses, setAddExpenses] = useState(false)
    const [expenditureName, setExpenditureName] = useState('')
    const [amount, setAmount] = useState('')
    const [expenses, setExpenses] = useState([])
  

    const handleAddExpenses = ()=>{
        if (!expenditureName.trim() || !amount || parseFloat(amount) <= 0) {
         alert('Please enter a valid name and amount.');
         return;
        }

        const newExpenses = {name: expenditureName,
                            amount: amount,
                            id: new Date().toLocaleDateString()}   

        setExpenses(prev => {
            const NewList = [...prev, newExpenses]
            localStorage.setItem(`expenses-${budgetName}`, JSON.stringify(NewList));
            return NewList
        })    
         setAmount('')
         setExpenditureName('')
        setTimeout(()=>{setAddExpenses(false)}, 300)
        onAddExpenses()
        
}

    useEffect(()=>{
       const storedExpenses = JSON.parse(localStorage.getItem(`expenses-${budgetName}`));
        if (Array.isArray(storedExpenses)) {
        setExpenses(storedExpenses);
        }
    }, [budgetName])

    function handleDeleteExpenses(indexToDelete){
        const filtered = expenses.filter((_, index) => index !== indexToDelete);

       
        localStorage.setItem(`expenses-${budgetName}`, JSON.stringify(filtered))
        setExpenses(filtered)
        onAddExpenses()
        
    }

    


    return(
        <>
    <div className={`overflow-hidden p-5 rounded-[10px] expensesCard mt-25 w-[50vw] h-auto bg-white absolute top-0 transition duration-500 ease-in-out ${open === true ? 'scale-100' : 'scale-0'}`}>
        <h1 className='expensesBudgetName text-center text-blue-500 text-[2vw]'>{budgetName} Current Expenditure</h1>
        <div className="overflow-auto expensesList expensesCards mt-5 w-[100%] h-auto">
        {expenses.map((expense, index)=>(
            <ExpensesCard key={index} onDelete={()=> handleDeleteExpenses(index)} date={expense.id} currency={currency} name={expense.name} amount={expense.amount}></ExpensesCard>
        ))}
        </div>

        <div className="expensesBtns mt-5 gap-1 flex justify-center items-center bottom-5 w-[100%] h-[3vw]">
            <button onClick={()=> setAddExpenses(true)} className="expensesBtn p-3 bg-blue-500 text-white rounded hover:bg-blue-300 cursor-pointer transition duration-500 ease-in-out  w-[10vw]">Add Expenses</button>
            <button onClick={exit} className="expensesBtn p-3 bg-white border-1 border-blue-500 text-blue-500 rounded hover:bg-blue-300 cursor-pointer transition duration-500 ease-in-out w-[10vw]">Exit</button>
            
        </div>
      
    
        
    </div>

     {/* {MODAL} */}
    <div className={`w-screen h-screen absolute ${addExpenses === true ? 'pointer-events-all' : 'pointer-events-none'}`}>
        <div className={`p-5 gap-3 flex flex-col justify-center items-start addExpensesCard absolute bg-blue-500 top-50 right-0 w-[25vw] h-[50%] rounded transition duration-500 ease-in-out ${addExpenses === true ? 'scale-100' : 'scale-0'}`}>
        <label className="expensesLabel text-white">Name of Expenditure: </label>
        <input value={expenditureName} onChange={(e)=> setExpenditureName(e.target.value)} type='text' className="expensesInput rounded w-[100%] h-[3vw] p-3 bg-white"></input>
        <label className="expensesLabel text-white">Amount Spent: </label>
        <input  value={amount} onChange={(e)=> setAmount(e.target.value)} type='number' min='0.0' className="expensesInput rounded w-[100%] p-3 h-[3vw] bg-white"></input>
        <div className="gap-5 flex ">
        <button onClick={()=> setAddExpenses(false)} className="mt-5 expensesBtn p-3 bg-white border-1 border-blue-500 text-blue-500 rounded hover:bg-blue-300 cursor-pointer transition duration-500 ease-in-out w-[10vw]">Exit</button>
         <button onClick={handleAddExpenses} className="mt-5 expensesBtn p-3 bg-white border-1 border-blue-500 text-blue-500 rounded hover:bg-blue-300 cursor-pointer transition duration-500 ease-in-out w-[10vw]">Done</button>
        </div>
        </div>
        
   </div>
    </>
    )
} 

export default Expenses 