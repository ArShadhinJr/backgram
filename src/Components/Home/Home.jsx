import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import PostFiled from '../PostFiled/PostFiled'
import Posts from '../Posts/Posts'

const Home = () => {

  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
        <PostFiled></PostFiled>
      <Posts></Posts>
    </div>
  )
}

export default Home