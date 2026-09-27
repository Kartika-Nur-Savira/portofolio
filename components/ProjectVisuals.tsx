'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Database, Server, Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';

const ACCENT = '#6FC7F1';
const PRIMARY = '#168AC2';
const DARK_BG = '#07162B';

// 1. Classification — Feature Importance Dashboard Mockup
export function ClassificationVisual() {
  const data = [
    { feature: 'Phys. Health', importance: 88 },
    { feature: 'Mobility', importance: 74 },
    { feature: 'BMI Index', importance: 62 },
    { feature: 'Mental Health', importance: 54 },
  ];
  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <span className="text-[7.5px] font-extrabold text-[#6FC7F1] tracking-wider uppercase flex items-center gap-1">
          <Activity size={9} /> Risk Predictors
        </span>
        <span className="text-[7px] font-bold text-white/40">F1: 0.89</span>
      </div>
      <div className="flex-1 my-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -15, right: 8, top: 2, bottom: 2 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="feature"
              width={75}
              tick={{ fontSize: 7, fill: '#A8E6FF', fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="importance" fill="#168AC2" radius={[0, 3, 3, 0]} maxBarSize={9} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between text-[6.5px] font-bold text-white/50 pt-0.5 border-t border-white/05">
        <span>CatBoost Model</span>
        <span className="text-emerald-400">● 443K Records</span>
      </div>
    </div>
  );
}

// 2. ETL — Data Warehouse & Pipeline Visual
export function ETLVisual() {
  const steps = [
    { name: 'OLTP Log', color: '#6FC7F1' },
    { name: 'ETL Clean', color: '#168AC2' },
    { name: 'Star DW', color: '#38BDF8' },
    { name: 'BI Query', color: '#818CF8' },
  ];
  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <span className="text-[7.5px] font-extrabold text-[#6FC7F1] tracking-wider uppercase flex items-center gap-1">
          <Database size={9} /> Star Schema Pipeline
        </span>
        <span className="text-[7px] font-bold text-emerald-400">PostgreSQL</span>
      </div>
      
      <div className="grid grid-cols-4 gap-1 my-1 items-center">
        {steps.map((s, i) => (
          <div key={s.name} className="flex flex-col items-center text-center">
            <div
              className="w-full py-1.5 rounded bg-white/08 border border-white/15 flex items-center justify-center text-[7px] font-bold text-white shadow-sm"
              style={{ borderColor: `${s.color}40` }}
            >
              {s.name}
            </div>
            {i < steps.length - 1 && (
              <span className="text-[7px] text-[#6FC7F1]/60 font-bold mt-0.5">↓</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[6.5px] font-mono text-white/50 pt-0.5 border-t border-white/05">
        <span>dim_customer</span>
        <span>dim_product</span>
        <span className="text-[#6FC7F1]">fact_sales</span>
      </div>
    </div>
  );
}

// 3. Clustering — PCA Scatter Plot Visual
export function ClusteringVisual() {
  const cluster1 = Array.from({ length: 10 }, () => ({ x: Math.random() * 2 - 2.5, y: Math.random() * 2 - 1 }));
  const cluster2 = Array.from({ length: 10 }, () => ({ x: Math.random() * 2 + 1, y: Math.random() * 2 + 0.5 }));
  const cluster3 = Array.from({ length: 8 }, () => ({ x: Math.random() * 1.5 - 0.5, y: Math.random() * 2 - 2 }));

  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <span className="text-[7.5px] font-extrabold text-[#6FC7F1] tracking-wider uppercase">
          PCA 2D Cluster Projection
        </span>
        <span className="text-[7px] font-bold text-white/40">k = 3</span>
      </div>

      <div className="flex-1 my-0.5">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="x" hide />
            <YAxis dataKey="y" hide />
            <Scatter data={cluster1} fill="#6FC7F1" />
            <Scatter data={cluster2} fill="#38BDF8" />
            <Scatter data={cluster3} fill="#818CF8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[6.5px] font-bold text-white/50 pt-0.5 border-t border-white/05">
        <span className="text-[#6FC7F1]">● Group A</span>
        <span className="text-[#38BDF8]">● Group B</span>
        <span className="text-[#818CF8]">● Group C</span>
      </div>
    </div>
  );
}

// 4. Computer Vision — Image Processing Grid
export function VisionVisual() {
  const steps = [
    { label: 'Raw', bg: '#1E293B', text: 'Input' },
    { label: 'CLAHE', bg: '#0284C7', text: 'Contrast' },
    { label: 'Otsu', bg: '#0369A1', text: 'Segment' },
    { label: 'CNN', bg: '#0F172A', text: '98.2%' },
  ];

  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <span className="text-[7.5px] font-extrabold text-[#6FC7F1] tracking-wider uppercase flex items-center gap-1">
          <Cpu size={9} /> Vision Pipeline
        </span>
        <span className="text-[7px] font-bold text-white/40">MobileNetV2</span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 my-1">
        {steps.map((s) => (
          <div
            key={s.label}
            className="aspect-square rounded border border-white/15 flex flex-col items-center justify-center p-1 text-center relative overflow-hidden"
            style={{ background: s.bg }}
          >
            <span className="text-[7px] font-black text-white leading-none mb-0.5">{s.label}</span>
            <span className="text-[5.5px] text-white/70 font-semibold">{s.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[6.5px] font-bold text-white/50 pt-0.5 border-t border-white/05">
        <span>Preprocessing ➔ Conv2D</span>
        <span className="text-emerald-400">Classified</span>
      </div>
    </div>
  );
}

// 5. Time Series — Forecast Curve Visual
export function TimeSeriesVisual() {
  const data = [
    { t: 1, actual: 40 }, { t: 2, actual: 48 }, { t: 3, actual: 44 },
    { t: 4, actual: 58 }, { t: 5, actual: 65 }, { t: 6, actual: 60, forecast: 60 },
    { t: 7, forecast: 70 }, { t: 8, forecast: 76 }, { t: 9, forecast: 82 },
  ];

  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <span className="text-[7.5px] font-extrabold text-[#6FC7F1] tracking-wider uppercase">
          Auto ARIMA Forecast
        </span>
        <span className="text-[7px] font-bold text-white/40">MAPE: 3.8%</span>
      </div>

      <div className="flex-1 my-0.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 2, right: 4, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="t" hide />
            <YAxis hide />
            <ReferenceLine x={6} stroke="#6FC7F1" strokeDasharray="2 2" />
            <Line type="monotone" dataKey="actual" stroke="#168AC2" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="forecast" stroke="#6FC7F1" strokeWidth={2} strokeDasharray="3 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[6.5px] font-bold text-white/50 pt-0.5 border-t border-white/05">
        <span className="text-[#168AC2]">── Historical</span>
        <span className="text-[#6FC7F1]">-- Forecast Horizon</span>
      </div>
    </div>
  );
}

// 6. Secure REST API — Terminal Auth Visual
export function APIVisual() {
  return (
    <div className="w-full h-full bg-[#07111E] rounded-lg p-2 flex flex-col justify-between border border-white/10 font-mono text-[7px] select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[#6FC7F1]">
        <span className="font-extrabold flex items-center gap-1 text-[7.5px] uppercase">
          <Server size={9} /> REST API Endpoint
        </span>
        <span className="text-emerald-400 font-bold">200 OK</span>
      </div>

      <div className="my-1 space-y-0.5 leading-tight text-white/80">
        <div className="text-white/40">$ POST /api/v1/auth/login</div>
        <div className="text-emerald-400">{`{ "token": "Bearer eyJhbGci..." }`}</div>
        <div className="text-[#6FC7F1]">{`{ "role": "admin", "status": "authenticated" }`}</div>
      </div>

      <div className="flex items-center justify-between text-[6.5px] font-sans font-bold text-white/50 pt-0.5 border-t border-white/05">
        <span>FastAPI + Pydantic</span>
        <span className="text-[#6FC7F1]">JWT Auth</span>
      </div>
    </div>
  );
}
