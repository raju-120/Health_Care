import LeftSide from "../Components/LeftSide";
import CenterSide from "../Components/CenterSide";


export default function MainLayout() {
  return (
    <div>
        <div className="container max-w-auto flex">
            <div className="lg:p-6 bg-neutral-500 rounded-lg">
                <LeftSide />
            </div>
            <div className="lg:ml-[100px] ml-[40px]">
                <CenterSide />
            </div>
        </div>
    </div>
  )
}
