'use client'
import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import Link from 'next/link';
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';

const Video = () => {
    const [showImage, setShowImage] = useState(true);

    const { t, i18n } = useTranslation()

    const [mediaData, setData] = useState([])
    useEffect(() => {
        const fetchSlider = async () => {
            const data = await fetchData(`api/videos`, i18n.language)
            setData(data?.data)

        }

        fetchSlider()
    }, [])

    return (
        <section className='bg-partner ' >

            <div className='lg:mx-28 py-20 lg:flex relative z-20 '>

                <div className='m-auto lg:m-0 w-[90%] lg:w-[70%] border-[1px] border-light_gray p-10'>
                    <div className='lg:w-[60%]  text-center lg:text-start'>
                        <h3 className='text-white text-xl lg:text-3xl font-semibold py-5'>{t("Innovations & Integration to lead the market.")}
                        </h3>
                        <p className='text-white leading-8'>{t("Class A Food Industries, operating branches & warehouses network, plays a vital role in streamlining the supply chain by connecting our factory with different market sectors")}</p>
                        <ProgressBar completed={''} className='' barContainerClassName='bg-white' completedClassName='barCompleted' />
                        <div className='py-5'>
                            <Link href={'/media'} className='border-2 px-10 py-3 text-white font-semibold text-lg hover:text-black hover:bg-white'>{t("Show More")}</Link>
                        </div>
                    </div>

                </div>



                <div className='lg:absolute lg:start-[50%] lg:top-[20%] p-4 lg:p-0'>
                    <div>
                        {!showImage && (
                            <video src={mediaData[0]} className='h-[320px] ' autoPlay controls />
                        )}
                    </div>

                    {showImage && (
                        <div className='relative w-full'>

                            <img
                                onClick={() => setShowImage(false)}
                                alt='img'
                                className='w-full object-cover h-[320px] relative inset-0 cursor-pointer'
                                src='/assets/bg4.jpg'
                            />
                            <div className='bg-black absolute inset-0 bg-opacity-50'/>
                            <div  onClick={() => setShowImage(false)}
                                className='absolute  cursor-pointer rounded-full  top-[45%] left-[50%]'>
                                    <svg width={50} className='fill-primary_Color_Light'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                            </div>
                        </div>

                    )}
                </div>
            </div>

        </section>
    )
}

export default Video