import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navItems = [
    { name: "Dashboard", link: "Dashboard" },
    { name: "Add Vedio", link: "AdminPanelVedio" },
    { name: "Add Project", link: "Project" },
  ];

  return (
    <div className="w-screen bg-[#f3f2f0]">
      <div className="flex">
        {/* Sidebar for Admin */}
        <nav className="w-64 bg-gray-800 text-white h-screen p-5">
          <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  className="hover:bg-gray-700 block py-2 px-4 rounded"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
