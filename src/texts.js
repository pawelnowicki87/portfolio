const projects = {
  pl: { projectsSec: { items: [
      {
        key: 'voteforgift',
        title: 'VoteForGift',
        tag: 'Produkt własny · Live',
        desc: 'Platforma do wspólnego wybierania i opłacania prezentów: grupa zakłada wydarzenie, głosuje nad propozycjami i składa się na zwycięski przez BLIK. Architektura mikroserwisowa — Next.js 16, serwisy NestJS na Prismie, RabbitMQ, płatności Tpay z idempotencją. Maskowanie danych osobowych pod RODO i własna dokumentacja QA.',
        chips: ['Next.js 16', 'NestJS', 'Prisma', 'PostgreSQL', 'RabbitMQ', 'Tpay · BLIK'],
        layout: 'showcase',
        shots: [
          'VoteForGift — ranking propozycji prezentów z liczbą głosów i linkami do sklepów',
          'VoteForGift — szczegóły wydarzenia: oś czasu zbiórki, wybrany prezent i płatność BLIK',
        ],
        reelAlt: 'Spot reklamowy VoteForGift',
        reels: ['Główny', 'TikTok', 'Szkoły B2B', 'Emocjonalny', 'Hook'],
      },
      {
        key: 'smileexpress',
        title: 'Smile Express',
        tag: 'Klinika · Live',
        desc: 'Platforma dla sieci klinik stomatologicznych: wyszukiwanie gabinetów i rezerwacja wizyt przez wieloetapowy wizard (weryfikacja OTP, kalendarz, integracje CRM/GTM). Monorepo TypeScript/React 19 z Next.js 16, Fastify, Azure Key Vault, Datadog, Sentry i testami Playwright.',
        chips: ['Next.js', 'React 19', 'TypeScript', 'Fastify', 'Turborepo', 'Azure'],
        layout: 'feature',
      },
      {
        key: 'balconsonne',
        title: 'BalkonSonne App',
        tag: 'SaaS · AI · Live',
        desc: 'Wielojęzyczny wizard React + TypeScript + MUI z AI, który analizuje nasłonecznienie balkonu i ocenia opłacalność instalacji małych paneli fotowoltaicznych.',
        chips: ['React', 'TypeScript', 'MUI', 'AI'],
        layout: 'feature-alt',
      },
      {
        key: 'hematobieg',
        title: 'Hematobieg',
        tag: 'Komercyjny · Live',
        desc: 'Ogólnopolska platforma biegu charytatywnego wspierającego pacjentów z białaczką. Zrobione od A do Z: strona, rejestracja, prezentacja sponsorów, strony contentowe.',
        chips: ['React', 'Bootstrap', 'Responsive', 'CMS'],
        layout: 'feature',
      },
      {
        key: 'phonecatalog',
        title: 'Phone Catalog',
        tag: 'eCommerce',
        desc: 'Kompletny sklep z telefonami i akcesoriami: przeglądanie katalogu, koszyk, ulubione, karta produktu z karuzelą zdjęć i wyborem wariantu.',
        chips: ['React', 'TypeScript', 'Sass'],
        layout: 'half',
      },
      {
        key: 'welcometothemet',
        title: 'Welcome to the MET',
        tag: 'Marketing',
        desc: 'W pełni responsywna strona muzeum z galeriami hero, podstronami wystaw i formularzem kontaktowym. Mobile-first, pikselowo dopracowane.',
        chips: ['HTML', 'Sass', 'BEM'],
        layout: 'half',
      },
    ] } },
  en: { projectsSec: { items: [
      {
        key: 'voteforgift',
        title: 'VoteForGift',
        tag: 'Own product · Live',
        desc: 'A platform for choosing and paying for group gifts: a group creates an event, votes on the proposals and chips in for the winner via BLIK. Microservice architecture — Next.js 16, NestJS services on Prisma, RabbitMQ, Tpay payments with idempotency. GDPR-driven PII masking and in-house QA documentation.',
        chips: ['Next.js 16', 'NestJS', 'Prisma', 'PostgreSQL', 'RabbitMQ', 'Tpay · BLIK'],
        layout: 'showcase',
        shots: [
          'VoteForGift — ranked gift proposals with vote counts and shop links',
          'VoteForGift — event detail: collection timeline, winning gift and BLIK payment',
        ],
        reelAlt: 'VoteForGift promo video',
        reels: ['Main', 'TikTok', 'Schools B2B', 'Emotional', 'Hook'],
      },
      { key: 'smileexpress', title: 'Smile Express',       tag: 'Clinic · Live',     desc: 'Multi-location dental clinic platform: office finder and multi-step booking wizard with OTP verification, calendar scheduling, LeadSigma & GTM integrations. TypeScript/React 19 monorepo (Turborepo, pnpm) with Next.js 16, Fastify, Azure Key Vault, Datadog, Sentry and Playwright e2e tests.', chips: ['Next.js', 'React 19', 'TypeScript', 'Fastify', 'Turborepo', 'Azure'], layout: 'feature' },
      { key: 'balconsonne', title: 'BalkonSonne App',    tag: 'SaaS · AI · Live',  desc: 'A multilingual React + TypeScript + MUI wizard using AI to analyze balcony sunlight and evaluate the feasibility and profitability of small solar panels.',      chips: ['React', 'TypeScript', 'MUI', 'AI'],        layout: 'feature-alt' },
      { key: 'hematobieg', title: 'Hematobieg',         tag: 'Commercial · Live', desc: 'A national charity-run platform supporting Polish leukemia patients. Built end-to-end: marketing site, registration flow, sponsor showcase, content pages.', chips: ['React', 'Bootstrap', 'Responsive', 'CMS'], layout: 'feature' },
      { key: 'phonecatalog', title: 'Phone Catalog',      tag: 'eCommerce',         desc: 'A complete online store for phones and mobile accessories: catalog browsing, cart, favorites, product detail with image carousel and variant picker.',      chips: ['React', 'TypeScript', 'Sass'],             layout: 'half' },
      { key: 'welcometothemet', title: 'Welcome to the MET', tag: 'Marketing site',    desc: 'A fully responsive museum experience with hero galleries, exhibition pages and a contact form. Pixel-tight, mobile-first.',                                chips: ['HTML', 'Sass', 'BEM'],                    layout: 'half' },
    ] } }
};

export default projects;
