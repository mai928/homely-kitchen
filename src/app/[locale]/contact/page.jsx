import initTranslations from '@/app/i18n';
import Form from '@/components/Form'
import MainBackground from '@/components/MainBackground'
import React from 'react'
import { fetchData } from '../../../../utils/api';
import Link from 'next/link';






export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'وسائل تواصل مع  | Class A' : locale === 'en' ? "contact us   | Class A" : '',
        description: locale === 'ar' ? 'وسائل تواصل مع  | Class A' : locale === 'en' ? "contact us   | Class A" : '',
        other: {
            title: locale === 'ar' ? 'وسائل تواصل مع  | Class A' : locale === 'en' ? "contact us   | Class A" : '',
        }

    }
}






const Contact = async ({ params }) => {
    const i18nNamespaces = ["home"];



    const { locale } = params

    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/settings`, locale)
    const setting = Data?.data

    return (
        <section className='contact-bg'>

            <div className=' py-40 block lg:flex  gap-10 px-5 lg:px-40'>
                <div
                    className=' lg:w-[50%]'>
                    <div className='lg:flex justify-between '>

                        <div className='  '>
                            <h3 className='text-white text-4xl py-10'>{t("Contact us")}</h3>

                            {/* phone */}
                            <div className='flex items-center gap-5 py-5'>
                                <div className='p-2  bg-primary_Color_Meduim rounded-lg'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={20}
                                        className="fill-white"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                    </svg>
                                </div>

                                <div>
                                    {
                                        setting?.phones?.map((item, index) => (
                                            <Link key={index} className='font-semibold text-lg lg:text-base text-white' href={`tel:${item}`}>
                                                <p>{item} </p>
                                            </Link>
                                        ))
                                    }
                                </div>


                            </div>

                            {/* email */}
                            <div className='flex items-center gap-5  py-5 '>
                                <div className='p-2  bg-primary_Color_Meduim rounded-lg'>
                                    <svg width={20} className="fill-white"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>

                                </div>
                                <div>
                                    {
                                        setting?.contact_emails?.map((item, index) => (
                                            <Link key={index} href={`mailto:${item}`}>
                                                <p className='font-semibold text-white text-lg lg:text-base'>{item}</p>
                                            </Link>
                                        ))
                                    }
                                </div>


                            </div>

                            {/* address */}
                            <div className='flex items-center  gap-5   py-5 '>
                                <div className='p-2  bg-primary_Color_Meduim rounded-lg'>
                                    <svg width={20} className=' fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>

                                </div>
                                    <div>
                                        {
                                            setting?.addresses?.map((item, index) => (
                                                <p className='font-semibold text-base   text-white' key={index}>{item}</p>
                                            ))
                                        }
                                    </div>



                            </div>
                        </div>
                    </div>
                </div>
                <Form />
            </div>


            {/* <div>
                <div className=' px-5 lg:px-28 py-10 lg:py-20'><iframe className='w-full h-[400px] lg:h-[600px]' src={setting?.map}></iframe></div>
            </div> */}
        </section>
    )
}

export default Contact