import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set , onValue} from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/userSlice";
import { useState , useEffect } from "react";

const Login = () => {
  const providerGoogle = new GoogleAuthProvider();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();

  const [ users, setUsers ] = useState( [] );
  // const [uidData, setUidData] = useState([])
  // const uids = users.map((item)=>uidData.push( ...uids,  "id" : item.uid))
  // console.log(uidData)
  // console.log(users.uid)

      // read user data from firebase
      useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue( userRef, ( snapshot ) => {
          let arr = []
          snapshot.forEach( ( item ) => {
            arr.push(item.val())
          } )
          setUsers(arr)
        } );
      }, []);

 const loginWithGoogle = () => {
  signInWithPopup(auth, providerGoogle)
    .then((user) => {
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      // console.log(user.user.uid)
      // Check if the user's uid already exists in the users array
      // const exists = users.some( ( existingUser ) =>
      //   existingUser.uid === user.user.uid
      // ); 
      // existingUser.uid === user.user.uid
      // console.log(exists)

      if (users.some( ( existingUser ) =>
        existingUser.uid === user.user.uid
      )) {
        set(ref(db, 'users/' + user.user.uid), {
          username: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
          time: Date.now(),
          coverURL: 'https://firebasestorage.googleapis.com/v0/b/backgram-71e9b.appspot.com/o/users%2F1702112366313-Group%2043863%20(1).png?alt=media&token=14e4ed03-cb7b-4918-805f-7f1e3538337b',
          uid: user.user.uid,
        });
      }
      
      // set(ref(db, 'users/' + user.user.uid), {
      //     username: user.user.displayName,
      //     email: user.user.email,
      //     photoURL: user.user.photoURL,
      //     time: Date.now(),
      //     coverURL: 'https://firebasestorage.googleapis.com/v0/b/backgram-71e9b.appspot.com/o/users%2F1702112366313-Group%2043863%20(1).png?alt=media&token=14e4ed03-cb7b-4918-805f-7f1e3538337b',
      //     uid: user.user.uid,
      //   });

      dispatch(setUser(user.user));
      localStorage.setItem('user', JSON.stringify(user.user));
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};


  return (
    <div className='w-screen h-screen grid place-content-center'>
      <div className="bg-[#EEF296] text-[#750E21] p-5 rounded-lg max-w-[400px]">
        <h3 className="text-3xl font-bold text-center">Welcome BackGram</h3>
        <form>
          <input type="text" placeholder="Username" className="border text-sm border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full" />
          <input type="password" placeholder="Password" className="border text-sm border-[#750E21] p-2 rounded-lg bg-transparent mt-4 w-full" />
          <button type="submit" onClick={() => { alert('Login') }} className="bg-[#750E21] text-white p-2 rounded-lg w-full mt-4 active:scale-95 hover:bg-[#5c212b]">Login</button>
        </form>
        <button onClick={loginWithGoogle} className="text-orange-500 p-2 rounded-lg w-full mt-4 active:scale-95 flex items-center justify-center gap-2 text-center border border-orange-500 hover:text-white hover:bg-orange-500">
          <FcGoogle className="inline-block text-2xl" /> <span>Login with Google</span>
        </button>
        <p className="text-center mt-4 text-sm">{`Don't have an account?`}<Link to="/signup" className='font-bold'>Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
