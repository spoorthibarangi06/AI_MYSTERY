import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mysteryService } from '../services/mysteryService';
import { StatCard } from '../components/dashboard/StatCard';
import { MysteryCard } from '../components/dashboard/MysteryCard';
import { FolderLock, CheckCircle, Clock, Award, PlusCircle, Search } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [mysteries, setMysteries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    ongoing: 0,
    correctAccusations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCases = async () => {
    try {
      const res = await mysteryService.getMysteries();
      setMysteries(res.data.mysteries || []);
      setStats(
        res.data.stats || {
          total: 0,
          completed: 0,
          ongoing: 0,
          correctAccusations: 0,
        }
      );
    } catch (err) {
      console.error('Failed to load mystery cases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (mysteryId) => {
    if (!window.confirm('Are you sure you want to delete this case file permanently?')) {
      return;
    }
    try {
      await mysteryService.deleteMystery(mysteryId);
      setMysteries((prev) => prev.filter((m) => m._id !== mysteryId));
      fetchCases();
    } catch (err) {
      alert('Failed to delete case: ' + err.message);
    }
  };

  const filteredMysteries = mysteries.filter(
    (m) =>
      (m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.category && m.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#293444] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D6A85F]">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
              <span>SPECIAL INVESTIGATION ARCHIVES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
              Case Board: Detective {user?.name}
            </h1>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Manage your active inquiries, review forensic findings, and close ongoing investigations.
            </p>
          </div>

          <Link
            to="/create-mystery"
            className="px-4 py-2.5 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-sm font-semibold transition-all shadow-md shadow-[#D94B4B]/25 flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Mystery</span>
          </Link>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <StatCard title="Total Cases" value={stats.total} icon={FolderLock} color="#3B82F6" />
          <StatCard title="Solved / Closed" value={stats.completed} icon={CheckCircle} color="#34D399" />
          <StatCard title="Active Inquiries" value={stats.ongoing} icon={Clock} color="#D6A85F" />
          <StatCard title="Correct Accusations" value={stats.correctAccusations} icon={Award} color="#D94B4B" />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search case files by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#121923] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
            />
          </div>
        </div>

        {/* Mysteries Grid or Empty State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-2 border-[#D94B4B] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-[#9CA3AF] mt-4 tracking-widest">RETRIEVING CASE ARCHIVES...</p>
          </div>
        ) : filteredMysteries.length === 0 ? (
          <div className="mt-8 bg-[#121923] border border-[#293444] border-dashed rounded-2xl p-12 text-center max-w-xl mx-auto">
            <FolderLock className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4 stroke-1" />
            <h3 className="text-lg font-heading font-semibold text-white">Your investigation room is empty</h3>
            <p className="text-xs text-[#9CA3AF] mt-1 max-w-md mx-auto">
              No active or historical cases logged under your clearance. Input a custom premise and start solving.
            </p>
            <Link
              to="/create-mystery"
              className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] text-white text-xs font-semibold transition-all shadow-md shadow-[#D94B4B]/25"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Mystery</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredMysteries.map((m) => (
              <MysteryCard key={m._id} mystery={m} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
