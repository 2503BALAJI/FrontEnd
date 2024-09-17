import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="w-screen bg-[#f3f2f0]">
      <div className="flex">
        {/* Sidebar for Admin */}
        <nav className="w-64 bg-gray-800 text-white h-screen p-5">
          <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
          <ul className="space-y-4">
            <li>
              <a
                href="#home"
                className="hover:bg-gray-700 block py-2 px-4 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:bg-gray-700 block py-2 px-4 rounded"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#reports"
                className="hover:bg-gray-700 block py-2 px-4 rounded"
              >
                Reports
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="hover:bg-gray-700 block py-2 px-4 rounded"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
