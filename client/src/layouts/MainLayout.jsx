import LeftSide from "../Components/LeftSide";
import CenterSide from "../Components/CenterSide";


export default function MainLayout() {
  return (
    <div>
        <div className="container max-w-auto flex">
            <div className="p-16 bg-zinc-300">
                <LeftSide />
            </div>
            <div className="ml-[200px]">
                <CenterSide />
            </div>
        </div>
    </div>
  )
}
