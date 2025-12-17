import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { StatusResult } from '../types';

export const StatusCheck: React.FC = () => {
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<StatusResult[] | null>(null);

  const handleCheck = () => {
    if (idNumber.length < 5 || phoneNumber.length < 5) return;
    
    setIsChecking(true);
    // Mock API delay and response
    setTimeout(() => {
      setIsChecking(false);
      // Generate some mock results based on input
      setResult([
        { month: 'November 2024', status: 'Approved', payDate: '24 Nov 2024' },
        { month: 'October 2024', status: 'Approved', payDate: '25 Oct 2024' },
        { month: 'September 2024', status: 'Declined', reason: 'alternative_income_source_identified' },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-green-600 text-white p-6 pb-12 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">Check Status</h1>
        <p className="text-green-100">Enter your details to check your SRD R370 status.</p>
      </div>

      <div className="px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">South African ID Number</label>
            <input
              type="number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="Ex: 9001015000080"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
              placeholder="Ex: 071 234 5678"
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={isChecking}
            className="w-full bg-black text-white font-semibold rounded-xl py-3.5 mt-2 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {isChecking ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search size={20} />
                Check Now
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="px-4 mt-6 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg px-2">Results</h3>
          {result.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-full ${
                item.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                item.status === 'Declined' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {item.status === 'Approved' ? <CheckCircle size={20} /> : 
                 item.status === 'Declined' ? <AlertCircle size={20} /> : <Clock size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">{item.month}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    item.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                {item.payDate && (
                  <p className="text-sm text-gray-500 mt-1">Pay Date: <span className="font-medium text-gray-700">{item.payDate}</span></p>
                )}
                {item.reason && (
                  <p className="text-sm text-red-500 mt-1">{item.reason.replace(/_/g, ' ')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!result && !isChecking && (
        <div className="px-8 mt-10 text-center text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-sm">Enter your ID and Phone number above to see your latest grant status.</p>
        </div>
      )}
    </div>
  );
};