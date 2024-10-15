import MainBackground from '@/components/MainBackground'
import React from 'react'
import { fetchData } from '../../../../utils/api';
import initTranslations from '@/app/i18n';




export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        description: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        other: {
            title: locale === 'ar' ? 'معلومات عن | Class A' : locale === 'en' ? "Information about  | Class A" : '',
        }

    }
}

const About = async ({ params }) => {
    const i18nNamespaces = ["home"];

    const { locale } = params



    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/about-us`, locale)
    const aboutData = Data?.data



    return (
        <section className='contact-bg'>
            {/* <MainBackground /> */}
            <div>
                <div className=' px-10 lg:px-28 py-32'>
                    <div className='block lg:flex justify-between '>
                        <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                            <h3 className='text-xl lg:text-3xl'>{t(aboutData?.title)}</h3>
                            <div className='pt-5 pb-10 text-slate-200  text-[18px] leading-10' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(aboutData?.details)) }} />
                            {/* <p className='pt-5 pb-10 text-meduim_gray  text-[15px] leading-8 '>{t(aboutData?.details)}</p> */}
                        </div>
                        <div className='w-full h-full lg:w-[45%] mt-10 '>
                            <img className='object-cover' src={'/assets/logo.jpg'} />

                        </div>

                    </div>
                </div>


            </div>
        </section>
    )
}

export default About