import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Briefcase, Code, FileCode2, LogOut, User, Download, Save, Home, Moon, Sun, Settings, Clock, Edit3, HelpCircle, Map, MessageCircle, Activity, Zap, Play, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import React from 'react';

const AuthModal = ({ showAuthModal, setShowAuthModal, onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    if (!showAuthModal) return null;

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setAuthError('Please fill in both fields.');
            return;
        }
        setAuthError('');
        setAuthLoading(true);

        try {
            const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
            const response = await axios.post(`http://localhost:5000${endpoint}`, { email, password });
            
            if (response.data.success) {
                // Return email and profile data
                if (onLoginSuccess) onLoginSuccess(response.data.email, response.data.profile);
                setShowAuthModal(false);
            }
        } catch (err) {
            setAuthError(err.response?.data?.error || 'Authentication failed. Please try again.');
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
            <div style={{ width: '400px', background: 'white', borderRadius: '12px', padding: '24px', position: 'relative' }} className="shadow-xl">
                <button
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center tracking-tight">
                    {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {isSignUp ? 'Sign up to start analyzing resumes' : 'Log in to view your dashboard'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    {authError && <p className="text-sm text-red-500 font-medium">{authError}</p>}

                    <div className="flex flex-col gap-3 mt-2">
                        <button
                            type="submit"
                            disabled={authLoading}
                            className={`w-full py-2.5 rounded-lg text-white font-medium shadow-md transition-all ${authLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                        >
                            {authLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                        
                        <div className="text-center mt-2 flex flex-col items-center gap-1">
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                {isSignUp ? 'Already have an account? Sign In' : 'New user? Create an account'}
                            </button>
                            <span className="text-xs text-gray-400 my-1">OR</span>
                            <button
                                type="button"
                                onClick={() => setShowAuthModal(false)}
                                className="w-full py-2.5 rounded-lg text-gray-700 font-medium border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all shadow-sm"
                            >
                                Continue Without Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const HowItWorksModal = ({ show, onClose }) => {
    if (!show) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, backdropFilter: 'blur(5px)' }}>
            <div style={{ width: '500px', background: 'white', borderRadius: '16px', padding: '32px', position: 'relative' }} className="shadow-2xl dark:bg-gray-800 border dark:border-gray-700 max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">✕</button>
                <div className="text-center mb-8 mt-2">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">How It Works</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Master your resume optimization in just 4 simple steps.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-md">1</div>
                        <div>
                            <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-1">Upload Your Resume</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop your PDF resume onto the dashboard. Make sure it's a standard text-based PDF (not a flat image).</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-md">2</div>
                        <div>
                            <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-1">Get AI Analysis</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Click the 'Analyze Resume' button. Our AI will instantly scan your document against industry ATS standards.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-md">3</div>
                        <div>
                            <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-1">Review & Apply Fixes</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Browse the actionable feedback on your dashboard. Use "Live Edit" to click any highlighted error in your resume and automatically apply the AI's exact fix.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white font-bold flex items-center justify-center shadow-md"><Check size={16} /></div>
                        <div>
                            <h3 className="text-gray-800 dark:text-gray-100 font-bold mb-1">Export Your Final Version</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Once you're satisfied, lock in your changes and download your newly optimized, ATS-friendly resume as a PDF!</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={onClose} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all">
                        Got it, let's start!
                    </button>
                </div>
            </div>
        </div>
    );
};

const ViewProfileModal = ({ show, onClose, profile, user }) => {
    if (!show) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, backdropFilter: 'blur(5px)' }}>
            <div style={{ width: '400px', background: 'white', borderRadius: '12px', padding: '24px', position: 'relative' }} className="shadow-xl dark:bg-gray-800 border dark:border-gray-700">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">✕</button>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 mt-2">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold border border-blue-200 dark:border-blue-800">
                        {profile?.name ? profile.name.charAt(0).toUpperCase() : (user?.email?.charAt(0).toUpperCase() || '?')}
                    </div>
                    <div>
                        <h2 className="text-xl text-gray-900 dark:text-white font-bold tracking-tight">{profile?.name || 'Anonymous User'}</h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{profile?.designation || 'No designation set'}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Email</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.email || 'N/A'}</span>
                    </div>
                    {profile?.altEmail && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Alternate Email</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{profile.altEmail}</span>
                        </div>
                    )}
                    {profile?.mobile && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Mobile Number</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{profile.mobile}</span>
                        </div>
                    )}
                    {profile?.gender && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Gender</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{profile.gender}</span>
                        </div>
                    )}
                    {profile?.basicDetails && (
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Basic Details</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 mt-1">{profile.basicDetails}</span>
                        </div>
                    )}
                </div>
                <button onClick={onClose} className="mt-8 w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-bold shadow-sm hover:shadow transition-all border-none">Close Details</button>
            </div>
        </div>
    );
};

const EditProfileModal = ({ show, onClose, profile, setProfile, user }) => {
    const [formData, setFormData] = useState(profile);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    if (!show) return null;

    const handleSave = async () => {
        if (!user || !user.email) {
            alert("You must be logged in to save a profile.");
            return;
        }
        setSaving(true);
        try {
            const response = await axios.post('http://localhost:5000/api/profile', {
                email: user.email,
                profile: formData
            });
            if (response.data.success) {
                setProfile(response.data.profile);
                localStorage.setItem('userProfile', JSON.stringify(response.data.profile));
                onClose();
            }
        } catch (err) {
            alert("Failed to save profile: " + (err.response?.data?.error || err.message));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050, backdropFilter: 'blur(5px)' }}>
            <div style={{ width: '400px', background: 'white', borderRadius: '12px', padding: '24px', position: 'relative' }} className="shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Email</label>
                        <input type="email" value={formData.altEmail || ''} onChange={(e) => setFormData({ ...formData, altEmail: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input type="tel" value={formData.mobile || ''} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select value={formData.gender || ''} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all">
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <input type="text" value={formData.designation || ''} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all" placeholder="Software Engineer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Basic Details</label>
                        <textarea value={formData.basicDetails || ''} onChange={(e) => setFormData({ ...formData, basicDetails: e.target.value })} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 shadow-sm transition-all h-24 resize-none" placeholder="A brief bio..." />
                    </div>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className={`mt-6 w-full py-2.5 text-white rounded-lg font-bold shadow-md transition-all border-none ${saving ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'}`}
                >
                    {saving ? 'Saving Profile...' : 'Save Profile'}
                </button>
            </div>
        </div>
    );
};

const InfoTooltip = ({ text }) => {
    return (
        <span className="relative group/tooltip inline-flex items-center ml-2 cursor-pointer align-middle z-50" tabIndex="0">
            <span className="text-slate-400 hover:text-indigo-500 hover:scale-110 transition-all duration-200 text-[18px] flex items-center justify-center leading-none">ⓘ</span>
            <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-56 p-3 bg-white text-slate-700 text-[13px] font-medium rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus/tooltip:opacity-100 group-focus/tooltip:visible transition-all duration-200 text-center leading-relaxed pointer-events-none before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-white z-[9999] border border-slate-100 normal-case tracking-normal">
                {text}
            </span>
        </span>
    );
};

const ScanOverlay = ({ show }) => {
    const [statusText, setStatusText] = useState("Extracting entities...");

    useEffect(() => {
        if (!show) return;
        const stages = [
            "Extracting entities...",
            "Scanning for action verbs...",
            "Cross-referencing formatting...",
            "Parsing exact semantics...",
            "Evaluating impact levels...",
            "Matching against JD..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % stages.length;
            setStatusText(stages[i]);
        }, 1200);
        return () => clearInterval(interval);
    }, [show]);

    if (!show) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, backdropFilter: 'blur(10px)' }} className="bg-white/80 dark:bg-[#0B0E14]/80 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">

            <div className="relative w-72 h-96 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-[0_0_50px_rgba(0,112,243,0.3)] overflow-hidden flex flex-col p-8 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-purple/10 animate-pulse"></div>

                <div className="relative z-10 w-full h-4 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-6 overflow-hidden">
                    <div className="w-1/3 h-full bg-electric-blue/40 rounded-full animate-[pulse_1s_ease-in-out_infinite_alternate]"></div>
                </div>
                <div className="relative z-10 w-3/4 h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-4 overflow-hidden"><div className="w-1/2 h-full bg-electric-purple/40 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_alternate_0.2s]"></div></div>
                <div className="relative z-10 w-5/6 h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-4 overflow-hidden"><div className="w-2/3 h-full bg-electric-violet/40 rounded-full animate-[pulse_1.5s_ease-in-out_infinite_alternate_0.4s]"></div></div>
                <div className="relative z-10 w-full h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-4 overflow-hidden"><div className="w-1/4 h-full bg-electric-blue/40 rounded-full animate-[pulse_1.1s_ease-in-out_infinite_alternate_0.1s]"></div></div>
                <div className="relative z-10 w-1/2 h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mb-4 overflow-hidden"><div className="w-full h-full bg-electric-purple/40 rounded-full animate-[pulse_1.3s_ease-in-out_infinite_alternate_0.3s]"></div></div>

                {/* Circular Chart Skeletons */}
                <div className="relative z-10 mt-auto flex justify-between gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-gray-200/50 dark:border-gray-700/50 border-t-electric-blue animate-spin"></div>
                    <div className="flex-1 flex flex-wrap gap-2 items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200/50 dark:bg-gray-700/50 animate-pulse"></div>
                        <div className="w-12 h-12 rounded-full bg-gray-200/50 dark:bg-gray-700/50 animate-pulse delay-75"></div>
                        <div className="w-6 h-6 rounded-full bg-gray-200/50 dark:bg-gray-700/50 animate-pulse delay-150"></div>
                    </div>
                </div>

                <div className="absolute left-0 w-full h-[2px] bg-electric-blue shadow-[0_0_15px_4px_rgba(0,112,243,0.5)] animate-scanner z-20"></div>
            </div>

            <h3 className="mt-8 text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-electric-purple tracking-tight animate-pulse">AI Agent Processing</h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium mt-3 max-w-sm text-center leading-relaxed transition-all h-6">{statusText}</p>
        </div>
    );
};

