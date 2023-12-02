import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { motion } from 'framer-motion';

const Banner = () => {


    return (
        <div className=' bg-black/75'>
            <motion.div
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
            >

                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                        height: '500px',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                        <img className='w-full ' src="https://i.ibb.co/bBKSngF/domenico-loia-Eh-Tc-C9s-YXsw-unsplash.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src="https://i.ibb.co/C6p1vqN/surface-ZFv-SWK4-L28-unsplash.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src="https://i.ibb.co/w0Nxj8L/alex-kotliarskyi-our-QHRTE2-IM-unsplash.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src="https://i.ibb.co/vwHWZtW/alex-knight-2-EJCSULRw-C8-unsplash.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src="https://i.ibb.co/pJL7ptk/firmbee-com-Df-MMzzi3rmg-unsplash.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src="https://i.ibb.co/YdszZ8j/jason-blackeye-XYrjl3j7smo-unsplash.jpg" />
                    </SwiperSlide>

                </Swiper>
                
            </motion.div >
            
            <div className='absolute flex -mt-72 lg:ml-24   justify-center z-10  text-container'>
                <p className='lg:text-4xl sm:text-2xl text-center text-red-600' >
                    Experience innovation like never before. Our commitment to<br></br>
                    excellence drives us to explore new possibilities<br></br>
                    and redefine the future
                </p>
            </div>
        </div>
    );
};

export default Banner;
