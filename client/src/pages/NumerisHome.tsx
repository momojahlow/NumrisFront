import { useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  Check,
  CheckCircle2,
  ChevronDown,
  Database,
  FileCheck2,
  FileSearch2,
  FileText,
  Fingerprint,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import NumerisLayout from "@/components/NumerisLayout";
import { trpc } from "@/lib/trpc";
import "./numeris.css";

const questions = [
  {
    question: "Quel est le délai de préavis prévu dans ce contrat ?",
    answer:
      "Le contrat prévoit un préavis de 30 jours avant la date de renouvellement. La clause figure dans la section 8 du document « Contrat fournisseur — 2025 ».",
    source: "Contrat fournisseur — 2025 · p. 12",
  },
  {
    question: "Où se trouve la facture du mois de mars ?",
    answer:
      "La facture de mars se trouve dans le dossier « Factures / 2025 ». Le document contient le montant, la date d’émission et le numéro de facture.",
    source: "Facture ACME · mars 2025 · p. 1",
  },
  {
    question: "Quels documents manquent à ce dossier ?",
    answer:
      "Dans cet exemple, le dossier contient le formulaire signé et la pièce d’identité. Le justificatif de domicile n’apparaît pas dans les documents indexés.",
    source: "Dossier client · contrôle des pièces",
  },
];
const steps = [
  {
    n: "01",
    icon: ScanLine,
    tag: "Capture & préparation",
    title: "Numérisez sans friction",
    text: "Importez vos lots papier et fichiers. Les pages sont préparées, redressées et nettoyées automatiquement.",
  },
  {
    n: "02",
    icon: Sparkles,
    tag: "OCR & compréhension",
    title: "L’IA comprend vos documents",
    text: "Reconnaissance de texte, structure et données transforment chaque page en information exploitable.",
  },
  {
    n: "03",
    icon: Database,
    tag: "Indexation & RAG",
    title: "Retrouvez par le sens",
    text: "Le RAG relie les réponses à vos sources pour questionner et vérifier votre corpus documentaire.",
  },
];
const capabilities = [
  {
    icon: FileCheck2,
    title: "Des documents vraiment exploitables",
    text: "Texte OCR, champs structurés et métadonnées réunis dans un flux cohérent, prêt pour vos outils métier.",
  },
  {
    icon: MessageSquareText,
    title: "Posez une question, pas une requête",
    text: "Interrogez votre fonds en langage naturel et retrouvez les passages qui fondent chaque réponse.",
  },
  {
    icon: Workflow,
    title: "Vos règles gardent le premier rôle",
    text: "Orientez les étapes de contrôle et de validation selon les besoins de votre organisation.",
  },
];

export default function NumerisHome() {
  const [active, setActive] = useState(0);
  const [customQuestion, setCustomQuestion] = useState("");
  const [notice, setNotice] = useState("");
  const contactFormRef = useRef<HTMLFormElement>(null);
  const [contactReference, setContactReference] = useState("");
  const [contactError, setContactError] = useState("");
  const submitContact = trpc.quote.submit.useMutation({
    onSuccess: result => {
      setContactReference(result.reference);
      setContactError("");
      contactFormRef.current?.reset();
    },
    onError: () => {
      setContactError(
        "Votre message n’a pas pu être envoyé. Réessayez dans quelques instants."
      );
    },
  });
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactError("");
    const formData = new FormData(event.currentTarget);
    submitContact.mutate({
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      company: String(formData.get("company") ?? "").trim() || "Particulier",
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      projectType: "complete",
      volume: "unknown",
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    });
  };
  const askDemo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customQuestion.trim()) return;
    setNotice(
      "Cette maquette illustre une recherche sur un corpus fictif. Aucun document ni message n’est transmis."
    );
  };
  return (
    <NumerisLayout isHome>
      <main>
        <section className="numeris-hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-grid" />
          <div className="hero-printer-stage" aria-hidden="true">
            <img
              className="hero-printer-backdrop"
              src="/smart-printer-transparent.png"
              alt=""
            />
            <div className="hero-paper-trail">
              <span className="paper-sheet paper-sheet-back" />
              <span className="paper-sheet paper-sheet-front" />
            </div>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <div className="hero-status">
                <span className="status-pulse" /> L’IA documentaire, votre
                meilleure alliée
              </div>
              <h1 id="hero-title">
                Donnez une seconde vie <span>à vos documents.</span>
              </h1>
              <p className="hero-lead">
                Numérisez, structurez et retrouvez chaque information. Une
                chaîne OCR intelligente, enrichie par le RAG et pensée pour vos
                métiers.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#plateforme">
                  Découvrir la plateforme <ArrowRight size={18} />
                </a>
                <a className="button button-ghost" href="#demo">
                  <span className="play-icon">
                    <ArrowDown size={15} />
                  </span>{" "}
                  Voir la démo RAG
                </a>
              </div>
              <div className="hero-note">
                <ShieldCheck size={17} /> Du document source à la réponse
                vérifiable.
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="Illustration de la chaîne de traitement documentaire Numeris"
            >
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="floating-chip chip-ocr">
                <ScanLine size={15} /> OCR intelligent{" "}
                <span className="chip-check">
                  <Check size={11} />
                </span>
              </div>
              <div className="floating-chip chip-rag">
                <Sparkles size={15} /> Indexation RAG
              </div>
              <div className="document-card">
                <div className="doc-topline">
                  <span className="doc-icon">
                    <FileText size={16} />
                  </span>
                  <span>CONTRAT_FOURNISSEUR.PDF</span>
                  <span className="doc-pages">12 p.</span>
                </div>
                <div className="doc-heading">CONTRAT DE PRESTATION</div>
                <div className="doc-subheading">
                  Entre les parties désignées ci-après…
                </div>
                <div className="doc-lines">
                  <i />
                  <i />
                  <i className="short" />
                  <i />
                  <i className="medium" />
                </div>
                <div className="doc-highlight">
                  <span>Clause de renouvellement</span>
                  <i />
                  <i className="short" />
                </div>
                <div className="doc-lines lower">
                  <i />
                  <i className="medium" />
                  <i />
                </div>
                <div className="scan-beam" />
                <div className="doc-footer">
                  <span>
                    <span className="tiny-dot" /> Document analysé
                  </span>
                  <span>Page 08 / 12</span>
                </div>
              </div>
              <div className="extract-card">
                <div className="extract-head">
                  <span>
                    <Sparkles size={14} /> Données détectées
                  </span>
                  <span className="extract-live">EN DIRECT</span>
                </div>
                <div className="extract-row">
                  <span>Type</span>
                  <b>Contrat fournisseur</b>
                </div>
                <div className="extract-row">
                  <span>Échéance</span>
                  <b>31 décembre 2025</b>
                </div>
                <div className="extract-row">
                  <span>Préavis</span>
                  <b className="extract-value">
                    30 jours <Check size={13} />
                  </b>
                </div>
                <div className="extract-progress">
                  <span />
                </div>
              </div>
              <div className="visual-caption">
                <span className="caption-dot" /> Chaque page devient une source
                interrogeable
              </div>
            </div>
          </div>
          <div className="hero-metrics">
            <div className="metric">
              <strong>99,2 %</strong>
              <span>PRÉCISION OCR</span>
            </div>
            <div className="metric">
              <strong>&lt; 2 s</strong>
              <span>PAR PAGE</span>
            </div>
            <div className="metric">
              <strong>24/7</strong>
              <span>DISPONIBILITÉ</span>
            </div>
          </div>
          <a
            className="hero-scroll"
            href="#plateforme"
            aria-label="Explorer la plateforme"
          >
            Explorer <ArrowDown size={14} />
          </a>
        </section>

        <section className="platform-section section-shell" id="plateforme">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <i className="eyebrow-mark" /> LE DOCUMENTAIRE, DE BOUT EN BOUT
              </span>
              <h2>
                Du papier à la réponse,
                <br />
                <em>sans perdre le fil.</em>
              </h2>
            </div>
            <p>
              Numeris transforme les documents dispersés en une connaissance
              fiable, lisible et immédiatement utile à vos équipes.
            </p>
          </div>
          <div className="process-track">
            {steps.map(({ n, icon: Icon, tag, title, text }, i) => (
              <article className="process-card" key={n}>
                <div className="process-card-top">
                  <span className="step-number">{n}</span>
                  <span className="process-icon">
                    <Icon size={20} />
                  </span>
                </div>
                <span className="process-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="process-card-bottom">
                  <span>
                    {["Réception", "Compréhension", "Restitution"][i]}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="technology-section" id="technologie">
          <div className="technology-inner">
            <div className="technology-copy">
              <span className="eyebrow eyebrow-light">
                <i className="eyebrow-mark" /> UNE IA QUI CITE SES SOURCES
              </span>
              <h2>
                La bonne réponse.
                <br />
                <em>Et le bon document.</em>
              </h2>
              <p>
                Avec le RAG, Numeris ne se contente pas de retrouver des
                mots-clés. La recherche s’appuie sur le sens et relie chaque
                réponse aux passages qui la justifient.
              </p>
              <div className="technology-points">
                <div>
                  <span>
                    <Check size={14} />
                  </span>{" "}
                  Recherche sémantique dans vos contenus
                </div>
                <div>
                  <span>
                    <Check size={14} />
                  </span>{" "}
                  Réponses rattachées à leurs sources
                </div>
                <div>
                  <span>
                    <Check size={14} />
                  </span>{" "}
                  Validation humaine au bon moment
                </div>
              </div>
              <a className="text-link" href="#demo">
                Tester la recherche <ArrowRight size={16} />
              </a>
            </div>
            <div className="rag-window">
              <div className="rag-window-top">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>ESPACE DOCUMENTAIRE</span>
                <span className="rag-lock">
                  <LockKeyhole size={13} /> PRIVÉ
                </span>
              </div>
              <div className="rag-window-body">
                <div className="rag-question-icon">
                  <MessageSquareText size={17} />
                </div>
                <div className="rag-question-content">
                  <span>VOTRE QUESTION</span>
                  <p>Quel est le délai de préavis de ce contrat&nbsp;?</p>
                </div>
                <div className="rag-answer">
                  <div className="answer-label">
                    <Sparkles size={14} /> Réponse fondée sur vos documents
                  </div>
                  <p>
                    Le préavis prévu est de <strong>30 jours</strong> avant la
                    date de renouvellement.
                  </p>
                  <div className="source-reference">
                    <BookOpenText size={14} />
                    <span>Contrat fournisseur — 2025</span>
                    <b>p. 12</b>
                    <ArrowUpRight size={13} />
                  </div>
                </div>
                <div className="rag-query">
                  <Search size={15} />
                  <span>Posez une question à vos documents…</span>
                  <span className="query-send">
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
              <div className="rag-window-foot">
                <span>
                  <i className="rag-status" /> Sources indexées
                </span>
                <span>Réponse vérifiable</span>
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section section-shell" id="usages">
          <div className="section-heading section-heading-centered">
            <span className="eyebrow">
              <i className="eyebrow-mark" /> UNE PLATEFORME, PLUSIEURS USAGES
            </span>
            <h2>
              Moins de recherche.
              <br />
              <em>Plus de temps pour agir.</em>
            </h2>
            <p>
              Un socle documentaire pensé pour les organisations qui veulent
              faire circuler l’information, pas les fichiers.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text }, i) => (
              <article className="capability-card" key={title}>
                <div className="capability-icon">
                  <Icon size={21} />
                </div>
                <span className="capability-index">0{i + 1} / 03</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#demo" aria-label={`Découvrir : ${title}`}>
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
          <div className="usecase-strip">
            <div className="usecase-lead">
              <Layers3 size={19} />
              <span>VOS DOCUMENTS, À LEUR PLACE</span>
            </div>
            <div className="usecase-pill">
              <FileText size={15} /> Contrats
            </div>
            <div className="usecase-pill">
              <FileSearch2 size={15} /> Factures
            </div>
            <div className="usecase-pill">
              <Fingerprint size={15} /> Dossiers clients
            </div>
            <div className="usecase-pill">
              <BadgeCheck size={15} /> Procédures
            </div>
          </div>
        </section>

        <section className="demo-section" id="demo">
          <div className="demo-inner">
            <div className="demo-intro">
              <span className="eyebrow eyebrow-light">
                <i className="eyebrow-mark" /> À VOUS DE JOUER
              </span>
              <h2>
                Une question.
                <br />
                <em>Des sources.</em>
              </h2>
              <p>
                Explorez un aperçu de la recherche documentaire augmentée. Cette
                démo utilise un corpus fictif&nbsp;: aucun document n’est
                envoyé.
              </p>
              <div className="demo-note">
                <Zap size={16} /> Réponse instantanée · Sources affichées
              </div>
            </div>
            <div className="demo-panel">
              <div className="demo-panel-head">
                <div className="demo-avatar">
                  <Sparkles size={17} />
                </div>
                <div>
                  <strong>Assistant Numeris</strong>
                  <span>Démo interactive · corpus d’exemple</span>
                </div>
                <span className="demo-badge">RAG</span>
              </div>
              <div className="demo-prompts">
                <span>ESSAYEZ UNE QUESTION</span>
                {questions.map((q, i) => (
                  <button
                    className={`prompt-button${active === i ? " is-active" : ""}`}
                    type="button"
                    key={q.question}
                    onClick={() => {
                      setActive(i);
                      setNotice("");
                    }}
                  >
                    {q.question}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
              <div className="demo-response">
                <div className="response-status">
                  <i className="response-dot" /> RÉPONSE GÉNÉRÉE À PARTIR DES
                  SOURCES
                </div>
                <p>{questions[active].answer}</p>
                <div className="response-source">
                  <BookOpenText size={15} />
                  <span>{questions[active].source}</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <form className="demo-input" onSubmit={askDemo}>
                <label className="sr-only" htmlFor="demo-question">
                  Votre question sur le corpus de démonstration
                </label>
                <input
                  id="demo-question"
                  value={customQuestion}
                  onChange={e => {
                    setCustomQuestion(e.target.value);
                    setNotice("");
                  }}
                  placeholder="Posez votre question…"
                />
                <button type="submit" aria-label="Envoyer la question">
                  <ArrowRight size={17} />
                </button>
              </form>
              {notice && (
                <p className="demo-disclaimer" role="status">
                  {notice}
                </p>
              )}
              <div className="demo-panel-foot">
                <ShieldCheck size={14} /> Maquette locale · aucune donnée
                transmise
              </div>
            </div>
          </div>
        </section>

        <section className="security-section section-shell">
          <div className="security-symbol">
            <div className="security-ring">
              <ShieldCheck size={29} />
            </div>
            <span className="security-orbit security-orbit-a" />
            <span className="security-orbit security-orbit-b" />
          </div>
          <div className="security-copy">
            <span className="eyebrow">
              <i className="eyebrow-mark" /> LA CONFIANCE, DÈS LA CONCEPTION
            </span>
            <h2>
              Vos documents sont sensibles.
              <br />
              <em>Leur traitement doit l’être aussi.</em>
            </h2>
            <p>
              Des accès maîtrisés, un parcours lisible et une place claire pour
              la validation humaine&nbsp;: Numeris s’adapte à vos exigences
              documentaires.
            </p>
          </div>
          <div className="security-checks">
            <div>
              <LockKeyhole size={18} />
              <span>
                <b>Accès maîtrisés</b>
                <small>Une visibilité adaptée à vos équipes</small>
              </span>
            </div>
            <div>
              <BadgeCheck size={18} />
              <span>
                <b>Réponses traçables</b>
                <small>Les sources restent consultables</small>
              </span>
            </div>
            <div>
              <Workflow size={18} />
              <span>
                <b>Validation intégrée</b>
                <small>Vos règles métier dans la boucle</small>
              </span>
            </div>
          </div>
        </section>

        <section className="faq-section section-shell" id="questions">
          <div className="faq-intro">
            <span className="eyebrow">
              <i className="eyebrow-mark" /> BON À SAVOIR
            </span>
            <h2>
              Vos questions,
              <br />
              <em>sans jargon.</em>
            </h2>
            <p>
              Quelques repères pour comprendre la numérisation augmentée et la
              recherche RAG.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>
                Qu’est-ce que la numérisation documentaire intelligente&nbsp;?
                <ChevronDown size={18} />
              </summary>
              <p>
                C’est le passage du document papier ou image à une information
                recherchable, structurée et contextualisée grâce à l’OCR et à
                l’analyse automatisée.
              </p>
            </details>
            <details>
              <summary>
                Quelle est la différence entre OCR et RAG&nbsp;?
                <ChevronDown size={18} />
              </summary>
              <p>
                L’OCR reconnaît le texte présent dans une page. Le RAG recherche
                dans un corpus les documents pertinents pour fournir une réponse
                contextualisée et reliée à ses sources.
              </p>
            </details>
            <details>
              <summary>
                Peut-on garder une validation humaine&nbsp;?
                <ChevronDown size={18} />
              </summary>
              <p>
                Oui. Les contrôles et étapes de validation peuvent s’inscrire
                dans le parcours documentaire selon les règles définies pour
                votre activité.
              </p>
            </details>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-inner">
            <div className="contact-orb" />
            <div className="contact-copy">
              <span className="eyebrow eyebrow-light">
                <i className="eyebrow-mark" /> CONTACT · SMART PRINT
              </span>
              <h2 id="contact-title">
                Parlons de votre projet
                <br />
                <em>documentaire.</em>
              </h2>
              <p>
                Une question sur la numérisation, l’OCR ou le RAG&nbsp;?
                Décrivez votre besoin et Smart Print vous recontactera.
              </p>
              <div className="contact-assurance">
                <ShieldCheck size={17} /> Vos coordonnées sont utilisées pour
                répondre à votre demande.
              </div>
            </div>
            <div className="contact-form-card">
              {contactReference ? (
                <div className="contact-success" role="status">
                  <CheckCircle2 size={28} aria-hidden="true" />
                  <span className="contact-form-eyebrow">
                    MESSAGE ENREGISTRÉ
                  </span>
                  <h3>Merci pour votre message.</h3>
                  <p>Smart Print reviendra vers vous dès que possible.</p>
                  <span className="contact-reference">
                    Référence <strong>{contactReference}</strong>
                  </span>
                  <button
                    className="contact-new-message"
                    type="button"
                    onClick={() => {
                      setContactReference("");
                      submitContact.reset();
                    }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <span className="contact-form-eyebrow">ÉCRIVEZ-NOUS</span>
                    <h3>Comment pouvons-nous vous aider&nbsp;?</h3>
                    <p>Les champs marqués d’un astérisque sont obligatoires.</p>
                  </div>
                  <form
                    ref={contactFormRef}
                    className="contact-form"
                    onSubmit={handleContactSubmit}
                  >
                    <div className="contact-form-grid">
                      <label className="contact-field">
                        <span>
                          Prénom <i>*</i>
                        </span>
                        <input
                          autoComplete="given-name"
                          name="firstName"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label className="contact-field">
                        <span>
                          Nom <i>*</i>
                        </span>
                        <input
                          autoComplete="family-name"
                          name="lastName"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label className="contact-field contact-field-wide">
                        <span>Entreprise / organisation</span>
                        <input
                          autoComplete="organization"
                          name="company"
                          maxLength={191}
                        />
                      </label>
                      <label className="contact-field">
                        <span>
                          Adresse e-mail <i>*</i>
                        </span>
                        <input
                          autoComplete="email"
                          type="email"
                          name="email"
                          maxLength={320}
                          required
                        />
                      </label>
                      <label className="contact-field">
                        <span>Téléphone</span>
                        <input
                          autoComplete="tel"
                          type="tel"
                          name="phone"
                          maxLength={32}
                        />
                      </label>
                      <label className="contact-field contact-field-wide">
                        <span>
                          Votre message <i>*</i>
                        </span>
                        <textarea
                          name="message"
                          rows={4}
                          maxLength={2000}
                          required
                          placeholder="Décrivez votre question ou votre besoin…"
                        />
                      </label>
                      <label className="contact-consent contact-field-wide">
                        <input type="checkbox" name="consent" required />
                        <span>
                          J’accepte que Smart Print utilise ces informations
                          pour répondre à ma demande.
                        </span>
                      </label>
                      <div className="contact-honeypot" aria-hidden="true">
                        <input
                          name="companyWebsite"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    {contactError && (
                      <p className="contact-form-error" role="alert">
                        {contactError}
                      </p>
                    )}
                    <button
                      className="contact-submit"
                      type="submit"
                      disabled={submitContact.isPending}
                    >
                      {submitContact.isPending
                        ? "Envoi en cours…"
                        : "Envoyer mon message"}
                      {!submitContact.isPending && <ArrowRight size={17} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </NumerisLayout>
  );
}
