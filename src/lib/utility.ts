import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function uploadImage(file:File, path:string){
    const storage = getStorage();
    const storageRef = ref(storage,path);
    await uploadBytes(storageRef,file);
    return getDownloadURL(storageRef);
}

import { initializeApp } from 'firebase/app';
    import { addDoc, collection, getFirestore, Timestamp, getDocs } from 'firebase/firestore';
    import {firebaseConfig} from '$lib/authUtility';
    import { getAuth } from 'firebase/auth';
    

export interface News{
        title:string
        iconImg:string
        bigImg:string
        timestamp:Date
        author:string
        content:string
    }

export async function publishNews(news:News){
    const user = getAuth().currentUser;
    if(!user)throw new Error("Utente non autenticato");
    const newsToPublish = {...news,timestamp:Timestamp.fromDate(news.timestamp)} 

    try{
        alert(user.uid);
        await addDoc(collection(db,'users',user.uid,'news'),newsToPublish);
    }
    catch(error){
        alert("Something went wrong..."+error);
    }
}


export async function getNewsPerUtente(){
    const user = getAuth().currentUser;
    if (!user) return [];
    const snapshot = await getDocs(collection(db, 'users', user.uid, 'news'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(), // conversione inversa
    })) as unknown as News[];
}