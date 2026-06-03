import { Link } from "react-router-dom"
import {Mail, MapPin, Phone} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="header-gradient px-10 py-6 text-navy-dark">
                <div className="flex items-start justify-center gap-40">
                    <div>
                        <h2 className="font-medium text-lg">Motsos Car Rentals</h2>
                        <p className="max-w-sm">Premium rentals across Greece. Economy to VIP, a car for every occasion.</p>
                    </div>
                    <div>
                        <h3 className="font-medium tracking-wider text-sm">NAVIGATE</h3>
                        <ul className="flex flex-col gap-1">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/customer/vehicles" className="hover:underline">Browse Vehicles</Link></li>
                            <li><Link to="/customer/rentals" className="hover:underline">My Rentals</Link></li>
                            <li><Link to="/login" className="hover:underline">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium tracking-wider text-sm">CONTACT</h3>
                        <ul className="flex flex-col gap-1">
                            <li className="flex items-center gap-2"><Mail size={16}/>stefanosmotsos01@gmail.com</li>
                            <li className="flex items-center gap-2"><Phone size={16}/>+30 210 000 0000</li>
                            <li className="flex items-center gap-2"><MapPin size={16}/>Athens, Greece</li>
                            <li>
                                <div className="flex gap-3 mt-1">
                                    <a href="https://github.com/StefanosMotsos" target="_blank" rel="noreferrer">
                                        <FaGithub size={28} />
                                    </a>
                                    <a href="https://linkedin.com/in/StefanosMotsos" target="_blank" rel="noreferrer">
                                        <FaLinkedin size={28} />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-neutral-400 w-full mt-8 pt-4 text-center">
                    <p>© 2026 Motsos Car Rentals. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer