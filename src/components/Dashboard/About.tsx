import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useTheme } from "../../context/ThemeContext";

const defaultContent = `<h2>About Our Platform</h2>
<p>Welcome to our car rental management system. We provide a seamless experience for managing vehicles, hosts, bookings, and users all in one place.</p>
<h3>Our Mission</h3>
<p>To deliver the most efficient and reliable car rental administration platform — empowering hosts and delighting customers.</p>
<ul>
  <li>🚗 Manage your entire fleet effortlessly</li>
  <li>📅 Track bookings in real time</li>
  <li>👥 Oversee users and hosts from one dashboard</li>
  <li>🔔 Stay updated with instant notifications</li>
</ul>
<h3>Contact Us</h3>
<p>Have questions? Reach out at <strong>support@carrental.com</strong></p>`;

export default function About() {
  const editor = useRef(null);
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const config = {
    readonly: false,
    theme: isDark ? "dark" : "default",
    height: 480,
    placeholder: "Start writing your about page content...",
    toolbarAdaptive: false,
    toolbarSticky: true,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    // Enable local base64 image uploads — no server needed
    uploader: {
      insertImageAsBase64URI: true,
    },
    // Allow drag-and-drop image upload
    enableDragAndDropFileToEditor: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "|",
      "h1",
      "h2",
      "h3",
      "|",
      "font",
      "fontsize",
      "paragraph",
      "|",
      "image",
      "link",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "fullsize",
      "source",
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
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-1 h-8 rounded-full ${
              isDark ? "bg-blue-400" : "bg-blue-600"
            }`}
          />
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            About Page
          </h1>
        </div>
        <p
          className={`ml-4 text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage and edit your platform's about page content
        </p>
      </div>

      {/* Card */}
      <div
        className={`rounded-2xl shadow-sm border transition-colors duration-300 overflow-hidden ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Card Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-blue-500/10" : "bg-blue-50"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Content Editor
              </h2>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Rich text editor with full formatting support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Badge */}
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                isDark
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? "bg-purple-400" : "bg-yellow-400"
                }`}
              />
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>

            {/* Edit / Cancel Toggle */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit Content
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Editor / Preview Body */}
        <div className="p-6">
          {isEditing ? (
            <>
              {/* Jodit Editor */}
              <div
                className={`rounded-xl overflow-hidden border ${
                  isDark ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <style>{`
                  .jodit-container {
                    border: none !important;
                  }
                  .jodit-dark-editor .jodit-wysiwyg {
                    background: #1e2533 !important;
                    color: #e2e8f0 !important;
                  }
                  .jodit-toolbar__box {
                    background: ${isDark ? "#252d3d" : "#f8fafc"} !important;
                    border-bottom: 1px solid ${isDark ? "#374151" : "#e2e8f0"} !important;
                  }
                  .jodit-toolbar-button__button {
                    color: ${isDark ? "#9ca3af" : "#374151"} !important;
                  }
                  .jodit-toolbar-button__button:hover {
                    background: ${isDark ? "#374151" : "#e2e8f0"} !important;
                  }
                  .jodit-status-bar {
                    background: ${isDark ? "#252d3d" : "#f8fafc"} !important;
                    color: ${isDark ? "#6b7280" : "#9ca3af"} !important;
                    border-top: 1px solid ${isDark ? "#374151" : "#e2e8f0"} !important;
                  }
                  .jodit-wysiwyg {
                    padding: 20px 24px !important;
                    min-height: 400px;
                  }
                `}</style>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                />
              </div>

              {/* Save Actions */}
              <div className="flex items-center justify-between mt-4">
                <p
                  className={`text-xs ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Changes are saved to your dashboard
                </p>
                <div className="flex items-center gap-3">
                  {saved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-500">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Saved successfully!
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm shadow-blue-500/20"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Preview Mode */
            <div
              className={`prose max-w-none rounded-xl p-6 border ${
                isDark
                  ? "prose-invert bg-gray-750 border-gray-700 bg-gray-900/40"
                  : "bg-gray-50 border-gray-100"
              }`}
              style={{
                lineHeight: "1.8",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            ),
            label: "Content Type",
            value: "Rich HTML",
            color: "blue",
          },
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            ),
            label: "Editor",
            value: "Jodit React",
            color: "purple",
          },
          {
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            ),
            label: "Theme Support",
            value: "Light & Dark",
            color: "green",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`p-2.5 rounded-lg shrink-0 ${
                item.color === "blue"
                  ? isDark
                    ? "bg-blue-500/10"
                    : "bg-blue-50"
                  : item.color === "purple"
                  ? isDark
                    ? "bg-purple-500/10"
                    : "bg-purple-50"
                  : isDark
                  ? "bg-green-500/10"
                  : "bg-green-50"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  item.color === "blue"
                    ? isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                    : item.color === "purple"
                    ? isDark
                      ? "text-purple-400"
                      : "text-purple-600"
                    : isDark
                    ? "text-green-400"
                    : "text-green-600"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {item.icon}
              </svg>
            </div>
            <div>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.label}
              </p>
              <p
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}