function Nav(props){
    return(
        <div className={`dropDown w-[30vw] h-screen bg-linear-to-b from-blue-600 to-violet-400 transition duration-500 ease-in-out ${props.openNav === true ? 'translate-x-0' : 'translate-x-[-100%]'}`}></div>
    )
}

export default Nav