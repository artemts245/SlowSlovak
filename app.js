// Fáza 2: Prepínanie bilingválnej jazykovej pomoci
function setLangHelper(lang) {
    document.body.classList.remove('lang-ua', 'lang-ru', 'lang-en');
    
    // Reset všetkých tlačidiel na sivé
    ['sk', 'ua', 'ru', 'en'].forEach(l => {
        const btn = document.getElementById('lang-btn-' + l);
        if (btn) btn.className = 'px-2.5 py-1 rounded-full text-stone-600 hover:text-stone-900 transition';
    });

    // Aktivácia zvoleného jazyka
    if (lang === 'ua') {
        document.body.classList.add('lang-ua');
        document.getElementById('lang-btn-ua').className = 'px-2.5 py-1 rounded-full bg-amber-600 text-white transition';
    } else if (lang === 'ru') {
        document.body.classList.add('lang-ru');
        document.getElementById('lang-btn-ru').className = 'px-2.5 py-1 rounded-full bg-amber-600 text-white transition';
    } else if (lang === 'en') {
        document.body.classList.add('lang-en');
        document.getElementById('lang-btn-en').className = 'px-2.5 py-1 rounded-full bg-amber-600 text-white transition';
    } else {
        document.getElementById('lang-btn-sk').className = 'px-2.5 py-1 rounded-full bg-stone-900 text-white transition';
    }
}