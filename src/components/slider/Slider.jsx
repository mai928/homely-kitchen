'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'isomorphic-dompurify';
import LoaderComponent from '../LoaderComponent';
import { sliderData } from '@/data';

const Slider = () => {

    const [loading, setLoading] = useState(true)

    const { t, i18n } = useTranslation()

    // const [sliderData, setData] = useState([])
    // useEffect(() => {
    //     const fetchSlider = async () => {
    //         const data = await fetchData(`api/sliders`, i18n.language)
    //         setData(data?.data)
    //         setLoading(false)

    //     }

    //     fetchSlider()
    // }, [])

    return (
        <section className='relative z-0'

        >

            {/* {
                loading  ? (
                    <LoaderComponent/>
                ) : ( */}
                    <Swiper
                        className="static"
                        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                        key={i18n.language}
                        loop={true}
                        autoplay={{ delay: 10000 }}
                        effect="fade"
                        pagination={{ clickable: true }}
                        modules={[Navigation, Autoplay, EffectFade]}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}

                    >

                        <>

                            <div className={`swiper-button-next  text-white  `}></div>
                            <div className={`swiper-button-prev text-white `}></div>

                        </>
                        {
                            sliderData.map((slide, index) => (
                                <SwiperSlide key={index} className="swiper-slide relative">
                                    <div className='relative'>
                                        <img className='w-full h-[90vb] lg:h-[110vb] ' loading='eager' alt='img' src={slide?.photo} />
                                        <div className='absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'></div>

                                    </div>
                                    <div className='absolute  top-32 start-5 lg:top-52 lg:start-40 flex flex-col items-center   lg:items-start animatedText'>
                                        <div className='flex items-center gap-3'>
                                            <div className='border-b-2 border-primary_Color_Meduim  w-5'/>
                                            <p className='text-primary_Color_Meduim uppercase tracking-wider font-semibold py-4'>homely kitchen</p>
                                        </div>
                                        <h2 className=' text-lg lg:text-7xl text-white  '>{t(slide?.title)}</h2>


                                        <div className='  text-white  m-auto lg:m-0 text-center lg:text-start text-[12px] py-7 lg:text-2xl w-[70%]  lg:w-[90%] ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(slide?.details)) }} />
                                    <Link href={'/about'} className=' my-10 border-primary_Color_Meduim border-2 cursor-pointer  hover:bg-primary_Color_dark text-[13px] lg:text-lg text-white py-2 px-8 lg:px-14 tracking-widest capitalize '>{t("Call us Now")}</Link>

                                    </div>



                                </SwiperSlide>
                            ))
                        }



                    </Swiper>
                {/* )
            } */}


        </section>
    )
}

export default Slider