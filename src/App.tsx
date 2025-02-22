import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import "./App.css"
import businessDetailsScreen from "./pages/BusinessDetailsScreen"

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
