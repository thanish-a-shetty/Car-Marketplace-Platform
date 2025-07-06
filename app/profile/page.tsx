"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import UserListings from './UserListings';

export default function ProfilePage() {
  const { user, loading, token, userImage, setUserImage, setUserProfile } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUserImage(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        <span className="text-orange-500 text-xl">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    // Redirect handled in useEffect
    return null;
  }

  // --- Editable profile state ---
  const [editing, setEditing] = React.useState(false);
  const [editFields, setEditFields] = React.useState({
    name: user.name || '',
    gender: user.gender || '',
    city: user.city || '',
    phone: user.phone || '',
    email: user.email || '',
    image: userImage || '',
  });
  const [imagePreview, setImagePreview] = React.useState(userImage || '/user-icon.svg');

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFields(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImagePreview(ev.target.result as string);
          setEditFields(prev => ({ ...prev, image: ev.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setEditFields({
      name: user.name || '',
      gender: user.gender || '',
      city: user.city || '',
      phone: user.phone || '',
      email: user.email || '',
      image: userImage || '',
    });
    setImagePreview(userImage || '/user-icon.svg');
  };
  const handleSave = () => {
    // Save all fields to context/localStorage
    setUserProfile({
      name: editFields.name,
      gender: editFields.gender,
      city: editFields.city,
      phone: editFields.phone,
    });
    if (setUserImage) setUserImage(editFields.image);
    setEditing(false);
    // Show a quick toast/alert (simple for now)
    window.alert('Profile updated successfully!');
  };


  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center pt-24">
      <div className="bg-neutral-800 border border-orange-500 rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all duration-300 mb-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => editing && fileInputRef.current?.click()}>
            <img
              src={editing ? imagePreview : userImage || "/user-icon.svg"}
              alt="User Icon"
              className="w-28 h-28 rounded-full bg-neutral-700 border-4 border-orange-500 shadow-lg object-cover transition duration-300 hover:brightness-90"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleEditImage}
                className="hidden"
              />
            )}
            {editing && <span className="absolute bottom-2 right-2 bg-black/70 text-xs text-white px-2 py-1 rounded">Change</span>}
          </div>
          <div className="mt-4 text-center">
            {editing ? (
              <input
                type="text"
                name="name"
                value={editFields.name}
                onChange={handleFieldChange}
                className="text-3xl font-bold text-orange-500 bg-neutral-800 border-b-2 border-orange-400 focus:outline-none focus:border-orange-600 mb-2 w-full text-center"
              />
            ) : (
              <h2 className="text-3xl font-bold text-orange-500 mb-2">{user.name || 'User'}</h2>
            )}
            <p className="text-gray-300 text-lg mb-1">{user.email || 'No email'}</p>
            <p className="text-gray-400 text-sm">ID: {user.id || 'N/A'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300 mb-6">
          <div>
            <div className="mb-5">
              <span className="font-semibold">Gender:</span>
              {editing ? (
                <select
                  name="gender"
                  value={editFields.gender}
                  onChange={handleFieldChange}
                  className="ml-2 bg-neutral-800 border-b-2 border-orange-400 focus:outline-none focus:border-orange-600 text-white px-2 py-1 rounded"
                >
                  <option value="">Not specified</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className="ml-2">{user.gender || 'Not specified'}</span>
              )}
            </div>
            <div className="mb-5">
              <span className="font-semibold">City:</span>
              {editing ? (
                <input
                  type="text"
                  name="city"
                  value={editFields.city}
                  onChange={handleFieldChange}
                  className="ml-2 bg-neutral-800 border-b-2 border-orange-400 focus:outline-none focus:border-orange-600 text-white px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-2">{user.city || 'Not specified'}</span>
              )}
            </div>
            <div className="mb-5">
              <span className="font-semibold">Phone Number:</span>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={editFields.phone}
                  onChange={handleFieldChange}
                  className="ml-2 bg-neutral-800 border-b-2 border-orange-400 focus:outline-none focus:border-orange-600 text-white px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-2">{user.phone || 'Not specified'}</span>
              )}
            </div>
          </div>
          <div>
            <div className="mb-5">
              <span className="font-semibold">Gmail:</span>
              <span className="ml-2">{user.email || 'Not specified'}</span>
            </div>
            <div className="mb-5">
              <span className="font-semibold">Profile Pic:</span>
              <span className="ml-2">{imagePreview !== '/user-icon.svg' ? 'Uploaded' : 'Default'}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          {editing ? (
            <>
              <button
                className="px-5 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                onClick={handleSave}
              >Save</button>
              <button
                className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                onClick={handleCancel}
              >Cancel</button>
            </>
          ) : (
            <button
              className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
              onClick={handleEdit}
            >Edit</button>
          )}
        </div>
      </div>
      
      {/* User's Car Listings Section */}
      <div className="w-full max-w-6xl px-4">
        <UserListings />
        
        {/* Add New Listing Button */}
        <div className="mt-8 mb-16 flex justify-center">
          <Link href="/sell-car" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            List a New Car
          </Link>
        </div>
      </div>
    </div>
  );
}
