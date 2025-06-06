<script lang="ts">
    import { initializeApp } from 'firebase/app';
    import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
    import {firebaseConfig} from '$lib/authUtility';
    import {type News, publishNews} from '$lib/utility';
    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);

</script>
