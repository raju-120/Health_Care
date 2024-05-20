import MyComponent from "../Pages/Posts/allPosts";
import Posts from "../Pages/Posts/Posts";

export default function CenterSide() {
  return (
    <div className="lg:ml-36 max-w-full">
       <Posts />
       <MyComponent />
    </div>
  )
}
