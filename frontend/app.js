/* NearFix — interactive dependency-free SPA */
const SERVICES = [
  ['🔌','Electrical','Electrician'],['🚰','Plumbing','Plumber'],['❄️','AC Repair','AC Technician'],['🔧','Appliance Repair','Appliance Technician'],
  ['🪚','Carpentry','Carpenter'],['🎨','Painting','Painter'],['🧹','Cleaning','Cleaning Expert'],['💻','Computer Repair','Computer Technician'],
  ['📱','Mobile Repair','Mobile Technician'],['🔑','Locksmith','Locksmith'],['🚗','Mechanic','Vehicle Mechanic'],['🛠️','General Repair','Handyman']
];


const PARTS_FALLBACK = [
  {id:'p1',barcode:'8901001000011',name:'1/2 inch Brass Ball Valve',category:'Plumbing',brand:'NearFix Supply',price:185,unit:'piece',stock:42,image:'assets/parts/brass-ball-valve.svg'},
  {id:'p2',barcode:'8901001000012',name:'Braided Water Hose 1.5m',category:'Plumbing',brand:'NearFix Supply',price:240,unit:'piece',stock:28,image:'assets/parts/water-hose.svg'},
  {id:'p3',barcode:'8901001000013',name:'16A Modular Switch',category:'Electrical',brand:'NearFix Supply',price:95,unit:'piece',stock:75,image:'assets/parts/modular-switch.svg'},
  {id:'p4',barcode:'8901001000014',name:'6A Universal Socket',category:'Electrical',brand:'NearFix Supply',price:125,unit:'piece',stock:63,image:'assets/parts/socket.svg'},
  {id:'p5',barcode:'8901001000015',name:'AC Copper Capacitor 35+5 µF',category:'AC Repair',brand:'NearFix Supply',price:520,unit:'piece',stock:19,image:'assets/parts/capacitor.svg'},
  {id:'p6',barcode:'8901001000016',name:'AC Air Filter 1.5 Ton',category:'AC Repair',brand:'NearFix Supply',price:310,unit:'piece',stock:34,image:'assets/parts/ac-filter.svg'},
  {id:'p7',barcode:'8901001000017',name:'Washing Machine Drain Pump',category:'Appliance Repair',brand:'NearFix Supply',price:690,unit:'piece',stock:14,image:'assets/parts/drain-pump.svg'},
  {id:'p8',barcode:'8901001000018',name:'Laptop 65W USB-C Adapter',category:'Computer Repair',brand:'NearFix Supply',price:1199,unit:'piece',stock:21,image:'assets/parts/usb-c-adapter.svg'},
  {id:'p9',barcode:'8901001000019',name:'Door Hinge Heavy Duty',category:'Carpentry',brand:'NearFix Supply',price:160,unit:'pair',stock:51,image:'assets/parts/door-hinge.svg'},
  {id:'p10',barcode:'8901001000020',name:'LED Bulb 12W',category:'Electrical',brand:'NearFix Supply',price:110,unit:'piece',stock:120,image:'assets/parts/led-bulb.svg'},
  {id:'p11',barcode:'8901001000021',name:'PTFE Thread Seal Tape',category:'Plumbing',brand:'NearFix Supply',price:35,unit:'roll',stock:200,image:'assets/parts/ptfe-tape.svg'},
  {id:'p12',barcode:'8901001000022',name:'Universal Extension Cord 5m',category:'Electrical',brand:'NearFix Supply',price:349,unit:'piece',stock:36,image:'assets/parts/extension-cord.svg'}
];

const SEED_TECHS = [
 {id:1,name:'Ramesh Kumar',service:'Plumber',category:'Plumbing',rating:4.8,reviews:124,exp:5,distance:2.1,price:299,available:true,jobs:127,verified:true,response:96,skills:['Pipe Repair','Faucet Repair','Bathroom Fitting','Water Leakage']},
 {id:2,name:'Amit Sharma',service:'Electrician',category:'Electrical',rating:4.9,reviews:98,exp:7,distance:1.4,price:349,available:true,jobs:184,verified:true,response:98,skills:['Wiring','Switch Repair','Fan Installation','MCB Repair']},
 {id:3,name:'Vikas Verma',service:'AC Technician',category:'AC Repair',rating:4.7,reviews:86,exp:6,distance:3.2,price:399,available:true,jobs:109,verified:true,response:94,skills:['AC Service','Gas Refill','Cooling Issue','Installation']},
 {id:4,name:'Mohit Singh',service:'Carpenter',category:'Carpentry',rating:4.6,reviews:72,exp:4,distance:4.4,price:279,available:false,jobs:91,verified:true,response:91,skills:['Furniture Repair','Door Repair','Wood Polish']},
 {id:5,name:'Pankaj Yadav',service:'Appliance Technician',category:'Appliance Repair',rating:4.8,reviews:63,exp:5,distance:2.8,price:329,available:true,jobs:88,verified:true,response:95,skills:['Washing Machine','Refrigerator','Microwave']},
 {id:6,name:'Neeraj Kumar',service:'Cleaning Expert',category:'Cleaning',rating:4.9,reviews:141,exp:8,distance:1.9,price:249,available:true,jobs:231,verified:true,response:99,skills:['Deep Cleaning','Kitchen','Bathroom','Sofa Cleaning']},
 {id:7,name:'Sahil Gupta',service:'Computer Technician',category:'Computer Repair',rating:4.7,reviews:57,exp:6,distance:3.7,price:399,available:true,jobs:76,verified:true,response:93,skills:['Laptop Repair','Windows','Networking','Data Backup']},
 {id:8,name:'Arjun Malik',service:'Handyman',category:'General Repair',rating:4.5,reviews:42,exp:3,distance:4.8,price:229,available:true,jobs:53,verified:false,response:89,skills:['Minor Repairs','Drilling','Assembly']}
];


function buildLocalTechnicianCoverage(){
  const templates={
    'Electrical':['Electrician',['Wiring','Switch Repair','Fan Installation','MCB Repair'],349],
    'Plumbing':['Plumber',['Pipe Repair','Faucet Repair','Bathroom Fitting','Water Leakage'],299],
    'AC Repair':['AC Technician',['AC Service','Gas Refill','Cooling Issue','Installation'],399],
    'Appliance Repair':['Appliance Technician',['Washing Machine','Refrigerator','Microwave','Small Appliance'],329],
    'Carpentry':['Carpenter',['Furniture Repair','Door Repair','Wood Polish','Fittings'],279],
    'Painting':['Painter',['Interior Painting','Wall Repair','Texture','Touch-up'],399],
    'Cleaning':['Cleaning Expert',['Deep Cleaning','Kitchen','Bathroom','Sofa Cleaning'],249],
    'Computer Repair':['Computer Technician',['Laptop Repair','Windows','Networking','Data Backup'],399],
    'Mobile Repair':['Mobile Technician',['Screen Repair','Battery','Charging Port','Software'],299],
    'Locksmith':['Locksmith',['Lock Repair','Key Duplication','Door Lock','Emergency Unlock'],279],
    'Mechanic':['Vehicle Mechanic',['General Service','Brake Check','Battery','Engine Diagnostics'],449],
    'General Repair':['Handyman',['Minor Repairs','Drilling','Assembly','Installation'],229]
  };
  const first=['Aman','Rohit','Deepak','Kunal','Sandeep','Manish','Naveen','Varun','Harish','Gaurav','Vivek','Ankit']; const last=['Sharma','Kumar','Verma','Yadav','Singh','Gupta']; const list=[]; let id=1;
  for(const svc of SERVICES){const category=svc[1];const [service,skills,base]=templates[category]||[svc[2],['General Service'],299];for(let i=0;i<5;i++){const seed=i+SERVICES.findIndex(x=>x[1]===category)*7;const lat=28.970+0.012*Math.sin(seed*1.9)+0.008*i;const lng=77.000+0.018*Math.cos(seed*1.3)+0.006*i;list.push({id,name:`${first[seed%first.length]} ${last[(seed+i)%last.length]}`,service,category,rating:Number((4.3+(i%7)*0.1).toFixed(1)),reviews:35+((seed*17)%120),exp:2+(i%7),distance:Number((1.1+i*0.8+(seed%3)*0.3).toFixed(1)),price:base+(i%5)*35,available:i!==3,jobs:45+((seed*13)%190),verified:i!==4,response:90+(i%10),completionRate:93+(i%7),cancellationRate:1+(i%4),skills:[...skills],eta:6+i*3,area:'Sonipat',lat,lng,skillVerified:i!==4,identityVerified:i!==4,experienceVerified:true,upiId:`${String(id).padStart(2,'0')}.demo@nearfix`});id++;}}
  return list;
}

const SEED_USERS = [
 {id:'u1',name:'Rahul Mehta',email:'customer@nearfix.demo',phone:'+91 98765 43210',role:'customer'},
 {id:'u2',name:'Ramesh Kumar',email:'technician@nearfix.demo',phone:'+91 98765 43211',role:'technician'},
 {id:'u3',name:'NearFix Admin',email:'admin@nearfix.demo',phone:'+91 98765 43212',role:'admin'}
];

const DEFAULT = {
  session:null,
  users:SEED_USERS,
  techs:buildLocalTechnicianCoverage(),
  parts:PARTS_FALLBACK,
  bookings:[],
  favourites:[6],
  messages:[{id:1,bookingId:null,from:'tech',text:'Hi! I’m available for your service request.',time:'4:28 PM'}],
  notifications:[{id:1,text:'Welcome to NearFix — find trusted professionals nearby.',read:false,time:'Just now'}],
  complaints:[],
  reviews:[],
  quotes:[],
  payments:[],
  settings:{location:'Sonipat, Haryana',radius:5,userLat:null,userLng:null,locationAccuracy:null,locationUpdatedAt:null}
};

const NF_LOCAL_KEY='nearfix-db-v4';
let db = loadDB();

let state = {
  route:location.hash.slice(1)||'home',
  service:'Plumbing',
  filters:{sort:'distance',availability:'all',query:'',maxDistance:5},
  quick:false,
  selectedTech:null,
  bookingDraft:null
};

const app=()=>document.getElementById('app');
const modal=()=>document.getElementById('modal-root');

function loadDB(){
  try{
    const saved=JSON.parse(localStorage.getItem(NF_LOCAL_KEY));
    return saved
      ? {...DEFAULT,...saved,settings:{...DEFAULT.settings,...(saved.settings||{})}}
      : structuredClone(DEFAULT);
  }catch{
    return structuredClone(DEFAULT);
  }
}

function saveDB(){
  localStorage.setItem(NF_LOCAL_KEY,JSON.stringify(db));
}

