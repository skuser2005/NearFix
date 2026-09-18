const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'data.json');
const PORT = Number(process.env.PORT || 5050);
const JWT_SECRET = process.env.JWT_SECRET || 'nearfix-local-demo-secret-change-me';
const AI_API_KEY = process.env.AI_API_KEY || '';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '';
const AI_API_URL = process.env.AI_API_URL || '';
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_RESEND_MS = 30 * 1000;
const OTP_MAX_ATTEMPTS = 5;

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp'
};

const SERVICES = [
  ['🔌','Electrical','Electrician'],['🚰','Plumbing','Plumber'],['❄️','AC Repair','AC Technician'],['🔧','Appliance Repair','Appliance Technician'],
  ['🪚','Carpentry','Carpenter'],['🎨','Painting','Painter'],['🧹','Cleaning','Cleaning Expert'],['💻','Computer Repair','Computer Technician'],
  ['📱','Mobile Repair','Mobile Technician'],['🔑','Locksmith','Locksmith'],['🚗','Mechanic','Vehicle Mechanic'],['🛠️','General Repair','Handyman']
];


const PARTS_CATALOG = [
  {id:'p1',barcode:'8901001000011',name:'1/2 inch Brass Ball Valve',category:'Plumbing',brand:'NearFix Supply',price:185,unit:'piece',stock:42,image:'assets/parts/brass-ball-valve.svg',description:'Brass quarter-turn valve for common household water lines.',compatible:['Plumbing']},
  {id:'p2',barcode:'8901001000012',name:'Braided Water Hose 1.5m',category:'Plumbing',brand:'NearFix Supply',price:240,unit:'piece',stock:28,image:'assets/parts/water-hose.svg',description:'Flexible braided inlet hose with standard fittings.',compatible:['Plumbing']},
  {id:'p3',barcode:'8901001000013',name:'16A Modular Switch',category:'Electrical',brand:'NearFix Supply',price:95,unit:'piece',stock:75,image:'assets/parts/modular-switch.svg',description:'16A modular switch for residential circuits.',compatible:['Electrical']},
  {id:'p4',barcode:'8901001000014',name:'6A Universal Socket',category:'Electrical',brand:'NearFix Supply',price:125,unit:'piece',stock:63,image:'assets/parts/socket.svg',description:'Universal modular socket with safety shutters.',compatible:['Electrical']},
  {id:'p5',barcode:'8901001000015',name:'AC Copper Capacitor 35+5 µF',category:'AC Repair',brand:'NearFix Supply',price:520,unit:'piece',stock:19,image:'assets/parts/capacitor.svg',description:'Dual-run capacitor for compatible split/window AC units.',compatible:['AC Repair']},
  {id:'p6',barcode:'8901001000016',name:'AC Air Filter 1.5 Ton',category:'AC Repair',brand:'NearFix Supply',price:310,unit:'piece',stock:34,image:'assets/parts/ac-filter.svg',description:'Washable replacement mesh filter for common AC units.',compatible:['AC Repair']},
  {id:'p7',barcode:'8901001000017',name:'Washing Machine Drain Pump',category:'Appliance Repair',brand:'NearFix Supply',price:690,unit:'piece',stock:14,image:'assets/parts/drain-pump.svg',description:'Replacement drain pump for compatible washing machines.',compatible:['Appliance Repair']},
  {id:'p8',barcode:'8901001000018',name:'Laptop 65W USB-C Adapter',category:'Computer Repair',brand:'NearFix Supply',price:1199,unit:'piece',stock:21,image:'assets/parts/usb-c-adapter.svg',description:'65W USB-C PD adapter for compatible laptops.',compatible:['Computer Repair']},
  {id:'p9',barcode:'8901001000019',name:'Door Hinge Heavy Duty',category:'Carpentry',brand:'NearFix Supply',price:160,unit:'pair',stock:51,image:'assets/parts/door-hinge.svg',description:'Heavy-duty steel hinges for interior/exterior doors.',compatible:['Carpentry']},
  {id:'p10',barcode:'8901001000020',name:'LED Bulb 12W',category:'Electrical',brand:'NearFix Supply',price:110,unit:'piece',stock:120,image:'assets/parts/led-bulb.svg',description:'12W energy-efficient LED bulb, warm/neutral compatible.',compatible:['Electrical']},
  {id:'p11',barcode:'8901001000021',name:'PTFE Thread Seal Tape',category:'Plumbing',brand:'NearFix Supply',price:35,unit:'roll',stock:200,image:'assets/parts/ptfe-tape.svg',description:'Thread sealing tape for plumbing fittings.',compatible:['Plumbing']},
  {id:'p12',barcode:'8901001000022',name:'Universal Extension Cord 5m',category:'Electrical',brand:'NearFix Supply',price:349,unit:'piece',stock:36,image:'assets/parts/extension-cord.svg',description:'5m heavy-duty extension cord with overload protection.',compatible:['Electrical']}
];

const seed = {
  users: [
    {id:'u1', role:'customer', name:'Rahul Mehta', email:'customer@nearfix.demo', password:'demo123', phone:'+91 98765 43210'},
    {id:'u2', role:'technician', name:'Ramesh Kumar', email:'technician@nearfix.demo', password:'demo123', phone:'+91 98765 43211'},
    {id:'u3', role:'admin', name:'NearFix Admin', email:'admin@nearfix.demo', password:'demo123', phone:'+91 98765 43212'},
    {id:'u4', role:'technician', name:'Amit Sharma', email:'amit@nearfix.demo', password:'demo123', phone:'+91 98765 43213'},
    {id:'u5', role:'technician', name:'Vikas Verma', email:'vikas@nearfix.demo', password:'demo123', phone:'+91 98765 43214'},
    {id:'u6', role:'technician', name:'Mohit Singh', email:'mohit@nearfix.demo', password:'demo123', phone:'+91 98765 43215'},
    {id:'u7', role:'technician', name:'Pankaj Yadav', email:'pankaj@nearfix.demo', password:'demo123', phone:'+91 98765 43216'},
    {id:'u8', role:'technician', name:'Neeraj Kumar', email:'neeraj@nearfix.demo', password:'demo123', phone:'+91 98765 43217'},
    {id:'u9', role:'technician', name:'Sahil Gupta', email:'sahil@nearfix.demo', password:'demo123', phone:'+91 98765 43218'},
    {id:'u10', role:'technician', name:'Arjun Malik', email:'arjun@nearfix.demo', password:'demo123', phone:'+91 98765 43219'}
  ],
  technicians: [
    {id:1,userId:'u2',name:'Ramesh Kumar',service:'Plumber',category:'Plumbing',rating:4.8,reviews:124,exp:5,distance:2.1,price:299,available:true,jobs:127,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:96,completionRate:97,cancellationRate:2,repeatCustomers:54,eta:8,area:'Sonipat',lat:28.9931,lng:77.0151,locationSource:'demo-seed',skills:['Pipe Repair','Faucet Repair','Bathroom Fitting','Water Leakage'],upiId:'ramesh.demo@nearfix'},
    {id:2,userId:'u4',name:'Amit Sharma',service:'Electrician',category:'Electrical',rating:4.9,reviews:98,exp:7,distance:1.4,price:349,available:true,jobs:184,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:98,completionRate:98,cancellationRate:1,repeatCustomers:71,eta:6,area:'Sonipat',lat:28.9918,lng:77.0224,locationSource:'demo-seed',skills:['Wiring','Switch Repair','Fan Installation','MCB Repair'],upiId:'amit.demo@nearfix'},
    {id:3,userId:'u5',name:'Vikas Verma',service:'AC Technician',category:'AC Repair',rating:4.7,reviews:86,exp:6,distance:3.2,price:399,available:true,jobs:109,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:94,completionRate:95,cancellationRate:3,repeatCustomers:45,eta:12,area:'Sonipat',lat:28.9972,lng:77.0097,locationSource:'demo-seed',skills:['AC Service','Gas Refill','Cooling Issue','Installation'],upiId:'vikas.demo@nearfix'},
    {id:4,userId:'u6',name:'Mohit Singh',service:'Carpenter',category:'Carpentry',rating:4.6,reviews:72,exp:4,distance:4.4,price:279,available:false,jobs:91,verified:true,identityVerified:true,skillVerified:true,experienceVerified:false,response:91,completionRate:94,cancellationRate:4,repeatCustomers:31,eta:18,area:'Sonipat',lat:28.9876,lng:77.0275,locationSource:'demo-seed',skills:['Furniture Repair','Door Repair','Wood Polish'],upiId:'mohit.demo@nearfix'},
    {id:5,userId:'u7',name:'Pankaj Yadav',service:'Appliance Technician',category:'Appliance Repair',rating:4.8,reviews:63,exp:5,distance:2.8,price:329,available:true,jobs:88,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:95,completionRate:96,cancellationRate:2,repeatCustomers:28,eta:10,area:'Sonipat',lat:28.9995,lng:77.0192,locationSource:'demo-seed',skills:['Washing Machine','Refrigerator','Microwave'],upiId:'pankaj.demo@nearfix'},
    {id:6,userId:'u8',name:'Neeraj Kumar',service:'Cleaning Expert',category:'Cleaning',rating:4.9,reviews:141,exp:8,distance:1.9,price:249,available:true,jobs:231,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:99,completionRate:99,cancellationRate:1,repeatCustomers:102,eta:7,area:'Sonipat',lat:28.9951,lng:77.0108,locationSource:'demo-seed',skills:['Deep Cleaning','Kitchen','Bathroom','Sofa Cleaning'],upiId:'neeraj.demo@nearfix'},
    {id:7,userId:'u9',name:'Sahil Gupta',service:'Computer Technician',category:'Computer Repair',rating:4.7,reviews:57,exp:6,distance:3.7,price:399,available:true,jobs:76,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:93,completionRate:95,cancellationRate:3,repeatCustomers:22,eta:14,area:'Sonipat',lat:28.9891,lng:77.0204,locationSource:'demo-seed',skills:['Laptop Repair','Windows','Networking','Data Backup'],upiId:'sahil.demo@nearfix'},
    {id:8,userId:'u10',name:'Arjun Malik',service:'Handyman',category:'General Repair',rating:4.5,reviews:42,exp:3,distance:4.8,price:229,available:true,jobs:53,verified:false,identityVerified:false,skillVerified:false,experienceVerified:true,response:89,completionRate:91,cancellationRate:6,repeatCustomers:14,eta:20,area:'Sonipat',lat:28.9855,lng:77.0147,locationSource:'demo-seed',skills:['Minor Repairs','Drilling','Assembly'],upiId:'arjun.demo@nearfix'}
  ],
  services: SERVICES.map((s,i)=>({id:`s${i+1}`,icon:s[0],name:s[1],technicianType:s[2],active:true,baseMin:[300,250,500,350,400,500,250,400,300,350,500,250][i],baseMax:[1200,1200,2500,2500,1800,3000,1500,2500,2000,1500,5000,1500][i]})),
  bookings: [], quotes: [], payments: [], invoices: [], reviews: [], messages: [], notifications: [], disputes: [], verifications: [], aiAnalyses: [], auditLogs: [], pricingRules: [], otpChallenges: [], pendingRegistrations: [], parts: PARTS_CATALOG.map(clone)
};

