import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cryptosearchimg from '../public/projects/cryptocoinsearch.jpeg';
import FSAtravelimg from '../public/projects/FSAtravel.jpeg';
import Sliceimg from '../public/projects/Slice.jpeg';

const Projects = () => {
  const projectList = [
    {
      project: Cryptosearchimg,
      name: 'Cryptogram',
      tech: 'ReactJS',
      url: '/cryptosearch',
    },
    {
      project: FSAtravelimg,
      name: 'FSA Travel Agency',
      tech: 'ReactJS',
      url: '/fsatravel',
    },
    {
      project: Sliceimg,
      name: 'Slice Task Management',
      tech: 'NextJS',
      url: '/slice',
    },
  ];

  return (
    <div id='projects' className='w-full'>
      <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-blue-600'>
          My Projects
        </p>
        <h2 className='py-4'>Things I&apos;ve Built</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {projectList.map((project, i) => (
            <div
              key={i}
              className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-4 group hover:bg-gradient-to-r from-[#5651e5] to-[#709dff]'
            >
              <Image
                className='rounded-xl group-hover:opacity-10'
                src={project.project}
                alt='project'
                width='697'
                height='165'
              />
              <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <h3 className='text-2xl text-white tracking-wider text-center'>
                  {project.name}
                </h3>
                <p className='pb-4 pt-2 text-white text-center'>
                  {project.tech}
                </p>
                <Link href={`${project.url}`}>
                  <p className='text-center p-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer'>
                    More Info
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
