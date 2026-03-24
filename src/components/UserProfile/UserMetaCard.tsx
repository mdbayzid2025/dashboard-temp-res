import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { FaInstagram, FaLinkedinIn, FaRegEdit } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="p-5 border rounded-2xl lg:p-6"
        style={{ borderColor: "var(--th-border)", background: "var(--th-card)" }}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">

            {/* Avatar */}
            <div className="w-20 h-20 overflow-hidden rounded-full border"
              style={{ borderColor: "var(--th-border)" }}>
              <img src="/images/user/owner.jpg" alt="user" />
            </div>

            {/* Name & meta */}
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center xl:text-left"
                style={{ color: "var(--th-text)" }}>
                Musharof Chowdhury
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm" style={{ color: "var(--th-text-muted)" }}>Team Manager</p>
                <div className="hidden h-3.5 w-px xl:block"
                  style={{ background: "var(--th-border)" }} />
                <p className="text-sm" style={{ color: "var(--th-text-muted)" }}>Arizona, United States</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {[
                { href: "https://www.facebook.com/PimjoHQ", icon: <FaFacebookF /> },
                { href: "https://x.com/PimjoHQ", icon: <RxCross2 /> },
                { href: "https://www.linkedin.com/company/pimjo", icon: <FaLinkedinIn /> },
                { href: "https://instagram.com/PimjoHQ", icon: <FaInstagram /> },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium shadow-theme-xs"
                  style={{
                    borderColor: "var(--th-border)",
                    background: "var(--th-card)",
                    color: "var(--th-text-muted)",
                  }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Edit button */}
          <button onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium shadow-theme-xs lg:inline-flex lg:w-auto"
            style={{
              borderColor: "var(--th-border)",
              background: "var(--th-card)",
              color: "var(--th-text)",
            }}>
            <FaRegEdit />
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl p-4 lg:p-11"
          style={{ background: "var(--th-card)" }}>
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold" style={{ color: "var(--th-text)" }}>
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm lg:mb-7" style={{ color: "var(--th-text-muted)" }}>
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          {/* … form fields follow the same pattern */}
        </div>
      </Modal>
    </>
  );
}