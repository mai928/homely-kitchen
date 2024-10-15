'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Form = () => {

  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const ResponseMessage = ({ message }) => {
    if (!message) return null;

    return (
      <div className="mt-6 text-center">
        <p className={`text-lg ${message === 'Message sent successfully!' ? 'text-green-900' : 'text-red-500'}`}>
          {message}
        </p>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {


      const myHeaders = new Headers();
      myHeaders.append("Accept-Language", i18n.language);
      myHeaders.append("Cookie", "laravel_session=qqnKJa8kJEfXJDFZdRxVxOndbiYVEz6rjs4uLiyr");


      const formdata = new FormData();
      formdata.append("name", formData.name);
      formdata.append("phone", formData.phone);
      formdata.append("email", formData.email);
      formdata.append("message", formData.message);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata ,
        redirect: "follow",
       };                      
      const response = await fetch('https://api.classafoods.com/api/contact-submit', requestOptions);

      const result = await response.json();
      console.log(result)

      if (response.status && result.data) {
        setResponseMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setResponseMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred. Please try again.', error);
    }

    setTimeout(() => {
      setResponseMessage('')
    }, 3000)
  };
  return (
    <form onSubmit={handleSubmit} className=' w-full lg:w-[50%] py-10 text-center'>
        <input type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg: my-5 py-3 placeholder:text-dark_gray' placeholder={t('Name' )}/>
        <input type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg:w-full my-5  py-3 placeholder:text-dark_gray' placeholder={t('Email')} />
        <input type='number'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg:w-full my-5 py-3 placeholder:text-dark_gray' placeholder={t('Phone')} />
     
      <textarea id='message'
        name='message'
        value={formData.message}
        onChange={handleChange}
        required className='border-gray-300 px-5 border-solid border-[1px] w-full  pt-2 pb-10 placeholder:text-dark_gray' cols={5} placeholder={t('Message')} />
      <div className='flex justify-end py-4'>
        <button type='submit' className='border-[1px] border-primary_Color_Meduim  bg-primary_Color_Meduim  hover:bg-transparent text-xl text-white px-10 py-3 '>{t("Send")}</button>
      </div>
      
      <div>
        <ResponseMessage message={responseMessage} />
      </div>
    </form>
  )
}

export default Form