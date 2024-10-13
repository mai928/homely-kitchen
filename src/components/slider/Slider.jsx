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
                                        <img className='w-full h-[60vb] lg:h-[110vb] ' loading='eager' alt='img' src={slide?.photo} />
                                        <div className='absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50'></div>

                                    </div>
                                    <div className='absolute inset-0 top-72 lg:top-52 flex flex-col justify-center text-center items-center animatedText'>
                                        <h2 className=' text-lg lg:text-7xl text-white w-[80%]'>{t(slide?.title)}</h2>


                                        <div className='lg:mt-16 mb-10 text-white  text-[12px] lg:text-3xl  w-[80%]' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(slide?.details)) }} />
                                        <Link href={'/about'} className=' my-14 bg-primary_Color_Light cursor-pointer hover:bg-primary_Color_dark text-[13px] lg:text-lg text-white py-3 px-4 '>{t("Discover More")}</Link>

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