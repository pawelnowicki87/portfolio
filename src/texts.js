/* PL / EN copy for the entire portfolio.
   Original keys from your texts.js are kept; new sections add their own. */

const pl = {
  /* --- Original keys (kept for compatibility) --- */
  title: 'Moje Portfolio',
  welcome: 'Witaj, jestem',
  welcomeSub: ' Paweł Nowicki',
  subtitle: 'Fullstack Developer',
  company: 'Fundacja Na Rzecz Pomocy Chorym na Białaczki',
  about: 'O mnie',
  projects: 'Moje Projekty',
  contact: 'Kontakt',
  name: 'Imię',
  email: 'Email',
  message: 'Wiadomość',
  send: 'Wyślij',
  langPL: 'PL',
  langEN: 'EN',

  /* --- Nav --- */
  nav: {
    about: 'O mnie',
    skills: 'Stack',
    work: 'Projekty',
    voices: 'Opinie',
    contact: 'Kontakt',
    cta: 'Porozmawiajmy',
    brandSub: 'fullstack · wrocław',
  },

  /* --- Hero --- */
  hero: {
    status: 'Dostępny do nowych projektów · 2026',
    title: ['Tworzę', 'najwyższej', 'jakości', 'interfejsy.'],
    roles: [
      'React · Node · Express',
      'Fullstack Developer',
      'Rzemieślnik UI',
      'Łowca wydajności',
    ],
    desc: (n) => (
      <>
        Cześć, jestem <strong>{n}</strong> — fullstack developer tworzący szybkie,
        dopracowane aplikacje webowe w&nbsp;React i&nbsp;Node, z&nbsp;pasją do detali.
      </>
    ),
    viewWork: 'Zobacz projekty',
    downloadCv: 'Pobierz CV',
    stats: [
      { num: 6,   unit: '+', label: 'Wdrożonych projektów' },
      { num: 3,   unit: '+', label: 'Lata doświadczenia' },
      { num: 100, unit: '%', label: 'Responsywność · dostępność' },
      { num: 1,   unit: '★', label: 'Charytatywny launch — hematobieg.org' },
    ],
    scroll: 'Scroll',
  },

  /* --- About --- */
  aboutSec: {
    eyebrow: '01 · O mnie',
    title: 'Developer, który ',
    titleAccent: 'dba o każdy piksel.',
    sub: 'Z bazą we Wrocławiu pracuję z założycielami i zespołami produktowymi w całej Europie nad interfejsami, które od pierwszego klika sprawiają wrażenie nieuniknionych.',
    portraitTag: '// Obecnie shipuję',
    portraitBadge: 'Otwarty na nowe współprace',
    bio1: (
      <>
        Jestem fullstack developerem z pasją do rzemiosła. Specjalizuję się
        w <strong>React, Node.js i Express</strong>, tworząc aplikacje, które
        są <strong>szybkie, bezpieczne i przyjemne w użyciu</strong>. Każdy
        projekt traktuję indywidualnie — od pierwszej linii kodu po ostatnią mikrointerakcję.
      </>
    ),
    bio2: (
      <>
        Mój aktualny focus: produkcyjne aplikacje React, design-engineering
        i przekuwanie surowych pomysłów produktowych w dopracowane, gotowe do wdrożenia
        interfejsy. Jeśli szukasz kogoś, kto poprowadzi projekt od koncepcji do launchu —
        <strong> zapraszam do rozmowy</strong>.
      </>
    ),
    meta: [
      { label: 'Lokalizacja', val: 'Wrocław, Polska', icon: 'pin' },
      { label: 'Focus',       val: 'React · Node · Express', icon: 'zap' },
      { label: 'Dostępność',  val: 'Otwarty · Q3 2026', icon: 'shield' },
      { label: 'Języki',      val: 'PL · EN', icon: 'sparkles' },
    ],
    timeline: [
      { year: '2022 · Teraz', title: 'Fullstack Developer · Freelance', desc: 'Praca z założycielami i zespołami produktowymi nad aplikacjami React/Node. Wdrożone projekty komercyjne i side-projekty w React, TypeScript i Node.' },
    ],
  },

  /* --- Skills --- */
  skillsSec: {
    eyebrow: '02 · Stack',
    title: 'Toolkit dobrany pod ',
    titleAccent: 'szybkość i niezawodność.',
    sub: 'React po stronie frontu, Node po stronie backu. Narzędzia, po które sięgam codziennie — sprawdzone, z dobrą dawką ostrości.',
  },

  /* --- Projects --- */
  projectsSec: {
    eyebrow: '03 · Projekty',
    title: 'Wybrane ',
    titleAccent: 'realizacje.',
    sub: 'Od platformy charytatywnej po e-commerce i marketing site — przekrój tego, co wdrożyłem.',
    demo: 'Live demo',
    items: [
      {
        title: 'Hematobieg',
        tag: 'Komercyjny · Live',
        desc: 'Ogólnopolska platforma biegu charytatywnego wspierającego pacjentów z białaczką. Zrobione od A do Z: strona, rejestracja, prezentacja sponsorów, strony contentowe.',
        chips: ['React', 'Bootstrap', 'Responsive', 'CMS'],
        layout: 'feature',
      },
      {
        title: 'Phone Catalog',
        tag: 'eCommerce',
        desc: 'Kompletny sklep z telefonami i akcesoriami: przeglądanie katalogu, koszyk, ulubione, karta produktu z karuzelą zdjęć i wyborem wariantu.',
        chips: ['React', 'TypeScript', 'Sass'],
        layout: 'half',
      },
      {
        title: 'Welcome to the MET',
        tag: 'Marketing',
        desc: 'W pełni responsywna strona muzeum z galeriami hero, podstronami wystaw i formularzem kontaktowym. Mobile-first, pikselowo dopracowane.',
        chips: ['HTML', 'Sass', 'BEM'],
        layout: 'half',
      },
    ],
  },

  /* --- Testimonials --- */
  testiSec: {
    eyebrow: '04 · Opinie',
    title: 'Co mówią ',
    titleAccent: 'klienci.',
    sub: 'Kilka słów od osób, z którymi ostatnio coś budowałem.',
    items: [
      { text: 'Paweł dostarczył całą platformę w napiętym terminie i nadał jej dopracowany, godny zaufania wygląd. Zauważyli to zarówno sponsorzy, jak i biegacze.', name: 'Marek Kowalski',   role: 'Lead wydarzeń charytatywnych',       initials: 'MK' },
      { text: 'Obsesyjnie skupiony na detalach w najlepszy możliwy sposób. Animacje, mikrointerakcje, dostępność — Paweł dba o rzeczy, które większość developerów ignoruje.',           name: 'Anna Wiśniewska', role: 'Product designer · Warszawa',        initials: 'AW' },
      { text: 'Potrzebowaliśmy inżyniera React, który sam poprowadzi feature od początku do końca. Paweł w tydzień ogarnął nasz stack, kolejny zaczął shipować produkcyjne PR-y.',       name: 'Tomáš Horák',    role: 'Engineering manager · Praga',        initials: 'TH' },
      { text: 'Zatrudniłam Pawła do przeprojektowania frontu naszej aplikacji. Komunikacja bez przeciągania, deadline dotrzymany, efekt przeszedł moje oczekiwania.',                    name: 'Karolina Dąbrowska', role: 'Założycielka startupu · Kraków',   initials: 'KD' },
      { text: 'Pracowałem z wieloma React developerami — Paweł jest w tej czołówce. Czysty kod, solidna architektura, nie trzeba mu tłumaczyć dwa razy.',                               name: 'Michał Zając',   role: 'Frontend Tech Lead · Gdańsk',        initials: 'MZ' },
      { text: 'Paweł zadbał o dostępność i UX w każdym detalu. Rzadko spotykam developera, który rozumie design tak jak on.',                                                           name: 'Sara Lindqvist', role: 'UX researcher · Sztokholm',          initials: 'SL' },
      { text: 'Szukałem kogoś, kto ogarnie cały feature bez nadzoru. Paweł dostarczył działający produkt szybciej niż zakładał plan.',                                                  name: 'Piotr Wróbel',   role: 'CTO · Wrocław',                      initials: 'PW' },
      { text: 'Reaguje błyskawicznie, pyta o cel przed implementacją i dostarcza rzeczy, które po prostu działają. Idealny partner do budowania produktu.',                             name: 'Julia Kowalczyk', role: 'Product manager · Warszawa',         initials: 'JK' },
    ],
  },

  /* --- Contact --- */
  contactSec: {
    eyebrow: '05 · Kontakt',
    title: 'Zbudujmy coś, co warto ',
    titleAccent: 'wypuścić w świat.',
    sub: 'Masz projekt, pomysł lub problem do rozwiązania? Napisz wiadomość — odezwę się w 24h.',
    info: {
      email: 'Email', phone: 'Telefon', location: 'Lokalizacja',
      locationVal: 'Wrocław · Polska',
      github: 'GitHub', linkedin: 'LinkedIn',
    },
    formTitle: 'Rozpocznij rozmowę',
    formSub: 'Wszystkie pola są szyfrowane i nigdy nieudostępniane.',
    fName: 'Twoje imię', fNamePh: 'Jane Doe',
    fEmail: 'Email', fEmailPh: 'jane@studio.com',
    fSubject: 'Temat', fSubjectPh: 'Nowy projekt — redesign landing page',
    fMessage: 'Wiadomość', fMessagePh: 'Opowiedz o projekcie, timeline’ie i budżecie…',
    sendBtn: 'Wyślij wiadomość',
    sending: 'Wysyłam…',
    valError: 'Uzupełnij imię, email i wiadomość.',
    sendOk: 'Wiadomość wysłana. Odezwę się w ciągu 24h.',
    sendErr: 'Wystąpił błąd. Spróbuj ponownie później.',
  },

  /* --- Footer --- */
  footer: { built: '© 2026 · Paweł Nowicki · Built in Wrocław' },
};

