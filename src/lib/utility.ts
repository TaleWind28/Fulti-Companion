import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function uploadImage(file:File, path:string){
    const storage = getStorage();
    const storageRef = ref(storage,path);
    await uploadBytes(storageRef,file);
    return getDownloadURL(storageRef);
}   