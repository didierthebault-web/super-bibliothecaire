import one from './module-1.js';
import two from './module-2.js';
import three from './module-3.js';
import four from './module-4.js';
import five from './module-5.js';
export const courses=[
{id:1,title:'Les fondamentaux du catalogage',short:'Décrire un document',description:'Le rôle du catalogue, les sources et la lecture d’une description ISBD.',objective:'Comprendre pourquoi on catalogue et comment on décrit une monographie.',pages:[4,11],image:'expliquer',lessons:one},
{id:2,title:'Comprendre la transition bibliographique',short:'Relier les informations',description:'Des fiches aux entités : FRBR, Œuvre, Expression, Manifestation, Item et LRM.',objective:'Comprendre pourquoi les modèles de données bibliographiques ont évolué.',pages:[12,16],image:'accueil',lessons:two},
{id:3,title:'Découvrir UNIMARC',short:'Lire la structure',description:'Des blocs aux sous-zones : comprendre ce qui se cache derrière les codes.',objective:'Comprendre la structure d’une notice bibliographique UNIMARC.',pages:[17,26],image:'lire',lessons:three},
{id:4,title:'Les points d’accès bibliographiques',short:'Retrouver une ressource',description:'Personnes, collectivités, titres et sujets : organiser la recherche.',objective:'Distinguer description bibliographique et accès aux ressources.',pages:[27,29],image:'presenter',lessons:four},
{id:5,title:'Comprendre les notices d’autorité',short:'Identifier sans confondre',description:'Formes retenues, variantes, relations et sources : le rôle des autorités.',objective:'Comprendre les autorités et les distinguer des notices bibliographiques.',pages:[30,40],image:'portrait-livre',lessons:five}
];
export const lessons=courses.flatMap(c=>c.lessons);
export const findCourse=id=>courses.find(c=>c.id===Number(id));
export const findLesson=id=>lessons.find(l=>l.id===id);
export const lessonHref=l=>`#apprendre/module/${l.moduleId}/lecon/${l.id}`;
export function readingMinutes(items){const text=items.flatMap(l=>[l.teacher,...l.paragraphs,l.example?.text||'',...l.takeaways]).join(' ');return Math.max(1,Math.ceil(text.split(/\s+/).filter(Boolean).length/180));}
