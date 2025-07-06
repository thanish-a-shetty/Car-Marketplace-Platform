"use client";

import { useState, useEffect } from 'react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100; // Monthly interest rate
    const time = loanTerm * 12; // Total number of months

    const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emiAmount * time;
    const totalInterest = totalAmount - principal;

    setEmi(Math.round(emiAmount));
    setTotalAmount(Math.round(totalAmount));
    setTotalInterest(Math.round(totalInterest));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-neutral-900 relative">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/cars-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for better content visibility */}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Car Loan EMI Calculator
          </h1>
          <p className="text-lg text-gray-300">
            Calculate your monthly car loan payments and plan your budget
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Loan Amount (₹)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <div className="mt-2 flex justify-between text-sm text-gray-400">
                    <span>₹1L</span>
                    <span>₹50L</span>
                  </div>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="mt-2 block w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <div className="mt-2 flex justify-between text-sm text-gray-400">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="mt-2 block w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Loan Term (Years)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <div className="mt-2 flex justify-between text-sm text-gray-400">
                    <span>1 Year</span>
                    <span>8 Years</span>
                  </div>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="mt-2 block w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Loan Summary
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-neutral-700 rounded-lg">
                <span className="text-gray-300">Monthly EMI</span>
                <span className="text-2xl font-bold text-orange-500">
                  {formatCurrency(emi)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-neutral-700 rounded-lg">
                <span className="text-gray-300">Total Interest</span>
                <span className="text-2xl font-bold text-orange-500">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-neutral-700 rounded-lg">
                <span className="text-gray-300">Total Amount</span>
                <span className="text-2xl font-bold text-orange-500">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Monthly Payment Breakdown
              </h3>
              <div className="h-4 bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                  style={{
                    width: `${(loanAmount / totalAmount) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-400">
                <span>Principal: {formatCurrency(loanAmount)}</span>
                <span>Interest: {formatCurrency(totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-neutral-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Down Payment</h3>
              <p className="text-gray-300">
                A minimum down payment of 20% is recommended to get better interest rates.
              </p>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Processing Fee</h3>
              <p className="text-gray-300">
                Most banks charge a processing fee of 0.5% to 1% of the loan amount.
              </p>
            </div>
            <div className="p-4 bg-neutral-700 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Pre-closure</h3>
              <p className="text-gray-300">
                You can pre-close your loan after 12 EMIs with minimal charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 