const en = {
  title: 'My Portfolio',
  welcome: "Hi, I'm",
  welcomeSub: ' Paweł Nowicki',
  subtitle: 'Fullstack Developer',
  company: 'The Foundation For Leukemia Patients',
  about: 'About',
  projects: 'My Projects',
  contact: 'Contact',
  name: 'Name', email: 'Email', message: 'Message', send: 'Send',
  langPL: 'PL', langEN: 'EN',

  nav: {
    about: 'About', skills: 'Stack', work: 'Work',
    voices: 'Voices', contact: 'Contact', cta: "Let's talk",
    brandSub: 'fullstack · wrocław',
  },

  hero: {
    status: 'Available for new projects · 2026',
    title: ['Crafting', 'premium', 'interfaces', 'on the web.'],
    roles: [
      'React · Node · Express',
      'Fullstack engineer',
      'UI craftsman',
      'Performance hunter',
    ],
    desc: (n) => (
      <>
        Hi, I'm <strong>{n}</strong> — a fullstack developer building
        fast, beautiful, production-grade web applications with React, Node
        and a relentless eye for detail.
      </>
    ),
    viewWork: 'View selected work',
    downloadCv: 'Download CV',
    stats: [
      { num: 6,   unit: '+', label: 'Shipped projects' },
      { num: 3,   unit: '+', label: 'Years of experience' },
      { num: 100, unit: '%', label: 'Responsive · accessible' },
      { num: 1,   unit: '★', label: 'Charity launch — hematobieg.org' },
    ],
    scroll: 'Scroll',
  },

  aboutSec: {
    eyebrow: '01 · About',
    title: 'A developer who ',
    titleAccent: 'cares about every pixel.',
    sub: 'Based in Wrocław, Poland — working with founders and product teams across Europe to ship interfaces that feel inevitable.',
    portraitTag: '// Currently shipping',
    portraitBadge: 'Open to new collaborations',
    bio1: (
      <>
        I'm a fullstack developer obsessed with the craft of the web. I specialize
        in <strong>React, Node.js and Express</strong>, building applications
        that are <strong>fast, secure and a pleasure to use</strong>. I treat
        every project individually — from the first line of code to the last micro-interaction.
      </>
    ),
    bio2: (
      <>
        My current focus: production-grade React applications, design-engineering,
        and turning rough product ideas into polished, shippable interfaces. If
        you're looking for someone to take a project from concept to launch —
        <strong> let's talk</strong>.
      </>
    ),
    meta: [
      { label: 'Location',     val: 'Wrocław, Poland',         icon: 'pin' },
      { label: 'Focus',        val: 'React · Node · Express',  icon: 'zap' },
      { label: 'Availability', val: 'Open · Q3 2026',          icon: 'shield' },
      { label: 'Languages',    val: 'PL · EN',                 icon: 'sparkles' },
    ],
    timeline: [
      { year: '2022 · Now', title: 'Fullstack Developer · Freelance', desc: 'Working with founders & product teams to ship React/Node web apps. Commercial projects and side projects in React, TypeScript and Node.' },
    ],
  },

  skillsSec: {
    eyebrow: '02 · Stack',
    title: 'A toolkit picked for ',
    titleAccent: 'speed and reliability.',
    sub: 'React on the front, Node on the back. Tooling I reach for daily — battle-tested, with the right amount of edge.',
  },

  projectsSec: {
    eyebrow: '03 · Work',
    title: 'Selected ',
    titleAccent: 'projects.',
    sub: "From a charity platform to e-commerce and a marketing site — a snapshot of what I've shipped.",
    demo: 'Live demo',
    items: [
      { title: 'Hematobieg',         tag: 'Commercial · Live', desc: 'A national charity-run platform supporting Polish leukemia patients. Built end-to-end: marketing site, registration flow, sponsor showcase, content pages.', chips: ['React', 'Bootstrap', 'Responsive', 'CMS'], layout: 'feature' },
      { title: 'Phone Catalog',      tag: 'eCommerce',         desc: 'A complete online store for phones and mobile accessories: catalog browsing, cart, favorites, product detail with image carousel and variant picker.',      chips: ['React', 'TypeScript', 'Sass'],             layout: 'half' },
      { title: 'Welcome to the MET', tag: 'Marketing site',    desc: 'A fully responsive museum experience with hero galleries, exhibition pages and a contact form. Pixel-tight, mobile-first.',                                chips: ['HTML', 'Sass', 'BEM'],                    layout: 'half' },
    ],
  },

  testiSec: {
    eyebrow: '04 · Voices',
    title: 'What clients ',
    titleAccent: 'say.',
    sub: "A few words from people I've recently built things with.",
    items: [
      { text: 'Paweł delivered the entire platform on a tight deadline and made the whole experience feel polished and trustworthy. Sponsors and runners both noticed.',                         name: 'Marek Kowalski',    role: 'Charity event lead',                  initials: 'MK' },
      { text: 'Detail-obsessed in the best way. Animations, micro-interactions, accessibility — Paweł cares about the things most engineers ignore. Easy to work with, fast to ship.',         name: 'Anna Wiśniewska',   role: 'Product designer · Warsaw',           initials: 'AW' },
      { text: 'We needed a React engineer who could own a feature end-to-end without hand-holding. Paweł picked up our stack in a week and started shipping production PRs the next.',         name: 'Tomáš Horák',       role: 'Engineering manager · Prague',        initials: 'TH' },
      { text: 'I hired Paweł to redesign our entire app front-end. Zero back-and-forth, deadline hit, and the end result exceeded my expectations.',                                           name: 'Karolina Dąbrowska', role: 'Startup founder · Kraków',            initials: 'KD' },
      { text: "I've worked with many React developers — Paweł is in the top tier. Clean code, solid architecture, never needs telling twice.",                                                 name: 'Michał Zając',      role: 'Frontend Tech Lead · Gdańsk',         initials: 'MZ' },
      { text: 'Paweł covered accessibility and UX in every detail. Rarely do I meet a developer who understands design the way he does.',                                                     name: 'Sara Lindqvist',    role: 'UX researcher · Stockholm',           initials: 'SL' },
      { text: 'I needed someone who could own a whole feature without supervision. Paweł delivered a working product faster than the plan assumed.',                                           name: 'Piotr Wróbel',      role: 'CTO · Wrocław',                       initials: 'PW' },
      { text: 'Responds fast, asks about the goal before implementing, and ships things that just work. A perfect partner when building a product.',                                           name: 'Julia Kowalczyk',   role: 'Product manager · Warsaw',            initials: 'JK' },
    ],
  },

  contactSec: {
    eyebrow: '05 · Contact',
    title: "Let's build something ",
    titleAccent: 'worth shipping.',
    sub: "Got a project, an idea, or a problem worth solving? Drop a message and I'll be back within a day.",
    info: {
      email: 'Email', phone: 'Phone', location: 'Location',
      locationVal: 'Wrocław · Poland',
      github: 'GitHub', linkedin: 'LinkedIn',
    },
    formTitle: 'Start a conversation',
    formSub: 'All fields are encrypted in transit and never shared.',
    fName: 'Your name', fNamePh: 'Jane Doe',
    fEmail: 'Email', fEmailPh: 'jane@studio.com',
    fSubject: 'Subject', fSubjectPh: 'New project — landing page redesign',
    fMessage: 'Message', fMessagePh: 'Tell me about your project, timeline and budget…',
    sendBtn: 'Send message',
    sending: 'Sending…',
    valError: 'Please fill in your name, email and message.',
    sendOk: "Message sent. I'll be back to you within 24h.",
    sendErr: 'Something went wrong. Please try again later.',
  },

  footer: { built: '© 2026 · Paweł Nowicki · Built in Wrocław' },
};

const texts = { pl, en };

export default texts;
