import React, { useState } from 'react';
import {
  MessageSquare,
  Video,
  UserCheck,
  FileText,
  Bookmark,
  CheckCircle,
  Eye,
  Filter,
  Search,
  Shield,
  Activity,
  Mail,
  Phone,
  Landmark,
  KeyRound,
  PenTool,
  Camera,
  Users,
} from 'lucide-react';

export const EvidenceList = ({
  evidenceList = [],
  suspects = [],
  reviewedIds = [],
  bookmarkedIds = [],
  onInspect,
  onToggleReview,
  onToggleBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSuspectId, setSelectedSuspectId] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getEvidenceTypeConfig = (type) => {
    switch (type) {
      case 'police_report':
        return {
          icon: Shield,
          color: 'text-[#D94B4B]',
          bg: 'bg-[#D94B4B]/10',
          border: 'border-[#D94B4B]/30',
          label: 'Police Report',
        };
      case 'medical_report':
        return {
          icon: Activity,
          color: 'text-teal-400',
          bg: 'bg-teal-500/10',
          border: 'border-teal-500/30',
          label: 'Medical / Autopsy',
        };
      case 'message':
        return {
          icon: MessageSquare,
          color: 'text-[#25D366]',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          label: 'WhatsApp Chat',
        };
      case 'cctv':
        return {
          icon: Video,
          color: 'text-[#D94B4B]',
          bg: 'bg-[#D94B4B]/10',
          border: 'border-[#D94B4B]/30',
          label: 'CCTV Feed',
        };
      case 'witness_statement':
        return {
          icon: UserCheck,
          color: 'text-[#D6A85F]',
          bg: 'bg-[#D6A85F]/10',
          border: 'border-[#D6A85F]/30',
          label: 'Witness Statement',
        };
      case 'email':
        return {
          icon: Mail,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          label: 'Email Thread',
        };
      case 'call_log':
        return {
          icon: Phone,
          color: 'text-indigo-400',
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/30',
          label: 'Call Log',
        };
      case 'financial_record':
        return {
          icon: Landmark,
          color: 'text-[#34D399]',
          bg: 'bg-[#34D399]/10',
          border: 'border-[#34D399]/30',
          label: 'Financial Audit',
        };
      case 'access_log':
        return {
          icon: KeyRound,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          label: 'Keycard Access Log',
        };
      case 'handwritten_note':
        return {
          icon: PenTool,
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          label: 'Handwritten Note',
        };
      case 'photo':
      case 'image':
        return {
          icon: Camera,
          color: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          label: 'Photo Clue',
        };
      default:
        return {
          icon: FileText,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          label: 'Physical Document',
        };
    }
  };

  // Filter items
  const filteredEvidence = evidenceList.filter((item) => {
    // 1. Category filter
    if (selectedCategory !== 'all') {
      const cat = (item.category || '').toLowerCase();
      const type = (item.type || '').toLowerCase();

      if (selectedCategory === 'digital') {
        if (!['digital'].includes(cat) && !['message', 'email', 'call_log', 'access_log'].includes(type))
          return false;
      } else if (selectedCategory === 'visual') {
        if (!['visual'].includes(cat) && !['cctv', 'photo', 'image'].includes(type)) return false;
      } else if (selectedCategory === 'official_report') {
        if (!['official_report'].includes(cat) && !['police_report', 'medical_report'].includes(type))
          return false;
      } else if (selectedCategory === 'witness_statement') {
        if (!['witness_statement'].includes(cat) && !['witness_statement'].includes(type)) return false;
      } else if (selectedCategory === 'physical') {
        if (
          !['physical', 'document'].includes(cat) &&
          !['financial_record', 'handwritten_note', 'physical_evidence', 'document'].includes(type)
        )
          return false;
      }
    }

    // 2. Suspect filter
    if (selectedSuspectId !== 'all') {
      const rel = Array.isArray(item.relatedSuspectIds) ? item.relatedSuspectIds : [];
      if (!rel.includes(selectedSuspectId)) return false;
    }

    // 3. Status filter
    if (statusFilter === 'bookmarked' && !bookmarkedIds.includes(item.evidenceId)) return false;
    if (statusFilter === 'reviewed' && !reviewedIds.includes(item.evidenceId)) return false;
    if (statusFilter === 'unreviewed' && reviewedIds.includes(item.evidenceId)) return false;

    // 4. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const sourceMatch = item.source?.toLowerCase().includes(q);
      const idMatch = item.evidenceId?.toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !sourceMatch && !idMatch) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Category Tabs Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#293444] pb-4">
        {[
          { key: 'all', label: `All Case Files (${evidenceList.length})` },
          {
            key: 'digital',
            label: 'Digital Evidence',
            count: evidenceList.filter((e) =>
              ['message', 'email', 'call_log', 'access_log'].includes(e.type)
            ).length,
          },
          {
            key: 'visual',
            label: 'Visual Evidence',
            count: evidenceList.filter((e) => ['cctv', 'photo', 'image'].includes(e.type)).length,
          },
          {
            key: 'official_report',
            label: 'Official Reports',
            count: evidenceList.filter((e) =>
              ['police_report', 'medical_report'].includes(e.type)
            ).length,
          },
          {
            key: 'witness_statement',
            label: 'Witness Statements',
            count: evidenceList.filter((e) => e.type === 'witness_statement').length,
          },
          {
            key: 'physical',
            label: 'Physical & Financial',
            count: evidenceList.filter((e) =>
              ['financial_record', 'handwritten_note', 'physical_evidence', 'document'].includes(e.type)
            ).length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              selectedCategory === tab.key
                ? 'bg-[#D94B4B] text-white font-bold shadow-md shadow-[#D94B4B]/20'
                : 'bg-[#121923] text-[#9CA3AF] hover:text-white border border-[#293444]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-gray-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filter Toolbar (Search + Suspect Filter + Status Filter) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#121923] p-3 rounded-2xl border border-[#293444]">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search clue title, source, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#18212D] border border-[#293444] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
          />
        </div>

        {/* Suspect Filter */}
        {suspects.length > 0 && (
          <div className="flex items-center space-x-2">
            <Users className="w-3.5 h-3.5 text-[#D6A85F] shrink-0" />
            <select
              value={selectedSuspectId}
              onChange={(e) => setSelectedSuspectId(e.target.value)}
              className="bg-[#18212D] border border-[#293444] rounded-xl px-2.5 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-[#D6A85F]"
            >
              <option value="all">All Suspects</option>
              {suspects.map((s) => (
                <option key={s.suspectId} value={s.suspectId}>
                  Suspect: {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Review / Bookmark Status Filter */}
        <div className="flex items-center space-x-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'bookmarked', label: `Bookmarked (${bookmarkedIds.length})` },
            { id: 'unreviewed', label: 'Unreviewed' },
            { id: 'reviewed', label: 'Reviewed' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                statusFilter === st.id
                  ? 'bg-[#18212D] text-[#D6A85F] font-bold border border-[#D6A85F]/50'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      {filteredEvidence.length === 0 ? (
        <div className="p-16 text-center text-xs text-gray-500 bg-[#121923] border border-[#293444] border-dashed rounded-2xl max-w-lg mx-auto">
          <Filter className="w-8 h-8 text-gray-600 mx-auto mb-3 stroke-1" />
          <p className="font-semibold text-white">No evidence records matched your filters.</p>
          <p className="mt-1 text-[#9CA3AF]">Try resetting the category or clearing the search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvidence.map((item) => {
            const isRev = reviewedIds.includes(item.evidenceId);
            const isBm = bookmarkedIds.includes(item.evidenceId);
            const conf = getEvidenceTypeConfig(item.type);
            const IconComponent = conf.icon;

            return (
              <div
                key={item.evidenceId}
                onClick={() => onInspect(item)}
                className={`bg-[#121923] border rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] group ${
                  isRev ? 'border-[#293444] opacity-90' : 'border-[#293444] hover:border-[#D6A85F]'
                }`}
              >
                <div>
                  {/* Top Bar with Reference ID, Type Tag & Bookmark/Review Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
                        {item.evidenceId}
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded border ${conf.bg} ${conf.color} ${conf.border}`}
                      >
                        <IconComponent className="w-3 h-3" />
                        <span>{conf.label}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onToggleBookmark(item.evidenceId)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBm ? 'text-[#D6A85F]' : 'text-gray-600 hover:text-gray-300'
                        }`}
                        title={isBm ? 'Remove Bookmark' : 'Bookmark Clue'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => onToggleReview(item.evidenceId)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isRev ? 'text-[#34D399]' : 'text-gray-600 hover:text-gray-300'
                        }`}
                        title={isRev ? 'Marked as Reviewed' : 'Mark as Reviewed'}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-bold text-base text-white group-hover:text-[#D6A85F] transition-colors line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Source Department pill */}
                  <p className="text-[10px] font-mono text-gray-400 mt-1 truncate">
                    SRC: {item.source || 'Crime Scene Recovery'}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Related Suspects tags if present */}
                  {item.relatedSuspectIds?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.relatedSuspectIds.map((sid) => {
                        const sObj = suspects.find((s) => s.suspectId === sid);
                        return (
                          <span
                            key={sid}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#18212D] text-gray-300 border border-[#293444]"
                          >
                            {sObj ? sObj.name : sid}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Location & Time Footer */}
                  <div className="mt-4 pt-3 border-t border-[#293444] flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="truncate max-w-[130px]">{item.discoveryLocation}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                {/* Inspect Action */}
                <div className="mt-4">
                  <button className="w-full py-2 rounded-xl bg-[#18212D] group-hover:bg-[#D94B4B] group-hover:text-white text-xs font-semibold text-gray-300 transition-colors flex items-center justify-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Case Evidence</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
