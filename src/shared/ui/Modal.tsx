import { useEffect, useState, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}
export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      onClick={onClose}
      className={` ${isAnimating && isOpen ? "opacity-100" : "opacity-0"} fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={() => {
          if (!isOpen) setIsAnimating(false);
        }}
        className={` ${isAnimating && isOpen ? "translate-y-0" : "translate-y-full"} max-w-md rounded-2xl bg-white transition-transform duration-500 ease-in-out ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
