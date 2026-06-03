import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import Layout from "./components/shared/Layout.tsx"
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage.tsx";

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterCustomerPage/>} />
          </Route>
      </Routes>
    </>
  )
}

export default App
