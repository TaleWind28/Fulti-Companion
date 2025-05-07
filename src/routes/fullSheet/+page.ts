// src/routes/full-sheet/+page.js
import { personaggiStore } from "../../stores/characterStore";
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ url }) { // `url` contiene informazioni sull'URL corrente
    const characterId = url.searchParams.get('id'); // Estrae il parametro 'id' dalla query string

    if (!characterId) {
        // Se non c'è un ID, potresti reindirizzare o mostrare un errore specifico
        throw error(400, {
             message: 'ID del personaggio mancante nella richiesta.'
        });
    }

    const character = personaggiStore.searchCharacter(characterId);

    if (character) {
        return {
            character: character
        };
    } else {
        throw error(404, {
            message: `Personaggio con ID "${characterId}" non trovato.`
        });
    }
}