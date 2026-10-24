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

// ČAKACIA LISTINA (WAITLIST PRE PRIPRAVOVANÉ KURZY)
function selectWaitlistTopic(topic) {
    const label = document.getElementById('waitlist-selected-label');
    const input = document.getElementById('waitlist-email');
    if (label) label.textContent = 'Vybraná téma: ' + topic;
    if (input) input.focus();
}

function handleWaitlistSubmit(e) {
    e.preventDefault();
    const success = document.getElementById('waitlist-success');
    const input = document.getElementById('waitlist-email');
    if (success) success.classList.remove('hidden');
    if (input) input.value = '';
}

// PLNÝ DIAGNOSTICKÝ KVÍZ (30 vs 10 otázok, nápovedy, tlačidlo Neviem) A DETAILNÉ VÝSLEDKY
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizLengthMode = 30;
let selectedCourseKey = 'sasi';
let selectedPackagePrice = 99;

function setQuizLengthMode(count) {
    quizLengthMode = count;
    const btn30 = document.getElementById('mode-btn-30');
    const btn10 = document.getElementById('mode-btn-10');

    if (count === 30) {
        btn30.className = 'px-2 py-0.5 rounded font-semibold bg-indigo-950 text-white';
        btn10.className = 'px-2 py-0.5 rounded font-semibold text-stone-600 hover:bg-stone-100';
    } else {
        btn10.className = 'px-2 py-0.5 rounded font-semibold bg-indigo-950 text-white';
        btn30.className = 'px-2 py-0.5 rounded font-semibold text-stone-600 hover:bg-stone-100';
    }
    startQuizFlow();
}

function startQuizFlow() {
    if (quizLengthMode === 10) {
        const cats = ['sasi', 'sklonovanie', 'slovesa', 'predlozky', 'b1vazby'];
        activeQuestions = [];
        cats.forEach(c => {
            const catQs = ALL_QUESTIONS.filter(q => q.cat === c).slice(0, 2);
            activeQuestions.push(...catQs);
        });
    } else {
        activeQuestions = [...ALL_QUESTIONS];
    }

    currentQuestionIndex = 0;
    userAnswers = [];
    showView('quiz');
    renderCurrentQuestion();
}

function startQuiz() {
    startQuizFlow();
}

function renderCurrentQuestion() {
    const qObj = activeQuestions[currentQuestionIndex];
    const total = activeQuestions.length;

    document.getElementById('quiz-current-num').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-total-num').textContent = total;
    document.getElementById('quiz-cat-badge').textContent = qObj.catName;
    document.getElementById('quiz-level-badge').textContent = 'Úroveň ' + qObj.level;

    const pct = ((currentQuestionIndex + 1) / total) * 100;
    document.getElementById('quiz-progress-bar').style.width = pct + '%';

    document.getElementById('quiz-question-text').textContent = qObj.q;
    document.getElementById('quiz-question-hint').textContent = '💡 Kontekst: ' + qObj.hint;

    const container = document.getElementById('quiz-options-container');
    container.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    qObj.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-stone-200 hover:border-terracotta hover:bg-amber-50/40 transition flex items-center gap-4 group';
        btn.onclick = () => handleQuizAnswer(idx);

        btn.innerHTML = `
            <span class="w-9 h-9 rounded-xl bg-stone-100 group-hover:bg-terracotta group-hover:text-white text-indigo-950 font-bold text-sm flex items-center justify-center shrink-0 transition">
                ${letters[idx]}
            </span>
            <span class="font-medium text-base sm:text-lg text-indigo-950">${optText}</span>
        `;
        container.appendChild(btn);
    });
}

function handleQuizAnswer(selectedIndex) {
    const qObj = activeQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === qObj.correct;

    userAnswers.push({
        qObj: qObj,
        selectedIndex: selectedIndex,
        isCorrect: isCorrect,
        cat: qObj.cat
    });

    if (currentQuestionIndex + 1 < activeQuestions.length) {
        currentQuestionIndex++;
        renderCurrentQuestion();
    } else {
        calculateAndShowResults();
    }
}

