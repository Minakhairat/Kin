import { PricingPackage, PortfolioItem } from '../types';

export const COMPANY_INFO = {
  name: 'Kin Media Production',
  tagline: 'KEEP IT NEAT',
  logo: '/assets/aistudio/Untitled-1_a311767c.png',
  address: {
    ar: '24 شارع غرناطة، الكوربة، مصر الجديدة — الدور الثاني، شقة 9',
    en: '24 Granada St., Korba, Heliopolis, Cairo — 2nd Floor, Apt 9',
  },
  phones: ['01280700319', '01099011017'],
  whatsappNumbers: ['201280700319', '201099011017'],
  instagram: 'kin.media.production',
  instagramUrl: 'https://instagram.com/kin.media.production',
  googleMapsUrl: 'https://maps.google.com/?q=24+Granada+Street+Korba+Heliopolis+Cairo+Egypt',
  images: {
    heroStudio: '/src/assets/images/hero_cinematic_studio_1792602515235.jpg',
    podcastSet: '/src/assets/images/podcast_studio_set_1792602515409.jpg',
    reelsProduction: '/src/assets/images/reels_production_behind_scenes_1792602516498.jpg',
    commercialSet: '/src/assets/images/cinematic_commercial_film_1792602516038.jpg',
    podcastPoster: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_5.40.48_PM_e7b4858f.jpeg',
    reelsPoster: '/assets/aistudio/WhatsApp_Image1_2026-10-21_at_5.40.48_PM_64c18a98.jpeg',
  }
};

export const PODCAST_PACKAGES: PricingPackage[] = [
  {
    id: 'podcast-solo',
    name: 'Solo',
    category: 'podcasts',
    price: 10000,
    period: 'episode',
    unit: 'ج / الحلقة',
    deliverables: 'حلقة كاملة + 3 كليبات قصيرة للسوشيال',
    sessionTime: 'سيشن 3 ساعات (حلقة لحد ساعة)',
    cameras: '2 كاميرا (كلوز + وايد)',
    sound: 'صوت ستوديو (مايك مخصص + ريكوردر احترافي)',
    features: [
      'مذيع أو متحدث واحد (1 Host)',
      '2 كاميرات سينمائية بجودة 4K (كادر كلوز + كادر وايد)',
      'صوت ستوديو احترافي: مايك مخصص لكل صوت + ريكوردر',
      'سيشن تصوير لمدة 3 ساعات في الاستوديو (حلقة حتى 60 دقيقة)',
      'مونتاج كامل للحلقة مع تصحيح احترافي للألوان وهندسة الصوت',
      '3 كليبات مقطوعة جاهزة لـ Reels و TikTok و Shorts'
    ]
  },
  {
    id: 'podcast-duo',
    name: 'Duo',
    category: 'podcasts',
    price: 15000,
    period: 'episode',
    unit: 'ج / الحلقة',
    deliverables: 'حلقة كاملة + 3 كليبات قصيرة للسوشيال',
    sessionTime: 'سيشن 3 ساعات (حلقة لحد ساعة)',
    cameras: '3 كاميرات (كلوز لكل واحد + وايد)',
    sound: 'مايك مخصص لكل واحد + ريكوردر',
    features: [
      'شخصين (مذيع + ضيف)',
      '3 كاميرات سينمائية (كاميرا كلوز لكل شخص + كاميرا وايد للثنائي)',
      'صوت ستوديو مستقل: مايك احترافي مخصص لكل شخص + ريكوردر',
      'سيشن تصوير لمدة 3 ساعات بالاستوديو (حلقة حتى 60 دقيقة)',
      'مونتاج كامل للحلقة مع تقطيع احترافي وتصحيح الألوان والصوت',
      '3 كليبات مقطوعة ومهيأة للانتشار على منصات السوشيال'
    ]
  },
  {
    id: 'podcast-doubleday',
    name: 'Double Day',
    category: 'podcasts',
    price: 24000,
    period: '2-episodes',
    unit: 'ج / حلقتين (12,000 للحلقة)',
    recommended: true,
    highlight: 'وفر 6,000 ج مع تصوير حلقتين متتاليتين في يوم واحد',
    deliverables: 'حلقتين كاملتين + 6 كليبات قصيرة',
    sessionTime: 'تصوير حلقتين في يوم تصوير واحد متتابع',
    cameras: '3 كاميرات (تجهيز الـ Duo كامل)',
    sound: 'مايك مخصص لكل متحدث + هندسة صوت كاملة',
    features: [
      'نفس تجهيز باكدج الـ Duo الكامل (شخصين و 3 كاميرات)',
      'تسجيل حلقتين في يوم عمل واحد متتابع (Back-to-back)',
      'مونتاج وتصحيح ألوان وهندسة صوت احترافية للحلقتين كاملتين',
      '6 كليبات قصيرة مقطوعة ومصممة للسوشيال (3 كليبات لكل حلقة)',
      'توفير استثنائي: 12,000 ج للحلقة بدلاً من 15,000 ج'
    ]
  },
  {
    id: 'podcast-monthly',
    name: 'Monthly Show',
    category: 'podcasts',
    price: 44000,
    period: 'month',
    unit: 'ج / الشهر',
    highlight: 'حل شامل لإنتاج برنامجك الشهري بانتظام',
    deliverables: '4 حلقات شهرية + 12 كليب سوشيال',
    sessionTime: 'يومين تصوير شهرياً (حلقتين في كل يوم)',
    cameras: '3 كاميرات (تجهيز الـ Duo كامل)',
    sound: 'صوت ستوديو متقدم وميكساج شامل',
    features: [
      '4 حلقات كاملة متقنة كل شهر',
      'يومين تصوير بالاستوديو شهرياً (حلقتين لكل يوم)',
      '12 كليب قصير شهرياً جاهز لـ Reels و TikTok و Shorts',
      'تجهيز كامل بكاميرات الـ Duo مع إشراف إخراجي متواصل',
      'أولوية حجز مواعيد الاستوديو والمونتاج السريع'
    ]
  }
];

