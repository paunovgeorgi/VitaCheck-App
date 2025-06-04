
const Header = () => {
  return (
      <header className="text-center mb-4 flex flex-col items-center">
        <div>
             <img src='/images/vitalogo-final.png' className='w-[100px]' loading='eager'/>
        </div>
        <h1 className="text-4xl font-bold text-accent animate-pulse">VitaCheck</h1>
        <p className="text-gray-400">Your Personal Smart Supplement Organizer</p>
      </header>
  )
}

export default Header