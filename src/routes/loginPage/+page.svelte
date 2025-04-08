<script>
    import { goto } from '$app/navigation';
    import { registerUser, login} from '$lib/authUtility';
    import {updateProfile } from "firebase/auth";
    import CustomButton from '../../components/customButton.svelte';

    let email = "";
    let password = "";
    let userHome = "/userHomePage";
    let boolRegister = false;
    let username = "";
    function showRegistration(){
        if(boolRegister)boolRegister = false;
        else boolRegister = true;
    }

    function handleLogin(){
        if(email==="")
                alert("Inserisci l'email")
            ;
            
            if(password==="")
                alert("Inserisci la password")
            ;

        login(email,password).then(
        (userCredentials) => {
            const user = userCredentials.user;
            
            goto(userHome);
        })
    }

    async function handleRegister(){
       
        try {
            if(username===""){
                alert("Inserisci il nome utente");
                return;
            }
            
            if(email===""){
                alert("Inserisci l'email");
                return;
            }
            
            if(password===""){
                alert("Inserisci la password");
                return;
            }
            // Registra l'utente con email e password
            const userCred = await registerUser(email,password,username);

            // Aggiorna il profilo con l'username
            if (userCred && userCred.user) {

                // Reindirizza l'utente alla home page
                goto("/userHomePage");
            }
        } catch (error) {
            alert("Errore durante la registrazione: "+ error);
        }
    }
    
</script>

<div class="flex h-screen">
    <div class=" bg-teal-800 flex items-center justify-center text-white text-2xl w-full">
        <a href="/"><img src="src/images/Logo3.png" alt="pino" class="h-70 w-full"></a>
    </div>
    <div class="flex justify-center items-center gap-4 flex-col w-full">
        
        <div class="flex flex-col gap-4 items-center w-full">
            {#if boolRegister}
                <input id="username" type="text" bind:value={username} placeholder="username" class="px-4 py-2 rounded w-64">
            {/if}
            <input id="email" type="text" bind:value={email} placeholder="email" class="px-4 py-2 rounded w-64"> 
            <input id="password" type="password" bind:value={password} placeholder="password" class="px-4 py-2 rounded w-64">
        </div>    
        
        {#if !boolRegister}
            <CustomButton text="Accedi" type= button btnFun={handleLogin}/>
            <button on:click={showRegistration} class="underline">non possiedi un account? Registrati</button>
        {:else}
            <CustomButton text="Registrati" type= button btnFun={handleRegister}/>
            <button on:click={showRegistration} class="underline">Possiedi un account? Accedi</button>    
        {/if}

        
    </div>

</div>