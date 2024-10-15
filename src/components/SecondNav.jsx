'use client'
import { navbarLink } from '@/data'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../public/assets/logo.png'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/api'
import LanguageChanger from './LanguageChanger'

const SecondNav = ({ showmenuIcon }) => {
     const {t ,i18n}= useTranslation()
  const [isFixed, setIsFixed] = useState(false);

  const handleFixed = () => {

    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }


  useEffect(() => {

    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    handleFixed()

  }, [])


  const [settings, setData] = useState('')
  useEffect(() => {
      const settingFetch = async () => {
          const data = await fetchData(`api/settings`, i18n.language)
          setData(data?.data)

      }

      settingFetch()
  }, [])
  return (
    <>
      {
        showmenuIcon === false && (<section
          className={`w-full z-50 py-2 border-b-[1px] border-slate-500     ${isFixed ? 'fixed top-0 bg-black z-50 ' : 'absolute top-0 border-b-[1px] border-slate-500  items-center'
            }`}>
          <div className='flex  items-center w-full justify-between px-40 '>
            <div>
              <img alt='logo' className={`${isFixed ? 'w-28' : 'w-32'}`} src={`/assets/logo-crop.png`} />
            </div>

            <div className='flex gap-10 items-center '>
              {
                navbarLink.map((link, index) => (
                  <div key={index}>
                    <Link href={link.path} className='text-white text-lg hover:text-primary_Color_dark hover:font-semibold'>{t(link.name)}</Link>
                  </div>
                ))
              }
              <LanguageChanger/>

            </div>
          </div>

        </section>)
      }


    </>

  )
}

export default SecondNav