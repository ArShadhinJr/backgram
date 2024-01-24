import { useSelector } from 'react-redux';
import Banner from '../../assets/header.png'
import { FaCircleCheck } from "react-icons/fa6";
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import ImageModal from '../ImageModal/ImageModal';
import CoverModal from '../CoverModal/CoverModal';

const Header = () => {

    const userData = useSelector( ( state ) => state.user.userInfo );
    const db = getDatabase();
    const [ user, setUser ] = useState( {} ); 
  const [ imageModal, setImageModal ] = useState( false );
  const [ coverModal, setCoverModal ] = useState( false );
  const [stopScroll, setStopScroll] = useState(false);

  // read data from firebase
  useEffect( () => {
    const userRef = ref(db, 'users/' + userData.uid);
    onValue( userRef, ( snapshot ) => {
      const userData = snapshot.val();
      setUser( userData )
    } )
  }, [] )
  
  
useEffect(() => {
    // Update the document's body style based on the state
    // document.body.style.overflow = stopScroll ? 'hidden' : 'auto';
    if( stopScroll ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ stopScroll ] );
  
  const handleClick = () => {
    setStopScroll( !stopScroll );
    setImageModal( !imageModal )
  }

  const handleClickCover = () => {
    setStopScroll( !stopScroll );
    setCoverModal( !coverModal )
  }

  return (
    <div>
        <div className='relative'>
        <img src={user.coverURL} />
        <button onClick={handleClickCover} className='flex items-center gap-x-2 text-[#750E21] bg-white p-2 rounded-lg active:scale-95 absolute right-0 bottom-0 mx-5 my-5 hover:bg-slate-100 hover:text-[#750E21] shadow-2xl'> <FaCamera className='text-2xl' /> <span>Edit Cover Photo</span></button>
        {
                    coverModal ? <CoverModal onClick={ handleClickCover }></CoverModal> : null
        }
              <div className='absolute bottom-[-110px] left-[100px]'>
              <img src={user?.photoURL} className='w-40 h-40  border-4 border-[#fff] rounded-full ' />
              <button className=' absolute right-[5px] bottom-[5px] bg-white text-[#750E21] hover:bg-slate-100 hover:text-[#750E21] shadow-2xl rounded-full active:scale-95'>
                <FaCamera onClick={ handleClick } className='text-4xl p-[6px]'/>
                
              </button>
              {
                        imageModal ? <ImageModal onClick={ handleClick }></ImageModal> : null
                    }
            </div>
        </div>
        <div className=' h-40 w-full pl-[300px] flex py-4'>
            <div className='w-1/2 '>
                <div className='flex items-center gap-3'>
                    <h4 className='text-[#750E21] font-black text-xl'>{user?.username}</h4>
                    <span className='text-blue-600'><FaCircleCheck></FaCircleCheck></span>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='w-1/2'>
                <button className='bg-[#750E21] text-white p-2 rounded-lg w-3/5 mt-4 active:scale-95  hover:bg-[#5c212b]'>Edit Profile</button>
            </div>
        </div>
    </div>
  )
}

export default Header