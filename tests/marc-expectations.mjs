import fs from 'node:fs';
import {readISO2709} from '../src/iso-reader.js';
const files=['tests/browser-export.mrc','tests/screenshots/partial-export.mrc','tests/screenshots/direct-batch-20.mrc','tests/screenshots/real-direct.mrc','tests/screenshots/real-batch-20.mrc'];
fs.mkdirSync('.verification',{recursive:true});
fs.writeFileSync('.verification/marc-expected.json',JSON.stringify(files.map(file=>({file,records:readISO2709(fs.readFileSync(file))})),null,2));
