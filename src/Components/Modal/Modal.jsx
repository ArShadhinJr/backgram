import { getDatabase,  ref, push } from 'firebase/database';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
// import DivCenter from '../DivCenter/DivCenter';

const PostModal = ( props ) => {
    
    const userData = useSelector( ( state ) => state.user.userInfo );
    const db = getDatabase();
    const [ postData, setPostData ] = useState( {
        email: userData?.email,
        content: '',
        time: Date.now()
    } );
    
    // // enter click event 
    // const handleKeyDown = (e) => {
    //     if ( e.key === 'Enter' ) {
    //         createPost( e )
    //     }
    // }

    const createPost = (e) => {
        e.preventDefault()
        console.log( postData )
        push( ref( db, 'posts/' ), postData )
        setPostData( {
            ...postData,
            content: ''
        } ); 
        props.onClick()
    }

  return (
      <div className="fixed top-0 left-0 w-full h-full bg-[#fff] bg-opacity-50 grid place-items-center">
        <div className="bg-white rounded-lg w-1/3 relative shadow-lg">
        <RxCross2 onClick={props.onClick} className="text-3xl cursor-pointer absolute top-3 right-4 rounded-full p-1 bg-slate-200 hover:bg-slate-300 transform duration-300"/>  
            <div className='py-3'>
                <h3 className="text-xl font-semibold text-center">Create Post</h3>
            </div>
            <hr />
            <div className="flex items-center gap-4 px-4 py-2">
                <div>
                    <img src={userData?.photoURL} className="w-8 h-8 rounded-full" />
                </div>
                <div>
                    <h4 className="text-sm mb-0">{userData?.displayName}</h4>
                    <p className="text-xs flex gap-3 mt-0"><span className='bg-slate-200 px-3 py-0 rounded-full'>Public</span></p>
                </div>
            </div>
            <form>
                <div className="p-4 flex items-center justify-end">
                    <textarea  value={postData.content} onChange={( e ) => setPostData( { ...postData, content: e.target.value } )} name="post" id="post" type="text" rows='5' className='w-full px-4 outline-none rounded-xl resize-none placeholder:text-2xl' placeholder="What's on your mind?"></textarea>
                </div>
                <div className="w-full px-4 py-3">
                    <button type="submit" onClick={createPost} className="w-full py-2 bg-[#750E21] text-white rounded-full">Post</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default PostModal