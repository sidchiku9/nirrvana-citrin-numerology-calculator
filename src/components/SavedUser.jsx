/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { NUMBER_MEANINGS } from '../utils/numerologyUtils';

const SavedUser = ({ props }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(localStorage.getItem('numerologyReport') ? JSON.parse(localStorage.getItem('numerologyReport')) : []);
  }, [props])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-purple-100 text-center mb-2">
        📋 Saved Reports
      </h2>
      {data.map((user, index) => (
        <div
          key={index}
          className="card-mystic p-5 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <UserCard {...user} />
        </div>
      ))}
    </div>
  )
}

const NumberBadge = ({ value, small = false }) => {
  if (!value && value !== 0) return <span className="text-gray-400">-</span>;

  return (
    <span className={`
      inline-flex items-center justify-center 
      ${small ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} 
      font-bold rounded-lg
      bg-gradient-to-br from-amber-400 to-amber-500 
      text-purple-900 
      shadow-sm
    `}>
      {value}
    </span>
  );
};

const UserCard = ({
  name,
  birthDateNumber,
  birthday,
  lifePathNumber,
  soulUrgeNumber,
  secretSelfNumber,
  firstName,
  firstNameTotal,
  expressionNumber,
  expressionTotal,
  kuaNumber
}) => {
  const lpMeaning = NUMBER_MEANINGS[lifePathNumber];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-100">
        <div>
          <h3 className="font-bold text-xl text-purple-900">{name}</h3>
          <p className="text-sm text-gray-600">📅 {birthday}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-purple-500 block mb-1">Life Path</span>
          <NumberBadge value={lifePathNumber} />
        </div>
      </div>

      {/* Life Path Meaning */}
      {lpMeaning && (
        <div className="bg-purple-50 rounded-xl p-3 mb-4">
          <span className="text-xs font-semibold text-purple-600">{lpMeaning.title}</span>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{lpMeaning.description}</p>
        </div>
      )}

      {/* Numbers Grid */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="text-[10px] text-gray-500 block mb-1">Birth Date</span>
          <NumberBadge value={birthDateNumber} small />
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="text-[10px] text-gray-500 block mb-1">Soul Urge</span>
          <NumberBadge value={soulUrgeNumber} small />
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="text-[10px] text-gray-500 block mb-1">Secret Self</span>
          <NumberBadge value={secretSelfNumber} small />
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="text-[10px] text-gray-500 block mb-1">First Name</span>
          <div className="flex items-center justify-center gap-1">
            <span className="text-[10px] text-gray-400">{firstNameTotal}→</span>
            <NumberBadge value={firstName} small />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <span className="text-[10px] text-gray-500 block mb-1">Expression</span>
          <div className="flex items-center justify-center gap-1">
            <span className="text-[10px] text-gray-400">{expressionTotal}→</span>
            <NumberBadge value={expressionNumber} small />
          </div>
        </div>
        {kuaNumber && (
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-[10px] text-gray-500 block mb-1">KUA</span>
            <NumberBadge value={kuaNumber} small />
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedUser;
