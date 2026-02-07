import React, { useState } from 'react';
import { Activity, Play, ShieldAlert, CheckCircle, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [page, setPage] = useState<'login' | 'dashboard'>('login');
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Function to run the "succession of codes"
  const runSequence = async () => {
    if (isRunning) return;
    setIsRunning(true);
    const steps = [
      "> Connecting to OpenCap...",
      "> Fetching session_id: 8821-X",
      "> Running biomechanical_eval.py",
      "> Processing RL Gait weights...",
      "> Syncing MuJoCo frames..."
    ];
    
    for (const step of steps) {
      setLogs(prev => [...prev, step]);
      await new Promise(r => setTimeout(r, 800));
    }
    setIsRunning(false);
  };

  if (page === 'login') {
    return (
      <div style={styles.container}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.loginCard}>
          <div style={styles.iconCircle}><Cpu color="#a855f7" /></div>
          <h1 style={styles.title}>GAIT<span style={{color: '#a855f7'}}>LAB</span></h1>
          <p style={styles.subtitle}>OpenCap Biomechanical Analysis</p>
          
          <input style={styles.input} placeholder="Login ID" />
          <input style={styles.input} type="password" placeholder="Password" />
          <input style={styles.inputHighlight} placeholder="OpenCap Session ID" />
          
          <button style={styles.button} onClick={() => setPage('dashboard')}>
            Launch Session
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <Activity color="#a855f7" />
          <span style={{fontWeight: 'bold', letterSpacing: '2px'}}>SESSION_ACTIVE</span>
        </div>
        <div style={styles.badge}>DASHBOARD_V1.0</div>
      </header>

      <div style={styles.videoGrid}>
        <div style={styles.videoCard}>
          <div style={{color: '#ef4444', fontSize: '12px', marginBottom: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
            <ShieldAlert size={14} style={{marginRight: '5px'}}/> RAW OPENCAP DATA
          </div>
          <div style={styles.videoPlaceholder}>
            <video autoPlay loop muted style={{width: '100%', borderRadius: '15px'}}>
               <source src="/folie.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div style={styles.videoCard}>
          <div style={{color: '#22c55e', fontSize: '12px', marginBottom: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center'}}>
            <CheckCircle size={14} style={{marginRight: '5px'}}/> RL OPTIMIZED MODEL
          </div>
          <div style={{...styles.videoPlaceholder, border: '1px solid #a855f733'}}>
             <video autoPlay loop muted style={{width: '100%', borderRadius: '15px'}}>
               <source src="YOUR_GITHUB_RAW_URL_HERE" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div style={styles.bottomRow}>
        <div style={styles.terminal}>
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
             <span style={{color: '#666', fontSize: '10px'}}>TERMINAL_CORE</span>
             <Play size={14} color={isRunning ? "#333" : "#a855f7"} style={{cursor: 'pointer'}} onClick={runSequence} />
           </div>
           <div style={{fontSize: '12px', fontFamily: 'monospace', color: '#a855f7'}}>
              {logs.map((l, i) => <div key={i}>{l}</div>)}
              {logs.length === 0 && <div style={{color: '#333'}}>{"Ready for sequence..."}</div>}
           </div>
        </div>
        <div style={styles.aiBox}>
           <h4 style={{color: '#a855f7', margin: '0 0 10px 0', fontSize: '14px'}}>AI FEEDBACK</h4>
           <p style={{fontSize: '13px', fontStyle: 'italic', color: '#ccc'}}>
             "Neural weights loaded. Anomaly detected in right ankle flexion. Correction applied via RL policy."
           </p>
        </div>
      </div>
    </div>
  );
}

const styles: {[key: string]: React.CSSProperties} = {
  container: { height: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' },
  loginCard: { backgroundColor: '#0f0f0f', padding: '40px', borderRadius: '30px', border: '1px solid #222', width: '350px', textAlign: 'center' },
  iconCircle: { width: '60px', height: '60px', backgroundColor: '#a855f71a', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '5px', letterSpacing: '-1px' },
  subtitle: { color: '#666', fontSize: '12px', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' },
  inputHighlight: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#1a1a1a', border: '1px solid #a855f755', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#a855f7', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  dashboardContainer: { minHeight: '100vh', backgroundColor: '#080808', color: 'white', padding: '40px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  badge: { padding: '5px 15px', backgroundColor: '#1a1a1a', borderRadius: '20px', fontSize: '10px', border: '1px solid #333' },
  videoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' },
  videoCard: { backgroundColor: '#0f0f0f', padding: '20px', borderRadius: '24px', border: '1px solid #222' },
  videoPlaceholder: { width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bottomRow: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' },
  terminal: { backgroundColor: '#000', padding: '20px', borderRadius: '20px', border: '1px solid #222', height: '150px', overflowY: 'auto' },
  aiBox: { backgroundColor: '#a855f70a', padding: '20px', borderRadius: '20px', border: '1px solid #a855f722' }
};