function esc(v=''){
  return String(v).replace(/[&<>"']/g,c=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c]));
}

function initials(name){
  return name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
}

function currentUser(){
  return db.session?db.users.find(u=>u.id===db.session):null;
}

function tech(id){
  return db.techs.find(t=>t.id===Number(id));
}

function money(n){
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

function dashboardRouteForRole(role){
  return role==='customer'?'customer':role==='technician'?'technician':role==='admin'?'admin':'home';
}

function canAccessRoute(role,r){
  if(!role) return ['home','services','find','login'].includes(r);
  if(role==='customer') return ['customer','services','find','bookings','parts','scanner','favourites','account'].includes(r);
  if(role==='technician') return ['technician','bookings','parts','scanner','account'].includes(r);
  if(role==='admin') return ['admin','parts','account'].includes(r);
  return false;
}

function setRoute(r){
  const role=currentUser()?.role;
  if(role && (r==='home'||!canAccessRoute(role,r))) r=dashboardRouteForRole(role);
  state.route=r;
  location.hash=r;
  render();
}

function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>el.classList.remove('show'),2400);
}

/* UPDATED LOGO */
function logo(){
  return `
    <span class="nf-wordmark" aria-label="NearFix">
      <span class="nf-near">Near</span><span class="nf-fix">Fix</span>
    </span>
  `;
}

function nav(){
  const u=currentUser();
  const dashboard=dashboardRouteForRole(u?.role);
  const primary = u?.role==='customer'
    ? `<button class="nav-link ${state.route==='customer'?'active':''}" onclick="setRoute('customer')">Dashboard</button><button class="nav-link ${state.route==='find'?'active':''}" onclick="setRoute('find')">Find Technician</button><button class="nav-link ${state.route==='bookings'?'active':''}" onclick="setRoute('bookings')">My Bookings</button><button class="nav-link ${state.route==='parts'?'active':''}" onclick="setRoute('parts')">Parts & Prices</button>`
    : u?.role==='technician'
      ? `<button class="nav-link ${state.route==='technician'?'active':''}" onclick="setRoute('technician')">Dashboard</button><button class="nav-link ${state.route==='bookings'?'active':''}" onclick="setRoute('bookings')">My Jobs</button><button class="nav-link ${state.route==='parts'?'active':''}" onclick="setRoute('parts')">Parts</button><button class="nav-link ${state.route==='scanner'?'active':''}" onclick="setRoute('scanner')">Scan Part</button>`
      : u?.role==='admin'
        ? `<button class="nav-link ${state.route==='admin'?'active':''}" onclick="setRoute('admin')">Dashboard</button><button class="nav-link" onclick="adminTab(null,'users')">Users</button><button class="nav-link" onclick="adminTab(null,'technicians')">Technicians</button><button class="nav-link" onclick="adminTab(null,'bookings')">Bookings</button>`
        : `<button class="nav-link ${state.route==='home'?'active':''}" onclick="setRoute('home')">Home</button><button class="nav-link ${state.route==='services'?'active':''}" onclick="setRoute('services')">Services</button><button class="nav-link ${state.route==='find'?'active':''}" onclick="setRoute('find')">Find Technician</button>`;
  return `<header class="topbar">
    <div class="top-inner">
      <button class="brand" onclick="setRoute('${dashboard}')">${logo()}</button>
      <nav class="nav">${primary}${u?`<button class="nav-link nav-more-link" onclick="openMoreMenu()">More ▾</button>`:`<button class="nav-link" onclick="openInfo('about')">About</button><button class="nav-link" onclick="openInfo('contact')">Contact</button>`}</nav>
      <div class="nav-actions">
        ${u
          ? `<span class="role-chip role-${esc(u.role)}">${u.role==='customer'?'CUSTOMER':u.role==='technician'?'TECHNICIAN':'ADMIN'}</span><button class="profile-pill" onclick="setRoute('account')"><span class="mini-avatar">${initials(u.name)}</span>${esc(u.name.split(' ')[0])}<span>⌄</span></button><button class="icon-btn" onclick="openNotifications()">🔔${unreadCount()?`<i>${unreadCount()}</i>`:''}</button><button class="btn ghost" onclick="logout()">Logout</button>`
          : `<button class="btn ghost" onclick="setRoute('login')">Login</button><button class="btn primary" onclick="openSignup()">Sign Up</button>`}
      </div>
      <button class="mobile-menu" onclick="openMobileMenu()">☰</button>
    </div>
  </header>`;
}

function footer(){
  return `<footer>
    <div class="container footer-grid">
      <div>
        <div class="brand footer-brand">
  ${logo()}
</div>
        <p>Expert help, minutes away. Trusted local professionals, transparent pricing and fast service.</p>
      </div>

      <div>
        <b>Platform</b>
        <button onclick="setRoute('services')">Services</button>
        <button onclick="setRoute('find')">Find Technician</button>
        <button onclick="openInfo('about')">How it works</button>
      </div>

      <div>
        <b>For professionals</b>
        <button onclick="openSignup('technician')">Join as Technician</button>
        <button onclick="openInfo('verification')">Verification</button>
        <button onclick="openInfo('support')">Support</button>
      </div>

      <div>
        <b>Contact</b>
        <span>📍 Sonipat, Haryana</span>
        <span>✉ skuser8607@gmail.com</span>
        <span>☎ +91 7206108607</span>
      </div>
    </div>

    <div class="container footer-bottom">
      © 2026 NearFix · Demo application · Built for local service discovery.
    </div>
  </footer>`;
}

function home(){
  return `${nav()}
  <main>
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">✓ Verified local professionals · Up to 5 km</span>

          <h1>Expert help,<br><em>minutes away.</em></h1>

          <p>
            Find trusted technicians near you for repairs, maintenance and everyday services.
            Compare ratings, distance, availability and suitable prices before you book.
          </p>

          <div class="hero-search">
            <div>
              <small>Service</small>
              <select id="hero-service">
                ${SERVICES.map(s=>`<option ${s[1]===state.service?'selected':''}>${s[1]}</option>`).join('')}
              </select>
            </div>

            <div>
              <small>Location</small>
              <button class="location-input" onclick="detectLocation()">
                📍 ${esc(db.settings.location)}
              </button>
            </div>

            <button class="btn secondary big" onclick="openAIAnalyzer()">🤖 AI Diagnose</button><button class="btn primary big" onclick="heroSearch()">Find Help →</button>
          </div>

          <div class="hero-buttons">
            <button class="btn danger" onclick="quickFix()">🚨 Quick Fix</button>
            <button class="btn secondary" onclick="setRoute('services')">Explore Services</button>
          </div>

          <div class="trust-row">
            <span>✓ Verified</span>
            <span>₹ Transparent pricing</span>
            <span>⚡ Fast matching</span>
            <span>⭐ Real reviews</span>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-glow"></div>
          <div class="hero-logo-card">
            ${logo()}
            <span class="hero-logo-subtitle">Real local-service workflow</span>
          </div>
          <div class="hero-live-card">
            <div class="hero-live-head"><span class="live-dot"></span><b>Live service network</b><span class="badge green">Online</span></div>
            <div class="hero-live-row"><span>📍</span><div><b>Real GPS matching</b><small>Customer & technician locations</small></div></div>
            <div class="hero-live-row"><span>💰</span><div><b>Fair parts pricing</b><small>Shared catalog price · itemized quote · admin review</small></div></div>
            <div class="hero-live-row"><span>🔔</span><div><b>Request lifecycle</b><small>Requested → Accepted → On the way → Completed</small></div></div>
            <button class="btn primary full-btn" onclick="setRoute(currentUser()?.role==='admin'?'admin':'parts')">Open control center →</button>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-strip">
      <div class="container stats">
        <div><b>5 km</b><span>Nearby radius</span></div>
        <div><b>500+</b><span>Professionals</span></div>
        <div><b>4.8★</b><span>Average rating</span></div>
        <div><b>24/7</b><span>Quick Fix</span></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">SERVICES</span>
            <h2>What do you need fixed?</h2>
            <p>Choose a service and we’ll find suitable professionals nearby.</p>
          </div>
          <button class="btn secondary" onclick="setRoute('services')">View all →</button>
        </div>

        <div class="service-grid">
          ${SERVICES.slice(0,8).map(s=>serviceCard(s)).join('')}
        </div>
      </div>
    </section>

    <section class="section soft">
      <div class="container">
        <div class="section-head centered">
          <div>
            <span class="eyebrow">HOW IT WORKS</span>
            <h2>From problem to fixed in a few steps</h2>
          </div>
        </div>

        <div class="steps">
          <div>
            <span>01</span>
            <h3>Tell us the problem</h3>
            <p>Pick a service, explain the issue and add a photo if useful.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Meet nearby experts</h3>
            <p>Compare professionals within your chosen radius.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Book & track</h3>
            <p>Confirm a time, follow the technician and get updates.</p>
          </div>

          <div>
            <span>04</span>
            <h3>Pay & review</h3>
            <p>Complete the service and leave a verified review.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split-banner">
        <div>
          <span class="eyebrow">NEED IT NOW?</span>
          <h2>Quick Fix finds an available technician near you.</h2>
          <p>One tap. Nearby availability. Smart matching using distance, rating and price.</p>
          <button class="btn primary" onclick="quickFix()">Find a technician now →</button>
        </div>

        <div class="quick-demo">
          <div class="radar">
            <span></span>
            <span></span>
            <span>📍</span>
          </div>
          <b>Searching 5 km radius</b>
          <small>Availability · rating · distance</small>
        </div>
      </div>
    </section>

    <section class="section soft">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">TRUST</span>
            <h2>Built around better service</h2>
          </div>
        </div>

        <div class="feature-grid">
          <div class="feature">
            <span>🛡️</span>
            <b>Verified professionals</b>
            <p>Profiles can be reviewed and verified by admin.</p>
          </div>

          <div class="feature">
            <span>💰</span>
            <b>Transparent pricing</b>
            <p>See starting prices and approve quotations before extra work.</p>
          </div>

          <div class="feature">
            <span>⭐</span>
            <b>Verified reviews</b>
            <p>Reviews are linked to completed bookings.</p>
          </div>

          <div class="feature">
            <span>📍</span>
            <b>Local first</b>
            <p>Prioritize technicians close to the customer.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${footer()}`;
}

function serviceCard(s){
  return `<button class="service-card" onclick="startBooking('${esc(s[1])}')">
    <span class="service-icon">${s[0]}</span>
    <div>
      <h3>${esc(s[1])}</h3>
      <p>${esc(s[2])} · within 5 km</p>
    </div>
    <span class="arrow">→</span>
  </button>`;
}

function servicesPage(){
  return `${nav()}
  <main class="section">
    <div class="container">
      <div class="page-title">
        <div>
          <span class="eyebrow">NEARFIX SERVICES</span>
          <h1>Professional help for everyday problems.</h1>
          <p>Choose a category and find suitable technicians near your location.</p>
        </div>
        <button class="btn danger" onclick="quickFix()">🚨 Quick Fix</button>
      </div>

      <div class="service-grid full">
        ${SERVICES.map(s=>serviceCard(s)).join('')}
      </div>
    </div>
  </main>
  ${footer()}`;
}

function findPage(){
  if(currentUser()?.role==='customer'){
    const key=`${state.service}|${db.settings.userLat||''}|${db.settings.userLng||''}|${state.filters.maxDistance}`;
    if(state._findRefreshKey!==key){
      state._findRefreshKey=key;
      setTimeout(async()=>{ try{ if(!hasUserLocation()) await detectLocation(); else { await refreshNearbyTechnicians(); render(); } }catch(e){} },60);
    }
  }
  const list=getFilteredTechs();

  return `${nav()}
  <main class="section">
    <div class="container">
      <div class="page-title">
        <div>
          <span class="eyebrow">SMART MATCHING</span>
          <h1>Find a technician near you.</h1>
          <p>${state.quick
            ? 'Quick Fix is prioritising available professionals.'
            : 'Compare professionals by distance, rating, experience and price.'
          }</p>
        </div>

        <button class="btn danger" onclick="quickFix()">
          🚨 ${state.quick?'Quick Fix Active':'Quick Fix'}
        </button>
      </div>

      <div class="filter-panel">
        <div class="filter-field">
          <label>Service</label>
          <select onchange="state.service=this.value;render()">
            <option>All services</option>
            ${SERVICES.map(s=>`<option ${state.service===s[1]?'selected':''}>${s[1]}</option>`).join('')}
          </select>
        </div>

        <div class="filter-field">
          <label>Radius</label>
          <select onchange="state.filters.maxDistance=Number(this.value);render()">
            <option value="5">Within 5 km</option>
            <option value="3">Within 3 km</option>
            <option value="2">Within 2 km</option>
          </select>
        </div>

        <div class="filter-field">
          <label>Sort</label>
          <select onchange="state.filters.sort=this.value;render()">
            <option value="distance" ${state.filters.sort==='distance'?'selected':''}>Nearest</option>
            <option value="rating" ${state.filters.sort==='rating'?'selected':''}>Highest rated</option>
            <option value="price" ${state.filters.sort==='price'?'selected':''}>Lowest price</option>
            <option value="exp" ${state.filters.sort==='exp'?'selected':''}>Most experienced</option>
          </select>
        </div>

        <div class="filter-field">
          <label>Availability</label>
          <select onchange="state.filters.availability=this.value;render()">
            <option value="all">Any</option>
            <option value="available" ${state.filters.availability==='available'?'selected':''}>Available now</option>
          </select>
        </div>

        <div class="filter-field search-field">
          <label>Search</label>
          <input
            value="${esc(state.filters.query)}"
            placeholder="Technician or service"
            oninput="state.filters.query=this.value;renderFindResults(this.value)"
          >
        </div>
      </div>

      <div class="result-head">
        <b>${list.length} technicians found</b>
        <span>📍 ${esc(db.settings.location)} · 5 km preferred · expands only when needed to show 5–10 field-matched profiles</span>
      </div>
      ${currentUser()?.role==='customer' ? `<div class="location-banner"><span>📍</span><div><b>${hasUserLocation()?'Live location active':'Use your live location for accurate nearby matching'}</b><small>${hasUserLocation()?esc(db.settings.location):'NearFix will show 5–10 field-matched professionals using your location.'}</small></div><button class="btn secondary" onclick="detectLocation()">${hasUserLocation()?'Refresh location':'Use my location'}</button></div>`:''}

      <div id="find-results" class="tech-grid">
        ${list.map(t=>techCard(t)).join('')||
          emptyState('No technicians found','Try another service, wider radius or remove filters.')
        }
      </div>
    </div>
  </main>
  ${footer()}`;
}

function renderFindResults(query){
  state.filters.query=query;
  const box=document.getElementById('find-results');

  if(box){
    box.innerHTML=getFilteredTechs().map(t=>techCard(t)).join('')||
      emptyState('No technicians found','Try another search.');
  }
}

function getFilteredTechs(){
  let list=[...db.techs];

  if(state.service&&state.service!=='All services'){
    list=list.filter(t=>
      t.category===state.service ||
      t.service===SERVICES.find(s=>s[1]===state.service)?.[2]
    );
  }

  list=list.filter(t=>t.distance<=state.filters.maxDistance);

  if(state.filters.availability==='available'||state.quick){
    list=list.filter(t=>t.available);
  }

  const q=state.filters.query.toLowerCase();

  if(q){
    list=list.filter(t=>
      (t.name+' '+t.service+' '+t.category).toLowerCase().includes(q)
    );
  }

  list.sort((a,b)=>
    state.filters.sort==='rating'
      ? b.rating-a.rating
      : state.filters.sort==='price'
      ? a.price-b.price
      : state.filters.sort==='exp'
      ? b.exp-a.exp
      : a.distance-b.distance
  );

  return list;
}

function techMini(t){
  return `<div class="tech-mini">
    <div class="avatar">${initials(t.name)}</div>

    <div class="grow">
      <b>${esc(t.name)} ${t.verified?'<span class="verified">✓</span>':''}</b>
      <span>${esc(t.service)} · ${t.exp}+ yrs</span>
      <span class="rating">★ ${t.rating} <small>(${t.reviews})</small></span>
    </div>

    <div class="mini-price">
      <b>${money(t.price)}</b>
      <small>starting</small>
    </div>
  </div>`;
}

function techCard(t){
  const fav=db.favourites.includes(t.id);

  return `<article class="tech-card">
    <div class="tech-top">
      <div class="avatar large">${initials(t.name)}</div>

      <div class="grow">
        <h3>
          ${esc(t.name)}
          ${t.verified?'<span class="verified">✓ Verified</span>':''}
        </h3>
        <p>${esc(t.service)} · ${t.exp}+ years experience</p>
        <div class="rating">★ ${t.rating} <small>(${t.reviews} reviews)</small></div>
      </div>

      <button
        class="heart ${fav?'saved':''}"
        onclick="toggleFavourite(${t.id});event.stopPropagation()"
      >
        ${fav?'♥':'♡'}
      </button>
    </div>

    <div class="skill-passport-mini"><span>🪪 Skill Passport</span><b>Degree not required · practical skills verified</b></div>

    <div class="tech-tags">
      <span>📍 ${t.distance} km</span>
      <span>${t.available?'🟢 Available now':'🔴 Busy'}</span>
      <span>⚡ ${t.response||0}% response</span><span>🪪 Skill-first</span>
    </div>

    <div class="skills">
      ${t.skills.slice(0,3).map(s=>`<span>${esc(s)}</span>`).join('')}
    </div>

    <div class="tech-bottom">
      <div>
        <small>Fair starting estimate</small>
        <strong>${money(t.startingPrice||t.price)}</strong>
        <small>${t.distanceFee?`₹${t.distanceFee} distance component · base ${money(t.price)}`:'Distance-based pricing'}</small>
      </div>
      <span class="jobs">${t.jobs} jobs</span>
    </div>

    <div class="card-actions">
      <button class="btn ghost" onclick="techDetails(${t.id})">View Profile</button>
      <button class="btn primary" onclick="startBooking('${esc(t.category)}',${t.id})">
        Book Technician
      </button>
    </div>
  </article>`;
}

function emptyState(title,text){
  return `<div class="empty-state">
    <div>🔎</div>
    <h3>${title}</h3>
    <p>${text}</p>
    <button
      class="btn secondary"
      onclick="state.service='All services';state.filters.query='';state.filters.availability='all';state.quick=false;render()"
    >
      Clear filters
    </button>
  </div>`;
}

function login(){
  return `${nav()}
  <main class="auth-page">
    <div class="auth-card">
<div class="auth-logo">${logo()}</div>
      <span class="eyebrow">SECURE DEMO ACCESS</span>

      <h1>Welcome back</h1>
      <p>Sign in to manage services, bookings and requests.</p>

      <div class="role-tabs">
        <button id="login-customer" class="active" onclick="setAuthRole('customer')">Customer</button>
        <button id="login-technician" onclick="setAuthRole('technician')">Technician</button>
        <button id="login-admin" onclick="setAuthRole('admin')">Admin</button>
      </div>

      <div class="form-field">
        <label>Email</label>
        <input id="login-email" type="email" placeholder="you@example.com">
      </div>

      <div class="form-field">
        <label>Password</label>
        <input id="login-password" type="password" placeholder="••••••••">
      </div>

      <div class="form-row">
        <label><input type="checkbox" checked> Remember me</label>
        <button class="text-btn" onclick="toast('Demo reset link sent')">Forgot password?</button>
      </div>

      <button class="btn primary full-btn" onclick="loginSubmit()">Sign in →</button>

      <div class="divider"><span>Demo access</span></div>

      <div class="demo-buttons">
        <button onclick="demoLogin('customer')">Customer</button>
        <button onclick="demoLogin('technician')">Technician</button>
        <button onclick="demoLogin('admin')">Admin</button>
      </div>

      <p class="auth-foot">
        New to NearFix?
        <button class="text-btn" onclick="openSignup()">Create an account</button>
      </p>
    </div>
  </main>`;
}

let authRole='customer';

function setAuthRole(r){
  authRole=r;

  ['customer','technician','admin'].forEach(x=>
    document.getElementById('login-'+x)?.classList.toggle('active',x===r)
  );

  const e=document.getElementById('login-email');

  if(e){
    e.value=
      r==='customer'
        ? 'customer@nearfix.demo'
        : r==='technician'
        ? 'technician@nearfix.demo'
        : 'admin@nearfix.demo';
  }
}

function loginSubmit(){
  const email=document.getElementById('login-email').value.trim().toLowerCase();

  const user=db.users.find(
    u=>u.email.toLowerCase()===email&&u.role===authRole
  );

  if(!user){
    toast('Use one of the demo accounts or create an account.');
    return;
  }

  db.session=user.id;
  saveDB();

  setRoute(
    user.role==='customer'
      ? 'customer'
      : user.role==='technician'
      ? 'technician'
      : 'admin'
  );

  toast(`Welcome, ${user.name.split(' ')[0]}!`);
}

function demoLogin(role){
  const u=db.users.find(x=>x.role===role);

  db.session=u.id;
  saveDB();

  setRoute(
    role==='customer'
      ? 'customer'
      : role==='technician'
      ? 'technician'
      : 'admin'
  );

  toast(`Demo ${role} opened`);
}

function logout(){
  db.session=null;
  saveDB();
  setRoute('home');
  toast('You have been logged out.');
}

function openSignup(role='customer'){
  authRole=role;

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box auth-modal">
      <button class="close" onclick="closeModal()">×</button>

      <div class="auth-logo">${logo()}<b>NearFix</b></div>

      <span class="eyebrow">CREATE ACCOUNT</span>

      <h2>Join NearFix</h2>
      <p class="muted">Choose how you want to use NearFix.</p>

      <div class="role-tabs">
        <button
          class="${role==='customer'?'active':''}"
          onclick="signupRole('customer')"
          id="signup-customer"
        >
          Customer
        </button>

        <button
          class="${role==='technician'?'active':''}"
          onclick="signupRole('technician')"
          id="signup-technician"
        >
          Technician
        </button>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label>Full name</label>
          <input id="signup-name" placeholder="Your name">
        </div>

        <div class="form-field">
          <label>Mobile</label>
          <input id="signup-phone" placeholder="+91 98xxx xxxxx">
        </div>

        <div class="form-field full">
          <label>Email</label>
          <input id="signup-email" type="email" placeholder="you@example.com">
        </div>

        <div class="form-field">
          <label>Password</label>
          <input id="signup-pass" type="password" placeholder="Create password">
        </div>

        <div class="form-field">
          <label>City</label>
          <input id="signup-city" value="Sonipat">
        </div>
      </div>

      ${role==='technician'
        ? `<div class="form-field">
            <label>Primary service</label>
            <select id="signup-service">
              ${SERVICES.map(s=>`<option>${s[1]}</option>`).join('')}
            </select>
          </div>`
        : ''
      }

      <button class="btn primary full-btn" onclick="createAccount()">
        Create account →
      </button>
    </div>
  </div>`;
}

function signupRole(r){
  openSignup(r);
}

function createAccount(){
  const name=document.getElementById('signup-name').value.trim();
  const email=document.getElementById('signup-email').value.trim().toLowerCase();
  const phone=document.getElementById('signup-phone').value.trim();

  if(!name||!email||!phone){
    toast('Please complete the required fields.');
    return;
  }

  if(db.users.some(u=>u.email===email)){
    toast('An account with this email already exists.');
    return;
  }

  const role=authRole==='technician'?'technician':'customer';
  const id='u'+Date.now();

  db.users.push({id,name,email,phone,role});

  if(role==='technician'){
    const cat=document.getElementById('signup-service')?.value||'General Repair';

    db.techs.push({
      id:Number(Date.now().toString().slice(-7)),
      name,
      service:SERVICES.find(s=>s[1]===cat)?.[2]||'Technician',
      category:cat,
      rating:5,
      reviews:0,
      exp:1,
      distance:3.5,
      price:299,
      available:true,
      jobs:0,
      verified:false,
      response:100,
      skills:['New professional']
    });
  }

  db.session=id;
  saveDB();
  closeModal();

  setRoute(role==='technician'?'technician':'customer');

  toast('Account created successfully.');
}

function customerPage(){
  const u=currentUser();

  const bookings=db.bookings
    .filter(b=>b.customerId===u.id)
    .sort((a,b)=>b.created-a.created);

  const upcoming=bookings.find(
    b=>!['Completed','Cancelled'].includes(b.status)
  );

  return `${nav()}
  <main class="dashboard-page">
    <div class="container">

      <div class="dash-welcome">
        <div>
          <span class="eyebrow">CUSTOMER DASHBOARD</span>
          <h1>Good evening, ${esc(u.name.split(' ')[0])} 👋</h1>
          <p>Manage your bookings, nearby professionals and service history.</p>
        </div>

        <button class="btn primary" onclick="startBooking('Plumbing')">
          ＋ Book a service
        </button>
      </div>

      <div class="metric-grid">
        ${clickMetricCard('◷','Upcoming',
          bookings.filter(b=>!['Completed','Cancelled'].includes(b.status)).length,'Active bookings','bookings')}

        ${clickMetricCard('✓','Completed',
          bookings.filter(b=>b.status==='Completed').length,'Services','bookings')}

        ${clickMetricCard('♥','Saved',db.favourites.length,'Technicians','favourites')}

        ${clickMetricCard('★','Reviews',
          db.reviews.filter(r=>r.customerId===u.id).length,'Given by you','bookings')}
      </div>

      <div class="dash-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Upcoming booking</b>
              <small>Your active service request</small>
            </div>
            <button class="btn ghost" onclick="setRoute('bookings')">View all</button>
          </div>

          ${upcoming
            ? bookingRow(upcoming,true)
            : `<div class="empty-inline">
                <span>📅</span>
                <p>No upcoming bookings.</p>
                <button class="btn secondary" onclick="startBooking('Plumbing')">
                  Book your first service
                </button>
              </div>`
          }
        </section>

        <section class="panel quick-panel">
          <div class="quick-icon">🚨</div>
          <div><b>Quick Fix</b><p>Need a technician right now?</p><button class="btn danger" onclick="quickFix()">Find available now →</button></div>
        </section>
        <section class="panel ai-assistant-card">
          <div class="quick-icon">🤖</div><div><b>NearFix AI Guide</b><p>Describe your problem and get guided next steps before booking.</p><button class="btn primary" onclick="openCustomerAIChat()">Chat with AI →</button></div>
        </section>
      </div>

      <div class="dash-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Recent services</b>
              <small>Latest activity</small>
            </div>
            <button class="btn ghost" onclick="setRoute('bookings')">View all</button>
          </div>

          ${bookings.slice(0,4).map(b=>bookingRow(b,false)).join('')||
            '<p class="muted">Your completed and active services will appear here.</p>'
          }
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Favourite technicians</b>
              <small>Book again quickly</small>
            </div>
            <button class="btn ghost" onclick="setRoute('favourites')">View all</button>
          </div>

          ${db.favourites.slice(0,3)
            .map(id=>tech(id))
            .filter(Boolean)
            .map(t=>favRow(t))
            .join('')||
            '<p class="muted">Save technicians you trust.</p>'
          }
        </section>
      </div>

      <div class="dash-grid">
        <section class="panel"><div class="panel-head"><div><b>Fair parts check</b><small>Verify spare-part reference prices before approving extra work.</small></div><button class="btn ghost" onclick="setRoute('parts')">View catalog</button></div><div class="role-tools"><button class="tool-card" onclick="setRoute('scanner')"><span>▣</span><b>Scan a barcode</b><small>Check price instantly</small></button><button class="tool-card" onclick="openAIAnalyzer()"><span>🤖</span><b>AI Diagnose</b><small>Explain the issue</small></button></div></section>
        <section class="panel"><div class="panel-head"><div><b>Customer protection</b><small>Your approval controls the final bill.</small></div></div><ul class="clean-list"><li>Parts appear as separate quote items.</li><li>Reference prices are shared with technicians.</li><li>Extra work needs your approval.</li></ul></section>
      </div>

    </div>
  </main>

  ${mobileBottom('customer')}`;
}

function metricCard(icon,label,value,sub){
  return `<div class="metric-card">
    <span>${icon}</span>
    <small>${label}</small>
    <strong>${value}</strong>
    <em>${sub}</em>
  </div>`;
}

function clickMetricCard(icon,label,value,sub,route){return `<button class="metric-card metric-click" onclick="setRoute('${route}')"><span>${icon}</span><small>${label}</small><strong>${value}</strong><em>${sub}</em></button>`;}

function bookingRow(b,active){
  const t=b.technician||tech(b.techId);
  const me=currentUser();
  const customerName=b.customer?.name||'Customer';
  const otherLabel=me?.role==='technician'?customerName:(t?.name||'Technician');
  const subtitle=me?.role==='technician'?`Customer · ${b.customer?.phone||'Contact in details'}`:`Technician · ${t?.service||b.service}`;
  return `<div class="booking-row"><div class="booking-icon">${SERVICES.find(s=>s[1]===b.service)?.[0]||'🛠️'}</div><div class="grow"><b>${esc(b.service)} · ${esc(otherLabel)}</b><small>${esc(subtitle)}</small><small>${esc(b.date)} · ${esc(b.time)} · 📍 ${esc(b.location)}</small><span class="status ${b.status.toLowerCase().replaceAll(' ','-')}" >${esc(b.status)}</span>${b.status==='Completed'?`<small>💳 Payment: <b>${esc(b.paymentStatus||'PENDING')}</b>${b.invoice?.number?` · Invoice ${esc(b.invoice.number)}`:''}</small>`:''}</div><div class="row-end"><b>${money(b.total||b.estimate||0)}</b>${active?`<button class="btn secondary" onclick="bookingDetails(${b.id})">Open details</button>${me?.role==='customer'&&b.status==='Completed'&&!String(b.paymentStatus||'').includes('PAID')?`<button class="btn primary" onclick="paymentModal(${b.id})">Pay</button>`:''}`:`<button class="icon-btn" onclick="bookingDetails(${b.id})">→</button>`}</div></div>`;
}

function favRow(t){
  return `<div class="mini-row">
    <div class="avatar">${initials(t.name)}</div>

    <div class="grow">
      <b>${esc(t.name)}</b>
      <small>★ ${t.rating} · ${t.service}</small>
    </div>

    <button
      class="btn secondary"
      onclick="startBooking('${esc(t.category)}',${t.id})"
    >
      Book
    </button>
  </div>`;
}

function accountPage(){
  const u=currentUser();
  const role=u?.role;
  const myBookings=db.bookings.filter(b=>role==='customer'?b.customerId===u.id:(role==='technician'&&b.technician?.userId===u.id));
  const paid=db.payments.filter(p=>p.customerId===u.id&&['Paid','SUCCESS'].includes(p.status)).reduce((s,p)=>s+Number(p.amount||0),0);
  const myTechProfile=db.techs.find(t=>t.userId===u.id); const earnings=db.payments.filter(p=>(p.techId===myTechProfile?.id||p.technicianId===myTechProfile?.id)&&['Paid','SUCCESS'].includes(p.status)).reduce((s,p)=>s+Number(p.amount||0),0);
  const revenue=(db.adminAllPayments||db.payments).filter(p=>['Paid','SUCCESS'].includes(p.status)).reduce((s,p)=>s+Number(p.amount||0),0);
  const summary=db.accountSummary||{}; const balance=role==='customer'?Number(summary.totalPaid||paid):role==='technician'?Number(summary.availableBalance||earnings):revenue;
  return `${nav()}<main class="dashboard-page"><div class="container">
    <div class="dash-welcome"><div><span class="eyebrow">ACCOUNT & FINANCE</span><h1>${esc(u.name)}</h1><p>Profile, account details and transparent financial activity.</p></div><button class="btn secondary" onclick="openInfo('support')">Need help?</button></div>
    <div class="account-hero"><div class="account-profile"><div class="avatar large">${initials(u.name)}</div><div><h2>${esc(u.name)}</h2><p>${esc(u.email)} · ${esc(u.phone||'Mobile not added')}</p><span class="badge green">${role==='customer'?'Verified customer':role==='technician'?'Skill-first professional':'Platform administrator'}</span></div></div><div class="account-balance"><small>${role==='customer'?'Total paid':role==='technician'?'Recorded earnings':'Platform revenue'}</small><strong>${money(balance)}</strong><span>${myBookings.length} related bookings</span></div></div>
    <div class="metric-grid">${metricCard('₹','Account balance',money(balance),role==='technician'?'Available after verified payments':role==='customer'?'Verified payments to date':'Platform recorded payments')}${metricCard('📄','Invoices',db.invoices?.filter(i=>role==='admin'||i.customerId===u.id||i.technicianId===u.id).length||0,'Available records')}${metricCard('💳','Paid amount',money(role==='customer'?paid:earnings),'Verified payments')}</div>
    <div class="dash-grid"><section class="panel"><div class="panel-head"><div><b>Account details</b><small>Identity and contact details used by NearFix.</small></div><button class="btn ghost" onclick="toast('Profile editing is available from your role dashboard.')">Edit</button></div><div class="detail-grid"><div class="panel-lite"><small>Name</small><b>${esc(u.name)}</b></div><div class="panel-lite"><small>Email</small><b>${esc(u.email)}</b></div><div class="panel-lite"><small>Mobile</small><b>${esc(u.phone||'—')}</b></div><div class="panel-lite"><small>Role</small><b>${esc(role)}</b></div></div></section><section class="panel"><div class="panel-head"><div><b>Payment methods</b><small>Demo-safe display; real payment credentials stay with the provider.</small></div></div><div class="payment-method-card"><span>UPI</span><b>${role==='technician'?(esc(db.techs.find(t=>t.userId===u.id)?.upiId||'Add UPI ID in profile')):'Available after service completion'}</b><small>${role==='technician'?'Customer payments can be routed to this account.':'Scan the payment QR or use secure checkout.'}</small></div><div class="payment-method-card"><span>Cash</span><b>Supported for completed jobs</b><small>Requires technician/admin confirmation</small></div></section></div>
    <section class="panel"><div class="panel-head"><div><b>Recent financial activity</b><small>Payment and invoice records connected to your account.</small></div></div>${(db.payments||[]).filter(p=>p.customerId===u.id||p.technicianId===u.id||p.techId===u.id).slice(-8).reverse().map(p=>`<div class="booking-row"><div class="booking-icon">💳</div><div class="grow"><b>${esc(p.method||'Payment')} · ${esc(p.transactionId||p.id)}</b><small>${esc(p.status||'Pending')}</small></div><strong>${money(p.amount||0)}</strong></div>`).join('')||'<p class="muted">No payment records yet.</p>'}</section>
  </div></main>${mobileBottom(role)}`;
}

function technicianPage(){
  const u=currentUser();

  const myTech=db.techs.find(t=>t.userId===u.id);
  if(!myTech) return `${nav()}<main class="dashboard-page"><div class="container"><section class="panel"><h2>Technician profile unavailable</h2><p class="muted">Your technician account is not linked to a technician profile.</p></section></div></main>`;

  const requests=db.bookings.filter(
    b=>b.techId===myTech.id&&b.status==='Requested'
  );

  const active=db.bookings.filter(
    b=>b.techId===myTech.id&&!['Completed','Cancelled'].includes(b.status)
  );

  const earnings=db.payments
    .filter(p=>p.techId===myTech.id&&p.status==='Paid')
    .reduce((s,p)=>s+p.amount,0);

  return `${nav()}
  <main class="dashboard-page">
    <div class="container">

      <div class="dash-welcome">
        <div>
          <span class="eyebrow">TECHNICIAN DASHBOARD</span>
          <h1>Good morning, ${esc(u.name.split(' ')[0])} 👋</h1>
          <p>Manage service requests, jobs, availability and earnings.</p>
        </div>

        <button
          class="availability-toggle ${myTech.available?'on':''}"
          onclick="toggleAvailability(${myTech.id})"
        >
          <span></span>
          ${myTech.available?'Available':'Offline'}
        </button>
        <button
          class="btn secondary"
          onclick="startTechnicianLocationSharing(${myTech.id})"
        >
          📍 ${technicianWatchId===null?'Share GPS':'Stop GPS'}
        </button>
      </div>

      <div class="metric-grid">
        ${clickMetricCard('📥','New Requests',requests.length,'Waiting for action','bookings')}
        ${clickMetricCard('◷','Active Jobs',active.length,'In progress','bookings')}
        ${metricCard('₹','Earnings',money(earnings),'Recorded payments')}
        ${metricCard('★','Rating',myTech.rating,`${myTech.reviews} reviews`)}
      </div>

      <div class="dash-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <b>New service requests</b>
              <small>Accept or reject incoming work</small>
            </div>
            <span class="badge">${requests.length} pending</span>
          </div>

          ${requests.map(b=>requestCard(b,myTech)).join('')||
            `<div class="empty-inline">
              <span>✓</span>
              <p>No new requests. Stay available to receive work.</p>
            </div>`
          }
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Today</b>
              <small>Current workload</small>
            </div>
            <button class="btn ghost" onclick="setRoute('tech-jobs')">All jobs</button>
          </div>

          ${active.slice(0,4).map(b=>bookingRow(b,true)).join('')||
            '<p class="muted">No active jobs.</p>'
          }
        </section>
      </div>

      <div class="dash-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Performance</b>
              <small>Last 30 days</small>
            </div>
          </div>

          <div class="chart">
            <div style="height:38%"><span>W1</span></div>
            <div style="height:58%"><span>W2</span></div>
            <div style="height:46%"><span>W3</span></div>
            <div style="height:78%"><span>W4</span></div>
            <div style="height:66%"><span>Now</span></div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <b>Your profile</b>
              <small>What customers see</small>
            </div>
            <button class="btn ghost" onclick="editTechProfile(${myTech.id})">Edit</button>
          </div>

          ${techMini(myTech)}

          <div class="profile-progress">
            <span>Profile completeness</span>
            <b>92%</b>
            <div class="progress">
              <span style="width:92%"></span>
            </div>
          </div>
        </section>
      </div>

      <div class="dash-grid">
        <section class="panel"><div class="panel-head"><div><b>Parts & pricing tools</b><small>Scan a part and itemize it in the customer quotation.</small></div></div><div class="role-tools"><button class="tool-card" onclick="setRoute('scanner')"><span>▣</span><b>Scan part</b><small>Barcode → catalog price</small></button><button class="tool-card" onclick="setRoute('parts')"><span>🧰</span><b>Parts catalog</b><small>Search compatible parts</small></button></div></section>
        <section class="panel"><div class="panel-head"><div><b>Professional workflow</b><small>Customer details and approvals stay attached to each job.</small></div></div><ul class="clean-list"><li>Open a request to see customer contact and issue.</li><li>Accept or reject only assigned customer requests.</li><li>After inspection, send an itemized quotation.</li></ul></section>
      </div>

    </div>
  </main>

  ${mobileBottom('technician')}`;
}

function requestCard(b,t){
  return `<div class="request-card">
    <div class="request-head">
      <div class="booking-icon">
        ${SERVICES.find(s=>s[1]===b.service)?.[0]||'🛠️'}
      </div>

      <div class="grow">
        <b>${esc(b.service)}</b>
        <small>Customer: ${esc(b.customer?.name||'Customer')}</small>
        <small>${esc(b.date)} · ${esc(b.time)} · 📍 ${esc(b.location)}</small>
      </div>

      <strong>${money(b.estimate)}</strong>
    </div>

    <p>${esc(b.problem)}</p>

    <div class="card-actions">
      <button class="btn ghost" onclick="rejectBooking(${b.id})">Reject</button>
      <button class="btn primary" onclick="acceptBooking(${b.id})">Accept request</button>
    </div>
  </div>`;
}

function adminPage(){
  const users=db.adminAllUsers||db.users;
  const bs=db.adminAllBookings||db.bookings;
  const techs=db.adminAllTechnicians||db.techs;

  const revenue=db.payments
    .filter(p=>p.status==='Paid')
    .reduce((s,p)=>s+p.amount,0);

  const completed=bs.filter(b=>b.status==='Completed').length;

  return `${nav()}
  <main class="dashboard-page">
    <div class="container">

      <div class="dash-welcome">
        <div>
          <span class="eyebrow">ADMIN CONTROL CENTER</span>
          <h1>NearFix operations</h1>
          <p>Manage users, technicians, bookings, payments and platform health.</p>
        </div>

        <button class="btn primary" onclick="openServiceManager()">
          ＋ Manage services
        </button>
      </div>

      <div class="metric-grid">
        ${clickMetricCard('👥','Total users',users.length,'Customers + technicians','admin-users')}
        ${clickMetricCard('🧑‍🔧','Technicians',techs.length,`${techs.filter(t=>t.verified).length} verified`,'admin-techs')}
        ${clickMetricCard('📅','Bookings',bs.length,`${completed} completed`,'admin-bookings')}
        ${clickMetricCard('₹','Revenue',money(revenue),'Recorded payments','admin-data')}
      </div>

      <div class="admin-tabs">
        <button class="active" onclick="adminTab(this,'overview')">Overview</button>
        <button onclick="adminTab(this,'users')">Users</button>
        <button onclick="adminTab(this,'technicians')">Technicians</button>
        <button onclick="adminTab(this,'bookings')">Bookings</button>
        <button onclick="adminTab(this,'complaints')">Complaints</button><button onclick="adminTab(this,'parts')">Parts</button>
        <button onclick="adminTab(this,'offers')">Offers</button><button onclick="adminTab(this,'data')">All Data</button>
      </div>

      <div id="admin-content">${adminOverview()}</div>

    </div>
  </main>`;
}

function adminOverview(){
  const counts=SERVICES
    .map(s=>({
      name:s[1],
      n:db.bookings.filter(b=>b.service===s[1]).length
    }))
    .sort((a,b)=>b.n-a.n);

  return `<div class="admin-grid">

    <section class="panel">
      <div class="panel-head">
        <div>
          <b>Booking trend</b>
          <small>Demo activity</small>
        </div>
        <span class="badge green">Live</span>
      </div>

      <div class="chart tall">
        <div style="height:42%"><span>Mon</span></div>
        <div style="height:58%"><span>Tue</span></div>
        <div style="height:51%"><span>Wed</span></div>
        <div style="height:73%"><span>Thu</span></div>
        <div style="height:68%"><span>Fri</span></div>
        <div style="height:84%"><span>Sat</span></div>
        <div style="height:62%"><span>Sun</span></div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <b>Popular services</b>
          <small>Share of demo requests</small>
        </div>
      </div>

      ${counts.slice(0,6).map((x,i)=>`
        <div class="bar-row">
          <span>${esc(x.name)}</span>
          <div><i style="width:${Math.max(8,40-i*6)}%"></i></div>
          <b>${x.n}</b>
        </div>
      `).join('')}
    </section>

  </div>

  <section class="panel table-panel">
    <div class="panel-head">
      <div>
        <b>Recent bookings</b>
        <small>Latest platform activity</small>
      </div>

      <button class="btn ghost" onclick="adminTab(null,'bookings')">View all</button>
    </div>

    ${db.bookings.slice(-6).reverse().map(b=>bookingRow(b,false)).join('')||
      '<p class="muted">No bookings yet. Create one from customer mode.</p>'
    }
  </section>`;
}

function adminTab(btn,tab){
  document.querySelectorAll('.admin-tabs button')
    .forEach(x=>x.classList.remove('active'));

  if(btn)btn.classList.add('active');

  const c=document.getElementById('admin-content');

  if(!c)return;

  if(tab==='overview')c.innerHTML=adminOverview();
  if(tab==='users')c.innerHTML=adminUsers();
  if(tab==='technicians')c.innerHTML=adminTechs();
  if(tab==='bookings')c.innerHTML=adminBookings();
  if(tab==='complaints')c.innerHTML=adminComplaints();
  if(tab==='payments')c.innerHTML=adminPayments();
  if(tab==='parts')c.innerHTML=adminParts();
  if(tab==='offers')c.innerHTML=adminOffers();
  if(tab==='data')c.innerHTML=adminAllData();
}

function adminUsers(){
  const users=db.adminAllUsers||db.users;
  return `<section class="panel table-panel"><div class="panel-head"><div><b>All users</b><small>Customer and technician accounts with contact and activity.</small></div></div><div class="table-wrap"><table><thead><tr><th>User</th><th>Contact</th><th>Role</th><th>Activity</th><th></th></tr></thead><tbody>${users.map(u=>{const bookings=(db.adminAllBookings||[]).filter(b=>b.customerId===u.id||b.technician?.userId===u.id).length;return `<tr><td><b>${esc(u.name)}</b><small>${esc(u.id)}</small></td><td>${esc(u.email)}<br>${esc(u.phone||'—')}</td><td><span class="badge">${esc(u.role)}</span></td><td>${bookings} bookings</td><td><button class="btn secondary" onclick="adminUserDetails('${esc(u.id)}')">View</button></td></tr>`}).join('')}</tbody></table></div></section>`;
}

function adminTechs(){
  const techs=db.adminAllTechnicians||db.techs;
  return `<section class="panel table-panel"><div class="panel-head"><div><b>Technician management</b><small>Profiles, verification, availability, GPS and performance.</small></div></div>${techs.map(t=>`<div class="admin-tech"><div class="avatar">${initials(t.name)}</div><div class="grow"><b>${esc(t.name)}</b><small>${esc(t.category)} · ${t.exp} yrs · ${t.area||'—'} · ${t.distance} km</small><small>★ ${t.rating} · ${t.jobs} jobs · ${t.response}% response</small></div><span class="badge ${t.verified?'green':''}">${t.verified?'Verified':'Pending'}</span><span class="badge ${t.available?'green':''}">${t.available?'Available':'Offline'}</span><button class="btn secondary" onclick="adminTechDetails(${t.id})">Details</button><button class="btn secondary" onclick="toggleVerification(${t.id})">${t.verified?'Unverify':'Verify'}</button></div>`).join('')||'<p class="muted">No technicians.</p>'}</section>`;
}

function adminBookings(){
  const list=db.adminAllBookings||db.bookings;
  return `<section class="panel table-panel"><div class="panel-head"><div><b>All service requests & bookings</b><small>Customer → assigned technician lifecycle.</small></div></div>${list.slice().reverse().map(b=>bookingRow(b,false)).join('')||'<p class="muted">No bookings.</p>'}</section>`;
}

function adminComplaints(){
  const list=db.adminAllDisputes||db.complaints;
  return `<section class="panel table-panel"><div class="panel-head"><div><b>Complaints & disputes</b><small>Customer issues and administrative resolution.</small></div></div>${list.map(c=>`<div class="complaint"><div class="grow"><b>${esc(c.subject||c.reason||'Issue')}</b><small>${esc(c.details||c.text||'')}</small><small>Customer: ${esc(c.customerId||'—')} · Technician: ${esc(c.technicianId||'—')}</small></div><span class="status ${String(c.status).toLowerCase()}">${esc(c.status)}</span><button class="btn secondary" onclick="resolveComplaint('${esc(c.id)}')">${c.status==='RESOLVED'?'Resolved':'Resolve'}</button></div>`).join('')||'<p class="muted">No complaints.</p>'}</section>`;
}

function adminUserDetails(id){
  const u=(db.adminAllUsers||[]).find(x=>x.id===id)||db.users.find(x=>x.id===id); if(!u)return;
  const bs=(db.adminAllBookings||[]).filter(b=>b.customerId===id||b.technician?.userId===id);
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide"><div class="modal-head"><div><span class="eyebrow">ADMIN · USER DETAIL</span><h2>${esc(u.name)}</h2><p class="muted">${esc(u.role)} · ${esc(u.email)}</p></div><button class="close" onclick="closeModal()">×</button></div><div class="detail-grid"><div class="panel-lite"><small>User ID</small><b>${esc(u.id)}</b></div><div class="panel-lite"><small>Phone</small><b>${esc(u.phone||'—')}</b></div><div class="panel-lite"><small>Bookings</small><b>${bs.length}</b></div><div class="panel-lite"><small>Account role</small><b>${esc(u.role)}</b></div></div><h3>Related bookings</h3>${bs.map(b=>`<div class="mini-row"><div class="grow"><b>#${String(b.id).slice(-6)} · ${esc(b.service)}</b><small>${esc(b.customer?.name||'Customer')} → ${esc(b.technician?.name||'Technician')} · ${esc(b.status)}</small></div><button class="btn secondary" onclick="closeModal();bookingDetails(${b.id})">Open</button></div>`).join('')||'<p class="muted">No bookings.</p>'}</div></div>`;
}
function adminTechDetails(id){
  const t=(db.adminAllTechnicians||[]).find(x=>x.id===Number(id))||tech(id); if(!t)return;
  const u=(db.adminAllUsers||[]).find(x=>x.id===t.userId)||{}; const bs=(db.adminAllBookings||[]).filter(b=>b.technicianId===t.id);
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide"><div class="modal-head"><div><span class="eyebrow">ADMIN · TECHNICIAN DETAIL</span><h2>${esc(t.name)}</h2><p class="muted">${esc(t.service)} · ${esc(t.area||'')}</p></div><button class="close" onclick="closeModal()">×</button></div><div class="detail-grid"><div class="panel-lite"><small>Email</small><b>${esc(u.email||'—')}</b></div><div class="panel-lite"><small>Phone</small><b>${esc(u.phone||t.phone||'—')}</b></div><div class="panel-lite"><small>Verification</small><b>${t.verified?'Verified':'Pending'}</b></div><div class="panel-lite"><small>GPS</small><b>${t.lat&&t.lng?`${Number(t.lat).toFixed(5)}, ${Number(t.lng).toFixed(5)}`:'Not shared'}</b></div><div class="panel-lite"><small>Skills</small><b>${esc((t.skills||[]).join(', ')||'—')}</b></div><div class="panel-lite"><small>Performance</small><b>${t.jobs} jobs · ${t.completionRate||0}% completion</b></div></div><h3>Assigned bookings (${bs.length})</h3>${bs.map(b=>`<div class="mini-row"><div class="grow"><b>#${String(b.id).slice(-6)} · ${esc(b.service)}</b><small>${esc(b.customer?.name||'Customer')} · ${esc(b.status)} · ${money(b.total||b.estimate||0)}</small></div><button class="btn secondary" onclick="closeModal();bookingDetails(${b.id})">Open</button></div>`).join('')||'<p class="muted">No assigned bookings.</p>'}</div></div>`;
}
function adminAllData(){
  const sets=[['Parts',db.adminAllParts||db.parts||[]],['Quotes',db.adminAllQuotes||[]],['Payments',db.adminAllPayments||[]],['Invoices',db.adminAllInvoices||[]],['Reviews',db.adminAllReviews||[]],['Messages',db.adminAllMessages||[]],['Notifications',db.adminAllNotifications||[]],['AI analyses',db.adminAllAiAnalyses||[]],['Audit logs',db.adminAllAuditLogs||[]]];
  return `<section class="panel table-panel"><div class="panel-head"><div><b>Platform data</b><small>All operational records available to the administrator.</small></div></div>${sets.map(([label,arr])=>`<div class="mini-row"><div class="grow"><b>${label}</b><small>${arr.length} records</small></div><button class="btn secondary" onclick="adminDataModal('${label}')">View all</button></div>`).join('')}</section>`;
}
function adminDataModal(label){
  const map={'Parts':db.adminAllParts||db.parts||[],'Quotes':db.adminAllQuotes,'Payments':db.adminAllPayments,'Invoices':db.adminAllInvoices,'Reviews':db.adminAllReviews,'Messages':db.adminAllMessages,'Notifications':db.adminAllNotifications,'AI analyses':db.adminAllAiAnalyses,'Audit logs':db.adminAllAuditLogs}; const rows=map[label]||[];
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide"><div class="modal-head"><div><span class="eyebrow">ADMIN DATA</span><h2>${esc(label)}</h2></div><button class="close" onclick="closeModal()">×</button></div><pre class="admin-json">${esc(JSON.stringify(rows,null,2))}</pre></div></div>`;
}

function adminPayments(){
  const payments=db.adminAllPayments||db.payments||[];
  const pending=payments.filter(p=>p.status==='PENDING_CONFIRMATION');
  return `<section class="panel table-panel"><div class="panel-head"><div><b>Payment verification queue</b><small>Cash and manual UPI payments require confirmation before being marked paid.</small></div><span class="badge ${pending.length?'':'green'}">${pending.length} pending</span></div>${payments.slice().reverse().map(p=>`<div class="booking-row"><div class="booking-icon">${p.method==='CASH'?'💵':'📱'}</div><div class="grow"><b>${esc(p.method||'Payment')} · ${esc(p.transactionId||p.id)}</b><small>Booking #${String(p.bookingId).slice(-6)} · ${esc(p.status||'')}</small>${p.reference?`<small>UPI reference: ${esc(p.reference)}</small>`:''}</div><strong>${money(p.amount||0)}</strong>${p.status==='PENDING_CONFIRMATION'?`<button class="btn primary" onclick="verifyManualPayment('${esc(p.id)}')">Verify</button>`:''}</div>`).join('')||'<p class="muted">No payment records yet.</p>'}</section>`;
}

function adminParts(){
  const parts=db.adminAllParts||db.parts||[];
  return `<section class="panel table-panel"><div class="panel-head"><div><b>Spare-parts catalog</b><small>Admin controls reference prices, stock, barcode and compatibility.</small></div><button class="btn primary" onclick="openPartEditor()">＋ Add part</button></div><div class="parts-admin-list">${parts.map(p=>`<div class="parts-admin-row"><img src="${esc(p.image)}" alt=""><div class="grow"><b>${esc(p.name)}</b><small>${esc(p.category)} · ${esc(p.barcode)} · ${money(p.price)} / ${esc(p.unit)}</small></div><span class="badge ${Number(p.stock)>0?'green':''}">${Number(p.stock)} stock</span><button class="btn secondary" onclick="editPart('${esc(p.id)}')">Edit</button></div>`).join('')||'<p class="muted">No parts in catalog.</p>'}</div></section>`;
}

function adminOffers(){
  return `<section class="panel">
    <div class="panel-head">
      <div>
        <b>Offers & coupons</b>
        <small>Create promotional codes.</small>
      </div>

      <button class="btn primary" onclick="createCoupon()">＋ Create coupon</button>
    </div>

    <div class="coupon-grid">
      <div class="coupon">
        <b>WELCOME10</b>
        <span>10% off first service</span>
        <em>Active</em>
      </div>

      <div class="coupon">
        <b>QUICK50</b>
        <span>₹50 off Quick Fix</span>
        <em>Active</em>
      </div>
    </div>
  </section>`;
}

function mobileBottom(role){
  if(role==='technician') return `<div class="mobile-bottom"><button onclick="setRoute('technician')">⌂<small>Dashboard</small></button><button onclick="setRoute('bookings')">📥<small>Jobs</small></button><button class="mobile-book" onclick="startTechnicianLocationSharing(techForUser()?.id)">📍</button><button onclick="openNotifications()">🔔<small>Alerts</small></button><button onclick="openMoreMenu()">☰<small>More</small></button></div>`;
  if(role==='admin') return `<div class="mobile-bottom"><button onclick="setRoute('admin')">⌂<small>Dashboard</small></button><button onclick="adminTab(null,'users')">👥<small>Users</small></button><button class="mobile-book" onclick="adminTab(null,'bookings')">▣</button><button onclick="setRoute('parts')">🧰<small>Parts</small></button><button onclick="openMoreMenu()">☰<small>More</small></button></div>`;
  return `<div class="mobile-bottom"><button onclick="setRoute('customer')">⌂<small>Home</small></button><button onclick="setRoute('find')">⌕<small>Find</small></button><button class="mobile-book" onclick="startBooking('Plumbing')">＋</button><button onclick="setRoute('bookings')">▣<small>Bookings</small></button><button onclick="openMoreMenu()">☰<small>More</small></button></div>`;
}


function partCard(p,role){
  return `<article class="part-card"><div class="part-image-wrap"><img src="${esc(p.image||'assets/parts/led-bulb.svg')}" alt="${esc(p.name)}" class="part-image"><span class="part-stock ${Number(p.stock)>0?'in-stock':''}">${Number(p.stock)>0?`${p.stock} in stock`:'Out of stock'}</span></div><div class="part-body"><span class="eyebrow">${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.description||'Verified catalog part with transparent reference pricing.')}</p><div class="part-meta"><b>${money(p.price)}</b><small>per ${esc(p.unit||'piece')}</small></div><div class="part-actions"><button class="btn secondary" onclick="openPartDetail('${esc(p.barcode)}')">View details</button>${role==='technician'?`<button class="btn primary" onclick="usePartInQuote('${esc(p.barcode)}')">Add to quote</button>`:''}${role==='admin'?`<button class="btn secondary" onclick="editPart('${esc(p.id)}')">Edit</button>`:''}</div></div></article>`;
}
function partsPage(){
  const role=currentUser()?.role;
  const q=state.partQuery||''; const cat=state.partCategory||'All';
  const list=(db.parts||PARTS_FALLBACK).filter(p=>(!q||`${p.name} ${p.barcode} ${p.brand}`.toLowerCase().includes(q.toLowerCase()))&&(cat==='All'||p.category===cat));
  const cats=['All',...new Set((db.parts||[]).map(p=>p.category))];
  return `${nav()}<main class="section"><div class="container"><div class="page-title"><div><span class="eyebrow">NEARFIX PARTS CATALOG</span><h1>Transparent spare-parts pricing.</h1><p>Customer, technician and admin can verify the same catalog reference price before approving a job.</p></div><div class="page-actions">${role!=='admin'?`<button class="btn primary" onclick="setRoute('scanner')">▣ Scan barcode</button>`:''}${role==='admin'?`<button class="btn secondary" onclick="openPartEditor()">＋ Add part</button>`:''}</div></div><div class="parts-toolbar"><input class="parts-search" placeholder="Search part name, brand or barcode" value="${esc(q)}" oninput="state.partQuery=this.value;render()"><select onchange="state.partCategory=this.value;render()">${cats.map(c=>`<option ${cat===c?'selected':''}>${esc(c)}</option>`).join('')}</select></div><div class="parts-trust"><span>✓ Shared reference price</span><span>▣ Barcode lookup</span><span>🧾 Quote itemization</span><span>🛡️ Admin controlled catalog</span></div><div class="parts-grid">${list.map(p=>partCard(p,role)).join('')||emptyState('No parts found','Try another search or scan a barcode.')}</div></div></main>${mobileBottom(role)}`;
}
function scannerPage(){
  const role=currentUser()?.role;
  return `${nav()}<main class="section"><div class="container"><div class="page-title"><div><span class="eyebrow">BARCODE PRICE CHECK</span><h1>Scan any supported spare part.</h1><p>Use your camera or enter the barcode manually. The same catalog result is visible to customer, technician and admin.</p></div><button class="btn secondary" onclick="setRoute('parts')">← Parts catalog</button></div><div class="scanner-layout"><section class="panel scanner-panel"><div class="scanner-frame"><video id="barcode-video" autoplay muted playsinline></video><div class="scanner-corners"></div><div id="scanner-status" class="scanner-status">Camera is off.</div></div><div class="scanner-actions"><button class="btn primary" onclick="startBarcodeScanner()">📷 Start camera</button><button class="btn ghost" onclick="stopBarcodeScanner()">Stop camera</button></div><div class="manual-scan"><label>Manual barcode</label><div class="manual-row"><input id="manual-barcode" placeholder="e.g. 8901001000011"><button class="btn secondary" onclick="lookupBarcode(document.getElementById('manual-barcode').value)">Check price</button></div></div></section><section class="panel" id="scan-result"><div class="empty-inline"><span>▣</span><p>Scan a part to see its catalog price, stock and service compatibility.</p></div></section></div></div></main>${mobileBottom(role)}`;
}
async function lookupBarcode(code){
  const value=String(code||'').trim(); if(!value){toast('Enter a barcode.');return;}
  try{const r=await nfFetch(`/api/parts/${encodeURIComponent(value)}`); renderScannedPart(r.part); toast('Barcode matched to NearFix catalog.');}catch(e){renderScanError(e.message);}
}
function renderScannedPart(p){
  const role=currentUser()?.role; const el=document.getElementById('scan-result'); if(!el)return;
  el.innerHTML=`<div class="scan-result-card"><div class="scan-product"><img src="${esc(p.image||'assets/parts/led-bulb.svg')}" alt="${esc(p.name)}"><div><span class="badge green">BARCODE VERIFIED</span><h2>${esc(p.name)}</h2><p>${esc(p.brand)} · ${esc(p.category)}</p><div class="barcode-number">${esc(p.barcode)}</div></div></div><div class="scan-price"><span>Reference price</span><strong>${money(p.price)}</strong><small>per ${esc(p.unit||'piece')} · stock ${Number(p.stock)}</small></div><div class="scan-details"><div><small>Compatible with</small><b>${esc((p.compatible||[]).join(', ')||p.category)}</b></div><div><small>Price policy</small><b>Catalog reference · technician must itemize parts</b></div></div><p class="muted">${esc(p.description||'')}</p><div class="modal-footer">${role==='technician'?`<button class="btn primary" onclick="usePartInQuote('${esc(p.barcode)}')">Add to current quote</button>`:''}<button class="btn secondary" onclick="openPartDetail('${esc(p.barcode)}')">Open full details</button></div></div>`;
}
function renderScanError(msg){const el=document.getElementById('scan-result');if(el)el.innerHTML=`<div class="error-state"><b>Part not found</b><p>${esc(msg||'No matching barcode in the catalog.')}</p><button class="btn secondary" onclick="setRoute('parts')">Browse catalog</button></div>`;}
async function openPartDetail(barcode){
  try{const r=await nfFetch(`/api/parts/${encodeURIComponent(barcode)}`),p=r.part; modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide"><div class="modal-head"><div><span class="eyebrow">PART DETAILS</span><h2>${esc(p.name)}</h2><p class="muted">Barcode ${esc(p.barcode)}</p></div><button class="close" onclick="closeModal()">×</button></div><div class="scan-product"><img src="${esc(p.image)}" alt="${esc(p.name)}"><div><span class="badge green">REFERENCE CATALOG</span><p>${esc(p.description||'')}</p><div class="detail-grid"><div class="panel-lite"><small>Price</small><b>${money(p.price)} / ${esc(p.unit)}</b></div><div class="panel-lite"><small>Stock</small><b>${Number(p.stock)} units</b></div><div class="panel-lite"><small>Category</small><b>${esc(p.category)}</b></div><div class="panel-lite"><small>Compatible</small><b>${esc((p.compatible||[]).join(', ')||'General')}</b></div></div></div></div></div></div>`;}catch(e){toast(e.message);}
}
let barcodeStream=null,barcodeTimer=null;
async function startBarcodeScanner(){
  const video=document.getElementById('barcode-video'); const status=document.getElementById('scanner-status'); if(!video)return;
  if(!navigator.mediaDevices?.getUserMedia){if(status)status.textContent='Camera unavailable. Use manual barcode entry.';return;}
  try{barcodeStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}); video.srcObject=barcodeStream; if(status)status.textContent='Camera active — point at the barcode.'; if('BarcodeDetector' in window){const detector=new BarcodeDetector({formats:['ean_13','ean_8','code_128','upc_a','upc_e','qr_code']}); barcodeTimer=setInterval(async()=>{try{const codes=await detector.detect(video);if(codes?.[0]?.rawValue){await lookupBarcode(codes[0].rawValue);stopBarcodeScanner();}}catch(e){}},350);}else if(status)status.textContent='Camera active. Automatic barcode detection is not supported in this browser; enter the code manually.';}catch(e){if(status)status.textContent='Camera permission denied/unavailable. Use manual barcode entry.';toast('Camera permission is required for live scanning.');}
}
function stopBarcodeScanner(){if(barcodeTimer){clearInterval(barcodeTimer);barcodeTimer=null;}if(barcodeStream){barcodeStream.getTracks().forEach(t=>t.stop());barcodeStream=null;}const video=document.getElementById('barcode-video');if(video)video.srcObject=null;const status=document.getElementById('scanner-status');if(status)status.textContent='Camera is off.';}
function usePartInQuote(barcode){
  const b=db.bookings.find(x=>String(x.id)===String(state.activeQuoteBookingId)); if(!b){toast('Open a technician inspection quote first.');setRoute('bookings');return;}
  const p=(db.parts||[]).find(x=>x.barcode===String(barcode)); if(!p){toast('Part not found.');return;}
  state.quoteParts=state.quoteParts||[]; const existing=state.quoteParts.find(x=>x.barcode===p.barcode); if(existing)existing.qty+=1;else state.quoteParts.push({barcode:p.barcode,name:p.name,price:p.price,qty:1}); toast(`${p.name} added to quote at ${money(p.price)}.`); closeModal(); openQuote(b.id);
}
function openPartEditor(part){
  const p=part||{name:'',barcode:'',category:'Electrical',brand:'NearFix Supply',price:0,unit:'piece',stock:0,image:'assets/parts/led-bulb.svg',description:''};
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide"><div class="modal-head"><div><span class="eyebrow">ADMIN · PART CATALOG</span><h2>${part?'Edit':'Add'} spare part</h2></div><button class="close" onclick="closeModal()">×</button></div><div class="form-grid"><div class="form-field"><label>Name</label><input id="part-name" value="${esc(p.name)}"></div><div class="form-field"><label>Barcode</label><input id="part-barcode" value="${esc(p.barcode)}"></div><div class="form-field"><label>Category</label><select id="part-category">${SERVICES.map(s=>`<option ${p.category===s[1]?'selected':''}>${esc(s[1])}</option>`).join('')}</select></div><div class="form-field"><label>Brand</label><input id="part-brand" value="${esc(p.brand)}"></div><div class="form-field"><label>Reference price</label><input id="part-price" type="number" min="0" value="${Number(p.price)}"></div><div class="form-field"><label>Stock</label><input id="part-stock" type="number" min="0" value="${Number(p.stock)}"></div><div class="form-field full"><label>Description</label><textarea id="part-description">${esc(p.description||'')}</textarea></div></div><div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="savePart(${part?`'${esc(part.id)}'`:'null'})">Save catalog item</button></div></div></div>`;
}
async function savePart(id){
  const payload={name:document.getElementById('part-name').value.trim(),barcode:document.getElementById('part-barcode').value.trim(),category:document.getElementById('part-category').value,brand:document.getElementById('part-brand').value.trim(),price:Number(document.getElementById('part-price').value),stock:Number(document.getElementById('part-stock').value),description:document.getElementById('part-description').value.trim()}; if(!payload.name||!payload.barcode||!Number.isFinite(payload.price)){toast('Complete part details.');return;}
  try{const r=await nfFetch(id&&id!=='null'?`/api/admin/parts/${id}`:'/api/admin/parts',{method:id&&id!=='null'?'PATCH':'POST',body:JSON.stringify(payload)});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast(id?'Part updated.':'Part added to catalog.');}catch(e){toast(e.message);}
}
function editPart(id){const p=(db.parts||[]).find(x=>x.id===id);if(p)openPartEditor(p);}

