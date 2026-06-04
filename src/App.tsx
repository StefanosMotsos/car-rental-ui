import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import Layout from "./components/shared/Layout.tsx"
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage.tsx";
import RegisterEmployeePage from "@/pages/auth/RegisterEmployeePage.tsx";
import ProtectedRoute from "@/components/ui/ProtectedRoute.tsx";
import AddVehiclePage from "@/pages/vehicles/AddVehiclePage.tsx";
import AddPhotoPage from "@/pages/vehicles/AddPhotoPage.tsx";

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterCustomerPage/>} />
              <Route path="/register/employee" element={<ProtectedRoute roles={["ADMIN"]}><RegisterEmployeePage/></ProtectedRoute>} />
              <Route path="/add/vehicle" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><AddVehiclePage/></ProtectedRoute>} />
              <Route path="/add/vehicle/:uuid/photo" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><AddPhotoPage/></ProtectedRoute>} />
          </Route>
      </Routes>
    </>
  )
}

export default App