export const REELS_PACKAGES: PricingPackage[] = [
  {
    id: 'reels-basic',
    name: 'Basic',
    category: 'reels',
    price: 12000,
    period: 'month',
    unit: 'ج / الشهر',
    deliverables: '10 ريلز شهرياً عالية الجودة',
    sessionTime: 'تصوير شهري حتى 3 ساعات',
    turnaround: 'تسليم خلال 5-7 أيام عمل',
    revisions: 'تعديلان (2) لكل فيديو',
    features: [
      'إنتاج 10 ريلز شهرية متقنة',
      'يوم تصوير شهري بالاستوديو حتى 3 ساعات',
      'مونتاج احترافي بتصحيح الألوان وضبط نقاء الصوت',
      'توجيه وتنظيم أفكار المحتوى قبل التصوير',
      'إمكانية إجراء تعديلين (2 Revisions) لكل فيديو',
      'تسليم من 5 إلى 7 أيام عمل',
      'مهيأة بالكامل لمنصات: Instagram, TikTok, Facebook'
    ]
  },
  {
    id: 'reels-pro',
    name: 'Pro',
    category: 'reels',
    price: 15000,
    period: 'month',
    unit: 'ج / الشهر',
    recommended: true,
    highlight: 'الخيار الأكثر طلباً لصناع المحتوى والبراندات',
    deliverables: '15 ريل شهرياً + خطة محتوى متكاملة',
    sessionTime: 'تصوير شهري حتى 4 ساعات',
    turnaround: 'تسليم سريع خلال 3-5 أيام عمل',
    revisions: 'تعديلان (2) لكل فيديو',
    features: [
      'إنتاج 15 ريل شهرياً لتواجد يوم بعد يوم',
      'يوم تصوير شهري بالاستوديو حتى 4 ساعات',
      'مونتاج دقيق، تصحيح ألوان ديناميكي، مؤثرات صوتية',
      'خطة محتوى شهرية كاملة (أفكار + صياغة وهوك قوي)',
      'إمكانية إجراء تعديلين لكل فيديو',
      'تسليم سريع خلال 3 إلى 5 أيام عمل',
      'مهيأة بالكامل لـ Instagram و TikTok و Facebook'
    ]
  },
  {
    id: 'reels-premium',
    name: 'Premium',
    category: 'reels',
    price: 22000,
    period: 'month',
    unit: 'ج / الشهر',
    highlight: 'أعلى مستوى إنتاج مع أولوية قصوى ومؤثرات سينمائية',
    deliverables: '20 ريل شهرياً + خطة استراتيجية كاملة',
    sessionTime: 'تصوير شهري حتى 6 ساعات',
    turnaround: 'أولوية قصوى في قائمة المونتاج والتسليم',
    revisions: '3 تعديلات لكل فيديو',
    features: [
      'إنتاج 20 ريل شهرياً لاكتساح خوارزميات السوشيال',
      'يوم تصوير شهري ممتد حتى 6 ساعات بالاستوديو',
      'مونتاج سينمائي متقدم بالألوان والصوت والمؤثرات البصرية',
      'خطة محتوى استراتيجية شهرية متكاملة لنمو البراند',
      '3 تعديلات لكل فيديو لضمان الرضا التام',
      'أولوية قصوى وتصنيف VIP في قائمة المونتاج',
      'دعم واستشارات مستمرة في السوشيال ميديا'
    ]
  }
];

