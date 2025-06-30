import {database as db} from './firebaseConfig';
import {ref, child, get, increment, update, onValue} from 'firebase/database';
import {snap} from "gsap/gsap-core";

export function addView(){
    const dbRef = ref(db);
    console.log('Adding view...');
    let updates = {};
    updates['views'] = increment(1);
    update(dbRef, updates);
}

export function addDevView(){
    const dbRef = ref(db);
    console.log('Adding development view...');
    let updates = {};
    updates['devViews'] = increment(1);
    update(dbRef, updates);
}