import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="flex bg-blue-500 p-4 text-white w-full">
      <h1 className="text-lg font-bold">My App</h1>
      <ul className="flex space-x-4 mx-auto">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-white"
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
