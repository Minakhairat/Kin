import { PricingPackage, PortfolioItem } from '../types';

export const COMPANY_INFO = {
  name: 'Kin Media Production',
  tagline: 'KEEP IT NEAT',
  logo: './assets/aistudio/Untitled-1_a311767c.png',
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
    heroStudio: './assets/images/hero_cinematic_studio_1792602515235.jpg',
    podcastSet: './assets/images/podcast_studio_set_1792602515409.jpg',
    reelsProduction: './assets/images/reels_production_behind_scenes_1792602516498.jpg',
    commercialSet: './assets/images/cinematic_commercial_film_1792602516038.jpg',
    podcastPoster: './assets/aistudio/WhatsApp_Image_2026-10-21_at_5.40.48_PM_e7b4858f.jpeg',
    reelsPoster: './assets/aistudio/WhatsApp_Image1_2026-10-21_at_5.40.48_PM_64c18a98.jpeg',
  }
};

export const PODCAST_PACKAGES: PricingPackage[] = [
  {
    id: 'podcast-solo',
    name: 'Solo',
    category: 'podcasts',
    price: 10000,
    period: 'episode',
    unitAr: 'ج / الحلقة',
    unitEn: 'EGP / Episode',
    deliverablesAr: 'حلقة كاملة + 3 كليبات قصيرة للسوشيال',
    deliverablesEn: 'Full edited episode + 3 social short clips',
    sessionTimeAr: 'سيشن 3 ساعات (حلقة لحد ساعة)',
    sessionTimeEn: '3-hour session (episode up to 1 hr)',
    featuresAr: [
      'مذيع أو متحدث واحد (1 Host)',
      '2 كاميرات سينمائية بجودة 4K (كادر كلوز + كادر وايد)',
      'صوت ستوديو احترافي: مايك مخصص لكل صوت + ريكوردر',
      'سيشن تصوير لمدة 3 ساعات في الاستوديو (حلقة حتى 60 دقيقة)',
      'مونتاج كامل للحلقة مع تصحيح احترافي للألوان وهندسة الصوت',
      '3 كليبات مقطوعة جاهزة لـ Reels و TikTok و Shorts'
    ],
    featuresEn: [
      '1 Host setup',
      '2 Cinema 4K cameras (Close-up + Master wide angle)',
      'Studio sound: Dedicated broadcast mic + multitrack recorder',
      '3-hour studio session (episode duration up to 60 minutes)',
      'Full episode edit with color grading and audio engineering',
      '3 vertical cutdown clips ready for Reels, TikTok & Shorts'
    ]
  },
  {
    id: 'podcast-duo',
    name: 'Duo',
    category: 'podcasts',
    price: 15000,
    period: 'episode',
    unitAr: 'ج / الحلقة',
    unitEn: 'EGP / Episode',
    deliverablesAr: 'حلقة كاملة + 3 كليبات قصيرة للسوشيال',
    deliverablesEn: 'Full edited episode + 3 social short clips',
    sessionTimeAr: 'سيشن 3 ساعات (حلقة لحد ساعة)',
    sessionTimeEn: '3-hour session (episode up to 1 hr)',
    featuresAr: [
      'شخصين (مذيع + ضيف)',
      '3 كاميرات سينمائية (كاميرا كلوز لكل شخص + كاميرا وايد للثنائي)',
      'صوت ستوديو مستقل: مايك احترافي مخصص لكل شخص + ريكوردر',
      'سيشن تصوير لمدة 3 ساعات بالاستوديو (حلقة حتى 60 دقيقة)',
      'مونتاج كامل للحلقة مع تقطيع احترافي وتصحيح الألوان والصوت',
      '3 كليبات مقطوعة ومهيأة للانتشار على منصات السوشيال'
    ],
    featuresEn: [
      '2 People setup (Host + Guest)',
      '3 Cinema cameras (Close-up on each + Master wide)',
      'Studio sound: Dedicated microphone for each voice + recorder',
      '3-hour studio session (episode duration up to 60 minutes)',
      'Full episode multi-cam edit with color correction & sound master',
      '3 social clips formatted for high retention'
    ]
  },
  {
    id: 'podcast-doubleday',
    name: 'Double Day',
    category: 'podcasts',
    price: 24000,
    period: '2-episodes',
    unitAr: 'ج / حلقتين (12,000 للحلقة)',
    unitEn: 'EGP / 2 Episodes (12K/ep)',
    recommended: true,
    highlightAr: 'وفر 6,000 ج مع تصوير حلقتين متتاليتين في يوم واحد',
    highlightEn: 'Save 6,000 EGP by recording two episodes back-to-back',
    deliverablesAr: 'حلقتين كاملتين + 6 كليبات قصيرة',
    deliverablesEn: '2 Full episodes + 6 social clips',
    sessionTimeAr: 'تصوير حلقتين في يوم تصوير واحد متتابع',
    sessionTimeEn: 'Two episodes recorded back-to-back in one day',
    featuresAr: [
      'نفس تجهيز باكدج الـ Duo الكامل (شخصين و 3 كاميرات)',
      'تسجيل حلقتين في يوم عمل واحد متتابع (Back-to-back)',
      'مونتاج وتصحيح ألوان وهندسة صوت احترافية للحلقتين كاملتين',
      '6 كليبات قصيرة مقطوعة ومصممة للسوشيال (3 كليبات لكل حلقة)',
      'توفير استثنائي: 12,000 ج للحلقة بدلاً من 15,000 ج'
    ],
    featuresEn: [
      'Same full Duo setup (2 people, 3 cameras)',
      'Two episodes recorded back-to-back in a single day',
      'Full edit, color grading, and audio mastering for both episodes',
      '6 short vertical clips (3 clips from each episode)',
      'Best value: 12,000 EGP per episode instead of 15,000 EGP'
    ]
  },
  {
    id: 'podcast-monthly',
    name: 'Monthly Show',
    category: 'podcasts',
    price: 44000,
    period: 'month',
    unitAr: 'ج / الشهر',
    unitEn: 'EGP / Month',
    highlightAr: 'حل شامل لإنتاج برنامجك الشهري بانتظام',
    highlightEn: 'Complete monthly recurring show retainer',
    deliverablesAr: '4 حلقات شهرية + 12 كليب سوشيال',
    deliverablesEn: '4 Episodes/month + 12 short clips',
    sessionTimeAr: 'يومين تصوير شهرياً (حلقتين في كل يوم)',
    sessionTimeEn: '2 Recording shoot days per month',
    featuresAr: [
      '4 حلقات كاملة متقنة كل شهر',
      'يومين تصوير بالاستوديو شهرياً (حلقتين لكل يوم)',
      '12 كليب قصير شهرياً جاهز لـ Reels و TikTok و Shorts',
      'تجهيز كامل بكاميرات الـ Duo مع إشراف إخراجي متواصل',
      'أولوية حجز مواعيد الاستوديو والمونتاج السريع'
    ],
    featuresEn: [
      '4 Full broadcast-ready episodes per month',
      '2 Recording days per month (2 episodes per day)',
      '12 short vertical clips per month ready for Reels & TikTok',
      'Full Duo multi-cam production setup with director oversight',
      'Priority scheduling and first-in-line editing queue'
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
    unitAr: 'ج / الشهر',
    unitEn: 'EGP / Month',
    deliverablesAr: '10 ريلز شهرياً عالية الجودة',
    deliverablesEn: '10 Reels per month',
    sessionTimeAr: 'تصوير شهري حتى 3 ساعات',
    sessionTimeEn: 'Monthly shoot up to 3 hours',
    turnaroundAr: 'تسليم خلال 5-7 أيام عمل',
    turnaroundEn: 'Delivery in 5–7 business days',
    revisionsAr: 'تعديلان (2) لكل فيديو',
    revisionsEn: '2 Revisions per video',
    featuresAr: [
      'إنتاج 10 ريلز شهرية متقنة',
      'يوم تصوير شهري بالاستوديو حتى 3 ساعات',
      'مونتاج احترافي بتصحيح الألوان وضبط نقاء الصوت',
      'توجيه وتنظيم أفكار المحتوى قبل التصوير',
      'إمكانية إجراء تعديلين (2 Revisions) لكل فيديو',
      'تسليم من 5 إلى 7 أيام عمل',
      'مهيأة بالكامل لمنصات: Instagram, TikTok, Facebook'
    ],
    featuresEn: [
      '10 High-retention monthly reels',
      'Monthly studio photoshoot up to 3 hours',
      'Editing with color correction & sound master',
      'Content guidance (ideas to organize your content)',
      '2 Revisions per video',
      'Turnaround in 5–7 business days',
      'Optimized for Instagram, TikTok & Facebook'
    ]
  },
  {
    id: 'reels-pro',
    name: 'Pro',
    category: 'reels',
    price: 15000,
    period: 'month',
    unitAr: 'ج / الشهر',
    unitEn: 'EGP / Month',
    recommended: true,
    highlightAr: 'الخيار الأكثر طلباً لصناع المحتوى والبراندات',
    highlightEn: 'Most requested retainer for creators and brands',
    deliverablesAr: '15 ريل شهرياً + خطة محتوى متكاملة',
    deliverablesEn: '15 Reels per month + Monthly content plan',
    sessionTimeAr: 'تصوير شهري حتى 4 ساعات',
    sessionTimeEn: 'Monthly shoot up to 4 hours',
    turnaroundAr: 'تسليم سريع خلال 3-5 أيام عمل',
    turnaroundEn: 'Delivery in 3–5 business days',
    revisionsAr: 'تعديلان (2) لكل فيديو',
    revisionsEn: '2 Revisions per video',
    featuresAr: [
      'إنتاج 15 ريل شهرياً لتواجد يوم بعد يوم',
      'يوم تصوير شهري بالاستوديو حتى 4 ساعات',
      'مونتاج دقيق، تصحيح ألوان ديناميكي، مؤثرات صوتية',
      'خطة محتوى شهرية كاملة (أفكار + صياغة وهوك قوي)',
      'إمكانية إجراء تعديلين لكل فيديو',
      'تسليم سريع خلال 3 إلى 5 أيام عمل',
      'مهيأة بالكامل لـ Instagram و TikTok و Facebook'
    ],
    featuresEn: [
      '15 Reels per month for consistent multi-weekly presence',
      'Monthly shoot up to 4 hours in studio',
      'Precision editing, color correction & sound effects',
      'Monthly content plan (ideas + full content strategy & hooks)',
      '2 Revisions per video',
      'Priority delivery in 3–5 business days',
      'Format tested for maximum reach across all platforms'
    ]
  },
  {
    id: 'reels-premium',
    name: 'Premium',
    category: 'reels',
    price: 22000,
    period: 'month',
    unitAr: 'ج / الشهر',
    unitEn: 'EGP / Month',
    highlightAr: 'أعلى مستوى إنتاج مع أولوية قصوى ومؤثرات سينمائية',
    highlightEn: 'Maximum output with VIP queue and cinematic effects',
    deliverablesAr: '20 ريل شهرياً + خطة استراتيجية كاملة',
    deliverablesEn: '20 Reels per month + Strategy + Priority queue',
    sessionTimeAr: 'تصوير شهري حتى 6 ساعات',
    sessionTimeEn: 'Monthly shoot up to 6 hours',
    turnaroundAr: 'أولوية قصوى في قائمة المونتاج والتسليم',
    turnaroundEn: 'First in the edit queue',
    revisionsAr: '3 تعديلات لكل فيديو',
    revisionsEn: '3 Revisions per video',
    featuresAr: [
      'إنتاج 20 ريل شهرياً لاكتساح خوارزميات السوشيال',
      'يوم تصوير شهري ممتد حتى 6 ساعات بالاستوديو',
      'مونتاج سينمائي متقدم بالألوان والصوت والمؤثرات البصرية',
      'خطة محتوى استراتيجية شهرية متكاملة لنمو البراند',
      '3 تعديلات لكل فيديو لضمان الرضا التام',
      'أولوية قصوى وتصنيف VIP في قائمة المونتاج',
      'دعم واستشارات مستمرة في السوشيال ميديا'
    ],
    featuresEn: [
      '20 High-production reels per month',
      'Monthly photoshoot up to 6 hours in studio',
      'Full editing (color, sound design & dynamic motion effects)',
      'Monthly content plan & growth strategy',
      '3 Revisions per video',
      'VIP priority delivery (first in edit queue)',
      'Continuous ongoing content consultation'
    ]
  }
];

export const ADDONS_DATA = {
  podcasts: [
    { id: 'extra-guest', nameAr: 'ضيف إضافي (Extra Guest)', nameEn: 'Extra Guest (+3,500 EGP)', price: 3500, unitAr: 'ج / للضيف', unitEn: 'EGP / guest' },
    { id: 'custom-set', nameAr: 'ديكور استوديو مخصص أو خلفية AI', nameEn: 'Custom Studio Decor or AI Virtual Backdrop', price: 0, customQuote: true, unitAr: 'حسب الاتفاق', unitEn: 'Quoted per show' }
  ],
  reels: [
    { id: 'outdoor-shoot', nameAr: 'تصوير خارجي (Outdoor Shoot)', nameEn: 'Outdoor Location Shoot (+4,000 EGP)', price: 4000, unitAr: 'ج / للسيشن', unitEn: 'EGP / session' },
    { id: 'extra-hour', nameAr: 'ساعة تصوير إضافية', nameEn: 'Extra Studio Hour (+1,000 EGP)', price: 1000, unitAr: 'ج / للساعة', unitEn: 'EGP / hour' }
  ]
};

export const STRENGTHS = [
  {
    id: 'every-angle',
    titleAr: 'كل الزوايا',
    titleEn: 'Every Angle',
    descAr: 'تصوير متعدد الكاميرات (كلوز ووايد) مع تقطيع سينمائي كأنه برنامج تلفزيوني حي.',
    descEn: 'Multi-camera setup with close-ups and wide perspectives, cut seamlessly like a live TV show.',
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
    descEn: 'Planning, filming, editing, sound engineering, and color grading under one roof.',
    iconName: 'Users'
  },
  {
    id: 'one-episode-many-posts',
    titleAr: 'حلقة واحدة، بوستات كتير',
    titleEn: 'One Episode, Many Posts',
    descAr: 'كل جلسة تصوير تتحول لحلقة كاملة بالإضافة لمجموعة كليبات قصيرة مقصوصة للريلز والـ Shorts.',
    descEn: 'Every session turns into a full episode plus short vertical clips ready for social every time.',
    iconName: 'Scissors'
  },
  {
    id: 'planned-not-random',
    titleAr: 'مُخطط، مش عشوائي',
    titleEn: 'Planned, Not Random',
    descAr: 'كل ريل وكل حلقة مبنية بعناية على أهداف البراند بتاعك وهوك يجذب الجمهور من أول ثانية.',
    descEn: 'Every reel and frame is structured intentionally around your brand goals and hooks.',
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
    id: 'reel-it-in-workshop',
    titleAr: 'ورشة REEL IT IN — فن صناعة الريلز الاحترافية',
    titleEn: 'REEL IT IN Workshop — Crafting Engaging Social Content',
    category: 'reels',
    client: '@kin.media.production',
    duration: '00:52',
    aspectRatio: '9:16',
    coverImage: './assets/images/reels_production_behind_scenes_1792602516498.jpg',
    summaryAr: 'من كواليس ورشة REEL IT IN الخاصة باستوديو KIN: كيفية بناء كادر عمودي جذاب، إضاءة سينمائية للمتحدث، وتوليد محتوى سريع التفاعل للبراندات الشخصية.',
    summaryEn: 'Highlights from the REEL IT IN workshop at KIN Studio: mastering vertical framing, broadcast portrait lighting, and crafting high-retention reels for personal brands.',
    instagramUrl: 'https://www.instagram.com/reel/kin.media.production/',
    instagramCaptionAr: 'إزاي تشد انتباه المشاهد في أول ثانيتين؟ لقطات حصرية من ورشة REEL IT IN في استوديو KIN بالكوربة. التخطيط الصح، الإضاءة المناسبة، وحركة الكاميرا اللي بتعمل الفرق في كل ريل. #KeepItNeat #KinMedia #Reels #Heliopolis',
    instagramCaptionEn: 'How to hook attention in the first 2 seconds? Inside the REEL IT IN workshop at KIN Studio in Korba. Intentional planning, flattering lighting, and camera movements that make all the difference. #KeepItNeat #KinMedia #Reels #Heliopolis',
    likes: 1240,
    views: '18.4K',
    specs: {
      camerasAr: 'Sony FX3 + عدسة 24-70mm GM II على مانع اهتزاز DJI RS3 Pro',
      camerasEn: 'Sony FX3 + 24-70mm GM II mounted on DJI RS3 Pro gimbal',
      soundAr: 'صوت لاسلكي 32-bit float مع عوازل صوتية مخصصة',
      soundEn: '32-bit float wireless audio with dedicated studio acoustics',
      deliverablesAr: 'ريل عمودي 9:16 ماستر بدقة 4K مع كابشنز عربية تفاعلية',
      deliverablesEn: '4K Vertical 9:16 master with synced animated captions',
      colorGradeAr: 'تلوين سينمائي معاصر عالي التباين والنقاء',
      colorGradeEn: 'Contemporary crisp film grade with rich skin tones'
    }
  },
  {
    id: 'ai-advertising-bts',
    titleAr: 'كواليس إعلانات الذكاء الاصطناعي والديكورات الافتراضية',
    titleEn: 'Behind The Scenes: AI Advertising & Virtual Sets',
    category: 'commercials',
    client: '@kin.media.production',
    duration: '01:15',
    aspectRatio: '16:9',
    coverImage: './assets/images/cinematic_commercial_film_1792602516038.jpg',
    summaryAr: 'تجربة حية تجمع بين الكرو السينمائي وتصوير الكاميرات الاحترافية في استوديو KIN مع تقنيات الذكاء الاصطناعي التوليدي لإنتاج إعلانات تجارية ذات عوالم بصرية مبهرة.',
    summaryEn: 'A hands-on production blending live cinema camera rigs in KIN Studio with generative AI virtual sets for striking high-concept commercial campaigns.',
    instagramUrl: 'https://www.instagram.com/reel/kin.media.production/',
    instagramCaptionAr: 'من الفكرة للتوليد والمونتاج والتلوين السينمائي: استوديو KIN بيحول الخيال إلى واقع بصري متكامل بدون حدود. شاهد كواليس أحدث أعمالنا الإعلانية. #TurningImaginationIntoReality #KinMedia #Cairo',
    instagramCaptionEn: 'From concept to AI rendering, cinematic editing, and color grading: KIN Studio turns imagination into reality without limits. Take a look behind our latest commercial work. #TurningImaginationIntoReality #KinMedia #Cairo',
    likes: 980,
    views: '14.2K',
    specs: {
      camerasAr: 'كاميرا سينمائية 8K RAW مع عدسات أنامورفيك عريضة',
      camerasEn: '8K RAW Cinema Line with anamorphic cine lenses',
      soundAr: 'تصميم صوتي ومكساج موسيقي مخصص بالكامل',
      soundEn: 'Bespoke cinematic sound design and custom audio mixing',
      deliverablesAr: 'ماستر تجاري 16:9 للتلفزيون واليوتيوب + مقاطع عمودية 9:16',
      deliverablesEn: 'Master 16:9 commercial cut + 9:16 vertical cuts',
      colorGradeAr: 'تلوين سينمائي بمعيار ACES مع محاكاة ألوان أفلام السينما',
      colorGradeEn: 'ACES cinema color pipeline with 35mm print emulation'
    }
  },
  {
    id: 'podcast-founder-lounge',
    titleAr: 'جلسات بودكاست استوديو KIN — نظام 3 كاميرات وعزل كامل',
    titleEn: 'KIN Studio Podcast Sessions — 3-Cam Broadcast Setup',
    category: 'podcasts',
    client: '@kin.media.production',
    duration: '45:20',
    aspectRatio: '16:9',
    coverImage: './assets/images/hero_cinematic_studio_1792602515235.jpg',
    summaryAr: 'حلقة بودكاست حوارية مسجلة في صالة استوديو KIN بالكوربة بنظام الثلاث كاميرات المتزامنة، مع مايكات Shure SM7B وريكوردرات متقدمة تضمن نقاءً صوتياً خالياً من أي تشويش.',
    summaryEn: 'Multi-camera podcast session recorded in KIN Studio lounge in Korba. Synchronized 3-camera system with Shure SM7B microphones and studio soundproofing.',
    instagramUrl: 'https://www.instagram.com/reel/kin.media.production/',
    instagramCaptionAr: 'حلقة كاملة بتتقطع وتتمنتج كأنها برنامج تلفزيوني، ومعاها كليبات قصيرة جاهزة لنشر الريلز والتيك توك. ستوديو KIN هو مساحتك لصناعة برنامجك الخاص. #YourShowOnScreen #KeepItNeat #Podcasts #Heliopolis',
    instagramCaptionEn: 'A full episode recorded and edited like a broadcast show, accompanied by short clips ready for social. KIN Studio is your creative home. #YourShowOnScreen #KeepItNeat #Podcasts #Heliopolis',
    likes: 2150,
    views: '32.1K',
    specs: {
      camerasAr: '3 كاميرات Sony Cinema FX6 (كلوز لكل ضيف + كادر ثنائي واسع)',
      camerasEn: '3x Sony FX6 Cinema Rigs (Dual close-ups + 1 Master wide)',
      soundAr: 'مايكات إذاعية Shure SM7B + ريكوردر استوديو متعدد القنوات',
      soundEn: 'Shure SM7B broadcast microphones + multitrack recorder',
      deliverablesAr: 'الحلقة الكاملة بدقة 4K + 3 مقاطع عمودية مجهزة للسوشيال',
      deliverablesEn: 'Full 4K YouTube master + 3 vertical social cuts',
      colorGradeAr: 'تلوين استوديو دافئ ومريح للعين مع بشرة طبيعية',
      colorGradeEn: 'Warm studio tones with natural skin preservation'
    }
  },
  {
    id: 'reels-branded-creator',
    titleAr: 'سلسلة ريلز شهرية للبراندات وصناع المحتوى',
    titleEn: 'Monthly Retainer Reels for Brands & Personal Identities',
    category: 'reels',
    client: '@kin.media.production',
    duration: '00:48',
    aspectRatio: '9:16',
    coverImage: './assets/images/podcast_studio_set_1792602515409.jpg',
    summaryAr: 'نموذج من محتوى باقات الريلز الشهرية: هوك قوي في أول 3 ثوانٍ، سرد بصري سلس، وتوجيه كامل لصانع المحتوى أثناء جلسة التصوير بالاستوديو لضمان أداء تلقائي واثق.',
    summaryEn: 'An example of our monthly reels retainer: strong hook in the first 3 seconds, dynamic pacing, and active director guidance during the session to guarantee authentic delivery.',
    instagramUrl: 'https://www.instagram.com/reel/kin.media.production/',
    instagramCaptionAr: 'محتوى يعبر عن براندك بدون فوضى. من أول كتابة الهوك حتى استلام الفيديوهات الجاهزة للنشر بمواعيد تسليم محددة في استوديو KIN. #ContentThatSpeaksForYourBrand #Reels #Cairo',
    instagramCaptionEn: 'Content that speaks for your brand. From hook scripting to final delivery within guaranteed schedules at KIN Studio. #ContentThatSpeaksForYourBrand #Reels #Cairo',
    likes: 1840,
    views: '26.8K',
    specs: {
      camerasAr: 'كاميرات سينمائية سريعة الاستجابة مع إضاءات Softbox متطورة',
      camerasEn: 'Cinema rigs with soft key lighting and accent RGB rims',
      soundAr: 'صوت نقي ومباشر مع عزل تام للضوضاء المحيطة',
      soundEn: 'Pristine vocal capture with ambient noise rejection',
      deliverablesAr: 'فيديوهات عمودية جاهزة للنشر على إنستجرام وتيك توك وفيسبوك',
      deliverablesEn: 'Vertical reels optimized for IG, TikTok and Facebook',
      colorGradeAr: 'تلوين عصري مشبع يتناسب مع خوارزميات الهواتف المحمولة',
      colorGradeEn: 'Punchy mobile-optimized color rendition'
    }
  }
];

export const STUDIO_EQUIPMENT = [
  {
    nameAr: 'الكاميرات والعدسات السينمائية',
    nameEn: 'Cinema Cameras & Prime Glass',
    descAr: 'كاميرات سينمائية بدقة 4K/6K وعدسات برايم فائقة الحدة تمنحك عمق ميدان سينمائي وعزل مميز.',
    descEn: '4K/6K cinema camera lines paired with fast prime lenses for crisp sharpness and cinematic depth of field.'
  },
  {
    nameAr: 'هندسة الصوت الإذاعي',
    nameEn: 'Broadcast Audio Engineering',
    descAr: 'مايكات Shure SM7B الشهيرة وريكوردرات ستوديو وعزل صوتي احترافي يضمن صوت نقي 100%.',
    descEn: 'Industry-standard Shure SM7B broadcast microphones, multitrack audio recorders, and treated acoustic suites.'
  },
  {
    nameAr: 'الإضاءة الديناميكية و RGB',
    nameEn: 'Studio Lighting & Ambient RGB',
    descAr: 'إضاءات سوفت بوكس متطورة و RGB Ambiance قابلة للتعديل والبرمجة بالكامل لتطابق هوية براندك.',
    descEn: 'High-CRI daylight/bi-color soft keys with fully tunable RGB ambiance matching your brand identity.'
  },
  {
    nameAr: 'غرفة المراقبة والعرض الحي',
    nameEn: 'Client Monitoring Lounge',
    descAr: 'شاشات عرض مباشرة للمخرج والعميل لمتابعة التسجيل كادر بكادر وتأكيد الرضا عن كل مشهد.',
    descEn: 'Real-time high-definition client monitors allowing you to review and approve takes live during filming.'
  }
];
