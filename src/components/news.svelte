<script lang="ts">
    import { initializeApp } from 'firebase/app';
    import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
    import {firebaseConfig} from '$lib/authUtility';
    import { getAuth } from 'firebase/auth';
    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);

    interface News{
        title:string
        iconImg:string
        bigImg:string
        timestamp:Date
        author:string
    }
    async function publishNews(news:News){
        const user = getAuth().currentUser;
        if(!user)throw new Error("Utente non autenticato");
        const newsToPublish = {...news,timestamp:Timestamp.fromDate(news.timestamp)} 

        try{
            await addDoc(collection(db,'users',user.uid,'news'),newsToPublish);
        }
        catch(error){
            alert("Something went wrong...");
        }
    }
</script>
