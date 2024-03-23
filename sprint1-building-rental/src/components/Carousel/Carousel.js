import { Carousel } from "react-responsive-carousel";
import "../Css/HomePage/Carousel.css";
function CarouselBody() {
  return (
    <>
      <Carousel>
        <div className="text-img-carousel-1">
          <img src="/img/HomePage/carousel-home-page-1.jpg" alt="Image" />
          <div className="carousel-caption">
          </div>
        </div>
        <div className="text-img-carousel-2">
          <img src="/img/HomePage/carousel-home-page-2.jpg" alt="Image" />
          <div className="carousel-caption">
           
          </div>
        </div>
        <div className="text-img-carousel-3">
          <img src="/img/HomePage/carousel-home-page-3.jpg" alt="Image" />
          <div className="carousel-caption">
            
          </div>
        </div>
      </Carousel>
      {/* <!-- Carosel End -->> */}
    </>
  );
}
export default CarouselBody;