function calculateAndShowResults() {
    const totalQs = activeQuestions.length;
    const totalCorrect = userAnswers.filter(a => a.isCorrect).length;
    const overallPct = Math.round((totalCorrect / totalQs) * 100);

    const categoryMeta = [
        { key: 'slovesa', label: 'Slovesá a časy' },
        { key: 'predlozky', label: 'Predložky (do/na, pre/za...)' },
        { key: 'sklonovanie', label: 'Skloňovanie (pády a koncovky)' },
        { key: 'sasi', label: 'Zvratné slovesá SA / SI a slovosled' },
        { key: 'b1vazby', label: 'B1 Väzby a podmienky (keby, aby...)' }
    ];

    const catStats = categoryMeta.map(cm => {
        const qsInCat = userAnswers.filter(a => a.cat === cm.key);
        const correctInCat = qsInCat.filter(a => a.isCorrect).length;
        const pct = qsInCat.length > 0 ? Math.round((correctInCat / qsInCat.length) * 100) : 0;
        return {
            ...cm,
            correct: correctInCat,
            total: qsInCat.length,
            pct: pct
        };
    });

    const sortedByWeakest = [...catStats].sort((a, b) => a.pct - b.pct);
    const weakestCat = sortedByWeakest[0];
    const secondWeakest = sortedByWeakest[1];

    let levelLabel = 'A2 (Mierne pokročilý)';
    if (overallPct < 42) {
        levelLabel = 'A1 / A2- (Začiatočník)';
    } else if (overallPct >= 78) {
        levelLabel = 'B1 (Stredne pokročilý)';
    }

    document.getElementById('res-level-title').textContent = levelLabel;
    document.getElementById('res-total-percent').textContent = overallPct + ' %';
    document.getElementById('res-total-points').textContent = `${totalCorrect} / ${totalQs} správne`;

    const diagEl = document.getElementById('res-summary-diagnosis');
    if (overallPct >= 85) {
        diagEl.innerHTML = `Skvelá práca! Tvoja slovenčina je na veľmi dobrej úrovni. Najviac bodov si stratil/a v téme <strong>${weakestCat.label.toLowerCase()}</strong> (${weakestCat.pct} %).`;
    } else {
        diagEl.innerHTML = `Tvoj výsledok zodpovedá úrovni <strong>${levelLabel}</strong>, ale najväčší problém ti momentálne robí <strong>${weakestCat.label.toLowerCase()} (${weakestCat.pct} %)</strong> a <strong>${secondWeakest.label.toLowerCase()} (${secondWeakest.pct} %)</strong>.`;
    }

    const barsContainer = document.getElementById('res-categories-bars');
    barsContainer.innerHTML = '';

    const sortedHighToLow = [...catStats].sort((a, b) => b.pct - a.pct);

    sortedHighToLow.forEach(stat => {
        const isWeakest = stat.key === weakestCat.key;
        let barColor = 'bg-emerald-500';
        let textColor = 'text-emerald-700';

        if (stat.pct < 55) {
            barColor = 'bg-terracotta';
            textColor = 'text-terracotta';
        } else if (stat.pct < 75) {
            barColor = 'bg-amber-500';
            textColor = 'text-amber-700';
        }

        const wrapperClass = isWeakest
            ? 'p-4 rounded-2xl bg-red-50/90 border-2 border-terracotta/50'
            : 'p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80';

        const badgeHtml = isWeakest
            ? `<span class="text-[11px] font-bold uppercase tracking-wider bg-terracotta text-white px-2.5 py-0.5 rounded-full ml-2">Tvoja hlavná slabina</span>`
            : '';

        const item = document.createElement('div');
        item.className = wrapperClass;
        item.innerHTML = `
            <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span class="font-semibold text-sm sm:text-base text-indigo-950 flex items-center">
                    ${stat.label} ${badgeHtml}
                </span>
                <span class="font-bold text-sm sm:text-base ${textColor}">
                    ${stat.pct} % <span class="text-xs font-normal text-stone-400">(${stat.correct}/${stat.total})</span>
                </span>
            </div>
            <div class="w-full h-3 bg-white rounded-full overflow-hidden border border-stone-200/60">
                <div class="${barColor} h-full rounded-full progress-bar-fill" style="width: ${Math.max(stat.pct, 6)}%"></div>
            </div>
        `;
        barsContainer.appendChild(item);
    });

    let recCourseId = 'sasi';
    let customRecHeadline = '';

    if (weakestCat.key === 'sasi') {
        recCourseId = 'sasi';
        customRecHeadline = `Najväčší problém máš so SA/SI (${weakestCat.pct} %) → pozri si kurz „Záhada menom SA a SI“`;
    } else if (weakestCat.key === 'b1vazby' || weakestCat.key === 'slovesa' || weakestCat.key === 'predlozky') {
        if (overallPct < 45 && catStats.find(c => c.key === 'sasi').pct <= 50) {
            recCourseId = 'sasi';
            customRecHeadline = `Najprv si urob poriadok v základoch a SA/SI → odporúčame kurz „Záhada menom SA a SI“`;
        } else {
            recCourseId = 'b1';
            customRecHeadline = `Najviac ťa brzdia ${weakestCat.label.toLowerCase()} (${weakestCat.pct} %) → pozri si kurz „Ťažké témy B1“`;
        }
    } else if (weakestCat.key === 'sklonovanie') {
        const sasiScore = catStats.find(c => c.key === 'sasi').pct;
        if (sasiScore <= 67) {
            recCourseId = 'sasi';
            customRecHeadline = `Skloňovanie aj SA/SI ti robia starosti → začni kurzom „Záhada menom SA a SI“`;
        } else {
            recCourseId = 'b1';
            customRecHeadline = `Tvojou slabinou sú pády a väzby (${weakestCat.pct} %) → trénuj ich v kurze „Ťažké témy B1“`;
        }
    }

    const recCourse = COURSES_DATA[recCourseId];
    document.getElementById('rec-course-headline').textContent = customRecHeadline;
    document.getElementById('rec-course-desc').textContent = recCourse.desc;
    document.getElementById('rec-card-title').textContent = recCourse.title;
    document.getElementById('rec-card-price').textContent = recCourse.packages[0].price + ' €';
    document.getElementById('rec-card-subprice').textContent = recCourse.packages.length > 1 ? `/ ${recCourse.packages[1].price} € PLUS` : '/ kompletný kurz';
    document.getElementById('rec-card-btn').setAttribute('onclick', `openCourseModal('${recCourseId}')`);

    const bulletsEl = document.getElementById('rec-course-bullets');
    bulletsEl.innerHTML = recCourse.bullets.map(b => `<li>${b}</li>`).join('');

    renderMistakesReview();
    showView('results');
}

