import React, {useState} from 'react'

function Nav({openNav, setCurrency}){
    
    function saveDataCurrency(symbol) {
        const currencyData = {currency: symbol};
        setCurrency(prev => {
            const newCurrency = symbol
            localStorage.setItem('currency', JSON.stringify(currencyData))
            return newCurrency
        })
    }

    const [useCurrencyBtn, setCurrencyBtn] = useState(false)
    const [currency, setDataCurrency] = useState('$')
    return(
        <div className={`p-4 flex flex-col gap-4 dropDown w-[30vw] h-screen bg-linear-to-b from-blue-600 to-violet-400 transition duration-500 ease-in-out ${openNav === true ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
                <button className="text-white text-[30px] hover:bg-blue-300 transition duration-500 ease w-[100%] cursor-pointer">Profile</button>
                <button onClick={()=> setCurrencyBtn(prev => !prev)} className="text-white text-[30px] hover:bg-blue-300 transition duration-500 ease w-[100%] cursor-pointer">Set Currency</button>
                <ul className={`text-white cursor-pointer transition duration-500 ease ${useCurrencyBtn === false ? 'scale-0' : 'scale-100'}`}>
                    <li onClick={(()=> saveDataCurrency('$'))} className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Default: Dollars ($)</li>
                    <li onClick={(()=> saveDataCurrency('₱'))} className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Peso (₱)</li>   
                    <li onClick={(()=> saveDataCurrency('€'))}  className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Euro (€)</li>
                    <li onClick={(()=> saveDataCurrency('₩'))} className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Won (₩)</li>
                    <li onClick={(()=> saveDataCurrency('₹'))}  className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Rupee (₹)</li>
                    <li onClick={(()=> saveDataCurrency('¥'))}  className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Yen (¥)</li>
                    <li onClick={(()=> saveDataCurrency('CN¥'))}  className="hover:bg-blue-300 transition duration-500 ease w-[100%]">Yuan (CN¥)</li>
                </ul>
        </div>
    )
}

export default Nav