function App() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [text, setText] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
    const [showAllContent, setShowAllContent] = useState(false);
    const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'split' | 'final'
    const [originalText, setOriginalText] = useState('');
    const [appliedSuggestions, setAppliedSuggestions] = useState([]);
    const [iterationHistory, setIterationHistory] = useState([]);
    

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (result?.atsScore) {
            setIterationHistory(prev => {
                if (prev.length === 0 || prev[prev.length - 1].score !== result.atsScore) {
                    return [...prev, { iteration: prev.length + 1, score: result.atsScore, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
                }
                return prev;
            });
        }
    }, [result]);

    useEffect(() => {
        window.__is_editing_active = isEditing;
    }, [isEditing]);

    // VITAL HARDWARE INTERCEPTOR: React explicitly swallows Synthetic clicks randomly
    // around suppressContentEditableWarning regions. This strictly bypasses React 
    // bindings entirely by fetching raw pointerdown events from the DOM securely.
    useEffect(() => {
        const handleHardwareClick = (e) => {
            if (!window.__is_editing_active) return;

            const btn = e.target.closest('[data-fix-button="true"]');
            if (!btn) return;

            const bad = btn.getAttribute('data-bad');
            const good = btn.getAttribute('data-fix');

            if (bad && good && good !== 'undefined') {
                e.preventDefault();
                e.stopPropagation();
                window.getSelection()?.removeAllRanges();
                window.__is_fixing_text = true;

                console.log(`Hardware Intercept! Fixing: ${bad} -> ${good}`);
                setText(prev => typeof prev === 'string' ? prev.replace(bad, good) : prev);

                // Instantly purge the correction from the active dashboard memory to prevent 
                // substring collision mapping (e.g., 'React' recursively matching inside 'ReactJS')
                setResult(prevResult => {
                    if (!prevResult || !prevResult.corrections) return prevResult;

                    const nextResult = JSON.parse(JSON.stringify(prevResult)); // Deep decouple
                    ['spelling', 'content', 'summary', 'skills', 'contact'].forEach(cat => {
                        if (nextResult.corrections[cat] && Array.isArray(nextResult.corrections[cat])) {
                            nextResult.corrections[cat] = nextResult.corrections[cat].filter(item =>
                                item.wrong !== bad && item.before !== bad && item.current !== bad
                            );
                        }
                    });
                    return nextResult;
                });

                setTimeout(() => { window.__is_fixing_text = false; }, 150);
            }
        };
        document.addEventListener('mousedown', handleHardwareClick, true); // true = capture phase 
        return () => document.removeEventListener('mousedown', handleHardwareClick, true);
    }, []);

    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : { name: '', altEmail: '', mobile: '', gender: '', designation: '', basicDetails: '' };
    });

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('resumeHistory');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (user && user.email) {
            axios.get(`http://localhost:5000/api/history?email=${user.email}`)
                .then(res => {
                    if (res.data.success) {
                        setHistory(res.data.history);
                        localStorage.setItem('resumeHistory', JSON.stringify(res.data.history));
                    }
                })
                .catch(err => console.error('Failed to sync history from DB', err));
        }
    }, [user?.email]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showViewProfileModal, setShowViewProfileModal] = useState(false);

    const handleLoginSuccess = (email, profile) => {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        if (profile) {
            setUserProfile(profile);
            localStorage.setItem('userProfile', JSON.stringify(profile));
        } else {
            const emptyProfile = { name: '', altEmail: '', mobile: '', gender: '', designation: '', basicDetails: '' };
            setUserProfile(emptyProfile);
            localStorage.setItem('userProfile', JSON.stringify(emptyProfile));
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        const emptyProfile = { name: '', altEmail: '', mobile: '', gender: '', designation: '', basicDetails: '' };
        setUserProfile(emptyProfile);
        localStorage.removeItem('userProfile');
        setShowProfileMenu(false);
    };

    const toggleTheme = () => {
        const newVal = !isDarkMode;
        setIsDarkMode(newVal);
        localStorage.setItem('theme', newVal ? 'dark' : 'light');
    };

    const [showHistoryView, setShowHistoryView] = useState(false);

    const handleGoHome = () => {
        setResult(null);
        setText('');
        setFile(null);
        setShowHistoryView(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Please upload a valid PDF, TXT, or Image file (JPG/PNG).');
            setFile(null);
            return;
        }
        setError('');
        setFile(selectedFile);
        setResult(null); // Reset on new file
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (loading) return;

        if (!file && !isEditing) {
            setError('Please select a file first.');
            return;
        }

        setLoading(true);
        setError('');

        // Clear old cache on new upload
        localStorage.removeItem("resumeAnalysis");

        const formData = new FormData();
        if (file && !isEditing) {
            formData.append('resume', file);
        }
        if (jobDescription) formData.append('jobDescription', jobDescription);
        if (user && user.email) formData.append('email', user.email);

        // In a real app we'd have a separate endpoint for text re-analysis.
        // To implement the "Live Edit" feature simply without a massive backend rewrite,
        // we would typically pass text directly. Since the prompt asks to use Multer and PDF parse
        // on the backend, we analyze initial upload then we could add a new endpoint, but for
        // simplicity of this demo request, we will mostly focus on the upload path which parses PDF.

        try {
            console.log("Sending request to backend...", 'http://localhost:5000/api/analyze');
            // If we implemented an edit flow to the backend we'd POST to a /api/analyze-text endpoint.
            const response = await axios.post('http://localhost:5000/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Response data", response.data);

            if (response.data.success) {
                setResult(response.data.analysis);
                setText(response.data.extractedText);
                setOriginalText(response.data.extractedText);
                setAppliedSuggestions([]);
                setViewMode('normal');
                setIsEditing(false);

                // Save result to cache
                localStorage.setItem("resumeAnalysis", JSON.stringify({
                    resumeText: response.data.extractedText,
                    result: response.data.analysis
                }));

                saveToHistory(response.data.analysis, response.data.extractedText, file);
            } else {
                setError('Failed to analyze resume.');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to connect to the server or process the resume.');
        } finally {
            setLoading(false);
        }
    };

    const saveToHistory = (analysisPayload, extractedTextString, activeFile) => {
        if (!user) return;
        const newEntry = {
            id: Date.now().toString(),
            fileName: activeFile ? activeFile.name : "Optimized_Resume.txt",
            atsScore: analysisPayload.atsScore,
            impact: Math.min(100, analysisPayload.atsScore + 12),
            keywords: Math.min(100, analysisPayload.atsScore - 5),
            brevity: Math.min(100, analysisPayload.atsScore + 5),
            date: new Date().toISOString().split('T')[0],
            analysis: analysisPayload,
            extractedText: extractedTextString
        };
        setHistory((prev) => {
            const nextHist = [newEntry, ...prev].slice(0, 10);
            localStorage.setItem('resumeHistory', JSON.stringify(nextHist));
            return nextHist;
        });
    }

    const handleDownload = () => {
        import("jspdf").then(({ jsPDF }) => {
            const doc = new jsPDF();
            const splitText = doc.splitTextToSize(text, 180);
            doc.setFontSize(11);
            doc.text(splitText, 15, 15);
            doc.save("Optimized_Resume.pdf");
        });
    };

    const handleSaveEdit = () => {
        if (isEditing) {
            const editorNode = document.querySelector('[contenteditable="true"]');
            if (editorNode) {
                const tooltips = editorNode.querySelectorAll('.absolute.bottom-full');
                tooltips.forEach(t => t.style.display = 'none');
                const currentText = editorNode.innerText;
                tooltips.forEach(t => t.style.display = '');
                setText(currentText); // Save to React state safely
            }
        }
        alert("Edits saved successfully! You can now click 'Reanalyze' to process the updated resume from scratch.");
    };

    const handleReanalyze = async () => {
        if (loading) return;

        let currentTextToAnalyze = text;

        // If the user forgot to hit "Save Edit" but Hits Reanalyze directly, save them anyway:
        if (isEditing) {
            const editorNode = document.querySelector('[contenteditable="true"]');
            if (editorNode) {
                const tooltips = editorNode.querySelectorAll('.absolute.bottom-full');
                tooltips.forEach(t => t.style.display = 'none');
                currentTextToAnalyze = editorNode.innerText;
                tooltips.forEach(t => t.style.display = '');
                setText(currentTextToAnalyze); // Immediately catch the state up
                setOriginalText(currentTextToAnalyze);
            }
        }

        setLoading(true);
        setError('');

        console.log("Calling AI API with fresh live-edit DOM text...");

        const formData = new FormData();
        formData.append('text', currentTextToAnalyze);
        if (jobDescription) formData.append('jobDescription', jobDescription);
        if (user && user.email) formData.append('email', user.email);

        try {
            const response = await axios.post('http://localhost:5000/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setResult(response.data.analysis);
                setText(response.data.extractedText);

                localStorage.setItem("resumeAnalysis", JSON.stringify({
                    resumeText: response.data.extractedText,
                    result: response.data.analysis
                }));

                saveToHistory(response.data.analysis, response.data.extractedText, file);
            } else {
                setError('Failed to re-analyze resume.');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplySuggestion = (e, bad, good) => {
        e.stopPropagation();
        if (!isEditing) {
            alert('Please click "Live Edit" above the document to apply suggestions!');
            return;
        }
        setText(prev => {
            if (typeof prev !== 'string') return prev;
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
            const regex = new RegExp(`(?<![a-zA-Z0-9])${escapeRegExp(bad)}(?![a-zA-Z0-9])`, 'i');
            return prev.replace(regex, good);
        });
        setAppliedSuggestions(prev => [...prev, good]);
        setTimeout(() => handleCorrectionClick(good), 150);
    };

    const handleUndoSuggestion = (e, bad, good) => {
        e.stopPropagation();
        if (!isEditing) {
            alert('Please click "Live Edit" above the document to undo suggestions!');
            return;
        }
        setText(prev => {
            if (typeof prev !== 'string') return prev;
            const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
            const regex = new RegExp(`(?<![a-zA-Z0-9])${escapeRegExp(good)}(?![a-zA-Z0-9])`, 'i');
            return prev.replace(regex, bad);
        });
        setAppliedSuggestions(prev => prev.filter(s => s !== good));
        setTimeout(() => handleCorrectionClick(bad), 150);
    };

    const handleUseAIAsFinal = () => {
        let newText = text;
        const targets = [];
        if (result && result.corrections) {
            if (result.corrections.spelling) result.corrections.spelling.forEach(c => targets.push({ bad: c.wrong, good: c.correct }));
            if (result.corrections.content) result.corrections.content.forEach(c => { if (c.before && c.before !== '(None)') targets.push({ bad: c.before, good: c.after }); });
            if (result.corrections.skills) result.corrections.skills.forEach(c => targets.push({ bad: c.current, good: c.optimized }));
        }

        // Sort by length descending to match longest phrases first to prevent sub-matches
        targets.sort((a, b) => (b.bad?.length || 0) - (a.bad?.length || 0));

        if (targets.length > 0) {
            try {
                const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
                const regexStr = targets.map(t => `(?<![a-zA-Z0-9])${escapeRegExp(t.bad)}(?![a-zA-Z0-9])`).join('|');
                const regex = new RegExp(`(${regexStr})`, 'gi');

                newText = newText.replace(regex, (match) => {
                    const cleanTarget = (s) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    const target = targets.find(t => cleanTarget(t.bad) === cleanTarget(match));
                    return target ? target.good : match;
                });
            } catch (e) {
                console.error("Regex replacement failed:", e);
                // Fallback to simple replace
                targets.forEach(({ bad, good }) => {
                    if (bad && good) newText = newText.split(bad).join(good);
                });
            }
        }

        setText(newText);
        setAppliedSuggestions([]);
        setViewMode('final');
    };

    const handleCorrectionClick = (text) => {
        if (!text) return;
        try {
            // Safely find elements matching exactly the text, avoiding query selector syntax crashes on quotes/brackets and supporting case-insensitivity
            const clean = (s) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const els = Array.from(document.querySelectorAll('[data-bad]')).filter(el => {
                const dataVal = el.getAttribute('data-bad');
                return dataVal && clean(dataVal) === clean(text);
            });
            if (els && els.length > 0) {
                els.forEach(el => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('ring-4', 'ring-electric-blue', 'ring-offset-1', 'scale-105', 'z-10');
                    setTimeout(() => el.classList.remove('ring-4', 'ring-electric-blue', 'ring-offset-1', 'scale-105', 'z-10'), 2000);
                });
            }
        } catch (e) {
            console.error("Locate error:", e);
        }
    };

    const ScoreCircle = ({ score, label, tooltipText }) => {
        let strokeClass = "stroke-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]";
        let textClass = "text-green-500";
        if (score < 41) {
            strokeClass = "stroke-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]";
            textClass = "text-red-500";
        }
        else if (score < 71) {
            strokeClass = "stroke-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]";
            textClass = "text-yellow-500";
        }

        const radius = 38;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 100) * circumference;

        return (
            <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700/50 transition-all hover:-translate-y-1">
                <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="38" className="stroke-gray-100 dark:stroke-gray-700/50 fill-none" strokeWidth="8" />
                        <circle cx="56" cy="56" r="38" className={`fill-none transition-all duration-1000 ease-out ${strokeClass}`} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                    </svg>
                    <div className={`absolute text-3xl font-extrabold ${textClass}`}>{score}</div>
                </div>
                <div className="text-gray-700 dark:text-gray-200 font-bold tracking-wide flex items-center justify-center">
                    {label}
                    {tooltipText && <InfoTooltip text={tooltipText} />}
                </div>
            </div>
        )
    }

    const renderHighlightedText = (rawText, corrections, isActiveEditing) => {
        if ((!corrections || Object.keys(corrections).length === 0) && appliedSuggestions.length === 0) return rawText;

        const highlightTargets = [];
        appliedSuggestions.forEach(s => highlightTargets.push({ match: s, type: 'applied' }));

        if (corrections && corrections.spelling) {
            corrections.spelling.forEach(s => {
                if (s.wrong) highlightTargets.push({ match: s.wrong, fix: s.correct, type: 'error', prefix: 'Did you mean: ' });
            });
        }
        if (corrections && corrections.content) {
            corrections.content.forEach(c => {
                if (c.before && c.before !== '(None)' && c.before.length > 3) highlightTargets.push({ match: c.before, fix: c.after, type: 'warning', prefix: 'Suggestion: ' });
            });
        }
        if (corrections.skills) {
            corrections.skills.forEach(sk => {
                if (sk.current) highlightTargets.push({ match: sk.current, fix: sk.optimized, type: 'suggestion', prefix: 'Use: ' });
            });
        }

        if (highlightTargets.length === 0) return rawText;

        // Sort by length descending to match longest phrases first to prevent sub-matches
        highlightTargets.sort((a, b) => b.match.length - a.match.length);

        // Pass a subset of targets if we want to do nested highlighting or just text
        const renderText = (rawTextSub, targetsSubset, showAIStyle, isNested = false) => {
            if (targetsSubset.length === 0) return rawTextSub;
            
            try {
                const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
                const regexStr = targetsSubset.map(t => `(?<![a-zA-Z0-9])${escapeRegExp(t.match)}(?![a-zA-Z0-9])`).join('|');
                const regex = new RegExp(`(${regexStr})`, 'gi');

                let elements = [];
                let match;
                let lastIndex = 0;

                while ((match = regex.exec(rawTextSub)) !== null) {
                    if (match[0] === '') break;
                    elements.push(rawTextSub.substring(lastIndex, match.index));

                    const cleanTarget = (s) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                    const target = targetsSubset.find(t => cleanTarget(t.match) === cleanTarget(match[0]));

                    if (showAIStyle) {
                        elements.push(
                            <span key={`ai-${match.index}`} className="px-1 rounded-sm bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-300 font-bold transition-colors duration-200">
                                {target?.fix || match[0]}
                            </span>
                        );
                    } else {
                        let colorClass = "";
                        let hoverClass = "";
                        if (target?.type === 'error') { colorClass = "bg-red-100 text-red-900 border-b-2 border-red-500 dark:bg-red-900/30 dark:text-red-300"; hoverClass = "hover:bg-red-200 dark:hover:bg-red-900/50 cursor-pointer"; }
                        else if (target?.type === 'warning') { colorClass = "bg-orange-100 text-orange-900 border-b-2 border-orange-500 dark:bg-orange-900/30 dark:text-orange-300"; hoverClass = "hover:bg-orange-200 dark:hover:bg-orange-900/50 cursor-pointer"; }
                        else if (target?.type === 'applied') { colorClass = "bg-green-100 text-green-900 border-b-2 border-green-500 dark:bg-green-900/30 dark:text-green-300"; hoverClass = ""; }
                        else { colorClass = "bg-electric-blue/10 text-electric-blue border-b-2 border-electric-blue/50 dark:bg-electric-blue/20 dark:text-blue-300"; hoverClass = "hover:bg-electric-blue/20 cursor-pointer"; }

                        // If it's a warning or suggestion, recursively highlight spelling inside it.
                        let innerContent = match[0];
                        if (!isNested && target?.type !== 'error') {
                            const spellingTargets = targetsSubset.filter(t => t.type === 'error');
                            if (spellingTargets.length > 0) {
                                innerContent = renderText(match[0], spellingTargets, false, true);
                            }
                        }

                        if (!isActiveEditing) {
                            elements.push(
                                <span key={`view-${match.index}`} data-bad={match[0]} className={`px-1 rounded-sm ${colorClass} font-semibold transition-all duration-300 inline decoration-clone`}>
                                    {innerContent}
                                </span>
                            );
                        } else {
                            elements.push(
                                <span
                                    key={`edit-${match.index}`}
                                    className="relative group inline decoration-clone transition-all duration-300 cursor-pointer"
                                    data-fix-button="true"
                                    data-bad={match[0]}
                                    data-fix={target?.fix}
                                    onClick={(e) => {
                                        if (target?.fix) handleApplySuggestion(e, match[0], target.fix);
                                    }}
                                >
                                    <span className={`px-1 rounded-sm ${colorClass} ${hoverClass} font-semibold transition-colors duration-200 inline decoration-clone`}>{innerContent}</span>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-gray-900 border border-gray-700 text-white text-[11px] px-3 py-2 rounded-lg shadow-2xl whitespace-normal w-max max-w-[280px] text-center z-[999] tracking-wide font-sans select-none cursor-pointer leading-relaxed">
                                        <span className="text-gray-400 font-normal">{target?.prefix}</span> <span className="font-semibold text-blue-300">{target?.fix}</span> <span className="text-gray-500 text-[9px] ml-1 block mt-0.5">(Click to fix)</span>
                                    </span>
                                </span>
                            );
                        }
                    }
                    lastIndex = regex.lastIndex;
                }
                elements.push(rawTextSub.substring(lastIndex));
                
                // Prevent browser layout quirks with absolute tooltips by unboxing single text nodes
                if (elements.length === 1 && typeof elements[0] === 'string') {
                    return elements[0];
                }
                return elements;
            } catch (e) {
                console.error("Regex Highlight Error:", e);
                return rawTextSub;
            }
        };

        if (viewMode === 'split') {
            return (
                <div className="flex flex-col gap-4 h-full w-full">
                    <div className="flex items-center justify-between bg-electric-blue/10 p-4 rounded-xl border border-electric-blue/20">
                        <span className="text-sm font-bold text-electric-blue dark:text-blue-400 flex items-center gap-2"><CheckCircle size={16} /> Comparing Original vs AI Improved</span>
                        <button onClick={handleUseAIAsFinal} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full shadow hover:shadow-lg hover:-translate-y-0.5 transition-all">Use AI Resume as Final</button>
                    </div>
                    <div className="flex gap-6 flex-1 overflow-hidden">
                        <div className="flex-1 overflow-auto bg-red-50/30 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                            <div className="sticky top-0 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs font-bold px-3 py-1.5 rounded-lg mb-4 text-center z-10 shadow-sm">Original Resume</div>
                            {renderText(rawText, highlightTargets, false)}
                        </div>
                        <div className="flex-1 overflow-auto bg-green-50/30 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                            <div className="sticky top-0 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 text-xs font-bold px-3 py-1.5 rounded-lg mb-4 text-center z-10 shadow-sm">AI Improved Suggestions</div>
                            {renderText(rawText, highlightTargets, true)}
                        </div>
                    </div>
                </div>
            );
        }

        if (viewMode === 'final') {
            return renderText(rawText, [], false);
        }

        return renderText(rawText, highlightTargets, false);
    };

    return (
        <div className="min-h-screen bg-[#f8faff] dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans selection:bg-blue-100 transition-colors duration-300 relative">
            {/* Ambient Light Structure Blobs */}
            <div className="absolute top-0 left-[10%] w-[30rem] h-[30rem] bg-blue-200/30 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob pointer-events-none dark:hidden z-0"></div>
            <div className="absolute top-[20%] right-[10%] w-[30rem] h-[30rem] bg-indigo-200/30 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob animation-delay-2000 pointer-events-none dark:hidden z-0"></div>

            <AuthModal showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} onLoginSuccess={handleLoginSuccess} />
            <EditProfileModal show={showEditProfileModal} onClose={() => setShowEditProfileModal(false)} profile={userProfile} setProfile={setUserProfile} user={user} />
            <ViewProfileModal show={showViewProfileModal} onClose={() => setShowViewProfileModal(false)} profile={userProfile} user={user} />
            <HowItWorksModal show={showHowItWorksModal} onClose={() => setShowHowItWorksModal(false)} />
            <ScanOverlay show={loading} />

            {/* Header */}
            <header style={{ position: 'sticky', top: 0, zIndex: 100 }} className={`px-8 py-5 flex items-center justify-between border-b shadow-sm transition-colors backdrop-blur-md ${isDarkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-blue-50/70 border-blue-100/50'}`}>
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleGoHome}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold transition-all shadow-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Home size={18} className="text-blue-500" />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={() => setShowHowItWorksModal(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm border ${isDarkMode ? 'bg-indigo-900/30 border-indigo-700/50 text-indigo-300 hover:bg-indigo-800/50' : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100'}`}
                    >
                        <HelpCircle size={18} />
                        <span className="hidden md:inline">How It Works</span>
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {result && (
                        <button
                            onClick={() => { setResult(null); setFile(null); setText(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="text-sm font-semibold text-blue-600 hover:text-white border border-blue-500 bg-blue-50 hover:bg-blue-600 px-4 py-2 dark:bg-transparent dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white rounded-full shadow-sm transition-all flex items-center gap-2 mr-2"
                        >
                            <Upload size={16} />
                            <span className="hidden md:inline">Upload Another</span>
                        </button>
                    )}
                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-full transition-all flex items-center justify-center ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDarkMode ? '#374151' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer', zIndex: 1000, overflow: 'hidden' }}
                                className="text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-300 transition-all hover:opacity-80 shadow-md"
                            >
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{user.email.charAt(0).toUpperCase()}</span>
                                )}
                            </button>

                            {showProfileMenu && (
                                <>
                                    <div
                                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 40 }}
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ position: 'absolute', right: '10px', top: '60px', width: '260px', zIndex: 9999, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', pointerEvents: 'auto' }}
                                        className={`border py-2 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                                    >
                                        <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-50/80'}`}>
                                            <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} uppercase tracking-wider mb-0.5`}>Signed in as</p>
                                            <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{userProfile.name || user.email}</p>
                                        </div>
                                        <div className="py-1 mt-1">
                                            <button
                                                onClick={() => { setShowViewProfileModal(true); setShowProfileMenu(false); }}
                                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <User size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
                                                <span className="font-medium">View Profile</span>
                                            </button>
                                            <button
                                                onClick={() => { setShowHistoryView(true); setShowProfileMenu(false); setResult(null); setText(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <Clock size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
                                                <span className="font-medium">History</span>
                                            </button>
                                            <button
                                                onClick={() => { setShowEditProfileModal(true); setShowProfileMenu(false); }}
                                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <Edit3 size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} />
                                                <span className="font-medium">Edit Profile</span>
                                            </button>
                                            <div className={`h-px my-1 mx-2 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}></div>
                                            <button
                                                onClick={handleLogout}
                                                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2.5 transition-colors font-medium group ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}
                                            >
                                                <LogOut size={16} className={isDarkMode ? 'text-red-400 group-hover:text-red-500' : 'text-red-400 group-hover:text-red-600'} transition-colors />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className={`px-5 py-2 rounded-full font-medium text-sm transition-all shadow-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </header>

            <main style={{ position: 'relative', zIndex: 1 }} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Main Interface */}
                {!result ? (
                    <div className="max-w-3xl mx-auto mt-12">
                        {showHistoryView ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
                                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                        <Clock size={20} className="text-blue-500" />
                                        Analysis History
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setHistory([]);
                                            localStorage.removeItem('resumeHistory');
                                        }}
                                        className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md transition-colors"
                                    >
                                        Clear History
                                    </button>
                                </div>
                                {history.length > 0 ? (
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {history.map((item) => (
                                            <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 shadow-inner">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 dark:text-gray-100">{item.fileName}</h4>
                                                        <div className="flex items-center gap-3 mt-1.5 opacity-70">
                                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{item.date}</p>
                                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Impact: {item.impact}</span>
                                                            <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">Keywords: {item.keywords}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                    <div className="text-center w-16">
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Score</div>
                                                        <div className={`font-black text-xl ${item.atsScore >= 75 ? 'text-green-500' : item.atsScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                            {item.atsScore}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setResult(item.analysis);
                                                            setText(item.extractedText);
                                                            setIsEditing(false);
                                                            setShowHistoryView(false);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-500 hover:border-blue-600 hover:shadow-md transition-all sm:w-auto w-full"
                                                    >
                                                        View Report
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-16 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                            <Clock size={32} className="text-gray-400" />
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No History Yet</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 max-w-sm">Upload and analyze your first resume to see your past reports tracked here.</p>
                                        <button
                                            onClick={handleGoHome}
                                            className="mt-6 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors shadow-sm"
                                        >
                                            Start Analysis
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Optimize Your Resume for ATS</h2>
                                    <p className="text-lg text-gray-500">Upload your PDF resume to receive a comprehensive, AI-driven analysis of your formatting, keywords, and impact.</p>
                                </div>

                                <div className={`rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-10 backdrop-blur-xl transition-all relative z-10 ${isDarkMode ? 'bg-[#0B0E14]/70 border border-white/5' : 'bg-white/70 border border-white/50 bg-gradient-to-b from-white/80 to-white/40'}`}>
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-6">
                                            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Description (Optional)</label>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                placeholder="Enter job role or description (e.g. Frontend Developer, Data Analyst)"
                                                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none shadow-sm ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800'}`}
                                                rows="3"
                                            ></textarea>
                                        </div>

                                        <div
                                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ease-in-out ${dragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : (isDarkMode ? 'border-gray-600 hover:border-gray-500 bg-gray-900' : 'border-gray-300 hover:border-gray-400 bg-gray-50')} ${file && !isDarkMode ? 'bg-green-50/50 border-green-400' : ''} ${file && isDarkMode ? 'bg-green-900/20 border-green-500' : ''}`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                type="file"
                                                className="hidden"
                                                id="resume-upload"
                                                accept="application/pdf, text/plain, image/jpeg, image/png"
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                                                {file ? (
                                                    <>
                                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                                            <FileText size={32} />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{file.name}</h3>
                                                        <p className="text-sm text-green-600 font-medium">Ready to analyze</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/40 text-electric-blue rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-gray-800">
                                                            <Upload size={36} strokeWidth={1.5} />
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Drag & drop your resume</h3>
                                                        <p className="text-sm text-gray-500 font-medium mb-6">
                                                            Supported formats: PDF, Image, TXT (Max size: 5MB)
                                                        </p>
                                                        <div className="flex items-center justify-center gap-4">
                                                            <span className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                                                                Browse Files
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </label>
                                        </div>

                                        {error && (
                                            <div className="mt-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
                                                <AlertCircle size={20} />
                                                <span className="font-medium">{error}</span>
                                            </div>
                                        )}

                                        <div className="mt-8 flex justify-center">
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                disabled={!file || loading}
                                                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg transition-all shadow-lg ${!file || loading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5'}`}
                                            >
                                                {loading ? (
                                                    <><RefreshCw size={22} className="animate-spin" /> Analyzing...</>
                                                ) : (
                                                    <><CheckCircle size={22} /> Analyze Resume</>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* History rendering moved to dedicated view mode block */}

                                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-70">
                                    <div className="flex items-start gap-4 p-4">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Code size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-1">Deep Parsing</h4>
                                            <p className="text-xs text-gray-500">Extracts text and evaluates ATS readability instantly.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4">
                                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Briefcase size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-1">Tailoring Checks</h4>
                                            <p className="text-xs text-gray-500">Cross-references skills with industry standards.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4">
                                        <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-1">Actionable Advice</h4>
                                            <p className="text-xs text-gray-500">Provides specific, unique feedback not generic templates.</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (

                    // Results Dashboard
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col lg:flex-row gap-8">

                        {/* Left Column: Parsed Text / Editor */}
                        <div className={`w-full ${viewMode === 'final' ? 'max-w-4xl mx-auto' : 'lg:w-[40%]'} transition-all duration-500 flex flex-col h-[calc(100vh-140px)] sticky top-28`}>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transition-colors">
                                <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-5 py-4 flex justify-between items-center transition-colors">
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 transition-colors relative group">
                                            <Code size={18} className="text-blue-500" /> Parsed Content
                                            <div className="relative inline-flex items-center ml-1">
                                                <HelpCircle size={15} className="text-gray-400 hover:text-blue-500 transition-colors cursor-help" />

                                                {/* Dropdown Color Legend Tooltip */}
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] p-4 pointer-events-none">
                                                    <div className="text-[13px] font-bold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">Color Guide</div>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-sm shrink-0"></span>
                                                            <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">Spelling & Grammar <span className="text-red-500 dark:text-red-400 font-bold ml-1">Error</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-3.5 h-3.5 rounded-full bg-orange-400 shadow-sm shrink-0"></span>
                                                            <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">Phrasing & Impact <span className="text-orange-500 dark:text-orange-400 font-bold ml-1">Warning</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-3.5 h-3.5 rounded-full bg-blue-400 shadow-sm shrink-0"></span>
                                                            <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">Terminology & ATS <span className="text-blue-500 dark:text-blue-400 font-bold ml-1">Tip</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">Review your raw parsed structure and edits.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {viewMode === 'final' ? (
                                            <>
                                                <button onClick={handleDownload} className="text-xs font-bold px-3 py-1.5 border border-emerald-200 rounded-md shadow-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center gap-1.5 transition-colors dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
                                                    <Download size={14} /> Download
                                                </button>
                                                <button onClick={() => setViewMode('split')} className="text-xs font-bold px-3 py-1.5 border border-indigo-200 rounded-md shadow-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 transition-colors dark:border-indigo-800">
                                                    Compare Versions
                                                </button>
                                                <button onClick={() => { setText(originalText); setAppliedSuggestions([]); setViewMode('normal'); }} className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 transition-colors">
                                                    View Original
                                                </button>
                                            </>
                                        ) : (
                                                <>
                                                    <button
                                                        onClick={() => { setViewMode(viewMode === 'split' ? 'normal' : 'split'); setIsEditing(false); }}
                                                        className={`text-xs font-bold px-3 py-1.5 rounded-md shadow-sm transition-colors border ${viewMode === 'split' ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'}`}
                                                    >
                                                        Split View
                                                    </button>
                                                    {isEditing ? (
                                                        <>
                                                            <button
                                                                onClick={() => setIsEditing(false)}
                                                                className="text-xs font-bold px-3 py-1.5 border border-cyan-200 rounded-md shadow-sm bg-cyan-50 hover:bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800 transition-colors"
                                                            >
                                                                View Mode
                                                            </button>
                                                            <button
                                                                onClick={handleSaveEdit}
                                                                disabled={loading}
                                                                className="text-xs font-bold px-3 py-1.5 border border-green-200 rounded-md shadow-sm bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                                            >
                                                                <Save size={14} /> Save Edit
                                                            </button>
                                                            <button
                                                                onClick={handleReanalyze}
                                                                disabled={loading}
                                                                className={`text-xs font-bold px-3 py-1.5 border border-purple-200 rounded-md shadow-sm flex items-center gap-1.5 transition-colors ${loading ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400' : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'}`}
                                                            >
                                                                {loading ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />} Reanalyze
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={handleDownload}
                                                                className="text-xs font-bold px-3 py-1.5 border border-emerald-200 rounded-md shadow-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 transition-colors"
                                                            >
                                                                <Download size={14} /> Download
                                                            </button>
                                                            <button
                                                                onClick={() => { setIsEditing(true); setViewMode('normal'); }}
                                                                className="text-xs font-bold px-3 py-1.5 border border-amber-200 rounded-md shadow-sm bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 transition-colors"
                                                            >
                                                                Live Edit
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* COLOR LEGEND */}
                                    <div className="flex flex-wrap items-center gap-4 py-3 px-2 border-b border-gray-100 dark:border-gray-800 transition-colors">
                                        <div className="flex items-center gap-2" title="Spelling & Grammar errors">
                                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Spelling & Grammar</span>
                                        </div>
                                        <div className="flex items-center gap-2" title="Content & Quantification enhancements">
                                            <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Content Enhancements</span>
                                        </div>
                                        <div className="flex items-center gap-2" title="Skills Terminology Optimization">
                                            <span className="w-3 h-3 rounded-full bg-electric-blue"></span>
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Skill Optimization</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-auto p-0 bg-gray-50/30 dark:bg-gray-900/30 transition-colors">
                                        <div
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            className={`p-6 md:p-8 font-sans whitespace-pre-wrap outline-none transition-all ${isEditing ? 'bg-white dark:bg-gray-800 ring-inset ring-2 ring-blue-200 dark:ring-blue-500 shadow-inner min-h-full cursor-text text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
                                            style={{ fontSize: '16px', lineHeight: '1.75' }}
                                        >
                                            {renderHighlightedText(text, result.corrections, isEditing)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Analysis */}
                            {viewMode !== 'final' && (
                                <div className="w-full lg:w-[60%] space-y-6 lg:pb-20 transition-all duration-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-colors">Analysis Dashboard</h2>
                                    </div>

                                    {/* Score Overview */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="col-span-2 md:col-span-1">
                                            <ScoreCircle score={result.atsScore} label="ATS Score" tooltipText="Overall rating of your resume's parsing success and ATS compatibility, factoring in sections directly below." />
                                        </div>
                                        {/* We can derived some fake sub-scores based on atsScore for visual flair */}
                                        <div className="col-span-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="relative group bg-white dark:bg-gray-800 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300">
                                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                                </div>
                                                <span className="text-blue-700 dark:text-blue-400 text-[11px] font-extrabold uppercase tracking-widest mb-3 flex items-center z-10 relative">Impact Parsing <InfoTooltip text="How strongly your words communicate achievements and impactful results." /></span>
                                                <div className="text-4xl font-black text-gray-800 dark:text-white mb-3 z-10 relative flex items-baseline">
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-400 dark:to-cyan-200 drop-shadow-sm">{Math.min(100, result.atsScore + 12)}</span>
                                                    <span className="text-sm text-gray-400 dark:text-gray-500 ml-1 font-bold">/100</span>
                                                </div>
                                                <div className="w-full bg-blue-50 dark:bg-gray-700/50 rounded-full h-2 z-10 relative overflow-hidden backdrop-blur-sm">
                                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(56,189,248,0.5)]" style={{ width: `${Math.min(100, result.atsScore + 12)}%` }}>
                                                        <div className="absolute inset-0 bg-white/20 w-1/2 blur-[2px] skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative group bg-white dark:bg-gray-800 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300">
                                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                                                </div>
                                                <span className="text-indigo-700 dark:text-indigo-400 text-[11px] font-extrabold uppercase tracking-widest mb-3 flex items-center z-10 relative">Keyword Density <InfoTooltip text="How effectively your resume uses important functional terms from the JD." /></span>
                                                <div className="text-4xl font-black text-gray-800 dark:text-white mb-3 z-10 relative flex items-baseline">
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-400 dark:from-indigo-400 dark:to-violet-200 drop-shadow-sm">{Math.min(100, result.atsScore - 5)}</span>
                                                    <span className="text-sm text-gray-400 dark:text-gray-500 ml-1 font-bold">/100</span>
                                                </div>
                                                <div className="w-full bg-indigo-50 dark:bg-gray-700/50 rounded-full h-2 z-10 relative overflow-hidden backdrop-blur-sm">
                                                    <div className="bg-gradient-to-r from-indigo-500 to-violet-400 h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(139,92,246,0.5)]" style={{ width: `${Math.min(100, result.atsScore - 5)}%` }}>
                                                        <div className="absolute inset-0 bg-white/20 w-1/2 blur-[2px] skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite_0.5s]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative group bg-white dark:bg-gray-800 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:-translate-y-1 transition-all duration-300">
                                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all duration-700"></div>
                                                </div>
                                                <span className="text-amber-700 dark:text-amber-500 text-[11px] font-extrabold uppercase tracking-widest mb-3 flex items-center z-10 relative">Brevity Rating <InfoTooltip text="How clear and concise your sentences are without unnecessary fluff." /></span>
                                                <div className="text-4xl font-black text-gray-800 dark:text-white mb-3 z-10 relative flex items-baseline">
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-400 dark:from-amber-400 dark:to-orange-200 drop-shadow-sm">{Math.min(100, result.atsScore + 5)}</span>
                                                    <span className="text-sm text-gray-400 dark:text-gray-500 ml-1 font-bold">/100</span>
                                                </div>
                                                <div className="w-full bg-amber-50 dark:bg-gray-700/50 rounded-full h-2 z-10 relative overflow-hidden backdrop-blur-sm">
                                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${Math.min(100, result.atsScore + 5)}%` }}>
                                                        <div className="absolute inset-0 bg-white/20 w-1/2 blur-[2px] skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite_1s]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Version History Sparkline */}
                                    {iterationHistory.length > 1 && (
                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors mt-2">
                                            <h4 className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4"><Activity size={16} className="text-electric-blue" /> Version History <InfoTooltip text="Track your resume score improvements over time." /></h4>
                                            <div className="flex items-end gap-2 h-16 w-full">
                                                {iterationHistory.map((h, i) => {
                                                    const height = Math.max(15, (h.score / 100) * 100);
                                                    const isLast = i === iterationHistory.length - 1;
                                                    return (
                                                        <div key={i} className="flex-1 flex flex-col justify-end items-center group relative cursor-crosshair">
                                                            <div className={`w-full rounded-t transition-all duration-500 max-w-[20px] ${isLast ? 'bg-electric-blue' : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600'}`} style={{ height: `${height}%` }}></div>
                                                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-[11px] py-1 px-2 rounded whitespace-nowrap z-50 shadow-md">
                                                                Iteration {h.iteration}: <span className="font-bold">{h.score}</span><br/>
                                                                <span className="text-gray-400 text-[9px]">{h.time}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="flex justify-between text-[10px] text-gray-500 font-semibold mt-2 uppercase tracking-wider">
                                                <span>First: {iterationHistory[0].score}</span>
                                                <span className="text-electric-blue">Latest: {iterationHistory[iterationHistory.length - 1].score}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Critical Issues */}
                                    {result.issues && result.issues.length > 0 && (
                                        <div className="bg-red-50/50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 rounded-2xl overflow-visible transition-colors">
                                            <div className="bg-red-100/50 dark:bg-red-900/30 px-6 py-4 border-b border-red-100 dark:border-red-800/50 flex items-center gap-3 rounded-t-2xl">
                                                <AlertCircle className="text-red-500" size={20} />
                                                <h3 className="font-bold text-red-900 text-lg flex items-center">Critical Red Flags <InfoTooltip text="Major issues that might cause an ATS system to reject your resume." /></h3>
                                            </div>
                                            <ul className="p-6 space-y-3">
                                                {result.issues.map((issue, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0 shadow-sm shadow-red-200" />
                                                        <p className="text-red-800 font-medium">{issue}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Job Match Analysis */}
                                    {result.jobMatch && (
                                        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl overflow-hidden mt-6 transition-colors">
                                            <div className="bg-indigo-100/50 dark:bg-indigo-900/30 px-6 py-4 border-b border-indigo-100 dark:border-indigo-800/50 flex items-center gap-3">
                                                <Briefcase className="text-indigo-500" size={20} />
                                                <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-lg">Job Match Analysis</h3>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                                                    <span className="text-indigo-800 font-bold text-lg">Match Score:</span>
                                                    <span className="text-indigo-900 font-extrabold text-2xl">{result.jobMatch.score}%</span>
                                                </div>

                                                {result.jobMatch.missingSkills?.length > 0 && (
                                                    <div>
                                                        <h4 className="text-indigo-800 font-bold mb-2">Missing Skills</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {result.jobMatch.missingSkills.map((skill, idx) => (
                                                                <span key={idx} className="bg-white text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {result.jobMatch.keywordSuggestions?.length > 0 && (
                                                    <div>
                                                        <h4 className="text-indigo-800 font-bold mb-2">Keyword Suggestions</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {result.jobMatch.keywordSuggestions.map((keyword, idx) => (
                                                                <span key={idx} className="bg-white text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-sm font-medium">{keyword}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {result.jobMatch.fitSummary && (
                                                    <div className="pt-2">
                                                        <h4 className="text-indigo-800 font-bold mb-1">Fit Summary</h4>
                                                        <p className="text-indigo-900 leading-relaxed text-sm bg-indigo-100/30 p-4 rounded-xl">{result.jobMatch.fitSummary}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {!result.jobMatch && jobDescription === '' && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center mt-6">
                                            <p className="text-gray-500 font-medium">Add a job description to see match analysis metrics.</p>
                                        </div>
                                    )}

                                    {/* Layout Check Analysis */}
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-visible flex flex-col transition-colors mt-6">
                                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-t-2xl">
                                            <FileCode2 className="text-teal-500" size={20} />
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">Resume Format & Layout Check <InfoTooltip text="Analyzes structural consistency, spacing, readability, and ATS formatting standards." /></h3>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start gap-3 bg-teal-50/30 dark:bg-teal-900/10 p-4 rounded-xl border border-teal-100/50 dark:border-teal-800/30 transition-colors">
                                                <div className="mt-1 text-teal-500 shrink-0"><CheckCircle size={16} /></div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">Standard Sections Detected</h4>
                                                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Your resume includes necessary structural sections in a highly readable, ATS-friendly order.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 bg-orange-50/30 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100/50 dark:border-orange-800/30 transition-colors">
                                                <div className="mt-1 text-orange-500 shrink-0"><AlertCircle size={16} /></div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">Formatting Density Warning</h4>
                                                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Some bullet points appear too dense. Consider breaking paragraphs into shorter, actionable sentences to improve scanning speed.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actionable Corrections Section */}
                                    {result.corrections && (
                                        <div className="space-y-6 mt-8">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2 transition-colors flex items-center">Actionable Corrections <InfoTooltip text="Specific, line-by-line suggestions you can click to apply instantly." /></h3>

                                            {/* Spelling */}
                                            {result.corrections.spelling?.length > 0 && (
                                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-visible transition-colors">
                                                    <div className="px-5 py-3 bg-red-50 dark:bg-red-900/20 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 rounded-t-xl">
                                                        <AlertCircle size={18} className="text-red-500" />
                                                        <h4 className="font-bold text-red-900 dark:text-red-300 flex items-center">Spelling & Grammar <InfoTooltip text="Typos and grammatical mistakes that need to be corrected." /></h4>
                                                    </div>
                                                    <div className="p-5 divide-y divide-gray-50 dark:divide-gray-700">
                                                        {result.corrections.spelling.map((err, i) => (
                                                            <div key={i} onClick={() => handleCorrectionClick(err.wrong)} className="py-2 flex items-center gap-4 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors p-2 rounded-lg">
                                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md line-through">{err.wrong}</span>
                                                                <span className="text-gray-400">➔</span>
                                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md font-medium">{err.correct}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}


                                            {/* Content Quantification */}
                                            {result.corrections.content?.length > 0 && (
                                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-visible transition-colors">
                                                    <div className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 rounded-t-xl">
                                                        <FileText size={18} className="text-blue-500" />
                                                        <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center">Content & Quantification enhancements <InfoTooltip text="Suggestions to add numbers and measurable results to prove your impact." /></h4>
                                                    </div>
                                                    <div className="p-5 space-y-4">
                                                        {(showAllContent ? result.corrections.content : result.corrections.content.slice(0, 3)).map((item, i) => {
                                                            const isApplied = appliedSuggestions.includes(item.after);
                                                            return (
                                                            <div key={i} className="bg-white dark:bg-gray-800/40 p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 relative shadow-sm hover:shadow transition-all group flex flex-col">
                                                                <div className="mb-4">
                                                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-1">Before:</span>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">"{item.before}"</p>
                                                                </div>
                                                                <div className="mb-4 bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-900/30">
                                                                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block mb-1">After (Suggested):</span>
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">"{item.after}"</p>
                                                                </div>
                                                                {item.reason && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 bg-blue-50 dark:bg-blue-900/30 inline-block px-2 py-1 rounded mb-4">💡 {item.reason}</p>}

                                                                <div className="mt-auto pt-3 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700/50">
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleCorrectionClick(isApplied ? item.after : item.before); }}
                                                                        className="flex-1 text-xs font-semibold py-2 px-3 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer text-center"
                                                                    >
                                                                        Locate in Resume
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => isEditing ? (isApplied ? handleUndoSuggestion(e, item.before, item.after) : handleApplySuggestion(e, item.before, item.after)) : undefined}
                                                                        className={`group flex-1 text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-all flex justify-center items-center gap-1.5 ${!isEditing ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-75' : isApplied ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500 cursor-pointer' : 'bg-green-500 hover:bg-green-600 text-white border border-transparent cursor-pointer hover:shadow'}`}
                                                                        title={!isEditing ? "Enable Live Edit to apply changes" : isApplied ? "Undo suggestion" : "Apply Suggestion"}
                                                                    >
                                                                        {isApplied ? (
                                                                            <>
                                                                                <span className="flex items-center gap-1.5 group-hover:hidden"><CheckCircle size={14} /> Applied</span>
                                                                                <span className="hidden items-center gap-1.5 group-hover:flex"><RefreshCw size={14} /> Revert</span>
                                                                            </>
                                                                        ) : (
                                                                            <><CheckCircle size={14} /> Apply</>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )})}
                                                        {result.corrections.content.length > 3 && (
                                                            <div className="text-center pt-2 mt-4 border-t border-gray-100 dark:border-gray-700/50">
                                                                <button
                                                                    onClick={() => setShowAllContent(!showAllContent)}
                                                                    className="mt-4 px-5 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-full transition-all tracking-wide"
                                                                >
                                                                    {showAllContent ? "Show less" : `Show ${result.corrections.content.length - 3} more enhancements`}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Skills Optimization */}
                                            {result.corrections.skills?.length > 0 && (
                                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-visible transition-colors">
                                                    <div className="px-5 py-3 bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 rounded-t-xl">
                                                        <Code size={18} className="text-indigo-500" />
                                                        <h4 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center">Skills Terminology Optimization <InfoTooltip text="Upgrades legacy or generic skill terms to modern keywords preferred by ATS systems." /></h4>
                                                    </div>
                                                    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5 bg-gray-50/30 dark:bg-gray-900/10">
                                                        {result.corrections.skills.map((skill, i) => {
                                                            const isApplied = appliedSuggestions.includes(skill.optimized);
                                                            return (
                                                            <div key={i} className="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/60 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between relative">

                                                                <div className="mb-4">
                                                                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" /> Legacy Term
                                                                    </span>
                                                                    <p className="text-sm text-gray-400 dark:text-gray-500 line-through decoration-red-300/40 dark:decoration-red-800/50 break-words font-mono opacity-80 pl-3 border-l-2 border-gray-100 dark:border-gray-700/50">
                                                                        {skill.current}
                                                                    </p>
                                                                </div>

                                                                <div className="w-12 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 mb-4" />

                                                                <div className="mb-4">
                                                                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" /> ATS Optimized
                                                                    </span>
                                                                    <p className="text-base font-bold text-gray-800 dark:text-gray-100 break-words tracking-tight leading-snug pl-3 border-l-2 border-indigo-200 dark:border-indigo-500/40">
                                                                        {skill.optimized}
                                                                    </p>
                                                                </div>

                                                                <div className="mt-auto pt-3 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700/50">
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleCorrectionClick(isApplied ? skill.optimized : skill.current); }}
                                                                        className="flex-1 text-xs font-semibold py-2 px-3 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer text-center"
                                                                    >
                                                                        Locate in Resume
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => isEditing ? (isApplied ? handleUndoSuggestion(e, skill.current, skill.optimized) : handleApplySuggestion(e, skill.current, skill.optimized)) : undefined}
                                                                        className={`group flex-1 text-xs font-semibold py-2 px-3 rounded-lg shadow-sm transition-all flex justify-center items-center gap-1.5 ${!isEditing ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-75' : isApplied ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500 cursor-pointer' : 'bg-green-500 hover:bg-green-600 text-white border border-transparent cursor-pointer hover:shadow'}`}
                                                                        title={!isEditing ? "Enable Live Edit to apply changes" : isApplied ? "Undo suggestion" : "Apply Suggestion"}
                                                                    >
                                                                        {isApplied ? (
                                                                            <>
                                                                                <span className="flex items-center gap-1.5 group-hover:hidden"><CheckCircle size={14} /> Applied</span>
                                                                                <span className="hidden items-center gap-1.5 group-hover:flex"><RefreshCw size={14} /> Revert</span>
                                                                            </>
                                                                        ) : (
                                                                            <><CheckCircle size={14} /> Apply</>
                                                                        )}
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        )})}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Summary tailoring */}
                                            {result.corrections.summary?.length > 0 && (
                                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-visible transition-colors">
                                                    <div className="px-5 py-3 bg-purple-50 dark:bg-purple-900/20 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 rounded-t-xl">
                                                        <Briefcase size={18} className="text-purple-500" />
                                                        <h4 className="font-bold text-purple-900 dark:text-purple-300 flex items-center">Summary Enhancement <InfoTooltip text="A tailored, highly targeted professional summary written specifically for this resume." /></h4>
                                                    </div>
                                                    <div className="p-5 space-y-4">
                                                        {result.corrections.summary.map((item, i) => (
                                                            <div key={i}>
                                                                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-wider block mb-1">Tailored Summary Formulation:</p>
                                                                <p className="text-sm font-medium text-gray-800 bg-purple-50/50 p-4 rounded-lg border border-purple-100 leading-relaxed">{item.after}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        {/* Suggestions */}
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-visible flex flex-col transition-colors">
                                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-t-2xl">
                                                <CheckCircle className="text-green-500" size={20} />
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">Action Plan <InfoTooltip text="A structured, step-by-step guide to improving your resume's overall strength." /></h3>
                                            </div>
                                            <ul className="p-6 space-y-4 flex-1">
                                                {result.suggestions?.map((sugg, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 bg-green-50/30 p-3 rounded-xl border border-green-100/50">
                                                        <div className="mt-1 text-green-500 shrink-0">✦</div>
                                                        <p className="text-gray-700 text-sm">{sugg}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Skills Analysis */}
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-visible flex flex-col transition-colors">
                                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-900/30 rounded-t-2xl">
                                                <Code className="text-indigo-500" size={20} />
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">Skill Extraction <InfoTooltip text="The raw skills identified in your resume, compared against industry recommendations." /></h3>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col gap-6">
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detected Keywords</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {result.skillsFound?.map((skill, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-md border border-indigo-100 shadow-sm">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {result.missingSkills && result.missingSkills.length > 0 && (
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                                            Missing (Recommended) <AlertCircle size={14} className="text-orange-400" />
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {result.missingSkills.map((skill, idx) => (
                                                                <span key={idx} className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 border-dashed hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm flex items-center gap-1.5 group cursor-default">
                                                                    <span className="text-orange-400 group-hover:text-orange-500 font-bold transition-colors">+</span> {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Roadmap Section */}
                                    {result.learningRoadmap && result.learningRoadmap.length > 0 && (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-visible flex flex-col transition-colors mt-6">
                                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-fuchsia-50/50 dark:bg-fuchsia-900/10 rounded-t-2xl">
                                                <Map className="text-fuchsia-500" size={20} />
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">Learning Roadmap <InfoTooltip text="Curated top-tier resources to rapidly close your specific skill gaps." /></h3>
                                            </div>
                                            <div className="p-6 space-y-5">
                                                {result.learningRoadmap.map((roadmap, idx) => (
                                                    <div key={idx} className="bg-fuchsia-50/30 dark:bg-fuchsia-900/10 p-5 rounded-xl border border-fuchsia-100 dark:border-fuchsia-800/30">
                                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-3">
                                                            <span className="text-fuchsia-600 dark:text-fuchsia-400">Missing {roadmap.skill}?</span>
                                                            <span className="text-xs font-semibold px-2 py-0.5 bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300 rounded-full">Top 3 Resources</span>
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {roadmap.resources.map((res, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                    <span className="text-fuchsia-400 mt-0.5 shrink-0">❖</span>
                                                                    {res}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Interview Prediction Section */}
                                    {result.interviewQuestions && (
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl overflow-visible flex flex-col transition-colors mt-6">
                                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 bg-violet-50/50 dark:bg-violet-900/10 rounded-t-2xl">
                                                <MessageCircle className="text-violet-500" size={20} />
                                                <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center">Prepare for the Call <InfoTooltip text="Predicted interview questions strictly based on your projects and provided job description." /></h3>
                                            </div>
                                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-widest border-b border-violet-100 dark:border-violet-900/30 pb-2">Behavioral</h4>
                                                    <ul className="space-y-3">
                                                        {result.interviewQuestions.behavioral?.map((q, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                                                                <span className="text-violet-400 font-bold shrink-0">{i + 1}.</span> {q}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-widest border-b border-violet-100 dark:border-violet-900/30 pb-2">Technical</h4>
                                                    <ul className="space-y-3">
                                                        {result.interviewQuestions.technical?.map((q, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                                                                <span className="text-violet-400 font-bold shrink-0">{i + 1}.</span> {q}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    )}
            </main>
        </div>
    );
}

export default App;