function bookingsPage(){
  const u=currentUser();

  const list=db.bookings
    .filter(b=>b.customerId===u?.id||b.techId===techForUser()?.id)
    .sort((a,b)=>b.created-a.created);

  return `${nav()}
  <main class="section">
    <div class="container">

      <div class="page-title">
        <div>
          <span class="eyebrow">BOOKINGS</span>
          <h1>Your service history</h1>
          <p>Track active jobs, completed services and quotations.</p>
        </div>

        <button class="btn primary" onclick="startBooking('Plumbing')">
          ＋ New booking
        </button>
      </div>

      <div class="panel">
        ${list.map(b=>bookingRow(b,true)).join('')||
          `<div class="empty-inline">
            <span>📅</span>
            <p>No bookings yet.</p>
            <button class="btn primary" onclick="startBooking('Plumbing')">
              Book a service
            </button>
          </div>`
        }
      </div>

    </div>
  </main>`;
}

function techForUser(){
  const u=currentUser();
  return u?.role==='technician' ? db.techs.find(t=>t.userId===u.id) : null;
}

function favouritesPage(){
  return `${nav()}
  <main class="section">
    <div class="container">

      <div class="page-title">
        <div>
          <span class="eyebrow">FAVOURITES</span>
          <h1>Technicians you trust.</h1>
        </div>
      </div>

      <div class="tech-grid">
        ${db.favourites
          .map(id=>tech(id))
          .filter(Boolean)
          .map(techCard)
          .join('')||
          emptyState('No favourites yet','Save a technician from their profile or card.')
        }
      </div>

    </div>
  </main>
  ${footer()}`;
}

