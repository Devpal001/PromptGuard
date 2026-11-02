import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { Presentation, PresentationFile } = await import(pathToFileURL('C:/Users/singh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs').href);

const W = 1280, H = 720;
const C = { bg:'#F3F1EC', paper:'#FBFAF7', sunk:'#ECE9E2', ink:'#161514', muted:'#5E5A55', line:'#D8D4CC', red:'#CC2A21', redSoft:'#FDF0EE', green:'#276447', amber:'#80520D', white:'#FFFFFF' };
const FONT = 'Arial';
const p = Presentation.create({slideSize:{width:W,height:H}});

function shape(slide, geometry, x,y,w,h, fill='none', lineFill='none', lineWidth=0, name='shape') {
  return slide.shapes.add({geometry,name,position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:lineFill,width:lineWidth}});
}
function rect(slide,x,y,w,h,fill,opts={}) { return slide.shapes.add({geometry:opts.radius?'roundRect':'rect',name:opts.name||'surface',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:opts.line||'none',width:opts.line?1:0},...(opts.radius?{borderRadius:opts.radius}:{}),...(opts.shadow?{shadow:opts.shadow}:{})}); }
function text(slide,txt,x,y,w,h,size,color=C.ink,opts={}) {
  const t=shape(slide,'textbox',x,y,w,h,'none','none',0,opts.name||'text'); t.text=txt; t.text.style={typeface:FONT,fontSize:size,bold:!!opts.bold,color,alignment:opts.align||'left',verticalAlignment:opts.valign||'middle',wrap:true,autoFit:'shrinkText',insets:0}; return t;
}
function line(slide,x,y,w,h,color=C.line){shape(slide,'rect',x,y,w,h,color,'none',0,'rule');}
function base(slide,n,dark=false){
  slide.background.fill=dark?C.ink:C.bg;
  if(n>1){ text(slide,'PROMPTGUARD  /  PROJECT OVERVIEW',64,32,720,24,13,dark?'#C7C2BA':C.muted,{bold:true}); line(slide,64,70,1152,1,dark?'#3A3835':C.line); }
  if(n>1){ text(slide,String(n).padStart(2,'0'),1160,668,56,20,13,dark?'#C7C2BA':C.muted,{bold:true,align:'right'}); }
}
function title(slide,kicker,heading,sub=''){
  text(slide,kicker.toUpperCase(),64,96,1100,24,13,C.red,{bold:true});
  text(slide,heading,64,130,1130,72,46,C.ink,{bold:true});
  if(sub) text(slide,sub,64,208,1100,48,20,C.muted);
}
function item(slide,x,y,num,head,body,w=500){
  text(slide,num,x,y,46,34,17,C.red,{bold:true});
  text(slide,head,x+54,y,w-54,32,22,C.ink,{bold:true});
  text(slide,body,x+54,y+38,w-64,68,17,C.muted,{valign:'top'});
}

