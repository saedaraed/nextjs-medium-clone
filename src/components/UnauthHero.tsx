import Link from "next/link";
// import Button from "./Button";

const UnauthHero =()=>{
return(
  <div className="min-h-screen bg-sand text-[#3b0014] font-sans">
      {/* Hero Banner */}
      <div className="relative h-screen flex flex-col overflow-hidden">
        {/* Split Background */}
        <div className="flex h-2/5 relative">
          <div className="w-full bg-[#687451]"></div>
          {/* <div className="w-1/2 bg-wine"></div> */}
          {/* Center Illustration */}
          <div className="absolute left-1/2 bottom-[-180px] transform -translate-x-1/2 w-96 h-96">
          <img src="/cat-mascot-illustration.png" alt="Blog Illustration" className="w-full h-full object-contain "  />

  
          </div>
        </div>
        {/* Content Section */}
        <div className="h-3/5 bg-[#f0e7c2] relative">
          <div className="max-w-4xl mx-auto px-6 text-center pt-16">
            <div
              className={`transition-all duration-1000 transform opacity-100 translate-y-10`}
            >
              <h1 className="font-serif text-5xl md:text-6xl mb-6 text-[#3b0014]  font-bold leading-tight">
                Stories That Inspire
              </h1>
              <p className="text-lg md:text-xl text-[#687451] mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover a world where every story matters. Join our community
                of storytellers, dreamers, and change-makers who share their
                journeys, insights, and inspirations.
              </p>
              {/* <button className="!rounded-button whitespace-nowrap cursor-pointer bg-black  hover:bg-opacity-90 text-white font-bold py-4 px-10 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start Your Journey
              </button> */}
              {/* <Button text=" Start Your Journey" variant="secondary"/> */}
              <Link href='/login' className="!rounded-button whitespace-nowrap cursor-pointer bg-[#3b0014] hover:bg-opacity-90 text-[#f0e7c2] font-bold py-4 px-10 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start Your Journey
              </Link>
            </div>
          </div>
          {/* Decorative Wave */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-16"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="#3b0014"
                fillOpacity="0.3"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
)
}
export default UnauthHero;