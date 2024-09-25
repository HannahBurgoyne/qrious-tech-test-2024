import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <main className="app bg-background min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default App
