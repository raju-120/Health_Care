import LeftSide from "../Components/LeftSide";
import CenterSide from "../Components/CenterSide";


export default function MainLayout() {
  return (
    <div>
        <div className="container max-w-auto flex">
            <div className="p-6 bg-zinc-300">
                <LeftSide />
            </div>
            <div className="ml-[100px]">
                <CenterSide />
            </div>
        </div>
    </div>
  )
}
