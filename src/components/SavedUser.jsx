import React, { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const SavedUser = ({props}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(localStorage.getItem('numerologyReport') ? JSON.parse(localStorage.getItem('numerologyReport')) : []);
  }, [props])

  return (
    <div className="flex flex-col gap-4 pb-8">
      {data.map((user, index) => (
        <div
          key={index}
          className="rounded-xl border-t-4 border-amber-400 bg-white shadow-lg px-4 py-5"
        >
          <UserCard {...user} />
        </div>
      ))}
    </div>
  )
}

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
  expressionTotal
}) => {
  return (
    <div>
      <div className="font-bold text-xl mb-2 text-red-800">{name}</div>
      <div className="text-base text-gray-700 mb-1">
        <span className="font-semibold">Birth Date:</span> {birthday}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2">
        <div>
          <span className="font-semibold text-amber-700">Birth Date #:</span> {birthDateNumber}
        </div>
        <div>
          <span className="font-semibold text-amber-700">Life Path #:</span> {lifePathNumber}
        </div>
        <div>
          <span className="font-semibold text-amber-700">Soul Urge #:</span> {soulUrgeNumber}
        </div>
        <div>
          <span className="font-semibold text-amber-700">Secret Self #:</span> {secretSelfNumber}
        </div>
      </div>
      <div className="text-sm mb-1">
        <span className="font-semibold text-green-700">First Name:</span> {firstNameTotal} | {firstName}
      </div>
      <div className="text-sm">
        <span className="font-semibold text-blue-700">Expression:</span> {expressionNumber} | {expressionTotal}
      </div>
    </div>
  )
}

export default SavedUser;
