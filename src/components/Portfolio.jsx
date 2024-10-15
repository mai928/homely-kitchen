'use client'
import { Productgallery } from '@/data';
import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { ImageGallery } from 'react-image-grid-gallery';

const Portfolio = () => {

  const [data, setData] = useState(Productgallery)
//   const [loading, setLoader] = useState(true)

  const { i18n } = useTranslation()
//   useEffect(() => {
//     const ProductionFetch = async () => {
//       const Production = await fetchData(`api/galleries`, i18n.language)
//       setData(Production.data)
//       setLoader(false)

//     }
//     ProductionFetch()
//   }, [])

//   console.log(data)

  const images = data.map((image) => ({
    src: image?.photo,
    alt: image?.alt || '',
    caption: image?.caption,
    customOverla: (
      <div className="z-0">
        <div className='text-2xl font-bold  '>{image?.caption}</div>
      </div>
    ),
  }));

  return (
    <section className=' px-5 lg:px-40 bg-imgAbout z-0'>
        <div className='text-center pb-10'>
            <p className='capitalize text-lg text-primary_Color_Meduim'>Our Portfolio</p>
            <h3 className='text-white text-3xl lg:text-6xl  py-2'>Latest Projects  </h3>
        </div>
     <div className='z-0'>{
        // loading ? (<div><p className='text-center font-bold'>No Production Data</p></div>) :
         (<ImageGallery  imagesInfoArray={images}  columnWidth={300} columnCount={3} gapSize={40} />
        )
      }
        </div> 
    </section>
  )
}

export default Portfolio