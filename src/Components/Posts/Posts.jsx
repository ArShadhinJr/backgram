import { useSelector } from "react-redux";
import { useState } from "react";
import { getDatabase, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
import Post from "../Post/Post";


const Posts = () => {

    const db = getDatabase();
    const [ postsData, setPostsData ] = useState( [] );
    const userData = useSelector( ( state ) => state.user.userInfo );
    const [ user, setUser ] = useState( {} );

  // read user data from firebase
  useEffect(() => {
    const userRef = ref(db, 'users/' + userData.uid);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUser(userData);
    });
  }, []);

  // read posts data from firebase
  useEffect(() => {
    const postsRef = ref(db, 'posts/');
    onValue(postsRef, (snapshot) => {
      const posts = [];
      snapshot.forEach((postSnapshot) => {
        const post = postSnapshot.val();
        if (post.email === userData.email) {
          posts.push({ id: postSnapshot.key, ...post });
        }
      });
      setPostsData(posts);
    });
  }, []);


  return (
    <div className="bg-[#EFF0F6] px-[250px] py-[40px] flex flex-col-reverse gap-y-10">
        
          {
              postsData.map( ( post, index ) => {
                  return (
                      <Post key={index} postImage={post.postImage? post.postImage : null} content={post.content} time={post.time} id={post.id}/>
                  )
              })
          }
                
    </div>
    
  )
}

export default Posts