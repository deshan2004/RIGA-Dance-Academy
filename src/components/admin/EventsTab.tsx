"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, X } from "lucide-react";
import CustomDatePicker from "../CustomDatePicker";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export default function EventsTab() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: ""
  });

  useEffect(() => {
    let ignore = false;
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (!ignore && data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadEvents();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setEvents([data.data, ...events]);
        setShowModal(false);
        setFormData({ title: "", date: "", time: "", location: "", description: "", imageUrl: "" });
      }
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== id));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <motion.div
      key="events"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Manage Events</h2>
          <p className="text-sm text-gray-400">Add and manage upcoming academy events.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-12 text-academy-gold">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border border-gray-800 rounded-lg">
          No events found. Add your first event!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div key={ev._id} className="bg-academy-black border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{ev.title}</h3>
                <p className="text-sm text-academy-gold mb-2">{new Date(ev.date).toLocaleDateString()} at {ev.time}</p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{ev.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                <span className="text-xs text-gray-500">{ev.location}</span>
                <button
                  onClick={() => handleDelete(ev._id)}
                  className="p-2 bg-red-900/30 text-red-400 hover:bg-red-900/60 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-academy-gray border border-gray-800 rounded-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Add New Event</h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <CustomDatePicker
                    value={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    placeholder="Select Date"
                    className="w-full bg-academy-black border border-gray-700 hover:border-purple-500 rounded-lg px-4 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6:00 PM"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://..."
                  className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-academy-gold hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
