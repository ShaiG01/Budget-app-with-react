function ExpensesCard(props){
    return(
        <div className="gap-3 flex flex-col items-center justify-center relative eCard p-5 h-auto border-1 border-blue-500 rounded">
            <div className='flex justify-between gap-3 w-[100%] h-[100%]'>
            <h1 className='expensesName text-blue-500'>{props.name}</h1>
            <h1 className="expensesAmount text-gray-500 text-[1vw]">Amount: {props.currency}{props.amount}</h1>
            </div>
            <div className='flex justify-between gap-3 w-[100%] h-[50%]'>
            <h1 className='text-blue-900 cursor-pointer date'>Date: {props.date}</h1>
            <h1 onClick={props.onDelete} className='text-gray-900 cursor-pointer expensesDeleteBtn'>delete</h1>
        </div>
        </div>
    )
}

export default ExpensesCard