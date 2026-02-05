import Board from "../../../features/board/components/Board/Board";
import "./index.css";
import ModalRectangle from "@/img/ModalRectangle.png";
import Modal from "@/shared/ui/Modal";
import { useBoards } from "@/features/board/hooks/useBoards";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  const { boards } = useBoards();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="z-50 h-[95%] w-full bg-transparent"
    >
      <section className="top-section">
        <img src={ModalRectangle} alt="모달 사각형" />
        <div className="modal-title">주제 이름</div>
      </section>
      <Board boards={boards} onClose={onClose} />
    </Modal>
  );
}
