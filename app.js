// Fáza 2: Prepínanie bilingválnej jazykovej pomoci
function setLangHelper(lang) {
    document.body.classList.remove('lang-ru', 'lang-en');
    document.getElementById('lang-btn-sk').className = 'px-2.5 py-1 rounded-full text-stone-600';
    document.getElementById('lang-btn-ru').className = 'px-2.5 py-1 rounded-full text-stone-600';
    document.getElementById('lang-btn-en').className = 'px-2.5 py-1 rounded-full text-stone-600';

    if (lang === 'ru') {
        document.body.classList.add('lang-ru');
        document.getElementById('lang-btn-ru').className = 'px-2.5 py-1 rounded-full bg-amber-600 text-white';
    } else if (lang === 'en') {
        document.body.classList.add('lang-en');
        document.getElementById('lang-btn-en').className = 'px-2.5 py-1 rounded-full bg-amber-600 text-white';
    } else {
        document.getElementById('lang-btn-sk').className = 'px-2.5 py-1 rounded-full bg-stone-900 text-white';
    }
}
