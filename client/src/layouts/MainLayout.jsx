
import { Outlet } from "react-router-dom";
import CenterSide from "../Components/CenterSide";
/* import RightSide from "../Components/RightSide";
import LeftSide from "../Components/LeftSide"; */
import Headers from '../Components/Headers';
import Footer from "../Components/Footer";


export default function MainLayout() {
  return (
    <div>
        {/* <div>
            <Headers />
        </div>
        <div>
            <Outlet />
        </div>
        <div>
            <Footer/>
        </div> */}
         <div style={{marginTop: "-5em", marginLeft: "-8%"}}>
                <CenterSide />
            </div> 
        {/* <div className="">
            {/* <div className=" lg:p-6 h-16 lg:h-full  bg-neutral-500">
                <LeftSide />
            </div>
            
            <div className="lg:w-96">
                <RightSide />
            </div>  
            
        </div> */}
    </div>
  )
}