function startBooking(service='Plumbing',techId=null){
  if(!currentUser()){
    openLoginPrompt();
    return;
  }

  state.service=service;
  state.selectedTech=techId;
  state.bookingDraft=null;

  bookingStep(1);
}

function bookingStep(step){
  const t=state.selectedTech?tech(state.selectedTech):null;
  const d=state.bookingDraft||{};

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box wide">

      <div class="modal-head">
        <div>
          <span class="eyebrow">BOOK A SERVICE</span>

          <h2>
            ${step===1
              ? 'Tell us what needs fixing'
              : step===2
              ? 'Choose date & location'
              : step===3
              ? 'Review & confirm'
              : 'Booking created'
            }
          </h2>

          <p class="muted">
            Step ${step} of 3 · NearFix will match the best available professional.
          </p>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="stepper">
        <span class="done">1</span>
        <i></i>
        <span class="${step>=2?'done':''}">2</span>
        <i></i>
        <span class="${step>=3?'done':''}">3</span>
      </div>

      ${step===1
        ? bookingForm1(d)
        : step===2
        ? bookingForm2(d)
        : bookingReview(d,t)
      }

    </div>
  </div>`;
}

function bookingForm1(d){
  return `<div class="form-grid">

    <div class="form-field full">
      <label>Service</label>

      <select id="book-service" onchange="state.service=this.value">
        ${SERVICES.map(s=>`
          <option ${s[1]===state.service?'selected':''}>${s[1]}</option>
        `).join('')}
      </select>
    </div>

    <div class="form-field full">
      <label>Describe your problem *</label>

      <textarea
        id="book-problem"
        placeholder="e.g. Water leakage in bathroom, need pipe repair and faucet fixing."
      >${esc(d.problem||'')}</textarea>
    </div>

    <div class="form-field full">
      <label>Upload photo / video <small>(optional)</small></label>

      <input
        id="book-file"
        type="file"
        accept="image/*,video/*"
        onchange="previewUpload(this)"
      >

      <div id="upload-preview" class="upload-preview">
        📷 Add a photo to help the technician understand the issue.
      </div>
    </div>

  </div>

  <div class="modal-footer">
    <button class="btn ghost" onclick="closeModal()">Cancel</button>
    <button class="btn primary" onclick="nextBooking1()">Continue →</button>
  </div>`;
}

function previewUpload(input){
  const p=document.getElementById('upload-preview');

  if(input.files?.[0]){
    const f=input.files[0];

    p.textContent=
      `✓ ${f.name} selected (${Math.round(f.size/1024)} KB)`;

    p.classList.add('selected');
  }
}

function nextBooking1(){
  const p=document.getElementById('book-problem').value.trim();

  if(!p){
    toast('Please describe the problem.');
    return;
  }

  state.bookingDraft={
    ...(state.bookingDraft||{}),
    problem:p,
    service:state.service,
    file:document.getElementById('book-file')?.files?.[0]?.name||''
  };

  bookingStep(2);
}

function bookingForm2(d){
  const tomorrow=
    new Date(Date.now()+86400000)
      .toISOString()
      .slice(0,10);

  return `<div class="form-grid">

    <div class="form-field full">
      <label>Service address</label>
      <input
        id="book-location"
        value="${esc(d.location||db.settings.location)}"
      >
    </div>

    <div class="form-field">
      <label>Date</label>

      <input
        id="book-date"
        type="date"
        min="${new Date().toISOString().slice(0,10)}"
        value="${d.date||tomorrow}"
      >
    </div>

    <div class="form-field">
      <label>Preferred time</label>

      <select id="book-time">
        <option ${d.time==='10:00 AM – 11:00 AM'?'selected':''}>10:00 AM – 11:00 AM</option>
        <option>1:00 PM – 2:00 PM</option>
        <option>5:00 PM – 6:00 PM</option>
        <option>7:00 PM – 8:00 PM</option>
      </select>
    </div>

    <div class="form-field">
      <label>Budget</label>

      <select id="book-budget">
        <option value="500">₹200 – ₹500</option>
        <option value="1000">₹500 – ₹1,000</option>
        <option value="2000">₹1,000+</option>
      </select>
    </div>

  </div>

  <div class="location-note">
    <span>📍</span>
    <div>
      <b>Nearby matching</b>
      <small>
        NearFix will search verified technicians within
        ${db.settings.radius} km of this address.
      </small>
    </div>
  </div>

  <div class="modal-footer">
    <button class="btn ghost" onclick="bookingStep(1)">← Back</button>
    <button class="btn primary" onclick="nextBooking2()">Find best technician →</button>
  </div>`;
}

function nextBooking2(){
  const d={
    ...state.bookingDraft,
    location:document.getElementById('book-location').value.trim(),
    date:document.getElementById('book-date').value,
    time:document.getElementById('book-time').value,
    budget:Number(document.getElementById('book-budget').value)
  };

  if(!d.location||!d.date){
    toast('Please enter the address and date.');
    return;
  }

  state.bookingDraft=d;

  modal().innerHTML=`<div class="modal">
    <div class="modal-box matching">
      <div class="radar big">
        <span></span>
        <span></span>
        <span>🧑‍🔧</span>
      </div>

      <span class="eyebrow">SMART MATCH</span>

      <h2>Finding the best technician near you…</h2>

      <p>
        Comparing distance, rating, price, experience and availability.
      </p>

      <div class="matching-list">
        <span>✓ Checking ${db.settings.radius} km radius</span>
        <span>✓ Filtering verified professionals</span>
        <span>✓ Calculating best match</span>
      </div>
    </div>
  </div>`;

  setTimeout(()=>bookingStep(3),850);
}

function bookingReview(d,t){
  const match=t||bestMatch(d.service);

  state.selectedTech=match?.id||null;

  return `<div class="review-layout">

    <div class="review-summary">
      <span class="summary-icon">
        ${SERVICES.find(s=>s[1]===d.service)?.[0]||'🛠️'}
      </span>

      <div>
        <b>${esc(d.service)}</b>
        <p>${esc(d.problem)}</p>
      </div>
    </div>

    <div class="review-grid">
      <div>
        <small>Address</small>
        <b>${esc(d.location)}</b>
      </div>

      <div>
        <small>Date & time</small>
        <b>${esc(d.date)} · ${esc(d.time)}</b>
      </div>

      <div>
        <small>Estimated cost</small>
        <b>${money(match?.price||299)}+</b>
      </div>

      <div>
        <small>Radius</small>
        <b>${db.settings.radius} km</b>
      </div>
    </div>

    <div class="best-match">
      <div class="match-title">
        <span>RECOMMENDED</span>
        <span class="badge green">Best value</span>
      </div>

      ${techMini(match)}

      <div class="skills">
        ${match.skills.map(s=>`<span>${esc(s)}</span>`).join('')}
      </div>
    </div>

    <div class="quote-note">
      Final price may change only after the technician explains any additional work and you approve the quotation.
    </div>

  </div>

  <div class="modal-footer">
    <button class="btn ghost" onclick="bookingStep(2)">← Back</button>
    <button class="btn primary" onclick="createBooking()">Confirm booking →</button>
  </div>`;
}

function bestMatch(service){
  const category=
    SERVICES.find(s=>s[1]===service)?.[1]||service;

  let list=db.techs.filter(t=>
    (t.category===category||
     t.service===SERVICES.find(s=>s[1]===service)?.[2])&&
    t.distance<=db.settings.radius
  );

  if(!list.length)
    list=db.techs.filter(
      t=>t.distance<=db.settings.radius&&t.available
    );

  if(!list.length)
    list=db.techs.slice();

  list.sort((a,b)=>
    (
      (b.rating*3)+
      (b.available?2:0)+
      (b.verified?2:0)-
      b.distance*.5
    )-
    (
      (a.rating*3)+
      (a.available?2:0)+
      (a.verified?2:0)-
      a.distance*.5
    )
  );

  return list[0];
}

function createBooking(){
  const u=currentUser();
  const d=state.bookingDraft;
  const t=tech(state.selectedTech)||bestMatch(d.service);
  const id=Date.now();

  const b={
    id,
    customerId:u.id,
    techId:t.id,
    service:d.service,
    problem:d.problem,
    file:d.file||'',
    location:d.location,
    date:d.date,
    time:d.time,
    status:'Requested',
    estimate:t.price,
    created:id,
    urgent:state.quick
  };

  db.bookings.push(b);

  db.notifications.unshift({
    id:Date.now()+1,
    text:`Booking request sent to ${t.name}.`,
    read:false,
    time:'Just now'
  });

  saveDB();
  closeModal();
  setRoute('bookings');

  toast('Booking request created. Technician has been notified.');

  state.quick=false;
}

function bookingDetails(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  if(!b)return;

  const t=tech(b.techId);
  const isTech=currentUser()?.role==='technician';

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box wide">

      <div class="modal-head">
        <div>
          <span class="eyebrow">BOOKING #${String(b.id).slice(-6)}</span>
          <h2>${esc(b.service)}</h2>
          <p class="muted">${esc(b.date)} · ${esc(b.time)}</p>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="status-banner">
        <span class="status ${b.status.toLowerCase().replaceAll(' ','-')}">
          ${esc(b.status)}
        </span>

        <b>
          ${money(b.total||b.estimate)}
          ${b.total?' paid':''}
        </b>
      </div>

      <div class="detail-grid">
        <div class="panel-lite">
          <small>Problem</small>
          <p>${esc(b.problem)}</p>
        </div>

        <div class="panel-lite">
          <small>Location</small>
          <p>📍 ${esc(b.location)}</p>
        </div>
      </div>

      <div class="timeline">
        ${timeline(b)}
      </div>

      ${isTech ? `<div class="booking-tech"><div class="tech-mini"><div class="avatar">${initials(b.customer?.name||'Customer')}</div><div class="grow"><b>${esc(b.customer?.name||'Customer')}</b><span>${esc(b.customer?.phone||'Phone not shared')}</span><span>${esc(b.customer?.email||'')}</span></div></div><button class="btn secondary" onclick="window.location.href='tel:${esc((b.customer?.phone||'').replace(/\s/g,''))}'">Call customer</button></div>` : `<div class="booking-tech">${techMini(t)}<button class="btn secondary" onclick="techDetails(${t.id})">View profile</button></div>`}

      <div class="modal-footer">

        ${b.status==='Requested'&&isTech
          ? `<button class="btn ghost" onclick="rejectBooking(${b.id});closeModal()">Reject</button>
             <button class="btn primary" onclick="acceptBooking(${b.id});closeModal()">Accept</button>`
          : ''
        }

        ${b.status==='Accepted'&&!isTech
          ? `<button class="btn primary" onclick="advanceBooking(${b.id},'On the way');closeModal()">
              Track technician
            </button>`
          : ''
        }

        ${b.status==='On the way'&&!isTech
          ? `<button class="btn secondary" onclick="tracking(${b.id})">
              Live tracking
            </button>`
          : ''
        }

        ${b.status==='Completed'&&!db.reviews.some(r=>r.bookingId===b.id)&&!isTech
          ? `<button class="btn primary" onclick="reviewBooking(${b.id})">
              ⭐ Rate service
            </button>`
          : ''
        }

        ${['Accepted','On the way','Arrived','Service started'].includes(b.status)&&isTech
          ? `<button
              class="btn primary"
              onclick="${b.status==='Arrived'?`verifyArrivalOtp(${b.id})`: `advanceBooking(${b.id},'${b.status==='Accepted'?'On the way':b.status==='On the way'?'Arrived':'Completed'}');closeModal()` }"
            >
              ${b.status==='Arrived'?'🔐 Verify arrival OTP':b.status==='Service started'?'Complete service':'Update status'}
            </button>`
          : ''
        }

        ${b.status==='Service started'&&!isTech
          ? `<button class="btn primary" onclick="paymentModal(${b.id})">
              Pay now
            </button>`
          : ''
        }

        <button class="btn ghost" onclick="openChat(${b.id})">💬 Chat</button>
      </div>

    </div>
  </div>`;
}

function timeline(b){
  const steps=[
    'Requested',
    'Accepted',
    'On the way',
    'Arrived',
    'Service started',
    'Completed'
  ];

  const idx=steps.indexOf(b.status);

  return `<div class="timeline-horizontal">
    ${steps.map((s,i)=>`
      <div class="tl ${i<=idx?'done':''}">
        <span>${i<idx?'✓':i===idx?'●':'○'}</span>
        <b>${s}</b>
      </div>
    `).join('')}
  </div>`;
}

function acceptBooking(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  if(!b)return;

  b.status='Accepted';

  db.notifications.unshift({
    id:Date.now(),
    text:`${tech(b.techId)?.name||'Technician'} accepted your ${b.service} request.`,
    read:false,
    time:'Just now'
  });

  saveDB();
  render();

  toast('Request accepted. Customer notified.');
}

function rejectBooking(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  if(!b)return;

  b.status='Cancelled';

  db.notifications.unshift({
    id:Date.now(),
    text:`Your ${b.service} booking was declined. You can find another technician.`,
    read:false,
    time:'Just now'
  });

  saveDB();
  render();

  toast('Request rejected.');
}

function advanceBooking(id,status){
  const b=db.bookings.find(x=>x.id===Number(id));
  if(!b)return;

  b.status=status;

  if(status==='Completed'){
    b.total=b.total||b.estimate;

    db.payments.push({
      id:Date.now(),
      bookingId:b.id,
      techId:b.techId,
      customerId:b.customerId,
      amount:b.total,
      status:'Pending',
      method:null
    });
  }

  db.notifications.unshift({
    id:Date.now(),
    text:`Booking update: ${b.service} is now ${status}.`,
    read:false,
    time:'Just now'
  });

  saveDB();
  render();

  toast(`Booking updated: ${status}`);
}

