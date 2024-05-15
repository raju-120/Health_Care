import Sidebar from "../../Components/ChatComponent/Sidebar";
import MessageContainer from "../../Components/Messages/MessageContainer";

export default function ChatDashboard(){
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
    )
}