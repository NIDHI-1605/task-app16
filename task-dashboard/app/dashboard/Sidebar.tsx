export default function Sidebar() {
  return (
    <aside className='h-screen bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-6 flex flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold mb-6 tracking-tight'>📋 Task Manager</h1>
        <nav>
          <ul className='space-y-4'>
            <li>
              <a href='/dashboard' className='hover:text-yellow-300 font-medium'>Dashboard</a>
            </li>
            <li>
              <a href='https://localhost:3000' className='hover:text-yellow-300 font-medium'>Home</a>
            </li>
          </ul>
        </nav>
      </div>
      <footer>
        <p className='text-xs text-gray-100 opacity-75'>Made with Next.js & FastAPI</p>
      </footer>
    </aside>
  )
}
