import { useState } from 'react';
import {
  Wrench, Copy, Check, Camera, Cpu, Box, Download, ChevronDown,
  AlertTriangle, Lightbulb, ListChecks, FileCode2, Sparkles, Gamepad2, Hammer,
} from 'lucide-react';
import { Card, SectionTitle } from '../components/ui';

/* ---------- Bloc de code avec bouton copier ---------- */
function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/40">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10">
        <span className="text-[11px] uppercase tracking-widest text-sable/40">{label || 'Commande'}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-sable/60 hover:text-or transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <pre className="p-3 text-xs md:text-sm text-or-light/90 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ---------- Étape numérotée ---------- */
function Step({ n, icon: Icon, title, children }) {
  return (
    <Card className="p-5 md:p-6" hoverable={false}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zellige/20 border border-zellige/40 flex items-center justify-center">
          <Icon size={18} className="text-zellige-light" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-marcellus text-lg text-sable mb-1">
            <span className="text-or mr-2">{n}.</span>{title}
          </h3>
          <div className="space-y-3 text-sm text-sable/60 leading-relaxed">{children}</div>
        </div>
      </div>
    </Card>
  );
}

const INSTALL_RESUME = `1. Python 3.10 ou 3.11 (64-bit) — cocher "Add python.exe to PATH"
2. Visual Studio 2022 Community — charge "Développement Desktop en C++"
3. Pilote NVIDIA à jour + CUDA Toolkit
4. git clone https://github.com/Stability-AI/stable-fast-3d
5. python -m venv venv && .\\venv\\Scripts\\Activate.ps1
6. pip install torch torchvision --index-url https://download.pytorch.org/whl/cu126
7. pip install -U setuptools==69.5.1 && pip install wheel && pip install -r requirements.txt
8. Compte Hugging Face gratuit → demander l'accès au modèle stabilityai/stable-fast-3d
9. huggingface-cli login (token read)`;

const PHOTO_RULES = [
  'Fond uni et clair (blanc idéal) — le modèle détoure l’objet à partir du fond',
  'Objet centré, occupant 60 à 80 % de l’image, en vue 3/4 légèrement en plongée',
  'Un seul objet, bien éclairé, sans ombre dure ni reflet violent',
  'Pas de texte, pas de watermark dans l’image',
  'Format PNG ou JPG, 1024 px de côté suffisent',
];

const QUALITY_TIPS = [
  'Les objets symétriques (vases, lanternes, tagines) donnent les meilleurs résultats.',
  'Les surfaces réfléchissantes (laiton poli, verre) sont le point faible : préfère une lumière diffuse et un métal légèrement patiné.',
  'Pour un pack de 10 props, génère 10 photos d’entrée cohérentes (même fond, même angle, même lumière) → collection homogène.',
  'Combine les deux pipelines du projet : Stable Fast 3D pour les pièces « héro », le générateur procédural pour le remplissage.',
];

const TROUBLESHOOTING = [
  ['Mesh déformé / fondu', 'Image d’entrée floue ou fond chargé → refaire la photo'],
  ['Dos de l’objet bizarre', 'Normal : le modèle invente l’invisible → tester un autre angle de vue'],
  ['CUDA out of memory', '--texture-resolution 512, fermer les applis qui utilisent le GPU'],
  ['Texture floue', 'Image d’entrée trop petite → viser 1024 px minimum'],
  ['401 Unauthorized (Hugging Face)', 'Refaire huggingface-cli login ; vérifier l’accès accordé au modèle'],
];

const CHECKLIST = [
  'Échelle vérifiée (ex. un fanous ≈ 1 à 2 studs de haut)',
  'Orientation correcte (face avant vers le joueur)',
  'Moins de 20 000 triangles (limite Roblox)',
  'Collisions configurées (CanCollide / CanQuery selon l’usage)',
  'Matériaux et textures appliqués (SurfaceAppearance si besoin)',
  'Testé en jeu dans Roblox Studio',
  'Testé sur mobile (rendu + performance)',
  'Prix test défini en Robux',
  'Statut pipeline mis à jour dans le QG',
];

