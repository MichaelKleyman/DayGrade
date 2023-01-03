import React, { useState } from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChevronDoubleUp } from 'react-icons/bs';
import Link from 'next/link';

const Contact = () => {
  const [info, setInfo] = useState({
    name: '',
    number: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);
    setInfo({
      name: '',
      number: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div id='contact' className='w-full lg:h-screen'>
      <div className='max-w-[1240px] m-auto px-2 py-16 w-full'>
        <p className='text-xl tracking-widest uppercase text-blue-600'>
          Contact
        </p>
        <h2 className='py-4'>Get In Touch</h2>
        <div className='grid lg:grid-cols-5 gap-8'>
          {/* left */}
          <div className='col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4'>
            <div className='lg:p-4 h-full'>
              <div>
                <img
                  className='rounded-xl hover:scale-110 ease in duration-300'
                  src='https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                  alt='/'
                />
              </div>
              <div>
                <h2 className='py-2'>Michael Kleyman</h2>
                <p>Full Stack Software Developer</p>
                <p className='py-4'>
                  I am available for freelance or fulltime positions. Reach out
                  and lets talk!
                </p>
              </div>
              <div>
                <p className='tracking-widest uppercase pt-8'>
                  Connect with me
                </p>
                <div className='flex items-center justify-between py-4'>
                  <a
                    href='https://www.linkedin.com/in/michael-kleyman/'
                    target='_blank'
                    className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                  >
                    <FaLinkedinIn size={30} />
                  </a>
                  <a
                    href='https://github.com/MichaelKleyman'
                    target='_blank'
                    className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                  >
                    <FaGithub size={30} />
                  </a>
                  <a
                    href=''
                    target='_blank'
                    className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300'
                  >
                    <AiOutlineMail size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className='col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4'>
            <div className='p-4'>
              <form>
                <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  <div className='flex flex-col'>
                    <label className='uppercase py-2 text-sm'>
                      <span className='text-red-600 text-lg'>*</span> Name:
                    </label>
                    <input
                      className='border-2 rounded-lg p-3 flex border-gray-300'
                      type='text'
                      name='name'
                      value={info.name}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='uppercase py-2 text-sm'>
                      <span className='text-red-600 text-lg'>*</span>Phone
                      number:
                    </label>
                    <input
                      className='border-2 rounded-lg p-3 flex border-gray-300'
                      type='text'
                      name='number'
                      value={info.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase py-2 text-sm'>
                    <span className='text-red-600 text-lg'>*</span> Email:
                  </label>
                  <input
                    className='border-2 rounded-lg p-3 flex border-gray-300'
                    type='email'
                    name='email'
                    value={info.email}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase py-2 text-sm'>
                    <span className='text-red-600 text-lg'>*</span> Subject:
                  </label>
                  <input
                    className='border-2 rounded-lg p-3 flex border-gray-300'
                    type='text'
                    name='subject'
                    value={info.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='uppercase py-2 text-sm'>
                    <span className='text-red-600 text-lg'>*</span> Message:
                  </label>
                  <textarea
                    className='border-2 rounded-lg p-3 border-gray-300'
                    rows='10'
                    name='message'
                    value={info.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  disabled={
                    !info.name ||
                    !info.number ||
                    !info.email ||
                    !info.subject ||
                    !info.message
                  }
                  onClick={handleSubmit}
                  className='w-full p-4 text-gray-100 mt-3 ease-in duration-300 hover:scale-110'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className='flex justify-center py-12'>
          <Link href='/'>
            <div className='rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
              <BsChevronDoubleUp className='text-blue-600' size={25} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
