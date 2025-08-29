import { useEffect, useState } from 'react'
import './App.css'
import React from 'react';
import SavedUser from './components/SavedUser';

function App() {
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [name, setName] = useState();

  const [bd, setBd] = useState();
  const [lp, setLp] = useState();
  const [su, setSu] = useState();
  const [ss, setSs] = useState();
  const [fn, setFn] = useState();
  const [fnTotal, setFnTotal] = useState();
  const [exp, setExp] = useState();
  const [expTotal, setExpTotal] = useState();
  const [kua, setKua] = useState();
  const [gender, setGender] = useState();

  const [refresh, setRefresh] = useState(false);

  const chaldeanLetterValues =  {
    "A": 1, "I": 1, "J": 1, "Q": 1, "Y": 1,
    "B": 2, "K": 2, "R": 2,
    "C": 3, "G": 3, "L": 3, "S": 3,
    "D": 4, "M": 4, "T": 4,
    "E": 5, "H": 5, "N": 5, "X": 5,
    "U": 6, "V": 6, "W": 6,
    "O": 7, "Z": 7,
    "F": 8, "P": 8
  };

  useEffect(() => {
    const birthDateSum = date ? date.split('').reduce((acc, curr) => acc + Number(curr), 0) : 0;
    if(birthDateSum > 9) {
      const reducedBd = birthDateSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
      setBd(reducedBd);
    } else {
      setBd(birthDateSum);
  }}, [date]);

  useEffect(() => {
    const lifePathSum = (date ? date.split('').reduce((acc, curr) => acc + Number(curr), 0) : 0) 
    + (month ? month.split('').reduce((acc, curr) => acc + Number(curr), 0) : 0) 
    + (year ? year.split('').reduce((acc, curr) => acc + Number(curr), 0) : 0);
    if(lifePathSum > 9) {
      const reducedLp = lifePathSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
      setLp(reducedLp);
    } else {
      setLp(lifePathSum);
  }}, [date, month, year]);

  useEffect(() => {
    const yearTotal = year ? year.split('').reduce((acc, curr) =>  acc + curr, 0) : 0;
    let reducedYearTotal;;

    if(yearTotal > 9){
      reducedYearTotal = yearTotal.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
    }

    if(gender === 'male'){
      setKua(11-reducedYearTotal);
    }
    else if(gender === 'female'){
      setKua(4+reducedYearTotal);
    }
  }, [gender, year]);

  useEffect(() => {
    const firstName = name ? name.split(' ')[0] : '';
    const secondName = name ? name.split(' ')[1] : '';

    if(!firstName && !secondName){
      setSu(0);
      setSs(0);
      setFn(0);
      setExp(0);
      return;
    }

    if(firstName && !secondName){

      const soulUrgeSum = firstName.split('').reduce((acc, curr) => {
        const upperChar = curr.toUpperCase();
        if(['A', 'E', 'I', 'O', 'U'].includes(upperChar)) {
          return acc + (chaldeanLetterValues[upperChar] || 0);
        }
        return acc;
      }, 0);
      if(soulUrgeSum > 9) {
        const reducedSu = soulUrgeSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
        setSu(reducedSu);
      } else {
        setSu(soulUrgeSum);
      }

      const secretSelfSum = firstName.split('').reduce((acc, curr) => {
        const upperChar = curr.toUpperCase();
        if(!['A', 'E', 'I', 'O', 'U'].includes(upperChar) && (upperChar >= 'A' && upperChar <= 'Z')) {
          return acc + (chaldeanLetterValues[upperChar] || 0);
        }
        return acc;
      }, 0);
      if(secretSelfSum > 9) {
        const reducedSs = secretSelfSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
        setSs(reducedSs);
      } else {
        setSs(secretSelfSum);
      }

      const firstNameSum = firstName.split('').reduce((acc, curr) => {
        const upperCase = curr.toUpperCase();
        if(upperCase >= 'A' && upperCase <= 'Z'){
          return acc + (chaldeanLetterValues[upperCase] || 0);
        }
        return acc;
      }, 0);

      if(firstNameSum > 9){
        setFnTotal(firstNameSum);
        const reduceSum = firstNameSum.toString().split('').reduce((acc, curr) => acc + Number(curr) ,0);
        setFn(reduceSum);
      }
  } else if(firstName && secondName){
    const soulUrgeSum = (firstName + secondName).split('').reduce((acc, curr) => {
        const upperChar = curr.toUpperCase();
        if(['A', 'E', 'I', 'O', 'U'].includes(upperChar)) {
          return acc + (chaldeanLetterValues[upperChar] || 0);
        }
        return acc;
      }, 0);
      if(soulUrgeSum > 9) {
        const reducedSu = soulUrgeSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
        setSu(reducedSu);
      } else {
        setSu(soulUrgeSum);
      }

      const secretSelfSum = (firstName + secondName).split('').reduce((acc, curr) => {
        const upperChar = curr.toUpperCase();
        if(!['A', 'E', 'I', 'O', 'U'].includes(upperChar) && (upperChar >= 'A' && upperChar <= 'Z')) {
          return acc + (chaldeanLetterValues[upperChar] || 0);
        }
        return acc;
      }, 0);
      if(secretSelfSum > 9) {
        const reducedSs = secretSelfSum.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
        setSs(reducedSs);
      } else {
        setSs(secretSelfSum);
      }

      const expressionSum = (firstName + secondName).split('').reduce((acc, curr) => {
        const upperCase = curr.toUpperCase();
        if(upperCase >= 'A' && upperCase <= 'Z'){
          return acc + (chaldeanLetterValues[upperCase] || 0);
        }
        return acc;
      }, 0);

      if(expressionSum > 9){
        setExpTotal(expressionSum);
        const reduceExp = expressionSum.toString().split('').reduce((acc, curr) => acc + Number(curr) ,0);
        setExp(reduceExp);
      } else {
        setExp(expressionSum);
      }
    }
  }, [name])

  const saveToCookie = () => {
    const report = {
      name: name,
      birthday: `${date}-${month}-${year}`,
      birthDateNumber: bd,
      lifePathNumber: lp,
      soulUrgeNumber: su,
      secretSelfNumber: ss,
      firstName: fn,
      firstNameTotal: fnTotal,
      expressionNumber: exp,
      expressionTotal: expTotal
    };

  let existingReports = [];
  const storedReports = localStorage.getItem('numerologyReport');
  
  if (storedReports) {
    try {
      existingReports = JSON.parse(storedReports);
      if (!Array.isArray(existingReports)) {
        existingReports = [];
      }
    } catch (error) {
      console.error('Error parsing stored reports:', error);
      existingReports = [];
    }
  }

  existingReports.push(report);
  localStorage.setItem('numerologyReport', JSON.stringify(existingReports));
  setRefresh(!refresh);
  
  alert('Report saved to session storage!');
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center px-2 py-4">
    <div className="bg-red-800 text-yellow-100 rounded-xl border-2 border-red-800 w-full max-w-md mx-auto mb-4 py-3 text-center text-xl font-bold tracking-widest shadow-lg">
      Nirrvana Citrin Chaldean Numerology
    </div>
    <div className="w-full max-w-md bg-white rounded-lg border-2 border-amber-300 shadow-md p-4 mb-6">
      <form className="flex flex-col gap-4">
        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Date of Birth
          <div className="flex gap-2 mt-1">
            <input className="border rounded px-2 py-2 w-1/3 text-base" type="number" placeholder="DD" value={date || ''} onChange={e => setDate(e.target.value)} />
            <input className="border rounded px-2 py-2 w-1/3 text-base" type="number" placeholder="MM" value={month || ''} onChange={e => setMonth(e.target.value)} />
            <input className="border rounded px-2 py-2 w-1/3 text-base" type="number" placeholder="YYYY" value={year || ''} onChange={e => setYear(e.target.value)} />
          </div>
        </label>
        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Name
          <input className="border rounded px-2 py-2 mt-1 text-base" type="text" placeholder="Full Name" value={name || ''} onChange={e => setName(e.target.value)} />
        </label>
        <label className="flex flex-col text-sm font-semibold text-gray-700">
          Gender
          <select className="border rounded px-2 py-2 mt-1 text-base" value={gender || ''} onChange={e => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <div className="flex gap-2 mt-2">
          <button type="button" className="flex-1 py-2 bg-green-700 text-white rounded-lg font-semibold shadow active:bg-green-800" onClick={saveToCookie}>
            Save Report
          </button>
          <button type="button" className="flex-1 py-2 bg-yellow-700 text-white rounded-lg font-semibold shadow active:bg-yellow-800" onClick={() => localStorage.clear()}>
            Clear All
          </button>
        </div>
      </form>
      <div className="mt-4 p-2 border-2 border-black bg-white text-red-700 rounded-lg">
        <div className="text-base">Birth Date Number: <span className="font-bold">{bd}</span></div>
        <div className="text-base">Life Path Number: <span className="font-bold">{lp}</span></div>
        <div className="text-base">Soul Urge Number: <span className="font-bold">{su}</span></div>
        <div className="text-base">Secret Self Number: <span className="font-bold">{ss}</span></div>
        <div className="text-base">First Name: <span className="font-bold">{fnTotal}</span> | <span className="font-bold">{fn}</span></div>
        <div className="text-base">Expression: <span className="font-bold">{expTotal}</span> | <span className="font-bold">{exp}</span></div>
        <div className="text-base">KUA number: <span className="font-bold">{kua}</span></div>
      </div>
    </div>
    <div className="w-full max-w-md">
      {localStorage.getItem('numerologyReport') ?
        <SavedUser props={refresh} />
        :
        <div className="text-center text-gray-500 py-4">No saved names found.</div>
      }
    </div>
  </div>
  )
}

export default App
