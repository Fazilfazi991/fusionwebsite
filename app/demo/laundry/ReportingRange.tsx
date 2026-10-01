'use client';
import { useEffect, useState } from 'react';
import { businessDay } from './model';
import s from './laundry.module.css';
export type ReportingRange={mode:'today'|'month'|'7'|'30'|'custom';from:string;to:string};
export const shiftDay=(day:string,offset:number)=>new Date(Date.parse(day+'T12:00:00Z')+offset*86400000).toISOString().slice(0,10);
export function presetRange(mode:ReportingRange['mode'],now=new Date()):ReportingRange{const today=businessDay(now.toISOString());return {mode,from:mode==='month'?today.slice(0,7)+'-01':shiftDay(today,mode==='7'?-6:mode==='30'?-29:0),to:today};}
export function rangeError(from:string,to:string){const valid=(day:string)=>/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(Date.parse(day+'T12:00:00Z'))&&new Date(day+'T12:00:00Z').toISOString().slice(0,10)===day;if(!valid(from)||!valid(to))return 'Enter both valid start and end dates.';if(from>to)return 'Start date must be on or before end date.';if((Date.parse(to)-Date.parse(from))/86400000>365)return 'Choose a range of up to 366 days for this demo.';return '';}
export const rangeDays=(range:ReportingRange)=>rangeError(range.from,range.to)?[]:Array.from({length:Math.round((Date.parse(range.to)-Date.parse(range.from))/86400000)+1},(_,i)=>shiftDay(range.from,i));
export const withinRange=(at:string,range:ReportingRange)=>{const day=businessDay(at);return day>=range.from&&day<=range.to;};
export const rangeLabel=(range:ReportingRange)=>`${range.from} to ${range.to}`;
export default function ReportingRangePicker({range,onChange}:{range:ReportingRange;onChange:(r:ReportingRange)=>void}){
 const [from,setFrom]=useState(range.from),[to,setTo]=useState(range.to),[error,setError]=useState('');
 useEffect(()=>{setFrom(range.from);setTo(range.to);setError('')},[range.from,range.to]);
 return <div className={s.rangeControls}><label>Reporting period<select aria-label="Reporting period" value={range.mode} onChange={e=>{const mode=e.target.value as ReportingRange['mode'];setError('');onChange(mode==='custom'?{...range,mode}:presetRange(mode))}}><option value="today">Today</option><option value="month">This month</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="custom">Custom dates</option></select></label>{range.mode==='custom'&&<form onSubmit={e=>{e.preventDefault();const issue=rangeError(from,to);setError(issue);if(!issue)onChange({mode:'custom',from,to})}}><label>Start date<input aria-label="Report start date" type="date" value={from} onChange={e=>setFrom(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error?'range-error':undefined}/></label><label>End date<input aria-label="Report end date" type="date" value={to} onChange={e=>setTo(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error?'range-error':undefined}/></label><button type="submit">Apply dates</button>{error&&<p role="alert" id="range-error">{error} The displayed report keeps the last applied range.</p>}</form>}<p>{rangeLabel(range)} · inclusive Bahrain dates · local records</p></div>;
}
