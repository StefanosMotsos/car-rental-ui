import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="bg-neutral-900">
                <Outlet />
            </main>
        </>
    )
}

export default Layout