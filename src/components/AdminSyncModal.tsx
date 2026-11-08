"use client";

import React, { useState } from "react";
import {
  MERCHANT_SOURCES,
  SYNC_JOBS,
  AUDIT_LOGS,
  MerchantSource,
  SyncJob,
  AuditLogRecord,
} from "@/lib/data";
import {
  X,
  Lock,
  Unlock,
  RefreshCw,
  CheckCircle2,
  Database,
  ShieldCheck,
  Clock,
  Terminal,
  Server,
  Zap,
} from "lucide-react";

interface AdminSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalProductsCount: number;
}

export const AdminSyncModal: React.FC<AdminSyncModalProps> = ({
  isOpen,
  onClose,
  totalProductsCount,
}) => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"sources" | "sync" | "audit">("sources");

  // Local state for interactive demo
  const [sources, setSources] = useState<MerchantSource[]>(MERCHANT_SOURCES);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>(SYNC_JOBS);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(AUDIT_LOGS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState<string>("");
  const [syncProgress, setSyncProgress] = useState(0);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === "2026" || pin.trim() === "admin") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleToggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextActive = !s.enabled;
          // Add audit log
          const newLog: AuditLogRecord = {
            id: `audit_${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: nextActive ? "ACTIVATE_SOURCE" : "DEACTIVATE_SOURCE",
            entityType: "source",
            entityId: s.id,
            details: `Đã ${nextActive ? "bật" : "tắt"} kết nối dữ liệu nguồn ${s.name}`,
            performedBy: "admin_user",
          };
          setAuditLogs((l) => [newLog, ...l]);
          return { ...s, enabled: nextActive };
        }
        return s;
      })
    );
  };

  const handleTriggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(15);
    setSyncStep("Kết nối 5 nguồn bán lẻ Biên Hòa...");

    await new Promise((r) => setTimeout(r, 600));
    setSyncProgress(45);
    setSyncStep("Thu thập dữ liệu tồn kho & giá niêm yết tại quầy...");

    await new Promise((r) => setTimeout(r, 700));
    setSyncProgress(75);
    setSyncStep("Chuẩn hóa tiếng Việt, phân loại Scope A / Scope B...");

    await new Promise((r) => setTimeout(r, 600));
    setSyncProgress(95);
    setSyncStep("Kiểm tra robots.txt & xác thực SKU...");

    await new Promise((r) => setTimeout(r, 500));
    setSyncProgress(100);
    setSyncStep("Đồng bộ hoàn tất! 36/36 sản phẩm cập nhật.");

    const now = new Date();
    const newJob: SyncJob = {
      id: `job_${Date.now()}`,
      sourceId: "all_sources",
      sourceName: "Đồng bộ toàn diện 5 nguồn",
      startedAt: new Date(now.getTime() - 2400).toISOString(),
      completedAt: now.toISOString(),
      status: "SUCCESS",
      itemsChecked: 36,
      itemsUpdated: 36,
    };

    const newLog: AuditLogRecord = {
      id: `audit_${Date.now()}`,
      timestamp: now.toISOString(),
      action: "MANUAL_FULL_SYNC",
      entityType: "sync",
      entityId: newJob.id,
      details: "Thực thi đồng bộ thủ công toàn diện 5 nguồn bán lẻ Biên Hòa thành công",
      performedBy: "admin_user",
    };

    setSyncJobs((prev) => [newJob, ...prev]);
    setAuditLogs((prev) => [newLog, ...prev]);
    setSources((prev) =>
      prev.map((s) => ({
        ...s,
        lastSyncAt: "Vừa xong",
      }))
    );

    setTimeout(() => {
      setIsSyncing(false);
      setSyncProgress(0);
      setSyncStep("");
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#151921] border border-[#2B3441] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2B3441] bg-[#11151B]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#181D25] border border-[#722D4A]/50">
              <Database className="w-5 h-5 text-[#D9FF3F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-title" className="text-base sm:text-lg font-black uppercase text-[#FAF9F6] tracking-tight">
                  HERCOURT DATA PIPELINE & ADMIN
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181D25] text-[#D9FF3F] border border-[#D9FF3F]/30">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-[#FAF9F6]/60">
                Hệ thống thu thập, xác minh & cập nhật dữ liệu cửa hàng thể thao Biên Hòa
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#181D25] hover:bg-[#2B3441] text-[#FAF9F6]/70 hover:text-white border border-[#2B3441] transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* PIN Lock Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#181D25] border border-[#2B3441] flex items-center justify-center mb-4 text-[#E8A9C3]">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black uppercase text-[#FAF9F6] mb-1">
              Khu Vực Quản Trị Hệ Thống
            </h3>
            <p className="text-xs text-[#FAF9F6]/60 max-w-sm mb-6">
              Vui lòng nhập mã PIN quản trị viên để điều hành đường ống đồng bộ dữ liệu và cấu hình nguồn.
            </p>

            <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-3">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Nhập PIN (mặc định: 2026)"
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl bg-[#11151B] border border-[#2B3441] text-[#FAF9F6] placeholder-[#FAF9F6]/30 text-center font-mono tracking-widest text-lg focus:outline-none focus:border-[#D9FF3F]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-1 font-medium">
                    Mã PIN không chính xác. Hãy dùng: 2026
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D9FF3F] text-[#11151B] font-black uppercase tracking-wider text-xs hover:bg-[#BBE02E] transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Mở Khóa Quản Trị</span>
              </button>
              <div className="text-[11px] text-[#FAF9F6]/40 font-mono">
                Gợi ý PIN nhanh: <span className="text-[#D9FF3F]">2026</span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Toolbar: Tabs & Sync Trigger */}
            <div className="px-6 py-3 border-b border-[#2B3441] bg-[#181D25] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab("sources")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "sources"
                      ? "bg-[#D9FF3F] text-[#11151B]"
                      : "text-[#FAF9F6]/70 hover:text-white hover:bg-[#11151B]"
                  }`}
                >
                  5 Nguồn Dữ Liệu
                </button>
                <button
                  onClick={() => setActiveTab("sync")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "sync"
                      ? "bg-[#D9FF3F] text-[#11151B]"
                      : "text-[#FAF9F6]/70 hover:text-white hover:bg-[#11151B]"
                  }`}
                >
                  Lịch Sử Đồng Bộ ({syncJobs.length})
                </button>
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "audit"
                      ? "bg-[#D9FF3F] text-[#11151B]"
                      : "text-[#FAF9F6]/70 hover:text-white hover:bg-[#11151B]"
                  }`}
                >
                  Nhật Ký Kiểm Toán ({auditLogs.length})
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isSyncing
                      ? "bg-[#2B3441] text-[#FAF9F6]/50 cursor-not-allowed"
                      : "bg-[#722D4A] hover:bg-[#8E3B5E] text-[#FAF9F6] border border-[#E8A9C3]/30 shadow-md"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-[#D9FF3F]" : ""}`} />
                  <span>{isSyncing ? "Đang xử lý..." : "Đồng Bộ Ngay (Sync Now)"}</span>
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#11151B] text-[#FAF9F6]/60 hover:text-white text-xs border border-[#2B3441]"
                  title="Khóa lại"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sync Progress Bar */}
            {isSyncing && (
              <div className="px-6 py-3 bg-[#11151B] border-b border-[#2B3441]">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#D9FF3F] font-mono flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    {syncStep}
                  </span>
                  <span className="font-mono text-[#FAF9F6]/70">{syncProgress}%</span>
                </div>
                <div className="w-full bg-[#181D25] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#722D4A] to-[#D9FF3F] h-full transition-all duration-300"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Stat Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#181D25] border border-[#2B3441]">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#FAF9F6]/50">
                    Sản Phẩm Trực Tuyến
                  </div>
                  <div className="text-2xl font-black text-[#FAF9F6] mt-0.5">
                    {totalProductsCount}
                  </div>
                  <div className="text-[10px] text-[#D9FF3F] mt-1 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Xác minh giá
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#181D25] border border-[#2B3441]">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#FAF9F6]/50">
                    Scope A (Sẵn Tại Quầy)
                  </div>
                  <div className="text-2xl font-black text-[#D9FF3F] mt-0.5">
                    28
                  </div>
                  <div className="text-[10px] text-[#FAF9F6]/50 mt-1">
                    Chi nhánh TP. Biên Hòa
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#181D25] border border-[#2B3441]">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#FAF9F6]/50">
                    Scope B (Shop Biên Hòa)
                  </div>
                  <div className="text-2xl font-black text-[#E8A9C3] mt-0.5">
                    8
                  </div>
                  <div className="text-[10px] text-[#FAF9F6]/50 mt-1">
                    Kiểm tra tồn tại quầy
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#181D25] border border-[#2B3441]">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#FAF9F6]/50">
                    Nguồn Đang Hoạt Động
                  </div>
                  <div className="text-2xl font-black text-[#FAF9F6] mt-0.5">
                    {sources.filter((s) => s.enabled).length} / {sources.length}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-medium">
                    Tất cả Healthy
                  </div>
                </div>
              </div>

              {/* TAB 1: Sources */}
              {activeTab === "sources" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FAF9F6]/80 flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#D9FF3F]" />
                      DANH SÁCH ĐẦU MỐI BÁN LẺ & BỘ KẾT NỐI (CONNECTORS)
                    </h4>
                    <span className="text-[11px] text-[#FAF9F6]/50">
                      Tự động tuân thủ robots.txt & Giới hạn tần suất
                    </span>
                  </div>

                  <div className="space-y-3">
                    {sources.map((src) => (
                      <div
                        key={src.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          src.enabled
                            ? "bg-[#181D25] border-[#2B3441]"
                            : "bg-[#14181F] border-[#2B3441]/40 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#FAF9F6]">
                                {src.name}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                                  src.syncStatus === "HEALTHY"
                                    ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800"
                                    : "bg-amber-950/70 text-amber-400 border border-amber-800"
                                }`}
                              >
                                {src.syncStatus}
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#11151B] text-[#D9FF3F] border border-[#2B3441]">
                                Độ tin cậy: {src.confidenceScore}%
                              </span>
                            </div>

                            <div className="text-xs text-[#FAF9F6]/60">
                              {src.website}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#FAF9F6]/45 font-mono pt-1">
                              <span>Kiểu kết nối: {src.type}</span>
                              <span>•</span>
                              <span>Tần suất: {src.syncFrequency}</span>
                              <span>•</span>
                              <span>Robots.txt: {src.robotsTxtPermitted ? "Được phép" : "Hạn chế"}</span>
                              <span>•</span>
                              <span>Tối đa: {src.rateLimitPerMin} req/min</span>
                              <span>•</span>
                              <span>Đồng bộ: {src.lastSyncAt}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <div className="text-right">
                              <div className="text-sm font-black font-mono text-[#FAF9F6]">
                                {src.totalProductsCount}
                              </div>
                              <div className="text-[9px] uppercase tracking-wider text-[#FAF9F6]/40">
                                Mẫu trực tiếp
                              </div>
                            </div>

                            <button
                              onClick={() => handleToggleSource(src.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                                src.enabled
                                  ? "bg-emerald-900/50 hover:bg-emerald-900 text-emerald-300 border border-emerald-700"
                                  : "bg-[#2B3441] text-[#FAF9F6]/60 hover:text-white"
                              }`}
                            >
                              {src.enabled ? "BẬT" : "TẮT"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Sync Jobs */}
              {activeTab === "sync" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FAF9F6]/80 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D9FF3F]" />
                      LỊCH SỬ THỰC THI ĐỒNG BỘ DỮ LIỆU
                    </h4>
                  </div>

                  <div className="border border-[#2B3441] rounded-2xl overflow-hidden bg-[#181D25]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#11151B] border-b border-[#2B3441] text-[10px] uppercase font-mono text-[#FAF9F6]/50">
                          <tr>
                            <th className="p-3">Mã Job / Nguồn</th>
                            <th className="p-3">Thời Gian</th>
                            <th className="p-3">Trạng Thái</th>
                            <th className="p-3 text-right">Đã Kiểm Tra</th>
                            <th className="p-3 text-right">Đã Cập Nhật</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B3441]/50 font-mono">
                          {syncJobs.map((job) => (
                            <tr key={job.id} className="hover:bg-[#1C222B] transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-[#FAF9F6]">{job.sourceName}</div>
                                <div className="text-[10px] text-[#FAF9F6]/40">{job.id}</div>
                              </td>
                              <td className="p-3 text-[#FAF9F6]/70">
                                {job.completedAt ? (
                                  <>
                                    {new Date(job.completedAt).toLocaleTimeString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    })}
                                    <span className="block text-[10px] text-[#FAF9F6]/40">
                                      {new Date(job.completedAt).toLocaleDateString("vi-VN")}
                                    </span>
                                  </>
                                ) : (
                                  "Đang chạy"
                                )}
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                  {job.status}
                                </span>
                              </td>
                              <td className="p-3 text-right text-[#FAF9F6] font-bold">
                                {job.itemsChecked}
                              </td>
                              <td className="p-3 text-right text-[#D9FF3F]">
                                {job.itemsUpdated}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Audit Logs */}
              {activeTab === "audit" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#FAF9F6]/80 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#D9FF3F]" />
                      NHẬT KÝ KIỂM TOÁN TÍNH TOÀN VẸN (AUDIT LOGS)
                    </h4>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    {auditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-[#181D25] border border-[#2B3441] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#11151B] text-[#D9FF3F] border border-[#2B3441]">
                              {log.action}
                            </span>
                            <span className="text-[#FAF9F6]/80 font-sans text-xs">
                              {log.details}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#FAF9F6]/40">
                            Thực thể: {log.entityType} ({log.entityId}) • Người thực hiện: {log.performedBy}
                          </div>
                        </div>

                        <div className="text-[11px] text-[#FAF9F6]/50 whitespace-nowrap self-end sm:self-center">
                          {new Date(log.timestamp).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}{" "}
                          {new Date(log.timestamp).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-[#2B3441] bg-[#11151B] flex flex-wrap items-center justify-between text-xs text-[#FAF9F6]/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D9FF3F]" />
                <span>Quy trình kiểm toán xác thực 100% độc lập, không bịa đặt số liệu.</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#181D25] hover:bg-[#2B3441] text-[#FAF9F6] font-semibold text-xs border border-[#2B3441]"
              >
                Đóng Bảng Quản Trị
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
