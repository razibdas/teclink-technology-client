


// const Banner = () => {


//     return (
//         <div className="relative h-full w-full bg-[#EEDDCC] ">
//             <img
//                 src="https://i.ibb.co/gdDhn6d/ai-nuclear-energy-background-future-innovation-disruptive-technology.jpg"
//                 alt="image 1"
//                 style={{ height: '60vh' }}
//                 className="w-full object-cover"
//             />
//             <div className="absolute inset-0 h-full w-full place-items-center bg-black/75">
//                 <div className="flex items-center justify-center lg:mt-36">
//                     <div className="w-[50%]">

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Banner = () => {
    // Array of image URLs
    const images = [
    'https://i.ibb.co/gdDhn6d/ai-nuclear-energy-background-future-innovation-disruptive-technology.jpg',
         'https://i.ibb.co/D5pm3dV/istockphoto-1493060482-612x612.jpg',
        ' https://i.ibb.co/gtm3f4p/istockphoto-1205061931-612x612.jpg',
       '  https://i.ibb.co/26p2W8X/istockphoto-1462942852-170667a.webp',
     ];
 

    return (
        <div className='w-full text-black '>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {images.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <div className="hero min-h-screen" style={{ backgroundImage: `url(${imageUrl})` }}>
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center ">
                                <div className="px-20 py-10 " style={{
                                    // backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                    {/* <h1 className="mb-5  text-white headtext__cormorant" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                                        Explore , <span className='text-5xl font-extrabold'>the World of Learning</span>
                                    </h1>
                                    <p className="mb-5  p__cormorant text-white " style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Discover the magic of diverse celebrations at Aroa Cultural Events Planner. We blend traditions and unity to create unforgettable cultural experiences.</p>
                                    <Link to='/contact'>
                                        <button className="px-10 py-3 m-2 rounded-full btn-style font-bold bg-gradient-to-r from-[#DCCA87] from-10% via-[#DCCA87] via-30% to-[#0F0F0F] to-90% text-black">Contact us</button>
                                    </Link>
                                    <Link to='/login'>
                                        <button className="border border-[#0F0F0F] btn-style px-8 py-2 m-2 font-bold rounded-full hover:bg-gradient-to-r from-[#DCCA87] from-10% to-[#0F0F0F] to-90% ">Get Started</button>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;

