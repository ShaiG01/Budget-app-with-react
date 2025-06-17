import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Expenses from './expenses'

function Budgetcard({ name, currentSpending, scaleInput, maxspending, currency, onDelete, index }) {

    const [openExpenses, setOpenExpenses] = useState(false)
    return (
        <>
        <div className="p-4 relative budgetCard flex gap-3 flex-col justify-center items-center rounded-[10px] w-[20vw] h-[24vw] bg-white shadow-md ">
            <h1 className="budgetName text-center text-blue-500 text-[3vw]">{name}</h1>
            <hr className="text-gray-400" />
           
            <div className="flex items-center justify-center gap-3 p-5 w-[100%] h-[5vw]">
                <button className="budgetCardBtn text-[1vw] p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-300 transition duration-300 ease">
                    View Expenses
                </button>
                <button onClick={()=>{setOpenExpenses(true)}} className="budgetCardBtn text-[1vw] p-2 bg-white-500 text-blue-500 border-blue-500 border-1 rounded cursor-pointer hover:bg-blue-100 transition duration-300 ease">
                    Edit Expenses
                </button>
            </div>
             <h1 className="spending text-gray-400 text-[1.5vw]">
                {currency}{currentSpending}/{currency}{maxspending}
            </h1>
            <div className="w-[100%] h-4 bg-gray-200 rounded-full relative">
                 <div style={{width: `${scaleInput}%`,
                              maxWidth: '100%'}}
                 className={`h-4 bg-blue-400 rounded-full absolute ${scaleInput >= 100 ? 'bg-red-400' : scaleInput >= 50 ? 'bg-yellow-400' : 'bg-blue-500'}`}></div>
            </div>
            <button onClick={() => onDelete(index)} className="deleteBtn text-gray-400 cursor-pointer">
                Delete Budget
            </button>
        </div>
        <div className={`overflow-x-hidden flex justify-center items-center overflow-hidden w-screen h-screen absolute z-[1] ${openExpenses === true ? 'visible' : 'invisible'}`}>
             <div className={`overflow-x-hidden w-screen h-screen bg-black opacity-23 z-0`}></div>
        <Expenses open={openExpenses} currency={currency} budgetName={name} exit={()=>{setOpenExpenses(false)}}></Expenses>
        </div>
        </>
    )
}

Budgetcard.defaultProps = {
    currency: '$',
    currentSpending: 0,
    maxspending: 0
}

Budgetcard.propTypes = {
    name: PropTypes.string.isRequired,
    currentSpending: PropTypes.number,
    maxspending: PropTypes.number,
    currency: PropTypes.string,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Budgetcard
