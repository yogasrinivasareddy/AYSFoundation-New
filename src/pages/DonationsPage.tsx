import React, { useState } from 'react';
import { Heart, ShieldCheck, Check, Copy, Download, MessageCircle, CheckCircle2, QrCode, Smartphone, Building, ExternalLink, ArrowRight, Hash } from 'lucide-react';
import { FoundationData } from '../data/foundationContent';

const DONATION_FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnppnjqe';
const DONATIONS_STORAGE_KEY = 'ays_donations_registry';

interface DonationsPageProps {
  data: FoundationData;
  selectedProjectId?: string | null;
}

export interface SavedDonation {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panTaxId: string;
  transactionRef: string;
  amount: number;
  currency: string;
  targetProject: string;
  timestamp: string;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({
  data,
  selectedProjectId,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState(false);
  const [targetProject, setTargetProject] = useState<string>(selectedProjectId || 'all');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panTaxId, setPanTaxId] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<SavedDonation | null>(null);

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  // Beneficiary details requested by user (customizable in editor or defaults)
  const beneficiaryName = data.bankDetails?.accountName || "Ashtanga Yoga Samarpana Charitable Trust";
  const bankName = data.bankDetails?.bankName || "HDFC Bank (Pavagada Branch)";
  const accountNumber = data.bankDetails?.accountNumber || "50200117951130";
  const ifscCode = data.bankDetails?.ifscCode || "HDFC0008217";
  const upiId = data.bankDetails?.upiId || "9742734499@hdfc";
  const section80GReg = data.bankDetails?.section80GReg || data.general.section80GReg || "AALTA9453AF20261";
  const foundationPan = data.bankDetails?.panNumber || data.general.panNumber || "AALTA9453A";
  const donationFormEndpoint = data.bankDetails?.donationFormspreeEndpoint || DONATION_FORMSPREE_ENDPOINT;

  // Standard UPI URI format for direct payments with pre-filled amount
  const dynamicUpiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(beneficiaryName)}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent('Seva Contribution')}`;
  const dynamicQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(dynamicUpiUri)}`;

  const getImpactDescription = (amt: number) => {
    if (amt >= 10000) {
      return 'Provides 1 month of wholesome daily morning nutrition & classical yoga education for 45 rural school children, or funds 3 complete village elder healthcare camps.';
    } else if (amt >= 5000) {
      return 'Nurtures 22 village children with fresh organic morning porridge, fruits, and yoga mats for an entire month.';
    } else if (amt >= 2500) {
      return 'Covers essential Ayurvedic joint oils, mobility props, and health screenings for a complete rural elder community clinic.';
    } else if (amt >= 1000) {
      return 'Supports 5 rural primary school students with daily nutrition, yoga instruction, and study materials for a full month.';
    } else if (amt >= 500) {
      return 'Supplies durable organic cotton yoga mats and morning fresh fruits for 15 village children.';
    } else {
      return 'Every contribution helps provide nutritious breakfasts for children after their morning Surya Namaskar practice.';
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleGenerateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !donorPhone || finalAmount <= 0) return;

    setIsSubmitting(true);

    const receiptNo = `AYS-80G-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const targetProjectTitle = targetProject === 'all'
      ? 'Where Most Needed (General Seva Fund)'
      : data.projects.find((p) => p.id === targetProject)?.title || targetProject;

    const donationRecord: SavedDonation = {
      id: `don-${Date.now()}`,
      receiptNumber: receiptNo,
      donorName,
      donorEmail,
      donorPhone,
      panTaxId: panTaxId || 'N/A',
      transactionRef: transactionRef || 'Pending / Offline Transfer',
      amount: finalAmount,
      currency: 'INR',
      targetProject: targetProjectTitle,
      timestamp,
    };

    try {
      await fetch(donationFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          receiptNumber: receiptNo,
          donorName,
          email: donorEmail,
          mobileNumber: donorPhone,
          phone: donorPhone,
          amountINR: `₹${finalAmount.toLocaleString('en-IN')}`,
          amountNumber: finalAmount,
          currency: 'INR',
          transactionReferenceNumber: transactionRef || 'Direct Transfer / Cash / Cheque',
          targetProject: targetProjectTitle,
          panTaxId: panTaxId || 'N/A',
          foundationSection80GReg: section80GReg,
          foundationPAN: foundationPan,
          beneficiaryName,
          bankName,
          accountNumber,
          ifscCode,
          upiId,
          pledgedAt: timestamp,
        }),
      });
    } catch (err) {
      console.warn('Formspree donation registration notice:', err);
    } finally {
      // Save locally to donations registry
      try {
        const existing = JSON.parse(localStorage.getItem(DONATIONS_STORAGE_KEY) || '[]');
        localStorage.setItem(DONATIONS_STORAGE_KEY, JSON.stringify([donationRecord, ...existing]));
      } catch {
        // ignore
      }

      setCurrentReceipt(donationRecord);
      setReceiptGenerated(true);
      setIsSubmitting(false);
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Giving Selection & Donor Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-stone-900 font-medium">
                1. Select Contribution Amount
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Choose an auspicious tier in Indian Rupees (₹) or enter a custom amount.
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

            {/* Amount Selection Buttons (INR) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Select Amount (Indian Rupees — ₹ INR)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[500, 1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-3 px-2 text-sm font-semibold rounded-md transition-all cursor-pointer text-center ${
                      !isCustom && selectedAmount === amt
                        ? 'bg-amber-900 text-white shadow-sm ring-2 ring-amber-800/30'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
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
                    <span className="px-3.5 py-2.5 bg-stone-100 border border-r-0 border-stone-300 rounded-l-md text-stone-700 font-semibold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 15000"
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-r-md text-sm focus:outline-none focus:border-amber-800"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Impact Callout in INR */}
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold block mb-0.5">Direct Seva Impact:</span>
              {getImpactDescription(finalAmount)}
            </div>

            {/* Donor Information & Transaction Ref Form */}
            <form onSubmit={handleGenerateReceipt} className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xl font-medium text-stone-900">
                    2. Donor Details & Payment Reference
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Scan the QR code on the right, make the payment, and provide your details to receive your 80G tax receipt.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Legal Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Sundar Ramanathan"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Mobile Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="e.g. 9742734499"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email for Receipt <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    PAN Number (Optional, for 80G Tax Exemption)
                  </label>
                  <input
                    type="text"
                    value={panTaxId}
                    onChange={(e) => setPanTaxId(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-amber-800 font-mono uppercase"
                  />
                </div>
              </div>

              {/* Transaction ID / UTR Input */}
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-lg space-y-1.5">
                <label className="block text-xs font-semibold text-stone-800">
                  UPI / Bank Transaction ID / UTR Reference No
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. 12-digit UTR No / UPI Ref No (e.g. 429182940192)"
                    className="w-full pl-9 pr-3.5 py-2.5 border border-stone-300 rounded-md text-sm bg-white focus:outline-none focus:border-amber-800 font-mono"
                  />
                </div>
                <p className="text-[11px] text-stone-500">
                  Found in your GPay / PhonePe / Paytm / Bank SMS after completing payment.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-amber-900 hover:bg-amber-950 disabled:opacity-60 text-white font-medium text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting & Generating 80G Receipt...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Generate Official 80G Receipt (₹{finalAmount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </form>

            {/* Generated Official Tax Receipt Display */}
            {receiptGenerated && currentReceipt && (
              <div className="p-6 bg-[#FAF7F2] border-2 border-dashed border-amber-800/50 rounded-xl space-y-4 animate-in fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-amber-800 font-bold">
                      Official 80G Tax Exemption Receipt
                    </span>
                    <h5 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                      {beneficiaryName}
                    </h5>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Receipt No: <span className="font-mono font-bold text-stone-800">{currentReceipt.receiptNumber}</span> · Section 80G Reg: <span className="font-mono font-bold text-amber-900">{section80GReg}</span> · AYS PAN: <span className="font-mono font-bold text-amber-900">{foundationPan}</span>
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-3 border-t border-stone-200">
                  <div>
                    <span className="text-stone-500 block">Donor Name:</span>
                    <span className="font-semibold text-stone-900">{currentReceipt.donorName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Mobile Number:</span>
                    <span className="font-semibold text-stone-900">{currentReceipt.donorPhone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Pledge Amount:</span>
                    <span className="font-semibold text-amber-900 text-base">₹{currentReceipt.amount.toLocaleString('en-IN')} INR</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Transaction Ref / UTR:</span>
                    <span className="font-mono font-semibold text-stone-900">{currentReceipt.transactionRef}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">AYS Foundation PAN:</span>
                    <span className="font-mono font-semibold text-stone-900">{foundationPan}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Section 80G Reg:</span>
                    <span className="font-mono font-semibold text-stone-900">{section80GReg}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Donor PAN:</span>
                    <span className="font-mono text-stone-800 font-medium">{currentReceipt.panTaxId || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Date of Pledge:</span>
                    <span className="text-stone-800">{currentReceipt.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Tax Exemption:</span>
                    <span className="text-emerald-700 font-semibold">100% Deductible (80G)</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-600 border-t border-stone-200/80">
                  <span className="font-medium text-stone-800">Target Project Allocation: </span>
                  <span>{currentReceipt.targetProject}</span>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-stone-200">
                  <a
                    href={`https://wa.me/919742734499?text=${encodeURIComponent(
                      `Namaste ${beneficiaryName},\n\nI have completed my donation:\n• Receipt No: ${currentReceipt.receiptNumber}\n• Donor Name: ${currentReceipt.donorName}\n• Mobile: ${currentReceipt.donorPhone}\n• Amount: ₹${currentReceipt.amount.toLocaleString('en-IN')} INR\n• UTR/Transaction Ref: ${currentReceipt.transactionRef}\n• Allocation: ${currentReceipt.targetProject}\n• Section 80G Reg: ${section80GReg}\n• AYS PAN: ${foundationPan}\n\nKindly confirm receipt.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Confirm on WhatsApp (+91 97427 34499)</span>
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print 80G Receipt</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Direct Wire & UPI Transfer + QR Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-xl shadow-lg space-y-6 border border-stone-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                    Direct Wire & UPI Transfer
                  </span>
                  <h3 className="font-serif text-2xl text-stone-100 font-medium mt-0.5">
                    Scan & Pay with Any UPI App
                  </h3>
                </div>
                <Smartphone className="w-6 h-6 text-amber-400" />
              </div>

              {/* QR Code Presentation Box (Pre-filled Amount QR Only) */}
              <div className="bg-white p-5 rounded-xl text-center space-y-3 shadow-inner">
                {/* Pre-filled QR Header Badge */}
                <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-900 text-stone-50 rounded-lg text-xs font-semibold shadow-sm w-full">
                  <QrCode className="w-4 h-4 text-amber-300" />
                  <span>Pre-filled Amount QR (₹{finalAmount.toLocaleString('en-IN')})</span>
                </div>

                {/* QR Image Container */}
                <div className="relative aspect-square max-w-[240px] mx-auto bg-stone-50 rounded-lg border border-stone-200 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={dynamicQrCodeUrl}
                    alt={`Pre-filled UPI QR Code for ₹${finalAmount} to ${beneficiaryName}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-stone-900">
                    {beneficiaryName}
                  </p>
                  <p className="text-xs font-mono text-amber-900 font-semibold">
                    UPI: {upiId}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Pre-filled for ₹{finalAmount.toLocaleString('en-IN')}. Scan with Google Pay, PhonePe, Paytm, BHIM or any UPI app.
                  </p>
                </div>

                {/* Mobile Direct UPI Intent Pay button */}
                <div className="pt-1">
                  <a
                    href={dynamicUpiUri}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded transition-colors shadow-sm"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pay ₹{finalAmount.toLocaleString('en-IN')} via UPI App on Mobile</span>
                    <ExternalLink className="w-3 h-3 text-amber-300" />
                  </a>
                </div>
              </div>

              {/* Complete Bank Wire Details */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-stone-800/90 rounded border border-stone-700 space-y-0.5">
                  <span className="text-stone-400 block text-[11px]">Beneficiary Name:</span>
                  <span className="font-semibold text-stone-100 text-sm block">{beneficiaryName}</span>
                </div>

                <div className="p-3 bg-stone-800/90 rounded border border-stone-700 space-y-0.5">
                  <span className="text-stone-400 block text-[11px]">Bank & Branch:</span>
                  <span className="font-medium text-stone-100 block">{bankName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-stone-800/90 rounded border border-stone-700 flex flex-col justify-between">
                    <div>
                      <span className="text-stone-400 block text-[11px]">Account Number:</span>
                      <span className="font-mono font-medium text-stone-100 block text-xs break-all">{accountNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="mt-2 text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAccount ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAccount ? 'Copied' : 'Copy A/C'}</span>
                    </button>
                  </div>

                  <div className="p-3 bg-stone-800/90 rounded border border-stone-700 flex flex-col justify-between">
                    <div>
                      <span className="text-stone-400 block text-[11px]">IFSC Code:</span>
                      <span className="font-mono font-medium text-stone-100 block text-xs">{ifscCode}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-2">HDFC Bank RTGS/NEFT</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-800/90 rounded border border-stone-700 flex items-center justify-between">
                  <div>
                    <span className="text-stone-400 block text-[11px]">UPI ID:</span>
                    <span className="font-mono font-medium text-amber-300 text-sm">{upiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-2 bg-stone-700 hover:bg-amber-800 text-stone-100 rounded transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 80G Tax Exemption Note */}
              <div className="p-3.5 bg-stone-800/50 rounded-lg border border-stone-700/80 flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-200 block mb-0.5">
                    100% Tax Exemption under Section 80G
                  </span>
                  <span>
                    Section 80G Reg: <strong className="text-amber-300 font-mono">{section80GReg}</strong> · AYS Foundation PAN: <strong className="text-amber-300 font-mono">{foundationPan}</strong>. All contributions to {beneficiaryName} are eligible for tax deduction under Section 80G of the Income Tax Act.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
