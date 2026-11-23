import React, {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
function App(){
 const [tasks,setTasks]=useState([]),[title,setTitle]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 async function request(url,opts={}){const r=await fetch(url,{...opts,headers:{'Content-Type':'application/json'}}); if(!r.ok){let j=await r.json().catch(()=>({}));throw Error(j.error||`Request failed (${r.status})`)} return r.status===204?null:r.json()}
 async function load(){try{setTasks(await request('/api/tasks'));setError('')}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 async function action(fn){setBusy(true);setError('');try{await fn();await load()}catch(e){setError(e.message)}finally{setBusy(false)}}
 function add(e){e.preventDefault();if(!title.trim())return;action(async()=>{await request('/api/tasks',{method:'POST',body:JSON.stringify({title})});setTitle('')})}
 const columns=[['todo','To do'],['doing','In progress'],['done','Done']];
 return <main><header><p className="eyebrow">SAIM ULLAH / PROJECT 01</p><h1>Make space<br/><span>for good work.</span></h1><p>A little taskboard for the things you’re building.</p></header><form onSubmit={add}><label htmlFor="task">NEW TASK</label><div className="input"><input id="task" maxLength={120} value={title} onChange={e=>setTitle(e.target.value)} placeholder="What are you working on?" required/><button disabled={busy}>Add task ↗</button></div></form>{error&&<p className="error" role="alert">{error}. Check that the API and MongoDB are running.</p>}<section className="board">{columns.map(([key,label])=><div className="column" key={key}><h2>{label} <small>{tasks.filter(t=>t.status===key).length}</small></h2>{tasks.filter(t=>t.status===key).map(t=><article key={t._id}><p>{t.title}</p><div className="actions"><label>Move to <select aria-label={`Move ${t.title}`} disabled={busy} value={t.status} onChange={e=>action(()=>request(`/api/tasks/${t._id}`,{method:'PATCH',body:JSON.stringify({status:e.target.value})}))}>{columns.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><button className="delete" disabled={busy} aria-label={`Delete ${t.title}`} onClick={()=>{if(window.confirm('Delete this task?'))action(()=>request(`/api/tasks/${t._id}`,{method:'DELETE'}))}}>Delete</button></div></article>)}{!tasks.some(t=>t.status===key)&&<p className="empty">A clear space for your next idea.</p>}</div>)}</section><footer>Built with MongoDB, Express, React & Node.js</footer></main>
}
createRoot(document.getElementById('root')).render(<App/>);
