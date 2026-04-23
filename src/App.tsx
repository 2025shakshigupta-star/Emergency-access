import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Flame, 
  Stethoscope, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  Bell, 
  Users, 
  ShieldAlert,
  Clock,
  Heart,
  Mic,
  Languages,
  Volume2,
  X,
  Shield,
  CheckCircle2,
  XCircle,
  Map as MapIcon,
  Search
} from 'lucide-react';
import { EmergencyType, Responder, UserLocation } from './types';
import { EMERGENCY_COLORS, MOCK_RESPONDERS } from './constants';

// --- Components ---

const VoiceAssistant = ({ onClose, onConfirm, onTranslate }: { onClose: () => void, onConfirm: (transcript: string) => void, onTranslate: (transcript: string) => void }) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    let timeout: any;
    if (isListening) {
      timeout = setTimeout(() => {
        setTranscript("I need an ambulance at Baker Street...");
        setIsListening(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-x-0 bottom-0 z-[110] bg-white border-t border-slate-100 rounded-t-3xl p-8 flex flex-col items-center gap-6 shadow-2xl"
    >
      <div className="flex w-full justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Voice Command Active</span>
        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <AnimatePresence>
          {isListening && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsListening(!isListening)}
          className={`w-20 h-20 rounded-full flex items-center justify-center relative z-10 transition-colors ${isListening ? 'bg-blue-600' : 'bg-slate-100'}`}
        >
          <Mic className={`w-8 h-8 ${isListening ? 'text-white' : 'text-slate-400'}`} />
        </button>
      </div>

      <div className="text-center w-full min-h-[60px]">
        {isListening ? (
          <p className="text-blue-500 font-bold text-xs animate-pulse tracking-widest">LISTENING...</p>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-slate-400 text-[10px] uppercase font-bold mb-2 tracking-widest">Transcript detected</p>
            <p className="text-slate-800 italic text-lg leading-tight font-medium">"{transcript}"</p>
          </motion.div>
        )}
      </div>

      {!isListening && (
        <div className="w-full flex flex-col gap-3">
          <button 
            className="w-full bg-blue-600 p-4 rounded-xl font-bold uppercase tracking-widest active:scale-95 transition-all text-white text-sm shadow-lg shadow-blue-100"
            onClick={() => onConfirm(transcript)}
          >
            Confirm Alert
          </button>
          <button 
            className="w-full bg-slate-100 p-4 rounded-xl font-bold uppercase tracking-widest active:scale-95 transition-all text-slate-500 text-sm flex items-center justify-center gap-2"
            onClick={() => onTranslate(transcript)}
          >
            <Languages className="w-4 h-4" />
            Send to Translator
          </button>
        </div>
      )}
    </motion.div>
  );
}

const Translator = ({ onClose, initialText = "" }: { onClose: () => void, initialText?: string }) => {
  const [text, setText] = useState(initialText);
  const [translated, setTranslated] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (initialText) {
      handleTranslate();
    }
  }, []);

  const handleTranslate = () => {
    const textToTranslate = text || initialText;
    if (!textToTranslate) return;
    setIsTranslating(true);
    setTimeout(() => {
      setTranslated("NECESITO AYUDA MÉDICA URGENTE");
      setIsTranslating(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-4 z-[110] bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-slate-500">Translator Terminal</span>
        </div>
        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4 text-slate-800">
        <textarea 
          placeholder="Type or speak to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm focus:border-blue-500 outline-none resize-none text-slate-700"
        />

        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
          <span>ENGLISH</span>
          <div className="h-px bg-slate-100 flex-1 mx-4" />
          <span>SPANISH</span>
        </div>

        <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm relative group">
          {isTranslating ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-sm">
              <p className="text-[10px] font-bold text-blue-500 animate-pulse tracking-widest">TRANSLATING...</p>
            </div>
          ) : (
            <p className={`italic ${translated ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
              {translated || "Translation will appear here..."}
            </p>
          )}
          {translated && (
            <button className="absolute bottom-2 right-2 p-2 bg-white border border-slate-100 rounded-lg text-slate-600 hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <button 
        onClick={handleTranslate}
        disabled={isTranslating || !text}
        className="w-full bg-blue-600 disabled:opacity-50 p-4 rounded-xl font-bold uppercase tracking-widest transition-all text-white text-sm shadow-lg shadow-blue-100"
      >
        Translate Now
      </button>
    </motion.div>
  );
};

const Header = ({ onBack, title }: { onBack?: () => void, title?: string }) => (
  <header className="flex items-center justify-between p-4 sticky top-0 bg-white border-b border-slate-100 z-50">
    {onBack ? (
      <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-900">
        <ChevronLeft className="w-6 h-6" />
      </button>
    ) : (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">Stitch</span>
      </div>
    )}
    <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{title || "SYSTEM ACTIVE"}</h1>
    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors relative text-slate-900">
      <Bell className="w-5 h-5" />
      <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
    </button>
  </header>
);

const UserAvatar = ({ name, type }: { name: string, type: Responder['type'] }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  const colors = {
    DOCTOR: 'bg-blue-50 text-blue-600 border border-blue-100',
    HOSPITAL: 'bg-red-50 text-red-600 border border-red-100',
    CITIZEN: 'bg-slate-50 text-slate-600 border border-slate-100'
  };
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${colors[type]}`}>
      {initials}
    </div>
  );
};

// --- Main App ---

const IncidentFeedScreen = () => {
  const incidents = [
    { title: 'Road Accident', type: 'MEDICAL', dist: '0.4 mi', time: '2m ago', desc: 'Two-vehicle collision at Main & 4th.' },
    { title: 'Structural Fire', type: 'FIRE', dist: '1.1 mi', time: '8m ago', desc: 'Kitchen fire reported in apartment complex.' },
    { title: 'Suspicious Activity', type: 'SECURITY', dist: '2.5 mi', time: '15m ago', desc: 'Possible break-in reported at 55 Industrial Dr.' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black italic text-slate-800">COMMUNITY FEED</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Live Updates</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Nearby Incidents</p>
        {incidents.map((incident, i) => (
          <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              incident.type === 'FIRE' ? 'bg-orange-100 text-orange-600' : 
              incident.type === 'MEDICAL' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-700'
            }`}>
              {incident.type === 'FIRE' ? <Flame className="w-5 h-5" /> : 
               incident.type === 'MEDICAL' ? <Stethoscope className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-slate-800">{incident.title}</h3>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{incident.time}</span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mb-2">{incident.desc}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[9px] font-black uppercase text-blue-500">
                  <MapPin className="w-2 h-2" />
                  {incident.dist} away
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <button className="text-[9px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-24 h-24 rotate-12" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-black mb-1 italic">BECOME A VOLUNTEER</h3>
            <p className="text-xs opacity-80 mb-4 leading-relaxed font-medium">Join 400+ local responders and help your community when it matters most.</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg">
              Register as Responder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NetworkScreen = () => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
      <h2 className="text-xl font-black italic mb-6 text-slate-800">SUPPORT NETWORK</h2>
      
      <div className="space-y-6">
        <section>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Facility Legend</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-white border border-blue-100 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-xs font-bold text-slate-700">Medical Center</span>
            </div>
            <div className="p-3 bg-white border border-orange-100 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs font-bold text-slate-700">Fire Station</span>
            </div>
          </div>
        </section>

        <section>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Priority Responders</p>
          <div className="space-y-3">
            {[
              { name: 'Mercy Hospital', dist: '0.8 mi', status: 'AVAILABLE', icon: '🏥' },
              { name: 'Station 42 (Fire)', dist: '1.4 mi', status: 'STANDBY', icon: '🚒' },
              { name: 'Red Cross Depot', dist: '2.1 mi', status: 'AVAILABLE', icon: '📦' },
            ].map((r, i) => (
              <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-lg shadow-inner">{r.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{r.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{r.dist} AWAY</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                  r.status === 'AVAILABLE' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="p-4 bg-blue-50 border border-dashed border-blue-100 rounded-2xl">
          <p className="text-xs font-bold text-blue-600 mb-1 italic">Network Security Note</p>
          <p className="text-[10px] text-slate-500 leading-relaxed">All communications within the Crisis Network are encrypted using military-grade AES-256 standards. Your medical profile is only decrypted upon active SOS trigger.</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<'home' | 'tracking' | 'terminal' | 'network'>('home');
  const [activeEmergency, setActiveEmergency] = useState<EmergencyType>(null);
  const [location, setLocation] = useState<UserLocation>({ lat: 51.505, lng: -0.09 });
  const [responders, setResponders] = useState<Responder[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [activeFeature, setActiveFeature] = useState<'voice' | 'translator' | null>(null);
  const [sharedText, setSharedText] = useState("");

  // Simulate GPS tracking
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          // Fallback to mock location
        }
      );
    }
  }, []);

  const triggerEmergency = (type: EmergencyType) => {
    setActiveEmergency(type);
    setScreen('tracking');
    setActiveFeature(null);
    
    // Simulate responders being notified
    setTimeout(() => {
      setResponders([MOCK_RESPONDERS[0], MOCK_RESPONDERS[1]]);
      setNotificationMsg(`${type} SIGNAL BROADCASTED. EMERGENCY SERVICES ENGAGED.`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 2000);

    setTimeout(() => {
      setResponders(MOCK_RESPONDERS);
    }, 5000);
  };

  const handleBack = () => {
    if (screen === 'tracking') {
      setScreen('home');
      setActiveEmergency(null);
      setResponders([]);
      setActiveFeature(null);
    } else if (screen === 'emergency-selection') {
      setScreen('home');
      setActiveFeature(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans max-w-md mx-auto relative overflow-hidden flex flex-col shadow-2xl border-x border-[#334155]">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <Header title="STANDBY" />
            
            <main className="flex-1 p-6 flex flex-col justify-between">
              <section className="text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8] font-bold mb-1">Emergency Dispatch</p>
                <h2 className="text-2xl font-black tracking-tight mb-8">NEED IMMEDIATE HELP?</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button 
                    onClick={() => triggerEmergency('FIRE')}
                    className="group flex flex-col items-center justify-center p-6 type-card-fire rounded-2xl transition-all active:scale-95 shadow-sm"
                  >
                    <div className="w-14 h-14 bg-[#F97316] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <Flame className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Fire Dept</span>
                  </button>
                  
                  <button 
                    onClick={() => triggerEmergency('MEDICAL')}
                    className="group flex flex-col items-center justify-center p-6 type-card-medical rounded-2xl transition-all active:scale-95 shadow-sm"
                  >
                    <div className="w-14 h-14 bg-[#3B82F6] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Medical</span>
                  </button>

                  <button 
                    onClick={() => triggerEmergency('SECURITY')}
                    className="group flex flex-col items-center justify-center p-6 type-card-security rounded-2xl transition-all active:scale-95 shadow-sm col-span-2"
                  >
                    <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">Security Task Force</span>
                  </button>
                </div>

                <div className="flex gap-4 mb-8">
                   <button 
                    onClick={() => setActiveFeature('voice')}
                    className="flex-1 flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-all text-xs font-bold text-slate-500 uppercase tracking-widest"
                  >
                    <Mic className="w-4 h-4" />
                    Voice
                  </button>
                  <button 
                    onClick={() => setActiveFeature('translator')}
                    className="flex-1 flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-all text-xs font-bold text-slate-500 uppercase tracking-widest"
                  >
                    <Languages className="w-4 h-4" />
                    Translate
                  </button>
                </div>
              </section>

              <section className="flex-1 flex items-center justify-center py-4">
                <div className="relative">
                  <button 
                    id="sos-button"
                    onClick={() => triggerEmergency('SOS')}
                    className="w-52 h-52 rounded-full flex flex-col items-center justify-center text-white sos-gradient active:scale-90 transition-all relative z-10"
                  >
                    <span className="text-6xl font-black tracking-tighter uppercase mb-2 italic">SOS</span>
                    <div className="h-px w-24 bg-white/30 mb-2" />
                    <span className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">Press for help</span>
                  </button>
                </div>
              </section>

              <div className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Scan Active</p>
                  <p className="text-xs font-mono text-blue-600">42.3601° N, 71.0589° W</p>
                </div>
              </div>
            </main>

            <AnimatePresence>
              {activeFeature === 'voice' && (
                <VoiceAssistant 
                  onClose={() => setActiveFeature(null)} 
                  onConfirm={(msg) => {
                    setNotificationMsg(`VOICE ALERT CONFIRMED: ${msg.toUpperCase()}`);
                    triggerEmergency('SOS');
                  }}
                  onTranslate={(msg) => {
                    setSharedText(msg);
                    setActiveFeature('translator');
                  }}
                />
              )}
              {activeFeature === 'translator' && (
                <Translator 
                  onClose={() => {
                    setActiveFeature(null);
                    setSharedText("");
                  }} 
                  initialText={sharedText}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {screen === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <Header onBack={() => setScreen('home')} title="FEED DISCOVERY" />
            <IncidentFeedScreen />
          </motion.div>
        )}

        {screen === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <Header onBack={() => setScreen('home')} title="NODE EXPLORER" />
            <NetworkScreen />
          </motion.div>
        )}

        {screen === 'tracking' && (
          <motion.div
            key="tracking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full bg-white"
          >
            <Header 
              onBack={handleBack} 
              title="EMERGENCY BROADCAST"
            />
            
            <div className="relative flex-1 bg-slate-50 overflow-hidden border-b border-slate-100">
              {/* Engineering Grid Map */}
              <div className="absolute inset-0 opacity-20" 
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px' 
                }}
              />

              {/* Radar Sweeper Simulation */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-blue-500/10 rounded-full pointer-events-none"
              />

              {/* User Pulsing Location Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0.05, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-16 h-16 rounded-full absolute -translate-x-1/2 -translate-y-1/2 ${activeEmergency ? EMERGENCY_COLORS[activeEmergency].bg : 'bg-red-500'}/20 border border-current shadow-xl`}
                />
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-xl z-30 ${activeEmergency ? EMERGENCY_COLORS[activeEmergency].bg : 'bg-red-500'}`} />
              </div>

              {responders.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: (r.lng * 1200), 
                    y: (r.lat * 1200) 
                  }}
                  className="absolute top-1/2 left-1/2 z-20"
                >
                  <div className="relative">
                    <div className={`p-1.5 rounded-lg border border-white shadow-xl ${
                      r.type === 'DOCTOR' ? 'bg-blue-600' : 
                      r.type === 'HOSPITAL' ? 'bg-red-600' : 'bg-slate-600'
                    }`}>
                      {r.type === 'DOCTOR' && <Stethoscope className="w-3.5 h-3.5 text-white" />}
                      {r.type === 'HOSPITAL' && <AlertTriangle className="w-3.5 h-3.5 text-white" />}
                      {r.type === 'CITIZEN' && <Users className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Status Banner */}
              <div className="absolute top-4 left-4 right-4 z-40 p-3 rounded-xl bg-white border border-slate-100 shadow-xl flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center animate-pulse ${activeEmergency ? EMERGENCY_COLORS[activeEmergency].bg : 'bg-red-500'}`}>
                  <ShieldAlert className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Response Status</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-green-600 uppercase tracking-tighter">Signal Connected</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Sheet Terminals */}
            <motion.div 
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              className="bg-white rounded-t-[24px] p-6 shadow-2xl z-50 border-t border-slate-100"
            >
              <div className="w-10 h-1 bg-slate-100 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Responders</p>
                <div className="px-2 py-0.5 bg-green-50 border border-green-100 text-green-600 text-[9px] font-bold rounded">
                  ENCRYPTED CHANNEL
                </div>
              </div>

              <div className="space-y-3 mb-6 max-h-[25vh] overflow-y-auto pr-1">
                {responders.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
                       <Search className="w-3 h-3 text-blue-500 animate-spin" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Searching nearby nodes...</p>
                    </div>
                  </div>
                ) : (
                  responders.map((responder) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={responder.id} 
                      className="p-3 bg-white rounded-xl flex items-center gap-3 border border-slate-100 shadow-sm"
                    >
                      <UserAvatar name={responder.name} type={responder.type} />
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs block text-slate-800">{responder.name}</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{responder.distance} • LOC_ACTIVE</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setNotificationMsg(`CONTACTING ${responder.name.toUpperCase()}...`);
                            setShowNotification(true);
                            setTimeout(() => setShowNotification(false), 3000);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100"
                        >
                          Notify
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleBack}
                  className="p-4 bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-100 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Cancel Request
                </button>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">User Status</p>
                    <p className="text-[10px] font-bold text-slate-700 uppercase italic">Safe Zone Identified</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-[100] px-4 pointer-events-none"
          >
            <div className="bg-white border border-blue-100 text-slate-900 p-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
              <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
              <p className="text-[10px] font-bold text-slate-800 leading-tight flex-1 uppercase tracking-wider">{notificationMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-4 pb-8 flex items-center justify-center gap-12 bg-white border-t border-slate-100">
        <button 
          onClick={() => setScreen('home')}
          className="flex flex-col items-center gap-1 group"
        >
          <ShieldAlert className={`w-5 h-5 ${screen === 'home' || screen === 'tracking' ? 'text-red-500' : 'text-slate-400'}`} />
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${screen === 'home' || screen === 'tracking' ? 'text-red-500' : 'text-slate-400'}`}>Alerts</span>
        </button>
        <button 
          onClick={() => setScreen('terminal')}
          className="flex flex-col items-center gap-1"
        >
          <MessageSquare className={`w-5 h-5 ${screen === 'terminal' ? 'text-blue-500' : 'text-slate-400'}`} />
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${screen === 'terminal' ? 'text-blue-500' : 'text-slate-400'}`}>Feed</span>
        </button>
        <button 
          onClick={() => setScreen('network')}
          className="flex flex-col items-center gap-1"
        >
          <Users className={`w-5 h-5 ${screen === 'network' ? 'text-blue-500' : 'text-slate-400'}`} />
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${screen === 'network' ? 'text-blue-500' : 'text-slate-400'}`}>Network</span>
        </button>
      </footer>
    </div>
  );
}


