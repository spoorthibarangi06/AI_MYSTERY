import React from 'react';
import { Video, AlertTriangle, Clock, MapPin, Eye } from 'lucide-react';

export const CctvView = ({ evidence }) => {
  const content = evidence.content || {};
  const cameraLocation = content.cameraLocation || evidence.discoveryLocation || 'Surveillance Feed';
  const recordingTime = content.recordingTime || evidence.timestamp || 'Incident Night';
  const observations = Array.isArray(content.observations) ? content.observations : [];
  const transcript = content.transcript || evidence.description;

  return (
    <div className="bg-[#121923] border border-[#293444] rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-2xl">
      {/* CCTV Monitor Frame */}
      <div className="relative bg-black aspect-video overflow-hidden border-b border-[#293444]">
        <img
          src={evidence.assetUrl || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800'}
          alt={evidence.title}
          className="w-full h-full object-cover grayscale contrast-150 brightness-90"
        />

        {/* Scanlines overlay */}
        <div className="absolute inset-0 cctv-scanline opacity-75"></div>

        {/* Surveillance HUD Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#34D399] tracking-widest drop-shadow">
          <div className="flex items-center space-x-2 bg-black/60 px-2 py-0.5 rounded">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
            <span>REC • CAM-04 [ONLINE]</span>
          </div>
          <span className="bg-black/60 px-2 py-0.5 rounded">{recordingTime}</span>
        </div>

        <div className="absolute bottom-3 left-3 bg-black/60 px-2.5 py-1 rounded text-[11px] font-mono text-gray-300">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D6A85F]" />
            <span>LOC: {cameraLocation}</span>
          </div>
        </div>
      </div>

      {/* Forensic Log & Observations */}
      <div className="p-6 space-y-4 text-xs">
        <div>
          <h4 className="font-mono uppercase text-[#D6A85F] flex items-center space-x-1.5 mb-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Security Observation Summary</span>
          </h4>
          <p className="text-gray-300 leading-relaxed bg-[#18212D] p-4 rounded-xl border border-[#293444]">
            {transcript}
          </p>
        </div>

        {observations.length > 0 && (
          <div>
            <h4 className="font-mono uppercase text-[#9CA3AF] mb-2 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D94B4B]" />
              <span>Timestamped Anomalies</span>
            </h4>
            <div className="space-y-1.5">
              {observations.map((obs, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#18212D] border border-[#293444] flex items-start space-x-2 text-gray-300"
                >
                  <span className="text-[#D94B4B] font-mono font-bold shrink-0">#{idx + 1}</span>
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
