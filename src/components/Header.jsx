'use client'
import React, { useEffect, useRef, useState } from 'react'
import FirstNav from './FirstNav'
import SecondNav from './SecondNav'
import Link from 'next/link'
import { navbarLink } from '@/data'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../../utils/api'
import LanguageChanger from './LanguageChanger'

const Header = () => {
  const { t, i18n } = useTranslation()

  const [toggle, setToggle] = useState(false)
  const [showmenuIcon, setshowmenuIcon] = useState(false)
  const sidebarRef = useRef(null);


  const handleClickOutside = (event) => {
    // If the sidebar is open and the click is outside of it, close the sidebar
    if (toggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

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
  useEffect(() => {

    const handleSize = () => {
      if (window.innerWidth <= 1024) {
        setToggle(false)
        setshowmenuIcon(true)
      } else {
        setshowmenuIcon(false)

      }
    }


    handleSize()
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }

  }, [])


  useEffect(() => {
    // Add the event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [toggle])




  const [settings, setData] = useState('')
  useEffect(() => {
    const settingFetch = async () => {
      const data = await fetchData(`api/settings`, i18n.language)
      setData(data?.data)

    }

    settingFetch()
  }, [])
  return (
    <section className=''>
      <div>{
        showmenuIcon === true ? (
          <div className={`w-full pe-8 z-50 ${isFixed ? 'fixed top-0  bg-black' : 'absolute top-0 '}`}>
            <div className=' flex justify-between items-center'>
              <div>
                <img alt='logo' className='w-36' src={settings?.logo} />
              </div>
              <div onClick={() => setToggle(!toggle)}> <svg xmlns="http://www.w3.org/2000/svg" width={20} className='fill-white ' viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg></div>
            </div>
          </div>
        ) : (
          <div> 
            {/* <FirstNav showmenuIcon={showmenuIcon} /> */}
            <SecondNav showmenuIcon={showmenuIcon} />
          </div>
        )
      }
      </div>

      <div>
        <div ref={sidebarRef}>
          <div className={`sidebar ${toggle ? "open" : "close"} `}>
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <Link href={'/'}><img alt="logo" width={100} height={'auto'} src={settings?.logo} /></Link>
              </div>

              <ul>
                {navbarLink.map((item, index) => (
                  <div key={item.name} className="flex items-center mt-7">
                    <div className="p-1 bg-white-400 rounded-full me-4">
                      <svg

                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        className="fill-primary_Color_Light  "
                        viewBox="0 0 320 512"
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </div>
                    <li className='relative'>

                      <Link

                        className="text-white text-xl font-semibold   hover:text-primary-500"
                        href={item.path}
                        onClick={() => setToggle(false)}
                      >
                        {t(item.name)}
                      </Link>
                    </li>

                  </div>

                ))}
              </ul>

              <div className="flex items-center mt-7">
                <div className="p-1 bg-white-400 rounded-full me-4">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    width={13}
                    height={13}
                    className="fill-secondary_color  "
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>


                </div>


              </div>
              <LanguageChanger/>

            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Header

