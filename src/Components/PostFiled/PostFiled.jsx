import { RiLiveFill } from "react-icons/ri";
import { FaPhotoVideo } from "react-icons/fa";
import { GiFlyingFlag } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import PostModal from "../PostModal/PostModal";

const PostFiled = () => {

    const userData = useSelector( ( state ) => state.user.userInfo );
    const db = getDatabase();
    const [ user, setUser ] = useState( {} ); 
    const [ modal, setModal ] = useState( false );
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
    setModal( !modal )
  }

  return (
    <div className='bg-[#EFF0F6] px-[250px] pt-[40px]'>
        <div className='bg-white py-8 rounded-lg'>
            <div className='flex items-center px-8'>
                <div className="flex items-center gap-4 ">
                    <img src={user?.photoURL} className="w-8 h-8 rounded-full mr-4" />
                  </div>
                <div className="w-full">
                      <div onClick={ handleClick } className="w-full px-4 py-2 outline-none bg-slate-100 rounded-full active:bg-slate-200 focus-within:bg-slate-200 hover:bg-slate-200" >What's on your mind?</div>
                    {
                        modal ? <PostModal onClick={ handleClick }></PostModal> : null
                    }
                </div>
            </div>
            <hr className='my-4 mx-8'/>
            <div className=" w-full grid grid-cols-3 px-4 ">
                <div className="mx-auto"><p className="flex items-center gap-2 cursor-pointer"><RiLiveFill className="text-2xl text-red-600"/>Live Video</p></div>
                <div className="mx-auto "><p className="flex items-center gap-2 cursor-pointer"><FaPhotoVideo className="text-2xl text-green-600"/>Photo/Video</p></div>
                <div className="mx-auto "><p className="flex items-center gap-2 cursor-pointer"><GiFlyingFlag className="text-2xl text-blue-600"/>Life Event</p></div>
            </div>
        </div>
    </div>
  )
}

export default PostFiled