"use client";

import { useState, useEffect } from "react";
import { Trophy, Save, Check, RefreshCw, Award, Users, Shirt, Flame } from "lucide-react";

export default function StatsTab() {
  const [stats, setStats] = useState({
    livePerformances: "0",
    proTroupeDancers: "0",
    customCostumes: "0",
    nationalAwards: "0",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        if (json.success && json.data) {
          setStats({
            livePerformances: String(json.data.livePerformances ?? "0"),
            proTroupeDancers: String(json.data.proTroupeDancers ?? "0"),
            customCostumes: String(json.data.customCostumes ?? "0"),
            nationalAwards: String(json.data.nationalAwards ?? "0"),
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      const json = await res.json();
      if (json.success) {
        setMessage({ type: "success", text: "Troupe stats updated successfully!" });
      } else {
        setMessage({ type: "error", text: json.error || "Failed to update stats." });
      }
    } catch (err) {
      console.error("Error saving stats:", err);
      setMessage({ type: "error", text: "Network error saving stats." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-[#180833] to-[#240b48] border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">
              Manage Troupe &amp; Academy Stats
            </h2>
            <p className="text-purple-200/70 text-sm mt-1">
              Update live performance metrics shown on the Home Page and Troupe Showcase. Default values are set to 0.
            </p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3 ${
            message.type === "success"
              ? "bg-purple-950/90 border-purple-500/60 text-purple-200"
              : "bg-red-950/90 border-red-500/60 text-red-200"
          }`}
        >
          {message.type === "success" ? <Check className="w-5 h-5 text-purple-400" /> : <Trophy className="w-5 h-5 text-red-400" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Stats Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Live Performances */}
          <div className="p-6 rounded-2xl bg-[#120726] border border-purple-500/30 hover:border-purple-500/60 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-purple-400" />
                Live Performances
              </label>
              <span className="text-[10px] font-semibold text-purple-400/70">Displayed Counter</span>
            </div>
            <input
              type="text"
              value={stats.livePerformances}
              onChange={(e) => setStats({ ...stats, livePerformances: e.target.value })}
              placeholder="e.g. 500+ or 0"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white font-extrabold text-lg focus:outline-none focus:border-purple-400 transition-colors"
              required
            />
            <p className="text-[11px] text-purple-300/60">Number of live stage events and concert shows completed.</p>
          </div>

          {/* Pro Troupe Dancers */}
          <div className="p-6 rounded-2xl bg-[#120726] border border-purple-500/30 hover:border-purple-500/60 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Pro Troupe Dancers
              </label>
              <span className="text-[10px] font-semibold text-purple-400/70">Displayed Counter</span>
            </div>
            <input
              type="text"
              value={stats.proTroupeDancers}
              onChange={(e) => setStats({ ...stats, proTroupeDancers: e.target.value })}
              placeholder="e.g. 50+ or 0"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white font-extrabold text-lg focus:outline-none focus:border-purple-400 transition-colors"
              required
            />
            <p className="text-[11px] text-purple-300/60">Total active ensemble dancers in RIGA Troupe.</p>
          </div>

          {/* Custom Costumes */}
          <div className="p-6 rounded-2xl bg-[#120726] border border-purple-500/30 hover:border-purple-500/60 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-2">
                <Shirt className="w-4 h-4 text-purple-400" />
                Custom Costumes
              </label>
              <span className="text-[10px] font-semibold text-purple-400/70">Displayed Counter</span>
            </div>
            <input
              type="text"
              value={stats.customCostumes}
              onChange={(e) => setStats({ ...stats, customCostumes: e.target.value })}
              placeholder="e.g. 100+ or 0"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white font-extrabold text-lg focus:outline-none focus:border-purple-400 transition-colors"
              required
            />
            <p className="text-[11px] text-purple-300/60">Bespoke costume wardrobe and traditional regalia sets.</p>
          </div>

          {/* National Awards */}
          <div className="p-6 rounded-2xl bg-[#120726] border border-purple-500/30 hover:border-purple-500/60 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                National Awards
              </label>
              <span className="text-[10px] font-semibold text-purple-400/70">Displayed Counter</span>
            </div>
            <input
              type="text"
              value={stats.nationalAwards}
              onChange={(e) => setStats({ ...stats, nationalAwards: e.target.value })}
              placeholder="e.g. 15+ or 0"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/60 border border-purple-800/60 text-white font-extrabold text-lg focus:outline-none focus:border-purple-400 transition-colors"
              required
            />
            <p className="text-[11px] text-purple-300/60">Choreography &amp; performance trophies awarded.</p>
          </div>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800 text-white font-extrabold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving Stats...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save All Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