function renderMistakesReview() {
    const container = document.getElementById('mistakes-review-container');
    container.innerHTML = '';

    userAnswers.forEach((ans, idx) => {
        const q = ans.qObj;
        const userText = ans.selectedIndex === -1 ? 'Neviem (Preskočené)' : q.options[ans.selectedIndex];
        const correctText = q.options[q.correct];

        const card = document.createElement('div');
        card.className = `p-4 rounded-2xl border text-sm ${ans.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'}`;
        card.innerHTML = `
            <div class="flex items-start justify-between gap-2 mb-1">
                <span class="font-bold text-indigo-950">${idx + 1}. ${q.q}</span>
                <span class="text-xs font-bold px-2 py-0.5 rounded shrink-0 ${ans.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                    ${ans.isCorrect ? 'Správne' : 'Chyba'}
                </span>
            </div>
            <div class="text-xs space-y-1 mt-2">
                <p>Tvoja odpoveď: <strong class="${ans.isCorrect ? 'text-emerald-700' : 'text-red-700 line-through'}">${userText}</strong></p>
                ${!ans.isCorrect ? `<p>Správna odpoveď: <strong class="text-emerald-700">${correctText}</strong></p>` : ''}
                <p class="text-stone-600 pt-1 italic">💡 Vysvetlenie: ${q.exp}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleMistakesReview() {
    const el = document.getElementById('mistakes-review-container');
    const btnText = document.getElementById('toggle-review-btn-text');
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        btnText.textContent = 'Skryť správne odpovede';
    } else {
        el.classList.add('hidden');
        btnText.textContent = 'Zobraziť správne odpovede';
    }
}

// PLNÝ MULTI-TIER CHECKOUT MODAL (zatváranie krížikom v rohu) A DYNAMICKÉ SŤAHOVANIE MATERIÁLOV
function openCourseModal(courseKey) {
    const normalizedKey = courseKey === 'indiv' ? 'individual' : courseKey;
    selectedCourseKey = COURSES_DATA[normalizedKey] ? normalizedKey : 'sasi';
    const course = COURSES_DATA[selectedCourseKey];

    document.getElementById('modal-course-badge').textContent = course.badge;
    document.getElementById('modal-course-title').textContent = course.title;
    document.getElementById('modal-course-desc').textContent = course.desc;

    document.getElementById('modal-step-checkout').classList.remove('hidden');
    document.getElementById('modal-step-success').classList.add('hidden');

    const pkgList = document.getElementById('modal-packages-list');
    pkgList.innerHTML = '';

    course.packages.forEach((pkg, idx) => {
        if (idx === 0) selectedPackagePrice = pkg.price;
        const card = document.createElement('div');
        card.className = `p-4 rounded-2xl border-2 cursor-pointer transition ${idx === 0 ? 'border-terracotta bg-amber-50/40' : 'border-stone-200 hover:border-stone-300'}`;
        card.onclick = () => selectModalPackage(pkg.price, card);
        card.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-sm text-indigo-950">${pkg.name}</span>
                <span class="font-serif font-bold text-lg text-terracotta">${pkg.price} €</span>
            </div>
            <p class="text-xs text-stone-500">${pkg.desc}</p>
        `;
        pkgList.appendChild(card);
    });

    document.getElementById('checkout-final-price').textContent = selectedPackagePrice + ' €';
    document.getElementById('checkout-modal').classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
}

