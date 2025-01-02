import React from 'react';
import bgimage1 from '../../assets/Home/Home6.png';
import video1 from '../../assets/Square.mp4';
import Home1 from '../../assets/Home/Home1.png';
import Home2 from '../../assets/Home/Home2.png';
import Home3 from '../../assets/Home/Home3.png';
const HomePage = () => {
  return (
    <>
      <div className='w-[100vw] flex flex-col items-center h-auto'>
        {/* Text Section */}
        <div className='flex flex-col px-4 justify-center text-center items-center mt-[5%] gap-y-5'>
          <h1 className='font-mentiDisplay text-gray-900 text-2xl lg:w-[60%] lg:text-7xl text-center text-wrap'>
            What will you ask your audience?
          </h1>
          <p className='font-mentiText text-gray-900 text-sm lg:text-xl w-[80%] lg:w-[60%] text-center text-wrap'>
            Turn presentations into conversations with interactive polls that engage meetings and classrooms.
          </p>
          <button className='w-auto px-4 py-4 lg:px-7 lg:py-4 bg-gray-800 rounded-full hover:bg-black text-white text-sm lg:text-lg font-semibold'>
            Get started, it's free
          </button>
        </div>

        {/* Video and Image Section */}
        <div className='w-full relative flex h-auto justify-center items-center mt-[10%] lg:mt-[5%]'>
          {/* Image as the background layer */}
          <img
            className='w-full h-[20vh] md:h-full object-cover scale-110'
            src={bgimage1}
            alt=""
          />

          {/* Video layered above the image */}
          <video
            className='absolute outline outline-8 outline-purple-200 rounded-lg w-[80%] lg:max-w-3xl h-auto object-fit'
            loop
            autoPlay
            muted
            src={video1}
          ></video>
        </div>
      </div>

      {/* Spacer Section */}
      <div className='w-full h-auto flex flex-col justify-center items-center text-center gap-y-4 mt-[9%] mb-[5%]'>

        <h2 className=' text-xl md:text-5xl font-mentiDisplay'>Get started in 3 steps</h2>
        <p className='font-mentiText w-[80%] text-gray-700 text-sm md:text-xl text-wrap'>
        AptitudeHub helps you create, interact, and analyse - let's see how!</p>

        {/* Card Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mt-6'>
          {/* Card 1 */}
          <div className='flex flex-col border-[1px] w-72 gap-y-4 border-gray-200 p-4 rounded-md'>
            <div className='font-mentiDisplay text-2xl'>Create</div>
            <div><img src={Home1} alt="" className='w-72 rounded-md'/></div>
            <div>
              <p>
                Whatever you're looking to create, AptitudeHub has the answer. Make your 
                presentation in seconds from a template, or start from scratch, add an interactive 
                slide, and you’re all set!
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className='flex flex-col border-[1px] w-72 gap-y-4 border-gray-200 p-4 rounded-lg '>
            <div className='font-mentiDisplay text-2xl'>Interact</div>
            <div><img src={Home2} alt="" className='w-72 rounded-md'/></div>
            <div>
              <p className='font-mentiText'>
              When presenting your audience can easily join your presentation at Menti.com by entering your presentation unique code. You can both ask and receive questions, with instant results as you go.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className='flex flex-col border-[1px] w-72 gap-y-4 border-gray-200 p-4 rounded-md'>
            <div className='font-mentiDisplay text-2xl'>Analyze</div>
            <div><img src={Home3} alt="" className='w-72 rounded-md'/></div>
            <div>
              <p>
              Track how your audience reacted to your presentation, with slide-by-slide details after you present. You have now access to valuable insights about the questions you asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
