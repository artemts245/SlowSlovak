// 1. PLNÁ DATABÁZA 30 DIAGNOSTICKÝCH OTÁZOK S KONTEXTOM (6 v každej z 5 kategórií)
const ALL_QUESTIONS = [
    // KATEGÓRIA 1: SA / SI A SLOVOSLED (6 otázok)
    {
        id: 1,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'A1',
        q: 'Poď sem, _____!',
        hint: 'Zvratné sloveso pri pohybe / zmene polohy tela',
        options: ['sadni sa', 'sadni si', 'sadni'],
        correct: 1,
        exp: 'V slovenčine hovoríme „sadnúť si“ (so SI), na rozdiel od iných slovanských jazykov.'
    },
    {
        id: 2,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'A2',
        q: 'Včera som _____.',
        hint: 'Pravidlo 2. miesta vo vete – neopakujeme „sa“ dvakrát',
        options: ['sa konečne naučil tieto slovíčka', 'konečne naučil sa tieto slovíčka', 'konečne naučil tieto slovíčka sa'],
        correct: 0,
        exp: 'Slovíčko „sa“ už stojí na druhom mieste vo vete („Včera som sa...“), preto ho pri slovese už neopakujeme.'
    },
    {
        id: 3,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'A2',
        q: 'Mám problém, môžeš mi, prosím ťa, _____ 10 eur?',
        hint: 'Niekto požičiava peniaze mne (smer ku mne vs. odo mňa)',
        options: ['požičať si', 'zapožičať', 'požičať'],
        correct: 2,
        exp: 'Keď žiadame niekoho, aby dal niečo nám, použijeme „požičať (mi)“. „Požičať si“ znamená vziať si niečo sám.'
    },
    {
        id: 4,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'A1',
        q: 'Zajtra nemôžem prísť, lebo _____ veľa práce.',
        hint: 'Prirodzená slovenská väzba pre vlastníctvo / povinnosti',
        options: ['u mňa je', 'mám', 'je u mňa'],
        correct: 1,
        exp: 'V slovenčine nepoužívame väzbu „u mňa je“, ale vždy sloveso „mať“ → mám veľa práce.'
    },
    {
        id: 5,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'B1',
        q: 'Cez víkend _____ ísť na výlet do hôr.',
        hint: 'Slovosled v podmieňovacom spôsobe (pravidlo 2. miesta)',
        options: ['chcel by som', 'ja by chcel', 'by som chcel'],
        correct: 2,
        exp: 'Príklonky „by som“ musia stáť na 2. pozícii vo vete hneď po prvom výraze („Cez víkend by som chcel...“).'
    },
    {
        id: 6,
        cat: 'sasi',
        catName: 'SA / SI a slovosled',
        level: 'A2',
        q: 'Môj syn _____ na univerzite v Košiciach.',
        hint: 'Vysoká škola / univerzita vs. učiť sa doma',
        options: ['sa učí', 'študuje', 'učí'],
        correct: 1,
        exp: 'Na univerzite alebo vysokej škole „študujeme“. „Učiť sa“ používame skôr pre konkrétny predmet alebo učenie sa doma.'
    },

    // KATEGÓRIA 2: SKLOŇOVANIE A PÁDY (6 otázok)
    {
        id: 7,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'A2',
        q: 'Môj starší brat je ženatý _____.',
        hint: 'S kým je ženatý? (Inštrumentál)',
        options: ['so Slovenkou', 'na Slovenke', 'za Slovenku'],
        correct: 0,
        exp: 'Muž je „ženatý s niekým“ (Inštrumentál) → so Slovenkou. Žena je „vydatá za niekoho“.'
    },
    {
        id: 8,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'A1',
        q: 'Dnes nemôžem prísť do práce, _____.',
        hint: 'Bolí koho/čo? (Akuzatív zámena ja)',
        options: ['bolí mi hlava', 'u mňa bolí hlava', 'bolí ma hlava'],
        correct: 2,
        exp: 'Sloveso „bolieť“ sa v slovenčine viaže s Akuzatívom (koho/čo?) → bolí ma hlava, bolí ma zub.'
    },
    {
        id: 9,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'A2',
        q: 'Moja mama už dlhé roky pracuje _____.',
        hint: 'Povolanie v slovenčine (Nominatív s „ako“)',
        options: ['lekárkou', 'ako lekárka', 'za lekárku'],
        correct: 1,
        exp: 'Pri povolaniach nepoužívame samotný inštrumentál („pracuje lekárkou“), ale väzbu „pracuje ako lekárka“.'
    },
    {
        id: 10,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'B1',
        q: 'Cez víkend som bola vonku so svojimi _____.',
        hint: 'Inštrumentál množného čísla slova „deti“',
        options: ['deťami', 'deťmi', 'deťov'],
        correct: 1,
        exp: 'Slovo „deti“ má v Inštrumentáli množného čísla nepravidelnú kratšiu koncovku -mi → s deťmi (s ľuďmi, s koňmi).'
    },
    {
        id: 11,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'A1',
        q: 'Prepáčte, ja _____.',
        hint: 'Rozumieť komu/čomu? (Datív)',
        options: ['vás nerozumiem', 'vám nerozumiem', 'pre vás nerozumiem'],
        correct: 1,
        exp: 'Sloveso „rozumieť“ sa viaže s Datívom (komu/čomu?) → rozumiem ti, nerozumiem vám.'
    },
    {
        id: 12,
        cat: 'pady',
        catName: 'Skloňovanie (Pády)',
        level: 'B1',
        q: 'Na včerajšom koncerte bolo veľmi veľa _____.',
        hint: 'Genitív množného čísla slova „ľudia“',
        options: ['ľudej', 'človekov', 'ľudí'],
        correct: 2,
        exp: 'Množné číslo od „človek“ je „ľudia“ a po slove „veľa“ nasleduje Genitív → veľa ľudí.'
    },

    // KATEGÓRIA 3: SLOVESÁ A SLOVESNÉ VÄZBY (6 otázok)
    {
        id: 13,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A1',
        q: 'Túto kávu, ktorú pijem, _____.',
        hint: 'Vzťah k jedlu, nápojom a veciam',
        options: ['veľmi ľúbim', 'mám veľmi rád', 'sa mi veľmi páči'],
        correct: 1,
        exp: 'Pri jedle a nápojoch používame „mať rád“ (mám rád kávu) alebo „chutiť“ (káva mi chutí). „Ľúbiť“ používame pre osoby.'
    },
    {
        id: 14,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A2',
        q: 'Táto polievka je výborná, _____.',
        hint: 'Ako pochválime dobré jedlo?',
        options: ['veľmi mi chutí', 'veľmi sa mi páči', 'veľmi ju ľúbim'],
        correct: 0,
        exp: 'Pri jedle a pití hovoríme, že nám „chutí“ (veľmi mi chutí). „Páči sa mi“ používame pre vizuálny dojem alebo veci.'
    },
    {
        id: 15,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A2',
        q: 'Každý piatok _____ s kamarátmi na pivo.',
        hint: 'Pravidelne opakovaný pohyb',
        options: ['ideme', 'chodíme', 'pôjdeme'],
        correct: 1,
        exp: 'Keď sa pohyb opakuje pravidelne („každý piatok“), používame sloveso „chodiť“ → chodíme na pivo.'
    },
    {
        id: 16,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A2',
        q: 'Prepáčte, že idem neskoro, _____ mi autobus.',
        hint: 'Keď dopravný prostriedok príde neskôr ako podľa grafikonu',
        options: ['opozdil sa', 'zmeškal', 'meškal'],
        correct: 2,
        exp: 'Autobus alebo vlak „meškal“. Človek môže „zmeškať autobus“ (nestihnúť ho).'
    },
    {
        id: 17,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A2',
        q: 'Neviem nájsť svoje kľúče, asi som ich včera _____.',
        hint: 'Keď niečo nevieme nájsť vs. keď niečo necháme doma',
        options: ['zabudol', 'stratil', 'zgubil'],
        correct: 1,
        exp: 'Keď kľúče vôbec nevieme nájsť, tak sme ich „stratili“. „Zabudol som kľúče“ povieme, keď vieme, že ostali napr. doma na stole.'
    },
    {
        id: 18,
        cat: 'slovesa',
        catName: 'Slovesá a väzby',
        level: 'A1',
        q: 'Polož tie kľúče _____ na stôl.',
        hint: 'Smer (kam?) vs. miesto (kde?)',
        options: ['tu', 'sem', 'semka'],
        correct: 1,
        exp: 'Pri pohybe (kam máš niečo položiť alebo prísť) používame spisovne „sem“ (Poď sem! Polož to sem!). „Tu“ vyjadruje statické miesto (Kde to je? Tu.).'
    },

    // KATEGÓRIA 4: PREDLOŽKY (6 otázok)
    {
        id: 19,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A1',
        q: 'Už desať minút tu stojím a čakám _____.',
        hint: 'Sloveso „čakať“ + predložka',
        options: ['autobus', 'na autobus', 'autobusu'],
        correct: 1,
        exp: 'Sloveso čakať sa v slovenčine viaže s predložkou NA + Akuzatív → čakám na autobus, čakám na teba.'
    },
    {
        id: 20,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A2',
        q: 'Stretneme sa v meste _____.',
        hint: 'Vyjadrenie presného času (hodiny)',
        options: ['v piatej', 'na piatu', 'o piatej'],
        correct: 2,
        exp: 'Pri určovaní času na hodinkách používame predložku O + Lokál → o piatej (hodine), o jednej, o desiatej.'
    },
    {
        id: 21,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A1',
        q: 'Zajtra ráno musím ísť _____.',
        hint: 'Inštitúcie s predložkou „na“',
        options: ['do pošty', 'na poštu', 'v poštu'],
        correct: 1,
        exp: 'Hovoríme „ísť na poštu, na políciu, na úrad, na stanicu“ (s predložkou NA).'
    },
    {
        id: 22,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'B1',
        q: 'Vlak do Košíc odchádza _____.',
        hint: 'Kedy v budúcnosti? (Častý chyták)',
        options: ['za päť minút', 'cez päť minút', 'o päť minút'],
        correct: 2,
        exp: 'Keď hovoríme, po akom čase v budúcnosti sa niečo stane, spisovne používame O + Akuzatív → o päť minút.'
    },
    {
        id: 23,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A2',
        q: 'Tento darček som dostal _____.',
        hint: 'Pôvod darčeka od osoby (Genitív)',
        options: ['z môjho brata', 'od môjho brata', 'od môjmu bratovi'],
        correct: 1,
        exp: 'Darček alebo správu dostávame OD niekoho (s Genitívom – od koho/čoho) → od môjho brata.'
    },
    {
        id: 24,
        cat: 'predlozky',
        catName: 'Predložky',
        level: 'A1',
        q: 'Teraz žijem a pracujem na _____.',
        hint: 'Lokál po predložke „na“',
        options: ['Slovenskom', 'Slovenska', 'Slovensku'],
        correct: 2,
        exp: 'Otázka KDE? (Lokál) → žijem na Slovensku.'
    },

    // KATEGÓRIA 5: SLOVNÁ ZÁSOBA A CHYTÁKY (6 otázok)
    {
        id: 25,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'A2',
        q: 'Mám rezervovanú _____ v tomto hoteli.',
        hint: 'Falošný priateľ pri ubytovaní v hoteli',
        options: ['číslo', 'izbu', 'miestnosť'],
        correct: 1,
        exp: 'V hoteli si rezervujeme „hotelovú izbu“ (nie „číslo“).'
    },
    {
        id: 26,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'B1',
        q: 'V tejto kaviarni je veľmi príjemná _____.',
        hint: 'Príjemný vs. nepríjemný vnem nosom',
        options: ['zápach', 'vôňa', 'čuch'],
        correct: 1,
        exp: 'Príjemná aróma (káva, kvety, parfum) je „vôňa“. Slovo „zápach“ znamená iba nepríjemný smrad.'
    },
    {
        id: 27,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'A1',
        q: 'Do Bratislavy som prišiel, keď som mal 25 _____.',
        hint: 'Vyjadrenie veku po číslovkách od 5 vyššie',
        options: ['roky', 'let', 'rokov'],
        correct: 2,
        exp: 'V slovenčine nepoužívame slovo „let“ pre vek. Po číslach 5 a viac používame Genitív množného čísla → 25 rokov.'
    },
    {
        id: 28,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'B1',
        q: 'Prosím si jeden _____ vývar.',
        hint: 'Polievka z mäsa z kravy / býka v reštaurácii',
        options: ['kravský', 'hovädzí', 'goviadzí'],
        correct: 1,
        exp: 'Mäso a vývar z tohto dobytka sa v slovenčine volá „hovädzí“ (hovädzí vývar, hovädzie mäso).'
    },
    {
        id: 29,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'A1',
        q: 'Po obede si prosím jednu _____ kávy.',
        hint: 'Z čoho pijeme teplú kávu alebo čaj?',
        options: ['čašku', 'šálku', 'pohár'],
        correct: 1,
        exp: 'Kávu a čaj pijeme zo „šálky“. „Pohár“ je zo skla na vodu, džús alebo víno (slovo „čaška“ v bežnej slovenčine nepoužívame).'
    },
    {
        id: 30,
        cat: 'slovna_zasoba',
        catName: 'Slovná zásoba a chytáky',
        level: 'B1',
        q: 'Aký máš _____ na túto situáciu?',
        hint: 'Keď sa pýtame, čo si niekto myslí o nejakej téme',
        options: ['pohľad', 'názor', 'mienku'],
        correct: 1,
        exp: 'Štandardná a najprirodzenejšia väzba v slovenčine je „mať názor na niečo“ (Aký máš na to názor?).'
    }
];

