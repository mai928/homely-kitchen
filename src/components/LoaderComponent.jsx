'use client'
import React from 'react'
import Loader from "react-js-loader";


const LoaderComponent = () => {
  return (
    <div className=' mt-20 flex justify-center items-center'>
      <Loader type="bubble-scale" bgColor={'#E96D1F'} color={'red'} title={""} size={100} />
    </div>
  )
}

export default LoaderComponent