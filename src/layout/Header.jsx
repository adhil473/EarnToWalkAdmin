import logo from '../assets/logo.png'
import { useState, useEffect } from 'react';
import { adminProfile } from "../api/serviceApi";
import { HiMenuAlt3 } from 'react-icons/hi'
import ConnectWeb3 from '../web3/web3Connect';

const Header = ({ open, setOpen }) => {

  const [userData, setUserData] = useState('')

   useEffect(()=>{
        const fetchUserProfile  = async()  =>{
          try {
            const response = await adminProfile()
            console.log(response)
            setUserData(response.data)
          } catch (error) {
         console.error('failed to fetch profile');  
          }
        }
        fetchUserProfile();
      },[])

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <header className="bg-black h-[80px] py-4 pl-4 md:pl-64 text-gray-900 flex justify-between pr-4 md:pr-6 items-center w-full fixed top-0 z-40 border-b-2 border-[#050D0F]">
      <div className="flex justify-between items-center w-full md:w-auto">
        <div className="flex items-center md:hidden">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {/* <div className='border border-[#1f2e2e] px-2 py-1 rounded-md font-semibold text-xs'>
            <span className='text-[#00bcd4]'>ID</span>
            <span className='text-[#D1D5DB]'>: 0x3e2...f2d</span>
          </div> */}
           <ConnectWeb3/>
          <button onClick={toggleSidebar} className="text-white">
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      </div>
      <div className='hidden md:flex items-center gap-2'>
        {/* <div className='border border-[#1f2e2e] px-3 py-2 rounded-md font-semibold text-sm'>
          <span className='text-[#00bcd4]'>Wallet ID</span>
          <span className='text-[#D1D5DB]'>: 0x3e2...f2d</span>
        </div> */}
        <ConnectWeb3/>
        <div className='border border-[#1f2e2e] px-3 py-1.5 rounded-md font-semibold text-[#D1D5DB] text-sm flex items-center'>
          <span className='border border-[#050D0F] rounded-full text-[10px] px-1.5 py-1 mr-2 text-white bg-[#1a3f3f]'>{userData?.name?.slice(0, 2)}</span>
         {userData?.name}
        </div>
      </div>
    </header>
  );
};

export default Header;
