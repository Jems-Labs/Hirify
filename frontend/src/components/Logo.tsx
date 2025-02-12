import logo from '/hirify.png'
function Logo() {
  return (
    <div className="flex items-center cursor-pointer">
      <img src={logo} className='w-28 h-auto'/>
    </div>
  );
}

export default Logo;
