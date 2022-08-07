import React from "react";

function Navbar(props) {
  return (
    <nav className="container flex justify-between py-4 mx-auto bg-white">
      <div className="flex items-center">
        <h3 className="text-2xl font-medium text-blue-500">Kanban</h3>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="bg-gray-100 rounded px-5 py-3 border border-gray text-gray-700 font-semibold tracking-wide text-sm"
        >
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
