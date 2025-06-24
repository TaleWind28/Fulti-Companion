export type Spell= {
    name:string,
    mpPerTarget:number,
    maxTargets:number,
    targetDescription:string,
    duration:string,
    spellDescription:string,
    offensive: boolean,
    accuracyCheck: string
}

const elementalistList: Spell[] = [
    {
        name: "Arma Elementale",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Un'arma",
        duration: "Scena",
        spellDescription: "Infondi energia elementale in un'arma. Scegli un tipo di danno: aria, fulmine, fuoco, ghiaccio o terra. Fino al termine di questo incantesimo, il danno inflitto dall'arma diventa del tipo scelto. Se hai quell'arma equipaggiata mentre lanci questo incantesimo, puoi eseguire un attacco gratuito con essa come parte della stessa azione. Puoi lanciare questo incantesimo solo su armi equipaggiate da creature consenzienti.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Colpo in Picchiata",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Incantatore",
        duration: "Istantanea",
        spellDescription: "Il vento trasporta i tuoi colpi attraverso il campo di battaglia. Puoi immediatamente eseguire un attacco gratuito con un'arma da mischia equipaggiata. Questo attacco può bersagliare creature che possono essere bersagliate solo da attacchi a distanza. Se hai usato un'arma della Categoria lancia o da rissa per questo attacco, infliggi 5 danni extra. Se colpisci un bersaglio volante con questo attacco, puoi obbligarlo ad atterrare.",
        offensive: true,
        accuracyCheck: "Attacco con arma"
    },
    {
        name: "Fulgur",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Fasmi elettrici in un'onda di energia crepitante. Ciascun bersaglio colpito subisce [TM + 15] danni da fulmine. Opportunità: ciascun bersaglio colpito subisce lo status confuso.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Glacies",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Ricopri i nemici con uno spesso strato di ghiaccio. Ciascun bersaglio colpito subisce [TM + 15] danni da ghiaccio. Opportunità: ciascun bersaglio colpito subisce lo status lento.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Iceberg",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Una colonna di ghiaccio avvolge il nemico, abbassandone la temperatura corporea a livelli critici. Il bersaglio subisce [TM + 25] danni da ghiaccio. I danni inflitti da questo incantesimo ignorano le Resistenze.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Ignis",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Evochi una pioggia di fiamme e la scateni sui tuoi nemici. Ciascun bersaglio colpito subisce [TM + 15] danni da fuoco. Opportunità: ciascun bersaglio colpito subisce lo status scosso.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Saetta",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Scagli una saetta sfolgorante verso il nemico. Il bersaglio subisce [TM + 25] danni da fulmine. I danni inflitti da questo incantesimo ignorano le Resistenze.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Terra",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Guglie di pietra affilata sorgono dal terreno sotto i nemici, avvolgendoli. Ciascun bersaglio colpito subisce [TM + 15] danni da terra. Questo incantesimo non può bersagliare creature che stanno volando, fluttuando, cadendo o che si trovano a mezzaria. Opportunità: ciascun bersaglio colpito esegue un'azione in meno durante il suo prossimo turno (fino a un minimo di zero azioni).",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Vampata",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Scagli un singolo raggio di fuoco verso il nemico, così rovente da penetrare quasi ogni difesa. Il bersaglio subisce [TM + 25] danni da fuoco. I danni inflitti da questo incantesimo ignorano le Resistenze.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Velo Elementale",
        mpPerTarget: 5,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Scena",
        spellDescription: "Plasmi l'energia magica e proteggi i bersagli dalla furia degli elementi. Scegli un tipo di danno: aria, fulmine, fuoco, ghiaccio o terra. Finché questo incantesimo è attivo, ciascun bersaglio ottiene Resistenza al tipo di danno scelto.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Ventus",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Evochi il potere dei venti contro i tuoi nemici. Ciascun bersaglio colpito subisce [TM + 15] danni da aria. Opportunità: ciascun bersaglio volante colpito deve atterrare immediatamente.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Vortice",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Incantatore",
        duration: "Scena",
        spellDescription: "Un vento feroce ti circonda, deviando frecce e proiettili. Fino al termine di questo incantesimo, ottieni un bonus di +2 alla tua Difesa contro gli attacchi a distanza.",
        offensive: false,
        accuracyCheck: "Nessuno"
    }
];

