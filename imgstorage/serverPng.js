import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
const result = dotenv.config();
process.env = result.parsed || {};
//console.log('dotenv result:', result); // should show { parsed: { ... } }
//console.log(process); // undefined
function generateUniqueCID() {
    const now = new Date().toISOString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const input = `${now}-${randomBytes}`;
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    const cid = `bay${hash}`;
    return cid;
}

function generateShortCID() {
  const now = new Date().toISOString();
  const randomBytes = crypto.randomBytes(12).toString('hex'); // fewer bytes
  const input = `${now}-${randomBytes}`;
  const hash = crypto.createHash('sha256').update(input).digest('hex'); // base64url for URL safety
  return `ozone${hash.slice(0, 40)}`; // shorter unique string
}

// Example usage
//const cid = generateShortCID();
//console.log('Generated CID:', cid);


function viewCIDFolder(cid) {
    const basePath = path.join(process.env.FOLDER_ROOT, cid);
  
    if (!fs.existsSync(basePath)) {
      console.error('❌ CID folder does not exist:', basePath);
      return;
    }
  
    console.log(`📂 Viewing contents of: ${basePath}`);
    const entries = fs.readdirSync(basePath);
  
    entries.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(basePath, file);
        const stats = fs.statSync(filePath);
        console.log(` - ${file} (${stats.size} bytes)`);
      }
    });
  }
  
  // Example usage
  //const foldercid = 'bayfe631be98b805b3aa1e91f2ae78b5881994338ef2b3fd0af000b1af0d68cc6d3';
  //viewCIDFolder(foldercid);



  function process(tmpPath) {
    const rootcid = generateShortCID();
    //console.log('Generated CID:', rootcid);
    //console.log('process.env.FOLDER_ROOT:', process.env);
    const destinationFolder = path.join(process.env.FOLDER_ROOT, rootcid);
    //const tmpPath = process.env.FOLDER_PICK;
    const indexPath = path.join(process.env.FOLDER_HTML,process.env.HTML);
    let html = fs.readFileSync(indexPath, 'utf-8');
    let tablehtml=''; 
    let content= {'contract': rootcid, 'cid': rootcid, 'name': toDisplayName(path.basename(tmpPath)), 'NFTs': [],'baseURL': `https://${rootcid}.ozonestore.io` ,'tokennames': []};

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true }); // ensures parent dirs are created if missing
      //console.log(`Folder created at: ${destinationFolder}`);
    } else {
      return;
    }
    let i=1;
    //console.log(`📂 Viewing contents of: ${tmpPath}`);
    const entries = fs.readdirSync(tmpPath).filter(file => file.endsWith('.png'));
    tablehtml+=`<td class="heading" colspan="3">../${rootcid}</td></tr>`;
    entries.forEach(file => {
      
        const imagepath = path.join(tmpPath, file);
        const destinationPath = path.join(destinationFolder, i+'.json');
        //const fileName = path.basename(filePath); 
        let fileNameWithoutExt = path.parse(imagepath).name; // → file
        fileNameWithoutExt = fileNameWithoutExt.replace("freepik__a-","");
        fileNameWithoutExt = fileNameWithoutExt.replace("freepik__a","");
        //console.log(`Processing file: ${fileNameWithoutExt}`);
        // Read file content
        //const data = fs.readFileSync(filePath, 'utf-8');
        const json = {};
        json.name = content.name +"__" + i;
        json.description= fileNameWithoutExt;
        json.image= "",
        json.amount= "0.223295",
        json.tokenid = i; // Add tokenid field
      
        const stats = fs.statSync(imagepath);
        

        const imgcid = generateShortCID();
        const imgnewPath = path.join(process.env.FOLDER_ROOT, imgcid);
        if (!fs.existsSync(imgnewPath)) {
          fs.mkdirSync(imgnewPath, { recursive: true }); // ensures parent dirs are created if missing
          //console.log(`Image folder created at: ${imgnewPath}`);
          
          const destinationimgPath = path.join(imgnewPath, `default.png`);
        
          fs.copyFileSync(imagepath, destinationimgPath);
        }
        // Add or update an attribute
        json.image = 'https://'+imgcid+'.ozonestore.io'; // Change 'newAttribute' and 'newValue' as needed

        // Write it back
        fs.writeFileSync(destinationPath, JSON.stringify(json, null, 2), 'utf-8');
        content.NFTs.push(json);
        content.tokennames.push(json.name);
        //console.log(`Moved & updated ${file} to ${destinationFolder}`);

        tablehtml+=`<tr><td><a href="${i+'.json'}" target="_self">${i+'.json'}</a></td><td><a href="${json.image}" target="_self">${imgcid}</a></td><td>${stats.size} B </td></tr>`;
        i=i+1;
    
    });

    // Replace text - example: replace 'Hello' with 'Hi'
    html = html.replace(/#head/g, rootcid);
    const replacedHtml = html.replace(/#table/g, tablehtml);
    
    // Write to the same file or a new file
    fs.writeFileSync(path.join(destinationFolder, process.env.HTML), replacedHtml, 'utf-8');
    
    fs.writeFileSync(path.join(process.env.FOLDER_ROOT, rootcid+'.json'), JSON.stringify(content, null, 2), 'utf-8');    
    
    console.log(`✅ ${content.baseURL}`);
    
  }
  
  function toDisplayName(snakeCaseName) {
    return snakeCaseName
      .split('_')                            // Split by underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ');                            // Join with space
  }
  

  const tmpPath = process.env.FOLDER_PICK;
  const entries = fs.readdirSync(tmpPath);
  entries.forEach(file => {
    const fullPath = path.join(tmpPath, file);
    const stats = fs.statSync(fullPath);
  
    if (stats.isDirectory()) {
      process(fullPath);
    }
  });

  //process('archive\parrot');