export default function Outils() {
  const [installOpen, setInstallOpen] = useState(false);
  const [checked, setChecked] = useState(() => CHECKLIST.map(() => false));
  const doneCount = checked.filter(Boolean).length;
  const toggle = (i) => setChecked((c) => c.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="space-y-10 fade-in max-w-4xl">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-marcellus text-sable flex items-center gap-3">
          <Wrench size={28} className="text-or" />
          Outils de création
        </h1>
        <p className="text-sable/50 text-sm mt-2">
          Les deux pipelines du projet pour créer du contenu 100 % original :
          la génération 3D par IA et le générateur procédural maison.
        </p>
      </div>

      {/* ============ STABLE FAST 3D ============ */}
      <section className="space-y-5">
        <SectionTitle subtitle="Image → mesh 3D texturé (GLB) en quelques secondes, sur ton PC (RTX 2060).">
          <span className="flex items-center gap-2">
            <Sparkles size={22} className="text-or" /> Stable Fast 3D
          </span>
        </SectionTitle>

        {/* Installation — résumé repliable */}
        <Card className="overflow-hidden" hoverable={false}>
          <button
            onClick={() => setInstallOpen(!installOpen)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="font-medium text-sable text-sm md:text-base flex items-center gap-2">
              <Hammer size={16} className="text-or" />
              Installation sur le PC — résumé (détail complet dans 3d-tools)
            </span>
            <ChevronDown size={18} className={`flex-shrink-0 text-or transition-transform duration-200 ${installOpen ? 'rotate-180' : ''}`} />
          </button>
          {installOpen && (
            <div className="px-5 pb-5">
              <div className="border-t border-white/5 pt-4">
                <CodeBlock code={INSTALL_RESUME} label="Étapes d'installation (PowerShell)" />
                <p className="text-xs text-sable/40 mt-3">
                  Coût : 0 $. Le modèle est « gated » sur Hugging Face : accès gratuit sur demande,
                  généralement accepté automatiquement.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Les 5 étapes */}
        <div className="space-y-4">
          <Step n={1} icon={Camera} title="Préparer une bonne photo d’entrée">
            <p>
              La qualité du résultat dépend à 80 % de l’image d’entrée. Voici l’exemple
              idéal — un fanous en laiton, fond blanc, vue 3/4. Télécharge-la pour ton
              premier test :
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img
                src="/outils/fanous-exemple.png"
                alt="Exemple de photo d’entrée idéale : fanous en laiton sur fond blanc"
                className="rounded-lg border border-white/10 w-full md:w-64 object-cover"
              />
              <div className="flex-1 space-y-3">
                <ul className="space-y-1.5">
                  {PHOTO_RULES.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <Check size={14} className="text-zellige-light flex-shrink-0 mt-1" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/outils/fanous-exemple.png"
                  download="fanous-exemple.png"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-or/15 border border-or/40 text-or text-sm font-medium hover:bg-or/25 transition-colors"
                >
                  <Download size={15} /> Télécharger l’image de test
                </a>
              </div>
            </div>
          </Step>

          <Step n={2} icon={Cpu} title="Générer le mesh">
            <p>Dans PowerShell, environnement virtuel activé, depuis le dossier du projet :</p>
            <CodeBlock label="Génération simple" code={'cd $HOME\\stable-fast-3d\n.\\venv\\Scripts\\Activate.ps1\npython run.py fanous-exemple.png --output-dir output/'} />
            <p>Quelques secondes plus tard : <code className="text-or/80">output/fanous-exemple.glb</code> — ton mesh texturé.</p>
            <CodeBlock label="Si erreur mémoire (texture 512 au lieu de 1024)" code={'python run.py fanous-exemple.png --output-dir output/ --texture-resolution 512'} />
            <CodeBlock label="Remaillage intégré (none | triangle | quad)" code={'python run.py fanous-exemple.png --output-dir output/ --remesh_option triangle'} />
          </Step>

          <Step n={3} icon={Box} title="Vérifier dans Blender">
            <p>
              Blender (gratuit) → File → Import → glTF 2.0 → ton <code className="text-or/80">.glb</code>.
              La forme est-elle reconnaissable ? La texture est-elle bien plaquée ?
              Les faces invisibles sur la photo sont « inventées » par le modèle —
              tourne autour de l’objet pour les inspecter. Si le dos est moche :
              régénère avec une photo prise sous un autre angle.
            </p>
          </Step>

          <Step n={4} icon={FileCode2} title="Préparer pour Roblox">
            <p>
              Roblox refuse les meshes de plus de <strong className="text-sable">20 000 triangles</strong>.
              Dans Blender : sélectionne l’objet → Modifiers → <strong className="text-sable">Decimate</strong> (ratio ~0,3 à 0,5)
              → Apply → vérifie le compteur de triangles → File → Export → <strong className="text-sable">FBX</strong> (cocher « Apply Transform »).
            </p>
          </Step>

          <Step n={5} icon={Gamepad2} title="Importer dans Roblox Studio">
            <p>
              Studio → onglet <strong className="text-sable">Avatar</strong> → <strong className="text-sable">3D Importer</strong> →
              choisis ton FBX. Vérifie l’échelle et l’orientation. La texture SF3D s’applique
              via <code className="text-or/80">SurfaceAppearance</code> sur le MeshPart.
              Teste en jeu et sur mobile avant de publier.
            </p>
          </Step>
        </div>

        {/* Astuces qualité */}
        <Card className="p-5 md:p-6" hoverable={false}>
          <h3 className="font-marcellus text-lg text-sable flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-or" /> Astuces qualité
          </h3>
          <ul className="space-y-2 text-sm text-sable/60 leading-relaxed">
            {QUALITY_TIPS.map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-or flex-shrink-0">◆</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Dépannage express */}
        <Card className="p-5 md:p-6 overflow-hidden" hoverable={false}>
          <h3 className="font-marcellus text-lg text-sable flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-terracotta" /> Dépannage express
          </h3>
          <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-2 pr-4 font-medium text-sable/80 whitespace-nowrap">Problème</th>
                  <th className="pb-2 font-medium text-sable/80">Solution</th>
                </tr>
              </thead>
              <tbody>
                {TROUBLESHOOTING.map(([p, s], i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-2.5 pr-4 text-terracotta-light whitespace-nowrap align-top">{p}</td>
                    <td className="py-2.5 text-sable/60">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Licence */}
        <Card className="p-5 md:p-6 border-or/30" hoverable={false}>
          <h3 className="font-marcellus text-lg text-sable mb-2">⚖️ Licence — avant de vendre</h3>
          <ul className="space-y-1.5 text-sm text-sable/60 leading-relaxed">
            <li>• Inscription <strong className="text-sable">gratuite</strong> requise : stability.ai/community-license</li>
            <li>• Revenus annuels <strong className="text-sable">&lt; 1 000 000 $ US</strong></li>
            <li>• Mention <strong className="text-sable">« Powered by Stability AI »</strong> visible sur la page produit</li>
            <li>• Les meshes générés t’appartiennent et peuvent être vendus</li>
            <li className="text-sable/40">• À revérifier sur stability.ai/license avant la première vente</li>
          </ul>
        </Card>
      </section>

      {/* ============ GÉNÉRATEUR PROCÉDURAL ============ */}
      <section className="space-y-5">
        <SectionTitle subtitle="Le pipeline maison : du code Python qui sculpte des meshes low-poly validés.">
          <span className="flex items-center gap-2">
            <FileCode2 size={22} className="text-or" /> Générateur procédural
          </span>
        </SectionTitle>
        <Card className="p-5 md:p-6" hoverable={false}>
          <div className="space-y-3 text-sm text-sable/60 leading-relaxed">
            <p>
              Le second pipeline du projet est entièrement « fait main » : des scripts Python
              (<code className="text-or/80">generate_*.py</code> dans le dossier <code className="text-or/80">packs/</code> du projet)
              construisent chaque prop sommet par sommet — sommets, faces, normales et groupes nommés —
              avec des vertex colors pour le zellige, le laiton et la terracotta.
            </p>
            <p>
              Chaque OBJ généré est ensuite <strong className="text-sable">re-parsé automatiquement</strong> pour
              valider la géométrie avant d’entrer au catalogue. C’est comme ça qu’est né le pack
              Moroccan Medieval : 10 props, 2 864 triangles, 0 erreur.
            </p>
            <CodeBlock label="Exemple — générer un pack" code={'cd ~/workspace/roblox-assets/packs/moroccan-medieval\npython3 generate_moroccan_props.py\n# → 10 fichiers .obj validés, prêts pour Roblox Studio'} />
          </div>
        </Card>
      </section>

      {/* ============ CHECKLIST PRÊT À PUBLIER ============ */}
      <section className="space-y-5">
        <SectionTitle subtitle="La dernière ligne droite avant le Creator Store.">
          <span className="flex items-center gap-2">
            <ListChecks size={22} className="text-or" /> Checklist « prêt à publier »
          </span>
        </SectionTitle>
        <Card className="p-5 md:p-6" hoverable={false}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-sable/60">{doneCount} / {CHECKLIST.length} validés</span>
            <div className="w-40 h-1.5 bg-night-lighter rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round((doneCount / CHECKLIST.length) * 100)}%`,
                  background: doneCount === CHECKLIST.length ? '#4ade80' : '#C9A227',
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {CHECKLIST.map((item, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  checked[i]
                    ? 'border-zellige/40 bg-zellige/10'
                    : 'border-white/5 hover:border-white/15'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => toggle(i)}
                  className="w-4 h-4 accent-[#0F6B5C] flex-shrink-0"
                />
                <span className={`text-sm ${checked[i] ? 'text-sable/40 line-through' : 'text-sable/70'}`}>
                  {item}
                </span>
                {checked[i] && <Check size={14} className="text-zellige-light ml-auto flex-shrink-0" />}
              </label>
            ))}
          </div>
          {doneCount === CHECKLIST.length && (
            <p className="mt-4 text-sm text-green-400 font-medium">
              🎉 Tout est validé — cet asset peut partir en vente !
            </p>
          )}
        </Card>
      </section>
    </div>
  );
}
