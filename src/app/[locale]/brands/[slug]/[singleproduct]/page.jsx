import initTranslations from '@/app/i18n'
import MainBackground from '@/components/MainBackground'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '../../../../../../utils/api'


export async function generateMetadata({ params }) {
    const {singleproduct } =params

    const { locale } = params
    const response = await fetchData(`api/single-service/${singleproduct}`, locale)
    const categories = response.data
  
  
    return {
      title: categories.meta_title  || "",
      description: categories.meta_title || "",
      other: {
        title: categories.meta_details || "",
      }
  
    }
  }






const SingleProduct = async({params}) => {
    const {singleproduct } =params

    const i18nNamespaces = ["home"];

    const { locale } = params


    const { t } = await initTranslations(locale, i18nNamespaces)
    const Data = await fetchData(`api/single-service/${singleproduct}`, locale)
    const detailsProduct = Data?.data

  return (
   <section>
    <MainBackground/>
    <div className='bg-light_gray'>
            <div className=' px-10 lg:px-28 py-20'>
                <div className='block lg:flex justify-between '>
                    <div className=' w-full lg:w-[45%]  text-center lg:text-start'>
                        <h3 className='text-xl lg:text-3xl'>{t(detailsProduct?.title)}</h3>
                        <div className='pt-5 pb-10 text-meduim_gray  text-[15px] leading-8 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(detailsProduct?.details || '')) }} />
                    </div>
                    <div className='w-full lg:w-[45%] mt-10 lg:mt-0'>
                        <img className='object-cover' src={detailsProduct?.photo} />

                    </div>

                </div>
            </div>


    </div>
   </section>
  )
}

export default SingleProduct