import { useState, useEffect } from 'react';

const EmiCalculator = () => {
  const [carPrice, setCarPrice] = useState('');
  const [downPayment, setDownPayment] = useState(200000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState('');
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [carPrice, downPayment, loanTerm, interestRate]);

  const calculateEMI = () => {
    if (!carPrice || !interestRate) return;

    const principal = Number(carPrice) - downPayment;
    const rate = Number(interestRate) / 12 / 100; // Monthly interest rate
    const time = loanTerm;

    if (rate === 0) return;

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const total = emi * time;

    setMonthlyEmi(Math.round(emi));
    setTotalPayment(Math.round(total));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold font-['Inter'] leading-9 mb-8">
            EMI Calculator
          </h1>

          <div className="space-y-8">
            {/* Car Price Input */}
            <div>
              <label className="block text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                Car Price (₹)
              </label>
              <input
                type="number"
                value={carPrice}
                onChange={(e) => setCarPrice(e.target.value)}
                className="w-full h-12 rounded-lg border border-neutral-200 px-4 text-black text-base font-normal font-['Inter'] leading-normal focus:outline-none focus:border-indigo-500"
                placeholder="Enter car price"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                Down Payment: ₹{formatCurrency(downPayment)}
              </label>
              <input
                type="range"
                min="0"
                max={Number(carPrice) || 1000000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                Loan Term (Months): {loanTerm}
              </label>
              <input
                type="range"
                min="12"
                max="84"
                step="12"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Interest Rate Input */}
            <div>
              <label className="block text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full h-12 rounded-lg border border-neutral-200 px-4 text-black text-base font-normal font-['Inter'] leading-normal focus:outline-none focus:border-indigo-500"
                placeholder="Enter interest rate"
              />
            </div>

            {/* Results */}
            <div className="bg-neutral-100 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                    Monthly EMI
                  </p>
                  <p className="text-indigo-700 text-2xl font-bold font-['Inter'] leading-9">
                    {formatCurrency(monthlyEmi)}
                  </p>
                </div>
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-2">
                    Total Payment
                  </p>
                  <p className="text-black text-2xl font-bold font-['Inter'] leading-9">
                    {formatCurrency(totalPayment)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator; 