import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { setUser } from "../Slice/userSlice";
import { getAuth, updateProfile } from "firebase/auth";

const ImageModal = (props) => {
  const userData = useSelector((state) => state.user.userInfo);
  const storage = getStorage();
  const db = getDatabase();
//   const dispatch = useDispatch();
    const [ file, setFile ] = useState( {} );
    const auth = getAuth();
    
//     useEffect(() => {
//   const userRef = ref(db, 'users/' + userData.id);
//   onValue(userRef, (snapshot) => {
//     const userData = snapshot.val();
//     dispatch(setUser({ uid: userData.val().key, ...userData }));
//   });
// }, [db, userData]);

  const uploadPhoto = (e) => {
    e.preventDefault();
    // const file = e.target.files[0];

    // Generate a unique name for the file using the user's ID
      const fileName =  Date.now() + "-"+ file.name;
      console.log(fileName)
      console.log(userData.uid)

    // Get a reference to the storage location
    const imageRef = storageRef(storage, 'users/' + fileName);

    // Upload the file to the specified storage location
    uploadBytes(imageRef, file).then((downloadURL) => {
      console.log('Uploaded a blob or file!', );
      console.log(downloadURL)
      getDownloadURL(imageRef).then((url) => {
        console.log(url)
        update(ref(db, 'users/' + userData.uid), { photoURL: url });
        updateProfile(auth.currentUser, {
            photoURL: url
            })
      } )
    }).catch((error) => {
      console.log(error)
    } );
    props.onClick()
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#fff] bg-opacity-50 grid place-items-center">
      <div className="bg-white rounded-lg w-1/3 relative shadow-lg">
        <RxCross2
          onClick={props.onClick}
          className="text-3xl cursor-pointer absolute top-3 right-4 rounded-full p-1 bg-slate-200 hover:bg-slate-300 transform duration-300"
        />
        <div className="py-3">
          <h3 className="text-xl font-semibold text-center">Upload profile picture</h3>
        </div>
        <hr />
        <form>
          <div className="p-4 flex items-center justify-end">
            <input type="file" onChange={ (e) => setFile(e.target.files[0])} className="w-full px-4 outline-none rounded-xl"></input>
          </div>
          <div className="w-full px-4 py-3">
            <button onClick={uploadPhoto} type="submit" className="w-full py-2 bg-[#750E21] text-white rounded-full">
              Upload Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;
