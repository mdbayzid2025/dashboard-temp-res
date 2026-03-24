import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useTheme } from "../../context/ThemeContext";

const defaultContent = `<h2>Terms and Conditions</h2>
<p><strong>Effective Date:</strong> January 1, 2025 &nbsp;|&nbsp; <strong>Last Updated:</strong> March 1, 2025</p>
<p>Please read these Terms and Conditions carefully before using our car rental management platform. By accessing or using our service, you agree to be bound by these terms.</p>

<h3>1. Acceptance of Terms</h3>
<p>By registering an account or using any part of our platform, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use immediately.</p>

<h3>2. Use of the Platform</h3>
<p>Our platform is intended for authorized administrators, hosts, and users of the car rental service. You agree to:</p>
<ul>
  <li>Use the platform only for lawful purposes</li>
  <li>Not attempt to gain unauthorized access to any part of the system</li>
  <li>Not misrepresent your identity or affiliation</li>
  <li>Maintain the confidentiality of your account credentials</li>
</ul>

<h3>3. Account Responsibilities</h3>
<p>You are solely responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breach. We reserve the right to terminate accounts that violate these terms.</p>

<h3>4. Booking and Payments</h3>
<p>All bookings made through the platform are subject to vehicle availability. Payment terms are defined at the time of booking. Cancellation policies vary by vehicle and host. Refunds, if applicable, will be processed within 7–14 business days.</p>

<h3>5. Limitation of Liability</h3>
<p>To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including loss of data, revenue, or profits.</p>

<h3>6. Modifications to Terms</h3>
<p>We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the platform. Continued use after changes constitutes acceptance of the revised Terms.</p>

<h3>7. Governing Law</h3>
<p>These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions.</p>

<h3>8. Contact</h3>
<p>For questions regarding these Terms, please contact us at <strong>legal@carrental.com</strong>.</p>`;


export default function TermsConditions() {
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
        placeholder: "Write your terms and conditions...",
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
                    <div className={`w-1 h-8 rounded-full ${isDark ? "bg-amber-400" : "bg-amber-500"}`} />
                    <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                        Terms &amp; Conditions
                    </h1>
                </div>
                <p className={`ml-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Manage your platform's legal terms and usage policies
                </p>
            </div>

            {/* Main Editor / Preview */}
            <div className="lg:col-span-3">
                <div className={`rounded-2xl shadow-sm border transition-colors duration-300 overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>

                    {/* Card Header */}
                    <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDark ? "bg-amber-500/10" : "bg-amber-50"}`}>
                                <svg className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Legal Document Editor
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
                                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-all"
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
                                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm"
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