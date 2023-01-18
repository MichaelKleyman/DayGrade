import React from 'react';
import Image from 'next/image';
import Javascriptimg from '../public/images/javascript.png';
import Pythontimg from '../public/images/python.png';
import Htmlimg from '../public/images/html.png';
import Cssimg from '../public/images/css.png';
import Reactjsimg from '../public/images/reactjs.png';
import Nextjsimg from '../public/images/nextjs.png';
import Firebaseimg from '../public/images/firebase.png';
import Tailwindimg from '../public/images/tailwind.png';
import Reduximg from '../public/images/redux.png';
import Postgresimg from '../public/images/postgres.png';
import Sequelizeimg from '../public/images/sequelize.png';
import Nodeimg from '../public/images/node.png';

const IndividualSkills = () => {
  const skills = [
    { img: Javascriptimg, name: 'javascript' },
    { img: Pythontimg, name: 'python' },
    { img: Htmlimg, name: 'html' },
    { img: Cssimg, name: 'css' },
    { img: Reactjsimg, name: 'reactJS' },
    { img: Nextjsimg, name: 'nextJS' },
    { img: Firebaseimg, name: 'firebase' },
    { img: Tailwindimg, name: 'tailwind' },
    { img: Reduximg, name: 'redux' },
    { img: Postgresimg, name: 'postgres' },
    { img: Sequelizeimg, name: 'sequelize' },
    { img: Nodeimg, name: 'node' },
  ];

  return (
    <>
      {skills.map((skill, i) => (
        <div
          key={i}
          className='p-6 shadow-xl rounded-xl hover:scale-110 ease-in duration-300'
        >
          <div className='grid grid-cols-2 gap-4 justify-center items-center'>
            <div className='m-auto'>
              <Image src={skill.img} alt='skill' width='87' height='65' />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='uppercase tracking-widest'>{skill.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default IndividualSkills;
