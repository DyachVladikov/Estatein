import Button from "@/components/Button"
import "./EstateBanner.scss"

const EstateBanner = () => {

    return (
        <section className="section estate-banner">
            <img className="estate-banner-bg-1" src="/src/assets/backgrounds/bg-abstract2.png" />
            <img className="estate-banner-bg-2" src="/src/assets/backgrounds/bg-abstract2.png" />
            <div className="estate-banner-wrapper container">
                <div className="estate-banner__info">
                    <div className="estate-banner-title h2">
                        Start Your Real Estate Journey Today
                    </div>
                    <div className="estate-banner-description description">
                        <p>
                            Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.
                        </p>
                    </div>
                </div>
                <Button className="estate-banner-button" title="Explore Properties" label="Explore Properties" mode="purple"/>
            </div>
        </section>
    )
}

export default EstateBanner