function openCheckout(courseKey) {
    openCourseModal(courseKey);
}

function selectModalPackage(price, clickedEl) {
    selectedPackagePrice = price;
    document.getElementById('checkout-final-price').textContent = price + ' €';
    const children = document.getElementById('modal-packages-list').children;
    for (let c of children) {
        c.className = 'p-4 rounded-2xl border-2 cursor-pointer transition border-stone-200 hover:border-stone-300';
    }
    clickedEl.className = 'p-4 rounded-2xl border-2 cursor-pointer transition border-terracotta bg-amber-50/40';
}

function closeCourseModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('hidden');
}

function closeCheckout() {
    closeCourseModal();
}

function processSimulatedPayment(e) {
    e.preventDefault();
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;

    document.getElementById('success-student-name').textContent = name;
    document.getElementById('success-student-email').textContent = email;

    document.getElementById('modal-step-checkout').classList.add('hidden');
    document.getElementById('modal-step-success').classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
}

function downloadSampleMaterial() {
    const courseTitle = COURSES_DATA[selectedCourseKey].title;
    const content = `SLOW SLOVAK - ŠTUDIJNÝ MATERIÁL
Kurz: ${courseTitle}
========================================

Ďakujeme za prihlásenie! Tu je tvoj prehľad k prvej lekcii:

1. Pravidlo druhého miesta vo vete (SA / SI):
   V slovenčine dávame zvratné zámená SA a SI na druhé miesto vo vete.
   Príklad: Včera SOM SA stretol s kamarátom.

2. Rozdiel SA vs. SI:
   - Umyť SA (celé telo) vs. Umyť SI ruky (konkrétny predmet)
   - Kúpiť SI kávu (pre seba)

Teším sa na teba na našom Zoom stretnutí!
Slow Slovak`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Slow-Slovak-Materialy-${selectedCourseKey}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function downloadMaterial() {
    downloadSampleMaterial();
}
