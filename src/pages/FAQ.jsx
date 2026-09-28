import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui';
import { navigate } from '../lib/nav';

const FAQS = [
  {
    q: 'Que vend le catalogue Moroccan Medieval ?',
    a: 'Deux types d’assets 100 % originaux pour Roblox : des plugins Roblox Studio en Luau (utilitaires pour développeurs, ex. renommage en masse, soudures) et des packs de modèles 3D low-poly procéduraux à la touche marocaine (lanternes fanous, fontaine à zellige, arche en fer à cheval, théière en laiton, tagine…). Les avatars UGC viendront en phase 2.',
  },
  {
    q: 'Les assets sont-ils vraiment originaux ?',
    a: 'Oui. Chaque mesh est généré de façon procédurale par du code écrit à la main, chaque plugin est codé from scratch. Aucune copie, aucun remix, aucune revente d’assets tiers — c’est une règle absolue du projet.',
  },
  {
    q: 'Comment sont fixés les prix ?',
    a: 'Les prix affichés sont des prix TESTS en Robux (ex. 199 R$ par plugin, 399 R$ le pack phare). Ils seront ajustés après les premières ventes selon la demande réelle du Creator Store.',
  },
  {
    q: 'Comment le simulateur calcule-t-il les revenus ?',
    a: 'Avec le taux DevEx officiel (0,0038 $ US par Robux), la commission marketplace de 30 % et le seuil de 30 000 Robux pour retirer ses gains. Ce sont des hypothèses de calcul, jamais des revenus garantis.',
  },
  {
    q: 'Qui publie les assets sur Roblox ?',
    a: 'Hicham, manuellement, depuis Roblox Studio sur son PC. Rien n’est jamais publié automatiquement : chaque asset passe d’abord par les statuts Staging puis Testé Studio dans ce QG.',
  },
  {
    q: 'C’est quoi le « Pont Muse » ?',
    a: 'L’assistant IA Muse nourrit lui-même ce site : à chaque vague de production hebdomadaire, il met à jour le fichier data/catalogue.json (nouveaux assets, prix, statuts) et le pousse sur le dépôt Git. L’app recharge les données sans aucune saisie manuelle.',
  },
  {
    q: 'Que signifient les statuts du pipeline ?',
    a: 'Idée → En production → Staging (prêt, en attente de test) → Testé Studio (validé dans Roblox Studio) → Publié (en vente sur le Creator Store). « Archivé » marque les assets remplacés, conservés pour l’historique.',
  },
  {
    q: 'Puis-je déjà acheter ces assets ?',
    a: 'Pas encore : tout est en « staging », la phase de test dans Roblox Studio est en cours. Les mises en vente arriveront vague par vague — suivez la page Roadmap.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-8 fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-marcellus text-sable flex items-center gap-3">
          <HelpCircle size={28} className="text-or" />
          FAQ
        </h1>
        <p className="text-sable/50 text-sm mt-2">
          Les réponses aux questions fréquentes sur le catalogue, les prix et le pipeline.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Card key={i} className="overflow-hidden" hoverable={false}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium text-sable text-sm md:text-base">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-or transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-sable/60 leading-relaxed border-t border-white/5 pt-4">{f.a}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-6 text-center" hoverable={false}>
        <p className="text-sm text-sable/60">Une autre question ? La roadmap montre ce qui arrive ensuite.</p>
        <button
          onClick={() => navigate('/roadmap')}
          className="text-sm text-or hover:text-or-light font-medium mt-2 transition-colors"
        >
          Voir la roadmap →
        </button>
      </Card>
    </div>
  );
}
