"use client";

import React from "react";
import Modal, { ModalProps } from "../atoms/Modal";
import Button from "../atoms/Button";

export interface ModalDialogProps extends Omit<ModalProps, "children"> {
  children: React.ReactNode;
  closeLabel?: string;
  actions?: React.ReactNode;
}

/**
 * ModalDialog - Molécula que compone el átomo Modal con pie de página y botones de acción.
 * Reutilizado en: Diálogo de Perfil y Diálogo de Proyecto ("Saber más").
 */
export default function ModalDialog({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "lg",
  className = "",
  closeLabel = "Cerrar",
  actions,
}: ModalDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size={size}
      className={className}
    >
      <div className="flex flex-col h-full">
        {/* Cuerpo del Diálogo */}
        <div className="flex-1 pb-6">{children}</div>

        {/* Pie del Diálogo con acciones */}
        <div className="pt-4 border-t border-[var(--color-line)]/60 flex flex-wrap items-center justify-end gap-3 mt-auto">
          {actions}
          <Button variant="secondary" size="sm" onClick={onClose}>
            {closeLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