const entropistList: Spell[] = [
    {
        name: "Accelerazione",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Scena",
        spellDescription: "Pieghi il tessuto del tempo. Fino al termine di questo incantesimo, il bersaglio può eseguire un'azione aggiuntiva a turno (per un totale di due turni). Dopo che il bersaglio ha eseguito due azioni aggiuntive in questo modo, questo incantesimo termina.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Anomalia",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Scena",
        spellDescription: "Alteri la natura stessa del bersaglio. Fino al termine di questo incantesimo, se il bersaglio subisce danni del un tipo che Assorbe o cui è Immune, viene invece considerato Vulnerabile a essi. Quando ciò accade, questo incantesimo termina.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Antimagia",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Un'onda di energia negativa spezza gli incantesimi presenti su una creatura. Se il bersaglio è sotto l'effetto di uno o più incantesimi con durata 'Scena', invece non è più sotto l'effetto di quegli incantesimi.",
        offensive: false,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Arma Oscura",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Un'arma equipaggiata",
        duration: "Scena",
        spellDescription: "Avvolgi un'arma nelle tenebre. Fino al termine di questo incantesimo, tutto il danno inflitto dall'arma diventa ombra. Se hai quell'arma equipaggiata mentre lanci questo incantesimo, puoi eseguire un attacco gratuito con essa come parte della stessa azione. Puoi lanciare questo incantesimo solo su armi equipaggiate da creature consenzienti.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Divinazione",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Incantatore",
        duration: "Scena",
        spellDescription: "Hai una premonizione. Fino al termine di questo incantesimo dopo che una creatura a te visibile effettua un Test, se non è un fallimento critico o successo critico, puoi farle ritirare entrambi i dadi. Dopo aver causato due ritiri in questo modo, questo incantesimo termina.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Furto Spirituale",
        mpPerTarget: 5,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Consumi la psiche di una creatura. Il bersaglio perde [TM + 15] Punti Mente, e recuperi un ammontare di Punti Mente pari a metà dei Punti Mente persi dal bersaglio (se la perdita è stata ridotta a 0 in qualche modo, non recuperi Punti Mente).",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Furto Vitale",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Assorbi la vitalità altrui. Il bersaglio subisce [TM + 15] danni da ombra, e recuperi un ammontare di Punti Vita pari a metà dei Punti Vita persi dal bersaglio (se la perdita è stata ridotta a 0 in qualche modo, non recuperi Punti Vita).",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Omega",
        mpPerTarget: 20,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Condanni un nemico alla rovina, trasformandone la forza in debolezza. Il bersaglio perde un ammontare di Punti Vita [1 COL dice] a due livelli bersaglio.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Riflesso",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Scena",
        spellDescription: "Pieghi le leggi della magia. Fino al termine di questo incantesimo, se un incantesimo offensivo viene lanciato sul bersaglio, la creatura che ha lanciato l'incantesimo offensivo ne subisce invece i bersagli normalmente. Dopo che ciò accade, questo incantesimo termina.",
        offensive: false,
        accuracyCheck: "Nessuno"
    },
    {
        name: "Scommessa",
        mpPerTarget: 20,
        maxTargets: 20,
        targetDescription: "Speciale",
        duration: "Istantanea",
        spellDescription: "Evochi un vortice di energia caotica. Tira il tuo attuale dado di Volontà una volta per ogni 10 Punti Mente spesi per lanciare questo incantesimo, poi tieni il singolo dado che preferisci: il numero che hai ottenuto determina l'effetto istantaneo. 1: Perdi metà dei tuoi Punti Vita attuali e metà dei tuoi Punti Mente attuali. 2-3: Ciascuna creatura presente in scena (te incluso) subisce lo status avvelenato. 4-6: Ciascuna creatura presente in scena (te incluso) subisce lo status lento. 7-8: Scegli fino a tre creature a te visibili: ciascuna di esse recupera 50 Punti Vita e guarisce da tutti gli status. 9 o più: Scegli un qualsiasi numero di creature a te visibili: ciascuna di esse subisce 30 danni. Il tipo di danno viene determinato casualmente tirando un d6: 1. fulmine 2. fuoco 3. ghiaccio 4. ombra 5. terra 6. veleno",
        offensive: true,
        accuracyCheck: "Speciale"
    },
    {
        name: "Stop",
        mpPerTarget: 10,
        maxTargets: 1,
        targetDescription: "Una creatura",
        duration: "Istantanea",
        spellDescription: "Intrappoli il nemico in una bolla di tempo e spazio alterati. Il bersaglio esegue un'azione in meno durante il suo prossimo turno (fino a un minimo di zero azioni).",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    },
    {
        name: "Umbra",
        mpPerTarget: 10,
        maxTargets: 3,
        targetDescription: "Fino a tre creature",
        duration: "Istantanea",
        spellDescription: "Una tempesta di energie oscure stritola la materia. Ciascun bersaglio colpito subisce [TM + 15] danni da ombra. Opportunità: Ciascun bersaglio colpito subisce lo status debole.",
        offensive: true,
        accuracyCheck: "Tiro Magico"
    }]

