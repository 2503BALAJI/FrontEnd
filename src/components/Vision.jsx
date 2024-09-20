import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye } from "@fortawesome/free-solid-svg-icons";

const Vision = () => {
  return (
    <div className="  bg-white w-full py-16 px-6 md:px-16 lg:px-32">
      {/* Main heading */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 overflow-hidden">
          Welcome to Legacy Land Investment
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
          Your trusted platform for real estate investment opportunities.
          Explore lucrative avenues to invest and generate high returns in the
          rapidly growing real estate sector.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mt-12 space-y-8 md:space-y-0 md:space-x-8  p-10">
        {/* Our Mission */}
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8  transform transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 overflow-hidden text-gray-900">
            Our Mission
          </h3>
          <div className="flex items-center mb-6 ">
            <FontAwesomeIcon
              icon={faBullseye}
              size="2x"
              className="text-blue-500 mr-4"
            />
            <p className="text-gray-800 text-sm md:text-base lg:text-lg overflow-hidden">
              To provide investors with valuable real estate opportunities,
              empowering them to achieve significant financial growth through
              informed investments.
            </p>
          </div>
        </div>

        {/* Our Vision */}
        <div className="flex-1 bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8 
        transform transition-transform duration-300 hover:scale-105 ">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold overflow-hidden mb-4 text-gray-900">
            Our Vision
          </h3>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon
              icon={faEye}
              size="2x"
              className="text-blue-500 mr-4"
            />
            <p className="text-gray-800 text-sm md:text-base lg:text-lg overflow-hidden">
              To become a leading platform in real estate investment, providing
              individuals with opportunities to achieve financial freedom
              through smart real estate choices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
