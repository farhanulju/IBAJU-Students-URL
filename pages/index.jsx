// pages/index.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'


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
<>
<Head>
    <title>IBA-JU Links | A link in bio tool for IBA-JU Students</title>
    {/* <!-- Open Graph (OG) meta tags --> */}
    <meta property="og:url" content="https://bba29.iba-ju.edu.bd/" />
    <meta property="og:type" content="website" />
    <meta
      property="og:site_name"
      content="IBA-JU 29th Batch CV"
    />
    <meta property="og:title" content="IBA-JU Links" />
    <meta
      property="og:description"
      content="IBA-JU 29th Batch CV"
    />
    <meta
      property="og:image"
      itemprop="image"
      content="https://bba29.iba-ju.edu.bd/og.png"
    />

    {/* <!-- Twitter Card meta tags --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@IBA-JU" />
    <meta name="twitter:creator" content="@IBA-JU" />
    <meta
      property="twitter:domain"
      content="https://bba29.iba-ju.edu.bd/"
    />
    <meta property="twitter:url" content="https://bba29.iba-ju.edu.bd/" />
    <meta name="twitter:title" content="IBA-JU Links" />
    <meta
      name="twitter:description"
      content="IBA-JU 29th Batch CV"
    />
    <meta
      name="twitter:image"
      content="https://bba29.iba-ju.edu.bd/og.png"
    />
    <meta
      data-rh="true"
      name="twitter:image:alt"
      content="IBA-JU 29th Batch CV"
    />
  </Head>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">IBA-JU 29th Batch Students</h1>
      <div className='text-sm text-center mb-8 underline'>
  <a href='mailto:badrul.ibaju@juniv.edu' className='text-red-500 hover:text-red-800 transition duration-300'>
    Contact Batch Manager
  </a>
</div>
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
      {filteredUsers.map((user) => {
  let cardColor = '';
  let cardColorTo = '';
  if (user.bio === 'Finance | Marketing') {
    cardColor = 'from-green-100';
    cardColorTo = 'to-green-50';
  } else if (user.bio === 'Finance | HRM') {
    cardColor = 'from-orange-100';
    cardColorTo = 'to-orange-50';
  } else if (user.bio === 'Marketing | Finance') {
    cardColor = 'from-blue-100';
    cardColorTo = 'to-blue-50';
  } else if (user.bio === 'Marketing | HRM') {
    cardColor = 'from-red-100';
    cardColorTo = 'to-red-50';
  }



    return (
      <Link key={user.id} href={`/${user.handle}`}>
        <div className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 bg-gradient-to-r ${cardColor} ${cardColorTo}`}>
          <Image
            src={`/people/${user.handle}.jpg`}
            alt={user.name}
            width={500}
            height={500}
            className="w-full h-84 object-cover sm:h-64 lg:h-64"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 truncate text-center">{user.name}</h2>
            <p className="text-gray-600 mb-4 text-center">@{user.handle}</p>
            <p className="text-gray-700 text-center">{user.bio}</p>
          </div>
        </div>
      </Link>
    );
  })}
</div>

    </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://iba-students-url.vercel.app/api/users');
    const users = await response.json();

    return {
      props: {
        users,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
      },
      revalidate: 60,
    };
  }
}