import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
    return <div className='relative'>
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
        >
            <div>
                <img loading='lazy' src="Banner/banner1.jpg" alt="" />
            </div>

            <div>
                <img loading='lazy' src="Banner/banner2.jpg" alt="" />
            </div>

            <div>
                <img loading='lazy' src="Banner/banner3.jpg" alt="" />
            </div>

            <div>
                <img loading='lazy' src="Banner/banner4.jpg" alt="" />
            </div>
        </Carousel>
    </div>

}

export default Banner
