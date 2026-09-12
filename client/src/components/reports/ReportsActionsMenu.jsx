import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

export default function ReportActionsMenu({ actions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    function handleScroll() {
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  function toggleMenu() {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 192;
      setCoords({
        top: rect.bottom + 4,
        left: Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8),
      });
    }
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative flex justify-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#3d8086]/10 hover:text-[#3d8086] transition-colors"
        aria-label="Actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: coords.top, left: coords.left }}
            className="z-50 w-48 overflow-hidden rounded-lg border border-[#dcdddf] bg-white py-1 shadow-lg"
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    action.onClick();
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    action.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-[#1b3040] hover:bg-[#f2f2f2] hover:text-[#1b496d]"
                  }`}
                >
                  <Icon
                    size={16}
                    className={`shrink-0 ${action.danger ? "text-red-500" : "text-[#3d8086]"}`}
                  />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}