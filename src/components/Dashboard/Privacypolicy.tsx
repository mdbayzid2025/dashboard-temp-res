import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useTheme } from "../../context/ThemeContext";

const defaultContent = `<h2>Privacy Policy</h2>
<p><strong>Effective Date:</strong> January 1, 2025 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 1, 2025</p>
<p>Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our car rental management platform.</p>

<h3>1. Information We Collect</h3>
<p>We may collect the following types of information:</p>
<ul>
  <li><strong>Personal Information:</strong> Name, email address, phone number, and profile photo</li>
  <li><strong>Account Data:</strong> Login credentials, preferences, and settings</li>
  <li><strong>Booking Data:</strong> Vehicle selections, booking history, and transaction records</li>
  <li><strong>Device &amp; Usage Data:</strong> IP address, browser type, operating system, and pages visited</li>
  <li><strong>Location Data:</strong> General location based on IP address (if permitted)</li>
</ul>

<h3>2. How We Use Your Information</h3>
<p>We use the information we collect to:</p>
<ul>
  <li>Provide, operate, and maintain our platform</li>
  <li>Process bookings and transactions</li>
  <li>Send administrative communications and booking confirmations</li>
  <li>Improve user experience and platform functionality</li>
  <li>Detect, prevent, and address technical issues or fraud</li>
  <li>Comply with legal obligations</li>
</ul>

<h3>3. Sharing of Information</h3>
<p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
<ul>
  <li><strong>Service Providers:</strong> Trusted third parties who assist in platform operations</li>
  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
</ul>

<h3>4. Data Retention</h3>
<p>We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your data at any time, subject to legal retention requirements.</p>

<h3>5. Security</h3>
<p>We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information. However, no method of transmission over the internet is 100% secure.</p>

<h3>6. Cookies</h3>
<p>We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain platform features.</p>

<h3>7. Your Rights</h3>
<p>Depending on your location, you may have the right to:</p>
<ul>
  <li>Access the personal data we hold about you</li>
  <li>Request correction of inaccurate data</li>
  <li>Request deletion of your data</li>
  <li>Object to or restrict processing of your data</li>
  <li>Data portability</li>
</ul>

<h3>8. Children's Privacy</h3>
<p>Our platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.</p>

<h3>9. Changes to This Policy</h3>
<p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page with an updated effective date.</p>

<h3>10. Contact Us</h3>
<p>If you have questions or concerns about this Privacy Policy, please contact our Data Protection Officer at <strong>privacy@carrental.com</strong>.</p>`;



export default function PrivacyPolicy() {
    const editor = useRef(null);
    const [content, setContent] = useState(defaultContent);
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const config = {
        readonly: false,
        theme: isDark ? "dark" : "default",
        height: 520,
        placeholder: "Write your privacy policy...",
        toolbarAdaptive: false,
        toolbarSticky: true,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        uploader: { insertImageAsBase64URI: true },
        enableDragAndDropFileToEditor: true,
        buttons: [
            "bold", "italic", "underline", "strikethrough", "|",
            "ul", "ol", "|",
            "h1", "h2", "h3", "|",
            "font", "fontsize", "paragraph", "|",
            "image", "link", "|",
            "align", "|",
            "undo", "redo", "|",
            "hr", "eraser", "copyformat", "|",
            "fullsize", "source",
        ],
        style: {
            background: isDark ? "#1e2533" : "#ffffff",
            color: isDark ? "#e2e8f0" : "#1a202c",
        },
        editorCssClass: isDark ? "jodit-dark-editor" : "",
    };

    const handleSave = () => {
        setSaved(true);
        setIsEditing(false);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>

            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`w-1 h-8 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`} />
                    <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Privacy Policy
                    </h1>
                </div>
                <p className={`ml-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Manage how your platform collects, uses, and protects user data
                </p>
            </div>

            {/* Main Editor / Preview */}
            <div className="lg:col-span-3">
                <div className={`rounded-2xl shadow-sm border transition-colors duration-300 overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>

                    {/* Card Header */}
                    <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDark ? "bg-emerald-500/10" : "bg-emerald-50"}`}>
                                <svg className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Privacy Document Editor
                                </h2>
                                <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                    Rich text editor • Image upload supported
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-purple-400" : "bg-yellow-400"}`} />
                                {isDark ? "Dark Mode" : "Light Mode"}
                            </span>

                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Content
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {isEditing ? (
                            <>
                                <div className={`rounded-xl overflow-hidden border ${isDark ? "border-gray-600" : "border-gray-200"}`}>
                                    <style>{`
                      .jodit-container { border: none !important; }
                      .jodit-dark-editor .jodit-wysiwyg { background: #1e2533 !important; color: #e2e8f0 !important; }
                      .jodit-toolbar__box { background: ${isDark ? "#252d3d" : "#f8fafc"} !important; border-bottom: 1px solid ${isDark ? "#374151" : "#e2e8f0"} !important; }
                      .jodit-toolbar-button__button { color: ${isDark ? "#9ca3af" : "#374151"} !important; }
                      .jodit-toolbar-button__button:hover { background: ${isDark ? "#374151" : "#e2e8f0"} !important; }
                      .jodit-status-bar { background: ${isDark ? "#252d3d" : "#f8fafc"} !important; color: ${isDark ? "#6b7280" : "#9ca3af"} !important; border-top: 1px solid ${isDark ? "#374151" : "#e2e8f0"} !important; }
                      .jodit-wysiwyg { padding: 20px 24px !important; min-height: 400px; }
                    `}</style>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        onBlur={(newContent) => setContent(newContent)}
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                        Supports bold, lists, headings, links, and image uploads
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {saved && (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-500">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Saved successfully!
                                            </span>
                                        )}
                                        <button
                                            onClick={handleSave}
                                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div
                                className={`prose max-w-none rounded-xl p-6 border ${isDark ? "prose-invert border-gray-700 bg-gray-900/40" : "bg-gray-50 border-gray-100"}`}
                                style={{ lineHeight: "1.8" }}
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}