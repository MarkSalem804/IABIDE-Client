import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import depedLogo from "../assets/deped_logo.png";
import bagongPilipinasLogo from "../assets/Bagong-Pilipinas-Logo.png";
import depedImage from "../assets/Logo-DepEd-1.png";
import ASDSImage from "../assets/Glenda_DS._Catadman-removebg-preview.png";
import SDSImage from "../assets/SDS Homer N. Mendoza.jpg";
import proponentImage from "../assets/Darlferhen M. Dancel.jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  // Sample data - replace with actual data
  const topManagement = [
    {
      id: 1,
      name: "HOMER N. MENDOZA",
      position: "Schools Division Superintendent",
      image: SDSImage,
    },
    {
      id: 2,
      name: "GLENDA DS CATADMAN",
      position: "Assistant Schools Division Superintendent",
      image: ASDSImage,
    },
  ];

  const proponents = [
    {
      id: 1,
      name: "DARLFERHEN M. DANCEL",
      position:
        "Senior Education Program Specialist II, OIC - Principal (Bayan Luma II Elementary School) ",
      image: proponentImage,
    },
  ];

  const developers = [
    {
      id: 1,
      name: "Mr. David Wilson",
      position: "Lead Developer",
      image: "https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=DW",
    },
    {
      id: 2,
      name: "Ms. Emily Davis",
      position: "Frontend Developer",
      image: "https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=ED",
    },
    {
      id: 3,
      name: "Mr. Robert Miller",
      position: "Backend Developer",
      image: "https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=RM",
    },
    {
      id: 4,
      name: "Ms. Lisa Garcia",
      position: "UI/UX Designer",
      image: "https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=LG",
    },
  ];

  const PersonCard = ({ person }) => (
    <div className="overflow-hidden h-full flex flex-col items-center text-center">
      {/* Container for the circular image with a border */}
      <div className="p-6">
        <div className="w-48 h-48 rounded-full overflow-hidden shadow-md flex-shrink-0 border-4 border-blue-200 transition-transform duration-300 hover:scale-110">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: "top" }}
          />
        </div>
      </div>
      <div className="p-0 flex flex-col items-center text-center flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-black">
          {person.name.toUpperCase()}
        </h3>
        <p className="text-sm font-medium mb-4 text-gray-700">
          {person.position}
        </p>
      </div>
    </div>
  );

  PersonCard.propTypes = {
    person: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };

  const Section = ({ title, people, colorClass }) => (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${colorClass} mb-2`}>{title}</h2>
        <div
          className={`w-24 h-1 mx-auto ${colorClass.replace("text-", "bg-")}`}
        ></div>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {people.map((person, index) => (
          <PersonCard key={person.id} person={person} index={index} />
        ))}
      </div>
    </div>
  );

  Section.propTypes = {
    title: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
    colorClass: PropTypes.string.isRequired,
  };

  return (
    <section className="bg-gray-50 relative overflow-hidden font-poppins min-h-screen py-16">
      {/* Back to Home - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-medium"
          title="Go to Login"
        >
          Back to Home
        </button>
      </div>

      {/* Background blobs for the main section */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600 rounded-full -ml-48 -mb-48"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our Team
          </h1>
          <p className="text-xl text-gray-600">
            Meet the dedicated team behind the IMUS ADMINISTRATIVE BULLETIN FOR
            INTEGRATED DOCUMENT EXCHANGE (IABIDE) system.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Top Management Section */}
          <Section
            title="Top Management"
            people={topManagement}
            colorClass="text-blue-600"
          />

          {/* Proponents Section */}
          <Section
            title="Proponents"
            people={proponents}
            colorClass="text-green-600"
          />

          {/* Developers Section */}
          <Section
            title="Developers"
            people={developers}
            colorClass="text-yellow-600"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6">
            <p className="text-gray-600">
              © 2025 SDO - Imus City. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src={depedImage} alt="DepEd" className="h-12 w-auto" />
              <img
                src={bagongPilipinasLogo}
                alt="Bagong Pilipinas"
                className="h-14 w-auto"
              />
              <img src={depedLogo} alt="DepEd Logo" className="h-12 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
