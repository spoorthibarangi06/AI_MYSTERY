import React from 'react';
import { Clock, Users, FileSearch } from 'lucide-react';

export const TimelineView = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-[#121923] border border-[#293444] rounded-2xl p-12 text-center text-xs text-[#9CA3AF]">
        Timeline events are being compiled by the forensic team.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-8">
        <h3 className="text-xl font-heading font-bold text-white">Chronological Case Timeline</h3>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Compare suspect statements against verified minute-by-minute activity logs to detect false alibis.
        </p>
      </div>

      <div className="relative border-l-2 border-[#293444] ml-4 sm:ml-6 space-y-8 pb-4">
        {timeline.map((event, idx) => (
          <div key={event.eventId || idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline bullet icon */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#18212D] border-2 border-[#D6A85F] group-hover:border-[#D94B4B] group-hover:scale-125 transition-all"></div>

            <div className="bg-[#121923] border border-[#293444] group-hover:border-[#293444]/90 rounded-2xl p-5 shadow-lg transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-sm font-heading font-bold text-white group-hover:text-[#D6A85F] transition-colors">
                  {event.title}
                </span>
                <span className="inline-flex items-center space-x-1.5 text-xs font-mono px-2.5 py-0.5 rounded bg-[#18212D] text-[#D6A85F] border border-[#293444]">
                  <Clock className="w-3 h-3" />
                  <span>{event.dateTime}</span>
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{event.description}</p>

              {(event.relatedSuspects?.length > 0 || event.relatedEvidence?.length > 0) && (
                <div className="mt-4 pt-3 border-t border-[#293444] flex flex-wrap gap-4 text-[11px] font-mono text-[#9CA3AF]">
                  {event.relatedSuspects?.length > 0 && (
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D94B4B]" />
                      <span>Associated: {event.relatedSuspects.join(', ')}</span>
                    </div>
                  )}
                  {event.relatedEvidence?.length > 0 && (
                    <div className="flex items-center space-x-1.5">
                      <FileSearch className="w-3.5 h-3.5 text-blue-400" />
                      <span>Clues: {event.relatedEvidence.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
