import React from 'react';
import { CreditCard, Baby, User, Activity, Calendar, FileText } from 'lucide-react';

const INFO_CARDS = [
  {
    title: "SRD Grant (R370)",
    description: "Social Relief of Distress Grant for unemployed citizens.",
    icon: <CreditCard className="text-blue-500" size={24} />,
    color: "bg-blue-50"
  },
  {
    title: "Child Support",
    description: "Grant for primary caregivers of children under 18.",
    icon: <Baby className="text-pink-500" size={24} />,
    color: "bg-pink-50"
  },
  {
    title: "Old Age Pension",
    description: "For citizens 60 years or older.",
    icon: <User className="text-purple-500" size={24} />,
    color: "bg-purple-50"
  },
  {
    title: "Disability Grant",
    description: "For those unable to work due to disability.",
    icon: <Activity className="text-orange-500" size={24} />,
    color: "bg-orange-50"
  }
];

export const InfoGuide: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Grant Guide</h1>
        <p className="text-gray-500 text-sm mt-1">Information on all SASSA grants.</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Payment Dates */}
        <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-yellow-400" />
            <h2 className="font-bold text-lg">Next Payment Dates</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Older Persons</span>
              <span className="font-bold text-yellow-400">02 Nov 2024</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-300">Disability</span>
              <span className="font-bold text-yellow-400">03 Nov 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Children's Grants</span>
              <span className="font-bold text-yellow-400">04 Nov 2024</span>
            </div>
          </div>
        </div>

        {/* Grant Types */}
        <div className="grid grid-cols-1 gap-4">
          {INFO_CARDS.map((card, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{card.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                <button className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-1">
                  Read more <FileText size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Documents Section */}
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h3 className="font-bold text-green-800 mb-2">Documents Needed</h3>
          <ul className="list-disc list-inside text-sm text-green-700 space-y-2">
            <li>South African ID Document (Green book or Smart Card)</li>
            <li>Proof of residence (not older than 3 months)</li>
            <li>Proof of income or unemployment affidavit</li>
            <li>Bank statements (3 months certified)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};