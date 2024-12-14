
import Link from "next/link";


const Hero = () => {
  return (
    <div className="bg-primary-100 ">

    <div className="relative isolate px-6 pt-8 lg:px-8  ">

 <div className="mx-auto max-w-2xl  py-24 sm:py-48 lg:py-36  ">

   <div className=" text-center">
    <h2 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl  text-primary-900  ">
      New Arrivals
    </h2>

    <p className="mt-8 text-pretty text-lg font-medium text-primary-500 sm:text-xl/8 ">
      Explore the latest trends in fashion and discover stylish new clothing
      in our shop.
    </p>
<div className="mt-10 flex items-center justify-center " >
    {/* <Link
      href="/search/?sort=createdAt&order=desc"
      className="bg-primary-100 text-primary-800 text-lg font-semibold py-3 px-8 rounded-lg mt-8 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      Explore
    </Link> */}

    <Link 
    href="/search/?sort=createdAt&order=desc"
    className=" rounded-full px-3 py-1 ring-1 ring-primary-600 hover:ring-primary-900">
            <span className=" text-sm/6 font-semibold text-primary-900" aria-hidden="true">
              Explore products <span aria-hidden="true">&rarr;</span></span>
        </Link>
    </div>
    
    </div>

    </div>

  </div>
  
  </div>
  )
}

export default Hero