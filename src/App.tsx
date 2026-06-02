import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./components/shared/Layout.tsx"

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
