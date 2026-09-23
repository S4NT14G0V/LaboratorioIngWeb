"use client";

import React, { useState } from "react";
import { useLang } from "@/app/providers";
import { PERSONAL_INFO } from "@/constants/portfolioData";
import ModalDialog from "../molecules/ModalDialog";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import { FileIcon } from "../atoms/Icons";

export interface CreativeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "philosophy" | "metrics" | "terminal";

interface TerminalLine {
  type: "command" | "output" | "error";
  text: string;
}

/**
 * CreativeProfileModal - Organismo para el Diálogo Creativo del Perfil ("Más Información").
 */
export default function CreativeProfileModal({
  isOpen,
  onClose,
}: CreativeProfileModalProps) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>("philosophy");
  const [inputCommand, setInputCommand] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: "output", text: "Santiago OS v2.6.0 (x86_64-pc-linux-gnu)" },
    { type: "output", text: t("dialog.terminal_welcome") },
  ]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory: TerminalLine[] = [
      ...terminalHistory,
      { type: "command", text: `$ ${cmd}` },
    ];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          text: t("dialog.terminal_help_desc"),
        });
        break;
      case "whoami":
        newHistory.push({
          type: "output",
          text: t("dialog.terminal_whoami_desc"),
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: t("dialog.terminal_skills_desc"),
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          text: t("dialog.terminal_projects_desc"),
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: `Email: ${PERSONAL_INFO.contact.email} | ${t("dialog.terminal_contact_city")}: ${PERSONAL_INFO.contact.city}, ${PERSONAL_INFO.contact.country} | Tel: ${PERSONAL_INFO.contact.phone}`,
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setInputCommand("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `${t("dialog.terminal_cmd_not_found")} ('${trimmed}')`,
        });
    }

    setTerminalHistory(newHistory);
    setInputCommand("");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputCommand);
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t("profile.modal_title")}
      subtitle={t("profile.modal_subtitle")}
      size="xl"
      closeLabel={t("portfolio.close")}
      actions={
        <Button
          variant="primary"
          size="sm"
          href={PERSONAL_INFO.cvUrl}
          download="CV_Santiago_Trespalacios.pdf"
          icon={<FileIcon className="h-4 w-4" />}
        >
          {t("sidebar.download_cv")}
        </Button>
      }
    >
      {/* Selector de Pestañas */}
      <div className="flex border-b border-[var(--color-line)]/80 gap-1.5 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("philosophy")}
          className={`px-3.5 py-2 font-mono text-xs sm:text-sm font-semibold rounded-t-md transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "philosophy"
              ? "border-[var(--color-text)] text-[var(--color-text)] bg-[var(--color-stripe)]/50"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)]/20"
          }`}
        >
          {t("dialog.philosophy_title")}
        </button>

        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-3.5 py-2 font-mono text-xs sm:text-sm font-semibold rounded-t-md transition-all duration-200 border-b-2 cursor-pointer ${
            activeTab === "metrics"
              ? "border-[var(--color-text)] text-[var(--color-text)] bg-[var(--color-stripe)]/50"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)]/20"
          }`}
        >
          {t("dialog.stats_title")}
        </button>

        <button
          onClick={() => setActiveTab("terminal")}
          className={`px-3.5 py-2 font-mono text-xs sm:text-sm font-semibold rounded-t-md transition-all duration-200 border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "terminal"
              ? "border-[var(--color-text)] text-[var(--color-text)] bg-[var(--color-stripe)]/50"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-stripe)]/20"
          }`}
        >
          <span className="text-emerald-500 font-bold">$</span>
          <span>{t("dialog.terminal_tab")}</span>
        </button>
      </div>

      {/* Pestaña 1: Filosofía de Desarrollo */}
      {activeTab === "philosophy" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/20">
              <div className="h-7 w-7 rounded-md bg-[var(--color-stripe)] border border-[var(--color-line)] text-[var(--color-text)] flex items-center justify-center font-mono text-xs font-bold mb-3">
                01
              </div>
              <h4 className="font-mono text-sm font-bold text-[var(--color-text)] mb-2">
                {t("dialog.p1_title")}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">
                {t("dialog.p1_desc")}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/20">
              <div className="h-7 w-7 rounded-md bg-[var(--color-stripe)] border border-[var(--color-line)] text-[var(--color-text)] flex items-center justify-center font-mono text-xs font-bold mb-3">
                02
              </div>
              <h4 className="font-mono text-sm font-bold text-[var(--color-text)] mb-2">
                {t("dialog.p2_title")}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">
                {t("dialog.p2_desc")}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/20">
              <div className="h-7 w-7 rounded-md bg-[var(--color-stripe)] border border-[var(--color-line)] text-[var(--color-text)] flex items-center justify-center font-mono text-xs font-bold mb-3">
                03
              </div>
              <h4 className="font-mono text-sm font-bold text-[var(--color-text)] mb-2">
                {t("dialog.p3_title")}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">
                {t("dialog.p3_desc")}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] mt-4">
            <h5 className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2">
              {t("dialog.methodology_title")}
            </h5>
            <p className="text-xs text-[var(--color-text-muted)] font-sans leading-relaxed">
              {t("dialog.methodology_desc")}
            </p>
          </div>
        </div>
      )}

      {/* Pestaña 2: Indicadores Técnicos */}
      {activeTab === "metrics" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/30">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                9º
              </span>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] font-sans">
                {t("dialog.stat_semester")}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/30">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                4+
              </span>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] font-sans">
                {t("dialog.stat_projects")}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/30">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                100%
              </span>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] font-sans">
                {t("dialog.stat_test_coverage")}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-stripe)]/30">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                Clean
              </span>
              <p className="mt-1 text-xs text-[var(--color-text-muted)] font-sans">
                {t("dialog.stat_hours")}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)]">
            <h5 className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider mb-2.5">
              {t("dialog.trajectory_title")}
            </h5>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge size="xs" variant="glow">{t("dialog.badge_udea")}</Badge>
              <Badge size="xs" variant="outline">{t("dialog.badge_assistant")}</Badge>
              <Badge size="xs" variant="outline">{t("dialog.badge_backend")}</Badge>
              <Badge size="xs" variant="outline">{t("dialog.badge_frontend")}</Badge>
              <Badge size="xs" variant="outline">{t("dialog.badge_bilingual")}</Badge>
            </div>
          </div>
        </div>
      )}

      {/* Pestaña 3: Terminal Interactiva */}
      {activeTab === "terminal" && (
        <div className="animate-in fade-in duration-200">
          <div className="rounded-lg border border-[var(--color-line)] bg-zinc-950 p-4 font-mono text-xs text-zinc-100 shadow-inner">
            {/* Cabecera Terminal */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                <span className="ml-2">bash - santiagot3p@udea:~</span>
              </div>
              <span>UTF-8</span>
            </div>

            {/* Historial de Terminal */}
            <div className="h-44 overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
              {terminalHistory.map((item, idx) => (
                <div key={idx}>
                  {item.type === "command" && (
                    <span className="text-emerald-400 font-semibold">{item.text}</span>
                  )}
                  {item.type === "output" && (
                    <span className="text-zinc-300">{item.text}</span>
                  )}
                  {item.type === "error" && (
                    <span className="text-red-400">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Input interactivo */}
            <form onSubmit={handleTerminalSubmit} className="mt-3 flex items-center gap-2 border-t border-zinc-800 pt-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                placeholder={t("dialog.terminal_placeholder")}
                className="flex-1 bg-transparent text-zinc-100 outline-none text-xs font-mono placeholder:text-zinc-600"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-[11px] transition-colors"
              >
                {t("dialog.terminal_run")}
              </button>
            </form>
          </div>

          {/* Accesos rápidos de comandos */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
              {t("dialog.terminal_quick")}
            </span>
            {["whoami", "skills", "projects", "contact", "clear"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--color-line)] text-[var(--color-text)] hover:bg-[var(--color-stripe)] transition-colors cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </ModalDialog>
  );
}
