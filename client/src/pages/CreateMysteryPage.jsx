import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mysteryService } from '../services/mysteryService';
import { Sparkles, AlertCircle, HelpCircle, ArrowRight, BookOpen, Layers } from 'lucide-react';

const CATEGORIES = [
  'Murder Mystery',
  'Theft',
  'Missing Person',
  'Cybercrime',
  'Corporate Espionage',
  'Hidden Identity',
  'General Mystery',
];

const DIFFICULTIES = [
  { level: 'Easy', desc: 'Direct clues, 3-4 suspects, simple timeline.' },
  { level: 'Medium', desc: 'Conflicting alibis, 4-5 suspects, connecting clues.' },
  { level: 'Hard', desc: 'Complex timeline, 5-6 suspects, nuanced red herrings.' },
];

export const CreateMysteryPage = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('Murder Mystery');
  const [difficulty, setDifficulty] = useState('Medium');
  const [suspectCount, setSuspectCount] = useState(4);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleExampleClick = (example) => {
    setPrompt(example.scenario);
    setCategory(example.category);
    setTitle(example.title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (prompt.trim().length < 30) {
      setError('Scenario must contain at least 30 characters.');
      return;
    }
    if (prompt.trim().length > 2000) {
      setError('Scenario cannot exceed 2000 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await mysteryService.createMystery({
        title: title.trim(),
        prompt: prompt.trim(),
        category,
        difficulty,
        suspectCount: Number(suspectCount),
      });

      // Navigate to the real-time generation progress screen
      navigate(`/generating/${res.data._id}`);
    } catch (err) {
      setError(err.message || 'Failed to initiate mystery generation.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#18212D] border border-[#293444] text-xs font-mono text-[#D6A85F] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D94B4B]" />
            <span>AI INVESTIGATION ARCHITECT</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Create New Mystery Case</h1>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Provide a short story or situation. Gemini AI will synthesize an airtight mystery room complete with suspects,
            surveillance logs, and forensic clues.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center space-x-3 text-xs text-[#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Case Details Card */}
          <div className="bg-[#121923] border border-[#293444] rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Mystery Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-[#9CA3AF]">
                  Case Title <span className="text-gray-500">(Optional)</span>
                </label>
                <span className="text-[11px] text-[#9CA3AF]">Leave blank for AI-generated title</span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Locked Chamber of St. Claire"
                className="w-full px-4 py-2.5 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A85F] transition-colors"
              />
            </div>

            {/* Story / Scenario */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-[#9CA3AF]">
                  Investigation Scenario / Story <span className="text-[#D94B4B]">*</span>
                </label>
                <span className={`text-[11px] font-mono ${prompt.length > 2000 ? 'text-[#EF4444]' : 'text-[#9CA3AF]'}`}>
                  {prompt.length} / 2,000 chars (min 30)
                </span>
              </div>
              <textarea
                required
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the incident, victim, crime scene, or premise... E.g. A wealthy tech founder is found unconscious inside his locked glass penthouse office. Four senior executives were present for a late-night board vote. The security system logs contradict their statements..."
                className="w-full px-4 py-3 bg-[#18212D] border border-[#293444] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D94B4B] transition-colors resize-y leading-relaxed"
              />
            </div>

            {/* Example Starters */}
            <div className="pt-2">
              <span className="text-xs font-mono text-[#D6A85F] flex items-center space-x-1 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>INSPIRATION DOSSIERS (CLICK TO LOAD)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleExampleClick({
                      title: 'The Midnight Museum Heist',
                      category: 'Theft',
                      scenario:
                        'A priceless Renaissance crown was stolen from the central display case during a thunderstorm power flicker. The museum curator, head guard, lighting technician, and an eccentric foreign patron all claim they were in different wings of the building.',
                    })
                  }
                  className="p-3 bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] rounded-xl text-left transition-colors text-xs text-[#9CA3AF] hover:text-white"
                >
                  <p className="font-semibold text-white">The Midnight Museum Heist</p>
                  <p className="line-clamp-2 mt-1">A priceless Renaissance crown stolen during a power flicker...</p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExampleClick({
                      title: 'The Bio-Lab Sabotage',
                      category: 'Corporate Espionage',
                      scenario:
                        'Cryogenic vials containing the cure for an autoimmune syndrome were purged at 2:00 AM. Only four researchers had badge access to the sterile vault. Surveillance showed someone in protective gear entering, but the audit timestamps are scrambled.',
                    })
                  }
                  className="p-3 bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] rounded-xl text-left transition-colors text-xs text-[#9CA3AF] hover:text-white"
                >
                  <p className="font-semibold text-white">The Bio-Lab Sabotage</p>
                  <p className="line-clamp-2 mt-1">Cryogenic vials purged at 2:00 AM with scrambled audit timestamps...</p>
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div className="bg-[#121923] border border-[#293444] rounded-2xl p-5">
              <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-3">Case Category</label>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      category === cat
                        ? 'bg-[#D94B4B]/15 text-[#D94B4B] border border-[#D94B4B]/40'
                        : 'bg-[#18212D] text-[#9CA3AF] hover:text-white border border-[#293444]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="bg-[#121923] border border-[#293444] rounded-2xl p-5">
              <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-3">Difficulty Level</label>
              <div className="space-y-2">
                {DIFFICULTIES.map((d) => (
                  <div
                    key={d.level}
                    onClick={() => setDifficulty(d.level)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      difficulty === d.level
                        ? 'bg-[#D6A85F]/15 border-[#D6A85F] text-white'
                        : 'bg-[#18212D] border-[#293444] text-[#9CA3AF] hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono">{d.level}</span>
                      {difficulty === d.level && <span className="w-2 h-2 rounded-full bg-[#D6A85F]"></span>}
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suspect Count */}
            <div className="bg-[#121923] border border-[#293444] rounded-2xl p-5">
              <label className="block text-xs font-mono uppercase text-[#9CA3AF] mb-3">Number of Suspects</label>
              <div className="grid grid-cols-2 gap-2">
                {[3, 4, 5, 6].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSuspectCount(count)}
                    className={`py-3 rounded-xl font-mono text-sm font-bold border transition-all ${
                      suspectCount === count
                        ? 'bg-[#34D399]/15 border-[#34D399] text-[#34D399]'
                        : 'bg-[#18212D] border-[#293444] text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {count} Suspects
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-4 leading-relaxed">
                Selected suspect count will be strictly reflected in the generated investigation blueprint.
              </p>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#D94B4B] hover:bg-[#b83b3b] disabled:opacity-50 text-white font-semibold text-base transition-all shadow-xl shadow-[#D94B4B]/30 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>INITIALIZING INVESTIGATION PIPELINE...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Synthesize Mystery Room with Gemini AI</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