export const ADDONS_DATA = {
  podcasts: [
    { id: 'extra-guest', nameAr: 'ضيف إضافي (Extra Guest)', nameEn: 'Extra Guest', price: 3500, unit: 'ج / للضيف' },
    { id: 'custom-set', nameAr: 'ديكور استوديو مخصص أو خلفية AI', nameEn: 'Custom Studio Decor or AI Virtual Backdrop', price: 0, customQuote: true, unit: 'حسب الاتفاق' }
  ],
  reels: [
    { id: 'outdoor-shoot', nameAr: 'تصوير خارجي (Outdoor Shoot)', nameEn: 'Outdoor Location Shoot', price: 4000, unit: 'ج / للسيشن' },
    { id: 'extra-hour', nameAr: 'ساعة تصوير إضافية', nameEn: 'Extra Studio Hour', price: 1000, unit: 'ج / للساعة' }
  ]
};

export const STRENGTHS = [
  {
    id: 'every-angle',
    titleAr: 'كل الزوايا',
    titleEn: 'Every Angle',
    descAr: 'تصوير متعدد الكاميرات (كلوز ووايد) مع تقطيع سينمائي كأنه برنامج تلفزيوني حي.',
    descEn: 'Multi-camera setup with close-ups and wide perspectives, edited seamlessly like a prime-time broadcast.',
    iconName: 'Video'
  },
  {
    id: 'sound-trust',
    titleAr: 'صوت تثق فيه',
    titleEn: 'Sound You Can Trust',
    descAr: 'مايك احترافي مخصص ومستقل لكل صوت + ريكوردرات تسجيل استوديو لعزل كل الضوضاء.',
    descEn: 'Dedicated studio-grade microphone for every voice paired with dedicated audio recorders.',
    iconName: 'Mic'
  },
  {
    id: 'one-team',
    titleAr: 'فريق واحد من الأول للآخر',
    titleEn: 'One Team, Start to Finish',
    descAr: 'تخطيط، تصوير، مونتاج، هندسة صوت، وتصحيح ألوان تحت سقف واحد بدون وسيط.',
    descEn: 'Strategy, lighting, cinematography, sound design, and color grading completely under one roof.',
    iconName: 'Users'
  },
  {
    id: 'one-episode-many-posts',
    titleAr: 'حلقة واحدة، بوستات كتير',
    titleEn: 'One Episode, Many Posts',
    descAr: 'كل جلسة تصوير تتحول لحلقة كاملة بالإضافة لمجموعة كليبات قصيرة مقصوصة للريلز والـ Shorts.',
    descEn: 'Turn a single recording session into a full show plus ready-to-post viral vertical clips.',
    iconName: 'Scissors'
  },
  {
    id: 'planned-not-random',
    titleAr: 'مُخطط، مش عشوائي',
    titleEn: 'Planned, Not Random',
    descAr: 'كل ريل وكل حلقة مبنية بعناية على أهداف البراند بتاعك وهوك يجذب الجمهور من أول ثانية.',
    descEn: 'Every reel and frame is structured intentionally around your brand goals and audience hooks.',
    iconName: 'Target'
  },
  {
    id: 'on-time',
    titleAr: 'في الميعاد، كل مرة',
    titleEn: 'On Time, Every Time',
    descAr: 'أيام تسليم واضحة ومحددة سلفاً في كل باكدج. مفيش تسويف، محتواك بينزل في وقته.',
    descEn: 'Clear delivery timetables guaranteed across every package. Neat, punctual, and reliable.',
    iconName: 'Clock'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'show-business-talks',
    title: 'بودكاست رواد الأعمال | Business Minds Show',
    category: 'podcasts',
    client: 'The Venture Pulse',
    duration: '48:15',
    aspectRatio: '16:9',
    coverImage: '/src/assets/images/hero_cinematic_studio_1792602515235.jpg',
    summary: 'حلقة حوارية مسجلة بنظام 3 كاميرات مع مذيع وضيف، شملت التقطيع والمونتاج الكامل واستخراج 3 كليبات فايرال.',
    specs: {
      cameras: '3x Sony FX6 Cinema Cameras (Dual Close + Master Wide)',
      sound: 'Shure SM7B + Sound Devices Scorpio Recorder',
      deliverables: 'Master 4K YouTube Edit + 3 Reels/TikTok cuts',
      colorGrade: 'Cinematic warm documentary grade'
    }
  },
  {
    id: 'reels-fashion-brand',
    title: 'سلسلة ريلز شهرية | Modest Minimalist Wardrobe',
    category: 'reels',
    client: 'L’Atelier Studio',
    duration: '00:45',
    aspectRatio: '9:16',
    coverImage: '/src/assets/images/reels_production_behind_scenes_1792602516498.jpg',
    summary: 'باقة ريلز شهرية لبراند أزياء، شملت كتابة الهوكس الإبداعية، التصوير في استوديو KIN، ومونتاج سريع الإيقاع.',
    specs: {
      cameras: 'Sony FX3 on Ronin RS3 Pro Gimbal',
      sound: 'Wireless DJI Mic 2 with 32-bit float',
      deliverables: '15 High-Retention Reels with Arabic captions',
      colorGrade: 'High contrast minimalist film tone'
    }
  },
  {
    id: 'commercial-tech-luxury',
    title: 'إعلان سينمائي ترويجي | The Urban Architect',
    category: 'commercials',
    client: 'Kayan Developments',
    duration: '01:30',
    aspectRatio: '16:9',
    coverImage: '/src/assets/images/cinematic_commercial_film_1792602516038.jpg',
    summary: 'فيلم إعلاني تجاري بتصوير سينمائي كامل، كرو متكامل من استوديو KIN، وإخراج احترافي للمنصات الرقمية والتلفزيون.',
    specs: {
      cameras: 'RED V-Raptor 8K + Atlas Orion Anamorphic Lenses',
      sound: 'Bespoke Sound Design & Custom Orchestration',
      deliverables: '16:9 Hero Cut + 9:16 Cutdowns + 1:1 Socials',
      colorGrade: 'ACES Color Pipeline / Film Print Emulation'
    }
  },
  {
    id: 'podcast-tech-founder',
    title: 'لقاء الاستثمار الجريء | Venture Egypt Duo',
    category: 'podcasts',
    client: 'Venture Capital Cairo',
    duration: '52:10',
    aspectRatio: '16:9',
    coverImage: '/src/assets/images/podcast_studio_set_1792602515409.jpg',
    summary: 'تسجيل حلقة بودكاست ثنائية مع مستثمر ومؤسس شركة ناشئة، عزل صوتي كامل في استوديو الكوربة.',
    specs: {
      cameras: '3x Cinema Rigs (Multi-angle synchronized sync)',
      sound: 'Rode PodMic Studio Pair + Focusrite Interface',
      deliverables: 'Full Episode + 4 Vertical Social Cuts',
      colorGrade: 'Editorial corporate warmth'
    }
  }
];

export const STUDIO_EQUIPMENT = [
  { nameAr: 'الكاميرات والعدسات', nameEn: 'Cinema Cameras & Glass', descAr: 'كاميرات سينمائية بدقة 4K/6K وعدسات برايم فائقة الحدة', descEn: '4K/6K cinema lines with prime lenses for rich bokeh and sharpness' },
  { nameAr: 'الصوت الاحترافي', nameEn: 'Broadcast Audio', descAr: 'مايكات Shure SM7B وريكوردرات ستوديو وعزل صوتي احترافي', descEn: 'Shure SM7B & podcast mics, multi-track recorders, and acoustic baffles' },
  { nameAr: 'الإضاءة السينمائية', nameEn: 'Studio Lighting', descAr: 'إضاءات سوفت بوكس متطورة و RGB Ambiance قابلة للتعديل حسب هويتك', descEn: 'High CRI daylight and bi-color fixtures with tunable RGB accent moods' },
  { nameAr: 'غرفة التحكم والمونتاج', nameEn: 'Monitoring Lounge', descAr: 'شاشات عرض مباشرة للمخرج والعميل لمتابعة التسجيل لحظة بلحظة', descEn: 'Real-time client monitoring screens so you review takes immediately' }
];
