import React, { useState, useEffect, useRef } from 'react';
import {
    calculateBirthDate,
    calculateLifePath,
    calculateKua,
    calculateNameNumbers
} from '../utils/numerologyUtils';
import {
    getDefaultReportData,
    NUMBER_READINGS,
    LUCKY_ATTRIBUTES,
    BEHAVIORAL_CHANGES,
    DISCLAIMER,
    RATING_OPTIONS
} from '../utils/reportData';
import NirrvanaCitrinLogo from '../utils/NirrvanaCitrinLogo.svg';

// Form Input Component
const FormInput = ({ label, value, onChange, type = 'text', placeholder = '', multiline = false, rows = 3 }) => (
    <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
        {multiline ? (
            <textarea
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
            />
        ) : (
            <input
                type={type}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        )}
    </div>
);

// Section Header in Form
const FormSection = ({ title, children }) => (
    <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-sm font-bold text-amber-800 mb-3 pb-2 border-b border-amber-200">{title}</h3>
        {children}
    </div>
);

// Rating Select
const RatingSelect = ({ label, value, onChange }) => (
    <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
        <select
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {RATING_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const ReportEditor = () => {
    const [data, setData] = useState(getDefaultReportData());
    const reportRef = useRef(null);

    // Update specific field
    const updateField = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    // Auto-calculate from DOB
    useEffect(() => {
        if (data.birthDate) {
            const [year, month, day] = data.birthDate.split('-');
            if (day && month && year) {
                const bd = calculateBirthDate(day);
                const lp = calculateLifePath(day, month, year);
                const kua = calculateKua(year, data.gender);

                // Auto-fill birth numbers
                setData(prev => ({
                    ...prev,
                    oldBD: bd.toString(),
                    oldLP: lp.toString(),
                    newBD: bd.toString(),
                    newLP: lp.toString(),
                    kuaNumber: kua ? kua.toString() : ''
                }));

                // Auto-fill lucky attributes based on Life Path
                if (LUCKY_ATTRIBUTES[lp]) {
                    const attrs = LUCKY_ATTRIBUTES[lp];
                    setData(prev => ({
                        ...prev,
                        luckyColors: prev.luckyColors || attrs.colors,
                        luckyNumbers: prev.luckyNumbers || attrs.numbers,
                        rulingPlanet: prev.rulingPlanet || attrs.planet,
                        recommendedCrystals: prev.recommendedCrystals || attrs.crystals
                    }));
                }
            }
        }
    }, [data.birthDate, data.gender]);

    // Auto-calculate from Old Name
    useEffect(() => {
        if (data.oldNameFull) {
            const nums = calculateNameNumbers(data.oldNameFull);
            setData(prev => ({
                ...prev,
                oldFirstName: nums.fn.toString(),
                oldFirstNameTotal: nums.fnTotal.toString(),
                oldExpression: nums.exp.toString(),
                oldExpressionTotal: nums.expTotal.toString(),
                oldSoulUrge: nums.su.toString(),
                oldSecretSelf: nums.ss.toString()
            }));

            // Auto-generate readings if empty
            if (!data.oldFirstNameReading && nums.fn) {
                setData(prev => ({
                    ...prev,
                    oldFirstNameReading: NUMBER_READINGS[nums.fn]?.firstName || ''
                }));
            }
            if (!data.oldFullNameReading && nums.exp) {
                setData(prev => ({
                    ...prev,
                    oldFullNameReading: NUMBER_READINGS[nums.exp]?.fullName || ''
                }));
            }
        }
    }, [data.oldNameFull]);

    // Auto-calculate from New Name
    useEffect(() => {
        if (data.newNameFull) {
            const nums = calculateNameNumbers(data.newNameFull);
            setData(prev => ({
                ...prev,
                newFirstName: nums.fn.toString(),
                newFirstNameTotal: nums.fnTotal.toString(),
                newExpression: nums.exp.toString(),
                newExpressionTotal: nums.expTotal.toString(),
                newSoulUrge: nums.su.toString(),
                newSecretSelf: nums.ss.toString()
            }));

            // Auto-generate readings if empty
            if (!data.newFirstNameReading && nums.fn) {
                setData(prev => ({
                    ...prev,
                    newFirstNameReading: NUMBER_READINGS[nums.fn]?.firstName || ''
                }));
            }
            if (!data.newFullNameReading && nums.exp) {
                setData(prev => ({
                    ...prev,
                    newFullNameReading: NUMBER_READINGS[nums.exp]?.fullName || ''
                }));
            }
        }
    }, [data.newNameFull]);

    // Print function
    const handlePrint = () => {
        const printContent = reportRef.current;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    // Save to localStorage
    const handleSave = () => {
        const reports = JSON.parse(localStorage.getItem('nirrvanaReports') || '[]');
        reports.push({ ...data, savedAt: new Date().toISOString() });
        localStorage.setItem('nirrvanaReports', JSON.stringify(reports));
        alert('Report saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-purple-800 text-white py-4 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">✨ Nirrvana Citrin Report Editor</h1>
                        <p className="text-purple-200 text-sm">Professional Numerology Report Generator</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors">
                            💾 Save
                        </button>
                        <button onClick={handlePrint} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-semibold transition-colors">
                            🖨️ Print Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 flex gap-4">
                {/* Left Panel - Editor Form */}
                <div className="w-96 flex-shrink-0 bg-white rounded-xl shadow-lg p-4 h-[calc(100vh-120px)] overflow-y-auto">
                    <h2 className="text-lg font-bold text-purple-800 mb-4">📝 Report Editor</h2>

                    <FormSection title="Client Information">
                        <FormInput
                            label="Client Name"
                            value={data.clientName}
                            onChange={v => updateField('clientName', v)}
                            placeholder="Full name as on birth certificate"
                        />
                        <FormInput
                            label="Birth Date"
                            type="date"
                            value={data.birthDate}
                            onChange={v => updateField('birthDate', v)}
                        />
                        <div className="mb-3">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Gender (for KUA)</label>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                                value={data.gender}
                                onChange={e => updateField('gender', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </FormSection>

                    <FormSection title="Lucky Attributes">
                        <FormInput label="Lucky Colors" value={data.luckyColors} onChange={v => updateField('luckyColors', v)} />
                        <FormInput label="Lucky Numbers" value={data.luckyNumbers} onChange={v => updateField('luckyNumbers', v)} />
                        <FormInput label="Ruling Planet" value={data.rulingPlanet} onChange={v => updateField('rulingPlanet', v)} />
                        <FormInput label="Recommended Crystals" value={data.recommendedCrystals} onChange={v => updateField('recommendedCrystals', v)} />
                    </FormSection>

                    <FormSection title="Old/Birth Name">
                        <FormInput
                            label="Full Name (as on birth certificate)"
                            value={data.oldNameFull}
                            onChange={v => updateField('oldNameFull', v)}
                            placeholder="Enter birth name"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <FormInput label="BD" value={data.oldBD} onChange={v => updateField('oldBD', v)} />
                            <FormInput label="LP" value={data.oldLP} onChange={v => updateField('oldLP', v)} />
                            <FormInput label="First Name" value={data.oldFirstName} onChange={v => updateField('oldFirstName', v)} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <FormInput label="Expression" value={data.oldExpression} onChange={v => updateField('oldExpression', v)} />
                            <FormInput label="Soul Urge" value={data.oldSoulUrge} onChange={v => updateField('oldSoulUrge', v)} />
                            <FormInput label="Secret Self" value={data.oldSecretSelf} onChange={v => updateField('oldSecretSelf', v)} />
                        </div>
                        <RatingSelect label="First Name Rating" value={data.oldFirstNameRating} onChange={v => updateField('oldFirstNameRating', v)} />
                        <RatingSelect label="Full Name Rating" value={data.oldFullNameRating} onChange={v => updateField('oldFullNameRating', v)} />
                    </FormSection>

                    <FormSection title="Suggested/New Name">
                        <FormInput
                            label="Full Suggested Name"
                            value={data.newNameFull}
                            onChange={v => updateField('newNameFull', v)}
                            placeholder="Enter suggested spelling"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <FormInput label="BD" value={data.newBD} onChange={v => updateField('newBD', v)} />
                            <FormInput label="LP" value={data.newLP} onChange={v => updateField('newLP', v)} />
                            <FormInput label="First Name" value={data.newFirstName} onChange={v => updateField('newFirstName', v)} />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <FormInput label="Expression" value={data.newExpression} onChange={v => updateField('newExpression', v)} />
                            <FormInput label="Soul Urge" value={data.newSoulUrge} onChange={v => updateField('newSoulUrge', v)} />
                            <FormInput label="Secret Self" value={data.newSecretSelf} onChange={v => updateField('newSecretSelf', v)} />
                        </div>
                        <RatingSelect label="First Name Rating" value={data.newFirstNameRating} onChange={v => updateField('newFirstNameRating', v)} />
                        <RatingSelect label="Full Name Rating" value={data.newFullNameRating} onChange={v => updateField('newFullNameRating', v)} />
                    </FormSection>

                    <FormSection title="Readings & Interpretations">
                        <FormInput
                            label="Old First Name Reading"
                            value={data.oldFirstNameReading}
                            onChange={v => updateField('oldFirstNameReading', v)}
                            multiline rows={4}
                        />
                        <FormInput
                            label="Old Full Name Reading"
                            value={data.oldFullNameReading}
                            onChange={v => updateField('oldFullNameReading', v)}
                            multiline rows={4}
                        />
                        <FormInput
                            label="New First Name Reading"
                            value={data.newFirstNameReading}
                            onChange={v => updateField('newFirstNameReading', v)}
                            multiline rows={4}
                        />
                        <FormInput
                            label="New Full Name Reading"
                            value={data.newFullNameReading}
                            onChange={v => updateField('newFullNameReading', v)}
                            multiline rows={4}
                        />
                    </FormSection>

                    <FormSection title="Instructions">
                        <FormInput label="Writing Color" value={data.writingColor} onChange={v => updateField('writingColor', v)} />
                        <FormInput label="Times Daily" value={data.writingTimes} onChange={v => updateField('writingTimes', v)} />
                        <FormInput label="Duration" value={data.writingDuration} onChange={v => updateField('writingDuration', v)} />
                        <FormInput
                            label="Method"
                            value={data.writingMethod}
                            onChange={v => updateField('writingMethod', v)}
                            multiline rows={3}
                        />
                    </FormSection>

                    <FormSection title="Additional Notes">
                        <FormInput
                            label="Practitioner Notes"
                            value={data.practitionerNotes}
                            onChange={v => updateField('practitionerNotes', v)}
                            multiline rows={4}
                            placeholder="Any additional notes for the client..."
                        />
                    </FormSection>
                </div>

                {/* Right Panel - Report Preview */}
                <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-[calc(100vh-120px)] overflow-y-auto">
                        <div ref={reportRef} className="report-preview">
                            <ReportPreview data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Report Preview Component
const ReportPreview = ({ data }) => {
    return (
        <div className="report-content bg-white p-10 font-serif" style={{ minHeight: '100%' }}>
            {/* Header with decorative border */}
            <div className="border-4 border-amber-600 p-8 mb-8 relative bg-gradient-to-br from-amber-50/50 to-white">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-6">
                    <span className="text-amber-700 font-bold tracking-widest text-sm">— NUMEROLOGY REPORT —</span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-purple-800 mb-1">Rreenaa Agrawal</h1>
                        <p className="text-amber-700 font-semibold text-lg">Nirrvana Citrin</p>
                        <div className="mt-2 space-y-0.5">
                            <p className="text-sm text-gray-600">Numerologist | Reiki Grandmaster</p>
                            <p className="text-sm text-gray-600">Tarot Card Reader | Life Coach</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-amber-200">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Tel:</span> 9630533396
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Email:</span> puppy.agrawal@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 ml-6">
                        <div className="w-36 h-36 flex items-center justify-center">
                            <img src={NirrvanaCitrinLogo} alt="Nirrvana Citrin" className="w-full h-full object-contain drop-shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Title */}
            <div className="text-center mb-8">
                <div className="inline-block">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Analysis and Recommendation
                    </h2>
                    <p className="text-lg text-purple-700 font-semibold">
                        for {data.clientName || '[Client Name]'}
                    </p>
                    <div className="mt-2 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                </div>
            </div>

            {/* Summary Table */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-sm border border-amber-200">
                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="border-b border-amber-200">
                            <td className="bg-gradient-to-r from-amber-100 to-amber-50 font-semibold p-3 w-1/3 text-amber-800">Date of Birth</td>
                            <td className="p-3 bg-white">{data.birthDate ? new Date(data.birthDate).toLocaleDateString('en-GB') : ''}</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                            <td className="bg-gradient-to-r from-amber-100 to-amber-50 font-semibold p-3 text-amber-800">Lucky Colours</td>
                            <td className="p-3 bg-white">{data.luckyColors}</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                            <td className="bg-gradient-to-r from-amber-100 to-amber-50 font-semibold p-3 text-amber-800">Lucky Numbers</td>
                            <td className="p-3 bg-white">{data.luckyNumbers}</td>
                        </tr>
                        <tr className="border-b border-amber-200">
                            <td className="bg-gradient-to-r from-amber-100 to-amber-50 font-semibold p-3 text-amber-800">Ruling Planet</td>
                            <td className="p-3 bg-white">{data.rulingPlanet}</td>
                        </tr>
                        <tr>
                            <td className="bg-gradient-to-r from-amber-100 to-amber-50 font-semibold p-3 text-amber-800">Recommended Crystals</td>
                            <td className="p-3 bg-white">{data.recommendedCrystals}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Note */}
            <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <p className="text-sm text-gray-700">
                    <strong>Note:</strong> The spelling suggestion has been made by the profound School of Numerology that is <em className="text-purple-700">Chaldean Numerology</em>.
                </p>
            </div>

            {/* Core Numbers Comparison Table */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-sm border border-purple-200">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                            <th className="p-3 text-left font-semibold">Name / Core Numbers</th>
                            <th className="p-3 text-center font-semibold">BD</th>
                            <th className="p-3 text-center font-semibold">Life Path</th>
                            <th className="p-3 text-center font-semibold">First Name</th>
                            <th className="p-3 text-center font-semibold">Expression</th>
                            <th className="p-3 text-center font-semibold">Soul Urge</th>
                            <th className="p-3 text-center font-semibold">Secret Self</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-amber-50 border-b border-purple-100">
                            <td className="p-3 font-semibold text-amber-800">
                                <span className="text-xs text-amber-600 block">Birth Core</span>
                                {data.oldNameFull || 'Old Name'}
                            </td>
                            <td className="p-3 text-center font-bold text-purple-700">{data.oldBD}</td>
                            <td className="p-3 text-center font-bold text-purple-700">{data.oldLP}</td>
                            <td className="p-3 text-center"><span className="text-gray-500">{data.oldFirstNameTotal}</span> → <span className="font-bold text-purple-700">{data.oldFirstName}</span></td>
                            <td className="p-3 text-center"><span className="text-gray-500">{data.oldExpressionTotal}</span> → <span className="font-bold text-purple-700">{data.oldExpression}</span></td>
                            <td className="p-3 text-center font-bold text-purple-700">{data.oldSoulUrge}</td>
                            <td className="p-3 text-center font-bold text-purple-700">{data.oldSecretSelf}</td>
                        </tr>
                        <tr className="bg-green-50">
                            <td className="p-3 font-semibold text-green-800">
                                <span className="text-xs text-green-600 block">Suggested Core</span>
                                {data.newNameFull || 'New Name'}
                            </td>
                            <td className="p-3 text-center font-bold text-green-700">{data.newBD}</td>
                            <td className="p-3 text-center font-bold text-green-700">{data.newLP}</td>
                            <td className="p-3 text-center"><span className="text-gray-500">{data.newFirstNameTotal}</span> → <span className="font-bold text-green-700">{data.newFirstName}</span></td>
                            <td className="p-3 text-center"><span className="text-gray-500">{data.newExpressionTotal}</span> → <span className="font-bold text-green-700">{data.newExpression}</span></td>
                            <td className="p-3 text-center font-bold text-green-700">{data.newSoulUrge}</td>
                            <td className="p-3 text-center font-bold text-green-700">{data.newSecretSelf}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* New First Name Section */}
            {data.newFirstName && (
                <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm">
                    <h3 className="font-bold text-lg text-green-800 mb-2">
                        First Name Analysis: {data.newNameFull?.split(' ')[0]} = {data.newFirstNameTotal} = {data.newFirstName}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full mb-3">
                        Rating: {data.newFirstNameRating}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{data.newFirstNameReading}</p>
                </div>
            )}

            {/* New Full Name Section */}
            {data.newExpression && (
                <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
                    <h3 className="font-bold text-lg text-blue-800 mb-2">
                        Full Name Analysis: {data.newNameFull} = {data.newExpressionTotal} = {data.newExpression}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-3">
                        Rating: {data.newFullNameRating}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{data.newFullNameReading}</p>
                </div>
            )}

            {/* Behavioral Changes */}
            <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg text-purple-800 mb-4">Expected Benefits After Six Months of Practice</h3>
                <ul className="space-y-2 text-gray-700">
                    {BEHAVIORAL_CHANGES.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Writing Instructions */}
            <div className="mb-6 p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg text-amber-800 mb-4">Instructions for Writing Your New Name</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Pen Color</p>
                        <p className="text-lg font-bold text-amber-800 mt-1">{data.writingColor}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Frequency</p>
                        <p className="text-lg font-bold text-amber-800 mt-1">{data.writingTimes}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Duration</p>
                        <p className="text-lg font-bold text-amber-800 mt-1">{data.writingDuration}</p>
                    </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed bg-white p-3 rounded-lg border border-amber-100">{data.writingMethod}</p>
            </div>

            {/* Practitioner Notes */}
            {data.practitionerNotes && (
                <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Additional Notes from Practitioner</h3>
                    <p className="text-gray-700 leading-relaxed">{data.practitionerNotes}</p>
                </div>
            )}

            {/* Disclaimer */}
            <div className="mt-10 pt-6 border-t-2 border-gray-200">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-gray-600 text-sm mb-2">Disclaimer</h3>
                    <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">{DISCLAIMER}</p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <div className="inline-block">
                    <p className="text-lg font-semibold text-purple-700 mb-1 italic">With Love and Light</p>
                    <p className="text-amber-700 font-bold">Rreenaa Agrawal</p>
                    <p className="text-sm text-gray-600">Nirrvana Citrin</p>
                    <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default ReportEditor;
