
const URL = "http://localhost:3000";

async function load(){
    await init();
}

async function init(){
    hideLoader();
}


// -------------------- PANEL FUNCTIONS --------------------
function clearPanels() {
  document.getElementById("systemPanels").innerHTML = "";
}


function addPanel(title) {
  const panel = document.createElement("div");
  panel.className = "panel";
  const h3 = document.createElement("h3");
  h3.innerText = title;
  panel.appendChild(h3);
  document.getElementById("systemPanels").appendChild(panel);
  return panel;
}

function addRow(panel, field, value) {
  const row = document.createElement("div");
  row.className = "row";

  const f = document.createElement("div");

  if (field instanceof HTMLElement) {
    f.appendChild(field); row.appendChild(f); 
  }
  else {
    if(field!="") { f.innerText = field;  row.appendChild(f); }
  }

  const v = document.createElement("div");
  if (value instanceof HTMLElement) {
    // ⬅️ If value is HTML object → append it
    v.width = "100%";
    v.appendChild(value);
    
  } else if(typeof value === "string" && value.startsWith("0x")){
    v.className = "addr";
    const short = document.createElement("span");
    short.className = "shortAddr";
    short.innerText = value.slice(0,6) + "..." + value.slice(-4);

    const btn = document.createElement("button");
    btn.className="copyBtn";
    btn.innerText="📋";
    btn.onclick = ()=>{
      navigator.clipboard.writeText(value);
      btn.innerText="✓";
      setTimeout(()=>{ btn.innerText="📋"; },1000);
    };

    const balpanel = document.createElement("span");
    balpanel.className = "shortAddr";
    printRow(value,balpanel);

    v.appendChild(short);
    v.append(balpanel);
    v.appendChild(btn);
  } else {
    v.innerText = value;
  }

 
  row.appendChild(v);
  panel.appendChild(row);
}

async function send(){
    showLoader(); 

    const input = document.getElementById("textInput").value;
    await loadResponse(input);
}

// -------------------- LOAD SYSTEM --------------------
async function loadResponse(prompt) {
    clearPanels();

    const panelSys = addPanel("Agent Response");

    // Create a live updating container
    const streamBox = document.createElement("div");
    streamBox.style.whiteSpace = "pre-wrap";
    streamBox.style.wordBreak = "break-word";
    streamBox.style.fontFamily = "monospace";

    // Add empty row first
    addRow(panelSys, "", streamBox);

    try {
        const res = await fetch(URL + '/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let fullText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            fullText += chunk;

            // ✅ update panel live
            streamBox.innerText = fullText;
        }

    } catch (err) {
        console.error(err);
        addRow(panelSys, "Error", "Streaming failed");
    }

    hideLoader();
}

function copyWallet(){

    if(!currentAccount) return;

    navigator.clipboard.writeText(currentAccount);

}

function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

function getAgeDateRange(age) {
    const baseDate = new Date("2025-07-17T22:00:00"); // 10:00 PM

    // Start date = base + (age - 1) days
    const start = new Date(baseDate);
    start.setDate(start.getDate() + (age - 1));

    // End date = start + 1 day
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return {
        start: formatDate(start),
        end: formatDate(end)
    };
}

window.onload = load;