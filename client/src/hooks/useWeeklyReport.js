import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createReport, updateReport, submitReport } from "../api/reportsApi.js";

function emptyReport() {
  return {
    weekStart: "",
    project: "",
    tasksCompleted: [],
    tasksPlanned: [],
    blockers: [],
    achievements: [],
    hours: { development: "", testing: "", meetings: "", documentation: "" },
    notes: "",
    status: "draft",
    managerComment: "",
  };
}

export function useWeeklyReport(initialReport) {
  const navigate = useNavigate();
  const [report, setReport] = useState(emptyReport());
  const [reportId, setReportId] = useState(initialReport?._id || initialReport?.id || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialReport) {
      setReport({
        ...emptyReport(),
        ...initialReport,
        hours: { ...emptyReport().hours, ...(initialReport.hours || {}) },
      });
      setReportId(initialReport._id || initialReport.id || null);
    }
  }, [initialReport]);

  const isLocked = report.status === "submitted" || report.status === "approved";

  function updateField(field, value) {
    setReport((prev) => ({ ...prev, [field]: value }));
  }

  function getReportPayload() {
    const { weekStart, project, tasksCompleted, tasksPlanned, blockers, achievements, hours, notes } = report;
    return { weekStart, project, tasksCompleted, tasksPlanned, blockers, achievements, hours, notes };
  }

  async function saveOrUpdate() {
    if (reportId) {
      const data = await updateReport(reportId, getReportPayload());
      setReport((prev) => ({
        ...prev,
        status: data.report.status,
        managerComment: data.version?.managerComment || "",
      }));
      return data;
    }
    const data = await createReport(getReportPayload());
    setReportId(data.report._id);
    setReport((prev) => ({
      ...prev,
      status: data.report.status,
      managerComment: data.version?.managerComment || "",
    }));
    return data;
  }

  async function handleSaveDraft() {
    if (!report.weekStart || !report.project) {
      toast.error("Select a week and a project before saving");
      return;
    }
    try {
      setLoading(true);
      const wasUpdate = Boolean(reportId);
      await saveOrUpdate();
      toast.success(wasUpdate ? "Report updated successfully" : "Draft saved successfully");
      navigate("/member-reports");
    } catch (error) {
      console.error("Save report error:", error);
      toast.error(error.message || "Failed to save report");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!report.weekStart || !report.project) {
      toast.error("Select a week and a project before submitting");
      return;
    }
    try {
      setLoading(true);
      const isResubmitting = report.status === "needs_correction";
      const data = await saveOrUpdate();
      await submitReport(data.report._id);
      toast.success(isResubmitting ? "Report resubmitted for review" : "Report submitted for review");
      navigate("/member-reports");
    } catch (error) {
      console.error("Submit report error:", error);
      toast.error(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  }

  return { report, isLocked, loading, updateField, handleSaveDraft, handleSubmit };
}