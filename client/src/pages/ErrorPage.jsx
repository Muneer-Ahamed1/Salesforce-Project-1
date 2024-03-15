import { ArrowLeft } from 'lucide-react'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export default function ErrorFour() {
  const navigate=useNavigate();
  const[navigation,setNavigation]=useState(false);
  useEffect(()=>{
    if(navigation) {
    navigate("/AccountPage")
    }
    setNavigation(false);
  },[navigation])
  
  
  return (
    <div className="py-10 h-[100vh]">
      <div className="text-center">
        <p className="text-base font-semibold text-black">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos:t find the page you&apos;re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
         
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={()=>{setNavigation(true)}
          }
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  )
}
