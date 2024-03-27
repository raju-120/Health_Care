import LeftSide from "../Components/LeftSide";
import CenterSide from "../Components/CenterSide";



export default function MainLayout() {
  return (
    <div>
        <div className="container max-w-auto flex">
            <div className="lg:p-6 h-16 lg:h-full bg-neutral-500">
                <LeftSide />
            </div>
            <div className="mx-auto w-3/5">
                <CenterSide />
            </div>
        </div>
    </div>
  )
}
