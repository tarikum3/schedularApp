
import Link from "next/link";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-primary-100 via-white to-primary-200">
        <div className="relative px-6 pt-12 lg:pt-20 lg:px-8">
          <div className="mx-auto max-w-7xl text-center space-y-8">
            {/* Top Badge */}
            <div className="border border-indigo-600 p-1 w-64 mx-auto rounded-full flex items-center justify-between">
              <span className="font-inter text-sm font-medium text-primary-900 ml-3">
                Explore the latest trends
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl mx-auto text-center font-manrope font-extrabold text-4xl text-primary-900 tracking-tight md:text-5xl leading-snug">
              Elevate Your Look with Our 
              <span className="text-blue-600"> Stylish Collection</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-lg mx-auto text-center text-lg font-light leading-relaxed text-primary-700">
              Redefine your wardrobe with our carefully curated pieces. Discover timeless styles crafted to make you stand out effortlessly.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/search/?sort=createdAt&order=desc"
                className="inline-flex items-center justify-center py-3 px-8 text-lg font-semibold text-white rounded-full bg-blue-600 shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:outline-none transition-all duration-300"
              >
                Explore Products
                <svg
                  className="ml-3"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Transition Section */}
      <div className="h-64 bg-gradient-to-b from-primary-200 to-white"></div>
    </>
  );
};

export default Hero;
