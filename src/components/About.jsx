import initTranslations from '@/app/i18n'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '../../utils/api';
import DOMPurify from 'isomorphic-dompurify';


const About = async ({ params }) => {

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };
    const i18nNamespaces = ["home"];

    const { locale } = params


    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/about-us`, locale)
    const aboutData = Data?.data

    return (
        <section className='bg-imgAbout'>
            <div className=' px-10 lg:px-40 py-20'>
                <div className='block lg:flex justify-between '>
                    <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                        <h3 className='text-primary_Color_Meduim text-3xl uppercase tracking-wide'>About Homely Kitchen</h3>
                        {/* <h3 className='text-xl text-primary_Color_Light lg:text-3xl'>{t(aboutData?.title)}</h3> */}
                        <div className='py-14 text-slate-300   text-[17px] leading-10 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(truncateText(aboutData?.details || '', 50))) }} />
                        <Link href={'/about'} className='border-2 border-primary_Color_Meduim hover:bg-primary_Color_dark px-10 py-3 text-white'>{t("Read More")} </Link>
                    </div>
                    <div className='w-full lg:w-[45%] mt-10 lg:mt-0'>
                        <img className='object-cover' src={'/assets/logo.jpg'} />

                    </div>

                </div>
            </div>


        </section>
    )
}

export default About