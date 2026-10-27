"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface CustomDatePickerProps {
  value?: string; // Format: "YYYY-MM-DD"
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  id?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function CustomDatePicker({
  value = "",
  onChange,
  placeholder = "yyyy-mm-dd",
  className = "",
  min,
  max,
  disabled = false,
  id,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date from value or fallback to today
  const parsedDate = value ? new Date(value + "T00:00:00") : new Date();
  const validParsed = !isNaN(parsedDate.getTime());
  
  const [viewYear, setViewYear] = useState(validParsed ? parsedDate.getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(validParsed ? parsedDate.getMonth() : new Date().getMonth());

  // Update view when value changes from outside
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Today helper
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (year: number, month: number, day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleTodayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onChange(todayStr);
    setIsOpen(false);
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  // Build days grid (Monday first)
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  // In JS: 0=Sun, 1=Mon, ..., 6=Sat. We want Monday=0, ..., Sun=6
  const startDayOffset = (firstDayOfMonth + 6) % 7;

  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const calendarDays = [];

  // Previous month trailing days
  for (let i = startDayOffset - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
    calendarDays.push({
      day: d,
      month: prevM,
      year: prevY,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push({
      day: i,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
    });
  }

  // Next month leading days (fill up to multiple of 7, up to 35 or 42)
  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  const targetTotal = calendarDays.length + remainingCells < 35 ? 35 : calendarDays.length + remainingCells;
  const extraNeeded = targetTotal - calendarDays.length;

  for (let i = 1; i <= extraNeeded; i++) {
    const nextM = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextY = viewMonth === 11 ? viewYear + 1 : viewYear;
    calendarDays.push({
      day: i,
      month: nextM,
      year: nextY,
      isCurrentMonth: false,
    });
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button / Input Display */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-left transition-all cursor-pointer ${className || "bg-[#140728] border border-purple-900/80 hover:border-purple-600 focus:border-purple-500 rounded-xl px-4 py-3 text-white text-xs focus:outline-none"}`}
      >
        <span className={value ? "text-white font-medium" : "text-purple-400/40"}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1.5 ml-2">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="p-1 hover:bg-purple-800/40 rounded-full text-purple-400 hover:text-purple-200 transition-colors"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <CalendarIcon className="w-4 h-4 text-purple-400 shrink-0" />
        </div>
      </button>

      {/* Custom Neon Purple Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 z-50 w-72 sm:w-80 p-4 rounded-2xl bg-[#120626] border border-purple-500/40 shadow-[0_12px_45px_rgba(168,85,247,0.35)] backdrop-blur-2xl select-none"
          >
            {/* Calendar Header: Month Year + Prev / Next */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-sm tracking-wide">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/60 border border-transparent hover:border-purple-700/50 transition-all cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/60 border border-transparent hover:border-purple-700/50 transition-all cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekdays Row: M T W T F S S */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={idx}
                  className="text-[11px] font-extrabold text-purple-300 uppercase tracking-wider py-1"
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((cDay, idx) => {
                const cellStr = `${cDay.year}-${String(cDay.month + 1).padStart(2, "0")}-${String(cDay.day).padStart(2, "0")}`;
                const isSelected = value === cellStr;
                const isToday = todayStr === cellStr;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectDay(cDay.year, cDay.month, cDay.day)}
                    className={`h-9 w-full rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black shadow-[0_0_15px_rgba(168,85,247,0.7)] scale-105 border border-purple-300/80"
                        : cDay.isCurrentMonth
                        ? isToday
                          ? "bg-purple-950/60 border border-purple-400 text-fuchsia-300 font-bold hover:bg-purple-800/40"
                          : "text-purple-100 hover:bg-purple-900/50 hover:text-white"
                        : "text-purple-600/40 hover:bg-purple-950/30 hover:text-purple-400/70"
                    }`}
                  >
                    {cDay.day}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions: Clear & Today */}
            <div className="mt-3 pt-3 border-t border-purple-900/60 flex items-center justify-between px-1 text-xs">
              <button
                type="button"
                onClick={handleClearClick}
                className="text-purple-400 hover:text-purple-200 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-purple-950/40"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleTodayClick}
                className="text-fuchsia-400 hover:text-fuchsia-200 font-black transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-purple-950/40"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
