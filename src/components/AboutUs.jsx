import React from 'react';
import about_page from "../assets/Images/about_page.jpg"


const AboutUs = () => {

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100"
    
    id={"about"}
    >
      <div className="w-11/12  bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={about_page} // Replace with your image URL
            alt="Company"
            className=" w-full  object-cover sm:h-64 "
    // sm:h-64 md:h-80 lg:h-96 
          />
        </div>

        {/* Info Section */}
        <div className="p-8">
          <h1 className='text-3xl font-bold text-gray-800 mb-8 overflow-hidden '>Legacy Land Investment (LLI)</h1>
          <p className="text-gray-600 leading-relaxed">
          With experts from india, we are a india's-class team of property experts, finance geeks, fintech gurus and entrepreneurs. Our collective knowledge and experience span multiple geographies, decades and sectors.lagacy land investment (LLI)  is a real estate crowdfunding platform designed to make investing in institutional grade investment properties around the world simple, accessible and instant. "LLI"was set up with a clear mission: To disrupt the traditional way of investing in property, previously reserved for High Net Worth and institutional investors, giving "LLI" investors easy and direct access to property-backed investments with attractive potential returns.The state-of-the-art investment platform allows instant access across every time zone.

          </p>
          <p className="mt-4 text-gray-600 leading-relaxed  ">
            The clear and simple dashboard display allows investors to view, monitor and manage their investment portfolio wherever they are in the india, from the palm of their hand. Behind our investment platform is a specialist team of property professionals searching the indian selecting investment opportunities.  Our expert team undertake strict due diligence and navigate complex legal and administrative undertakings in order to create a bespoke selection of properties for investors to choose from. LLI offering access to secure asset-backed investments into secure real estate opportunities across the "india".
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
