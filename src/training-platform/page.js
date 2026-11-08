export const platformUrl='https://didierthebault-web.github.io/formations-koha-bokeh/?view=home';
export const mascotUrl='./assets/formation-presentation/suzanne-index-leve.png';
const icon=path=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const icons=[icon('<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1ZM12 6v14"/>'),icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>'),icon('<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5M3 7h18"/>'),icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M10 9v11"/>')];
export const courses=[
 ['Cataloguer avec KOHA','Découvrir le catalogage bibliographique, les notices UNIMARC, les zones et sous-zones, la recherche et la récupération des notices.'],
 ['Administrer KOHA',"Comprendre les principales fonctions d'administration du SIGB, ses paramètres et les opérations de gestion."],
 ['Administrer BOKEH et organiser BIBDOC',"Découvrir les fonctionnalités d'administration du portail documentaire et les principes de son organisation."],
 ['Contribuer au portail BIBDOC','Apprendre à publier, organiser et valoriser les contenus documentaires dans le portail mutualisé.']
];
export function TrainingPlatformPage(){return `<article class="training-platform">
 <header><p class="eyebrow">Les ressources du réseau documentaire</p><h1>Formations KOHA &amp; BOKEH</h1><p class="tp-subtitle">Développez vos compétences en catalogage, administration documentaire et valorisation des collections.</p></header>
 <section class="tp-welcome" aria-labelledby="tp-welcome-title"><img src="${mascotUrl}" width="1274" height="1234" alt="Suzanne, la mascotte de Super bibliothécaire, souriante et l’index levé"><div><h2 id="tp-welcome-title">Un mot de Super bibliothécaire</h2>
 <p><strong>Bonjour !</strong></p><p>Vous souhaitez découvrir KOHA, mieux maîtriser le catalogage UNIMARC ou approfondir vos connaissances de BOKEH ?</p>
 <p>Je vous invite à explorer la plateforme de formation KOHA &amp; BOKEH, conçue pour accompagner les professionnels du réseau documentaire.</p>
 <p>Vous y trouverez des parcours pédagogiques, des leçons, des supports de formation et des ressources documentaires pour progresser à votre rythme.</p>
 <p>Que vous soyez catalogueur, administrateur ou contributeur au portail BIBDOC, vous pourrez y retrouver des informations utiles à vos activités.</p><p>Bonne découverte !<br><span class="tp-signature">— Super bibliothécaire</span></p></div></section>
 <section class="tp-introduction" aria-labelledby="tp-platform-title"><h2 id="tp-platform-title">Une plateforme pour vous accompagner</h2><p>La plateforme Formations KOHA &amp; BOKEH rassemble les ressources pédagogiques consacrées à l'utilisation de KOHA, à son administration, à la gestion de BOKEH et à la contribution au portail documentaire mutualisé BIBDOC.</p><p>Elle permet de consulter les contenus de formation et les ressources mises à disposition du réseau documentaire.</p></section>
 <section aria-labelledby="tp-courses-title"><h2 id="tp-courses-title">Les parcours proposés</h2><div class="tp-courses">${courses.map(([title,description],i)=>`<article class="tp-course">${icons[i]}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div></section>
 <section class="tp-access" aria-label="Accès à la plateforme"><a class="tp-cta" href="${platformUrl}" target="_blank" rel="noopener noreferrer" aria-describedby="tp-external">Accéder à la plateforme de formation <span aria-hidden="true">↗</span></a><p id="tp-external">Ouvre le site Formations KOHA &amp; BOKEH dans un nouvel onglet.</p></section>
 </article>`;}
