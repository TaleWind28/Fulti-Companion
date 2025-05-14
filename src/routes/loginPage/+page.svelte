<script>
    import { goto } from '$app/navigation';
    import { registerUser, login} from '$lib/authUtility';
    import {updateProfile } from "firebase/auth";
    import CustomButton from '../../components/customButton.svelte';
    import { error } from '@sveltejs/kit';

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

        login(email,password)
        .then(
        (userCredentials) => {
            const user = userCredentials.user;
            
            goto(userHome);
        })
        .catch(
            (error)=> {
                alert(error);
            }
        )
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
    <div class=" bg-teal-800 flex items-center justify-center text-white text-2xl  w-full">
        <a href="/"><img src="src/images/Logo3.png" alt="pino" class="h-70 w-full"></a>
    </div>
    <div class="flex justify-center items-center gap-4 flex-col w-full">
        <form on:submit={boolRegister ? handleRegister : handleLogin} class="flex flex-col gap-4 items-center w-full">
            {#if boolRegister}
                <input id="username" type="text" bind:value={username} placeholder="username" class="px-4 border border-black py-2 rounded w-64">
            {/if}
            <input id="email" type="text" bind:value={email} placeholder="email" class="px-4 py-2 rounded w-64 border border-black"> 
            <input id="password" type="password" bind:value={password} placeholder="password" class="px-4 py-2 rounded w-64 border border-black">
            <CustomButton text={boolRegister ? "Registrati" : "Accedi"} type=submit/>
            <CustomButton text={boolRegister ? "Possiedi un account?Accedi" : "Non possiedi un account?Registrati"} style = "underline cursor-pointer" dimensions= "" color="" textColor="text-black" on:click={showRegistration}/>
        </form>
        
    </div>

</div>