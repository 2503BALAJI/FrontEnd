import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navItems = [
    { name: "Dashboard", link: "/admin/Dashboard" },
    { name: "Add Video", link: "/admin/AdminPanelVideo" },
    { name: "Add Project", link: "/admin/Project" },
    { name: "Add Question", link: "/admin/Questions" },
  ];

  return (
    <div className="w-screen h-screen flex bg-[#f3f2f0]">
      {/* Sidebar for Admin */}
      <nav className="w-64 bg-gray-800 text-white h-full fixed top-0 left-0 p-5">
        <div className="text-2xl font-bold mb-8">Admin Dashboard</div>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                className="hover:bg-gray-700 block py-2 px-4 rounded"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
