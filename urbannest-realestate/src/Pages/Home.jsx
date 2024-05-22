import errorPage from "../assets/Images/errorPageIllustration.png";
import cone from "../assets/cone.svg";
import heroImg from "../assets/Images/LandingPageImages/heroSectionImg.png";
import { Link } from "react-router-dom";
import { MoveRight, Search } from "lucide-react";
import { HiLocationMarker } from "react-icons/hi";

const Home = () => {
  return (
    // <div className='relative w-full m-0'>
    <div className="px-44 py-10">
      <Hero />
    </div>
    //   <SearchMenu/>
    // </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pb-8 fade-in">
      <div className="flex xl:justify-between justify-center items-center flex-col lg:flex-row gap-10 mt-8 xl:mt-0 max-w-7xl">
        <div className="text-white flex flex-col justify-center items-start gap-6 ">
          <div className="relative z-10">
            <div className="bg-orange w-20 h-20 rounded-full absolute right-[28%] top-[-30px] -z-10" />
            <h1 className="font-bold lg:text-[3.8rem] md:text-[3.2rem] sm:leading-[4rem] leading-[3rem] text-[2.8rem]">
              Find your <br />{" "}
              <span className="text-orange">perfect Home,</span> <br /> hassle
              free
            </h1>
          </div>
          <div className="flex flex-col text-sm">
            <span>
              Welcome to Urbannest! Your gateway to the perfect property.
            </span>
            <span>
              Whether buying, selling, or renting, we streamline the process,
            </span>
            <span>
              empowering you with the tools to make informed decisions.
            </span>
          </div>
          <ExploreBtn />
          <div className="bg-gray-600 rounded-lg py-2 sm:px-4 px-2 flex items-center gap-3 justify-center max-w-2xl">
            <HiLocationMarker
              color="#63CCFF"
              size={25}
              className="max-[440px]:hidden"
            />
            <input
              type="text"
              className="border-none outline-none text-white bg-gray h-full px-4 py-2 rounded-lg"
              placeholder="Search a property"
            />
            <button className="bg-orange text-white px-4 py-2 font-bold rounded-md max-[440px]:hidden">
              Search
            </button>
            <Search className="max-[440px]:block hidden text-white bg-orange rounded-lg w-14 h-10 p-2" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="sm:w-[30rem] sm:h-[35rem] w-[20rem] h-[25rem] overflow-hidden rounded-t-[15rem] ">
            <img src={heroImg} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExploreBtn = () => {
  return (
    <Link to={"/explore"}>
      <div class="w-40 px-5 py-2 bg-white rounded-lg overflow-hidden relative group z-0 cursor-pointer">
        <div class="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-orange group-hover:scale-[800%] duration-500 z-[-1] op"></div>
        <div className="flex items-center justify-between">
          <h1 class="z-20 font-bold text-black group-hover:text-white duration-500 text-[1.4em]">
            Explore
          </h1>
          <MoveRight className="group-hover:opacity-100 opacity-0 text-white duration-500" />
        </div>
      </div>
    </Link>
  );
};

// const Hero = () => {
//   return(
//       <div className='flex justify-center items-center max-sm:flex-col max-sm:px-0 px-32 gap-24'>
//         <div className='w-1/2 flex flex-col gap-5'>
//           <h1 className='text-white font-bold text-6xl'>
//             Find your <br /> <span className='text-orange'>perfect home,</span><br />Hassle free
//           </h1>
//           <p className='text-white'>
//             Welcome to Urbannest! Your gateway to the perfect property. Whether buying, selling, renting, or investing, we streamline the process, empowering you with the tools to make informed decisions.
//           </p>
//           <Link to={'/explore'}>
//             <div
//               class="w-40 px-5 py-2 bg-white rounded-lg overflow-hidden relative group z-0 cursor-pointer"
//             >
//               <div
//                 class="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-orange group-hover:scale-[800%] duration-500 z-[-1] op"
//               ></div>
//               <div className='flex items-center justify-between'>
//                 <h1
//                   class="z-20 font-bold group-hover:text-white duration-500 text-[1.4em]"
//                 >
//                   Explore
//                 </h1>
//                 <MoveRight className='group-hover:opacity-100 opacity-0 text-white duration-500' />
//               </div>
//             </div>
//           </Link>
//         </div>
//         <img src={heroImg} alt="three-house-image" className='w-[35%]' />
//       </div>
//   )
// }

// const SearchMenu = () => {
//   return (
//     <form>
//       <div className='bg-gray flex justify-center items-center px-5 py-4 gap-4 w-1/3 rounded-xl absolute -bottom-10 right-[35%] max-sm:w-full max-sm:right-0 max-md:w-[60%]'>
//         <input type="text" placeholder='Search for a property' className='bg-darkgray text-white rounded-lg px-4 py-2 w-full' />
//         <button className='bg-orange text-white px-4 py-1 font-bold rounded-lg max-[500px]:hidden'>
//           Search
//         </button>
//         <Search className='max-[500px]:block hidden text-white bg-orange rounded-lg w-14 h-10 p-2'/>
//       </div>
//     </form>
//   )
// }

export default Home;
