import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import Layout from "./components/shared/Layout.tsx"
import RegisterCustomerPage from "@/pages/auth/RegisterCustomerPage.tsx";
import RegisterEmployeePage from "@/pages/auth/RegisterEmployeePage.tsx";
import ProtectedRoute from "@/components/ui/ProtectedRoute.tsx";
import AddVehiclePage from "@/pages/employee/AddVehiclePage.tsx";
import AddPhotoPage from "@/pages/employee/AddPhotoPage.tsx";
import VehicleListPage from "@/pages/customer/VehicleListPage.tsx";
import UpdateProfilePage from "@/pages/customer/UpdateProfilePage.tsx";
import UpdateEmployeePage from "@/pages/admin/UpdateEmployeePage.tsx";
import UpdateVehiclePage from "@/pages/admin/UpdateVehiclePage.tsx";
import EmployeeVehicleListPage from "@/pages/employee/EmployeeVehicleListPage.tsx";
import RentalListPage from "@/pages/employee/RentalListPage.tsx";

function App() {
  return (
    <>
      <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterCustomerPage/>} />
              <Route path="/register/employee" element={<ProtectedRoute roles={["ADMIN"]}><RegisterEmployeePage/></ProtectedRoute>} />


              <Route path="/customer/vehicles" element={<ProtectedRoute roles={["CUSTOMER"]}><VehicleListPage/></ProtectedRoute>} />
              {/*rental history*/}
              <Route path="/customer/edit" element={<ProtectedRoute roles={["CUSTOMER"]}><UpdateProfilePage/></ProtectedRoute>}/>


              <Route path="/employee/rentals" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><RentalListPage/></ProtectedRoute>} />
              <Route path="/employee/vehicles" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><EmployeeVehicleListPage/></ProtectedRoute>} />
              <Route path="/employee/add/vehicle" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><AddVehiclePage/></ProtectedRoute>} />
              <Route path="/employee/add/vehicle/:uuid/photo" element={<ProtectedRoute roles={["ADMIN", "EMPLOYEE"]}><AddPhotoPage/></ProtectedRoute>} />


              <Route path="/admin/vehicles/:uuid/edit" element={<ProtectedRoute roles={["ADMIN"]}><UpdateVehiclePage/></ProtectedRoute>} />
              <Route path="/admin/employees/:uuid/edit" element={<ProtectedRoute roles={["ADMIN"]}><UpdateEmployeePage/></ProtectedRoute>} />
              {/*admin(1 page)*/}
          </Route>
      </Routes>
    </>
  )
}

export default App
