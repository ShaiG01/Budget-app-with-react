import React, {useState, useEffect} from 'react'

function CreateBudget({create, onExit}){
    const [typeTitle, setTypeTitle] = useState(false)
    const [title, setTitle] = useState('New Budget')
    const [titleInput, setTitleInput] = useState('')
    const [visibility, setVisibility] = useState(false)
    const [maxSpending, setMaxSpending] = useState('')
    const [addNotes, setAddNotes] = useState('')
    

 

    useEffect(()=>{
        if(create){
            setVisibility(true)
        }

    }, [create])

    const handleExit = ()=>{
        if(!create){
            setVisibility(false)
        }
    }

    function handleSettingBudget(){
        if (!title.trim() || !maxSpending || isNaN(maxSpending) || Number(maxSpending) < 5) {
        alert("Please enter a valid title and a spending limit of at least 5.");
}
        else{const storedBudget = localStorage.getItem('budget')
        const prevBudget = storedBudget ? JSON.parse(storedBudget) : [];
        const newBudget = {budgetName: title,
                        maxSpending: maxSpending,
                        notes: addNotes,
                        id: Date.now() }

        const updatedBudget = [...prevBudget, newBudget]
        localStorage.setItem('budget', JSON.stringify(updatedBudget))

        setTimeout(()=>{
            window.location.reload()
        }, 2000)
        }
    }
    

  

    return(
        <div className={`overflow-hidden w-screen h-screen absolute top-0 ${visibility === true ? 'visible' : 'invisible'}`}>
            
            <div className="w-screen h-screen bg-black opacity-50 absolute"></div>
            <div className="w-screen h-screen absolute flex justify-center items-center">
            <div onTransitionEnd={handleExit} className={`budgetInputContainer flex p-4 gap-3 flex-col relative rounded createModal w-[50vw] h-auto bg-white opacity-100 transition duration-500 ease-in-out ${visibility === true ? 'scale-100' : 'scale-0'}`}>
                <span onClick={onExit} className="xBtn absolute text-[2vw] right-3 top-2 text-gray-500 header cursor-pointer">X</span>
                <input onChange={(e)=> setTitle(e.target.value)} type="text" placeholder={title} className={`titleInput h-[4vw] absolute budgetTitle text-blue-500 heading text-[3vw] ${typeTitle === true ? 'scale-100' : 'scale-0'}`}></input>
                <h1 onClick={()=> setTypeTitle(prev => !prev)} className={`budgetTitle text-blue-500 heading text-[3vw] ${typeTitle === false ? 'scale-100' : 'scale-0'}`}>{title !== '' ? title : 'New Budget'}</h1>
                <hr></hr>
                <label className="text-[1.5vw]">Maximum Spending: </label>
                <input onChange={(e)=> setMaxSpending(e.target.value)} min="5" type='number' required placeholder="Enter Number" className="text-gray-800 p-3 bg-gray-200 shadow-xs rounded shadow-black h-[5vw] "></input>
                <label className="text-[1.5vw]">Additional notes: </label>
                <input onChange={(e)=> setAddNotes(e.target.value)} type='text' placeholder="Optional" className="text-gray-800 p-3 bg-gray-200 shadow-xs rounded shadow-black h-[5vw] "></input>
                <button onClick={handleSettingBudget} type="submit" disabled={title.trim() !== '' && maxSpending !== '' ? false : true} className="p-4 bg-blue-200 rounded text-blue-500 cursor-pointer hover:bg-blue-400">Set Budget</button>
            </div>
            </div>
        </div>
    )
}

export default CreateBudget