function tracking(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  const t=tech(b?.techId||1);

  if(!b||!t){
    toast('Tracking information is unavailable.');
    return;
  }

  const customer={
    lat:Number(b.latitude??db.settings.userLat),
    lng:Number(b.longitude??db.settings.userLng)
  };

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box wide">
      <div class="modal-head">
        <div>
          <span class="eyebrow">LIVE OPEN MAP TRACKING</span>
          <h2>${esc(t.name)} is on the way</h2>
          <p class="muted" id="live-route-summary">Getting real road distance and ETA…</p>
        </div>
        <button class="close" onclick="stopTrackingPoll();closeModal()">×</button>
      </div>

      <div id="nearfix-live-map" class="nearfix-live-map">
        <div class="map-loading">Loading OpenStreetMap…</div>
      </div>

      <div class="tracking-live-grid">
        <div class="panel-lite"><small>Technician</small><b>${esc(t.name)}</b></div>
        <div class="panel-lite"><small>Location source</small><b id="tech-location-source">${esc(t.locationSource||'Unknown')}</b></div>
        <div class="panel-lite"><small>Last update</small><b id="tech-location-updated">${esc(t.locationUpdatedAt||'Waiting for GPS')}</b></div>
        <div class="panel-lite"><small>Status</small><b>${esc(b.status)}</b></div>
      </div>

      <div class="tracking-side-actions">
        <button class="btn primary" onclick="callTechnician('${esc(t.phone||'')}')">📞 Call</button>
        <button class="btn secondary" onclick="whatsappTechnician(${id})">💬 WhatsApp</button>
        <button class="btn secondary" onclick="openDirectionsToTechnician(${t.id})">🧭 Directions</button>
      </div>
    </div>
  </div>`;

  startOpenMapLiveTracking(id);
}

function stopTrackingPoll(){
  if(trackingPollId){
    clearInterval(trackingPollId);
    trackingPollId=null;
  }
}

async function ensureLeaflet(){
  if(window.L) return window.L;
  if(window.nearfixLeafletPromise) return window.nearfixLeafletPromise;

  window.nearfixLeafletPromise=new Promise((resolve,reject)=>{
    if(!document.getElementById('leaflet-css')){
      const link=document.createElement('link');
      link.id='leaflet-css';
      link.rel='stylesheet';
      link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script=document.createElement('script');
    script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async=true;
    script.onload=()=>resolve(window.L);
    script.onerror=()=>reject(new Error('OpenStreetMap map library failed to load. Check your internet connection.'));
    document.head.appendChild(script);
  });

  try{return await window.nearfixLeafletPromise;}
  catch(e){window.nearfixLeafletPromise=null;throw e;}
}

async function osrmRoute(from,to){
  const coords=`${Number(from.lng)},${Number(from.lat)};${Number(to.lng)},${Number(to.lat)}`;
  const url=`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`;
  const response=await fetch(url,{headers:{'Accept':'application/json'}});
  if(!response.ok) throw new Error(`Routing service returned ${response.status}`);
  const data=await response.json();
  const route=data.routes?.[0];
  if(!route) throw new Error('No road route found.');
  return route;
}

async function startOpenMapLiveTracking(bookingId){
  stopTrackingPoll();

  let map=null;
  let techMarker=null;
  let customerMarker=null;
  let routeLayer=null;
  let L=null;

  const draw=async()=>{
    const b=db.bookings.find(x=>String(x.id)===String(bookingId));
    if(!b)return;

    let t=tech(b.techId);
    if(!t)return;

    try{
      const r=await nfFetch(`/api/technicians/${encodeURIComponent(t.id)}`);
      if(r.technician){
        t={...t,...r.technician};
        const idx=db.techs.findIndex(x=>x.id===t.id);
        if(idx>=0)db.techs[idx]={...db.techs[idx],...t};
      }
    }catch(e){}

    const target=document.getElementById('nearfix-live-map');
    if(!target)return;

    if(!Number.isFinite(Number(t.lat))||!Number.isFinite(Number(t.lng))){
      target.innerHTML='<div class="map-loading">Waiting for technician GPS. Ask the technician to tap “Share GPS” on the technician dashboard.</div>';
      return;
    }

    const customerLat=Number(b.latitude??db.settings.userLat);
    const customerLng=Number(b.longitude??db.settings.userLng);

    if(!Number.isFinite(customerLat)||!Number.isFinite(customerLng)){
      target.innerHTML='<div class="map-loading">Customer location is not available. Tap “Use current location” first.</div>';
      return;
    }

    L=await ensureLeaflet();

    if(!map){
      target.innerHTML='';
      map=L.map(target,{zoomControl:true,scrollWheelZoom:true}).setView([customerLat,customerLng],14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:19,
        attribution:'&copy; OpenStreetMap contributors'
      }).addTo(map);

      techMarker=L.marker([Number(t.lat),Number(t.lng)]).addTo(map).bindPopup(`<b>${esc(t.name)}</b><br>Technician`);
      customerMarker=L.marker([customerLat,customerLng]).addTo(map).bindPopup('<b>Customer</b>');
    }else{
      techMarker.setLatLng([Number(t.lat),Number(t.lng)]);
      customerMarker.setLatLng([customerLat,customerLng]);
    }

    const bounds=L.latLngBounds([
      [Number(t.lat),Number(t.lng)],
      [customerLat,customerLng]
    ]);
    map.fitBounds(bounds,{padding:[35,35],maxZoom:15});

    try{
      const route=await osrmRoute(
        {lat:Number(t.lat),lng:Number(t.lng)},
        {lat:customerLat,lng:customerLng}
      );

      if(routeLayer)map.removeLayer(routeLayer);
      routeLayer=L.geoJSON(route.geometry,{style:{weight:5,opacity:.85}}).addTo(map);

      const km=(Number(route.distance||0)/1000).toFixed(1);
      const minutes=Math.max(1,Math.round(Number(route.duration||0)/60));
      const summary=document.getElementById('live-route-summary');
      if(summary)summary.textContent=`${km} km by road · ETA ${minutes} min`;
    }catch(e){
      const km=haversineKm({lat:Number(t.lat),lng:Number(t.lng)},{lat:customerLat,lng:customerLng}).toFixed(1);
      const summary=document.getElementById('live-route-summary');
      if(summary)summary.textContent=`${km} km straight-line distance · Road ETA temporarily unavailable`;
    }

    const source=document.getElementById('tech-location-source');
    const updated=document.getElementById('tech-location-updated');
    if(source)source.textContent=t.locationSource==='technician-gps'?'Live technician GPS':'Demo/last known location';
    if(updated)updated.textContent=t.locationUpdatedAt?new Date(t.locationUpdatedAt).toLocaleString():'Waiting for GPS';
  };

  try{
    await draw();
    trackingPollId=setInterval(draw,15000);
  }catch(e){
    const target=document.getElementById('nearfix-live-map');
    if(target)target.innerHTML=`<div class="map-loading">${esc(e.message)}</div>`;
  }
}

function callTechnician(phone){
  if(!phone){
    toast('Technician phone number is unavailable.');
    return;
  }
  window.location.href=`tel:${phone}`;
}

function whatsappTechnician(bookingId){
  const b=db.bookings.find(x=>String(x.id)===String(bookingId));
  const t=tech(b?.techId);
  if(!b||!t){toast('Booking or technician not found.');return;}
  const phone=String(t.phone||'').replace(/\D/g,'');
  if(!phone){toast('Technician WhatsApp number is unavailable.');return;}

  const message=`Hi ${t.name}, I booked you through NearFix. Booking #${String(b.id).slice(-6)}. Service: ${b.service}. Location: ${b.location||db.settings.location}.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
}

function paymentModal(id){
  const b=db.bookings.find(x=>x.id===Number(id));

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box">

      <div class="modal-head">
        <div>
          <span class="eyebrow">SECURE PAYMENT</span>
          <h2>Complete payment</h2>
          <p class="muted">Booking #${String(id).slice(-6)}</p>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="pay-total">
        <span>Total</span>
        <b>${money(b.total||b.estimate)}</b>
      </div>

      <div class="pay-options">
        <button class="pay-option active" onclick="selectPay(this,'UPI')">
          📱<b>UPI</b><small>Instant</small>
        </button>

        <button class="pay-option" onclick="selectPay(this,'Card')">
          💳<b>Card</b><small>Debit / credit</small>
        </button>

        <button class="pay-option" onclick="selectPay(this,'Cash')">
          💵<b>Cash</b><small>Pay technician</small>
        </button>
      </div>

      <div id="pay-fields" class="form-field">
        <label>UPI ID</label>
        <input id="pay-value" placeholder="name@upi">
      </div>

      <div class="modal-footer">
        <button class="btn ghost" onclick="closeModal()">Cancel</button>
        <button class="btn primary" onclick="completePayment(${id})">
          Pay ${money(b.total||b.estimate)}
        </button>
      </div>

    </div>
  </div>`;

  window.__payMethod='UPI';
}

function selectPay(btn,method){
  document.querySelectorAll('.pay-option')
    .forEach(x=>x.classList.remove('active'));

  btn.classList.add('active');

  window.__payMethod=method;

  const f=document.getElementById('pay-fields');

  f.innerHTML=
    method==='UPI'
      ? '<label>UPI ID</label><input id="pay-value" placeholder="name@upi">'
      : method==='Card'
      ? '<label>Card number</label><input id="pay-value" placeholder="4242 4242 4242 4242">'
      : `<div class="location-note">
          <span>💵</span>
          <div>
            <b>Cash after service</b>
            <small>Mark the payment complete after paying the technician.</small>
          </div>
        </div>`;
}

function completePayment(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  const existing=db.payments.find(p=>p.bookingId===b.id);

  if(existing){
    existing.status='Paid';
    existing.method=window.__payMethod;
  }else{
    db.payments.push({
      id:Date.now(),
      bookingId:id,
      techId:b.techId,
      customerId:b.customerId,
      amount:b.total||b.estimate,
      status:'Paid',
      method:window.__payMethod
    });
  }

  b.paymentStatus='Paid';

  saveDB();
  closeModal();
  reviewBooking(id);

  toast('Payment recorded successfully.');
}

function reviewBooking(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  const t=tech(b.techId);

  modal().innerHTML=`<div class="modal">
    <div class="modal-box review-modal">

      <div class="success-icon">✓</div>

      <span class="eyebrow">SERVICE COMPLETED</span>

      <h2>How was ${esc(t.name)}?</h2>

      <p class="muted">
        Your review helps other customers choose trusted professionals.
      </p>

      <div class="stars" id="stars">
        ${[1,2,3,4,5]
          .map(n=>`<button onclick="setRating(${n})">★</button>`)
          .join('')}
      </div>

      <textarea
        id="review-text"
        placeholder="Tell us about the work quality, behaviour and timing..."
      ></textarea>

      <button class="btn primary full-btn" onclick="submitReview(${id})">
        Submit review
      </button>

    </div>
  </div>`;

  window.__rating=0;
}

function setRating(n){
  window.__rating=n;

  document.querySelectorAll('#stars button')
    .forEach((b,i)=>b.classList.toggle('selected',i<n));
}

function submitReview(id){
  if(!window.__rating){
    toast('Please select a star rating.');
    return;
  }

  const b=db.bookings.find(x=>x.id===Number(id));
  const t=tech(b.techId);

  const text=
    document.getElementById('review-text')
      .value
      .trim();

  db.reviews.push({
    id:Date.now(),
    bookingId:id,
    customerId:currentUser().id,
    techId:t.id,
    rating:window.__rating,
    text,
    created:Date.now()
  });

  const all=db.reviews.filter(r=>r.techId===t.id);

  t.rating=Number(
    (
      all.reduce((s,r)=>s+r.rating,0)/
      all.length
    ).toFixed(1)
  );

  t.reviews=all.length;

  saveDB();
  closeModal();
  render();

  toast('Thank you! Your review was submitted.');
}

function openChat(id){
  const b=db.bookings.find(x=>x.id===Number(id));
  const t=tech(b?.techId||1);

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box chat-modal">

      <div class="modal-head">
        <div>${techMini(t)}</div>
        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div id="chat-body" class="chat-body">
        ${db.messages
          .filter(m=>m.bookingId===id||m.bookingId===null)
          .map(m=>`
            <div class="bubble ${m.from==='customer'?'mine':''}">
              ${esc(m.text)}
              <small>${esc(m.time)}</small>
            </div>
          `).join('')}
      </div>

      <div class="chat-compose">
        <input
          id="chat-input"
          placeholder="Type a message..."
          onkeydown="if(event.key==='Enter')sendChat(${id})"
        >

        <button class="btn primary" onclick="sendChat(${id})">
          Send
        </button>
      </div>

    </div>
  </div>`;
}

function sendChat(id){
  const input=document.getElementById('chat-input');

  if(!input?.value.trim())return;

  db.messages.push({
    id:Date.now(),
    bookingId:Number(id),
    from:currentUser()?.role==='technician'?'tech':'customer',
    text:input.value.trim(),
    time:new Date().toLocaleTimeString([],{
      hour:'2-digit',
      minute:'2-digit'
    })
  });

  saveDB();
  openChat(id);
}

async function openNotifications(){
  db.notifications.forEach(n=>n.read=true);
  saveDB();
  if(nfToken){ try{await nfFetch('/api/notifications/read',{method:'PATCH'});}catch(e){} }

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box">

      <div class="modal-head">
        <div>
          <span class="eyebrow">NOTIFICATIONS</span>
          <h2>Updates</h2>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      ${db.notifications.slice(0,10).map(n=>`
        <div class="notification">
          <span>🔔</span>
          <div>
            <b>${esc(n.text)}</b>
            <small>${esc(n.time)}</small>
          </div>
        </div>
      `).join('')||
      '<p class="muted">No notifications.</p>'}

    </div>
  </div>`;

  render();
}

function unreadCount(){
  return db.notifications.filter(n=>!n.read).length;
}

function techDetails(id){
  const t=tech(id);
  if(!t)return;

  const reviews=db.reviews.filter(r=>r.techId===t.id);

  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal-box wide">

      <div class="modal-head">
        <div>
          <span class="eyebrow">TECHNICIAN PROFILE</span>
          <h2>Trusted professional</h2>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="profile-hero">
        <div class="avatar xlarge">${initials(t.name)}</div>

        <div class="grow">
          <h2>
            ${esc(t.name)}
            ${t.verified?'<span class="verified">✓ Verified</span>':''}
          </h2>

          <p>${esc(t.service)} · ${t.exp}+ years experience</p>

          <div class="rating">
            ★ ${t.rating} <small>(${t.reviews} reviews)</small>
          </div>

          <div class="tech-tags">
            <span>📍 ${t.distance} km away</span>
            <span>⚡ ${t.response||0}% response</span><span>🪪 Skill-first</span>
            <span>${t.available?'🟢 Available':'🔴 Busy'}</span>
          </div>
        </div>

        <button
          class="heart ${db.favourites.includes(t.id)?'saved':''}"
          onclick="toggleFavourite(${t.id})"
        >
          ${db.favourites.includes(t.id)?'♥':'♡'}
        </button>
      </div>

      <div class="profile-stats">
        <div><b>${t.jobs}</b><small>Jobs completed</small></div>
        <div><b>${t.rating}</b><small>Average rating</small></div>
        <div><b>${t.response}%</b><small>Response rate</small></div>
        <div><b>${money(t.price)}</b><small>Starting price</small></div>
      </div>

      <div class="detail-grid">
        <div>
          <h3>About</h3>
          <p class="muted">
            Experienced local professional focused on reliable service,
            clear communication and clean work.
          </p>
        </div>

        <div>
          <h3>Skills</h3>
          <div class="skills">
            ${t.skills.map(s=>`<span>${esc(s)}</span>`).join('')}
          </div>
        </div>
      </div>

      <h3>Recent reviews</h3>

      ${reviews.slice(-3).reverse().map(r=>`
        <div class="review-row">
          <div class="stars-small">
            ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}
          </div>
          <p>${esc(r.text||'Great service.')}</p>
        </div>
      `).join('')||
      '<p class="muted">No customer reviews yet.</p>'}

      <div class="modal-footer">
        <button class="btn secondary" onclick="openChat(null)">💬 Chat</button>

        <button
          class="btn primary"
          onclick="closeModal();startBooking('${esc(t.category)}',${t.id})"
        >
          Book Technician →
        </button>
      </div>

    </div>
  </div>`;
}

function toggleFavourite(id){
  id=Number(id);

  db.favourites=
    db.favourites.includes(id)
      ? db.favourites.filter(x=>x!==id)
      : [...db.favourites,id];

  saveDB();
  render();

  toast(
    db.favourites.includes(id)
      ? 'Added to favourites ♥'
      : 'Removed from favourites'
  );
}

async function toggleAvailability(id){
  const u=currentUser(); const t=tech(id);
  if(!u||u.role!=='technician'||!t||t.userId!==u.id){toast('Only your own technician profile can change availability.');return;}
  const next=!t.available;
  try{
    const r=await nfFetch('/api/technicians/me/availability',{method:'PATCH',body:JSON.stringify({available:next})});
    Object.assign(t,r.technician); saveDB(); render(); toast(next?'You are now available for requests.':'You are now offline.');
  }catch(e){toast(e.message);}
}

async function toggleVerification(id){
  const t=tech(id); if(!t){toast('Technician not found.');return;}
  try{
    const r=await nfFetch(`/api/admin/technicians/${id}`,{method:'PATCH',body:JSON.stringify({verified:!t.verified})});
    Object.assign(t,r.technician); applyServerState(await nfFetch('/api/bootstrap')); render(); toast(t.verified?'Technician verified.':'Verification removed.');
  }catch(e){toast(e.message);}
}

function editTechProfile(id){
  const t=tech(id);

  modal().innerHTML=`<div class="modal">
    <div class="modal-box">

      <div class="modal-head">
        <h2>Edit technician profile</h2>
        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label>Name</label>
          <input id="edit-name" value="${esc(t.name)}">
        </div>

        <div class="form-field">
          <label>Starting price</label>
          <input id="edit-price" type="number" value="${t.price}">
        </div>

        <div class="form-field">
          <label>Verified UPI ID</label>
          <input id="edit-upi" value="${esc(t.upiId||'')}" placeholder="yourname@upi">
        </div>

        <div class="form-field full">
          <label>Skills (comma separated)</label>
          <input id="edit-skills" value="${esc(t.skills.join(', '))}">
        </div>
      </div>

      <button
        class="btn primary full-btn"
        onclick="saveTechProfile(${id})"
      >
        Save changes
      </button>

    </div>
  </div>`;
}

