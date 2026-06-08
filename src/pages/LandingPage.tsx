import {Button} from "../components/ui/button.tsx";
import BrandIcon from "../components/ui/BrandIcon.tsx";
import StatCard from "../components/ui/StatCard.tsx";
import {Link} from "react-router-dom";

const brands = [
    { src: "/fiatlogo.png", alt: "Fiat" },
    { src: "/Volkswagenlogo.png", alt: "Volkswagen" },
    { src: "/toyotalogo.png", alt: "Toyota" },
    { src: "/Hondalogo.png", alt: "Honda" },
    { src: "/BMWlogo.png", alt: "BMW" },
    { src: "/Mercedeslogo.png", alt: "Mercedes" },
    { src: "/porschelogo.png", alt: "Porsche" },
    { src: "/lamborghinilogo.png", alt: "Lamborghini" },
]

const LandingPage = () => {
    return (
        <>
            <section className="pt-25 hero-bg w-full h-screen flex flex-col items-center justify-center">
                <Button size="lg" className="mb-16 px-6 py-8 text-lg font-bold">
                    <Link to={"/customer/vehicles"}>
                        Rent A Car Now!
                    </Link>
                </Button>
            </section>
            <section>
                <p className="text-zinc-300 text-3xl md:text-5xl font-bold text-center pt-20 md:pt-30 pb-5 border-t-3 border-zinc-700 w-full">We have cars from...</p>
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 px-6 md:px-16">
                    {brands.map((b) =>
                        <BrandIcon key={b.alt} src={b.src} alt={b.alt} />
                    )}
                </div>
                <p className="text-zinc-300 text-3xl md:text-5xl font-bold text-center py-5">...And many more!</p>
            </section>
            <section className="flex items-center justify-center gap-8 py-40 w-full">
                <StatCard title="No Hidden Fees" description="Know exactly what you're paying before you confirm" />
                <StatCard title="Wide Selection" description="Economy to VIP, a car for every occasion" />
                <StatCard title="Real Reviews" description="Rated by verified customers across Greece" />
            </section>
            <section className="flex flex-col items-center justify-center gap-8 py-8 w-full">
                <p className='text-zinc-300 text-3xl md:text-5xl font-bold'>Already a customer?</p>
                <Button size="lg" className="mb-16 px-6 py-8 text-lg font-bold">
                    <Link to={"/customer/rentals"}>View My Rentals</Link>
                </Button>
            </section>
            <section className="flex flex-col items-center justify-center gap-8 py-8 w-full">
                <p className="text-zinc-300 text-3xl font-bold text-center">Who We Are</p>
                <p className="text-zinc-300 text-lg text-center max-w-2xl">
                    Motsos Car Rentals serves customers across Greece with a fleet for every need.
                    From economy cars for the budget-conscious traveler to VIP vehicles for those
                    who demand the finest, we have you covered. With locations across Athens,
                    Piraeus, and Thessaloniki, your next journey is closer than you think.
                </p>
            </section>
        </>
    )
}

export default LandingPage