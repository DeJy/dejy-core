
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

let _app = null;
let _auth = null;
let _db = null;
let _functions = null;
let _detachAuthListner = null;
let _authStatusReady = false;
let _authStatusRequest = [];
let _currenUser = null;

export function initFirebase(firebaseConfig) {

	// Initialize Firebase
	_app = initializeApp(firebaseConfig);
	_auth = getAuth(_app);
	_db = getFirestore(_app);
	_functions = getFunctions(_app, firebaseConfig.functionRegion || 'us-central1');
	if (firebaseConfig.functionEmulator) connectFunctionsEmulator(_functions, firebaseConfig.functionEmulatorHost || "localhost", firebaseConfig.functionEmulatorPort || 5001);
	_setAuthListner();
}

const _setAuthListner = () => {
	if (_detachAuthListner) _detachAuthListner();
	_detachAuthListner = _auth.onAuthStateChanged( user => {
		_authStatusReady = true;
		_currenUser = user;
		_authStatusRequest.forEach(cb => { 
			cb(user);
		})
		_authStatusRequest.length = 0;
	})
}

export function onAuthReady(cb) {
	if (_authStatusReady) cb(_auth.currentUser)
	else _authStatusRequest.push(cb);
}

export function getCurrentUser() {
	return _currentUser;
}


/* export callable function
export async function FNCNAME(params) {
	return await httpsCallable(_functions, 'fncName')(params);
}*/