function clone(v){ return JSON.parse(JSON.stringify(v)); }
function ensureTechnicianCoverage(data){
  const profiles=[
    ['Electrical','Electrician',['Wiring','Switch Repair','Fan Installation','MCB Repair']],
    ['Plumbing','Plumber',['Pipe Repair','Faucet Repair','Bathroom Fitting','Water Leakage']],
    ['AC Repair','AC Technician',['AC Service','Gas Refill','Cooling Issue','Installation']],
    ['Appliance Repair','Appliance Technician',['Washing Machine','Refrigerator','Microwave','Small Appliance']],
    ['Carpentry','Carpenter',['Furniture Repair','Door Repair','Wood Polish','Fittings']],
    ['Painting','Painter',['Interior Painting','Wall Repair','Texture','Touch-up']],
    ['Cleaning','Cleaning Expert',['Deep Cleaning','Kitchen','Bathroom','Sofa Cleaning']],
    ['Computer Repair','Computer Technician',['Laptop Repair','Windows','Networking','Data Backup']],
    ['Mobile Repair','Mobile Technician',['Screen Repair','Battery','Charging Port','Software']],
    ['Locksmith','Locksmith',['Lock Repair','Key Duplication','Door Lock','Emergency Unlock']],
    ['Mechanic','Vehicle Mechanic',['General Service','Brake Check','Battery','Engine Diagnostics']],
    ['General Repair','Handyman',['Minor Repairs','Drilling','Assembly','Installation']]
  ];
  const names=['Aman','Rohit','Deepak','Kunal','Sandeep','Manish','Naveen','Varun','Harish','Gaurav','Vivek','Ankit','Tarun','Sumit','Lokesh','Prakash'];
  const surnames=['Sharma','Kumar','Verma','Yadav','Singh','Gupta'];
  let nextId=Math.max(0,...data.technicians.map(t=>Number(t.id)||0))+1;
  for(const [category,service,skills] of profiles){
    const count=data.technicians.filter(t=>t.category===category||t.service===service).length;
    for(let i=count;i<5;i++){
      const n=names[(nextId+i)%names.length]+' '+surnames[(nextId+i*2)%surnames.length];
      const uid=`tech_seed_${nextId}`;
      if(!data.users.some(u=>u.id===uid)) data.users.push({id:uid,role:'technician',name:n,email:`${uid}@nearfix.demo`,password:'demo123',phone:`+91 90000 ${String(10000+nextId).slice(-5)}`});
      const angle=nextId*0.73; const lat=28.97+0.035*Math.sin(angle); const lng=77.00+0.045*Math.cos(angle);
      data.technicians.push({id:nextId,userId:uid,name:n,service,category,rating:Number((4.2+((nextId*7)%8)/10).toFixed(1)),reviews:20+(nextId*13)%120,exp:2+(nextId%9),distance:3,price:229+(nextId%6)*45,available:nextId%5!==0,jobs:40+(nextId*17)%180,verified:true,identityVerified:true,skillVerified:true,experienceVerified:true,response:88+(nextId%12),completionRate:92+(nextId%8),cancellationRate:1+(nextId%5),repeatCustomers:10+(nextId%70),eta:8+(nextId%15),area:'Sonipat',lat,lng,locationSource:'demo-seed',skills:[...skills],upiId:`${uid}@nearfix`});
      nextId++;
    }
  }
}

