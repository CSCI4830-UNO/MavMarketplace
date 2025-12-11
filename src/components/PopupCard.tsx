import type { ReactNode } from "react";
import { useEffect } from "react";
import "../css/PopupCard.css";

interface PopupCardProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function PopupCard({ open, onClose, children }: PopupCardProps) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("popup-overlay")) {
        onClose();
      }
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
