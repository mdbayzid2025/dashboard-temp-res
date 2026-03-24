import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const initialFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I register as a host on the platform?",
    answer:
      "To register as a host, navigate to the Hosts section in the dashboard and click 'Add Host'. Fill in your personal details, vehicle information, and complete identity verification. Once approved, your listing will be live within 24 hours.",
    category: "Hosts",
  },
  {
    id: 2,
    question: "How can I cancel or modify a booking?",
    answer:
      "You can cancel or modify a booking from the Bookings section. Select the booking you wish to change, click the action menu, and choose 'Edit' or 'Cancel'. Cancellations made 24 hours before pickup are fully refunded.",
    category: "Bookings",
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, Amex), mobile banking (bKash, Nagad), and bank transfers. All transactions are secured with industry-standard encryption.",
    category: "Payments",
  },
  {
    id: 4,
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page, enter your registered email address, and follow the OTP verification steps. You will be redirected to set a new password.",
    category: "Account",
  },
  {
    id: 5,
    question: "How are vehicles verified before listing?",
    answer:
      "All vehicles undergo a thorough verification process including document checks (registration, insurance), physical inspection, and photo verification. Only approved vehicles are listed on the platform.",
    category: "Vehicles",
  },
];

const CATEGORIES = ["All", "Account", "Bookings", "Hosts", "Payments", "Vehicles"];

const emptyForm = { question: "", answer: "", category: "Account" };

export default function FAQ() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = faqs.filter((faq) => {
    const matchCat = activeCategory === "All" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAddModal = () => {
    setEditingFaq(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setForm({ question: faq.question, answer: faq.answer, category: faq.category });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingFaq(null);
    setForm(emptyForm);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { question?: string; answer?: string } = {};
    if (!form.question.trim()) newErrors.question = "Question is required.";
    if (!form.answer.trim()) newErrors.answer = "Answer is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaq.id ? { ...f, ...form } : f
        )
      );
    } else {
      const newFaq: FAQ = {
        id: Date.now(),
        ...form,
      };
      setFaqs((prev) => [newFaq, ...prev]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    setDeleteId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const categoryColors: Record<string, string> = {
    Account: isDark ? "bg-blue-500/15 text-blue-400" : "bg-blue-50 text-blue-600",
    Bookings: isDark ? "bg-violet-500/15 text-violet-400" : "bg-violet-50 text-violet-600",
    Hosts: isDark ? "bg-amber-500/15 text-amber-400" : "bg-amber-50 text-amber-600",
    Payments: isDark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-50 text-emerald-600",
    Vehicles: isDark ? "bg-rose-500/15 text-rose-400" : "bg-rose-50 text-rose-600",
  };

  const base = isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const card = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const inputCls = `w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${
    isDark
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
      : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500"
  }`;

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${base}`}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-1 h-8 rounded-full ${isDark ? "bg-indigo-400" : "bg-indigo-600"}`} />
            <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              FAQ Management
            </h1>
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-500/20 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add FAQ
        </button>
      </div>

      {/* ── Search + Filter ── */}
      <div className={`rounded-2xl border p-4 mb-6 flex flex-col sm:flex-row gap-3 ${card}`}>
        {/* Search */}
        <div className="relative flex-1">
          <svg className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputCls} pl-9`}
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FAQ List ── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className={`rounded-2xl border p-12 text-center ${card}`}>
            <svg className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-600" : "text-gray-300"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>No FAQs found</p>
            <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>Try a different search or category</p>
          </div>
        ) : (
          filtered.map((faq, idx) => (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${card} ${
                expandedId === faq.id
                  ? isDark ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10" : "border-indigo-300 shadow-md shadow-indigo-100"
                  : ""
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* Question Row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                {/* Number badge */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDark ? "bg-indigo-500/15 text-indigo-400" : "bg-indigo-50 text-indigo-600"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                      {faq.question}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${categoryColors[faq.category] ?? ""}`}>
                      {faq.category}
                    </span>
                  </div>
                  {expandedId !== faq.id && (
                    <p className={`text-xs mt-0.5 truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {faq.answer}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(faq)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? "hover:bg-gray-700 text-gray-400 hover:text-blue-400" : "hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                    }`}
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => setDeleteId(faq.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? "hover:bg-gray-700 text-gray-400 hover:text-rose-400" : "hover:bg-rose-50 text-gray-400 hover:text-rose-600"
                    }`}
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  {/* Chevron */}
                  <div className={`p-2 transition-transform duration-200 ${expandedId === faq.id ? "rotate-180" : ""}`}>
                    <svg className={`w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Answer */}
              {expandedId === faq.id && (
                <div className={`px-5 pb-5 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                  <div className={`mt-4 flex gap-3`}>
                    <div className={`w-0.5 rounded-full shrink-0 ${isDark ? "bg-indigo-500/40" : "bg-indigo-200"}`} />
                    <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════
          ADD / EDIT MODAL
      ══════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Card */}
          <div className={`relative w-full max-w-lg rounded-2xl border shadow-2xl z-10 transition-colors ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>

            {/* Modal Header */}
            <div className={`flex items-center justify-between px-6 py-5 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDark ? "bg-indigo-500/10" : "bg-indigo-50"}`}>
                  <svg className={`w-5 h-5 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {editingFaq ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    )}
                  </svg>
                </div>
                <div>
                  <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                  </h2>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {editingFaq ? "Update the question and answer" : "Fill in the question and answer below"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Category */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={inputCls}
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Question <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. How do I reset my password?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className={inputCls}
                />
                {errors.question && (
                  <p className="text-xs text-rose-500 mt-1">{errors.question}</p>
                )}
              </div>

              {/* Answer */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Answer <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Write a clear and concise answer..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
                {errors.answer && (
                  <p className="text-xs text-rose-500 mt-1">{errors.answer}</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
              <button
                onClick={closeModal}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm shadow-indigo-500/20"
              >
                {editingFaq ? "Update FAQ" : "Add FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          DELETE CONFIRM MODAL
      ══════════════════════════════════════ */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className={`relative w-full max-w-sm rounded-2xl border shadow-2xl z-10 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <div className="p-6 text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-rose-500/10" : "bg-rose-50"}`}>
                <svg className={`w-7 h-7 ${isDark ? "text-rose-400" : "text-rose-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                Delete FAQ?
              </h3>
              <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                This action cannot be undone. The question and answer will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}