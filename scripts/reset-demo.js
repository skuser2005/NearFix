const fs = require('fs');
const path = require('path');
const file = path.join(__dirname,'..','backend','data','data.json');
try { fs.rmSync(file,{force:true}); console.log('NearFix demo database reset. It will be recreated automatically on next start.'); }
catch(e){ console.error(e.message); process.exit(1); }
