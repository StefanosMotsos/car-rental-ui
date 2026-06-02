type BrandIconProps = {
    src: string
    alt: string
}

const BrandIcon = ({src, alt} : BrandIconProps) => {
    return (
        <>
            <img src={src} alt={alt} className="h-20 w-auto object-contain" />
        </>
    )
}

export default BrandIcon;