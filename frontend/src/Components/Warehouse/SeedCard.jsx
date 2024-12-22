import React, { useState } from 'react';
import SeedEditForm from './SeedEditForm';
import SeedCardView from './SeedCardView';

const SeedCard = ({ seed, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeed, setEditedSeed] = useState({ ...seed });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSeed((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedSeed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSeed({ ...seed });
    setIsEditing(false);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {isEditing ? (
        <SeedEditForm
          editedSeed={editedSeed}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          formatDate={formatDate}
        />
      ) : (
        <SeedCardView
          seed={seed}
          onEdit={() => setIsEditing(true)}
          onDelete={onDelete}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default SeedCard