function ensureDb(){
  fs.mkdirSync(DATA_DIR,{recursive:true});
  if(!fs.existsSync(DATA_FILE)){ const fresh=clone(seed); ensureTechnicianCoverage(fresh); fs.writeFileSync(DATA_FILE, JSON.stringify(fresh,null,2)); }
  try { const data=JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); if(!Array.isArray(data.parts)) data.parts=clone(PARTS_CATALOG); if(!Array.isArray(data.otpChallenges)) data.otpChallenges=[]; if(!Array.isArray(data.pendingRegistrations)) data.pendingRegistrations=[]; ensureTechnicianCoverage(data); data.technicians.forEach(t=>{if(!t.upiId)t.upiId=`${String(t.name||'technician').toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.|\.$/g,'')}.${t.id}@nearfix`;}); save(data); return data; }
  catch { fs.writeFileSync(DATA_FILE, JSON.stringify(seed,null,2)); return clone(seed); }
}
function db(){ return ensureDb(); }
function save(data){ fs.writeFileSync(DATA_FILE, JSON.stringify(data,null,2)); }
function id(prefix='id'){ return `${prefix}_${crypto.randomUUID()}`; }
function now(){ return new Date().toISOString(); }
function safeUser(u){ if(!u) return null; const {password,passwordHash,...rest}=u; return rest; }
function json(res,status,body,headers={}){ res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,PATCH,PUT,DELETE,OPTIONS',...headers}); res.end(JSON.stringify(body)); }
function readBody(req){ return new Promise((resolve,reject)=>{ let raw=''; req.on('data',c=>{raw+=c;if(raw.length>4e6) reject(new Error('Payload too large'));}); req.on('end',()=>{if(!raw)return resolve({});try{resolve(JSON.parse(raw));}catch(e){reject(new Error('Invalid JSON'));}}); req.on('error',reject); }); }
function sign(value){ return crypto.createHmac('sha256',JWT_SECRET).update(value).digest('base64url'); }
function tokenFor(u){ const payload=Buffer.from(JSON.stringify({id:u.id,role:u.role,exp:Date.now()+7*86400000})).toString('base64url'); return `${payload}.${sign(payload)}`; }
function auth(req){
  const h=req.headers.authorization||''; if(!h.startsWith('Bearer ')) return null;
  const [payload,sig]=h.slice(7).split('.'); if(!payload||!sig||!crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(sign(payload)))) return null;
  try { const p=JSON.parse(Buffer.from(payload,'base64url').toString()); if(p.exp<Date.now()) return null; return p; } catch { return null; }
}
function requireAuth(req,res,roles){ const me=auth(req); if(!me){json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});return null;} if(roles&&!roles.includes(me.role)){json(res,403,{success:false,message:'Forbidden',code:'FORBIDDEN'});return null;} return me; }
function normalizePhone(v){ return String(v||'').replace(/[^+0-9]/g,''); }
function otpCode(){ return String(crypto.randomInt(0,1000000)).padStart(6,'0'); }
function hashOtp(code){ return crypto.createHash('sha256').update(String(code)).digest('hex'); }
async function sendOtpSms(phone,code){
  if(!(TWILIO_ACCOUNT_SID&&TWILIO_AUTH_TOKEN&&TWILIO_PHONE_NUMBER)) return {sent:false,mode:'demo',message:'SMS provider not configured'};
  const auth=Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const body=new URLSearchParams({To:phone,From:TWILIO_PHONE_NUMBER,Body:`Your NearFix verification code is ${code}. It expires in 5 minutes.`}).toString();
  const r=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,{method:'POST',headers:{Authorization:`Basic ${auth}`,'Content-Type':'application/x-www-form-urlencoded'},body});
  if(!r.ok){const t=await r.text(); throw new Error(`OTP SMS failed: ${t.slice(0,180)}`);}
  return {sent:true,mode:'twilio'};
}
async function issueOtp(data,{purpose,phone,userId=null,email='',payload=null}){
  const normalized=normalizePhone(phone); if(!normalized) throw new Error('A valid mobile number is required for OTP verification.');
  const existing=data.otpChallenges.find(x=>x.purpose===purpose&&x.phone===normalized&&!x.verified);
  if(existing && Date.now()-new Date(existing.createdAt).getTime()<OTP_RESEND_MS) { const wait=Math.ceil((OTP_RESEND_MS-(Date.now()-new Date(existing.createdAt).getTime()))/1000); const err=new Error(`Please wait ${wait}s before requesting another OTP.`); err.code='OTP_COOLDOWN'; throw err; }
  const code=otpCode(); const row={id:id('otp'),purpose,phone:normalized,email,userId,codeHash:hashOtp(code),createdAt:now(),expiresAt:new Date(Date.now()+OTP_TTL_MS).toISOString(),attempts:0,verified:false,payload:payload||null};
  data.otpChallenges=data.otpChallenges.filter(x=>!(x.purpose===purpose&&x.phone===normalized&&!x.verified)); data.otpChallenges.push(row);
  const delivery=await sendOtpSms(normalized,code);
  return {row,delivery,demoOtp:delivery.mode==='demo'?code:null};
}
function verifyOtp(data,{purpose,phone,code}){
  const normalized=normalizePhone(phone); const row=[...(data.otpChallenges||[])].reverse().find(x=>x.purpose===purpose&&x.phone===normalized&&!x.verified);
  if(!row) return {ok:false,message:'OTP not found. Request a new code.',code:'OTP_NOT_FOUND'};
  if(Date.now()>new Date(row.expiresAt).getTime()) return {ok:false,message:'OTP expired. Request a new code.',code:'OTP_EXPIRED'};
  if(row.attempts>=OTP_MAX_ATTEMPTS) return {ok:false,message:'Too many incorrect attempts. Request a new OTP.',code:'OTP_LOCKED'};
  row.attempts+=1; if(hashOtp(code)!==row.codeHash) return {ok:false,message:`Incorrect OTP. ${Math.max(0,OTP_MAX_ATTEMPTS-row.attempts)} attempts left.`,code:'OTP_INVALID'};
  row.verified=true; row.verifiedAt=now(); return {ok:true,row};
}
function findUser(data,id){ return data.users.find(u=>u.id===id); }
function technicianFor(data,id){ return data.technicians.find(t=>t.id===id); }
function technicianView(data,t){
  if(!t) return null;
  const u=findUser(data,t.userId);
  return {...t,phone:u?.phone||t.phone||null};
}
function techniciansView(data,list){ return list.map(t=>technicianView(data,t)); }
function accountSummary(data,userId){
  const u=findUser(data,userId); if(!u) return null;
  const myTech=u.role==='technician'?data.technicians.find(t=>t.userId===userId):null;
  const payments=data.payments.filter(p=>p.customerId===userId || (myTech&&p.technicianId===myTech.id));
  const paid=payments.filter(p=>p.status==='SUCCESS').reduce((s,p)=>s+Number(p.amount||0),0);
  const pending=payments.filter(p=>p.status==='PENDING_CONFIRMATION').reduce((s,p)=>s+Number(p.amount||0),0);
  const technicianPending=u.role==='technician' ? data.payments.filter(p=>p.technicianId===myTech?.id&&p.status==='PENDING_CONFIRMATION').reduce((s,p)=>s+Number(p.amount||0),0) : 0;
  return {role:u.role,totalPaid:u.role==='customer'?paid:0,earnings:u.role==='technician'?paid:0,pending:u.role==='technician'?technicianPending:pending,availableBalance:u.role==='technician'?paid-technicianPending:0,invoiceCount:data.invoices.filter(i=>i.customerId===userId || (myTech&&i.technicianId===myTech.id)).length};
}
function serviceFor(data,name){ return data.services.find(s=>s.name===name)||data.services.find(s=>s.technicianType===name); }
function validCoords(lat,lng){
  return Number.isFinite(Number(lat)) &&
    Number.isFinite(Number(lng)) &&
    Number(lat) >= -90 && Number(lat) <= 90 &&
    Number(lng) >= -180 && Number(lng) <= 180;
}
function haversine(a,b){
  const R=6371,rad=Math.PI/180;
  const dLat=(Number(b.lat)-Number(a.lat))*rad;
  const dLon=(Number(b.lng)-Number(a.lng))*rad;
  const x=Math.sin(dLat/2)**2+
    Math.cos(Number(a.lat)*rad)*
    Math.cos(Number(b.lat)*rad)*
    Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function normalizeService(v){ return String(v||'').trim().toLowerCase(); }
function updateDistanceForTech(t, customerLat, customerLng){
  if(validCoords(customerLat,customerLng) && validCoords(t.lat,t.lng)){
    t.distance=Number(haversine(
      {lat:Number(customerLat),lng:Number(customerLng)},
      {lat:Number(t.lat),lng:Number(t.lng)}
    ).toFixed(2));
    t.locationSource=t.locationSource||'technician-gps';
  }
  return t;
}
function scoreTech(t, service, urgent=false, budget=0){
  const svc=normalizeService(service);
  const skills=Array.isArray(t.skills)?t.skills:[];
  const skill=(normalizeService(t.category).includes(svc)||
    normalizeService(t.service).includes(svc)||
    skills.some(s=>normalizeService(s).includes(svc)))?1:0;
  const skillScore=skill*40;
  const availability=(t.available?20:0);
  const distance=Math.max(0,15-(Number(t.distance)||10)*2.5);
  const reliability=Math.max(0,10-(100-(t.completionRate||90))/2);
  const rating=(t.rating||0)*1.8;
  const price=budget?Math.max(0,10-Math.abs((t.price||0)-budget)/100):7;
  return skillScore+availability+distance+reliability+rating+price+(urgent&&t.available?10:0);
}
function matchTechs(data,{service,radius=5,budget=0,urgent=false,lat=null,lng=null}={}){
  const customerLat=Number(lat), customerLng=Number(lng);
  let list=data.technicians.map(t=>updateDistanceForTech({...t},customerLat,customerLng));
  if(service){
    const wanted=normalizeService(service);
    const exact=list.filter(t=>normalizeService(t.category)===wanted || normalizeService(t.service)===wanted);
    if(exact.length) list=exact;
  }
  list=list.filter(t=>{
    if(validCoords(customerLat,customerLng) && validCoords(t.lat,t.lng))
      return Number(t.distance)<=Number(radius);
    return Number(t.distance||999)<=Number(radius);
  });
  list.sort((a,b)=>scoreTech(b,service,urgent,budget)-scoreTech(a,service,urgent,budget));
  return list.map(t=>{
    const distanceFee=Math.max(0,Math.min(80,Math.round(Number(t.distance||0)*12)));
    const startingPrice=Number(t.price||0)+distanceFee;
    return {...t,distanceFee,startingPrice,match:Math.min(99,Math.round(scoreTech(t,service,urgent,budget))),eta:t.eta||Math.max(5,Math.round(Number(t.distance||3)*4)),matchReason:service ? (normalizeService(t.category)===normalizeService(service)?'Field match':'Nearby professional') : 'Nearby professional'};
  });
}
function priceEstimate(data,service,problem='',location='',urgent=false){
  const s=serviceFor(data,service)||{baseMin:300,baseMax:1500};
  const text=String(problem).toLowerCase();
  let min=s.baseMin,max=s.baseMax;
  if(/gas|compressor|motor|board|pcb|major/.test(text)){min+=300;max+=1800;}
  if(/leak|wiring|installation|replacement|repair/.test(text)){min+=100;max+=600;}
  if(urgent){min=Math.round(min*1.15);max=Math.round(max*1.25);}
  const policy=pricingPolicy(data,service); return {service:service||'General Repair',labour:{min:Math.round(min*.35),max:Math.round(Math.min(max*.55,policy.baseMax))},parts:{min:Math.round(min*.65),max:Math.round(max*.65)},inspectionFee:policy.inspectionFee,min,max,location:location||'Demo area',urgent,platformFeePercent:0,disclaimer:'NearFix shows a range before booking. Final charges must be itemized and approved; catalog parts use shared reference prices and no hidden platform fee is added.'};
}
function analyzeProblem(data,problem,service,urgent=false){
  const text=String(problem||'').toLowerCase();
  let detected=service||'General Repair', skill='Handyman', urgency=urgent?'High':'Medium', causes=['Requires on-site inspection'];
  if(/ac|cooling|compressor|gas/.test(text)){detected='AC Repair';skill='AC Technician';causes=['Refrigerant/gas issue','Airflow or filter restriction','Compressor or electrical issue'];}
  else if(/water|leak|tap|pipe|drain/.test(text)){detected='Plumbing';skill='Plumber';causes=['Loose or damaged fitting','Pipe/faucet leakage','Drain blockage'];}
  else if(/switch|fan|socket|wire|electric|power|mcb/.test(text)){detected='Electrical';skill='Electrician';causes=['Loose connection','Faulty switch/socket','Circuit protection issue'];}
  else if(/fridge|refrigerator|washing|microwave|appliance/.test(text)){detected='Appliance Repair';skill='Appliance Technician';causes=['Component fault','Power/control issue','Mechanical wear'];}
  else if(/laptop|computer|wifi|network|pc/.test(text)){detected='Computer Repair';skill='Computer Technician';causes=['Software/configuration issue','Power or hardware issue','Network configuration'];}
  if(/urgent|emergency|sparks|smoke|burn|gas smell|flood/.test(text)) urgency='High';
  const estimate=priceEstimate(data,detected,problem,'',urgency==='High');
  return {service:detected,summary:problem||'General service request',possibleCauses:causes,requiredSkill:skill,urgency,estimatedRange:`₹${estimate.min.toLocaleString('en-IN')}–₹${estimate.max.toLocaleString('en-IN')}`,recommendedNextAction:urgency==='High'?'Arrange a verified technician promptly and avoid unsafe DIY work.':'Book a suitable verified technician for inspection.',preliminary:true,mode:AI_API_KEY?'provider-ready':'demo-fallback'};
}
function audit(data,actor,action,entity,entityId,meta={}){ data.auditLogs.push({id:id('audit'),actorId:actor?.id||null,action,entity,entityId,meta,createdAt:now()}); }
function notify(data,userId,text){ data.notifications.unshift({id:id('n'),userId,text,read:false,time:'Just now',createdAt:now()}); }
function bookingParticipants(data,b){
  const tech=technicianFor(data,b.technicianId);
  return [b.customerId,tech?.userId].filter(Boolean);
}
function pricingPolicy(data,service){
  const s=serviceFor(data,service)||{baseMin:300,baseMax:1500};
  const inspection=Math.min(299,Math.max(99,Math.round(s.baseMin*.25)));
  return {baseMin:Number(s.baseMin||300),baseMax:Number(s.baseMax||1500),inspectionFee:inspection,maxPartsMarkupPercent:5,otherChargeMaxPercent:10,platformFeePercent:0,currency:'INR'};
}
function quotePricingAudit(data,booking,items,labour,otherCharges){
  const policy=pricingPolicy(data,booking.service);
  const catalogItems=items.map(item=>{
    const part=(data.parts||[]).find(p=>String(p.barcode)===String(item.barcode));
    const qty=Math.max(1,Number(item.qty||1));
    const catalogPrice=part?Number(part.price):Number(item.price||0);
    return {...item,qty,catalogPrice,price:catalogPrice,amount:catalogPrice*qty,partFound:Boolean(part),name:part?.name||item.name||'Service item'};
  });
  const catalogPartsTotal=catalogItems.reduce((sum,x)=>sum+x.amount,0);
  const requestedPartsTotal=items.reduce((sum,x)=>sum+Number(x.amount||0),0);
  const markupPercent=catalogPartsTotal?Math.max(0,((requestedPartsTotal-catalogPartsTotal)/catalogPartsTotal)*100):0;
  const baseTotal=Number(labour||0)+catalogPartsTotal;
  const otherLimit=baseTotal*(policy.otherChargeMaxPercent/100);
  const warnings=[];
  if(catalogItems.some(x=>!x.partFound)) warnings.push('One or more parts are not in the NearFix catalog.');
  if(markupPercent>policy.maxPartsMarkupPercent) warnings.push('Part pricing was above the shared catalog reference.');
  if(Number(otherCharges||0)>otherLimit && otherLimit>0) warnings.push('Other charges exceed the standard transparency limit.');
  if(Number(labour||0)>policy.baseMax) warnings.push('Labour is above the published service range.');
  return {policy,catalogItems,catalogPartsTotal,requestedPartsTotal,markupPercent:Number(markupPercent.toFixed(1)),warnings,requiresAdminReview:warnings.length>0,fairnessStatus:warnings.length?'REVIEW_REQUIRED':'WITHIN_REFERENCE'};
}
function bookingView(data,b){
  return {...b,customer:safeUser(findUser(data,b.customerId)),technician:technicianView(data,technicianFor(data,b.technicianId)),quote:data.quotes.find(q=>q.bookingId===b.id)||null,payment:data.payments.find(p=>p.bookingId===b.id)||null,invoice:data.invoices.find(i=>i.bookingId===b.id)||null,media:Array.isArray(b.media)?b.media:[],workVerification:b.workVerification||{status:'PENDING',notes:''}};
}

async function api(req,res,url){
  if(req.method==='OPTIONS') return json(res,204,{});
  const data=db();
  if(req.method==='GET'&&url.pathname==='/api/health') return json(res,200,{ok:true,service:'NearFix API',version:'2.3.0',mode:AI_API_KEY&&AI_API_URL?'provider-ready':'local-smart-assistant',time:now()});
  if(req.method==='GET'&&url.pathname==='/api/public') return json(res,200,{success:true,services:data.services,technicians:techniciansView(data,data.technicians)});

  if(req.method==='GET'&&url.pathname==='/api/parts'){
    const q=String(url.searchParams.get('q')||'').trim().toLowerCase();
    const barcode=String(url.searchParams.get('barcode')||'').trim();
    const category=String(url.searchParams.get('category')||'').trim().toLowerCase();
    let parts=(data.parts||[]).map(p=>({...p}));
    if(barcode) parts=parts.filter(p=>p.barcode===barcode);
    if(q) parts=parts.filter(p=>[p.name,p.brand,p.category,p.barcode].some(v=>String(v||'').toLowerCase().includes(q)));
    if(category) parts=parts.filter(p=>String(p.category||'').toLowerCase()===category);
    return json(res,200,{success:true,parts});
  }
  if(req.method==='GET'&&url.pathname.startsWith('/api/parts/')){
    const barcode=decodeURIComponent(url.pathname.split('/').pop());
    const p=(data.parts||[]).find(x=>x.barcode===barcode);
    return p?json(res,200,{success:true,part:p}):json(res,404,{success:false,message:'Part not found',code:'PART_NOT_FOUND'});
  }


  if(req.method==='POST'&&url.pathname==='/api/auth/request-otp'){
    const b=await readBody(req); const email=String(b.email||'').trim().toLowerCase(); const password=String(b.password||'');
    const u=data.users.find(x=>x.email.toLowerCase()===email);
    if(!u||u.password!==password) return json(res,401,{success:false,message:'Invalid email or password',code:'INVALID_CREDENTIALS'});
    const phone=normalizePhone(u.phone); if(!phone) return json(res,400,{success:false,message:'No mobile number is registered for this account.',code:'PHONE_REQUIRED'});
    try { const issued=await issueOtp(data,{purpose:'LOGIN',phone,userId:u.id,email}); save(data); return json(res,200,{success:true,message:`OTP sent to ${phone.slice(0,3)}******${phone.slice(-2)}.`,phone,challengeId:issued.row.id,deliveryMode:issued.delivery.mode,demoOtp:issued.demoOtp,expiresInSeconds:300}); }
    catch(e){ return json(res,e.code==='OTP_COOLDOWN'?429:502,{success:false,message:e.message,code:e.code||'OTP_SEND_FAILED'}); }
  }
  if(req.method==='POST'&&url.pathname==='/api/auth/verify-otp'){
    const b=await readBody(req); const result=verifyOtp(data,{purpose:'LOGIN',phone:b.phone,code:b.code}); if(!result.ok)return json(res,400,{success:false,message:result.message,code:result.code}); const u=findUser(data,result.row.userId); if(!u)return json(res,404,{success:false,message:'User not found',code:'NOT_FOUND'}); save(data); return json(res,200,{success:true,token:tokenFor(u),user:safeUser(u)});
  }
  if(req.method==='POST'&&url.pathname==='/api/auth/register/request-otp'){
    const b=await readBody(req); const name=String(b.name||'').trim(),email=String(b.email||'').trim().toLowerCase(),password=String(b.password||''),phone=normalizePhone(b.phone),role=String(b.role||'customer');
    if(!name||!email||!password||!phone||!['customer','technician'].includes(role)) return json(res,400,{success:false,message:'Name, email, password, mobile and valid role are required.',code:'VALIDATION'});
    if(data.users.some(x=>x.email.toLowerCase()===email)) return json(res,409,{success:false,message:'Email already registered.',code:'DUPLICATE_EMAIL'});
    const pending={name,email,password,phone,role,service:b.service||'Handyman',area:b.area||'Sonipat',category:b.category||b.service||'General Repair'};
    data.pendingRegistrations=data.pendingRegistrations||[]; data.pendingRegistrations=data.pendingRegistrations.filter(x=>x.email!==email); data.pendingRegistrations.push({id:id('pending'),...pending,createdAt:now()});
    try { const issued=await issueOtp(data,{purpose:'REGISTER',phone,email,payload:pending}); save(data); return json(res,200,{success:true,message:`Verification OTP sent to ${phone.slice(0,3)}******${phone.slice(-2)}.`,phone,deliveryMode:issued.delivery.mode,demoOtp:issued.demoOtp,expiresInSeconds:300}); }
    catch(e){ data.pendingRegistrations=data.pendingRegistrations.filter(x=>x.email!==email); save(data); return json(res,e.code==='OTP_COOLDOWN'?429:502,{success:false,message:e.message,code:e.code||'OTP_SEND_FAILED'}); }
  }
  if(req.method==='POST'&&url.pathname==='/api/auth/register/verify-otp'){
    const b=await readBody(req); const pending=[...(data.pendingRegistrations||[])].reverse().find(x=>x.email===String(b.email||'').trim().toLowerCase()); if(!pending)return json(res,404,{success:false,message:'Registration session expired. Please start again.',code:'REGISTRATION_NOT_FOUND'});
    const result=verifyOtp(data,{purpose:'REGISTER',phone:pending.phone,code:b.code}); if(!result.ok)return json(res,400,{success:false,message:result.message,code:result.code});
    const u={id:id('u'),role:pending.role,name:pending.name,email:pending.email,password:pending.password,phone:pending.phone,phoneVerified:true,verifiedAt:now()}; data.users.push(u);
    if(u.role==='technician') data.technicians.push({id:Date.now(),userId:u.id,name:u.name,service:pending.service,category:pending.category,rating:0,reviews:0,exp:0,distance:3.5,price:299,available:false,jobs:0,verified:false,identityVerified:false,skillVerified:false,experienceVerified:false,response:0,completionRate:100,cancellationRate:0,repeatCustomers:0,eta:15,area:pending.area,skills:[],upiId:String(pending.upiId||`${u.id}@nearfix`)});
    data.pendingRegistrations=data.pendingRegistrations.filter(x=>x.id!==pending.id); audit(data,u,'REGISTER_VERIFIED','User',u.id); save(data); return json(res,201,{success:true,token:tokenFor(u),user:safeUser(u)});
  }

  if(req.method==='POST'&&url.pathname==='/api/auth/login'){
    const b=await readBody(req); const u=data.users.find(x=>x.email.toLowerCase()===String(b.email||'').toLowerCase());
    if(!u||u.password!==b.password) return json(res,401,{success:false,message:'Invalid email or password',code:'INVALID_CREDENTIALS'});
    return json(res,200,{success:true,token:tokenFor(u),user:safeUser(u)});
  }
  if(req.method==='POST'&&url.pathname==='/api/auth/register'){
    const b=await readBody(req); if(!b.name||!b.email||!b.password||!['customer','technician'].includes(b.role)) return json(res,400,{success:false,message:'Name, email, password and role are required',code:'VALIDATION'});
    if(data.users.some(x=>x.email.toLowerCase()===String(b.email).toLowerCase())) return json(res,409,{success:false,message:'Email already registered',code:'DUPLICATE_EMAIL'});
    const u={id:id('u'),role:b.role,name:String(b.name).trim(),email:String(b.email).trim().toLowerCase(),password:String(b.password),phone:String(b.phone||'')}; data.users.push(u);
    if(u.role==='technician') data.technicians.push({id:Date.now(),userId:u.id,name:u.name,service:b.service||'Handyman',category:b.category||'General Repair',rating:0,reviews:0,exp:Number(b.exp||0),distance:3.5,price:299,available:false,jobs:0,verified:false,identityVerified:false,skillVerified:false,experienceVerified:false,response:0,completionRate:100,cancellationRate:0,repeatCustomers:0,eta:15,area:b.area||'Sonipat',skills:Array.isArray(b.skills)?b.skills:[],upiId:String(b.upiId||`${u.id}@nearfix`)});
    audit(data,u,'REGISTER','User',u.id); save(data); return json(res,201,{success:true,token:tokenFor(u),user:safeUser(u)});
  }

  const me=auth(req);
  if(req.method==='GET'&&url.pathname==='/api/config'){
    return json(res,200,{
      success:true,
      mapProvider:'OpenStreetMap + Leaflet + OSRM',
      location:{
        browserGeolocation:true,
        technicianLiveLocation:true,
        roadRouting:true
      }
    });
  }
  if(req.method==='GET'&&url.pathname==='/api/bootstrap'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const user=safeUser(findUser(data,me.id));
    const bookings=data.bookings.filter(b=>me.role==='admin'||b.customerId===me.id||(me.role==='technician'&&technicianFor(data,b.technicianId)?.userId===me.id)).map(b=>bookingView(data,b));
    const myTechProfile=me.role==='technician'?data.technicians.find(t=>t.userId===me.id):null; const base={success:true,user,services:data.services,technicians:techniciansView(data,data.technicians),bookings,reviews:data.reviews.filter(r=>me.role==='admin'||r.customerId===me.id),quotes:data.quotes.filter(q=>me.role==='admin'||q.customerId===me.id||q.technicianId===me.id||myTechProfile?.id===q.technicianId),parts:data.parts||[],payments:data.payments.filter(p=>me.role==='admin'||p.customerId===me.id||myTechProfile?.id===p.technicianId),invoices:data.invoices.filter(i=>me.role==='admin'||i.customerId===me.id||myTechProfile?.id===i.technicianId),notifications:data.notifications.filter(n=>n.userId===me.id),messages:data.messages.filter(m=>m.participantIds?.includes(me.id)||me.role==='admin'),disputes:data.disputes.filter(d=>me.role==='admin'||d.customerId===me.id),account:accountSummary(data,me.id),mode:AI_API_KEY&&AI_API_URL?'provider-ready':'local-smart-assistant'};
    if(me.role==='admin') Object.assign(base,{allUsers:data.users.map(safeUser),allBookings:data.bookings.map(b=>bookingView(data,b)),allTechnicians:techniciansView(data,data.technicians),allQuotes:data.quotes,allPayments:data.payments,allInvoices:data.invoices,allReviews:data.reviews,allMessages:data.messages,allNotifications:data.notifications,allDisputes:data.disputes,allAiAnalyses:data.aiAnalyses,allAuditLogs:data.auditLogs,pricingRules:data.pricingRules,allParts:data.parts||[]});
    return json(res,200,base);
  }
  if(req.method==='GET'&&url.pathname==='/api/me'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); return json(res,200,{success:true,user:safeUser(findUser(data,me.id))});
  }

  if(req.method==='GET'&&url.pathname==='/api/technicians'){
    const service=url.searchParams.get('service')||'';
    const radius=Number(url.searchParams.get('radius')||5);
    const urgent=url.searchParams.get('urgent')==='true';
    const budget=Number(url.searchParams.get('budget')||0);
    const lat=url.searchParams.get('lat');
    const lng=url.searchParams.get('lng');
    let technicians=matchTechs(data,{service,radius,budget,urgent,lat,lng});
    let searchRadiusUsed=radius;
    if(technicians.length<5 && radius<10){
      const expanded=matchTechs(data,{service,radius:10,budget,urgent,lat,lng});
      const ids=new Set(technicians.map(t=>t.id));
      technicians=technicians.concat(expanded.filter(t=>!ids.has(t.id)).map(t=>({...t,matchReason:t.matchReason==='Service match'?'Service match · expanded radius':'Nearby · expanded radius'})));
      searchRadiusUsed=10;
    }
    const visible=technicians.slice(0,Math.max(5,Math.min(8,technicians.length)));
    return json(res,200,{success:true,technicians:techniciansView(data,visible),radius,searchRadiusUsed,minimumNearbyTarget:5,location:validCoords(lat,lng)?{lat:Number(lat),lng:Number(lng)}:null});
  }
  if(req.method==='POST'&&url.pathname==='/api/ai/analyze-problem'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); const b=await readBody(req); const result=analyzeProblem(data,b.problem,b.service,b.urgent); const row={id:id('ai'),userId:me.id,type:'problem',input:b.problem,result,createdAt:now()}; data.aiAnalyses.push(row); audit(data,me,'AI_ANALYZE','AIAnalysis',row.id); save(data); return json(res,200,{success:true,analysis:result,analysisId:row.id});
  }
  if(req.method==='POST'&&url.pathname==='/api/ai/chat'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const b=await readBody(req); const message=String(b.message||'').trim();
    if(!message) return json(res,400,{success:false,message:'Message is required',code:'VALIDATION'});
    let reply='Tell me the appliance/service, the exact symptom and whether it is urgent. I can help you choose the right skill and find nearby technicians.'; let service='General Repair'; const text=message.toLowerCase();
    if(/ac|air conditioner|cooling|compressor|gas/.test(text)){service='AC Repair';reply='This sounds like an AC issue. If water is leaking or the unit is sparking, switch it off safely and avoid opening electrical panels. I recommend an AC technician and a photo/video with the request.';}
    else if(/pipe|tap|water|leak|drain|plumb/.test(text)){service='Plumbing';reply='This looks like a plumbing issue. If water is actively leaking, close the nearest isolation valve if safe. NearFix can show plumbers within your chosen radius and transparent starting prices.';}
    else if(/switch|spark|wire|electric|fan|socket|mcb/.test(text)){service='Electrical';reply='This appears electrical. If there are sparks, burning smell or exposed wires, switch off the affected circuit if safe. Do not touch live wiring; choose a verified electrician.';}
    else if(/washing|fridge|microwave|appliance/.test(text)){service='Appliance Repair';reply='This sounds like an appliance repair. Share a clear photo/video and model number if available so the technician can prepare before arriving.';}
    else if(/laptop|computer|wifi|network|pc|printer/.test(text)){service='Computer Repair';reply='This appears to be a computer/network issue. Never share passwords, PINs or OTPs. A computer technician can inspect the device and quote after diagnosis.';}
    else if(/mobile|phone|screen|charging/.test(text)){service='Mobile Repair';reply='This sounds like a mobile repair. Tell me the model and symptom, then NearFix can show nearby mobile technicians and reference parts pricing.';}
    const local={reply,service,mode:'local-smart-assistant',suggestedAction:`Find ${service} technicians near your live location.`};
    if(AI_API_KEY&&AI_API_URL){try{const r=await fetch(AI_API_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${AI_API_KEY}`},body:JSON.stringify({model:AI_MODEL,messages:[{role:'system',content:'You are NearFix AI Guide. Help customers diagnose household service issues safely, identify the correct technician skill, explain fair-price concepts, and never request passwords, payment PINs or OTPs.'},{role:'user',content:message}],temperature:0.2})});const out=await r.json();const content=out?.choices?.[0]?.message?.content;if(r.ok&&content)local.reply=content;}catch(e){}}
    data.aiAnalyses.push({id:id('ai'),userId:me.id,type:'chat',input:message,result:local,createdAt:now()}); save(data); return json(res,200,{success:true,...local});
  }

  if(req.method==='POST'&&url.pathname==='/api/ai/estimate-price'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); const b=await readBody(req); const result=priceEstimate(data,b.service,b.problem,b.location,b.urgent); const row={id:id('ai'),userId:me.id,type:'price',input:b,result,createdAt:now()}; data.aiAnalyses.push(row); save(data); return json(res,200,{success:true,estimate:result,mode:AI_API_KEY?'provider-ready':'demo-fallback'});
  }
  if(req.method==='POST'&&url.pathname==='/api/matching/find'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); const b=await readBody(req); return json(res,200,{success:true,matches:matchTechs(data,b).slice(0,8)});
  }

  const technicianIdMatch=url.pathname.match(/^\/api\/technicians\/([^/]+)$/);
  if(technicianIdMatch&&req.method==='GET'){
    const t=technicianFor(data,Number(technicianIdMatch[1]));
    if(!t) return json(res,404,{success:false,message:'Technician not found',code:'NOT_FOUND'});
    return json(res,200,{success:true,technician:technicianView(data,t)});
  }

  if(req.method==='PATCH'&&url.pathname==='/api/location/customer'){
    const me=auth(req);
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const body=await readBody(req);
    const lat=Number(body.latitude), lng=Number(body.longitude);
    if(!validCoords(lat,lng)) return json(res,400,{success:false,message:'Valid latitude and longitude are required',code:'INVALID_COORDINATES'});
    const u=findUser(data,me.id);
    if(!u) return json(res,404,{success:false,message:'User not found',code:'NOT_FOUND'});
    u.lastLocation={
      lat,lng,
      accuracy:Number.isFinite(Number(body.accuracy))?Number(body.accuracy):null,
      updatedAt:now(),
      source:'customer-gps'
    };
    save(data);
    return json(res,200,{success:true,location:u.lastLocation});
  }

  if(req.method==='PATCH'&&url.pathname==='/api/technicians/me/availability'){
    if(!me||me.role!=='technician')return json(res,403,{success:false,message:'Technician access required',code:'FORBIDDEN'});
    const t=data.technicians.find(x=>x.userId===me.id); if(!t)return json(res,404,{success:false,message:'Technician profile not found',code:'NOT_FOUND'});
    const b=await readBody(req); t.available=Boolean(b.available); audit(data,me,'AVAILABILITY_UPDATE','Technician',t.id,{available:t.available}); save(data); return json(res,200,{success:true,technician:technicianView(data,t)});
  }
  if(req.method==='PATCH'&&url.pathname==='/api/technicians/me/profile'){
    if(!me||me.role!=='technician')return json(res,403,{success:false,message:'Technician access required',code:'FORBIDDEN'});
    const t=data.technicians.find(x=>x.userId===me.id); if(!t)return json(res,404,{success:false,message:'Technician profile not found',code:'NOT_FOUND'});
    const b=await readBody(req);
    if(typeof b.name==='string'&&b.name.trim()){t.name=b.name.trim(); const u=findUser(data,me.id); if(u)u.name=t.name;}
    if(b.service) { t.service=String(b.service); const svc=serviceFor(data,b.service); if(svc)t.category=svc.name; }
    if(b.category) t.category=String(b.category);
    if(Number.isFinite(Number(b.price)) && Number(b.price)>=0)t.price=Number(b.price);
    if(Number.isFinite(Number(b.exp)) && Number(b.exp)>=0)t.exp=Number(b.exp);
    if(typeof b.area==='string'&&b.area.trim())t.area=b.area.trim();
    if(Array.isArray(b.skills))t.skills=b.skills.map(x=>String(x).trim()).filter(Boolean).slice(0,20); if(typeof b.upiId==='string'&&b.upiId.trim())t.upiId=b.upiId.trim().toLowerCase();
    audit(data,me,'PROFILE_UPDATE','Technician',t.id); save(data); return json(res,200,{success:true,technician:technicianView(data,t),user:safeUser(findUser(data,me.id))});
  }
  if(req.method==='PATCH'&&url.pathname==='/api/technicians/me/location'){
    const me=auth(req);
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    if(me.role!=='technician') return json(res,403,{success:false,message:'Technician access required',code:'FORBIDDEN'});
    const body=await readBody(req);
    const lat=Number(body.lat), lng=Number(body.lng);
    if(!validCoords(lat,lng)) return json(res,400,{success:false,message:'Valid latitude and longitude are required',code:'INVALID_COORDINATES'});
    const t=data.technicians.find(x=>x.userId===me.id);
    if(!t) return json(res,404,{success:false,message:'Technician profile not found',code:'NOT_FOUND'});
    t.lat=lat; t.lng=lng;
    t.accuracy=Number.isFinite(Number(body.accuracy))?Number(body.accuracy):null;
    t.heading=Number.isFinite(Number(body.heading))?Number(body.heading):null;
    t.speed=Number.isFinite(Number(body.speed))?Number(body.speed):null;
    t.locationUpdatedAt=body.timestamp||now();
    t.locationSource='technician-gps';
    save(data);
    audit(data,me,'LOCATION_UPDATE','Technician',t.id,{lat,lng});
    return json(res,200,{success:true,technician:technicianView(data,t)});
  }

  if(req.method==='GET'&&url.pathname==='/api/bookings'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); const list=data.bookings.filter(b=>me.role==='admin'||b.customerId===me.id||(me.role==='technician'&&technicianFor(data,b.technicianId)?.userId===me.id)).map(b=>bookingView(data,b)); return json(res,200,{success:true,bookings:list});
  }
  if(req.method==='POST'&&url.pathname==='/api/bookings'){
    if(!me||me.role!=='customer') return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});
    const b=await readBody(req);
    const customerLat=Number(b.latitude), customerLng=Number(b.longitude);
    const matches=matchTechs(data,{
      service:b.service,
      radius:Number(b.radius||5),
      budget:Number(b.budget||0),
      urgent:Boolean(b.urgent),
      lat:validCoords(customerLat,customerLng)?customerLat:null,
      lng:validCoords(customerLat,customerLng)?customerLng:null
    });
    const t=technicianFor(data,b.technicianId)||matches[0];
    if(!t) return json(res,409,{success:false,message:'No technician found in the selected radius',code:'NO_MATCH'});
    const ai=analyzeProblem(data,b.problem,b.service,b.urgent); const estimate=priceEstimate(data,ai.service,b.problem,b.location,b.urgent); const distanceFee=Math.max(0,Math.min(80,Math.round(Number(t.distance||0)*12))); const selectedStartingPrice=Number(t.price||0)+distanceFee; const fairMin=Math.max(Number(estimate.min||0),selectedStartingPrice); estimate.min=fairMin; estimate.selectedTechnicianStartingPrice=selectedStartingPrice; estimate.distanceFee=distanceFee; estimate.selectedTechnicianId=t.id; const media=Array.isArray(b.media)?b.media.filter(x=>x&&typeof x.data==='string').slice(0,3):[]; const booking={id:Date.now(),customerId:me.id,technicianId:t.id,service:ai.service,problem:b.problem||'',file:b.file||'',location:b.location||'',latitude:validCoords(customerLat,customerLng)?customerLat:null,longitude:validCoords(customerLat,customerLng)?customerLng:null,date:b.date||'',time:b.time||'',budget:Number(b.budget||0),status:'REQUESTED',urgent:Boolean(b.urgent),estimate:fairMin,estimateRange:estimate,createdAt:now(),statusHistory:[{status:'REQUESTED',at:now(),by:me.id}],paymentStatus:'PENDING',media,workVerification:{status:'PENDING',notes:'Waiting for service evidence and admin review.'},cancellation:null};
    data.bookings.push(booking); notify(data,me.id,`Booking request sent to ${t.name}.`); const tu=findUser(data,t.userId); if(tu) notify(data,tu.id,`New ${booking.service} request from ${findUser(data,me.id)?.name||'customer'}.`); audit(data,me,'CREATE','Booking',booking.id,{technicianId:t.id}); save(data); return json(res,201,{success:true,booking:bookingView(data,booking),technician:t,ai,estimate});
  }
  const arrivalVerifyMatch=url.pathname.match(/^\/api\/bookings\/([^/]+)\/arrival-otp\/verify$/);
  if(arrivalVerifyMatch&&req.method==='POST'){
    if(!me||me.role!=='technician') return json(res,403,{success:false,message:'Technician access required',code:'FORBIDDEN'});
    const booking=data.bookings.find(x=>String(x.id)===String(arrivalVerifyMatch[1]));
    if(!booking) return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const assignedTech=technicianFor(data,booking.technicianId);
    if(!assignedTech||assignedTech.userId!==me.id) return json(res,403,{success:false,message:'Only the assigned technician can verify the arrival OTP.',code:'FORBIDDEN'});
    if(booking.status!=='ARRIVED') return json(res,409,{success:false,message:'Arrival OTP can only be verified after you mark the job as arrived.',code:'ARRIVAL_OTP_STAGE'});
    const customer=findUser(data,booking.customerId);
    const phone=customer?.phone;
    if(!phone) return json(res,409,{success:false,message:'Customer mobile number is missing for arrival verification.',code:'CUSTOMER_PHONE_MISSING'});
    const body=await readBody(req);
    const result=verifyOtp(data,{purpose:'ARRIVAL',phone,code:String(body.otp||'').trim()});
    if(!result.ok){ save(data); return json(res,400,{success:false,message:result.message,code:result.code}); }
    booking.arrivalVerification={status:'VERIFIED',verifiedAt:now(),verifiedBy:me.id};
    booking.status='INSPECTION';
    booking.statusHistory=booking.statusHistory||[];
    booking.statusHistory.push({status:'INSPECTION',at:now(),by:me.id,via:'ARRIVAL_OTP'});
    notify(data,booking.customerId,`Arrival verified for booking #${String(booking.id).slice(-6)}. Service inspection can now begin.`);
    notify(data,me.id,`Customer arrival OTP verified for booking #${String(booking.id).slice(-6)}.`);
    audit(data,me,'VERIFY_ARRIVAL_OTP','Booking',booking.id);
    save(data);
    return json(res,200,{success:true,message:'Arrival verified. You can now start the inspection.',booking:bookingView(data,booking)});
  }
  const arrivalGetMatch=url.pathname.match(/^\/api\/bookings\/([^/]+)\/arrival-verification$/);
  if(arrivalGetMatch&&req.method==='GET'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const booking=data.bookings.find(x=>String(x.id)===String(arrivalGetMatch[1]));
    if(!booking) return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const isCustomer=me.role==='customer'&&booking.customerId===me.id;
    const assignedTech=technicianFor(data,booking.technicianId);
    const isTech=me.role==='technician'&&assignedTech?.userId===me.id;
    if(!(isCustomer||isTech||me.role==='admin')) return json(res,403,{success:false,message:'Forbidden',code:'FORBIDDEN'});
    const customer=findUser(data,booking.customerId);
    const row=[...(data.otpChallenges||[])].reverse().find(x=>x.purpose==='ARRIVAL'&&x.phone===normalizePhone(customer?.phone)&&x.payload?.bookingId===booking.id);
    const response={success:true,status:booking.arrivalVerification?.status||'NOT_SENT',expiresAt:row?.expiresAt||null,verifiedAt:booking.arrivalVerification?.verifiedAt||null};
    if(isCustomer&&row&&!row.verified&&row.expiresAt&&Date.now()<new Date(row.expiresAt).getTime()&&row.demoCode) response.demoOtp=row.demoCode;
    return json(res,200,response);
  }
  const bm=url.pathname.match(/^\/api\/bookings\/([^/]+)$/);
  if(bm&&req.method==='PATCH'){
    if(!me) return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const b=data.bookings.find(x=>String(x.id)===String(bm[1]));
    if(!b)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const assignedTech=technicianFor(data,b.technicianId);
    const isAssignedTechnician=me.role==='technician' && assignedTech?.userId===me.id;
    const isCustomer=me.role==='customer' && b.customerId===me.id;
    const isAdmin=me.role==='admin';
    if(!(isAdmin||isCustomer||isAssignedTechnician))return json(res,403,{success:false,message:'You can only manage your own booking or assigned job.',code:'FORBIDDEN'});
    const body=await readBody(req);
    if(body.status){
      const allowedStatuses=['REQUESTED','ACCEPTED','ON_THE_WAY','ARRIVED','INSPECTION','IN_PROGRESS','AWAITING_APPROVAL','COMPLETED','CANCELLED'];
      if(!allowedStatuses.includes(body.status))return json(res,400,{success:false,message:'Invalid booking status',code:'INVALID_STATUS'});
      const transitions={
        REQUESTED:['ACCEPTED','CANCELLED'],
        ACCEPTED:['ON_THE_WAY','CANCELLED'],
        ON_THE_WAY:['ARRIVED','CANCELLED'],
        ARRIVED:['INSPECTION','CANCELLED'],
        INSPECTION:['AWAITING_APPROVAL','IN_PROGRESS','CANCELLED'],
        AWAITING_APPROVAL:['IN_PROGRESS','CANCELLED'],
        IN_PROGRESS:['COMPLETED','AWAITING_APPROVAL','CANCELLED'],
        COMPLETED:[], CANCELLED:[]
      };
      if(!isAdmin && isCustomer && body.status!=='CANCELLED') return json(res,403,{success:false,message:'Customers cannot change technician job status.',code:'ROLE_STATUS_RESTRICTED'});
      if(!isAdmin && isAssignedTechnician && body.status==='ACCEPTED' && b.status!=='REQUESTED') return json(res,409,{success:false,message:'This request is no longer pending.',code:'REQUEST_NOT_PENDING'});
      if(!isAdmin && isAssignedTechnician && b.status==='ARRIVED' && body.status==='INSPECTION') return json(res,409,{success:false,message:'Enter the customer arrival OTP before starting inspection.',code:'ARRIVAL_OTP_REQUIRED'});
      if(!isAdmin && isAssignedTechnician && body.status==='COMPLETED' && b.workVerification?.status!=='VERIFIED') return json(res,409,{success:false,message:'Admin must verify the technician work evidence before the job can be completed.',code:'WORK_VERIFICATION_REQUIRED'});
      if(!isAdmin && isAssignedTechnician && !transitions[b.status]?.includes(body.status)) return json(res,409,{success:false,message:`Cannot move booking from ${b.status} to ${body.status}.`,code:'INVALID_TRANSITION'});
      if(isCustomer && body.status==='CANCELLED' && ['COMPLETED','CANCELLED'].includes(b.status)) return json(res,409,{success:false,message:'Completed bookings cannot be cancelled.',code:'BOOKING_CLOSED'});
      if(body.status==='ARRIVED' && isAssignedTechnician){
        const customer=findUser(data,b.customerId);
        if(!customer?.phone) return json(res,409,{success:false,message:'Customer mobile number is required for arrival OTP verification.',code:'CUSTOMER_PHONE_MISSING'});
        let issued;
        try { issued=await issueOtp(data,{purpose:'ARRIVAL',phone:customer.phone,userId:customer.id,email:customer.email,payload:{bookingId:b.id}}); }
        catch(e){ return json(res,e.code==='OTP_COOLDOWN'?429:502,{success:false,message:e.message,code:e.code||'ARRIVAL_OTP_FAILED'}); }
        b.arrivalVerification={status:'PENDING',sentAt:now(),expiresAt:issued.row.expiresAt,deliveryMode:issued.delivery.mode};
        if(issued.demoOtp){ issued.row.demoCode=issued.demoOtp; notify(data,b.customerId,`Your NearFix arrival OTP for booking #${String(b.id).slice(-6)} is ${issued.demoOtp}. Share it with the technician only after they arrive.`); }
        else notify(data,b.customerId,`Your NearFix arrival OTP has been sent to your registered mobile. Share it with the technician only after they arrive.`);
      }
      b.status=body.status; b.statusHistory=b.statusHistory||[]; b.statusHistory.push({status:body.status,at:now(),by:me.id});
      if(body.status==='CANCELLED'){
        b.cancellation={cancelledBy:me.id,role:me.role,reason:String(body.reason||'Cancelled by user').trim().slice(0,240),at:now()};
        if(b.paymentStatus==='PAID') b.refundStatus='PENDING_ADMIN_REVIEW';
      }
      if(b.status==='COMPLETED' && me.role==='technician'){
        const customer=findUser(data,b.customerId);
        const verified=b.workVerification?.status==='VERIFIED';
        if(customer) notify(data,customer.id,verified?`Service completed for booking #${String(b.id).slice(-6)}. Your UPI payment QR is ready.`:`Service completed for booking #${String(b.id).slice(-6)}. Payment will unlock after admin work verification.`);
        if(assignedTech?.userId) notify(data,assignedTech.userId,`Booking #${String(b.id).slice(-6)} completed. Payment status: ${b.paymentStatus||'PENDING'}.`);
      }
    }
    audit(data,me,'STATUS_UPDATE','Booking',b.id,{status:b.status});
    const technicianUser=assignedTech?.userId ? findUser(data,assignedTech.userId) : null;
    const customerUser=findUser(data,b.customerId);
    const recipient=isCustomer ? technicianUser : customerUser;
    if(recipient && recipient.id!==me.id) notify(data,recipient.id,b.status==='CANCELLED'?`Booking #${String(b.id).slice(-6)} was cancelled. Reason: ${b.cancellation?.reason||'Not provided'}`:`Booking #${String(b.id).slice(-6)} is now ${b.status}.`);
    if(b.status==='CANCELLED' && me.role!=='admin'){
      const admin=data.users.find(u=>u.role==='admin'); if(admin) notify(data,admin.id,`Booking #${String(b.id).slice(-6)} was cancelled by ${me.role}.`);
    }
    save(data);
    return json(res,200,{success:true,booking:bookingView(data,b)});
  }

  const mediaMatch=url.pathname.match(/^\/api\/bookings\/([^/]+)\/media$/);
  if(mediaMatch&&req.method==='POST'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const booking=data.bookings.find(x=>String(x.id)===String(mediaMatch[1])); if(!booking)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const assigned=technicianFor(data,booking.technicianId); const allowed=me.role==='admin'||booking.customerId===me.id||(me.role==='technician'&&assigned?.userId===me.id); if(!allowed)return json(res,403,{success:false,message:'Only the customer, assigned technician or admin can upload evidence.',code:'FORBIDDEN'});
    const b=await readBody(req); const dataUrl=String(b.data||''); if(!/^data:(image\/|video\/)[^;]+;base64,/i.test(dataUrl))return json(res,400,{success:false,message:'Upload an image or video file.',code:'INVALID_MEDIA'});
    if(dataUrl.length>1500000)return json(res,413,{success:false,message:'Evidence file is too large. Keep each upload under about 1 MB.',code:'MEDIA_TOO_LARGE'});
    const type=String(b.type|| (me.role==='customer'?'CUSTOMER_ISSUE':'WORK_EVIDENCE')).toUpperCase(); const allowedTypes=['CUSTOMER_ISSUE','BEFORE','AFTER','WORK_EVIDENCE','INVOICE']; if(!allowedTypes.includes(type))return json(res,400,{success:false,message:'Invalid evidence type',code:'INVALID_MEDIA_TYPE'});
    booking.media=Array.isArray(booking.media)?booking.media:[]; booking.media.push({id:id('media'),type,name:String(b.name||'Evidence'),data:dataUrl,uploadedBy:me.id,uploadedRole:me.role,createdAt:now()});
    if(me.role==='technician'&&['AFTER','WORK_EVIDENCE'].includes(type)) booking.workVerification={...(booking.workVerification||{}),status:'PENDING',notes:'Technician evidence submitted. Waiting for admin verification.'};
    audit(data,me,'UPLOAD','BookingMedia',booking.id,{type}); save(data); return json(res,201,{success:true,booking:bookingView(data,booking)});
  }
  const verifyBookingMatch=url.pathname.match(/^\/api\/admin\/bookings\/([^/]+)\/verify$/);
  if(verifyBookingMatch&&req.method==='PATCH'){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'}); const booking=data.bookings.find(x=>String(x.id)===String(verifyBookingMatch[1])); if(!booking)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'}); const b=await readBody(req); const approved=Boolean(b.approved); booking.workVerification={status:approved?'VERIFIED':'REJECTED',notes:String(b.notes||'').slice(0,500),verifiedBy:me.id,verifiedAt:now()}; if(approved)notify(data,booking.customerId,`NearFix admin verified the work evidence for booking #${String(booking.id).slice(-6)}.`); else notify(data,booking.technicianId?technicianFor(data,booking.technicianId)?.userId:null,`Admin requested a new work-evidence review for booking #${String(booking.id).slice(-6)}.`); audit(data,me,approved?'VERIFY_WORK':'REJECT_WORK','Booking',booking.id,{approved}); save(data); return json(res,200,{success:true,booking:bookingView(data,booking)});
  }

  if(req.method==='POST'&&url.pathname==='/api/quotes'){
    if(!me||!['technician','admin'].includes(me.role))return json(res,403,{success:false,message:'Technician access required',code:'FORBIDDEN'}); const b=await readBody(req); const booking=data.bookings.find(x=>x.id===b.bookingId); if(!booking)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'}); if(me.role==='technician'&&booking.technicianId!==me.id&&technicianFor(data,booking.technicianId)?.userId!==me.id)return json(res,403,{success:false,message:'Forbidden',code:'FORBIDDEN'});
    const items=Array.isArray(b.items)?b.items:[]; const auditPrice=quotePricingAudit(data,booking,items,Number(b.labour||0),Number(b.otherCharges||0)); const catalogItems=auditPrice.catalogItems; const catalogParts=auditPrice.catalogPartsTotal; const total=Number(b.labour||0)+catalogParts+Number(b.otherCharges||0); const q={id:id('q'),bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,labour:Number(b.labour||0),parts:catalogParts,otherCharges:Number(b.otherCharges||0),items:catalogItems,notes:b.notes||'',total:total||Number(b.total||booking.estimate),reason:b.reason||'Inspection-based quotation',status:'PENDING',createdAt:now(),pricingAudit:auditPrice}; data.quotes.push(q); booking.status='AWAITING_APPROVAL'; booking.statusHistory.push({status:'AWAITING_APPROVAL',at:now(),by:me.id}); notify(data,booking.customerId,`A quotation of ₹${q.total.toLocaleString('en-IN')} is ready for approval.`); audit(data,me,'CREATE','Quote',q.id); save(data); return json(res,201,{success:true,quote:q});
  }
  const qm=url.pathname.match(/^\/api\/quotes\/([^/]+)\/(approve|reject)$/);
  if(qm&&req.method==='POST'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'}); const q=data.quotes.find(x=>x.id===qm[1]); if(!q||q.customerId!==me.id)return json(res,404,{success:false,message:'Quote not found',code:'NOT_FOUND'}); if(q.status!=='PENDING')return json(res,409,{success:false,message:'Quote already processed',code:'QUOTE_PROCESSED'}); q.status=qm[2]==='approve'?'APPROVED':'REJECTED'; q.approvedAt=now(); q.approvedBy=me.id; const booking=data.bookings.find(x=>x.id===q.bookingId); if(booking){booking.total=q.total;booking.status=q.status==='APPROVED'?'IN_PROGRESS':'CANCELLED';booking.statusHistory.push({status:booking.status,at:now(),by:me.id});notify(data,technicianFor(data,booking.technicianId)?.userId,`Customer ${q.status.toLowerCase()} the quotation.`);} audit(data,me,q.status,'Quote',q.id);save(data);return json(res,200,{success:true,quote:q,booking:booking?bookingView(data,booking):null});
  }

  const paymentQrMatch=url.pathname.match(/^\/api\/payments\/([^/]+)\/qr$/);
  if(paymentQrMatch&&req.method==='GET'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const booking=data.bookings.find(x=>String(x.id)===String(paymentQrMatch[1]));
    if(!booking)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const assigned=technicianFor(data,booking.technicianId);
    const allowed=me.role==='admin'||booking.customerId===me.id||assigned?.userId===me.id;
    if(!allowed)return json(res,403,{success:false,message:'You can only access the payment QR for your booking or assigned job.',code:'FORBIDDEN'});
    if(booking.status!=='COMPLETED'||booking.workVerification?.status!=='VERIFIED')return json(res,409,{success:false,message:'Payment QR unlocks after service completion and admin verification.',code:'PAYMENT_LOCKED'});
    const upiId=String(assigned?.upiId||'').trim();
    if(!upiId)return json(res,409,{success:false,message:'Technician UPI account is not configured.',code:'UPI_NOT_CONFIGURED'});
    const amount=Number(booking.total||booking.estimate||0);
    const payee=String(assigned?.name||'NearFix Technician').trim();
    const note=`NearFix booking #${String(booking.id).slice(-6)}`;
    const upiUri=`upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payee)}&am=${encodeURIComponent(amount.toFixed(2))}&cu=INR&tn=${encodeURIComponent(note)}`;
    const qrImageUrl=`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiUri)}`;
    return json(res,200,{success:true,bookingId:booking.id,amount,upiId,payee,upiUri,qrImageUrl,paymentStatus:booking.paymentStatus||'PENDING'});
  }
  if(req.method==='GET'&&url.pathname==='/api/payment/config'){
    return json(res,200,{success:true,enabled:Boolean(RAZORPAY_KEY_ID&&RAZORPAY_KEY_SECRET),keyId:RAZORPAY_KEY_ID||null,provider:'Razorpay',mode:RAZORPAY_KEY_ID&&RAZORPAY_KEY_SECRET?'test-ready':'demo-only'});
  }
  if(req.method==='POST'&&url.pathname==='/api/payments/order'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});
    if(!RAZORPAY_KEY_ID||!RAZORPAY_KEY_SECRET)return json(res,503,{success:false,message:'Razorpay test keys are not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.',code:'PAYMENT_NOT_CONFIGURED'});
    const b=await readBody(req); const booking=data.bookings.find(x=>String(x.id)===String(b.bookingId)); if(!booking||booking.customerId!==me.id)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    if(booking.status!=='COMPLETED' && booking.workVerification?.status!=='VERIFIED') return json(res,409,{success:false,message:'Payment unlocks after service completion and admin verification.',code:'PAYMENT_LOCKED'});
    const amount=Math.round(Number(booking.total||booking.estimate||0)*100); if(amount<=0)return json(res,400,{success:false,message:'Invalid payment amount',code:'INVALID_AMOUNT'});
    const authHeader=Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    const response=await fetch('https://api.razorpay.com/v1/orders',{method:'POST',headers:{Authorization:`Basic ${authHeader}`,'Content-Type':'application/json'},body:JSON.stringify({amount,currency:'INR',receipt:`nfx_${String(booking.id).slice(-10)}`,notes:{bookingId:String(booking.id),customerId:me.id}})});
    const order=await response.json(); if(!response.ok)return json(res,502,{success:false,message:order?.error?.description||'Razorpay order creation failed',code:'GATEWAY_ERROR'});
    return json(res,201,{success:true,order,keyId:RAZORPAY_KEY_ID,amount:amount/100,currency:'INR'});
  }
  if(req.method==='POST'&&url.pathname==='/api/payments/verify'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});
    const b=await readBody(req); const booking=data.bookings.find(x=>String(x.id)===String(b.bookingId)); if(!booking||booking.customerId!==me.id)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    if(!RAZORPAY_KEY_SECRET)return json(res,503,{success:false,message:'Razorpay is not configured.',code:'PAYMENT_NOT_CONFIGURED'});
    const expected=crypto.createHmac('sha256',RAZORPAY_KEY_SECRET).update(`${b.orderId}|${b.paymentId}`).digest('hex');
    if(!b.signature||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(String(b.signature))))return json(res,400,{success:false,message:'Payment signature verification failed.',code:'INVALID_SIGNATURE'});
    const existing=data.payments.find(p=>p.bookingId===booking.id&&p.status==='SUCCESS'); if(existing)return json(res,200,{success:true,payment:existing});
    const amount=Number(booking.total||booking.estimate||0); const payment={id:id('pay'),bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,amount,method:'Razorpay',status:'SUCCESS',transactionId:String(b.paymentId),gatewayOrderId:String(b.orderId),createdAt:now(),mode:'razorpay-test'}; data.payments.push(payment); booking.paymentStatus='PAID'; booking.paidAt=now(); const q=data.quotes.find(x=>String(x.bookingId)===String(booking.id)); if(!data.invoices.some(i=>String(i.bookingId)===String(booking.id))) data.invoices.push({id:id('inv'),number:`NFX-${new Date().getFullYear()}-${String(data.invoices.length+1).padStart(5,'0')}`,bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,service:booking.service,labour:Number(q?.labour||Math.round(amount*.35)),parts:Number(q?.parts||Math.round(amount*.65)),platformFee:0,total:amount,paymentStatus:'PAID',createdAt:now()}); notify(data,technicianFor(data,booking.technicianId)?.userId,`Payment received for booking ${String(booking.id).slice(-6)}.`); notify(data,me.id,`Payment successful for booking ${String(booking.id).slice(-6)}. Invoice generated.`); audit(data,me,'PAYMENT_SUCCESS','Payment',payment.id,{amount,mode:'razorpay'}); save(data); return json(res,201,{success:true,payment});
  }
  if(req.method==='POST'&&url.pathname==='/api/payments/manual'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});
    const b=await readBody(req); const booking=data.bookings.find(x=>String(x.id)===String(b.bookingId));
    if(!booking||booking.customerId!==me.id)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    if(booking.status!=='COMPLETED'||booking.workVerification?.status!=='VERIFIED')return json(res,409,{success:false,message:'Payment unlocks only after completed work and admin verification.',code:'PAYMENT_LOCKED'});
    if(data.payments.some(p=>String(p.bookingId)===String(booking.id)&&['SUCCESS','PENDING_CONFIRMATION'].includes(p.status)))return json(res,409,{success:false,message:'A payment is already pending or completed for this booking.',code:'PAYMENT_EXISTS'});
    const method=String(b.method||'CASH').toUpperCase(); if(!['CASH','UPI'].includes(method))return json(res,400,{success:false,message:'Choose Cash or UPI.',code:'INVALID_METHOD'});
    if(method==='UPI'&&!String(b.reference||'').trim())return json(res,400,{success:false,message:'UPI reference is required.',code:'REFERENCE_REQUIRED'});
    const p={id:id('pay'),bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,amount:Number(booking.total||booking.estimate||0),method,status:'PENDING_CONFIRMATION',reference:String(b.reference||''),transactionId:`NFX-${Date.now().toString(36).toUpperCase()}`,createdAt:now(),verification:{status:'PENDING',verifiedBy:null,verifiedAt:null}};
    data.payments.push(p); booking.paymentStatus='PENDING_CONFIRMATION'; notify(data,technicianFor(data,booking.technicianId)?.userId,`Payment confirmation required for booking #${String(booking.id).slice(-6)}.`); const admin=data.users.find(u=>u.role==='admin'); if(admin)notify(data,admin.id,`Payment ${p.method} pending verification for booking #${String(booking.id).slice(-6)}.`); audit(data,me,'PAYMENT_SUBMITTED','Payment',p.id,{method:p.method}); save(data); return json(res,201,{success:true,message:`${method} payment submitted for verification.`,payment:p});
  }
  const manualVerifyMatch=url.pathname.match(/^\/api\/payments\/([^/]+)\/verify$/);
  if(manualVerifyMatch&&req.method==='PATCH'){
    if(!me||!['technician','admin'].includes(me.role))return json(res,403,{success:false,message:'Technician or admin access required',code:'FORBIDDEN'});
    const p=data.payments.find(x=>String(x.id)===String(manualVerifyMatch[1])); if(!p)return json(res,404,{success:false,message:'Payment not found',code:'NOT_FOUND'});
    const booking=data.bookings.find(x=>String(x.id)===String(p.bookingId)); const assigned=booking?technicianFor(data,booking.technicianId):null; if(me.role==='technician'&&assigned?.userId!==me.id)return json(res,403,{success:false,message:'Only the assigned technician can confirm this payment.',code:'FORBIDDEN'});
    if(p.status!=='PENDING_CONFIRMATION')return json(res,409,{success:false,message:'Payment is not awaiting confirmation.',code:'PAYMENT_STATE'});
    p.status='SUCCESS'; p.verification={status:'VERIFIED',verifiedBy:me.id,verifiedAt:now()}; p.verifiedAt=now(); if(booking){booking.paymentStatus='PAID';booking.paidAt=now();}
    if(booking){const exists=data.invoices.some(i=>String(i.bookingId)===String(booking.id)); const q=data.quotes.find(x=>String(x.bookingId)===String(booking.id)); if(!exists)data.invoices.push({id:id('inv'),number:`NFX-${new Date().getFullYear()}-${String(data.invoices.length+1).padStart(5,'0')}`,bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,service:booking.service,labour:Number(q?.labour||Math.round((booking.total||booking.estimate)*.35)),parts:Number(q?.parts||Math.round((booking.total||booking.estimate)*.65)),platformFee:0,total:Number(booking.total||booking.estimate||0),paymentStatus:'PAID',createdAt:now()});}
    notify(data,p.customerId,`Payment verified for booking #${String(p.bookingId).slice(-6)}. Invoice generated.`); if(booking?.technicianId){const techUser=technicianFor(data,booking.technicianId)?.userId;if(techUser)notify(data,techUser,`Payment verified for booking #${String(p.bookingId).slice(-6)}. Invoice generated.`);} audit(data,me,'PAYMENT_VERIFIED','Payment',p.id,{method:p.method}); save(data); return json(res,200,{success:true,message:'Payment verified and invoice generated.',payment:p});
  }

  if(req.method==='POST'&&url.pathname==='/api/payments'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'}); const b=await readBody(req); const booking=data.bookings.find(x=>x.id===b.bookingId); if(!booking||booking.customerId!==me.id)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'}); if(booking.status!=='COMPLETED'&&booking.workVerification?.status!=='VERIFIED')return json(res,409,{success:false,message:'Payment unlocks after service completion and admin verification.',code:'PAYMENT_LOCKED'}); const amount=Number(booking.total||booking.estimate||0); const p={id:id('pay'),bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,amount,method:b.method||'Cash',status:'SUCCESS',transactionId:`NFX${Date.now().toString(36).toUpperCase()}`,createdAt:now(),mode:'offline-demo'}; data.payments.push(p);booking.paymentStatus='PAID'; notify(data,technicianFor(data,booking.technicianId)?.userId,`Payment recorded for booking ${String(booking.id).slice(-6)}.`); audit(data,me,'PAYMENT_SUCCESS','Payment',p.id,{amount,mode:'offline-demo'});save(data);return json(res,201,{success:true,payment:p});
  }
  if(req.method==='GET'&&url.pathname==='/api/invoices'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'}); return json(res,200,{success:true,invoices:data.invoices.filter(i=>me.role==='admin'||i.customerId===me.id||i.technicianId===me.id)});
  }
  if(req.method==='POST'&&url.pathname==='/api/invoices'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});
    const b=await readBody(req); const booking=data.bookings.find(x=>x.id===b.bookingId); if(!booking)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});
    const assigned=technicianFor(data,booking.technicianId); const allowed=me.role==='admin'||booking.customerId===me.id||assigned?.userId===me.id;
    if(!allowed)return json(res,403,{success:false,message:'You can only create an invoice for your booking or assigned job.',code:'FORBIDDEN'});
    const invoice={id:id('inv'),number:`NFX-${new Date().getFullYear()}-${String(data.invoices.length+1).padStart(5,'0')}`,bookingId:booking.id,customerId:booking.customerId,technicianId:booking.technicianId,service:booking.service,labour:Number(b.labour||Math.round((booking.total||booking.estimate)*.35)),parts:Number(b.parts||Math.round((booking.total||booking.estimate)*.65)),platformFee:Number(b.platformFee||0),total:Number(booking.total||booking.estimate||0),paymentStatus:booking.paymentStatus||'PENDING',createdAt:now()};data.invoices.push(invoice);save(data);return json(res,201,{success:true,invoice});
  }
  if(req.method==='POST'&&url.pathname==='/api/reviews'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});const b=await readBody(req);const booking=data.bookings.find(x=>x.id===b.bookingId);if(!booking||booking.customerId!==me.id)return json(res,404,{success:false,message:'Booking not found',code:'NOT_FOUND'});const r={id:id('r'),bookingId:booking.id,customerId:me.id,technicianId:booking.technicianId,rating:Math.min(5,Math.max(1,Number(b.rating))),serviceQuality:Number(b.serviceQuality||b.rating),behaviour:Number(b.behaviour||b.rating),priceTransparency:Number(b.priceTransparency||b.rating),arrivalTime:Number(b.arrivalTime||b.rating),text:String(b.text||b.comment||''),tags:[],createdAt:now()};if(/late|delay/i.test(r.text))r.tags.push('Late arrival');if(/price|charge|expensive/i.test(r.text))r.tags.push('Price transparency');if(/good|great|communication/i.test(r.text))r.tags.push('Good communication');data.reviews.push(r);const t=technicianFor(data,booking.technicianId);if(t){const rs=data.reviews.filter(x=>x.technicianId===t.id);t.rating=Number((rs.reduce((s,x)=>s+x.rating,0)/rs.length).toFixed(1));t.reviews=rs.length;}audit(data,me,'CREATE','Review',r.id);save(data);return json(res,201,{success:true,review:r});
  }
  if(req.method==='GET'&&url.pathname==='/api/messages'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});const bookingId=url.searchParams.get('bookingId');return json(res,200,{success:true,messages:data.messages.filter(m=>(!bookingId||m.bookingId===bookingId)&&(m.participantIds?.includes(me.id)||me.role==='admin'))});
  }
  if(req.method==='POST'&&url.pathname==='/api/messages'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});const b=await readBody(req);const booking=data.bookings.find(x=>x.id===b.bookingId);const participants=booking?[booking.customerId,technicianFor(data,booking.technicianId)?.userId].filter(Boolean):[me.id];const m={id:id('m'),bookingId:b.bookingId||null,senderId:me.id,participantIds:participants,text:String(b.text||'').trim(),createdAt:now()};if(!m.text)return json(res,400,{success:false,message:'Message is required',code:'VALIDATION'});data.messages.push(m);participants.filter(x=>x!==me.id).forEach(x=>notify(data,x,'New NearFix chat message.'));save(data);return json(res,201,{success:true,message:m});
  }
  if(req.method==='GET'&&url.pathname==='/api/notifications'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});return json(res,200,{success:true,notifications:data.notifications.filter(n=>n.userId===me.id)});
  }
  if(req.method==='PATCH'&&url.pathname==='/api/notifications/read'){
    if(!me)return json(res,401,{success:false,message:'Unauthorized',code:'UNAUTHORIZED'});data.notifications.filter(n=>n.userId===me.id).forEach(n=>n.read=true);save(data);return json(res,200,{success:true});
  }
  if(req.method==='POST'&&url.pathname==='/api/disputes'){
    if(!me||me.role!=='customer')return json(res,403,{success:false,message:'Customer access required',code:'FORBIDDEN'});const b=await readBody(req);const d={id:id('dsp'),bookingId:b.bookingId||null,customerId:me.id,technicianId:b.technicianId||null,reason:b.reason||'Other',subject:b.subject||'Service issue',details:b.details||'',status:'OPEN',createdAt:now(),messages:[]};data.disputes.push(d);audit(data,me,'CREATE','Dispute',d.id);save(data);return json(res,201,{success:true,dispute:d});
  }

  if(req.method==='POST'&&url.pathname==='/api/admin/parts'){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});
    const b=await readBody(req); if(!b.name||!b.barcode||!Number.isFinite(Number(b.price)))return json(res,400,{success:false,message:'Name, barcode and price are required',code:'VALIDATION'});
    if((data.parts||[]).some(p=>p.barcode===String(b.barcode)))return json(res,409,{success:false,message:'Barcode already exists',code:'DUPLICATE_BARCODE'});
    const p={id:id('part'),barcode:String(b.barcode).trim(),name:String(b.name).trim(),category:String(b.category||'General').trim(),brand:String(b.brand||'NearFix Supply').trim(),price:Number(b.price),unit:String(b.unit||'piece'),stock:Number(b.stock||0),image:String(b.image||'assets/parts/led-bulb.svg'),description:String(b.description||''),compatible:Array.isArray(b.compatible)?b.compatible:[]}; data.parts.push(p); audit(data,me,'CREATE','Part',p.id,{barcode:p.barcode}); save(data); return json(res,201,{success:true,part:p});
  }
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/admin/parts/')){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});
    const pid=url.pathname.split('/').pop(); const p=(data.parts||[]).find(x=>x.id===pid); if(!p)return json(res,404,{success:false,message:'Part not found',code:'PART_NOT_FOUND'});
    const b=await readBody(req); ['name','barcode','category','brand','unit','image','description'].forEach(k=>{if(typeof b[k]==='string'&&b[k].trim())p[k]=b[k].trim();}); if(Number.isFinite(Number(b.price)))p.price=Number(b.price); if(Number.isFinite(Number(b.stock)))p.stock=Number(b.stock); if(Array.isArray(b.compatible))p.compatible=b.compatible; audit(data,me,'UPDATE','Part',pid,b); save(data); return json(res,200,{success:true,part:p});
  }
  if(req.method==='DELETE'&&url.pathname.startsWith('/api/admin/parts/')){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});
    const pid=url.pathname.split('/').pop(); const before=(data.parts||[]).length; data.parts=(data.parts||[]).filter(x=>x.id!==pid); if(data.parts.length===before)return json(res,404,{success:false,message:'Part not found',code:'PART_NOT_FOUND'}); audit(data,me,'DELETE','Part',pid); save(data); return json(res,200,{success:true});
  }

  if(req.method==='GET'&&url.pathname==='/api/admin/analytics'){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});const completed=data.bookings.filter(b=>b.status==='COMPLETED');const revenue=data.payments.filter(p=>p.status==='SUCCESS').reduce((s,p)=>s+p.amount,0);const categories=data.bookings.reduce((m,b)=>(m[b.service]=(m[b.service]||0)+1,m),{});const complaintThemes=data.reviews.flatMap(r=>r.tags||[]).reduce((m,t)=>(m[t]=(m[t]||0)+1,m),{});return json(res,200,{success:true,metrics:{users:data.users.length,technicians:data.technicians.length,verifiedTechnicians:data.technicians.filter(t=>t.verified).length,activeBookings:data.bookings.filter(b=>!['COMPLETED','CANCELLED'].includes(b.status)).length,completedBookings:completed.length,revenue,openDisputes:data.disputes.filter(d=>d.status==='OPEN').length,pendingVerification:data.technicians.filter(t=>!t.verified).length},charts:{categories,complaintThemes},recentBookings:data.bookings.slice(-10).reverse().map(b=>bookingView(data,b)),pendingTechnicians:data.technicians.filter(t=>!t.verified),disputes:data.disputes,payments:data.payments});
  }
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/admin/technicians/')){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});const tid=url.pathname.split('/').pop();const t=technicianFor(data,tid);if(!t)return json(res,404,{success:false,message:'Technician not found',code:'NOT_FOUND'});const b=await readBody(req);Object.assign(t,{...('verified'in b&&{verified:Boolean(b.verified)}),...('identityVerified'in b&&{identityVerified:Boolean(b.identityVerified)}),...('skillVerified'in b&&{skillVerified:Boolean(b.skillVerified)}),...('experienceVerified'in b&&{experienceVerified:Boolean(b.experienceVerified)})});audit(data,me,'VERIFY','Technician',tid,b);save(data);return json(res,200,{success:true,technician:technicianView(data,t)});
  }
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/admin/disputes/')){
    if(!me||me.role!=='admin')return json(res,403,{success:false,message:'Admin access required',code:'FORBIDDEN'});const did=url.pathname.split('/').pop();const d=data.disputes.find(x=>x.id===did);if(!d)return json(res,404,{success:false,message:'Dispute not found',code:'NOT_FOUND'});const b=await readBody(req);d.status=b.status||d.status;d.resolution=b.resolution||d.resolution||'';audit(data,me,'RESOLVE','Dispute',did,b);save(data);return json(res,200,{success:true,dispute:d});
  }
  return json(res,404,{success:false,message:'API route not found',code:'NOT_FOUND'});
}

function serve(req,res){
  let pathname=decodeURIComponent(req.url.split('?')[0]); if(pathname==='/')pathname='/index.html';
  const full=path.normalize(path.join(FRONTEND,pathname)); if(!full.startsWith(FRONTEND))return res.writeHead(403).end('Forbidden');
  fs.readFile(full,(err,data)=>{ if(err){fs.readFile(path.join(FRONTEND,'index.html'),(e,d)=>{if(e){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'Content-Type':mime['.html'],'Cache-Control':'no-cache'});res.end(d);});return;}res.writeHead(200,{'Content-Type':mime[path.extname(full).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data); });
}

const server=http.createServer(async(req,res)=>{ try{const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);if(url.pathname.startsWith('/api/'))return await api(req,res,url);serve(req,res);}catch(e){console.error(e);json(res,500,{success:false,message:e.message||'Internal server error',code:'SERVER_ERROR'});} });
function listen(port){ server.once('error',err=>{ if(err.code==='EADDRINUSE') return listen(port+1); throw err; }); server.listen(port,'0.0.0.0',()=>console.log(`NearFix API + web running at http://0.0.0.0:${port}`)); }
listen(PORT);
