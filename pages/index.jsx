// pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedMinor, setSelectedMinor] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      if (!user.bio) {
        return true; // Include users with missing bio in the filtered results
      }
      const [major, minor] = user.bio.split(' | ');
      return (
        (selectedMajor === '' || selectedMajor === major) &&
        (selectedMinor === '' || selectedMinor === minor)
      );
    });

  // Sort the filtered users based on their handle in ascending order
  const sorted = filtered.sort((a, b) => {
    return a.handle.localeCompare(b.handle);
  });

    setFilteredUsers(sorted);
  }, [users, selectedMajor, selectedMinor]);

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const handleMinorChange = (e) => {
    setSelectedMinor(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">IBA-JU 29th Batch Students</h1>
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMajor}
            onChange={handleMajorChange}
          >
            <option value="">All Majors</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            {/* Add more major options */}
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMinor}
            onChange={handleMinorChange}
          >
            <option value="">All Minors</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="HRM">HRM</option>
            {/* Add more minor options */}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredUsers.map((user) => (
          <Link key={user.id} href={`/${user.handle}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img
                src={`/people/${user.handle}.jpg`}
                alt={user.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 truncate">{user.name}</h2>
                <p className="text-gray-600 mb-4">@{user.handle}</p>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}