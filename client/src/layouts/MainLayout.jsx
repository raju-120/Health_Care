import LeftSide from "../Components/LeftSide";
import CenterSide from "../Components/CenterSide";
/* import RightSide from "../Components/RightSide"; */



export default function MainLayout() {
  return (
    <div>
        <div className="lg:container max-w-auto lg:flex justify-between">
            <div className=" lg:p-6 h-16 lg:h-full  bg-neutral-500">
                <LeftSide />
            </div>
            <div className="lg:mr-14 ">
                <CenterSide />
            </div>
           {/*  <div className="lg:w-96">
                <RightSide />
            </div> */}
        </div>
    </div>
  )
}