async function saveTechProfile(id){
  const t=tech(id); const u=currentUser();
  if(!t||u?.role!=='technician'||t.userId!==u.id){toast('You can only edit your own technician profile.');return;}
  const payload={name:document.getElementById('edit-name').value.trim()||t.name,price:Number(document.getElementById('edit-price').value)||t.price,upiId:document.getElementById('edit-upi')?.value.trim()||t.upiId||'',skills:document.getElementById('edit-skills').value.split(',').map(x=>x.trim()).filter(Boolean)};
  try{const r=await nfFetch('/api/technicians/me/profile',{method:'PATCH',body:JSON.stringify(payload)});Object.assign(t,r.technician);applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Technician profile updated.');}catch(e){toast(e.message);}
}

function createCoupon(){
  const code=prompt('Coupon code','NEAR20');

  if(!code)return;

  toast(`${code.toUpperCase()} created successfully.`);
}

function openServiceManager(){
  modal().innerHTML=`<div class="modal">
    <div class="modal-box">

      <div class="modal-head">
        <div>
          <span class="eyebrow">ADMIN</span>
          <h2>Service categories</h2>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      ${SERVICES.map(s=>`
        <div class="admin-tech">
          <span class="service-icon small">${s[0]}</span>

          <div class="grow">
            <b>${esc(s[1])}</b>
            <small>${esc(s[2])}</small>
          </div>

          <button
            class="btn secondary"
            onclick="toast('${esc(s[1])} is active')"
          >
            Active
          </button>
        </div>
      `).join('')}

      <button
        class="btn primary full-btn"
        onclick="toast('New service form ready for API integration')"
      >
        ＋ Add new service
      </button>

    </div>
  </div>`;
}

function resolveComplaint(id){
  const c=db.complaints.find(x=>x.id===Number(id));

  if(c){
    c.status='Resolved';

    saveDB();
    render();

    toast('Complaint resolved.');
  }
}

function openComplaint(){
  if(!currentUser()){
    openLoginPrompt();
    return;
  }

  modal().innerHTML=`<div class="modal">
    <div class="modal-box">

      <div class="modal-head">
        <div>
          <span class="eyebrow">SUPPORT</span>
          <h2>Report an issue</h2>
        </div>

        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="form-field">
        <label>Subject</label>
        <input id="complaint-subject" placeholder="e.g. Technician overcharged">
      </div>

      <div class="form-field">
        <label>Details</label>
        <textarea id="complaint-text" placeholder="Tell NearFix what happened..."></textarea>
      </div>

      <button class="btn primary full-btn" onclick="submitComplaint()">
        Submit complaint
      </button>

    </div>
  </div>`;
}

function submitComplaint(){
  const subject=
    document.getElementById('complaint-subject')
      .value.trim();

  const text=
    document.getElementById('complaint-text')
      .value.trim();

  if(!subject||!text){
    toast('Please complete both fields.');
    return;
  }

  db.complaints.push({
    id:Date.now(),
    subject,
    text,
    status:'Open',
    userId:currentUser().id
  });

  saveDB();
  closeModal();

  toast('Complaint submitted to NearFix support.');
}

function openInfo(type){
  const content={
    about:[
      'About NearFix',
      `<div class="about-content">
        <div class="about-hero">
          <span class="eyebrow">FIX FAST. FIX FAIR. FIX NEARBY.</span>
          <h2>A smarter way to find trusted local service professionals.</h2>
          <p>NearFix is an AI-powered local service marketplace that connects customers with skilled technicians using service requirements, real device location, availability, experience, ratings and transparent pricing.</p>
        </div>

        <div class="about-section">
          <h3>What problem does NearFix solve?</h3>
          <p>Finding a reliable local technician can be difficult when customers do not know who is nearby, who is available, what the service should cost, or whether the professional has the required skills.</p>
          <p>NearFix brings discovery, matching, booking, communication, tracking, quotation approval, payment and service history into one platform.</p>
        </div>

        <div class="about-section">
          <h3>How NearFix works</h3>
          <div class="about-steps">
            <div><b>01 · Describe</b><p>Explain the problem and optionally upload a photo.</p></div>
            <div><b>02 · AI assistance</b><p>AI can identify a likely service category, urgency and preliminary price range.</p></div>
            <div><b>03 · Real location</b><p>With permission, NearFix reads the customer's device GPS and finds technicians within the selected radius.</p></div>
            <div><b>04 · Smart matching</b><p>Matching considers skill, availability, distance, rating, reliability and price compatibility.</p></div>
            <div><b>05 · Book</b><p>Select a technician, date and service location.</p></div>
            <div><b>06 · Track & complete</b><p>Track the technician, chat, approve additional work, pay and review the completed service.</p></div>
          </div>
        </div>

        <div class="about-section">
          <h3>Real location & OpenStreetMap</h3>
          <p>Customer location is obtained from the device's W3C Geolocation API after permission. OpenStreetMap can then provide map visualisation, geocoding and road routes. Technicians can also share their device GPS so their location is updated on the NearFix backend.</p>
        </div>

        <div class="about-section">
          <h3>AI assistance</h3>
          <p>NearFix can analyse a customer problem, suggest a service category, estimate a preliminary range, assist matching and analyse reviews.</p>
          <div class="about-note"><b>Important:</b> AI output is preliminary assistance. It is not a physical inspection or guaranteed diagnosis. Final repair requirements and price are confirmed by the technician and customer.</div>
        </div>

        <div class="about-section">
          <h3>Transparent pricing</h3>
          <p>Labour, parts and other charges can be shown separately. Additional work should require customer approval before the extra amount is applied.</p>
        </div>

        <div class="about-section">
          <h3>Technician Skill Passport</h3>
          <p>Technicians can showcase skills, experience, completed jobs, ratings and separate identity, skill and experience verification indicators.</p>
        </div>

        <div class="about-section">
          <h3>Communication</h3>
          <p>Customers can use NearFix chat and, after booking, can open WhatsApp with the booked technician when a WhatsApp-enabled phone number is available.</p>
        </div>

        <div class="about-section">
          <h3>Trust & safety</h3>
          <ul class="about-list">
            <li>Verification indicators</li>
            <li>Clear booking status</li>
            <li>Transparent quotations</li>
            <li>Customer approval for additional work</li>
            <li>Service history and invoices</li>
            <li>Reviews and ratings</li>
            <li>Dispute and support workflow</li>
          </ul>
        </div>

        <div class="about-section">
          <h3>For customers</h3>
          <p>Discover nearby professionals, compare profiles, book service, communicate with technicians, track active jobs and maintain service history.</p>
        </div>

        <div class="about-section">
          <h3>For technicians</h3>
          <p>Build a professional profile, share live location while working, receive relevant requests, manage jobs and build a verified work history.</p>
        </div>

        <div class="about-section">
          <h3>For administrators</h3>
          <p>Manage users, technician verification, services, pricing, bookings, disputes and platform analytics.</p>
        </div>

        <div class="about-section">
          <h3>Our vision</h3>
          <p>Make local repair and maintenance services easier to discover, more transparent, location-aware and simpler to manage for customers and skilled professionals.</p>
        </div>
      </div>`
    ],
    contact:[
      'Contact NearFix',
      'For this demo, support is available at support@nearfix.demo and +91 98765 43210.'
    ],
    verification:[
      'Technician verification',
      'Admin can review technician profiles and mark professionals as verified. In production, identity/KYC and background checks should be handled server-side.'
    ],
    support:[
      'NearFix support',
      'Use the complaint form from your dashboard or contact support@nearfix.demo.'
    ]
  }[type]||[
    'NearFix',
    'Expert help, minutes away.'
  ];

  modal().innerHTML=`<div class="modal">
    <div class="modal-box">

      <div class="modal-head">
        <h2>${content[0]}</h2>
        <button class="close" onclick="closeModal()">×</button>
      </div>

      <div class="info-copy">${content[1]}</div>

      <button class="btn primary full-btn" onclick="closeModal()">
        Done
      </button>

    </div>
  </div>`;
}

function openLoginPrompt(){
  modal().innerHTML=`<div class="modal">
    <div class="modal-box center">

      <div class="success-icon">🔐</div>

      <h2>Login required</h2>

      <p class="muted">
        Please sign in to book a technician and manage services.
      </p>

      <button
        class="btn primary full-btn"
        onclick="closeModal();setRoute('login')"
      >
        Go to Login →
      </button>

    </div>
  </div>`;
}

function openMoreMenu(){
  const role=currentUser()?.role;
  const options = role==='customer'
    ? `<button class="menu-option" onclick="closeModal();setRoute('services')">🧰 Services</button><button class="menu-option" onclick="closeModal();setRoute('favourites')">♥ Favourites</button><button class="menu-option" onclick="closeModal();setRoute('scanner')">▣ Scan a part</button><button class="menu-option" onclick="closeModal();setRoute('account')">👤 Account & payments</button>`
    : role==='technician'
      ? `<button class="menu-option" onclick="closeModal();setRoute('account')">👤 Account & earnings</button><button class="menu-option" onclick="closeModal();openInfo('verification')">✓ Verification</button>`
      : role==='admin'
        ? `<button class="menu-option" onclick="closeModal();setRoute('parts')">🧰 Parts catalog</button><button class="menu-option" onclick="closeModal();setRoute('account')">👤 Account & finance</button>`
        : `<button class="menu-option" onclick="closeModal();setRoute('services')">🧰 Services</button><button class="menu-option" onclick="closeModal();setRoute('find')">🔎 Find Technician</button>`;
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">${role?esc(role.toUpperCase()):'NEARFIX'}</span><h2>More</h2></div><button class="close" onclick="closeModal()">×</button></div>${options}<button class="menu-option" onclick="closeModal();openNotifications()">🔔 Notifications</button><button class="menu-option" onclick="closeModal();openComplaint()">🚨 Report an issue</button><button class="menu-option" onclick="closeModal();openInfo('support')">💬 Support</button><button class="menu-option" onclick="closeModal();openInfo('about')">ℹ️ About NearFix</button></div></div>`;
}

function openMobileMenu(){
  openMoreMenu();
}

function closeModal(){
  modal().innerHTML='';
}

function render(){
  const role=currentUser()?.role;
  if(role && !canAccessRoute(role,state.route)){
    state.route=dashboardRouteForRole(role);
    if(location.hash.slice(1)!==state.route) history.replaceState(null,'',`#${state.route}`);
  }
  const r=state.route;

  if(r==='home')
    app().innerHTML=home();

  else if(r==='services')
    app().innerHTML=servicesPage();

  else if(r==='find')
    app().innerHTML=findPage();

  else if(r==='login')
    app().innerHTML=login();

  else if(r==='customer')
    requireRole('customer',customerPage);

  else if(r==='technician')
    requireRole('technician',technicianPage);

  else if(r==='admin')
    requireRole('admin',adminPage);

  else if(r==='account')
    if(currentUser()) app().innerHTML=accountPage(); else setRoute('login');

  else if(r==='parts'){
    if(!currentUser())return setRoute('login');
    app().innerHTML=partsPage();
  }

  else if(r==='scanner'){
    if(!currentUser())return setRoute('login');
    app().innerHTML=scannerPage();
  }

  else if(['admin-users','admin-techs','admin-bookings','admin-data'].includes(r)){
    if(currentUser()?.role!=='admin')return setRoute('login');
    state.route='admin'; app().innerHTML=adminPage();
    const tabMap={'admin-users':'users','admin-techs':'technicians','admin-bookings':'bookings','admin-data':'data'};
    setTimeout(()=>adminTab(null,tabMap[r]),0);
  }

  else if(r==='bookings'){
    if(!currentUser())return setRoute('login');
    app().innerHTML=bookingsPage();
  }

  else if(r==='favourites'){
    if(!currentUser())return setRoute('login');
    app().innerHTML=favouritesPage();
  }

  else if(r==='tech-jobs'){
    setRoute('technician');
    return;
  }

  else
    app().innerHTML=home();
}

function requireRole(role,fn){
  if(currentUser()?.role!==role){
    toast(`Please login as ${role}.`);
    setRoute('login');
    return;
  }

  app().innerHTML=fn();
}

function heroSearch(){
  if(currentUser()?.role==='technician'){ toast('Technician accounts manage customer requests from My Jobs.'); setRoute('technician'); return; }
  if(currentUser()?.role==='admin'){ toast('Admin accounts manage operations from the Admin Control Center.'); setRoute('admin'); return; }
  state.service=document.getElementById('hero-service').value;

  state.quick=false;

  state.filters={
    ...state.filters,
    query:'',
    availability:'all'
  };

  setRoute('find');
}

function quickFix(){
  if(currentUser()?.role==='technician'){ toast('Technicians receive customer requests in My Jobs.'); setRoute('technician'); return; }
  if(currentUser()?.role==='admin'){ toast('Admin accounts do not create customer bookings.'); setRoute('admin'); return; }
  if(!currentUser()){
    openLoginPrompt();
    return;
  }

  state.quick=true;
  state.filters.availability='available';
  state.filters.maxDistance=5;
  state.filters.query='';

  setRoute('find');

  toast('Quick Fix: showing available technicians nearby.');
}

let nearfixMapsPromise=null;
let technicianWatchId=null;
let trackingPollId=null;

function hasUserLocation(){
  return Number.isFinite(Number(db.settings.userLat)) &&
    Number.isFinite(Number(db.settings.userLng));
}

function haversineKm(a,b){
  const R=6371, rad=Math.PI/180;
  const dLat=(Number(b.lat)-Number(a.lat))*rad;
  const dLng=(Number(b.lng)-Number(a.lng))*rad;
  const x=Math.sin(dLat/2)**2+
    Math.cos(Number(a.lat)*rad)*
    Math.cos(Number(b.lat)*rad)*
    Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}

async function reverseGeocode(lat,lng){
  try{
    const url=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=18&addressdetails=1`;
    const response=await fetch(url,{headers:{'Accept':'application/json'}});
    if(!response.ok) throw new Error(`Reverse geocoder returned ${response.status}`);
    const result=await response.json();
    return result.display_name||`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }catch(e){
    console.warn('Reverse geocoding unavailable:',e.message);
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

async function refreshNearbyTechnicians(){
  const params=new URLSearchParams({
    radius:String(state.filters.maxDistance||db.settings.radius||5),
    service:state.service==='All services'?'':state.service
  });

  if(hasUserLocation()){
    params.set('lat',String(db.settings.userLat));
    params.set('lng',String(db.settings.userLng));
  }

  try{
    const r=await nfFetch(`/api/technicians?${params.toString()}`);
    if(Array.isArray(r.technicians)){
      db.techs=r.technicians.map(t=>({...t,techId:t.id}));
      saveDB();
      return r.technicians;
    }
  }catch(e){
    console.warn('Nearby technician refresh failed:',e.message);
  }

  return db.techs;
}

async function detectLocation(){
  if(!window.isSecureContext && location.hostname!=='localhost'){
    toast('Location requires HTTPS in production.');
    return;
  }

  if(!navigator.geolocation){
    toast('This browser does not support device location.');
    return;
  }

  toast('Requesting your precise device location…');

  navigator.geolocation.getCurrentPosition(
    async position=>{
      const lat=position.coords.latitude;
      const lng=position.coords.longitude;
      const accuracy=position.coords.accuracy;

      db.settings.userLat=lat;
      db.settings.userLng=lng;
      db.settings.locationAccuracy=Math.round(accuracy);
      db.settings.locationUpdatedAt=new Date().toISOString();

      db.settings.location=await reverseGeocode(lat,lng);
      saveDB();

      await refreshNearbyTechnicians();

      if(nfToken){
        try{
          await nfFetch('/api/location/customer',{
            method:'PATCH',
            body:JSON.stringify({
              latitude:lat,
              longitude:lng,
              accuracy
            })
          });
        }catch(e){
          console.warn('Customer location sync unavailable:',e.message);
        }
      }

      toast(`📍 Location detected (${Math.round(accuracy)}m accuracy).`);
      render();
    },
    error=>{
      const messages={
        1:'Location permission denied.',
        2:'Your device location is unavailable.',
        3:'Location request timed out.'
      };
      toast(messages[error.code]||'Could not determine your location.');
    },
    {
      enableHighAccuracy:true,
      timeout:15000,
      maximumAge:10000
    }
  );
}

async function openDirectionsToTechnician(techId){
  const t=tech(techId);
  if(!t?.lat||!t?.lng){
    toast('Technician location is not available yet.');
    return;
  }

  const destination=`${t.lat},${t.lng}`;
  const origin=hasUserLocation()?`${db.settings.userLat},${db.settings.userLng}`:'';

  const url=origin
    ? `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${encodeURIComponent(origin)}%3B${encodeURIComponent(destination)}`
    : `https://www.openstreetmap.org/?mlat=${encodeURIComponent(t.lat)}&mlon=${encodeURIComponent(t.lng)}#map=16/${encodeURIComponent(t.lat)}/${encodeURIComponent(t.lng)}`;

  window.open(url,'_blank','noopener,noreferrer');
}

async function startTechnicianLocationSharing(techId){
  const u=currentUser();
  if(u?.role!=='technician'){
    toast('Only technicians can share technician GPS.');
    return;
  }

  if(!navigator.geolocation){
    toast('This device does not support GPS location.');
    return;
  }

  if(technicianWatchId!==null){
    navigator.geolocation.clearWatch(technicianWatchId);
    technicianWatchId=null;
    toast('Live location sharing stopped.');
    return;
  }

  if(!window.isSecureContext && location.hostname!=='localhost'){
    toast('Technician GPS requires HTTPS in production.');
    return;
  }

  toast('Starting live technician location…');

  technicianWatchId=navigator.geolocation.watchPosition(
    async position=>{
      try{
        await nfFetch('/api/technicians/me/location',{
          method:'PATCH',
          body:JSON.stringify({
            lat:position.coords.latitude,
            lng:position.coords.longitude,
            accuracy:position.coords.accuracy,
            heading:position.coords.heading,
            speed:position.coords.speed,
            timestamp:new Date(position.timestamp||Date.now()).toISOString()
          })
        });

        const meTech=db.techs.find(t=>t.userId===u.id||t.id===techId);
        if(meTech){
          meTech.lat=position.coords.latitude;
          meTech.lng=position.coords.longitude;
          meTech.accuracy=position.coords.accuracy;
          meTech.locationSource='technician-gps';
          meTech.locationUpdatedAt=new Date(position.timestamp||Date.now()).toISOString();
          saveDB();
        }

        toast('📍 Technician location updated.');
      }catch(e){
        toast(`GPS sync failed: ${e.message}`);
      }
    },
    error=>{
      navigator.geolocation.clearWatch(technicianWatchId);
      technicianWatchId=null;
      toast(error.code===1?'GPS permission denied.':'Unable to read technician GPS.');
    },
    {
      enableHighAccuracy:true,
      maximumAge:5000,
      timeout:15000
    }
  );

  render();
}

window.addEventListener('hashchange',()=>{
  if(state.route!=='scanner') stopBarcodeScanner();
  state.route=location.hash.slice(1)||'home';
  render();
});

window.startBooking=startBooking;
window.setRoute=setRoute;
window.accountPage=accountPage;
window.quickFix=quickFix;
window.heroSearch=heroSearch;
window.render=render;
window.renderFindResults=renderFindResults;
window.techDetails=techDetails;
window.toggleFavourite=toggleFavourite;
window.tracking=tracking;
window.bookingDetails=bookingDetails;
window.acceptBooking=acceptBooking;
window.rejectBooking=rejectBooking;
window.advanceBooking=advanceBooking;
window.paymentModal=paymentModal;
window.reviewBooking=reviewBooking;
window.submitReview=submitReview;
window.setRating=setRating;
window.openChat=openChat;
window.startBarcodeScanner=startBarcodeScanner;
window.stopBarcodeScanner=stopBarcodeScanner;
window.lookupBarcode=lookupBarcode;
window.openPartDetail=openPartDetail;
window.usePartInQuote=usePartInQuote;
window.openPartEditor=openPartEditor;
window.savePart=savePart;
window.editPart=editPart;
window.sendChat=sendChat;
window.openNotifications=openNotifications;
window.openSignup=openSignup;
window.closeModal=closeModal;
window.detectLocation=detectLocation;
window.startTechnicianLocationSharing=startTechnicianLocationSharing;
window.whatsappTechnician=whatsappTechnician;
window.openDirectionsToTechnician=openDirectionsToTechnician;
window.callTechnician=callTechnician;
window.stopTrackingPoll=stopTrackingPoll;
window.loginSubmit=loginSubmit;
window.demoLogin=demoLogin;
window.setAuthRole=setAuthRole;
window.logout=logout;
window.createAccount=createAccount;
window.verifyOtpFromModal=verifyOtpFromModal;
window.resendOtp=resendOtp;
window.signupRole=signupRole;
window.previewUpload=previewUpload;
window.nextBooking1=nextBooking1;
window.nextBooking2=nextBooking2;
window.bookingStep=bookingStep;
window.createBooking=createBooking;
window.toggleAvailability=toggleAvailability;
window.editTechProfile=editTechProfile;
window.saveTechProfile=saveTechProfile;
window.toggleVerification=toggleVerification;
window.adminTab=adminTab;
window.adminUserDetails=adminUserDetails;
window.adminTechDetails=adminTechDetails;
window.adminDataModal=adminDataModal;
window.openServiceManager=openServiceManager;
window.createCoupon=createCoupon;
window.resolveComplaint=resolveComplaint;
window.openComplaint=openComplaint;
window.submitComplaint=submitComplaint;
window.openInfo=openInfo;
window.openMoreMenu=openMoreMenu;
window.openMobileMenu=openMobileMenu;
window.closeModal=closeModal;

render();

/* =========================================================
   NearFix v2 — server/API bridge + AI demo mode
   The existing UI remains intact; core data mutations now
   persist through the Node backend instead of only localStorage.
   ========================================================= */
const NF_API = '';
let nfToken = localStorage.getItem('nearfix-token') || '';

async function nfFetch(path, options={}) {
  const headers = {'Content-Type':'application/json', ...(options.headers||{})};
  if(nfToken) headers.Authorization = `Bearer ${nfToken}`;
  const res = await fetch(`${NF_API}${path}`, {...options, headers});
  let body={};
  try { body=await res.json(); } catch {}
  if(!res.ok) throw new Error(body.message || `Request failed (${res.status})`);
  return body;
}

function nfStatus(status){
  const map={REQUESTED:'Requested',ACCEPTED:'Accepted',ON_THE_WAY:'On the way',ARRIVED:'Arrived',INSPECTION:'Inspection',IN_PROGRESS:'Service started',AWAITING_APPROVAL:'Awaiting approval',COMPLETED:'Completed',CANCELLED:'Cancelled'};
  return map[status]||status;
}

function applyServerState(payload){
  if(payload.user){
    db.users = db.users.filter(u=>u.id!==payload.user.id);
    db.users.push(payload.user);
    db.session = payload.user.id;
  }
  if(payload.technicians) db.techs = payload.technicians.map(t=>({...t,techId:t.id}));
  if(payload.parts) db.parts = payload.parts;
  if(payload.bookings) db.bookings = payload.bookings.map(b=>({
    ...b, id:b.id, customerId:b.customerId, techId:b.technicianId, service:b.service, problem:b.problem, file:b.file||'', media:Array.isArray(b.media)?b.media:[], workVerification:b.workVerification||{status:'PENDING',notes:''}, cancellation:b.cancellation||null, location:b.location||'', date:b.date||'', time:b.time||'', status:nfStatus(b.status), estimate:Number(b.estimate||b.estimateRange?.min||0), estimateRange:b.estimateRange, total:b.total||b.quote?.total||0, urgent:Boolean(b.urgent), paymentStatus:b.paymentStatus, quote:b.quote||null, customer:b.customer||null, technician:b.technician||null, payment:b.payment||null, invoice:b.invoice||null
  }));
  if(payload.reviews) db.reviews = payload.reviews.map(r=>({id:r.id,bookingId:r.bookingId,customerId:r.customerId,techId:r.technicianId,rating:r.rating,text:r.text,created:r.createdAt}));
  if(payload.payments) db.payments = payload.payments.map(p=>({id:p.id,bookingId:p.bookingId,techId:p.technicianId,customerId:p.customerId,amount:p.amount,status:p.status==='SUCCESS'?'Paid':p.status,method:p.method,transactionId:p.transactionId,reference:p.reference,createdAt:p.createdAt}));
  if(payload.invoices) db.invoices = payload.invoices;
  if(payload.notifications) db.notifications = payload.notifications;
  if(payload.messages) db.messages = payload.messages.map(m=>({id:m.id,bookingId:m.bookingId,from:m.senderId===db.session?'customer':'tech',text:m.text,time:new Date(m.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}));
  if(payload.disputes) db.complaints = payload.disputes.map(d=>({id:d.id,subject:d.subject,text:d.details,status:d.status,bookingId:d.bookingId,customerId:d.customerId,technicianId:d.technicianId,createdAt:d.createdAt,resolution:d.resolution||''}));
  if(payload.allUsers) db.adminAllUsers=payload.allUsers;
  if(payload.allBookings) db.adminAllBookings=payload.allBookings.map(b=>({...b,techId:b.technicianId,status:nfStatus(b.status),estimate:Number(b.estimate||b.estimateRange?.min||0),total:b.total||b.quote?.total||0}));
  if(payload.allTechnicians) db.adminAllTechnicians=payload.allTechnicians;
  if(payload.allQuotes) db.adminAllQuotes=payload.allQuotes;
  if(payload.allPayments) db.adminAllPayments=payload.allPayments;
  if(payload.allInvoices) db.adminAllInvoices=payload.allInvoices;
  if(payload.allReviews) db.adminAllReviews=payload.allReviews;
  if(payload.allMessages) db.adminAllMessages=payload.allMessages;
  if(payload.allNotifications) db.adminAllNotifications=payload.allNotifications;
  if(payload.allDisputes) db.adminAllDisputes=payload.allDisputes;
  if(payload.allAiAnalyses) db.adminAllAiAnalyses=payload.allAiAnalyses;
  if(payload.allAuditLogs) db.adminAllAuditLogs=payload.allAuditLogs;
  if(payload.allParts) db.adminAllParts=payload.allParts;
  if(payload.pricingRules) db.pricingRules=payload.pricingRules;
  if(payload.account) db.accountSummary=payload.account;
  saveDB();
}

async function hydrateServer(){
  if(!nfToken) return;
  try { const payload=await nfFetch('/api/bootstrap'); applyServerState(payload); render(); }
  catch(e){ console.warn('NearFix server sync:', e.message); }
}

let serverSyncTimer=null;
function startServerSync(){
  if(serverSyncTimer) clearInterval(serverSyncTimer);
  serverSyncTimer=setInterval(async()=>{
    if(!nfToken||!['customer','technician','admin'].includes(currentUser()?.role)) return;
    try { const payload=await nfFetch('/api/bootstrap'); applyServerState(payload); if(['customer','technician','admin','bookings'].includes(state.route) && !document.querySelector('.modal-box')) render(); }
    catch(e){}
  },8000);
}

// OTP UI is reserved for service-arrival verification; login/register use email + password.
let otpState=null;
function openOtpModal({title='Verify your mobile number',subtitle='Enter the 6-digit OTP sent to your registered mobile.',phone='',demoOtp=null,onVerify,onResend}){
  otpState={phone,demoOtp,onVerify,onResend,resendAt:Date.now()+30000};
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box otp-modal">
    <div class="modal-head"><div><span class="eyebrow">SECURE OTP VERIFICATION</span><h2>${esc(title)}</h2><p class="muted">${esc(subtitle)}</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="otp-destination"><span>📱</span><div><small>OTP sent to</small><b>${esc(phone||'your registered mobile')}</b></div></div>
    ${demoOtp?`<div class="demo-otp"><span>DEMO MODE</span><b>${esc(demoOtp)}</b><small>Use this OTP locally. Configure Twilio in .env for real SMS delivery.</small></div>`:''}
    <div class="form-field"><label>6-digit OTP</label><input id="otp-code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="Enter OTP" oninput="this.value=this.value.replace(/\\D/g,'').slice(0,6)"></div>
    <div id="otp-error" class="otp-error"></div>
    <div class="otp-meta"><span>Expires in 5 minutes</span><button id="otp-resend" class="text-btn" onclick="resendOtp()" disabled>Resend OTP</button></div>
    <div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="verifyOtpFromModal()">Verify & Continue →</button></div>
  </div></div>`;
  setTimeout(()=>{document.getElementById('otp-code')?.focus();updateOtpResend();},50);
}
function updateOtpResend(){
  const btn=document.getElementById('otp-resend'); if(!btn||!otpState)return;
  const left=Math.max(0,Math.ceil((otpState.resendAt-Date.now())/1000));
  btn.disabled=left>0; btn.textContent=left?`Resend OTP (${left}s)`:'Resend OTP';
  if(left>0) setTimeout(updateOtpResend,1000);
}
async function resendOtp(){
  if(!otpState?.onResend)return;
  try{ const r=await otpState.onResend(); otpState.demoOtp=r.demoOtp||null; otpState.resendAt=Date.now()+30000; const box=document.querySelector('.demo-otp'); if(r.demoOtp){ if(box)box.querySelector('b').textContent=r.demoOtp; else document.querySelector('.otp-destination')?.insertAdjacentHTML('afterend',`<div class="demo-otp"><span>DEMO MODE</span><b>${esc(r.demoOtp)}</b><small>Use this OTP locally. Configure Twilio in .env for real SMS delivery.</small></div>`);} toast('A new OTP has been sent.'); updateOtpResend(); }catch(e){toast(e.message);}
}
async function verifyOtpFromModal(){
  const code=document.getElementById('otp-code')?.value.trim(); const err=document.getElementById('otp-error');
  if(!/^\d{6}$/.test(code)){if(err)err.textContent='Enter the 6-digit OTP.';return;}
  try{ await otpState.onVerify(code); closeModal(); }catch(e){if(err)err.textContent=e.message;}
}

async function requestLoginOtp(email,password){
  return nfFetch('/api/auth/request-otp',{method:'POST',body:JSON.stringify({email,password})});
}
async function serverLogin(email,password){
  const payload=await nfFetch('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})});
  nfToken=payload.token;
  localStorage.setItem('nearfix-token',nfToken);
  applyServerState(payload);
  await hydrateServer();
  startServerSync();
  return currentUser();
}

async function serverRegister(form){
  const payload=await nfFetch('/api/auth/register',{method:'POST',body:JSON.stringify(form)});
  nfToken=payload.token;
  localStorage.setItem('nearfix-token',nfToken);
  applyServerState(payload);
  await hydrateServer();
  startServerSync();
  return currentUser();
}

async function openAIAnalyzer(){
  if(!currentUser()){ openLoginPrompt(); return; }
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide">
    <div class="modal-head"><div><span class="eyebrow">NEARFIX AI</span><h2>Describe what's broken</h2><p class="muted">AI gives a preliminary service, urgency, likely causes and price range. It is not a physical diagnosis.</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="form-grid"><div class="form-field full"><label>Problem</label><textarea id="ai-problem" placeholder="Example: My AC is running but not cooling and making unusual noise."></textarea></div><div class="form-field"><label>Service (optional)</label><select id="ai-service"><option value="">Auto-detect</option>${SERVICES.map(s=>`<option>${esc(s[1])}</option>`).join('')}</select></div><div class="form-field"><label><input id="ai-urgent" type="checkbox"> Need urgent help</label></div></div>
    <div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="runAIAnalysis()">Analyze with AI →</button></div>
    <div id="ai-result"></div>
  </div></div>`;
}

async function runAIAnalysis(){
  const problem=document.getElementById('ai-problem')?.value.trim();
  const service=document.getElementById('ai-service')?.value||'';
  const urgent=Boolean(document.getElementById('ai-urgent')?.checked);
  if(!problem){toast('Please describe the problem first.');return;}
  const box=document.getElementById('ai-result'); box.innerHTML='<div class="panel-lite"><b>Analyzing…</b><p class="muted">Checking service type, urgency, likely causes and price intelligence.</p></div>';
  try{
    const a=await nfFetch('/api/ai/analyze-problem',{method:'POST',body:JSON.stringify({problem,service,urgent})});
    const e=await nfFetch('/api/ai/estimate-price',{method:'POST',body:JSON.stringify({service:a.analysis.service,problem,urgent})});
    box.innerHTML=`<div class="panel-lite" style="margin-top:18px"><span class="eyebrow">${esc(a.analysis.mode||'AI')}</span><h3>${esc(a.analysis.service)} · ${esc(a.analysis.urgency)} urgency</h3><p>${esc(a.analysis.summary)}</p><b>Required skill:</b> ${esc(a.analysis.requiredSkill)}<br><b>Likely causes:</b> ${a.analysis.possibleCauses.map(esc).join(' · ')}<br><b>Estimated range:</b> ${esc(a.analysis.estimatedRange)}<p class="muted">${esc(a.analysis.recommendedNextAction)}</p><small>Preliminary AI guidance only. Final diagnosis and quote require technician inspection and customer approval.</small><div class="modal-footer"><button class="btn primary" onclick="useAIResult('${esc(a.analysis.service).replaceAll("'","\\'")}')">Book this service →</button></div></div>`;
    window.__lastAI={service:a.analysis.service,problem,urgent};
  }catch(e){box.innerHTML=`<div class="error-state"><b>AI service unavailable</b><p>${esc(e.message)}</p></div>`;}
}
function useAIResult(service){ const x=window.__lastAI||{}; closeModal(); state.quick=Boolean(x.urgent); state.service=service||x.service||'General Repair'; state.bookingDraft={problem:x.problem||'',service:state.service}; startBooking(state.service); }

const _originalLoginSubmit=window.loginSubmit;
window.loginSubmit=async function(){
  const email=document.getElementById('login-email')?.value.trim(); const password=document.getElementById('login-password')?.value;
  if(!email||!password){toast('Enter email and password.');return;}
  try{ const u=await serverLogin(email,password); setRoute(u.role==='customer'?'customer':u.role==='technician'?'technician':'admin'); toast(`Welcome back, ${u.name.split(' ')[0]}.`); }
  catch(e){toast(e.message);}
};

window.demoLogin=async function(role){
  const email=role==='customer'?'customer@nearfix.demo':role==='technician'?'technician@nearfix.demo':'admin@nearfix.demo';
  try{const u=await serverLogin(email,'demo123');setRoute(u.role==='customer'?'customer':u.role==='technician'?'technician':'admin');toast(`Demo ${role} account loaded.`);}catch(e){toast(e.message);}
};

const _originalLogout=window.logout;
window.logout=function(){ nfToken='';localStorage.removeItem('nearfix-token');db.session=null;saveDB(); if(typeof _originalLogout==='function')_originalLogout(); else setRoute('home'); };

const _originalCreateAccount=window.createAccount;
window.createAccount=async function(){
  const name=document.getElementById('signup-name')?.value.trim(); const email=document.getElementById('signup-email')?.value.trim(); const password=document.getElementById('signup-pass')?.value; const phone=document.getElementById('signup-phone')?.value.trim()||''; const role=authRole==='technician'?'technician':'customer'; const service=document.getElementById('signup-service')?.value||'General Repair'; const area=document.getElementById('signup-city')?.value||'Sonipat';
  if(!name||!email||!password){toast('Please complete the required fields.');return;}
  try{const u=await serverRegister({name,email,password,phone,role,service,area,category:service});setRoute(u.role==='technician'?'technician':'customer');toast('Account created successfully.');}catch(e){toast(e.message);}
};

const _originalCreateBooking=window.createBooking;
window.createBooking=async function(){
  const d=state.bookingDraft; const t=tech(state.selectedTech)||bestMatch(d.service); const u=currentUser();
  if(!u||!d||!t){toast('Please select a valid service and technician.');return;}
  try{
    const r=await nfFetch('/api/bookings',{method:'POST',body:JSON.stringify({technicianId:t.id,service:d.service,problem:d.problem,file:d.file||'',location:d.location,date:d.date,time:d.time,budget:d.budget,radius:db.settings.radius,urgent:state.quick,latitude:db.settings.userLat,longitude:db.settings.userLng})});
    applyServerState(await nfFetch('/api/bootstrap')); closeModal();setRoute('bookings');toast(`Booking #${String(r.booking.id).slice(-6)} created. Technician notified.`);state.quick=false;
  }catch(e){toast(e.message);if(typeof _originalCreateBooking==='function')_originalCreateBooking();}
};

async function syncBookingStatus(id,status){
  const serverStatus={'Requested':'REQUESTED','Accepted':'ACCEPTED','On the way':'ON_THE_WAY','Arrived':'ARRIVED','Inspection':'INSPECTION','Service started':'IN_PROGRESS','Awaiting approval':'AWAITING_APPROVAL','Completed':'COMPLETED','Cancelled':'CANCELLED'}[status]||status;
  const r=await nfFetch(`/api/bookings/${id}`,{method:'PATCH',body:JSON.stringify({status:serverStatus})}); applyServerState(await nfFetch('/api/bootstrap')); return r;
}
window.acceptBooking=async function(id){try{await syncBookingStatus(id,'Accepted');render();toast('Request accepted. Customer notified.');}catch(e){toast(e.message);}};
window.rejectBooking=async function(id){try{await syncBookingStatus(id,'Cancelled');render();toast('Request rejected.');}catch(e){toast(e.message);}};
window.showArrivalOtp=async function(id){
  try{
    const r=await nfFetch(`/api/bookings/${id}/arrival-verification`);
    if(r.status==='VERIFIED'){toast('Arrival OTP already verified.');return;}
    const b=db.bookings.find(x=>String(x.id)===String(id));
    const demo=r.demoOtp||null;
    modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">SECURE CHECK-IN</span><h2>Your arrival OTP</h2><p class="muted">Give this code to the technician only after they have arrived.</p></div><button class="close" onclick="closeModal()">×</button></div><div class="arrival-otp-display">${demo?`<small>DEMO SMS CODE</small><strong>${esc(demo)}</strong><span>In production this code is delivered to the customer's registered mobile.</span>`:`<small>OTP SENT</small><strong>••••••</strong><span>Check your registered mobile for the 6-digit code.</span>`}</div><div class="modal-footer"><button class="btn primary" onclick="closeModal()">Done</button></div></div></div>`;
  }catch(e){toast(e.message);}
};
window.verifyArrivalOtp=async function(id){
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">SECURE CHECK-IN</span><h2>Verify customer arrival OTP</h2><p class="muted">Enter the 6-digit code provided by the customer.</p></div><button class="close" onclick="closeModal()">×</button></div><div class="otp-destination"><span>🔐</span><div><small>Booking</small><b>#${String(id).slice(-6)}</b></div></div><div class="form-field"><label>6-digit arrival OTP</label><input id="arrival-otp-code" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="Enter OTP" oninput="this.value=this.value.replace(/\D/g,'').slice(0,6)"></div><div id="arrival-otp-error" class="otp-error"></div><div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="submitArrivalOtp(${id})">Verify & Start Inspection →</button></div></div></div>`;
  setTimeout(()=>document.getElementById('arrival-otp-code')?.focus(),50);
};
window.submitArrivalOtp=async function(id){
  const code=document.getElementById('arrival-otp-code')?.value.trim(); const err=document.getElementById('arrival-otp-error');
  if(!/^\d{6}$/.test(code)){if(err)err.textContent='Enter the 6-digit OTP.';return;}
  try{await nfFetch(`/api/bookings/${id}/arrival-otp/verify`,{method:'POST',body:JSON.stringify({otp:code})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Arrival verified. Inspection can now begin.');}catch(e){if(err)err.textContent=e.message;}
};
window.advanceBooking=async function(id,status){try{if(status==='Inspection'){return window.verifyArrivalOtp(id);}await syncBookingStatus(id,status);render();toast(`Booking updated: ${status}`);}catch(e){toast(e.message);}};

window.completePayment=async function(id){
  try{const r=await nfFetch('/api/payments',{method:'POST',body:JSON.stringify({bookingId:id,method:window.__payMethod||'UPI'})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();toast(`Payment successful · ${r.payment.transactionId}`);render();}catch(e){toast(e.message);}
};

window.submitReview=async function(id){
  if(!window.__rating){toast('Please select a star rating.');return;}
  const text=document.getElementById('review-text')?.value.trim()||'';
  try{await nfFetch('/api/reviews',{method:'POST',body:JSON.stringify({bookingId:id,rating:window.__rating,text})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Review submitted. Thank you.');}catch(e){toast(e.message);}
};

window.sendChat=async function(id){
  const input=document.getElementById('chat-input'); if(!input?.value.trim())return;
  try{await nfFetch('/api/messages',{method:'POST',body:JSON.stringify({bookingId:id,text:input.value.trim()})});applyServerState(await nfFetch('/api/bootstrap'));openChat(id);}catch(e){toast(e.message);}
};

window.submitComplaint=async function(){
  const subject=document.getElementById('complaint-subject')?.value.trim(); const text=document.getElementById('complaint-text')?.value.trim(); if(!subject||!text){toast('Please complete both fields.');return;}
  try{await nfFetch('/api/disputes',{method:'POST',body:JSON.stringify({subject,details:text,reason:subject})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Issue submitted to NearFix support.');}catch(e){toast(e.message);}
};

window.resolveComplaint=async function(id){try{await nfFetch(`/api/admin/disputes/${id}`,{method:'PATCH',body:JSON.stringify({status:'RESOLVED',resolution:'Resolved by NearFix admin'})});applyServerState(await nfFetch('/api/bootstrap'));render();toast('Dispute resolved.');}catch(e){toast(e.message);}};

/* Initial server hydration. Public data is available even before login. */
(async()=>{
  try{
    const p=await nfFetch('/api/public'); if(p.technicians)db.techs=p.technicians; saveDB();
    if(nfToken) await hydrateServer(); else render();
  }catch(e){console.warn('NearFix API unavailable; local demo fallback active.',e.message);render();}
})();

/* Full quote + approval UI used by the server-backed booking flow. */
window.openQuote=async function(id){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return;
  const existing=b.quote; state.activeQuoteBookingId=id; state.quoteParts=(existing?.items||[]).map(x=>({barcode:x.barcode||'',name:x.name||x.description||'Part',price:Number(x.price||x.amount||0),qty:Number(x.qty||1)}));
  const parts=state.quoteParts||[]; const partsTotal=parts.reduce((s,x)=>s+Number(x.price||0)*Number(x.qty||1),0);
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide">
    <div class="modal-head"><div><span class="eyebrow">FAIR PRICE ENGINE</span><h2>Create quotation</h2><p class="muted">Labour + catalog parts + other charges. Customer approval is required.</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="form-grid"><div class="form-field"><label>Labour (₹)</label><input id="quote-labour" type="number" value="${Math.round((existing?.labour||b.estimate||500)*.35)}"></div><div class="form-field"><label>Other charges (₹)</label><input id="quote-other" type="number" value="${Number(existing?.otherCharges||0)}"></div><div class="form-field full"><label>Inspection notes</label><textarea id="quote-reason">${esc(existing?.reason||'Additional work identified during inspection.')}</textarea></div></div>
    <div class="quote-parts"><div class="panel-head"><div><b>Parts used</b><small>Use barcode scan or select from the shared catalog.</small></div><div><button class="btn secondary" onclick="setRoute('scanner');closeModal()">▣ Scan</button><button class="btn ghost" onclick="setRoute('parts');closeModal()">Browse</button></div></div>${parts.map((x,i)=>`<div class="quote-part-row"><div class="grow"><b>${esc(x.name)}</b><small>${esc(x.barcode)} · ${money(x.price)} each</small></div><input type="number" min="1" value="${Number(x.qty||1)}" onchange="state.quoteParts[${i}].qty=Math.max(1,Number(this.value));openQuote(${id})"><b>${money(Number(x.price||0)*Number(x.qty||1))}</b><button class="icon-btn" onclick="state.quoteParts.splice(${i},1);openQuote(${id})">×</button></div>`).join('')||'<p class="muted">No parts added yet.</p>'}</div>
    <div class="quote-note">Catalog parts total: <b>${money(partsTotal)}</b>. Technician labour and other charges remain separately visible.</div>
    <div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="submitQuote(${id})">Send quotation →</button></div>
  </div></div>`;
};
window.submitQuote=async function(id){
  const labour=Number(document.getElementById('quote-labour')?.value||0),otherCharges=Number(document.getElementById('quote-other')?.value||0),reason=document.getElementById('quote-reason')?.value.trim()||'Inspection-based quotation';
  const items=(state.quoteParts||[]).map(x=>({barcode:x.barcode,name:x.name,price:Number(x.price),qty:Number(x.qty||1),amount:Number(x.price)*Number(x.qty||1)}));
  if(labour+otherCharges+items.reduce((s,x)=>s+x.amount,0)<=0){toast('Add labour or at least one part.');return;}
  try{await nfFetch('/api/quotes',{method:'POST',body:JSON.stringify({bookingId:id,labour,parts:items.reduce((s,x)=>s+x.amount,0),otherCharges,items,reason})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Itemized quotation sent. Customer approval required.');}catch(e){toast(e.message);}
};
window.approveQuote=async function(id,action){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b?.quote?.id){toast('Quotation not found.');return;}
  try{await nfFetch(`/api/quotes/${b.quote.id}/${action}`,{method:'POST'});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast(action==='approve'?'Quotation approved.':'Quotation rejected.');}catch(e){toast(e.message);}
};

window.bookingDetails=async function(id){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return; const t=tech(b.techId); const role=currentUser()?.role;
  const nextTech={Accepted:'On the way','On the way':'Arrived',Arrived:'Inspection',Inspection:'Service started','Service started':'Completed'};
  const quote=b.quote;
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide">
    <div class="modal-head"><div><span class="eyebrow">BOOKING #${String(b.id).slice(-6)}</span><h2>${esc(b.service)}</h2><p class="muted">${esc(b.date)} · ${esc(b.time)}</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="status-banner"><span class="status">${esc(b.status)}</span><b>${money(b.total||b.estimate||0)}</b></div>
    <div class="detail-grid"><div class="panel-lite"><small>Problem</small><p>${esc(b.problem)}</p></div><div class="panel-lite"><small>Location</small><p>📍 ${esc(b.location)}</p></div>${role==='technician'?`<div class="panel-lite"><small>Customer</small><b>${esc(b.customer?.name||'Customer')}</b><p>${esc(b.customer?.phone||'Phone not shared')} · ${esc(b.customer?.email||'')}</p></div>`:''}</div>
    <div class="timeline">${timeline(b)}</div>
    ${t?`<div class="booking-tech">${techMini(t)}<button class="btn secondary" onclick="techDetails(${t.id})">View profile</button></div>`:''}
    ${quote?`<div class="panel-lite" style="margin-top:16px"><div class="match-title"><b>Quotation</b><span class="badge ${quote.status==='APPROVED'?'green':''}">${esc(quote.status)}</span></div><p>${esc(quote.reason||'')}</p><div class="review-grid"><div><small>Labour</small><b>${money(quote.labour)}</b></div><div><small>Parts</small><b>${money(quote.parts)}</b></div><div><small>Other</small><b>${money(quote.otherCharges)}</b></div><div><small>Total</small><b>${money(quote.total)}</b></div></div>${role==='customer'&&quote.status==='PENDING'?`<div class="modal-footer"><button class="btn ghost" onclick="approveQuote(${id},'reject')">Decline</button><button class="btn primary" onclick="approveQuote(${id},'approve')">Approve ₹${Number(quote.total).toLocaleString('en-IN')}</button></div>`:''}</div>`:''}
    <div class="modal-footer">
      ${role==='technician'&&b.status==='Inspection'?`<button class="btn primary" onclick="closeModal();openQuote(${id})">Create quotation →</button>`:''}
      ${role==='technician'&&nextTech[b.status]&&b.status!=='Arrived'?`<button class="btn primary" onclick="closeModal();advanceBooking(${id},'${nextTech[b.status]}')">${nextTech[b.status]==='Completed'?'Complete service':'Update to '+nextTech[b.status]} →</button>`:''}
      ${role==='technician'&&b.status==='Arrived'?`<button class="btn primary" onclick="closeModal();verifyArrivalOtp(${id})">🔐 Verify arrival OTP →</button>`:''}
      ${role==='customer'&&(b.status==='Service started'||b.status==='Completed')&&!b.paymentStatus?.includes('PAID')?`<button class="btn primary" onclick="closeModal();paymentModal(${id})">Pay now</button>`:''}
      ${b.status==='On the way'&&role==='customer'?`<button class="btn secondary" onclick="tracking(${id})">📍 Live Map</button>`:''}
      ${role==='customer'&&t?.phone?`<button class="btn whatsapp-btn" onclick="whatsappTechnician(${id})">💬 WhatsApp Technician</button>`:''}${role==='technician'&&b.status==='Inspection'?`<button class="btn secondary" onclick="openQuote(${id})">🧾 Itemize quote</button>`:''}${role==='technician'&&b.status==='Inspection'?`<button class="btn secondary" onclick="setRoute('scanner');closeModal()">▣ Scan part</button>`:''}
      ${role==='customer'&&t?.lat&&t?.lng?`<button class="btn secondary" onclick="openDirectionsToTechnician(${t.id})">🧭 Directions</button>`:''}
      ${b.status==='Completed'&&role==='customer'&&!db.reviews.some(r=>String(r.bookingId)===String(id))?`<button class="btn secondary" onclick="reviewBooking(${id})">⭐ Rate service</button>`:''}
      <button class="btn ghost" onclick="openChat(${id})">💬 Chat</button>
    </div>
  </div></div>`;
};

/* Keep server-backed notification read state. */
window.openNotifications=async function(){
  try{await nfFetch('/api/notifications/read');applyServerState(await nfFetch('/api/bootstrap'));}catch(e){}
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">NOTIFICATIONS</span><h2>Updates</h2></div><button class="close" onclick="closeModal()">×</button></div>${db.notifications.slice(0,12).map(n=>`<div class="notification"><span>🔔</span><div><b>${esc(n.text)}</b><small>${esc(n.time||'')}</small></div></div>`).join('')||'<p class="muted">No notifications.</p>'}</div></div>`;
};

window.generateInvoice=async function(id){
  try{const r=await nfFetch('/api/invoices',{method:'POST',body:JSON.stringify({bookingId:id})});toast(`Invoice ${r.invoice.number} generated.`);return r.invoice;}catch(e){toast(e.message);}
};

/* Admin analytics panel gets live backend metrics on demand. */
window.loadLiveAdminAnalytics=async function(){
  try{const r=await nfFetch('/api/admin/analytics');toast(`Live admin data: ${r.metrics.users} users · ${r.metrics.activeBookings} active bookings · ₹${r.metrics.revenue.toLocaleString('en-IN')} paid`);return r;}catch(e){toast(e.message);}
};


/* =========================================================
   NearFix Production Trust Layer
   - 5 nearby professionals with real GPS-aware ordering
   - Customer cancellation with reason/refund review
   - Evidence uploads + admin work verification
   - Catalog-locked spare-part pricing
   - Razorpay test-gateway ready checkout
   ========================================================= */

function nfReadFile(file,maxBytes=900000){
  return new Promise((resolve,reject)=>{
    if(!file) return resolve(null);
    if(file.size>maxBytes) return reject(new Error('Please keep each photo/video under about 900 KB for this demo.'));
    const reader=new FileReader();
    reader.onload=()=>resolve({name:file.name,type:file.type,size:file.size,data:String(reader.result||'')});
    reader.onerror=()=>reject(new Error('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
}

/* Always show at least five nearby professionals when the radius contains them.
   Service matches remain first; nearby professionals are labelled as alternatives. */
getFilteredTechs = function(){
  let base=[...(db.techs||[])].filter(t=>Number(t.distance??999)<=Math.max(Number(state.filters.maxDistance||5),8));
  const selected=state.service && state.service!=='All services' ? state.service : '';
  let relevant=selected ? base.filter(t=>t.category===selected || t.service===SERVICES.find(s=>s[1]===selected)?.[2]) : base.slice();
  const q=String(state.filters.query||'').toLowerCase().trim();
  if(q) base=base.filter(t=>(`${t.name} ${t.service} ${t.category} ${(t.skills||[]).join(' ')}`).toLowerCase().includes(q));
  if(q) relevant=relevant.filter(t=>(`${t.name} ${t.service} ${t.category} ${(t.skills||[]).join(' ')}`).toLowerCase().includes(q));
  if(state.filters.availability==='available'||state.quick){ base=base.filter(t=>t.available); relevant=relevant.filter(t=>t.available); }
  const score=(t)=>({distance:Number(t.distance||999),rating:-Number(t.rating||0),price:Number(t.price||99999),exp:-Number(t.exp||0)})[state.filters.sort] ?? Number(t.distance||999);
  relevant.sort((a,b)=>score(a)-score(b));
  if(relevant.length<5 && !q){
    const ids=new Set(relevant.map(t=>t.id));
    const alternatives=base.filter(t=>!ids.has(t.id)).sort((a,b)=>Number(a.distance||999)-Number(b.distance||999));
    relevant=relevant.concat(alternatives.slice(0,5-relevant.length).map(t=>({...t,matchReason:t.matchReason||'Nearby professional'})));
  }
  return relevant.slice(0,8);
};

/* Richer technician card: distance, ETA, verification, price reference and no-degree skill story. */
techCard = function(t){
  const fav=db.favourites.includes(t.id);
  const reason=t.matchReason||'Nearby professional';
  return `<article class="tech-card reveal-card">
    <div class="tech-top"><div class="avatar large">${initials(t.name)}</div><div class="grow"><h3>${esc(t.name)} ${t.verified?'<span class="verified">✓ Verified</span>':''}</h3><p>${esc(t.service)} · ${t.exp}+ years practical experience</p><div class="rating">★ ${t.rating} <small>(${t.reviews} reviews)</small></div></div><button class="heart ${fav?'saved':''}" onclick="toggleFavourite(${t.id});event.stopPropagation()">${fav?'♥':'♡'}</button></div>
    <div class="tech-tags"><span>📍 ${Number(t.distance||0).toFixed(1)} km</span><span>⏱️ ~${Number(t.eta||Math.max(5,Math.round(Number(t.distance||2)*4)))} min</span><span>${t.available?'🟢 Available':'🔴 Busy'}</span></div>
    <div class="trust-row"><span class="badge green">${esc(reason)}</span>${t.skillVerified||t.verified?'<span class="badge">Skill checked</span>':''}<span class="badge">No degree required · Skill first</span></div>
    <div class="skills">${(t.skills||[]).slice(0,4).map(s=>`<span>${esc(s)}</span>`).join('')}</div>
    <div class="tech-bottom"><div><small>Transparent starting price</small><strong>${money(t.price)}</strong><small>No hidden platform fee</small></div><span class="jobs">${t.jobs||0} jobs · ${t.response||0}% response</span></div>
    <div class="card-actions"><button class="btn ghost" onclick="techDetails(${t.id})">Full profile</button><button class="btn primary" onclick="startBooking('${esc(t.category)}',${t.id})">Book technician</button></div>
  </article>`;
};

/* Customer booking form: capture an actual issue photo/video as base64 for admin/technician review. */
nextBooking1 = async function(){
  const p=document.getElementById('book-problem')?.value.trim();
  if(!p){toast('Please describe the problem.');return;}
  const input=document.getElementById('book-file');
  let media=[];
  try{
    if(input?.files?.[0]) media=[await nfReadFile(input.files[0])];
  }catch(e){toast(e.message);return;}
  state.bookingDraft={...(state.bookingDraft||{}),problem:p,service:state.service,file:input?.files?.[0]?.name||'',media};
  bookingStep(2);
};
window.nextBooking1=nextBooking1;

/* Create booking with evidence + location. */
window.createBooking=async function(){
  const d=state.bookingDraft; const t=tech(state.selectedTech)||bestMatch(d?.service); const u=currentUser();
  if(!u||u.role!=='customer'||!d||!t){toast('Please select a valid technician from the customer booking flow.');return;}
  try{
    const r=await nfFetch('/api/bookings',{method:'POST',body:JSON.stringify({technicianId:t.id,service:d.service,problem:d.problem,file:d.file||'',media:d.media||[],location:d.location,date:d.date,time:d.time,budget:d.budget,radius:db.settings.radius,urgent:state.quick,latitude:db.settings.userLat,longitude:db.settings.userLng})});
    applyServerState(await nfFetch('/api/bootstrap')); closeModal(); setRoute('bookings'); toast(`Booking #${String(r.booking.id).slice(-6)} sent to ${t.name}.`); state.quick=false;
  }catch(e){toast(e.message);}
};

/* Cancellation flow. */
window.cancelBooking=function(id){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return;
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">CANCEL REQUEST</span><h2>Cancel booking?</h2><p class="muted">Booking #${String(id).slice(-6)} · ${esc(b.service)}</p></div><button class="close" onclick="closeModal()">×</button></div><div class="form-field"><label>Reason</label><select id="cancel-reason"><option>Changed my mind</option><option>Technician unavailable</option><option>Found another solution</option><option>Price concern</option><option>Duplicate request</option><option>Other</option></select></div><div class="location-note"><span>🛡️</span><div><b>Fair cancellation</b><small>If a payment already exists, NearFix will flag it for admin refund review.</small></div></div><div class="modal-footer"><button class="btn ghost" onclick="closeModal()">Keep booking</button><button class="btn danger" onclick="confirmCancelBooking(${id})">Cancel booking</button></div></div></div>`;
};
window.confirmCancelBooking=async function(id){
  const reason=document.getElementById('cancel-reason')?.value||'Cancelled by user';
  try{await nfFetch(`/api/bookings/${id}`,{method:'PATCH',body:JSON.stringify({status:'CANCELLED',reason})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Booking cancelled.');}catch(e){toast(e.message);}
};

/* Evidence upload for technician/customer; admin can see and verify. */
window.uploadBookingEvidence=async function(id,type='WORK_EVIDENCE'){
  const input=document.getElementById(`evidence-file-${id}`); if(!input?.files?.[0]){toast('Choose a photo/video first.');return;}
  try{const media=await nfReadFile(input.files[0]); await nfFetch(`/api/bookings/${id}/media`,{method:'POST',body:JSON.stringify({type,data:media.data,name:media.name})});applyServerState(await nfFetch('/api/bootstrap'));bookingDetails(id);toast('Evidence uploaded. Admin can review it now.');}catch(e){toast(e.message);}
};
window.verifyBookingEvidence=async function(id,approved){
  const note=document.getElementById(`verify-note-${id}`)?.value.trim()||'';
  try{await nfFetch(`/api/admin/bookings/${id}/verify`,{method:'PATCH',body:JSON.stringify({approved,notes:note})});applyServerState(await nfFetch('/api/bootstrap'));bookingDetails(id);toast(approved?'Work verified. Customer can pay.':'Evidence rejected; technician needs to resubmit.');}catch(e){toast(e.message);}
};

/* Replace booking details with a trust-first workflow. */
bookingDetails = async function(id){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return; const t=tech(b.techId); const role=currentUser()?.role; const quote=b.quote; const media=Array.isArray(b.media)?b.media:[];
  const nextTech={Accepted:'On the way','On the way':'Arrived',Arrived:'Inspection',Inspection:'Service started','Service started':'Completed'};
  const canCancelCustomer=role==='customer' && !['Completed','Cancelled','Service started','Inspection','Awaiting approval'].includes(b.status);
  const canCancelTech=role==='technician' && ['Requested','Accepted','On the way','Arrived'].includes(b.status);
  const evidence=media.map(m=>`<div class="evidence-card"><img src="${esc(m.data)}" alt="${esc(m.name||'Evidence')}" loading="lazy"><div><b>${esc(m.type)}</b><small>${esc(m.name||'Evidence')} · ${esc(m.uploadedRole||'user')}</small></div></div>`).join('');
  const verification=b.workVerification||{status:'PENDING',notes:''};
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide">
    <div class="modal-head"><div><span class="eyebrow">SERVICE CONTROL · #${String(id).slice(-6)}</span><h2>${esc(b.service)}</h2><p class="muted">${esc(b.date||'')} · ${esc(b.time||'')} · ${esc(b.location||'Location not shared')}</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="status-banner"><span class="status">${esc(b.status)}</span><b>${money(b.total||b.estimate||0)}</b></div><div class="payment-status-strip"><span>💳 Payment: <b>${esc(b.paymentStatus||'PENDING')}</b></span>${b.payment?.method?`<span>Method: <b>${esc(b.payment.method)}</b></span>`:''}${b.payment?.transactionId?`<span>Txn: <b>${esc(b.payment.transactionId)}</b></span>`:''}${b.invoice?.number?`<span>Invoice: <b>${esc(b.invoice.number)}</b></span>`:''}</div>
    <div class="trust-strip"><span>🛡️ Admin verification: <b>${esc(verification.status)}</b></span><span>💰 Transparent quote: <b>${quote?'Itemized':'Pending inspection'}</b></span><span>📍 GPS: <b>${b.latitude&&b.longitude?'Captured':'Address only'}</b></span></div>
    <div class="detail-grid"><div class="panel-lite"><small>Problem reported</small><p>${esc(b.problem||'—')}</p></div><div class="panel-lite"><small>Price protection</small><p>Parts use the shared NearFix catalog. Additional work requires an itemized quotation and customer approval.</p></div>${role==='technician'?`<div class="panel-lite"><small>Customer</small><b>${esc(b.customer?.name||'Customer')}</b><p>${esc(b.customer?.phone||'Phone not shared')} · ${esc(b.customer?.email||'')}</p></div>`:''}${role==='customer'&&t?`<div class="panel-lite"><small>Assigned technician</small><b>${esc(t.name)}</b><p>${esc(t.service)} · ${t.distance??'—'} km · ★ ${t.rating}</p></div>`:''}</div>
    <div class="timeline">${timeline(b)}</div>
    ${role==='customer'&&b.status==='Arrived'?`<section class="arrival-otp-card"><div><span class="eyebrow">ARRIVAL VERIFICATION</span><h3>Technician has arrived</h3><p>Share the one-time code with the technician only when they are physically at your location. The service cannot move to inspection until this code is verified.</p></div><button class="btn primary" onclick="showArrivalOtp(${id})">🔐 View arrival OTP</button></section>`:''}
    ${role==='technician'&&b.status==='Arrived'?`<section class="arrival-otp-card technician"><div><span class="eyebrow">CUSTOMER CHECK-IN</span><h3>Get customer OTP</h3><p>Ask the customer for the arrival OTP. Do not start inspection until NearFix verifies it.</p></div><button class="btn primary" onclick="verifyArrivalOtp(${id})">🔐 Verify customer OTP</button></section>`:''}
    ${media.length?`<section class="evidence-section"><div class="panel-head"><div><b>Service evidence</b><small>Visible to customer, technician and admin.</small></div></div><div class="evidence-grid">${evidence}</div></section>`:''}
    ${role==='technician' && ['Arrived','Inspection','Service started','Completed'].includes(b.status)?`<section class="panel-lite evidence-upload"><b>Upload work evidence</b><small>Send a clear before/after/service photo. Admin reviews it before payment release.</small><input id="evidence-file-${id}" type="file" accept="image/*,video/*"><div class="inline-actions"><button class="btn secondary" onclick="uploadBookingEvidence(${id},'BEFORE')">📷 Upload before</button><button class="btn primary" onclick="uploadBookingEvidence(${id},'AFTER')">📷 Upload after/work</button></div></section>`:''}
    ${role==='admin'?`<section class="panel-lite"><div class="panel-head"><div><b>Admin verification</b><small>Review work photos and verify the completed job.</small></div><span class="badge ${verification.status==='VERIFIED'?'green':''}">${esc(verification.status)}</span></div>${media.length?`<div class="evidence-grid">${evidence}</div>`:'<p class="muted">No evidence uploaded yet.</p>'}<textarea id="verify-note-${id}" placeholder="Verification note / reason">${esc(verification.notes||'')}</textarea><div class="inline-actions"><button class="btn danger" onclick="verifyBookingEvidence(${id},false)">Reject / Request resubmission</button><button class="btn primary" onclick="verifyBookingEvidence(${id},true)">✓ Verify work</button></div></section>`:''}
    ${quote?`<section class="panel-lite"><div class="match-title"><b>Itemized quotation</b><span class="badge ${quote.status==='APPROVED'?'green':''}">${esc(quote.status)}</span></div><p>${esc(quote.reason||'')}</p><div class="review-grid"><div><small>Labour</small><b>${money(quote.labour)}</b></div><div><small>Catalog parts</small><b>${money(quote.parts)}</b></div><div><small>Other</small><b>${money(quote.otherCharges)}</b></div><div><small>Total</small><b>${money(quote.total)}</b></div></div>${quote.pricingAudit?`<div class="price-audit ${quote.pricingAudit.requiresAdminReview?'warn':'ok'}"><b>${quote.pricingAudit.requiresAdminReview?'⚠️ Admin price review required':'✓ Within shared catalog reference'}</b><small>Parts reference: ${money(quote.pricingAudit.catalogPartsTotal)} · markup: ${Number(quote.pricingAudit.markupPercent||0).toFixed(1)}%</small>${(quote.pricingAudit.warnings||[]).map(w=>`<span>${esc(w)}</span>`).join('')}</div>`:''}${role==='customer'&&quote.status==='PENDING'?`<div class="modal-footer"><button class="btn ghost" onclick="approveQuote(${id},'reject')">Decline</button><button class="btn primary" onclick="approveQuote(${id},'approve')">Approve ₹${Number(quote.total).toLocaleString('en-IN')}</button></div>`:''}</section>`:''}
    ${b.cancellation?`<div class="location-note"><span>✕</span><div><b>Cancelled</b><small>${esc(b.cancellation.reason||'No reason')} · ${esc(b.cancellation.role||'user')}</small>${b.refundStatus?`<small>Refund: ${esc(b.refundStatus)}</small>`:''}</div></div>`:''}
    <div class="modal-footer">
      ${role==='technician'&&b.status==='Inspection'?`<button class="btn primary" onclick="closeModal();openQuote(${id})">Create quotation →</button>`:''}
      ${role==='technician'&&nextTech[b.status]?`<button class="btn primary" onclick="closeModal();advanceBooking(${id},'${nextTech[b.status]}')">${nextTech[b.status]==='Completed'?'Complete service':'Update to '+nextTech[b.status]} →</button>`:''}
      ${role==='customer'&&b.status==='Completed'&&quote?.status==='APPROVED'&&verification.status==='VERIFIED'&&!b.paymentStatus?.includes('PAID')?`<button class="btn primary" onclick="closeModal();paymentModal(${id})">💳 Pay securely</button>`:''}
      ${role==='customer'&&b.status==='Completed'&&quote?.status==='APPROVED'&&verification.status!=='VERIFIED'&&!b.paymentStatus?.includes('PAID')?`<span class="muted">Payment unlocks after admin verifies work evidence.</span>`:''}
      ${b.status==='On the way'&&role==='customer'?`<button class="btn secondary" onclick="tracking(${id})">📍 Live Map</button>`:''}
      ${role==='customer'&&t?.phone?`<button class="btn whatsapp-btn" onclick="whatsappTechnician(${id})">💬 WhatsApp Technician</button>`:''}
      ${role==='customer'&&canCancelCustomer?`<button class="btn danger" onclick="cancelBooking(${id})">Cancel booking</button>`:''}
      ${role==='technician'&&canCancelTech?`<button class="btn danger" onclick="cancelBooking(${id})">Reject / cancel</button>`:''}
      ${role==='technician'&&b.status==='Inspection'?`<button class="btn secondary" onclick="setRoute('scanner');closeModal()">▣ Scan part</button>`:''}
      ${role==='customer'&&t?.lat&&t?.lng?`<button class="btn secondary" onclick="openDirectionsToTechnician(${t.id})">🧭 Directions</button>`:''}
      ${b.status==='Completed'&&role==='customer'&&!db.reviews.some(r=>String(r.bookingId)===String(id))?`<button class="btn secondary" onclick="reviewBooking(${id})">⭐ Rate service</button>`:''}
      <button class="btn ghost" onclick="openChat(${id})">💬 Chat</button>
    </div>
  </div></div>`;
};
window.bookingDetails=bookingDetails;

/* Razorpay Standard Checkout, test-ready. The server creates the order and verifies the signature. */
window.paymentModal=async function(id){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return;
  let qr=null; try{qr=await nfFetch(`/api/payments/${encodeURIComponent(id)}/qr`);}catch(e){qr={error:e.message};}
  let cfg={enabled:false}; try{cfg=await nfFetch('/api/payment/config');}catch(e){}
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box wide">
    <div class="modal-head"><div><span class="eyebrow">FINAL PAYMENT</span><h2>Pay for completed service</h2><p class="muted">Booking #${String(id).slice(-6)}</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="pay-total"><span>Final approved amount</span><b>${money(b.total||b.estimate)}</b></div>
    ${qr&&!qr.error?`<section class="upi-qr-card"><div class="upi-qr-copy"><span class="badge green">PAYMENT QR READY</span><h3>Scan & pay with any UPI app</h3><p>Scan this QR using GPay, PhonePe, Paytm or another UPI app. Pay only the approved NearFix amount.</p><div class="detail-grid"><div class="panel-lite"><small>Pay to</small><b>${esc(qr.payee)}</b></div><div class="panel-lite"><small>UPI ID</small><b>${esc(qr.upiId)}</b></div><div class="panel-lite"><small>Amount</small><b>${money(qr.amount)}</b></div></div></div><div class="upi-qr-image"><img src="${esc(qr.qrImageUrl)}" alt="NearFix UPI payment QR"><small>Booking #${String(id).slice(-6)}</small><a class="btn secondary" href="${esc(qr.upiUri)}">Open UPI app</a></div></section>`:`<div class="location-note"><span>ℹ️</span><div><b>UPI QR unavailable</b><small>${esc(qr?.error||'Technician payment account is not configured yet.')}</small></div></div>`}
    <div class="payment-choice-grid payment-choice-two"><button class="pay-option" onclick="openManualPayment(${id},'UPI')"><span>📲</span><b>UPI</b><small>Scan QR, then submit UTR/reference</small></button><button class="pay-option" onclick="openManualPayment(${id},'CASH')"><span>💵</span><b>Cash</b><small>Technician confirms cash received</small></button>${cfg.enabled?`<button class="pay-option" onclick="startRazorpayPayment(${id})"><span>🔒</span><b>Secure Checkout</b><small>Razorpay test gateway</small></button>`:''}</div>
    <div class="location-note"><span>🛡️</span><div><b>Payment status is shared</b><small>After verification, the paid status and invoice are visible to customer, technician and admin.</small></div></div>
  </div></div>`;
};
window.openManualPayment=function(id,method){
  const b=db.bookings.find(x=>String(x.id)===String(id)); if(!b)return;
  modal().innerHTML=`<div class="modal" onclick="if(event.target===this)closeModal()"><div class="modal-box"><div class="modal-head"><div><span class="eyebrow">${method==='CASH'?'CASH':'UPI'} PAYMENT</span><h2>${method==='CASH'?'Confirm cash handover':'Confirm UPI payment'}</h2><p class="muted">Amount ${money(b.total||b.estimate)}</p></div><button class="close" onclick="closeModal()">×</button></div>${method==='UPI'?`<div class="upi-pay-box"><b>Pay using the NearFix QR</b><p>Scan the QR on the previous screen, complete payment, then enter the UTR / transaction reference below.</p><label>UPI transaction / UTR</label><input id="manual-payment-ref" placeholder="e.g. 426781234567"><small class="muted">Payment remains pending until the assigned technician or admin verifies it.</small></div>`:`<div class="cash-pay-box"><b>Cash payment</b><p>Hand the exact approved amount to the assigned technician. The technician confirms receipt and the payment status then updates for both accounts.</p></div>`}<div class="modal-footer"><button class="btn ghost" onclick="paymentModal(${id})">Back</button><button class="btn primary" onclick="submitManualPayment(${id},'${method}')">Submit for verification →</button></div></div></div>`;
};
window.submitManualPayment=async function(id,method){
  try{const ref=document.getElementById('manual-payment-ref')?.value.trim()||''; const r=await nfFetch('/api/payments/manual',{method:'POST',body:JSON.stringify({bookingId:id,method,reference:ref})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast(r.message||'Payment submitted for verification.');}catch(e){toast(e.message);}
};
window.verifyManualPayment=async function(paymentId){
  try{const r=await nfFetch(`/api/payments/${encodeURIComponent(paymentId)}/verify`,{method:'PATCH',body:JSON.stringify({})});applyServerState(await nfFetch('/api/bootstrap'));render();toast(r.message||'Payment verified.');}catch(e){toast(e.message);}
};

window.startRazorpayPayment=async function(id){
  try{
    const r=await nfFetch('/api/payments/order',{method:'POST',body:JSON.stringify({bookingId:id})});
    if(!window.Razorpay){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.onload=resolve;script.onerror=()=>reject(new Error('Razorpay checkout could not load.'));document.head.appendChild(script);});}
    const b=db.bookings.find(x=>String(x.id)===String(id));
    const options={key:r.keyId,amount:r.order.amount,currency:r.order.currency,name:'NearFix',description:`NearFix booking #${String(id).slice(-6)}`,order_id:r.order.id,handler:async function(resp){try{await nfFetch('/api/payments/verify',{method:'POST',body:JSON.stringify({bookingId:id,orderId:resp.razorpay_order_id,paymentId:resp.razorpay_payment_id,signature:resp.razorpay_signature})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast('Payment verified successfully.');}catch(e){toast(e.message);}},prefill:{name:b?.customer?.name||currentUser()?.name||'',email:b?.customer?.email||currentUser()?.email||'',contact:b?.customer?.phone||currentUser()?.phone||''},theme:{color:'#0b67f1'}};
    new window.Razorpay(options).open();
  }catch(e){toast(e.message);}
};
window.completeOfflinePayment=async function(id){try{const r=await nfFetch('/api/payments',{method:'POST',body:JSON.stringify({bookingId:id,method:'Offline demo'})});applyServerState(await nfFetch('/api/bootstrap'));closeModal();render();toast(`Demo payment recorded · ${r.payment.transactionId}`);}catch(e){toast(e.message);}};

/* Fixed NearFix AI Guide: visible on app open, anchored bottom-right, and independent of page content. */
function ensureAIAssistantWidget(){
  if(document.getElementById('nearfix-ai-widget')) return;
  const wrap=document.createElement('div');
  wrap.id='nearfix-ai-widget';
  wrap.innerHTML=`
    <button id="nearfix-ai-launcher" class="nf-ai-launcher" aria-label="Open NearFix AI Guide" onclick="toggleAIAssistant(true)">
      <span class="nf-ai-launcher-icon">🤖</span><span class="nf-ai-launcher-text">NearFix AI</span><span class="nf-ai-pulse"></span>
    </button>
    <section id="nearfix-ai-panel" class="nf-ai-panel" aria-label="NearFix AI Guide">
      <header class="nf-ai-head">
        <div class="nf-ai-title"><span class="nf-ai-avatar">🤖</span><div><b>NearFix AI Guide</b><small>Instant help before you book</small></div></div>
        <button class="nf-ai-close" onclick="toggleAIAssistant(false)" aria-label="Close AI Guide">×</button>
      </header>
      <div id="nearfix-ai-log" class="nf-ai-log"><div class="nf-ai-msg bot">Hi! 👋 Tell me what is wrong at home. I can suggest the right service, safe next steps and help you find nearby technicians.</div></div>
      <div class="nf-ai-suggestions">
        <button onclick="aiChatAsk('AC se paani leak ho raha hai')">AC leaking</button>
        <button onclick="aiChatAsk('Mera switch spark kar raha hai')">Electrical issue</button>
        <button onclick="aiChatAsk('Pipe leak ho raha hai')">Pipe leakage</button>
        <button onclick="aiChatAsk('Washing machine drain nahi kar rahi')">Appliance issue</button>
      </div>
      <div class="nf-ai-compose"><input id="nearfix-ai-input" placeholder="Describe your problem..." onkeydown="if(event.key==='Enter')aiChatAsk(this.value)"><button onclick="aiChatAsk(document.getElementById('nearfix-ai-input').value)">Send</button></div>
      <div class="nf-ai-note">AI guidance is preliminary. Share photos for better context.</div>
    </section>`;
  document.body.appendChild(wrap);
}
function toggleAIAssistant(open){
  ensureAIAssistantWidget();
  const panel=document.getElementById('nearfix-ai-panel');
  panel?.classList.toggle('open',open);
  if(open) setTimeout(()=>document.getElementById('nearfix-ai-input')?.focus(),80);
}
window.openCustomerAIChat=function(){ toggleAIAssistant(true); };
window.aiChatAsk=async function(text){
  ensureAIAssistantWidget(); const q=String(text||'').trim(); if(!q)return; toggleAIAssistant(true);
  const log=document.getElementById('nearfix-ai-log'); const input=document.getElementById('nearfix-ai-input'); if(input)input.value='';
  log.insertAdjacentHTML('beforeend',`<div class="nf-ai-msg user">${esc(q)}</div><div class="nf-ai-msg bot ai-thinking">Thinking…</div>`); const thinking=log.querySelector('.ai-thinking');
  try{if(nfToken){const r=await nfFetch('/api/ai/chat',{method:'POST',body:JSON.stringify({message:q})});const svc=r.service||'General Repair';thinking.innerHTML=`${esc(r.reply)}<div class="nf-ai-actions"><button onclick="state.service='${svc}';setRoute('find');toggleAIAssistant(false)">Find ${esc(svc)} technicians →</button><button onclick="state.service='${svc}';openAIAnalyzer()">Full diagnosis</button></div>`;}else{let svc='General Repair',reply='Tell me the appliance/service, exact symptom and whether it is urgent.';if(/ac|air conditioner|cooling|gas/i.test(q)){svc='AC Repair';reply='This sounds like an AC issue. If water is leaking, switch it off safely and avoid opening electrical panels.';}else if(/pipe|leak|tap|water|plumb/i.test(q)){svc='Plumbing';reply='This looks like a plumbing issue. If water is actively leaking, close the nearest isolation valve if safe.';}else if(/switch|spark|wire|electric|fan|mcb|socket/i.test(q)){svc='Electrical';reply='This sounds electrical. If you see sparks or burning smell, switch off the affected circuit if safe and avoid live wiring.';}else if(/washing|fridge|microwave|appliance/i.test(q)){svc='Appliance Repair';reply='This sounds like an appliance repair. A clear photo/video and model number can help the technician prepare.';}thinking.innerHTML=`${esc(reply)}<div class="nf-ai-actions"><button onclick="state.service='${svc}';setRoute('find');toggleAIAssistant(false)">Find ${svc} technicians →</button></div>`;}}catch(e){thinking.innerHTML=`${esc(e.message||'AI assistant is temporarily unavailable.')}<div class="nf-ai-actions"><button onclick="setRoute('find');toggleAIAssistant(false)">Browse technicians</button></div>`;} thinking.classList.remove('ai-thinking'); log.scrollTop=log.scrollHeight;
};

/* Re-run render after overrides so the active screen immediately uses the production layer. */
try{render();}catch(e){console.warn('NearFix final render:',e.message);}
try{
  ensureAIAssistantWidget();
  const aiRole=currentUser()?.role;
  if(!aiRole||aiRole==='customer') setTimeout(()=>toggleAIAssistant(true),650);
}catch(e){console.warn('NearFix AI widget:',e.message);}
