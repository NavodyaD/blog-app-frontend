import React from 'react';
import Slider from 'react-slick';
import { BsPencil } from 'react-icons/bs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  '/assets/images/banner_img_1.jpg',
  '/assets/images/banner_vector_2.jpg',
  '/assets/images/banner_img_3.jpg',
  '/assets/images/banner_img_4.jpg',
];

const BlogBannerCarousel = ({ onCreatePost }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,

    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center gap-2 absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-white hover:bg-white transition-all"></div>
    ),

  };

  return (
    <div className="relative mb-10">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <div
              className="w-full bg-cover bg-center px-4 sm:px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl min-h-[340px] relative overflow-hidden border border-gray-300"
              style={{ backgroundImage: `url('${img}')` }}
            >
              <div className="absolute inset-0 bg-black/30 z-0 rounded-xl"></div>

              <div className="flex flex-col text-white text-left z-10">
                <h4 className="text-2xl md:text-3xl font-bold mb-2">
                  Get started with writing blogs.
                </h4>
                <p className="text-sm md:text-base mb-8">Submit posts for approval</p>
                <button
                  onClick={onCreatePost}
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-800 font-semibold rounded bg-white hover:bg-gray-200 hover:text-gray-800 px-6 py-2 transition"
                >
                  <BsPencil size={18} />
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogBannerCarousel;
