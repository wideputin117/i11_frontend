// components/Sidebar.js

import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard/companies" className="block hover:text-gray-300">
            Companies
          </Link>
        </li>
        <li>
          <Link href="/dashboard/drivers" className="block hover:text-gray-300">
            Drivers
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
