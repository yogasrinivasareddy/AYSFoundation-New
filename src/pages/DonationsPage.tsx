import React, { useState } from 'react';
import { Heart, ShieldCheck, Check, Copy, ArrowRight, Download, FileText, CheckCircle2 } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

interface DonationsPageProps {
  data: FoundationData;
  selectedProjectId?: string | null;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({
  data,
  selectedProjectId,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(108);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [targetProject, setTargetProject] = useState<string>(selectedProjectId || 'all');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [panTaxId, setPanTaxId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const getImpactDescription = (amt: number) => {
    if (amt >= 1000) {
      return 'Sponsors a full year of rural school yoga & daily morning nutrition for 110 children, or completes the digitization and conservation of 5 ancient palm leaf manuscripts.';
    } else if (amt >= 500) {
      return 'Provides 6 months of daily breakfast and yoga props for an entire primary school class of 45 village children.';
    } else if (amt >= 250) {
      return 'Funds 3 free community elder health & Ayurvedic joint care clinics, supporting 120 rural seniors.';
    } else if (amt >= 108) {
      return 'Sacred offering: Nurtures 1 month of morning nutrition & yoga instruction for 12 rural school children.';
    } else if (amt >= 50) {
      return 'Provides 10 durable organic cotton yoga mats and pranayama guidebooks for school students.';
    } else {
      return 'Supplies nutritious fresh fruit breakfasts for 25 children after their morning Surya Namaskar practice.';
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(data.donations.bankDetails.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorName && donorEmail && finalAmount > 0) {
      setReceiptGenerated(true);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 py-8">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Dāna (Sacred Generosity) & Transparency
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-medium tracking-tight text-balance">
          {data.donations.headline}
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {data.donations.subheadline}
        </p>
        <div className="w-16 h-0.5 bg-amber-800 mx-auto mt-6" />
      </section>

      {/* Main Donation Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Giving Calculator & Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                Choose Your Contribution
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Select an auspicious sacred tier or enter a custom amount.
              </p>
            </div>

            {/* Target Project Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                Allocate Towards
              </label>
              <select
                value={targetProject}
                onChange={(e) => setTargetProject(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-amber-800"
              >
                <option value="all">Where Most Needed (General Seva Fund)</option>
                {data.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Selection Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Select Amount (USD / INR Equivalent)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {data.donations.presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-2.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      !isCustom && selectedAmount === amt
                        ? 'bg-amber-900 text-white shadow'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount toggle */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`text-xs font-medium cursor-pointer ${
                    isCustom ? 'text-amber-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Or specify a custom amount:
                </button>
                {isCustom && (
                  <div className="mt-2 flex items-center">
                    <span className="px-3 py-2 bg-stone-100 border border-r-0 border-stone-300 rounded-l-md text-stone-600 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-stone-300 rounded-r-md text-sm focus:outline-none focus:border-amber-800"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Impact Callout */}
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold block mb-0.5">Direct Impact:</span>
              {getImpactDescription(finalAmount)}
            </div>

            {/* Donor Information for Receipt / Pledge */}
            <form onSubmit={handleGenerateReceipt} className="space-y-4 pt-4 border-t border-stone-200">
              <h4 className="font-serif text-lg font-medium text-stone-900">
                Donor Information & Tax Receipt
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Sundar Ramanathan"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email for Receipt</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Tax Identifier / PAN Number (Optional, for 80G / 501c3 Receipt)
                </label>
                <input
                  type="text"
                  value={panTaxId}
                  onChange={(e) => setPanTaxId(e.target.value)}
                  placeholder="e.g. ABCDE1234F"
                  className="w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Generate Official Seva Pledge & Tax Receipt (${finalAmount})</span>
              </button>
            </form>

            {/* Generated Receipt Display */}
            {receiptGenerated && (
              <div className="p-6 bg-stone-50 border-2 border-dashed border-amber-800/40 rounded-xl space-y-4 animate-in fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                      Official Tax Exemption Acknowledgment
                    </span>
                    <h5 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                      AYS YOGA CHARITABLE TRUST
                    </h5>
                    <p className="text-xs text-stone-500">
                      Registration No: TRUST/MYS/2014/892 · Section 80G Approved
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-stone-200">
                  <div>
                    <span className="text-stone-500 block">Donor Name:</span>
                    <span className="font-semibold text-stone-900">{donorName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Pledge Amount:</span>
                    <span className="font-semibold text-amber-900 text-sm">${finalAmount} USD</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Allocation:</span>
                    <span className="text-stone-800">
                      {targetProject === 'all' ? 'General Seva & Child Nutrition' : targetProject}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Date of Pledge:</span>
                    <span className="text-stone-800">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-600">
                  <p className="italic">
                    May this pure offering bear fruits of peace and liberation for all beings.
                  </p>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded text-xs hover:bg-stone-800 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Direct Bank Transfer, UPI & Financial Transparency */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Bank / UPI Details */}
            <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-xl shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Direct Wire & UPI Transfer
              </span>
              <h3 className="font-serif text-2xl text-stone-100 font-medium">
                Direct Trust Banking Channels
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                For international wires, direct RTGS/NEFT transfers within India, or instant QR/UPI contributions:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 bg-stone-800/90 rounded border border-stone-700">
                  <span className="text-stone-400 block text-[11px]">Beneficiary Name:</span>
                  <span className="font-medium text-stone-100 text-sm">{data.donations.bankDetails.accountName}</span>
                </div>

                <div className="p-3 bg-stone-800/90 rounded border border-stone-700">
                  <span className="text-stone-400 block text-[11px]">Bank & Branch:</span>
                  <span className="font-medium text-stone-100">{data.donations.bankDetails.bankName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-stone-800/90 rounded border border-stone-700">
                    <span className="text-stone-400 block text-[11px]">Account Number:</span>
                    <span className="font-mono font-medium text-stone-100">{data.donations.bankDetails.accountNumber}</span>
                  </div>
                  <div className="p-3 bg-stone-800/90 rounded border border-stone-700">
                    <span className="text-stone-400 block text-[11px]">IFSC / SWIFT:</span>
                    <span className="font-mono font-medium text-stone-100">{data.donations.bankDetails.ifscSwiftCode}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-800/90 rounded border border-stone-700 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[11px]">UPI Virtual Payment Address:</span>
                    <span className="font-mono font-medium text-amber-300">{data.donations.bankDetails.upiId}</span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="p-2 bg-stone-700 hover:bg-amber-800 text-stone-100 rounded transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Financial Transparency Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-serif text-xl font-medium text-stone-900">
                How Your Donation is Spent
              </h4>
              <p className="text-xs text-stone-500">
                We believe sacred funds must be stewarded with meticulous ethical purity.
              </p>

              <div className="space-y-4 pt-2">
                {data.donations.impactBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-800">{item.label}</span>
                      <span className="font-mono text-amber-900 font-bold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-800 h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-stone-500">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Audited annually by Chartered Accountants & filed with Ministry of Corporate Affairs.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