const spiritisList = 
    [
        {
            name: "Allucinazione",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Istantanea",
            spellDescription: "Alteri la percezione dei tuoi nemici, insinuandovi allucinazioni bizzarre o terrificanti. Scegli uno status tra confuso e scosso: ciascun bersaglio colpito subisce lo status scelto.",
            offensive: true,
            accuracyCheck: "Tiro Magico"
        },
        {
            name: "Arma Spirituale",
            mpPerTarget: 10,
            maxTargets: 1,
            targetDescription: "Un'arma equipaggiata",
            duration: "Scena",
            spellDescription: "Avvolgi un'arma con l'energia purificatrice del tuo spirito. Fino al termine di questo incantesimo, tutto il danno inflitto dall'arma diventa luce. Se hai quell'arma equipaggiata mentre lanci questo incantesimo, puoi eseguire un attacco gratuito con essa come parte della stessa azione. Puoi lanciare questo incantesimo solo su armi equipaggiate da creature consenzienti.",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Aura",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Scena",
            spellDescription: "Proietti il tuo spirito fuori dal corpo e lo usi per avvolgere i bersagli, proteggendoli dai pericoli della magia. Fino al termine di questo incantesimo, ciascun bersaglio può considerare la sua Difesa Magica pari a 12 contro qualsiasi effetto (può comunque utilizzare il suo normale valore di Difesa nel caso sia maggiore di 12).",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Barriera",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Scena",
            spellDescription: "Proietti il tuo spirito fuori dal corpo e lo intrecci in una barriera che protegge i bersagli dagli attacchi. Fino al termine di questo incantesimo, ciascun bersaglio può considerare la sua Difesa come pari a 12 contro qualsiasi effetto (può comunque utilizzare il suo normale valore di Difesa nel caso sia maggiore di 12).",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Collera",
            mpPerTarget: 10,
            maxTargets: 1,
            targetDescription: "Una creatura",
            duration: "Istantanea",
            spellDescription: "Spingi una creatura a perdere qualsiasi contegno e agire in maniera avventata. Il bersaglio subisce lo status furente e non può eseguire le azioni di Guardia e Incantesimo nel suo prossimo turno.",
            offensive: true,
            accuracyCheck: "Tiro Magico"
        },
        {
            name: "Guarigione",
            mpPerTarget: 10,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Istantanea",
            spellDescription: "Infondi vigore nei tuoi compagni, lenendone il dolore e la stanchezza. Ciascun bersaglio recupera 40 Punti Vita. Questo ammontare aumenta a 50 Punti Vita se sei di livello 20 o superiore, oppure a 60 Punti Vita se sei di livello 40 o superiore.",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Lux",
            mpPerTarget: 10,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Istantanea",
            spellDescription: "Concentri la tua forza interiore in una salva di raggi accecanti. Ciascun bersaglio colpito subisce [TM + 15] danni da luce. Opportunità: Ciascun bersaglio colpito subisce lo status confuso.",
            offensive: true,
            accuracyCheck: "Tiro Magico"
        },
        {
            name: "Pietà",
            mpPerTarget: 20,
            maxTargets: 1,
            targetDescription: "Una creatura",
            duration: "Scena",
            spellDescription: "Infondi coraggio nel cuore di una creatura affinché resista alla sofferenza e alla disperazione. Fino al termine di questo incantesimo, se il bersaglio sta per essere ridotto a 0 Punti Vita, rimane invece con esattamente 1 Punto Vita. Quando ciò accade, questo incantesimo termina.",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Purificazione",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Istantanea",
            spellDescription: "Rafforzi e purifichi l'energia spirituale che scorre nei tuoi alleati. Ciascun bersaglio guarisce da tutti gli status.",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Rinforzo",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Scena",
            spellDescription: "Proteggi i bersagli dai pericoli che ne corromperebbero l'animo e lo spirito. Scegli uno status tra avvelenato, confuso, debole, furente, lento e scosso: fino al termine di questo incantesimo, ciascun bersaglio diventa immune allo status scelto.",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Risveglio",
            mpPerTarget: 20,
            maxTargets: 1,
            targetDescription: "Una creatura",
            duration: "Scena",
            spellDescription: "Consenti a una creatura di scontentare la sua energia vitale perché sia in grado di superare i propri limiti. Scegli Destrezza, Intuito, Vigore o Volontà: fino al termine di questo incantesimo, il bersaglio considera la Caratteristica scelta incrementata di una taglia di dado (massimo d12).",
            offensive: false,
            accuracyCheck: "Nessuno"
        },
        {
            name: "Torpore",
            mpPerTarget: 5,
            maxTargets: 3,
            targetDescription: "Fino a tre creature",
            duration: "Istantanea",
            spellDescription: "Soffochi l'energia spirituale che attraversa i corpi dei tuoi nemici, ostacolandone i movimenti. Scegli uno status tra debole e lento: ciascun bersaglio colpito subisce lo status scelto.",
            offensive: true,
            accuracyCheck: "Tiro Magico"
        }
    ];

export const spellLists = [{
    name:"elementalist",
    list:elementalistList
},
{
    name:"entropist",
    list:entropistList
},
{
    name:"spiritist",
    list:spiritisList
}]