// KATALÓG KURZOV S BALÍČKAMI (TIERS)
const COURSES_DATA = {
    prvapomoc: {
        id: 'prvapomoc',
        title: 'Slovenská prvá pomoc (Minikurz)',
        badge: 'Minikurz A1 – B1 • Video + PDF + Vysvetlenia k testu',
        price: 29,
        desc: 'Tieto chyby robí až 90 % študentov! Praktický minikurz, v ktorom ťa rýchlo a zrozumiteľne odnaučíme najčastejšie gramatické chytáky (pády, predložky, falošných priateľov a slovosled). Ako bonus získaš kompletný PDF kľúč a vysvetlenia ku všetkým otázkam z testu.',
        packages: [
            { id: 'minikurz', name: 'Kompletný Minikurz + PDF rozbor chýb', price: 29, desc: 'Okamžitý prístup k lekciám, prehľadovým tabuľkám a detailným vysvetleniam správnych odpovedí' }
        ],
        bullets: [
            '✓ Najčastejšie gramatické pasce a chytáky vysvetlené po lopate',
            '✓ Rozdiel medzi zradnými slovíčkami (falošní priatelia v praxi)',
            '✓ Prehľadné ťaháky na predložky, pády a zvratné slovesá',
            '✓ BONUS ZDARMA: Kompletný rozbor a vysvetlenie všetkých 30 otázok z testu'
        ]
    },
    sasi: {
        id: 'sasi',
        title: 'Záhada menom SA a SI',
        badge: 'Skupinový kurz A2 – B1 • Zoom naživo + PDF',
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
        title: 'Ťažké témy B1 / Príprava A2+',
        badge: 'Skupinový kurz & A2 Simulátor • Zoom + PDF',
        price: 105,
        desc: 'Tvoja slovenčina je na výbornej úrovni! Posuň sa ešte ďalej v našom 5-týždňovom skupinovom kurze cez Zoom alebo si vyskúšaj prípravu na oficiálnu skúšku A2.',
        packages: [
            { id: 'standard', name: 'Skupinový kurz (5 týždňov Zoom + PDF)', price: 105, desc: '5x živá Zoom lekcia v malej skupine + PDF cvičenia + záznamy z hodín' },
            { id: 'a2sim', name: 'Simulátor a príprava na skúšku A2', price: 29, desc: 'Cvičné testy A2, tréning počúvania a porozumenia + vzorové odpovede' }
        ],
        bullets: [
            '✓ Konverzácia a ťažšie gramatické väzby v praxi bez stresu',
            '✓ Tréning na úroveň A2/B1 (počúvanie, písanie, rozprávanie)',
            '✓ Okamžitá spätná väzba a podpora v malej skupine',
            '✓ Kompletné študijné PDF materiály a nahrávky v cene'
        ]
    }
};

const COURSES = {
    prvapomoc: COURSES_DATA.prvapomoc,
    sasi: COURSES_DATA.sasi,
    b1: COURSES_DATA.b1
};
