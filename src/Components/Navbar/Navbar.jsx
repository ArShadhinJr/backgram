import { useEffect, useState } from "react";
import {  useSelector } from "react-redux"
import { getDatabase, ref, onValue } from "firebase/database";


const Navbar = () => {
  const userData = useSelector( ( state ) => state.user.userInfo );
  console.log(userData)
  const db = getDatabase();
  const [ user, setUser ] = useState( {} ); 

  // read data from firebase
  useEffect( () => {
    const userRef = ref(db, 'users/' + userData.uid);
    onValue( userRef, ( snapshot ) => {
      const userData = snapshot.val();
      setUser( userData )
    } )
  } , [])
  

  return (
    <div className='bg-[#EEF296] px-10 py-1 flex items-center justify-between'>
        <div className='text-[#750E21] font-black text-2xl'>BackGram</div>
        <div className='flex items-center justify-end'>
            <div className='flex items-center gap-3'>
                <span className='text-[#750E21] text-sm'>{user?.username}</span>
                <img src={user?.photoURL} className='w-6 h-6 rounded-full border-2 border-[#750E21]' />
            </div>
        </div>
    </div>
  )
}

export default Navbar