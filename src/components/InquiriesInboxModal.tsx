import React, { useState } from 'react';
import { X, Mail, Phone, MessageCircle, Download, Trash2, CheckCircle, Search, Calendar, User, Tag } from 'lucide-react';

export interface SavedInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Replied';
}

interface InquiriesInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: SavedInquiry[];
  onClearAll: () => void;
  onDeleteInquiry: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const InquiriesInboxModal: React.FC<InquiriesInboxModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onClearAll,
  onDeleteInquiry,
  onToggleStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = inquiries.filter((inq) =>
    inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Topic', 'Message', 'Status'];
    const rows = inquiries.map((inq) => [
      inq.id,
      `"${inq.timestamp}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email.replace(/"/g, '""')}"`,
      `"${inq.phone.replace(/"/g, '""')}"`,
      `"${inq.topic.replace(/"/g, '""')}"`,
      `"${inq.message.replace(/"/g, '""')}"`,
      inq.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ays_yoga_foundation_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-stone-300 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
              <span>Foundation Inquiries Inbox</span>
              <span className="text-xs bg-amber-800 text-stone-100 px-2 py-0.5 rounded-full font-mono">
                {inquiries.length} {inquiries.length === 1 ? 'Record' : 'Records'}
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Submissions received from the website contact and registration form
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded-md text-xs focus:outline-none focus:border-amber-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              disabled={inquiries.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-amber-950 disabled:opacity-40 text-white rounded text-xs font-medium cursor-pointer transition-colors"
              title="Download inquiries as Excel/CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {inquiries.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded text-xs font-medium cursor-pointer transition-colors"
                title="Clear all saved inquiries"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* List of Inquiries */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Mail className="w-10 h-10 mx-auto text-stone-400 opacity-60" />
              <p className="font-serif text-lg text-stone-700">No inquiries found</p>
              <p className="text-xs max-w-sm mx-auto">
                When visitors submit an inquiry on the Contact page, their message will appear here in this inbox and can be exported anytime.
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-lg border transition-all ${
                  item.status === 'New'
                    ? 'bg-white border-amber-800/40 shadow-sm'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-stone-900">
                        {item.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          item.status === 'New'
                            ? 'bg-amber-100 text-amber-900 font-semibold'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-amber-800" />
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </span>
                      {item.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-amber-800" />
                          <a href={`tel:${item.phone}`} className="hover:underline">
                            {item.phone}
                          </a>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-stone-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.timestamp}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleStatus(item.id)}
                      className="px-2.5 py-1 text-[11px] font-medium border border-stone-300 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
                    >
                      Mark as {item.status === 'New' ? 'Replied' : 'New'}
                    </button>
                    <button
                      onClick={() => onDeleteInquiry(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-700 rounded hover:bg-rose-50"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Topic: {item.topic}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed bg-[#FAF7F2] p-3 rounded border border-stone-200/80">
                    {item.message}
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-end gap-2 text-xs">
                  <a
                    href={`mailto:${item.email}?subject=Reply to your inquiry regarding ${encodeURIComponent(item.topic)} - AYS Yoga Foundation&body=Namaste ${encodeURIComponent(item.name)},%0D%0A%0D%0AThank you for reaching out to AYS Yoga Foundation regarding "${encodeURIComponent(item.topic)}"...`}
                    className="flex items-center gap-1 px-3 py-1 bg-stone-900 hover:bg-amber-950 text-white rounded font-medium"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Reply via Email</span>
                  </a>
                  {item.phone && (
                    <a
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(item.name)},%20this%20is%20AYS%20Yoga%20Foundation%20regarding%20your%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Inquiries are securely stored in your local browser registry.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 text-white rounded hover:bg-stone-900 font-medium"
          >
            Close Inbox
          </button>
        </div>
      </div>
    </div>
  );
};
