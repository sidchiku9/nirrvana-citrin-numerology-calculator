import { useEffect, useState, useMemo } from 'react'
import './App.css'
import React from 'react';
import SavedUser from './components/SavedUser';
import LoshoGrid from './components/LoshoGrid';
import ReportEditor from './components/ReportEditor';
import {
  calculateBirthDate,
  calculateLifePath,
  calculateKua,
  calculateNameNumbers,
  validateDate,
  validateMonth,
  validateYear,
  NUMBER_MEANINGS
} from './utils/numerologyUtils';

// Number Card Component with tooltip
const NumberCard = ({ label, value, total = null, showMeaning = true }) => {
  const meaning = value && NUMBER_MEANINGS[value];
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 group">
      <span className="text-xs font-medium text-purple-600 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        {total !== null && (
          <span className="text-sm text-gray-500 font-medium">{total} →</span>
        )}
        <div
          className={`number-display ${isAnimating ? 'animate-number-pop' : ''}`}
        >
          {value || '-'}
        </div>
      </div>
      {showMeaning && meaning && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="meaning-badge">{meaning.title}</span>
        </div>
      )}
    </div>
  );
};

// Number Meaning Modal/Tooltip Component
const NumberMeaning = ({ number, onClose }) => {
  const meaning = NUMBER_MEANINGS[number];
  if (!meaning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="glass-light p-6 rounded-2xl max-w-sm w-full animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-4">
          <div className="number-display text-2xl">{number}</div>
          <div>
            <h3 className="text-xl font-bold text-purple-900">{meaning.title}</h3>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{meaning.description}</p>
        <div className="flex flex-wrap gap-2">
          {meaning.keywords.map(keyword => (
            <span key={keyword} className="meaning-badge">{keyword}</span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full btn-primary text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Calculator Page Component
const CalculatorPage = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [errors, setErrors] = useState({});

  const handleDateChange = (value) => {
    setDate(value);
    if (value && !validateDate(value)) {
      setErrors(prev => ({ ...prev, date: 'Day must be 1-31' }));
    } else {
      setErrors(prev => ({ ...prev, date: null }));
    }
  };

  const handleMonthChange = (value) => {
    setMonth(value);
    if (value && !validateMonth(value)) {
      setErrors(prev => ({ ...prev, month: 'Month must be 1-12' }));
    } else {
      setErrors(prev => ({ ...prev, month: null }));
    }
  };

  const handleYearChange = (value) => {
    setYear(value);
    if (value && !validateYear(value)) {
      setErrors(prev => ({ ...prev, year: 'Year must be 1900-2100' }));
    } else {
      setErrors(prev => ({ ...prev, year: null }));
    }
  };

  const bd = useMemo(() => calculateBirthDate(date), [date]);
  const lp = useMemo(() => calculateLifePath(date, month, year), [date, month, year]);
  const kua = useMemo(() => calculateKua(year, gender), [year, gender]);
  const nameNumbers = useMemo(() => calculateNameNumbers(name), [name]);

  const saveToCookie = () => {
    const report = {
      name: name,
      birthday: `${date}-${month}-${year}`,
      birthDateNumber: bd,
      lifePathNumber: lp,
      soulUrgeNumber: nameNumbers.su,
      secretSelfNumber: nameNumbers.ss,
      firstName: nameNumbers.fn,
      firstNameTotal: nameNumbers.fnTotal,
      expressionNumber: nameNumbers.exp,
      expressionTotal: nameNumbers.expTotal,
      kuaNumber: kua
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
  };

  const clearAll = () => {
    localStorage.clear();
    setDate('');
    setMonth('');
    setYear('');
    setName('');
    setGender('');
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="relative z-10 flex flex-col items-center px-4 py-6 min-h-screen">
        {/* Header */}
        <header className="w-full max-w-lg mx-auto mb-6">
          <div className="glass rounded-2xl px-6 py-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              ✨ Nirrvana Citrin ✨
            </h1>
            <p className="text-purple-200 text-sm mt-1 font-medium tracking-wide">
              Chaldean Numerology Calculator
            </p>
          </div>
        </header>

        {/* Main Form Card */}
        <main className="w-full max-w-lg mx-auto mb-6">
          <div className="card-mystic p-6">
            <form className="flex flex-col gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-800">
                  Date of Birth
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      className={`input-mystic w-full text-center ${errors.date ? 'border-red-400' : ''}`}
                      type="number"
                      placeholder="DD"
                      value={date}
                      onChange={e => handleDateChange(e.target.value)}
                      min="1"
                      max="31"
                    />
                    {errors.date && <span className="text-xs text-red-500 mt-1 block">{errors.date}</span>}
                  </div>
                  <div className="flex-1">
                    <input
                      className={`input-mystic w-full text-center ${errors.month ? 'border-red-400' : ''}`}
                      type="number"
                      placeholder="MM"
                      value={month}
                      onChange={e => handleMonthChange(e.target.value)}
                      min="1"
                      max="12"
                    />
                    {errors.month && <span className="text-xs text-red-500 mt-1 block">{errors.month}</span>}
                  </div>
                  <div className="flex-1">
                    <input
                      className={`input-mystic w-full text-center ${errors.year ? 'border-red-400' : ''}`}
                      type="number"
                      placeholder="YYYY"
                      value={year}
                      onChange={e => handleYearChange(e.target.value)}
                      min="1900"
                      max="2100"
                    />
                    {errors.year && <span className="text-xs text-red-500 mt-1 block">{errors.year}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-800">
                  Full Name
                </label>
                <input
                  className="input-mystic w-full"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-purple-800">
                  Gender (for KUA number)
                </label>
                <select
                  className="input-mystic w-full"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  className="flex-1 btn-primary"
                  onClick={saveToCookie}
                >
                  💾 Save Report
                </button>
                <button
                  type="button"
                  className="flex-1 btn-danger"
                  onClick={clearAll}
                >
                  🗑️ Clear All
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-purple-100">
              <h2 className="text-lg font-semibold text-purple-800 mb-4 text-center">
                Your Numerology Profile
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <div onClick={() => bd && setSelectedNumber(bd)} className="cursor-pointer">
                  <NumberCard label="Birth Date" value={bd} />
                </div>
                <div onClick={() => lp && setSelectedNumber(lp)} className="cursor-pointer">
                  <NumberCard label="Life Path" value={lp} />
                </div>
                <div onClick={() => kua && setSelectedNumber(kua)} className="cursor-pointer">
                  <NumberCard label="KUA" value={kua} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => nameNumbers.su && setSelectedNumber(nameNumbers.su)} className="cursor-pointer">
                  <NumberCard label="Soul Urge" value={nameNumbers.su} />
                </div>
                <div onClick={() => nameNumbers.ss && setSelectedNumber(nameNumbers.ss)} className="cursor-pointer">
                  <NumberCard label="Secret Self" value={nameNumbers.ss} />
                </div>
                <div onClick={() => nameNumbers.fn && setSelectedNumber(nameNumbers.fn)} className="cursor-pointer">
                  <NumberCard label="First Name" value={nameNumbers.fn} total={nameNumbers.fnTotal} />
                </div>
                <div onClick={() => nameNumbers.exp && setSelectedNumber(nameNumbers.exp)} className="cursor-pointer">
                  <NumberCard label="Expression" value={nameNumbers.exp} total={nameNumbers.expTotal} />
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                💡 Tap any number to learn its meaning
              </p>
            </div>
          </div>
        </main>

        <section className="w-full max-w-lg mx-auto mb-6">
          {localStorage.getItem('numerologyReport') ? (
            <SavedUser props={refresh} />
          ) : (
            <div className="glass rounded-xl px-6 py-8 text-center">
              <p className="text-purple-200">No saved reports yet. Fill in the form above and save!</p>
            </div>
          )}
        </section>

        <section className="w-full max-w-lg mx-auto">
          <LoshoGrid />
        </section>
      </div>

      {selectedNumber && (
        <NumberMeaning number={selectedNumber} onClose={() => setSelectedNumber(null)} />
      )}
    </>
  );
};

// Main App with Page Navigation
function App() {
  const [currentPage, setCurrentPage] = useState('calculator');

  return (
    <div className={currentPage === 'calculator' ? 'min-h-screen gradient-mystic relative overflow-hidden' : ''}>
      {/* Stars background only for calculator page */}
      {currentPage === 'calculator' && (
        <div className="stars-bg">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Page Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 no-print">
        <div className="page-selector shadow-2xl">
          <button
            className={currentPage === 'calculator' ? 'active' : ''}
            onClick={() => setCurrentPage('calculator')}
          >
            🔢 Calculator
          </button>
          <button
            className={currentPage === 'report' ? 'active' : ''}
            onClick={() => setCurrentPage('report')}
          >
            📋 Report Editor
          </button>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 'calculator' && <CalculatorPage />}
      {currentPage === 'report' && <ReportEditor />}
    </div>
  );
}

export default App
