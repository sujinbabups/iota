import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`/api/getProfile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfile({
            fullName: data.user.fullName,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            address: data.user.address || "",
          });
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const updatedProfile = {
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
    };

    try {
      const response = await fetch(`/api/addProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully:", data);
        setProfile(data.user);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 -mt-[10%]">
        <div className="flex flex-col items-center">

          <h1 className="text-xl font-bold">{profile.fullName}</h1>
          <p className="text-gray-500 mb-4">{profile.address}</p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            { label: "Full Name", name: "fullName", value: profile.fullName },
            { label: "Email", name: "email", value: profile.email },
            { label: "Phone", name: "phone", value: profile.phoneNumber },
            { label: "Address", name: "address", value: profile.address },
          ].map((field) => (
            <div key={field.name} className="flex items-center justify-between">
              <label className="w-1/4 font-medium text-gray-600">
                {field.label}:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  className="w-3/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <p className="w-3/4 text-gray-700">{field.value}</p>
              )}
            </div>
          ))}
        </div>
        <button
          className={`mt-5 px-4 py-2 rounded text-white ${
            isEditing ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={handleEditToggle}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        {isEditing && (
          <button
            className="ml-4 px-4 py-2 rounded bg-green-500 text-white"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
