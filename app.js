// INICIALIZÁCIA IKON A ROZBAĽOVACIEHO MENU JAZYKOV
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();

    // Zatvorenie jazykového dropdownu pri kliknutí mimo neho
    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('lang-dropdown-wrapper');
        const menu = document.getElementById('lang-dropdown-menu');
        if (wrapper && menu && !wrapper.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    // Zatvorenie platobného modalu klávesom Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (typeof closeCourseModal === 'function') closeCourseModal();
            if (typeof closeCheckout === 'function') closeCheckout();
        }
    });
});

function toggleLangDropdown() {
    const menu = document.getElementById('lang-dropdown-menu');
    if (menu) menu.classList.toggle('hidden');
}

// Prepínanie bilingválnej jazykovej pomoci cez Dropdown (SK / UA / RU / EN)
function setLangHelper(lang) {
    document.body.classList.remove('lang-ua', 'lang-ru', 'lang-en');

    const normalized = (lang === 'none' || !lang) ? 'sk' : lang;
    const labels = {
        sk: '🇸🇰 Iba SK',
        ua: '🇺🇦 + UA (Ukrajinčina)',
        ru: '🇷🇺 + RU (Ruština)',
        en: '🇬🇧 + EN (Angličtina)'
    };

    if (normalized === 'ua') document.body.classList.add('lang-ua');
    if (normalized === 'ru') document.body.classList.add('lang-ru');
    if (normalized === 'en') document.body.classList.add('lang-en');

    const currentLabel = document.getElementById('lang-current-label');
    if (currentLabel) currentLabel.textContent = labels[normalized] || labels.sk;

    ['sk', 'ua', 'ru', 'en'].forEach(key => {
        const check = document.getElementById('lang-check-' + key);
        if (check) {
            if (key === normalized) check.classList.remove('opacity-0');
            else check.classList.add('opacity-0');
        }
    });

    const menu = document.getElementById('lang-dropdown-menu');
    if (menu) menu.classList.add('hidden');
}

// Prepínanie hlavných pohľadov (Domov / Kvíz / Výsledky)
function showView(viewName) {
    ['home', 'quiz', 'results'].forEach(v => {
        const el = document.getElementById('view-' + v);
        if (el) el.classList.add('hidden');
    });

    const target = document.getElementById('view-' + viewName);
    if (target) target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
}

// KVÍZOVÁ LOGIKA A CHECKOUT (z tvojho 5. commitu, prepojená s novým pohľadom)
let currentIndex = 0;
let userAnswers = {};

function startQuiz() {
    currentIndex = 0;
    userAnswers = {};
    showView('quiz');
    renderQuestion();
}

function startQuizFlow() {
    startQuiz();
}

function renderQuestion() {
    const q = ALL_QUESTIONS[currentIndex];
    document.getElementById('quiz-progress-text').textContent = `Otázka ${currentIndex + 1} / ${ALL_QUESTIONS.length} (${CATEGORIES[q.cat].name})`;
    document.getElementById('quiz-question-text').textContent = q.q;
    const box = document.getElementById('quiz-options');
    box.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        const sel = userAnswers[currentIndex] === idx;
        btn.className = `w-full text-left p-4 rounded-xl border-2 font-medium transition ${sel ? 'border-terracotta bg-amber-50 font-bold' : 'border-stone-200 hover:border-stone-300'}`;
        btn.textContent = opt;
        btn.onclick = () => { userAnswers[currentIndex] = idx; renderQuestion(); };
        box.appendChild(btn);
    });
}

function nextQuestion() {
    if (userAnswers[currentIndex] === undefined) return;
    if (currentIndex < ALL_QUESTIONS.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        calculateResults();
    }
}

function fillDemoResults() {
    ALL_QUESTIONS.forEach((q, i) => {
        userAnswers[i] = (q.cat === 'sasi' && i % 2 === 0) ? (q.correct + 1) % 4 : q.correct;
    });
    calculateResults();
}

function calculateResults() {
    showView('results');
    let total = 0;
    const scores = { sasi: {c:0,t:0}, sklonovanie: {c:0,t:0}, slovesa: {c:0,t:0}, predlozky: {c:0,t:0}, b1: {c:0,t:0} };
    ALL_QUESTIONS.forEach((q, i) => {
        scores[q.cat].t++;
        if (userAnswers[i] === q.correct) { total++; scores[q.cat].c++; }
    });
    let weakest = 'sasi', minPct = 101;
    const bars = document.getElementById('res-category-bars');
    bars.innerHTML = '';
    Object.keys(scores).forEach(k => {
        const pct = Math.round((scores[k].c / scores[k].t) * 100);
        if (pct < minPct) { minPct = pct; weakest = k; }
        bars.innerHTML += `<div class="p-3 bg-stone-50 rounded-xl flex justify-between items-center"><span>${CATEGORIES[k].name}</span><strong>${pct} %</strong></div>`;
    });
    document.getElementById('res-level-title').textContent = `Tvoj výsledok: Najväčší problém máš s témou ${CATEGORIES[weakest].name} (${minPct} %)`;
    const rec = weakest === 'sasi' ? COURSES.sasi : COURSES.b1;
    document.getElementById('res-recommendation-box').innerHTML = `
        <h3 class="text-xl font-bold mb-2">Odporúčaný kurz: ${rec.title} (${rec.price} €)</h3>
        <p class="text-sm text-stone-300 mb-4">Kurz je špeciálne navrhnutý tak, aby odstránil tvoje medzery v tejto oblasti.</p>
        <button onclick="openCheckout('${rec.id}')" class="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3 rounded-xl font-bold transition">Prihlásiť sa na kurz →</button>
    `;
}

function openCheckout(courseId) {
    const key = courseId === 'individual' ? 'indiv' : courseId;
    const c = COURSES[key] || COURSES.sasi;
    document.getElementById('modal-title').textContent = `${c.title} (${c.price} €)`;
    document.getElementById('checkout-form-box').classList.remove('hidden');
    document.getElementById('checkout-success-box').classList.add('hidden');
    document.getElementById('checkout-modal').classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
}

function openCourseModal(courseId) {
    openCheckout(courseId);
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function closeCourseModal() {
    closeCheckout();
}

function completeOrder() {
    document.getElementById('checkout-form-box').classList.add('hidden');
    document.getElementById('checkout-success-box').classList.remove('hidden');
}

function downloadMaterial() {
    const blob = new Blob(['SLOW SLOVAK - Študijný ťahák SA vs. SI\n1. SA = akuzatív (umývam sa)\n2. SI = datív (umývam si ruky)'], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Slow_Slovak_Material.txt';
    a.click();
}
