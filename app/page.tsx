'use client'
import React, { useMemo, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const clamp01 = (v:number)=>Math.max(0, Math.min(1, v));
const defaultTargets = { revenuePerArrival:800, localEmploymentShare:0.60, waterPerNight:200, energyPerNight:18,
  wastePerNight:1.5, co2PerNight:12, visitorSatisfaction:4.3, residentSatisfaction:3.8,
  leakage:0.25, localBusinessShare:0.50, seasonalityPeakShare:0.35, lengthOfStay:4.5, crisisReadiness:3.5 };
const defaultWeights = { economic:.20, environmental:.25, satisfaction:.20, social:.15, resilience:.20 };
const example = { year:2025, destination:'Νησί Α', arrivals:550000, revenue:465000000, totalJobs:12500, localEmploymentShare:0.61,
  nights:2300000, waterPerNight:205, energyPerNight:18.2, wastePerNight:1.6, co2PerNight:12.4,
  visitorSatisfaction:4.5, residentSatisfaction:3.9, leakage:0.24, localBusinessShare:0.52,
  seasonalityPeakShare:0.36, lengthOfStay:4.6, crisisReadiness:3.8 };

function numberOrEmpty(v:any){ const n = Number(v); return Number.isFinite(n) ? n : 0; }

export default function Page(){
  const [form, setForm] = useState(example);
  const revenuePerArrival = useMemo(()=> form.arrivals>0 ? form.revenue/form.arrivals : 0, [form.revenue, form.arrivals]);
  const economic = useMemo(()=> clamp01(0.5*Math.min(1, defaultTargets.revenuePerArrival/Math.max(1, revenuePerArrival))
    + 0.5*Math.min(1, form.localEmploymentShare/Math.max(0.0001, defaultTargets.localEmploymentShare))) * 100
  , [form, revenuePerArrival]);
  const environmental = useMemo(()=> {
    const w = Math.min(1, defaultTargets.waterPerNight/Math.max(0.0001, form.waterPerNight));
    const e = Math.min(1, defaultTargets.energyPerNight/Math.max(0.0001, form.energyPerNight));
    const wa = Math.min(1, defaultTargets.wastePerNight/Math.max(0.0001, form.wastePerNight));
    const c = Math.min(1, defaultTargets.co2PerNight/Math.max(0.0001, form.co2PerNight));
    return clamp01(0.25*w+0.25*e+0.25*wa+0.25*c)*100;
  }, [form]);
  const satisfaction = useMemo(()=> clamp01(
    0.5*Math.min(1, form.visitorSatisfaction/Math.max(0.0001, defaultTargets.visitorSatisfaction)) +
    0.5*Math.min(1, form.residentSatisfaction/Math.max(0.0001, defaultTargets.residentSatisfaction))
  )*100, [form]);
  const social = useMemo(()=> clamp01(
    0.5*Math.min(1, defaultTargets.leakage/Math.max(0.0001, form.leakage)) +
    0.5*Math.min(1, form.localBusinessShare/Math.max(0.0001, defaultTargets.localBusinessShare))
  )*100, [form]);
  const resilience = useMemo(()=> clamp01(
    0.34*Math.min(1, defaultTargets.seasonalityPeakShare/Math.max(0.0001, form.seasonalityPeakShare)) +
    0.33*Math.min(1, form.lengthOfStay/Math.max(0.0001, defaultTargets.lengthOfStay)) +
    0.33*Math.min(1, form.crisisReadiness/Math.max(0.0001, defaultTargets.crisisReadiness))
  )*100, [form]);
  const sumW = Object.values(defaultWeights).reduce((a,b)=>a+b,0)||1;
  const overall = (defaultWeights.economic/sumW)*economic + (defaultWeights.environmental/sumW)*environmental
    + (defaultWeights.satisfaction/sumW)*satisfaction + (defaultWeights.social/sumW)*social + (defaultWeights.resilience/sumW)*resilience;
  const radarData = [
    { name: "Οικονομικός", value: Number(economic.toFixed(1)) },
    { name: "Περιβάλλον", value: Number(environmental.toFixed(1)) },
    { name: "Ικανοποίηση", value: Number(satisfaction.toFixed(1)) },
    { name: "Κοιν. Ισορροπία", value: Number(social.toFixed(1)) },
    { name: "Ανθεκτικότητα", value: Number(resilience.toFixed(1)) }
  ];
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Tourindex — Δείκτες Βιώσιμου Τουρισμού</h1>
      <div className="grid gap-6" style={{gridTemplateColumns:'repeat(2, minmax(0,1fr))'}}>
        <div className="card">
          <div className="header"><div className="text-lg font-semibold">Βασικά στοιχεία</div></div>
          <div className="content grid gap-3">
            <div><div className="text-sm">Έτος</div><input type="number" value={form.year} onChange={(e)=>setForm(prev=>({...prev, year:numberOrEmpty(e.target.value)}))}/></div>
            <div><div className="text-sm">Προορισμός</div><input value={form.destination} onChange={(e)=>setForm({...form, destination: e.target.value})}/></div>
            <div><div className="text-sm">Αφίξεις</div><input type="number" value={form.arrivals} onChange={(e)=>setForm({...form, arrivals:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Έσοδα (€)</div><input type="number" value={form.revenue} onChange={(e)=>setForm({...form, revenue:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Τοπική Απασχόληση (0–1)</div><input type="number" step="0.01" value={form.localEmploymentShare} onChange={(e)=>setForm({...form, localEmploymentShare:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Νερό/Διανυκτέρευση (λίτρα)</div><input type="number" value={form.waterPerNight} onChange={(e)=>setForm({...form, waterPerNight:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Ενέργεια/Διανυκτέρευση (kWh)</div><input type="number" step="0.1" value={form.energyPerNight} onChange={(e)=>setForm({...form, energyPerNight:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Απόβλητα/Διανυκτέρευση (kg)</div><input type="number" step="0.1" value={form.wastePerNight} onChange={(e)=>setForm({...form, wastePerNight:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">CO₂/Διανυκτέρευση (kg)</div><input type="number" step="0.1" value={form.co2PerNight} onChange={(e)=>setForm({...form, co2PerNight:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Ικανοπ. Επισκεπτών (1–5)</div><input type="number" step="0.1" value={form.visitorSatisfaction} onChange={(e)=>setForm({...form, visitorSatisfaction:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Ικανοπ. Κατοίκων (1–5)</div><input type="number" step="0.1" value={form.residentSatisfaction} onChange={(e)=>setForm({...form, residentSatisfaction:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Διαρροή (0–1)</div><input type="number" step="0.01" value={form.leakage} onChange={(e)=>setForm({...form, leakage:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Τοπικές Επιχειρήσεις (0–1)</div><input type="number" step="0.01" value={form.localBusinessShare} onChange={(e)=>setForm({...form, localBusinessShare:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Peak Μήνα (0–1)</div><input type="number" step="0.01" value={form.seasonalityPeakShare} onChange={(e)=>setForm({...form, seasonalityPeakShare:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Διάρκεια Παραμονής (νύχτες)</div><input type="number" step="0.1" value={form.lengthOfStay} onChange={(e)=>setForm({...form, lengthOfStay:numberOrEmpty(e.target.value)})}/></div>
            <div><div className="text-sm">Ετοιμότητα Κρίσεων (1–5)</div><input type="number" step="0.1" value={form.crisisReadiness} onChange={(e)=>setForm({...form, crisisReadiness:numberOrEmpty(e.target.value)})}/></div>
          </div>
        </div>
        <div className="card">
          <div className="header"><div className="text-lg font-semibold">Radar – 5 Υπο-Δείκτες</div></div>
          <div className="content" style={{height:360}}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={110}>
                <PolarGrid /><PolarAngleAxis dataKey="name" /><PolarRadiusAxis domain={[0,100]} tickCount={6} />
                <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid gap-2 text-sm" style={{marginTop:12}}>
              <div className="flex" style={{justifyContent:'space-between'}}><span className="text-gray-700">Συνολικός Δείκτης</span><span>{overall.toFixed(1)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
