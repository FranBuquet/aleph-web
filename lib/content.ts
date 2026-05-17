import type { Lang } from "@/components/LanguageProvider";

export const content = {
  es: {
    nav: {
      audiences: "Para quién",
      features: "Funciones",
      how: "Cómo funciona",
      pro: "Para coaches",
      cta: "Empezar",
    },
    hero: {
      badge: "Coach con IA · 24/7",
      h1a: "Tu coach de fitness.",
      h1b: "En WhatsApp.",
      sub: "Sin apps que descargar. Sin registros. Solo escribís — o mandás una foto de lo que comés — y Aleph hace el resto.",
      cta1: "Empezar ahora →",
      cta2: "Cómo funciona",
      trial_note: "✓ Probá 7 días gratis · Cancelá cuando quieras",
      pro_label: "¿Sos coach o nutricionista?",
      pro_link: "Ver plan para profesionales →",
      card_macros_label: "Macros hoy",
      card_macros_pct: "81%",
      card_macros_kcal: "1.840",
      card_macros_kcal_of: "/ 2.280 kcal",
      card_macros_protein: "Proteína",
      card_macros_carbs: "Carbos",
      card_macros_fat: "Grasas",
      card_workout_synced: "Strava sincronizado",
      card_workout_ago: "hace 2 minutos",
      card_workout_title: "Correr — 8.4 km",
      card_workout_duration: "Duración",
      card_workout_pace: "min/km",
      card_workout_burned: "Quemadas",
      card_food_analyzed: "Foto analizada",
      card_food_meal: "Almuerzo",
      card_food_item: "Pollo + arroz integral",
    },
    noApp: {
      label: "La ventaja clave",
      h2: "No bajás ninguna app.",
      points: [
        {
          number: "01",
          title: "Ya lo tenés instalado.",
          body: "WhatsApp está en casi todos los celulares del mundo. No hay nada que configurar.",
        },
        {
          number: "02",
          title: "Lo abrís 30 veces al día.",
          body: "El mejor hábito es el que ya existe. Aleph vive donde ya estás.",
        },
        {
          number: "03",
          title: "Sin fricción de ningún tipo.",
          body: "Sin registro, sin suscripción en la app, sin onboarding interminable. Solo escribís.",
        },
      ],
    },
    audiences: {
      label: "Para quién",
      h2: "Uno para todos.",
      cards: [
        {
          tag: "El Atleta",
          title: "Rendimiento al máximo.",
          body: "Conectá tu Apple Watch o Strava. Aleph registra cada entrenamiento automáticamente, ajusta tus macros según tu deporte — running, fuerza, triatlón — y te muestra cómo viene tu recuperación.",
          highlights: ["Apple Watch + Strava", "Macros por deporte", "Seguimiento de cargas"],
        },
        {
          tag: "Nutrición diaria",
          title: "Comé mejor sin complicarte.",
          body: "Sacá una foto de lo que comés y Aleph calcula los macros al instante. No hace falta ir al gym. Ideal para quien quiere cuidar su nutrición, controlar su peso o asegurarse de comer bien cada día.",
          highlights: ["Foto → macros automáticos", "Sin necesidad de ir al gym", "Seguimiento de 3 días"],
        },
        {
          tag: "El Coach",
          title: "Tu partner de alto rendimiento.",
          body: "Sumá a tus alumnos y seguí su nutrición, sus entrenamientos y su progreso desde un solo lugar. Aleph es el puente entre vos y el rendimiento de cada uno de ellos.",
          highlights: ["Gestión de alumnos", "Nutrición + entreno unificado", "Progresión de cargas"],
        },
      ],
    },
    features: {
      label: "Funciones",
      h2: "Todo lo que hace Aleph.",
      items: [
        {
          title: "Foto → macros en segundos",
          body: "Sacá una foto de tu plato. Aleph identifica la comida, estima la porción y registra los macros automáticamente.",
        },
        {
          title: "Apple Watch + Strava",
          body: "Cada entrenamiento sincronizado llega solo a Aleph. Sin tener que escribir nada después de entrenar.",
        },
        {
          title: "Macros por deporte y objetivo",
          body: "Un runner necesita más carbos que alguien que hace fuerza. Aleph lo sabe y ajusta tus targets en consecuencia.",
        },
        {
          title: "Historial nutricional de 3 días",
          body: "Aleph siempre tiene contexto de cómo comiste los últimos días para darte consejos precisos.",
        },
        {
          title: "Rutinas personalizadas por IA",
          body: "Describí tu objetivo y disponibilidad. Aleph arma tu rutina semanal o carga la que ya tenés.",
        },
        {
          title: "Composición corporal",
          body: "Cargá tu % de grasa de un estudio DEXA o bioimpedancia. Aleph lo usa para calcular tus macros con más precisión.",
        },
      ],
    },
    how: {
      label: "Cómo funciona",
      h2: "Tres pasos y listo.",
      steps: [
        {
          number: "01",
          title: "Escribís a Aleph por WhatsApp.",
          body: "Pedís acceso y en minutos estás hablando con tu coach. Sin descargas, sin formularios.",
        },
        {
          number: "02",
          title: "Hacés tu perfil en 5 minutos.",
          body: "Aleph te hace 9 preguntas simples: tu peso, tu deporte, tu objetivo. Con eso calcula tus macros diarios automáticamente.",
        },
        {
          number: "03",
          title: "Aleph te acompaña todos los días.",
          body: "Registrás comidas, entrenos y peso. Aleph trackea tu progreso y te ajusta el plan cuando cambia tu situación.",
        },
      ],
    },
    pro: {
      label: "Para profesionales",
      h2a: "Seguimiento real,",
      h2b: "desde donde ya trabajás.",
      sub: "Cargá planes, pedí informes y configurá alertas para cada cliente — todo desde WhatsApp.",
      features: [
        {
          title: "Planes al instante",
          body: "Cargás la dieta o rutina de un cliente directamente al chat. Ellos la reciben con una notificación.",
        },
        {
          title: "Informes cuando los pedís",
          body: "Un mensaje y tenés el resumen de peso, macros y entrenos de los últimos días.",
        },
        {
          title: "Alertas personalizadas",
          body: "Si un cliente no registra nada en varios días o su peso varía más de lo esperado, te avisamos.",
        },
        {
          title: "Sin fricción para nadie",
          body: "Tus clientes ya usan WhatsApp. No hay app nueva que aprender ni integración que configurar.",
        },
      ],
      chat: [
        { from: "pro" as const, text: "informe María 7 días" },
        { from: "bot" as const, text: "📊 Últimos 7 días\n⚖️ Peso: 68.2 kg (−0.8 kg)\n🏋️ 4 sesiones\n🍽️ 1.840 kcal · 142g prot" },
        { from: "pro" as const, text: "cargar dieta a Franco" },
        { from: "bot" as const, text: "📝 Enviá el plan en el próximo mensaje." },
      ],
      plans: [
        { name: "Starter", clients: 10, price: "$19.900", period: "/mes", recommended: false },
        { name: "Pro", clients: 25, price: "$34.900", period: "/mes", recommended: true },
      ],
      plans_note: "Los clientes que sumés al seguimiento deben tener suscripción activa en Aleph.",
      cta: "Empezar →",
    },
    cta: {
      h2: "Empezá hoy.",
      sub: "Sin app. Sin tarjeta. Solo WhatsApp.",
      btn: "Hablar con Aleph →",
    },
  },

  en: {
    nav: {
      audiences: "Who it's for",
      features: "Features",
      how: "How it works",
      pro: "For coaches",
      cta: "Get started",
    },
    hero: {
      badge: "AI Coach · 24/7",
      h1a: "Your fitness coach.",
      h1b: "On WhatsApp.",
      sub: "No apps to download. No sign-ups. Just message — or send a photo of your meal — and Aleph does the rest.",
      cta1: "Get started →",
      cta2: "How it works",
      trial_note: "✓ Try 7 days free · Cancel anytime",
      pro_label: "Are you a coach or nutritionist?",
      pro_link: "See pro plan →",
      card_macros_label: "Today's macros",
      card_macros_pct: "81%",
      card_macros_kcal: "1,840",
      card_macros_kcal_of: "/ 2,280 kcal",
      card_macros_protein: "Protein",
      card_macros_carbs: "Carbs",
      card_macros_fat: "Fat",
      card_workout_synced: "Strava synced",
      card_workout_ago: "2 minutes ago",
      card_workout_title: "Running — 8.4 km",
      card_workout_duration: "Duration",
      card_workout_pace: "min/km",
      card_workout_burned: "Burned",
      card_food_analyzed: "Photo analyzed",
      card_food_meal: "Lunch",
      card_food_item: "Chicken + brown rice",
    },
    noApp: {
      label: "The key advantage",
      h2: "No app to download.",
      points: [
        {
          number: "01",
          title: "You already have it.",
          body: "WhatsApp is on virtually every phone in the world. Nothing to configure.",
        },
        {
          number: "02",
          title: "You open it 30 times a day.",
          body: "The best habit is the one that already exists. Aleph lives where you already are.",
        },
        {
          number: "03",
          title: "Zero friction.",
          body: "No sign-up, no in-app subscription, no endless onboarding. Just message.",
        },
      ],
    },
    audiences: {
      label: "Who it's for",
      h2: "One for all.",
      cards: [
        {
          tag: "The Athlete",
          title: "Peak performance.",
          body: "Connect your Apple Watch or Strava. Aleph logs every workout automatically, adjusts your macros by sport — running, strength, triathlon — and tracks your recovery.",
          highlights: ["Apple Watch + Strava", "Sport-specific macros", "Load tracking"],
        },
        {
          tag: "Daily Nutrition",
          title: "Eat better, effortlessly.",
          body: "Take a photo of your meal and Aleph calculates the macros instantly. No gym needed. Perfect for anyone who wants to eat well, manage their weight, or stay consistent every day.",
          highlights: ["Photo → auto macros", "No gym required", "3-day history"],
        },
        {
          tag: "The Coach",
          title: "Your high-performance partner.",
          body: "Add your athletes and track their nutrition, training, and progress from one place. Aleph is the bridge between you and each athlete's performance.",
          highlights: ["Athlete management", "Unified nutrition + training", "Load progression"],
        },
      ],
    },
    features: {
      label: "Features",
      h2: "Everything Aleph does.",
      items: [
        {
          title: "Photo → macros in seconds",
          body: "Snap a photo of your plate. Aleph identifies the food, estimates the portion, and logs the macros automatically.",
        },
        {
          title: "Apple Watch + Strava",
          body: "Every synced workout goes straight to Aleph. No need to write anything after training.",
        },
        {
          title: "Macros by sport and goal",
          body: "A runner needs more carbs than someone lifting weights. Aleph knows that and adjusts your targets accordingly.",
        },
        {
          title: "3-day nutrition history",
          body: "Aleph always has context on how you've eaten the last few days to give you precise advice.",
        },
        {
          title: "AI-personalized routines",
          body: "Describe your goal and availability. Aleph builds your weekly routine or loads the one you already have.",
        },
        {
          title: "Body composition",
          body: "Load your body fat % from a DEXA scan or bioimpedance test. Aleph uses it to calculate your macros with greater precision.",
        },
      ],
    },
    how: {
      label: "How it works",
      h2: "Three steps and done.",
      steps: [
        {
          number: "01",
          title: "Message Aleph on WhatsApp.",
          body: "Request access and within minutes you're talking to your coach. No downloads, no forms.",
        },
        {
          number: "02",
          title: "Set up your profile in 5 minutes.",
          body: "Aleph asks you 9 simple questions: your weight, your sport, your goal. From that it calculates your daily macros automatically.",
        },
        {
          number: "03",
          title: "Aleph is with you every day.",
          body: "Log meals, workouts, and weight. Aleph tracks your progress and adjusts your plan as your situation changes.",
        },
      ],
    },
    pro: {
      label: "For professionals",
      h2a: "Real tracking,",
      h2b: "from where you already work.",
      sub: "Upload plans, request reports, and set alerts for each client — all from WhatsApp.",
      features: [
        {
          title: "Plans in an instant",
          body: "Upload a client's diet or routine directly in the chat. They receive it with a notification.",
        },
        {
          title: "Reports on demand",
          body: "One message and you have a summary of weight, macros, and workouts from the past few days.",
        },
        {
          title: "Personalized alerts",
          body: "If a client doesn't log anything for several days or their weight varies more than expected, we notify you.",
        },
        {
          title: "Zero friction for everyone",
          body: "Your clients already use WhatsApp. No new app to learn, no integration to configure.",
        },
      ],
      chat: [
        { from: "pro" as const, text: "report María 7 days" },
        { from: "bot" as const, text: "📊 Last 7 days\n⚖️ Weight: 150.2 lb (−1.8 lb)\n🏋️ 4 sessions\n🍽️ 1,840 kcal · 142g prot" },
        { from: "pro" as const, text: "upload diet for Franco" },
        { from: "bot" as const, text: "📝 Send the plan in your next message." },
      ],
      plans: [
        { name: "Starter", clients: 10, price: "$19.900", period: "/mo", recommended: false },
        { name: "Pro", clients: 25, price: "$34.900", period: "/mo", recommended: true },
      ],
      plans_note: "Clients you add to tracking must have an active Aleph subscription.",
      cta: "Get started →",
    },
    cta: {
      h2: "Start today.",
      sub: "No app. No card. Just WhatsApp.",
      btn: "Chat with Aleph →",
    },
  },
} satisfies Record<Lang, object>;
