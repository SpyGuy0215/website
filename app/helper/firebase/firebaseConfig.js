import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyBXbJInyG4CrnMctRebKvMfGc6_H_W5b84",
    authDomain: "portfolio-bd436.firebaseapp.com",
    projectId: "portfolio-bd436",
    storageBucket: "portfolio-bd436.firebasestorage.app",
    messagingSenderId: "644564848308",
    appId: "1:644564848308:web:63a1d2eee3b0a1548151e1",
    measurementId: "G-81270VPVWS"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);