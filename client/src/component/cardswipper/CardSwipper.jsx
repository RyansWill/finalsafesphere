import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { userData } from '../../lib/dummyData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './CardSwipper.css';

const CardSwiper = () => {
  // Hardcoded list of 10 random users based on your screenshot
 
  return (
    <div className="carousel-section">
      <div className="carousel-container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 3 }, // 3 cards visible at a time
          }}
          className="testimonial-swiper"
        >
          {userData.map((user) => (
            <SwiperSlide key={user.id}>
              <div className="testimonial-card">
                <div className="avatar-circle">{user.initial}</div>
                <p className="testimonial-text">"{user.text}"</p>
                <div className="star-rating">★★★★★</div>
                <p className="author-footer">
                  {user.name} on <a href="/">Google Reviews</a>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardSwiper;