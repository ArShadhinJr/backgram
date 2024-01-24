import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaGrinSquintTears , FaShare} from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import Wow from '../../assets/wow.gif'
import Crying from '../../assets/Crying.gif'
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useEffect , useState} from 'react';
import { useSelector } from "react-redux";

const Post = ( props ) => {
    const db = getDatabase();
    const [ user, setUser ] = useState( {} );
    const userData = useSelector( ( state ) => state.user.userInfo );
    const [ showReact, setShowReact ] = useState( false );

  // read user data from firebase
  useEffect(() => {
    const userRef = ref(db, 'users/' + userData.uid);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUser(userData);
    });
  }, [ db, userData.uid ] );
    
    // delete post from firebase 
    const deletePost = () => {
        const postRef = ref( db, 'posts/' + props.id );
        remove( postRef );
    }
    
    
  return (
    <div key={props.key} className="bg-white py-8 rounded-lg">
                    <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <img src={user?.photoURL} className="w-8 h-8 rounded-full" />
                        </div>
                        <div>
                            <h4 className="text-sm mb-0">{user?.username}</h4>
                            <p className="text-xs flex gap-3 mt-0"><span>{props.time}</span><span>Public</span></p>
                        </div>
                    </div>
                    <div>
                        <BsThreeDots onClick={deletePost}/>
                    </div>
                    </div>
                    <div >
                        <div className="px-6 py-4"><p>{props.content}</p></div>
                        <div>
                            <img src={props.postImage} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2">
                            <div className="flex items-center">
                                <AiFillLike className="text-blue-600 text-xl z-20"/> 
                                <FaHeart className="text-red-500 text-xl ml-[-5px] z-10"/>
                                <FaGrinSquintTears className="text-yellow-500 text-xl ml-[-5px]"/>
                                <span className="text-xs ml-2">you and 100 more</span>
                            </div>
                            <div className="flex items-center justify-end text-xs gap-3">
                                <span className="flex items-center gap-1"><FaRegCommentDots className="text-[#750E21] text-xl"/>100 comment</span>
                                <span className="flex items-center gap-1"><FaShare className="text-[#750E21] text-xl"/>5 shears</span>
                            </div>
                    </div>
                    <hr />
                    <div className=" w-full  grid grid-cols-3 px-4 py-2">
                        <div className="mx-auto relative">
                            <p onMouseEnter={() => setShowReact( true )} onClick={() => setShowReact( false )} className="flex items-center gap-2 cursor-pointer"><AiFillLike className="text-xl"/>Like</p>
                            {
                                showReact && 
                            <div onMouseLeave={() => setShowReact( false )} onClick={() => setShowReact( false )} className="absolute w-48 flex items-center top-[-30px] left-[-60px] z-40 bg-white rounded-full transform duration-200">
                                
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e4299734559659.56d57de04bda4.gif" className="w-12 h-12 rounded-full m-[-8px] hover:scale-150 transform duration-300" />
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/65ea2034559659.56d57de06cea2.gif" className="w-12 h-12 rounded-full m-[-8px] hover:scale-150 transform duration-300"/>
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/35c9bf34559659.56d57de0eb467.gif" className="w-12 h-12 rounded-full m-[-8px] hover:scale-150 transform duration-300" />
                                <img src={Wow} className="w-7 h-7 rounded-full m-[1px] hover:scale-150 transform duration-300"/>
                                <img src={Crying} className="w-7 h-7 rounded-full m-[1px] hover:scale-150 transform duration-300" />
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e66e6e34559659.56d57de095aee.gif" className="w-12 h-12 rounded-full m-[-8px] hover:scale-150 transform duration-300" />
                            </div>
                            }
                        </div>
                        <div className="mx-auto "><p className="flex items-center gap-2 cursor-pointer"><FaRegCommentDots className="text-xl"/>Comment</p></div>
                        <div className="mx-auto "><p className="flex items-center gap-2 cursor-pointer"><FaShare className="text-xl"/>Share</p></div>
                    </div>
                    <hr />
                    <div className="flex w-full px-4 pb-2 pt-4">
                        <div className="flex items-center gap-4 ">
                            <img src={user?.photoURL} className="w-8 h-8 rounded-full mr-4" />
                        </div>
                        <div className="w-full">
                            <input type="text" placeholder="Add a comment..." className="w-full px-4 py-2 outline-none bg-slate-100 rounded-full active:bg-slate-200 focus-within:bg-slate-200" />
                        </div>
                    </div>
                </div>
  )
}

export default Post