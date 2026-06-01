import {Button} from "../ui/button.tsx";

const Header = () => {
    return (
        <>
            <header className="fixed top-0 left-0 z-50 flex items-center justify-between px-28 header-gradient w-full h-25">
                <img src="/mcr-logo.png" alt="Motsos Car Rentals" className="h-[90px] w-auto ml-12" />
                <span className="text-gray-700 tracking-widest text-lg">ENJOY THE LIFE</span>
                <Button size="lg" variant="ghost"
                        className="border border-primary text-primary hover:bg-primary hover:text-white h-10 px-6 text-lg">
                    Login
                </Button>
            </header>
        </>
    )
}

export default Header