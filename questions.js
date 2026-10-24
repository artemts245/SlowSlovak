// 1. PLNÁ DATABÁZA 30 DIAGNOSTICKÝCH OTÁZOK S KONTEXTOM (6 v každej z 5 kategórií)
const ALL_QUESTIONS = [
    // KATEGÓRIA 1: SA / SI (Zvratné slovesá a slovosled) - 6 otázok
    {
        id: 1,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'A1',
        q: 'Ako ___ voláš? Volám ___ Martin.',
        hint: 'Základné predstavenie sa',
        options: ['sa / sa', 'si / sa', 'sa / si', 'si / si'],
        correct: 0,
        exp: 'Sloveso „volať sa“ je vždy so SA (Ako sa voláš? Volám sa...).'
    },
    {
        id: 2,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'A2',
        q: 'Idem do obchodu, lebo ___ chcem kúpiť novú bundu.',
        hint: 'Kupujem niečo pre seba (iný predmet)',
        options: ['sa', 'si', 'ma', 'mi'],
        correct: 1,
        exp: 'Keď kupujeme nejakú vec pre seba (kúpiť ČO? bundu), používame SI (kúpiť si bundu).'
    },
    {
        id: 3,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'A2',
        q: 'Vyber vetu, ktorá má správny slovenský slovosled:',
        hint: 'Pravidlo 2. miesta vo vete (príklonky)',
        options: [
            'Včera stretli sme sa v meste.',
            'Včera sme sa stretli v meste.',
            'Včera sa sme stretli v meste.',
            'Stretli včera sme sa v meste.'
        ],
        correct: 1,
        exp: 'Krátke slovíčka „sme“ a „sa“ stoja na 2. mieste vo vete v poradí: pomocné sloveso (sme) + zvratné zámeno (sa).'
    },
    {
        id: 4,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'A2',
        q: 'Každý večer ___ učím po slovensky aspoň dvadsať minút.',
        hint: 'Študujem ja sám',
        options: ['si', 'sa', '— (nič)', 'mi'],
        correct: 1,
        exp: '„Učiť sa“ (študovať sám) je so SA. „Učiť“ bez „sa“ znamená byť učiteľom a učiť niekoho iného.'
    },
    {
        id: 5,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'B1',
        q: 'Veľmi ___ mi páči táto nová kaviareň v centre.',
        hint: 'Vyjadrenie, že niečo je pekné / príjemné',
        options: ['si', 'sa', 'je', 'to'],
        correct: 1,
        exp: 'Väzba je „páčiť sa niekomu“ → Páči sa mi táto kaviareň.'
    },
    {
        id: 6,
        cat: 'sasi',
        catName: 'SA / SI (Zvratné slovesá)',
        level: 'B1',
        q: 'Ráno ___ vždy umyjem ruky a potom ___ obliekam do práce.',
        hint: 'Časť tela vs. celé telo',
        options: ['sa / sa', 'si / sa', 'sa / si', 'si / si'],
        correct: 1,
        exp: 'Umývam SI ruky (konkrétnu časť tela = umyť si čo), ale obliekam SA (celú osobu).'
    },

    // KATEGÓRIA 2: SKLOŇOVANIE (Pády a koncovky) - 6 otázok
    {
        id: 7,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'A1',
        q: 'Ráno pijem čiernu ___ bez ___ .',
        hint: 'Akuzatív (koho/čo) a Genitív (bez koho/čoho)',
        options: ['kávu / mlieka', 'káva / mlieko', 'káve / mliekom', 'kávu / mlieko'],
        correct: 0,
        exp: 'Pijem (čo? Akuzatív) → čiernu kávu. Bez (čoho? Genitív) → bez mlieka.'
    },
    {
        id: 8,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'A2',
        q: 'Cez víkend ideme na výlet s našimi dobrými ___ .',
        hint: 'Inštrumentál množného čísla (s kým / čím)',
        options: ['kamarátov', 'kamarátom', 'kamarátmi', 'kamaráti'],
        correct: 2,
        exp: 'Predložka „s“ sa viaže s inštrumentálom. V množnom čísle má prídavné meno „-ými“ a podstatné meno „-mi“ (s dobrými kamarátmi).'
    },
    {
        id: 9,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'A2',
        q: 'Bývam v ___ už tri roky.',
        hint: 'Lokál (kde? v kom / v čom)',
        options: ['Bratislavu', 'Bratislave', 'Bratislavou', 'Bratislavy'],
        correct: 1,
        exp: 'Otázka KDE? (v kom/čom - Lokál) → v Bratislave.'
    },
    {
        id: 10,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'A2',
        q: 'Dnes poobede musím zavolať svojmu ___ .',
        hint: 'Datív (komu / čomu)',
        options: ['lekára', 'lekárovi', 'lekárom', 'lekár'],
        correct: 1,
        exp: 'Zavolať (komu? Datív) → životné podstatné mená mužského rodu majú v datíve koncovku -ovi (lekárovi).'
    },
    {
        id: 11,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'B1',
        q: 'V tejto firme pracuje veľa zahraničných ___ .',
        hint: 'Genitív množného čísla po slove „veľa“',
        options: ['študenti', 'študentom', 'študentov', 'študentmi'],
        correct: 2,
        exp: 'Po slovách veľa, málo, niekoľko nasleduje Genitív množného čísla → veľa zahraničných študentov.'
    },
    {
        id: 12,
        cat: 'sklonovanie',
        catName: 'Skloňovanie (Pády)',
        level: 'B1',
        q: 'Rozprávame sa o tej novej ___ , ktorú otvorili vedľa nás.',
        hint: 'Lokál pre ženský rod zakončený na -ia',
        options: ['reštaurácii', 'reštaurácie', 'reštauráciou', 'reštauráciu'],
        correct: 0,
        exp: 'Cudzie slová na -ia (reštaurácia, polícia, garancia) majú v Lokáli (o čom?) a Datíve príponu -ii (o reštaurácii).'
    },

    // KATEGÓRIA 3: SLOVESÁ A ČASY (Časovanie, minulý čas, vid) - 6 otázok
    {
        id: 13,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'A1',
        q: 'Oni ešte dobre ___ po slovensky, ale snažia sa.',
        hint: 'Prítomný čas, 3. osoba množného čísla (oni)',
        options: ['nerozumie', 'nerozumejú', 'nerozumia', 'nerozumiete'],
        correct: 1,
        exp: 'Sloveso „rozumieť“ má v 3. osobe množného čísla tvar „oni rozumejú / nerozumejú“.'
    },
    {
        id: 14,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'A1',
        q: 'Čo ___ včera večer, keď som ti volala?',
        hint: 'Minulý čas v 2. osobe (ty)',
        options: ['robil', 'si robil', 'robila si', 'urobil'],
        correct: 1,
        exp: 'V 1. a 2. osobe minulého času musíme použiť pomocné sloveso som/si/sme/ste → „Čo si robil?“'
    },
    {
        id: 15,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'A2',
        q: 'Zajtra večer ___ doma a budeme pozerať film.',
        hint: 'Budúci čas',
        options: ['budeme zostať', 'zostaneme', 'zostávame budúci', 'budeme zostaneme'],
        correct: 1,
        exp: 'Sloveso „zostať“ je dokonavé, preto tvorí budúci čas priamo bez slova „budeme“ → zajtra zostaneme.'
    },
    {
        id: 16,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'A2',
        q: 'Celé poobede som ___ ten dlhý e-mail, ale ešte nie je hotový.',
        hint: 'Proces vs. ukončený dej (vid slovies)',
        options: ['napísal', 'písal', 'píšem', 'napíšem'],
        correct: 1,
        exp: 'Keď dej trval dlho a ešte nie je dokončený („celé poobede“), použijeme nedokonavé sloveso „písal som“.'
    },
    {
        id: 17,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'B1',
        q: 'Keď konečne ___ domov, hneď mi napíš správu.',
        hint: 'Dokonavý budúci čas vo vedľajšej vete',
        options: ['prichádzaš', 'budeš prísť', 'prídeš', 'chodíš'],
        correct: 2,
        exp: 'Jednorazový dokončený dej v budúcnosti vyjadrujeme tvarom „prídeš“ (od slovesa prísť).'
    },
    {
        id: 18,
        cat: 'slovesa',
        catName: 'Slovesá a časy',
        level: 'B1',
        q: 'Minulý rok sme každý piatok ___ plávať.',
        hint: 'Opakovaný dej v minulosti',
        options: ['išli', 'chodili', 'prišli', 'pošli'],
        correct: 1,
        exp: 'Pre pravidelne opakovaný pohyb v minulosti („každý piatok“) používame sloveso „chodili sme“.'
    },

    // KATEGÓRIA 4: PREDLOŽKY (do/na, pre/za, o/v...) - 6 otázok
    {
        id: 19,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A1',
        q: 'Zajtra ráno idem ___ Slovensko a potom ___ koncert.',
        hint: 'Kam? (do vs. na)',
        options: ['v / na', 'do / do', 'na / na', 'do / na'],
        correct: 2,
        exp: 'Hovoríme „na Slovensko“ (výnimka pri krajinách) a pri podujatiach/akciách vždy „na koncert, na výstavu, na kávu“.'
    },
    {
        id: 20,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A2',
        q: 'Kúpila som tento darček ___ moju mamu a zaplatila som ___ neho 30 eur.',
        hint: 'Pre koho (účel) vs. za čo (cena/výmena)',
        options: ['za / pre', 'pre / za', 'pre / pre', 'za / za'],
        correct: 1,
        exp: 'Darček je určený PRE mamu, ale pri platení peňazí platíme ZA niečo (zaplatiť za darček).'
    },
    {
        id: 21,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A2',
        q: 'Stretneme sa ___ piatok ___ piatej hodine.',
        hint: 'Časové predložky (deň vs. hodina)',
        options: ['v / v', 'v / o', 'na / o', 'o / v'],
        correct: 1,
        exp: 'Dni v týždni majú predložku V (v piatok), ale presný čas na hodinkách má predložku O (o piatej hodine).'
    },
    {
        id: 22,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A2',
        q: 'Idem ___, lebo ma bolí hrdlo.',
        hint: 'Kam idem, keď navštívim osobu?',
        options: ['k lekárovi', 'do lekára', 'na lekára', 'u lekára'],
        correct: 0,
        exp: 'Keď ideme za nejakou osobou (smerom k nej), používame predložku K/Ku + Datív → idem k lekárovi (som u lekára).'
    },
    {
        id: 23,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'B1',
        q: 'Vrátime sa ___ desať minút, počkaj nás tu.',
        hint: 'O aký čas v budúcnosti (častá chyba pod vplyvom ruštiny/ukrajinčiny)',
        options: ['cez', 'za', 'o', 'po'],
        correct: 2,
        exp: 'V spisovnej slovenčine pri otázke „kedy v budúcnosti?“ používame predložku O + Akuzatív → „vrátime sa o desať minút“ (nie „čerez/cez“).'
    },
    {
        id: 24,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'B1',
        q: 'Vlak mešká ___.',
        hint: 'Príčina negatívnej udalosti',
        options: ['pre zlé počasie', 'kvôli zlému počasiu', 'od zlého počasia', 'Obe možnosti (pre / kvôli) sa v praxi používajú'],
        correct: 3,
        exp: 'V bežnej reči Slováci používajú „kvôli zlému počasiu“ a v spisovnej slovenčine „pre zlé počasie“. Obe je dobré poznať!'
    },

    // KATEGÓRIA 5: B1 VÄZBY A SLOVOSLED (Podmienky „keby“, spájanie viet) - 6 otázok
    {
        id: 25,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: 'Keby ___ viac voľného času, chodil by som pravidelne cvičiť.',
        hint: 'Podmienková veta s „keby“ (častá chyba: keby by som)',
        options: ['by som mal', 'som mal', 'mám', 'budem mať'],
        correct: 1,
        exp: 'Slovo „keby“ už v sebe obsahuje časticu „by“! Preto po „keby“ nikdy nedávame druhé „by“ → Keby som mal čas...'
    },
    {
        id: 26,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: 'Kolegyňa mi povedala, ___ dnes príde do práce trochu neskôr.',
        hint: 'Nepriama reč vs. želanie (že vs. aby)',
        options: ['aby', 'že', 'nech', 'čo'],
        correct: 1,
        exp: 'Keď len oznamujeme fakt/informáciu, spájame vety spojkou „že“ (povedala, že príde).'
    },
    {
        id: 27,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: 'Šéf odo mňa chcel, ___ som ten report poslal ešte dnes.',
        hint: 'Požiadavka / želanie niekoho iného (aby + minulý tvar)',
        options: ['že', 'aby', 'keby', 'nech by'],
        correct: 1,
        exp: 'Keď niekto chce/prosí/žiada, aby druhá osoba niečo urobila, používame „aby som / aby si / aby...“.'
    },
    {
        id: 28,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: 'Táto kniha, ___ som čítal minulý týždeň, je naozaj výborná.',
        hint: 'Vzťažné zámeno „ktorý“ v Akuzatíve ženského rodu',
        options: ['ktorá', 'ktorú', 'ktorej', 'čo'],
        correct: 1,
        exp: 'Kniha je ženský rod, ale vo vedľajšej vete sa pýtame „čítal som koho/čo?“ (Akuzatív) → kniha, ktorú som čítal.'
    },
    {
        id: 29,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: '___ pršalo, išli sme sa prejsť do lesa.',
        hint: 'Vyjadrenie príčiny vs. prípustky (aj keď)',
        options: ['Pretože', 'Napriek tomu, že', 'Kvôli tomu', 'Aby'],
        correct: 1,
        exp: '„Napriek tomu, že pršalo“ (alebo „Hoci pršalo“) vyjadruje, že sme niečo urobili aj napriek prekážke.'
    },
    {
        id: 30,
        cat: 'b1vazby',
        catName: 'B1 Väzby a podmienky',
        level: 'B1',
        q: 'Ako sa zdvorilo opýtaš v kaviarni, či majú voľný stôl?',
        hint: 'Podmieňovací spôsob pre slušnú komunikáciu',
        options: [
            'Dajte mi jeden stôl.',
            'Chcel by som sa opýtať, či máte voľný stôl.',
            'Pýtam sa, kde je stôl.',
            'Chcem opýtať, či je stôl.'
        ],
        correct: 1,
        exp: 'Fráza „Chcel/a by som sa opýtať...“ je najprirodzenejší a najzdvorilejší spôsob v slovenčine.'
    }
];

