import {Link} from "react-router-dom";

type DropdownItemProps = {
    label: string,
    href: string,
    addClasses?: string,
}

const DropdownItem = (
    {label, href, addClasses}: DropdownItemProps) => {
    return(
        <>
            <Link to={href}
                  className={`text-center border-b border-zinc-600 
                  w-full py-1 ${addClasses ?? ""}`}>
                <li>
                    {label}
                </li>
            </Link>
        </>
    )
}

export default DropdownItem