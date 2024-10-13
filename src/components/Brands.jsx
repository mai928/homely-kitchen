'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import LoaderComponent from './LoaderComponent';

const Brands = () => {

    const [loading, setLoading] = useState(true)

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

    const breakpoints = {
        1024: {
            slidesPerView: 3,
            spaceBetween: 20,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,

        },
        320: {
            slidesPerView: 1,
            spaceBetween: 0,

        },
        310: {
            slidesPerView: 1,
            spaceBetween: 0,

        },
    };


    const { t, i18n } = useTranslation()
    const [brands, setData] = useState([])
    useEffect(() => {
        const fetchBrand = async () => {
            const response = await fetchData(`api/categories`, i18n.language)
            setData(response.data)
            setLoading(false)

        }

        fetchBrand()
    }, [])

    return (
        <section className='lg:px-28 py-20'>
            <h3 className='text-center text-4xl font-semibold'>{t("Our Brands")}</h3>

            {
                loading || brands.length == 0 ? (
                    <LoaderComponent/>
                ) : (
                    <Swiper
                        slidesPerView={3}
                        breakpoints={breakpoints}
                        autoplay={{ delay: 4000 }}
                        speed={1000}
                        loop={true}
                        modules={[Navigation, Autoplay, Pagination]}

                    >
                        <div>
                            {brands?.map((item, index) => (
                                <SwiperSlide key={index} className=" mt-5 border-[1px] border-gray-50 shadow-lg">
                                    {/* "bg-white rounded-lg shadow-md overflow-hidden */}
                                    <div className="p-5">
                                        <div className="text-center">
                                            <img className='mx-auto  w-72 h-72 lg:w-80 lg:h-80 object-cover' alt={'img'} src={item.photo} />
                                            <h2 className="text-xl font-bold text-slate-800  mb-2 mt-5">{item.title}</h2>
                                            <div className=" text-[15px] text-dark_gray  font-[500] " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((truncateText(t(item.details || ''), 20))) }} />
                                            <div className='my-5'>
                                                <Link href={`/brands/${item?.slug}`} className={'text-white  bg-primary_Color_Light hover:bg-primary_Color_dark py-3 px-4'} >
                                                    {t("Read More")}
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>

                    </Swiper>
                )
            }


        </section>
    )
}

export default Brands