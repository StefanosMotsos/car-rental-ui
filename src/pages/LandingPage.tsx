import Header from "../components/shared/Header.tsx";
import {Button} from "../components/ui/button.tsx";

const LandingPage = () => {
    return (
        <>
            <Header />
            <section className="pt-25 hero-bg w-full h-screen flex flex-col items-center justify-center">
                <Button size="lg" className="mb-16 px-6 py-8 text-lg font-bold">
                    Rent A Car Now!
                </Button>
            </section>
        </>
    )
}

export default LandingPage