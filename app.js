// Prepínanie bilingválnej jazykovej pomoci (SK / UA / RU / EN)
function setLangHelper(lang) {
    document.body.classList.remove('lang-ua', 'lang-ru', 'lang-en');
    
    ['sk', 'ua', 'ru', 'en'].forEach(l => {
        const btn = document.getElementById('lang-btn-' + l);
        if (btn) btn.className = 'px-2.5 py-1 rounded-full text-stone-600 hover:text-stone-900 transition';
    });

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

let currentIndex = 0;
let userAnswers = {};

function startQuiz() {
    currentIndex = 0;
    userAnswers = {};
    document.getElementById('view-quiz').classList.remove('hidden');
    document.getElementById('view-results').classList.add('hidden');
    renderQuestion();
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
        btn.className = `w-full text-left p-4 rounded-xl border-2 font-medium transition ${sel ? 'border-amber-600 bg-amber-50 font-bold' : 'border-stone-200 hover:border-stone-300'}`;
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
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-results').classList.remove('hidden');
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
    const c = COURSES[courseId];
    document.getElementById('modal-title').textContent = `${c.title} (${c.price} €)`;
    document.getElementById('checkout-form-box').classList.remove('hidden');
    document.getElementById('checkout-success-box').classList.add('hidden');
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function completeOrder() {
    document.getElementById('checkout-form-box').classList.add('hidden');
    document.getElementById('checkout-success-box').classList.remove('hidden');
}

function downloadMaterial() {
    const blob = new Blob(['SLOW SLOVAK - Študijný ťahák SA vs. SI\n1. SA = akuzatív (umývam sa)\n2. SI = datív (umývam si ruky)'], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Slow_Slovak_Material.txt';
    a.click();
}