// 1 — Cover
{
  const s=p.slides.add(); base(s,1,true);
  rect(s,0,0,18,H,C.red);
  text(s,'PROJECT OVERVIEW  /  AI SECURITY',72,70,700,26,14,'#C9C4BC',{bold:true});
  text(s,'PromptGuard',72,158,880,90,76,C.white,{bold:true});
  text(s,'AI prompt injection\ndefense tester',72,258,760,142,52,C.white,{bold:true,valign:'top'});
  text(s,'A practical workspace for screening prompts and documents, then evaluating chatbot behavior.',76,438,650,72,22,'#D2CEC7',{valign:'top'});
  rect(s,900,170,260,260,C.red,{radius:42,shadow:'shadow-md'});
  text(s,'PG',900,190,260,220,94,C.white,{bold:true,align:'center'});
  line(s,72,614,1136,1,'#494641');
  text(s,'React  ·  FastAPI  ·  Rule-based screening',72,638,780,24,16,'#C9C4BC');
  text(s,'01 / 06',1090,638,118,24,15,'#C9C4BC',{bold:true,align:'right'});
}
// 2 — Problem and purpose
{
  const s=p.slides.add(); base(s,2); title(s,'01 / THE CHALLENGE','Prompt injection can arrive as content','Instructions may appear directly in a prompt or indirectly inside a document.');
  line(s,64,304,1152,2,C.ink);
  text(s,'DIRECT INPUT',64,338,480,26,14,C.red,{bold:true});
  text(s,'A user submits text',64,382,500,44,30,C.ink,{bold:true});
  text(s,'The app checks for suspicious instructions such as attempts to override the chatbot’s role or reveal hidden information.',64,446,490,116,20,C.muted,{valign:'top'});
  line(s,640,332,1,250,C.line);
  text(s,'INDIRECT INPUT',694,338,480,26,14,C.red,{bold:true});
  text(s,'A document carries text',694,382,500,44,30,C.ink,{bold:true});
  text(s,'PDF and TXT content is extracted and screened before a user decides whether to test the chatbot with it.',694,446,490,116,20,C.muted,{valign:'top'});
  rect(s,64,590,1152,46,C.redSoft,{radius:10});
  text(s,'Purpose: make suspicious content visible and keep the user in control of testing.',84,600,1090,26,17,C.ink,{bold:true});
}
// 3 — Workflow
{
  const s=p.slides.add(); base(s,3); title(s,'02 / THE WORKFLOW','A controlled two-stage check','Scanner verdict and chatbot behavior are evaluated separately.');
  const xs=[64,356,648,940], widths=[246,246,246,276], labels=['INPUT','SCAN','REVIEW','OPTIONAL TEST'];
  const heads=['Text or document','Rule-based checks','Verdict + evidence','Chatbot response'];
  const desc=['User enters a prompt or uploads a PDF/TXT file.','Patterns flag suspicious instructions in the content.','Review categories, excerpts, and any extraction warnings.','Test only after review; risky content needs confirmation.'];
  for(let i=0;i<4;i++){
    text(s,labels[i],xs[i],330,widths[i],22,13,C.red,{bold:true});
    rect(s,xs[i],365,widths[i],3,i===3?C.red:C.ink);
    text(s,heads[i],xs[i],390,widths[i],62,24,C.ink,{bold:true,valign:'top'});
    text(s,desc[i],xs[i],465,widths[i]-8,108,17,C.muted,{valign:'top'});
    if(i<3) text(s,'→',xs[i]+widths[i]+14,372,28,32,24,C.red,{bold:true,align:'center'});
  }
  line(s,64,602,1152,1,C.line);
  text(s,'Risky inputs pause for user confirmation. Blocked inputs are not sent to the chatbot.',64,620,1110,28,16,C.ink,{bold:true});
}
// 4 — Product areas
{
  const s=p.slides.add(); base(s,4); title(s,'03 / PRODUCT TOUR','One workspace, four testing tasks','The interface guides users from input review to clear interpretation.');
  const cols=[64,652], rows=[320,490];
  item(s,cols[0],rows[0],'01','Text Playground','Paste a prompt, scan it, review findings, and optionally test the demo chatbot.',540);
  item(s,cols[1],rows[0],'02','Document Scanner','Upload PDF or TXT files, inspect extracted text, and screen for embedded instructions.',540);
  item(s,cols[0],rows[1],'03','Test Results','Keep scanner findings distinct from chatbot evaluation in the current session.',540);
  item(s,cols[1],rows[1],'04','Settings','See the active demo mode and the workspace’s privacy and data-handling notes.',540);
  line(s,64,448,1152,1,C.line); line(s,64,618,1152,1,C.line);
}
// 5 — Architecture
{
  const s=p.slides.add(); base(s,5); title(s,'04 / TECHNICAL OVERVIEW','A small, modular web application','The browser interface calls a Python API through same-origin routes.');
  const y=330;
  const blocks=[
    {x:64,w:278,label:'FRONTEND',name:'React + Vite',detail:'Router · Axios · Lucide'},
    {x:500,w:278,label:'API',name:'FastAPI',detail:'Text scan · File scan · Test'},
    {x:936,w:280,label:'ANALYSIS',name:'Scanner + extractor',detail:'Rules · pypdf · TXT reader'}
  ];
  for(const b of blocks){
    rect(s,b.x,y,b.w,180,C.paper,{radius:18,shadow:'shadow-sm'});
    text(s,b.label,b.x+24,y+22,b.w-48,20,13,C.red,{bold:true});
    text(s,b.name,b.x+24,y+58,b.w-48,38,24,C.ink,{bold:true});
    text(s,b.detail,b.x+24,y+112,b.w-48,40,16,C.muted,{valign:'top'});
  }
  text(s,'→',370,390,72,38,32,C.red,{bold:true,align:'center'});
  text(s,'→',806,390,72,38,32,C.red,{bold:true,align:'center'});
  line(s,64,558,1152,1,C.line);
  text(s,'Deployment',64,584,180,26,16,C.red,{bold:true});
  text(s,'Vercel Services hosts the frontend and FastAPI service under one project.',244,584,940,30,18,C.ink);
  text(s,'Demo mode is simulated. Connected mode is optional and configured on the backend.',64,628,1100,28,15,C.muted);
}
// 6 — Boundaries and next steps
{
  const s=p.slides.add(); base(s,6); title(s,'05 / SCOPE','A screening aid, not a safety guarantee','The current version helps teams inspect content and learn from controlled tests.');
  text(s,'CURRENT BOUNDARIES',64,322,520,24,13,C.red,{bold:true});
  item(s,64,360,'—','Pattern-based detection','It can miss novel attacks and may flag benign text.',530);
  item(s,64,478,'—','Simulated chatbot mode','Demo responses do not represent a production model.',530);
  item(s,660,360,'—','No OCR','Image-only PDFs may contain no extractable text.',530);
  item(s,660,478,'—','Session-only results','The app does not keep persistent test history.',530);
  line(s,64,614,1152,2,C.ink);
  text(s,'NEXT',64,635,90,24,13,C.red,{bold:true});
  text(s,'Validate with authorized targets · expand test coverage · add OCR or history only when needed',170,632,1040,30,17,C.ink);
}

const outDir=path.resolve('renders'); await fs.mkdir(outDir,{recursive:true});
for(let i=0;i<p.slides.items.length;i++){
  const blob=await p.export({slide:p.slides.items[i],format:'png',scale:1});
  await fs.writeFile(path.join(outDir,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
const pptx=await PresentationFile.exportPptx(p); await pptx.save(path.resolve('draft.pptx'));
console.log(`Wrote ${p.slides.items.length} slides to draft.pptx`);
