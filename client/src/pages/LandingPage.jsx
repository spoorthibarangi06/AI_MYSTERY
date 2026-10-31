import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  Search,
  FileQuestion,
  Fingerprint,
  Camera,
  MessageSquare,
  FileText,
  Clock,
  Award,
  ChevronRight,
  Flame,
} from 'lucide-react';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F3F4F6]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-[#293444]/60">
        {/* Subtle Noir background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#D94B4B]/10 via-[#18212D]/40 to-transparent pointer-events-none blur-3xl"></div>
        <div className="absolute -top-12 right-12 w-96 h-96 bg-[#D6A85F]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#18212D] border border-[#293444] text-xs font-mono text-[#D6A85F] mb-6">
            <Flame className="w-3.5 h-3.5 text-[#D94B4B]" />
            <span>POWERED BY GOOGLE GEMINI 2.5 AI ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Every Mystery Has a Secret. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94B4B] via-[#E27070] to-[#D6A85F]">
              Can You Uncover It?
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto font-normal">
            Create your own mystery scenario, inspect AI-generated forensic clues, analyze surveillance feeds and
            suspect alibis, and deduce who is behind the crime.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/create-mystery' : '/login'}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-[#D94B4B] hover:bg-[#b83b3b] text-white transition-all shadow-lg shadow-[#D94B4B]/25 flex items-center justify-center space-x-2 hover:scale-[1.02]"
            >
              <span>Create Your Mystery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-[#18212D] hover:bg-[#202b3a] border border-[#293444] hover:border-[#D6A85F]/50 text-white transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4 text-[#D6A85F]" />
              <span>How It Works</span>
            </a>
          </div>

          {/* Detective Caseboard Visual Preview */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl bg-[#121923] border border-[#293444] p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#293444] text-xs font-mono text-[#9CA3AF]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                <span>INVESTIGATION ROOM TERMINAL: ACTIVE CASE FILE #8841-A</span>
              </div>
              <div className="hidden sm:flex items-center space-x-4 text-[#D6A85F]">
                <span>EVIDENCE INTEGRITY: VERIFIED</span>
                <span>LOGICAL SOLVABILITY: AIRTIGHT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-left">
              <div className="bg-[#18212D] border border-[#293444] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[#D94B4B] text-xs font-mono mb-2">
                  <Fingerprint className="w-4 h-4" />
                  <span>SUSPECT PROFILES</span>
                </div>
                <p className="text-sm font-semibold text-white">4 Distinct Profiles</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Unique motives, contradictory alibis, behavioral observations, and hidden intentions.
                </p>
              </div>

              <div className="bg-[#18212D] border border-[#293444] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[#D6A85F] text-xs font-mono mb-2">
                  <Camera className="w-4 h-4" />
                  <span>SURVEILLANCE & CHATS</span>
                </div>
                <p className="text-sm font-semibold text-white">Multi-Format Evidence</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  WhatsApp dialogue logs, CCTV timestamp footage, forensic photos, and audit ledgers.
                </p>
              </div>

              <div className="bg-[#18212D] border border-[#293444] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[#34D399] text-xs font-mono mb-2">
                  <Award className="w-4 h-4" />
                  <span>FINAL ACCUSATION</span>
                </div>
                <p className="text-sm font-semibold text-white">Detective Verdict</p>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  Single-chance indictment with Gemini evaluation revealing the culprit's full methodology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#0B0F14] border-b border-[#293444]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#D94B4B] tracking-wider uppercase">INVESTIGATION PROTOCOL</span>
            <h2 className="text-3xl font-heading font-bold text-white mt-2">How AI Mystery Room Works</h2>
            <p className="text-[#9CA3AF] mt-3">From a single sentence to a full multi-evidence crime scene.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative bg-[#121923] border border-[#293444] rounded-xl p-6 hover:border-[#D94B4B] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#D94B4B]/10 border border-[#D94B4B]/30 text-[#D94B4B] font-mono font-bold flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-lg font-heading font-semibold text-white">Create Your Story</h3>
              <p className="text-sm text-[#9CA3AF] mt-2">
                Type any premise or scenario—a locked room theft, a corporate betrayal, or a missing artifact.
              </p>
            </div>

            <div className="relative bg-[#121923] border border-[#293444] rounded-xl p-6 hover:border-[#D6A85F] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#D6A85F]/10 border border-[#D6A85F]/30 text-[#D6A85F] font-mono font-bold flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-lg font-heading font-semibold text-white">AI Builds Investigation</h3>
              <p className="text-sm text-[#9CA3AF] mt-2">
                Gemini constructs an airtight blueprint: suspect profiles, alibis, timelines, and verifiable clues.
              </p>
            </div>

            <div className="relative bg-[#121923] border border-[#293444] rounded-xl p-6 hover:border-[#34D399] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] font-mono font-bold flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-lg font-heading font-semibold text-white">Examine Evidence</h3>
              <p className="text-sm text-[#9CA3AF] mt-2">
                Review WhatsApp chats, CCTV records, forensic photos, and witness interviews. Bookmark key leads.
              </p>
            </div>

            <div className="relative bg-[#121923] border border-[#293444] rounded-xl p-6 hover:border-[#D94B4B] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#D94B4B]/10 border border-[#D94B4B]/30 text-[#D94B4B] font-mono font-bold flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-lg font-heading font-semibold text-white">Identify Culprit</h3>
              <p className="text-sm text-[#9CA3AF] mt-2">
                Submit your official accusation and reasoning. Receive the detective verdict and full case breakdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#121923]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#D6A85F] tracking-wider uppercase">ARCHITECTURAL FEATURES</span>
            <h2 className="text-3xl font-heading font-bold text-white mt-2">Engineered for Deduction</h2>
            <p className="text-[#9CA3AF] mt-3">
              Built on Spec-Driven Development to guarantee every generated mystery is logically solvable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <MessageSquare className="w-6 h-6 text-[#D94B4B] mb-3" />
              <h4 className="text-base font-semibold text-white">Fictional WhatsApp Chats</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Natural back-and-forth messaging displaying timestamps, deleted messages, and subtle slips of tongue.
              </p>
            </div>

            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <Camera className="w-6 h-6 text-[#D6A85F] mb-3" />
              <h4 className="text-base font-semibold text-white">CCTV & Surveillance Logs</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Time-stamped corridor cameras, terminal access logs, and visual surveillance observations.
              </p>
            </div>

            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <Clock className="w-6 h-6 text-[#34D399] mb-3" />
              <h4 className="text-base font-semibold text-white">Chronological Case Timeline</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Cross-reference suspect alibis against confirmed minute-by-minute events to expose contradictions.
              </p>
            </div>

            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <FileText className="w-6 h-6 text-[#D94B4B] mb-3" />
              <h4 className="text-base font-semibold text-white">Physical Clues & Documents</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Bank records, forensic boot prints, keycard logs, and witness interview depositions.
              </p>
            </div>

            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <ShieldAlert className="w-6 h-6 text-[#D6A85F] mb-3" />
              <h4 className="text-base font-semibold text-white">Confidential Solution Vault</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                The culprit is strictly protected in isolated database schemas and never leaked to client requests.
              </p>
            </div>

            <div className="bg-[#18212D] border border-[#293444] rounded-xl p-6">
              <Award className="w-6 h-6 text-[#34D399] mb-3" />
              <h4 className="text-base font-semibold text-white">Deductive Performance Rating</h4>
              <p className="text-sm text-[#9CA3AF] mt-1">
                Track reviewed evidence percentages, time elapsed, and your overall case solve accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
