import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

export default function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col mt-3'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
		</div>
  )
}
