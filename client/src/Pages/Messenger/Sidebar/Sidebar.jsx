export default function Sidebar({user,handleUserSelect}) {
  return (
    <div>
        <li  onClick={() => handleUserSelect(user)}  className="text-xl font-semibold">
              {user?.username}
            </li>
    </div>
  )
}
