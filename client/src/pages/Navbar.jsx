
import React from 'react'
import { Menu, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { CgLogOut } from "react-icons/cg";


const menuItems = [

]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const auth = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const LogOutFun=()=>{
    console.log("Log Out")
    sessionStorage.clear();
    location.reload();


  }

  return (
    <div className="relative w-full bg-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
         
          <span className="font-bold">SF React</span>
        </div>
        <div>
        
      {
       (auth.isLogin.login)?<button className=' btn btn-sm md:btn-sm bg-red-700 rounded-md text-white font-medium  hover:bg-red-500 ' onClick={()=>LogOutFun()}><CgLogOut className=' text-2xl' />
       </button>:""
      }
      </div>
      </div>
    </div>
  )
}
