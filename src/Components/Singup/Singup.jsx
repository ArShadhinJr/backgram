import React from 'react'
import { Link } from 'react-router-dom'

const Singup = () => {
  return (
    <div className='w-screen  h-screen grid place-content-center'>
        <div className="bg-[#EEF296] text-[#750E21] p-5 rounded-lg max-w-[400px]">
            <h3 className="text-3xl font-bold text-center">BackGram Singup</h3>
            <form>
              <input type="text" placeholder="Full Name" className="border text-sm px-4  border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full"/>
              <input type="email" placeholder="Email" className="border text-sm px-4  border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full"/>
              <input type="text" placeholder="Username" className="border text-sm px-4  border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full"/>
              <input type="password" placeholder="Password" className="border text-sm px-4  border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full"/>
              <button className="bg-[#750E21] text-white p-2 rounded-lg w-full mt-4 active:scale-95 hover:bg-[#5c212b]">Sing up</button>
            </form>
            <p className="text-center mt-4 text-sm">Already have an account? <Link to="/login" className='font-bold'>Login</Link></p>
        </div>
    </div>
  )
}

export default Singup