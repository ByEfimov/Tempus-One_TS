import { FC } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';

interface SwipeFC {
    children: React.ReactChild | React.ReactNode;
}

const Swipe: FC<SwipeFC> = ({ children }) => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {children}
        </Swiper>
    );
};
export default Swipe;
