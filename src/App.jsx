import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Edit3,
    Search,
    BookOpen,
    User,
    GraduationCap,
    ChevronRight,
    ExternalLink,
    Save,
    X
} from 'lucide-react';
// Removed static initialData import for dynamic Excel linking

const getStatusStyles = (status, excelColor, excelFontColor) => {
    const s = status.toLowerCase();

    let color = excelColor;
    let textColor = excelFontColor;

    const GREEN = '#00B050';
    const NEON_GREEN = '#00ff9d';

    // Rule 3: Eye-catching glowing terms (High Priority)
    const shouldGlow = s.includes('de recommendation') ||
        s.includes('eic decision') ||
        s.includes('awaiting approval decision') ||
        s.includes('almost published');

    // Rule 1 & 2: Excel Green matches FORCE both to green (No glow yet)
    const isExcelGreen = excelColor === GREEN || excelFontColor === GREEN;

    if (isExcelGreen || shouldGlow) {
        color = GREEN;
        textColor = shouldGlow ? NEON_GREEN : GREEN;
    }

    // Priority 3: Keyword overrides (if not already green)
    if (!color) {
        if (s.includes('european spine journal')) {
            color = '#3182ce';
            textColor = '#3182ce';
        } else if (s.includes('indian journal')) color = '#e53e3e';
        else if (s.includes('gs journal')) color = '#38a169';
        else if (s.includes('asian spine journal')) color = '#805ad5';
        else if (s.includes('rej')) color = '#f56565';
        else if (s.includes('awaiting')) color = '#ecc94b';
        else if (s.includes('yet to start')) color = '#a0aec0';
        else color = '#00f2ff';
    }

    if (!textColor) textColor = color;

    return {
        background: color ? `${color}33` : 'rgba(0, 242, 255, 0.1)',
        color: textColor,
        border: `1px solid ${color ? `${color}aa` : 'rgba(0, 242, 255, 0.4)'}`,
        boxShadow: shouldGlow ? `0 0 15px ${color}44` : 'none',
        textShadow: shouldGlow ? `0 0 8px ${textColor}` : 'none',
        animation: shouldGlow ? 'pulse-glow 2s infinite' : 'none'
    };
};

const App = () => {
    const [papers, setPapers] = useState([]);
    const [researcher, setResearcher] = useState({
        name: "Dr. DHIBIN VIKASH K P",
        credentials: "B.S., MBBS.",
        guide: "",
        guideCredentials: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [editingPaper, setEditingPaper] = useState(null);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [newPaper, setNewPaper] = useState({ title: "", status: "" });

    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/data`);
            const data = await response.json();
            setPapers(data.papers);
            setResearcher(data.researcher);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const saveToExcel = async (updatedPapers) => {
        try {
            await fetch(`${API_BASE}/api/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ papers: updatedPapers })
            });
            fetchData(); // Refresh data to get correct colors from Excel
        } catch (error) {
            console.error("Failed to save data:", error);
        }
    };

    const handleDelete = (id) => {
        const updated = papers.filter(p => p.id !== id);
        setPapers(updated);
        saveToExcel(updated);
    };

    const handleEdit = (paper) => {
        setEditingPaper({ ...paper });
    };

    const handleSaveEdit = () => {
        const updated = papers.map(p => p.id === editingPaper.id ? editingPaper : p);
        setPapers(updated);
        saveToExcel(updated);
        setEditingPaper(null);
    };

    const handleAddPaper = () => {
        if (newPaper.title.trim()) {
            const newId = papers.length > 0 ? Math.max(...papers.map(p => p.id)) + 1 : 1;
            const updated = [...papers, { id: newId, ...newPaper }];
            setPapers(updated);
            saveToExcel(updated);
            setNewPaper({ title: "", status: "" });
            setIsAddingMode(false);
        }
    };

    const filteredPapers = papers.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header Section */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div>
                    <h1 className="neon-text" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Research Portfolio</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={14} /> {researcher.name}, {researcher.credentials}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Guided by</p>
                    <h3 style={{ fontSize: '1rem', color: 'var(--neon-cyan)' }}>{researcher.guide}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', maxWidth: '300px' }}>{researcher.guideCredentials}</p>
                </div>
            </motion.header>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

                {/* Stats / Quick Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: 'rgba(0, 242, 255, 0.1)', padding: '0.75rem', borderRadius: '12px', color: 'var(--neon-cyan)' }}>
                                <BookOpen size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Papers</p>
                                        <h2 style={{ fontSize: '2rem', lineHeight: '1.2' }}>{papers.length} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/ 50</span></h2>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: '700' }}>{Math.round((papers.length / 50) * 100)}%</p>
                                </div>
                                <div className="progress-container" style={{ marginTop: '0.5rem' }}>
                                    <motion.div
                                        className="progress-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((papers.length / 50) * 100, 100)}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    {/* Add more stat cards as needed */}
                </div>

                {/* Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', maxWidth: '400px' }}>
                        <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                        <input
                            type="text"
                            placeholder="Search papers or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => setIsAddingMode(true)}>
                        <Plus size={18} /> New Publication
                    </button>
                </div>

                {/* Table Section */}
                <motion.div
                    layout
                    className="glass-card"
                    style={{ overflow: 'hidden' }}
                >
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ID</th>
                                    <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Publication Title</th>
                                    <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Journal Status</th>
                                    <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredPapers.map((paper, index) => (
                                        <motion.tr
                                            key={paper.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={paper.highlight ? 'row-highlight' : ''}
                                            style={{ borderBottom: '1px solid var(--glass-border)' }}
                                            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                                        >
                                            <td style={{ padding: '1.25rem', color: 'var(--neon-cyan)', fontWeight: '600' }}>#{paper.id}</td>
                                            <td style={{ padding: '1.25rem', maxWidth: '500px' }}>{paper.title}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <span style={{
                                                    padding: '0.4rem 0.8rem',
                                                    borderRadius: '6px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    display: 'inline-block',
                                                    whiteSpace: 'nowrap',
                                                    ...getStatusStyles(paper.status, paper.color, paper.fontColor)
                                                }}>
                                                    {paper.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => handleEdit(paper)}
                                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(paper.id)}
                                                        style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '0.5rem' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Add/Edit Modal Overlay */}
            <AnimatePresence>
                {(isAddingMode || editingPaper) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card"
                            style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem' }}>{isAddingMode ? 'Add New Paper' : 'Edit Publication'}</h2>
                                <button
                                    onClick={() => { setIsAddingMode(false); setEditingPaper(null); }}
                                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Publication Title</label>
                                    <textarea
                                        rows={3}
                                        value={isAddingMode ? newPaper.title : editingPaper?.title}
                                        onChange={(e) => isAddingMode ? setNewPaper({ ...newPaper, title: e.target.value }) : setEditingPaper({ ...editingPaper, title: e.target.value })}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '8px',
                                            padding: '0.75rem',
                                            color: 'white',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Journal Status</label>
                                    <input
                                        type="text"
                                        value={isAddingMode ? newPaper.status : editingPaper?.status}
                                        onChange={(e) => isAddingMode ? setNewPaper({ ...newPaper, status: e.target.value }) : setEditingPaper({ ...editingPaper, status: e.target.value })}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '8px',
                                            padding: '0.75rem',
                                            color: 'white'
                                        }}
                                    />
                                </div>
                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
                                    onClick={isAddingMode ? handleAddPaper : handleSaveEdit}
                                >
                                    <Save size={18} /> {isAddingMode ? 'Add Publication' : 'Save Changes'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
