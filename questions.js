const COURSES = {
    sasi: {
        id: 'sasi',
        title: 'Záhada menom SA a SI',
        price: 99,
        tiers: [
            { id: 'basic', name: 'Základný balík (Zoom + PDF)', price: 99 },
            { id: 'plus', name: 'Balík PLUS (+ Individuál 1-on-1)', price: 119 }
        ]
    },
    b1: {
        id: 'b1',
        title: 'Ťažké témy B1: Plynulý prejav',
        price: 105,
        tiers: [
            { id: 'standard', name: 'Kompletný 5-týždňový kurz B1', price: 105 }
        ]
    },
    indiv: {
        id: 'indiv',
        title: 'Individuálna lekcia (45 minút)',
        price: 25,
        tiers: [
            { id: 'single', name: '1x Individuálna lekcia (45 min)', price: 25 }
        ]
    }
};

const CATEGORIES = {
    sasi: { name: 'Zvratné SA / SI', color: '#E11D48', courseRecommend: 'sasi' },
    sklonovanie: { name: 'Skloňovanie (Pády)', color: '#D97706', courseRecommend: 'b1' },
    slovesa: { name: 'Slovesá a časy', color: '#059669', courseRecommend: 'b1' },
    predlozky: { name: 'Predložky', color: '#2563EB', courseRecommend: 'b1' },
    b1: { name: 'Väzby B1 a slovosled', color: '#7C3AED', courseRecommend: 'b1' }
};