// KATALÓG KURZOV S BALÍČKAMI (TIERS)
const COURSES_DATA = {
    sasi: {
        id: 'sasi',
        title: 'Záhada menom SA a SI',
        badge: 'Kurz A2 – B1 • Zoom naživo + PDF',
        price: 99,
        desc: 'Praktický 4-týždňový kurz cez Zoom v malej skupine + kompletné pracovné listy a nahrávky. Konečne prestaneš hádať, kedy použiť SA, kedy SI a kam presne ich dať vo vete.',
        packages: [
            { id: 'basic', name: 'Základný balík', price: 99, desc: '4x živá Zoom lekcia + všetky PDF materiály + záznamy' },
            { id: 'plus', name: 'Balík PLUS (Odporúčané)', price: 119, desc: 'Všetko zo základu + oprava úloh + 1x súkromná 30 min konzultácia' }
        ],
        bullets: [
            '✓ Rozdiel medzi SA a SI na reálnych príkladoch',
            '✓ Jednoduché pravidlo 2. miesta vo vete (slovosled)',
            '✓ Zradné slovesá (páčiť sa mi, zdať sa, baviť sa)',
            '✓ 4x živé stretnutie na Zoome + PDF pracovný zošit'
        ]
    },
    b1: {
        id: 'b1',
        title: 'Ťažké témy B1',
        badge: 'Kurz B1 • Zoom naživo + PDF',
        price: 105,
        desc: '5-týždňový skupinový kurz cez Zoom pre študentov, ktorí už rozumejú, ale chcú hovoriť plynulo, správne používať vid slovies (písal vs. napísal), podmienky (keby som) a predložky.',
        packages: [
            { id: 'standard', name: 'Kompletný kurz B1', price: 105, desc: '5x živá Zoom lekcia + PDF cvičenia + záznamy z hodín' }
        ],
        bullets: [
            '✓ Dokonavý vs. nedokonavý vid slovies bez stresu',
            '✓ Podmienkové vety (Keby som...) a zdvorilá slovenčina',
            '✓ Najčastejšie pasce pri predložkách a skloňovaní v B1',
            '✓ 5x živé stretnutie na Zoome v malej skupine'
        ]
    },
    individual: {
        id: 'individual',
        title: 'Individuálna lekcia (1-on-1)',
        badge: 'Všetky úrovne • 45 minút cez Zoom',
        price: 25,
        desc: 'Súkromná lekcia prispôsobená presne tvojmu cieľu – príprava na pracovný pohovor, skúšku A2/B1, konverzácia alebo dovysvetlenie gramatiky.',
        packages: [
            { id: 'single', name: '1x Individuálna lekcia (45 min)', price: 25, desc: 'Súkromná hodina cez Zoom + zápis nových slovíčok' },
            { id: 'pack4', name: 'Balíček 4 lekcií (Zvýhodnený)', price: 92, desc: '4x 45 minút cez Zoom + individuálny študijný plán' }
        ],
        bullets: [
            '✓ 100 % času sa venujeme len tvojim otázkam',
            '✓ Bezpečné tempo Slow Slovak bez stresu',
            '✓ Flexibilný výber termínu v kalendári'
        ]
    }
};

// Alias pre spätnú kompatibilitu
const COURSES = {
    sasi: COURSES_DATA.sasi,
    b1: COURSES_DATA.b1,
    indiv: COURSES_DATA.individual,
    individual: COURSES_DATA.individual
};