import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LogoCarousel = () => {
 
    const settings = {
      dots: false,
      infinite: true,
      speed: 3000,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,   
      autoplaySpeed: 3000,
      centerMode: true,
     centerPadding: '0px'
    };
  return (
   <div className='pb-10 pt-12 md:pb-16 max-w-6xl lg:mx-auto px-10 bg-white dark:bg-gray-700'>
     <Slider {...settings}>
      <div><img className='pt-2' src="img1.png" alt="Logo 1" /></div>
      <div><img src="img2.png" alt="img 2" /></div>
      <div><img src="img3.png" alt="img 3" /></div>
      <div><img src="img4.png" alt="img 4" /></div>
      <div><img src="img5.png" alt="img 5" /></div>
      <div><img src="img6.png" alt="img 6" /></div>
      <div><img src="img7.png" alt="img 7" /></div>
    </Slider>
   </div>
  );
};

export default LogoCarousel;