const ALL_QUESTIONS = [
    { id: 1, cat: 'sasi', level: 'A1', q: 'Doplň správny tvar: „Každé ráno ___ umývam zuby.“', options: ['sa', 'si', 'ma', '— (nič)'], correct: 1, exp: 'Umývam SI zuby (sebe na tele, datív).' },
    { id: 2, cat: 'sasi', level: 'A2', q: 'Ktorá veta má správny slovosled?', options: ['Včera stretli sme sa v meste.', 'Včera sme stretli sa v meste.', 'Včera sme sa stretli v meste.', 'Včera sa sme stretli v meste.'], correct: 2, exp: 'Poradie na 2. mieste: najprv „sme“, potom „sa“.' },
    { id: 3, cat: 'sasi', level: 'A2', q: 'Doplň: „Veľmi ___ páči táto nová kaviareň.“', options: ['ma', 'sa mi', 'si mi', 'mne sa'], correct: 1, exp: 'Väzba „páči sa mi“.' },
    { id: 4, cat: 'sasi', level: 'A2', q: 'Vyber správnu možnosť: „Idem do obchodu, chcem ___ kúpiť novú bundu.“', options: ['sa', 'si', 'sebe', '— (nič)'], correct: 1, exp: 'Kupuješ ju PRE SEBA -> kúpiť SI.' },
    { id: 5, cat: 'sasi', level: 'B1', q: 'Častý chyták: „Keď mám voľný čas, rád ___ na gitare.“', options: ['hrám sa', 'hrám', 'si hrám sa', 'hrám si sa'], correct: 1, exp: 'Na hudobnom nástroji iba „hráš“ (bez SA).' },
    { id: 6, cat: 'sasi', level: 'B1', q: 'Doplň: „Opýtal ___ učiteľky, kedy bude test.“', options: ['som', 'som sa', 'som si', 'sa som'], correct: 1, exp: 'Sloveso je „opýtať SA“ -> Opýtal som sa.' },
    { id: 7, cat: 'sklonovanie', level: 'A1', q: 'Doplň akuzatív: „Dám si čiernu ___ bez mlieka.“', options: ['káva', 'káve', 'kávu', 'kávy'], correct: 2, exp: 'Akuzatív ženského rodu mení -a na -u (kávu).' },
    { id: 8, cat: 'sklonovanie', level: 'A2', q: 'Doplň správny tvar: „Včera som hovoril s mojím dobrým ___.“', options: ['kamarátom', 'kamarátovi', 'kamaráta', 'kamarát'], correct: 0, exp: 'Inštrumentál (s kým?) -> s kamarátom.' },
    { id: 9, cat: 'sklonovanie', level: 'A2', q: 'Doplň lokál: „Cez víkend sme boli v ___ na výlete.“', options: ['Košice', 'Košiciach', 'Košicami', 'Košíc'], correct: 1, exp: 'Lokál -> v Košiciach.' },
    { id: 10, cat: 'sklonovanie', level: 'A2', q: 'Doplň genitív: „Idem do ___ vybaviť jednu vec.“', options: ['banku', 'banke', 'banky', 'bankou'], correct: 2, exp: 'Predložka „do“ + genitív -> do banky.' },
    { id: 11, cat: 'sklonovanie', level: 'B1', q: 'Množné číslo: „V našej firme pracuje veľa šikovných ___.“', options: ['ľudí', 'ľudia', 'ľuďom', 'ľudoch'], correct: 0, exp: 'Po „veľa“ nasleduje genitív množného čísla -> ľudí.' },
    { id: 12, cat: 'sklonovanie', level: 'B1', q: 'Doplň správny tvar: „Zajtra musím zavolať nášmu novému ___.“', options: ['manažéra', 'manažérovi', 'manažérom', 'manažér'], correct: 1, exp: 'Zavolať komu (datív) -> manažérovi.' },
    { id: 13, cat: 'slovesa', level: 'A1', q: 'Prítomný čas: „Oni teraz ___ v centre Bratislavy.“', options: ['býva', 'bývame', 'bývajú', 'bývate'], correct: 2, exp: '3. osoba mn. č. -> oni bývajú.' },
    { id: 14, cat: 'slovesa', level: 'A1', q: 'Minulý čas: „Čo ___ včera večer, keď som ti volal?“', options: ['robil si', 'si robil', 'urobil', 'budeš robiť'], correct: 1, exp: 'Pomocné „si“ ide na druhé miesto -> Čo si robil?' },
    { id: 15, cat: 'slovesa', level: 'A2', q: 'Budúci čas: „Zajtra večer ___ pozerať nový film.“', options: ['budeme', 'budete sa', 'budeme sa', 'pozeráme'], correct: 0, exp: 'Budúci čas: budeme pozerať.' },
    { id: 16, cat: 'slovesa', level: 'B1', q: 'Vid slovies: „Keď ___ túto správu, hneď ti zavolám.“', options: ['budem písať', 'píšem', 'napíšem', 'budem napísať'], correct: 2, exp: 'Dokonavé sloveso: Keď napíšem.' },
    { id: 17, cat: 'slovesa', level: 'B1', q: 'Vyber vetu, ktorá je gramaticky SPRÁVNE:', options: ['Zajtra budem kúpiť lístky.', 'Zajtra kúpim lístky.', 'Včera som kupovať lístky.', 'Zajtra kupujem som lístky.'], correct: 1, exp: 'Dokonavé sloveso kúpiť -> Zajtra kúpim.' },
    { id: 18, cat: 'slovesa', level: 'A2', q: 'Modálne sloveso: „Dnes večer ___ ísť s vami, lebo mám veľa práce.“', options: ['nemôžem', 'neviem', 'nesmiem sa', 'nechcem si'], correct: 0, exp: 'Nemôžem ísť.' },
    { id: 19, cat: 'predlozky', level: 'A1', q: 'Doplň predložku: „Cez víkend pôjdeme ___ koncert.“', options: ['do', 'v', 'na', 'ku'], correct: 2, exp: 'Na podujatia chodíme „na“ -> na koncert.' },
    { id: 20, cat: 'predlozky', level: 'A2', q: 'Doplň: „Dnes poobede musím ísť ___ lekárovi.“', options: ['do', 'k', 'na', 'pri'], correct: 1, exp: 'K osobe ideme s predložkou „k“ -> k lekárovi.' },
    { id: 21, cat: 'predlozky', level: 'A2', q: 'Doplň: „Lietadlo odlieta presne ___ dve hodiny.“', options: ['čez', 'o', 'na', 'pri'], correct: 1, exp: 'O dve hodiny.' },
    { id: 22, cat: 'predlozky', level: 'A2', q: 'Vyber správnu predložku: „Stretneme sa ___ zastávke autobusu.“', options: ['v', 'na', 'do', 'u'], correct: 1, exp: 'Na zastávke.' },
    { id: 23, cat: 'predlozky', level: 'B1', q: 'Vokalizácia predložiek: „Bývam v dome ___ svojou sestrou.“', options: ['s', 'so', 'z', 'zo'], correct: 1, exp: 'Pred „svojou“ sa „s“ mení na „so“.' },
    { id: 24, cat: 'predlozky', level: 'B1', q: 'Doplň: „Veľmi sa teším ___ našu spoločnú dovolenku.“', options: ['o', 'pre', 'na', 'za'], correct: 2, exp: 'Tešiť sa NA niečo.' },
    { id: 25, cat: 'b1', level: 'B1', q: 'Podmienková veta: „Keby som mal viac času, ___ by som sa po slovensky každý deň.“', options: ['učím', 'budem učiť', 'učil', 'naučiť'], correct: 2, exp: 'Keby som mal -> učil by som sa.' },
    { id: 26, cat: 'b1', level: 'B1', q: 'Častá chyba v podmienke: Ktorá veta je SPRÁVNE?', options: ['Keby by som vedel, poviem ti.', 'Keby som vedel, povedal by som ti.', 'Ak by som vedel, poviem by som ti.', 'Keby viem, povedal by som ti.'], correct: 1, exp: 'Keby som vedel, povedal by som ti.' },
    { id: 27, cat: 'b1', level: 'B1', q: 'Účelová veta: „Píšem ti, ___ sme sa dohodli na termíne.“', options: ['že', 'aby', 'keby', 'preto'], correct: 1, exp: 'Účel vyjadrujeme spojkou „aby“.' },
    { id: 28, cat: 'b1', level: 'B1', q: 'Vzťažné zámeno: „Toto je kolegyňa, ___ som ti včera rozprával.“', options: ['o ktorej', 'ktorú', 'ktorej', 's ktorou'], correct: 0, exp: 'Rozprávať O kom -> o ktorej.' },
    { id: 29, cat: 'b1', level: 'B1', q: 'Stupňovanie prísloviek: „Dnes hovoríš po slovensky oveľa ___ ako pred mesiacom.“', options: ['dobrejšie', 'lepšie', 'najlepšie', 'viac dobre'], correct: 1, exp: 'Dobre -> lepšie.' },
    { id: 30, cat: 'b1', level: 'B1', q: 'Zdvorilosť: „Chcel ___ sa vás opýtať na jednu informáciu.“', options: ['som by', 'by som', 'by', 'budem'], correct: 1, exp: 'Chcel by som sa opýtať.' }
];
