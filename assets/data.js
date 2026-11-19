/* KH Real Estate – listings data. Edit this file to add / update properties. */
window.KH = {
  phone: '+963967113344',
  phoneDisplay: '+963 967 113 344',
  whatsapp: '963967113344',
  instagram: 'https://www.instagram.com/kh_realestate.syria/',
  areas: {
    'مشروع دمر': { coords: [33.5355, 36.2275], img: 'assets/img/ter_view.jpg', blurb: 'جزر سكنية حديثة وإطلالات مفتوحة على قاسيون' },
    'دمشق القديمة': { coords: [33.5110, 36.3065], img: 'assets/img/old_court.jpg', blurb: 'بيوت دمشقية تراثية بقلب المدينة' },
    'ضاحية قدسيا': { coords: [33.5455, 36.2460], img: 'assets/img/qud_garden.jpg', blurb: 'بيوت أرضية بحدائق وهدوء' }
  },
  listings: [
    {
      id: 'kh-195', status: 'sale', type: 'شقة', featured: true, isNew: true,
      title: 'شقة سوبر ديلوكس بمساحة 195 م²',
      area: 'مشروع دمر', sub: 'الجزيرة 16',
      price: 340000, priceNote: 'قابل للتفاوض',
      size: 195, beds: null, baths: null, floor: 'الثاني', facing: 'شمالي غربي', finish: 'سوبر ديلوكس',
      features: ['باركينغ تحت الأرض', 'طاقة خاصة للمصعد', 'أرضيات رخام', 'مطبخ حديث', 'شرفة'],
      desc: [
        'مو كل بيت مساحته 195 متر بيحسسك إنك ساكن بمستوى مختلف. شقة بالطابق الثاني بالجزيرة 16، باتجاه شمالي غربي، بكسوة سوبر ديلوكس وتفاصيل معمولة لحدا بدو الفخامة تكون جزء من يومه.',
        'أرضيات رخام، صالون واسع بإطلالة على الشرفة، ومطبخ حديث. البناء مخدّم بباركينغ تحت الأرض وطاقة خاصة للمصعد.'
      ],
      photos: ['d_living', 'p195', 'd_hall', 'd_bed', 'd_kitchen', 'd_ext'],
      video: 'https://www.instagram.com/reel/Dd2_ct6onDd/'
    },
    {
      id: 'kh-167', status: 'sale', type: 'شقة', featured: true,
      title: 'شقة رحبة جاهزة للسكن',
      area: 'مشروع دمر', sub: 'الجزيرة 8',
      price: 330000, priceNote: '',
      size: 167, beds: 3, baths: null, floor: 'الثالث', facing: 'قبلي شرقي شمالي', finish: 'سوبر ديلوكس',
      features: ['طابو أخضر', 'مصعد', 'صالون', 'جاهزة للسكن'],
      desc: [
        '167 م² من الرحابة بموقع مميز بالجزيرة 8، بتشطيب فاخر وجاهزة للسكن فوراً.',
        'ثلاث غرف نوم وصالون، بالطابق الثالث مع مصعد، باتجاهات قبلي شرقي شمالي، وملكية طابو أخضر. مناسبة للسكن الراقي والاستثمار.'
      ],
      photos: ['p167', 'p167_dining'],
      video: 'https://www.instagram.com/reel/Dc_HMJ0OA6f/'
    },
    {
      id: 'kh-355', status: 'sale', type: 'تراس', featured: true,
      title: 'تراس فاخر بمساحات واسعة',
      area: 'مشروع دمر', sub: '',
      price: null, priceNote: 'السعر عند الطلب',
      size: 355, outdoor: 260, beds: null, baths: null, floor: 'تراس', facing: '', finish: 'إكساء فاخر',
      features: ['تكييف مركزي', 'تدفئة أرضية', 'طاقة شمسية متكاملة', 'غرف خدمة مستقلة', 'غرفة مكتب مستقلة', 'مساحة خارجية 260 م²'],
      desc: [
        'عقار بيجمع بين المساحات الواسعة والراحة والخصوصية: 355 م² داخلي و260 م² مساحة خارجية مثالية للاستمتاع بالأجواء المفتوحة.',
        'تكييف مركزي، تدفئة أرضية، نظام طاقة شمسية متكامل، غرف خدمة مستقلة وغرفة مكتب، مع إكساء فاخر وديكورات مميزة.'
      ],
      photos: ['ter_living', 'pterrace', 'ter_view', 'ter_kitchen'],
      video: 'https://www.instagram.com/reel/DehZa-qOwYx/'
    },
    {
      id: 'kh-old', status: 'sale', type: 'بيت عربي', featured: true, signature: true,
      title: 'بيت دمشقي تراثي عمره أكثر من 300 عام',
      area: 'دمشق القديمة', sub: '',
      price: 1900000, priceNote: '',
      size: 1000, sizeApprox: true, beds: null, baths: null, floor: '3 طوابق', facing: '', finish: 'تراثي أصلي',
      features: ['ساحات داخلية وخارجية', 'برك رخامية', 'ليوان دمشقي مزخرف', 'قاعات استقبال واسعة', 'مناسب لفندق بوتيك أو مطعم'],
      desc: [
        'من قلب دمشق القديمة، بيت دمشقي تراثي نادر يحكي قصة من تاريخ الشام، يمتد على ثلاث طوابق بمساحة إجمالية تقارب 1,000 م².',
        'ساحات داخلية وخارجية تتوسطها برك رخامية، وليوان دمشقي مزخرف بالرخام والنقوش، وقاعات استقبال واسعة وغرف نوم بالطابق العلوي. فرصة للسكن أو للاستثمار كمطعم راقٍ أو فندق بوتيك تراثي.'
      ],
      photos: ['old_court', 'old_iwan', 'old_detail', 'poldhouse'],
      video: 'https://www.instagram.com/reel/Dcnb-YDMlmq/'
    },
    {
      id: 'kh-qud', status: 'sale', type: 'منزل أرضي', isNew: true,
      title: 'منزل أرضي بحديقتين',
      area: 'ضاحية قدسيا', sub: 'بجانب نفيسة',
      price: 150000, priceNote: 'قابل للتفاوض',
      size: 110, outdoor: 100, beds: null, baths: null, floor: 'أرضي', facing: '', finish: 'جيدة جداً',
      features: ['حديقة أمامية 50 م²', 'حديقة خلفية 50 م²', 'طابو أخضر', 'بناء إسكان'],
      desc: [
        'منزل أرضي بيجمع بين المساحة والحدائق والراحة: 110 م² مساحة داخلية مع حديقة أمامية وحديقة خلفية كل وحدة 50 م².',
        'ملكية طابو أخضر، بناء إسكان، وكسوة جيدة جداً.'
      ],
      photos: ['qud_living', 'qud_garden', 'qud_bed'],
      video: 'https://www.instagram.com/reel/DcvYdx9O4OG/'
    },
    {
      id: 'kh-r165', status: 'rent', type: 'شقة', isNew: true,
      title: 'منزل مفروش للإيجار السنوي',
      area: 'مشروع دمر', sub: 'الجزيرة الخامسة',
      price: 18000, priceUnit: 'سنوياً', priceNote: '+ بازار',
      size: 165, beds: 3, baths: 2, floor: 'الرابع (الأخير)', facing: '', finish: 'ممتازة',
      features: ['مفروش بالكامل', '4 مكيفات', 'تدفئة مركزية', 'طاقة شمسية', 'مصعد يعمل على الطاقة', 'مياه ساخنة بالطاقة الشمسية'],
      desc: ['منزل مفروش بالطابق الرابع والأخير بالجزيرة الخامسة: ثلاث غرف نوم، صالونان وسفرة، حمامان، وقبو للخدمات. كسوة ممتازة وإطلالة جميلة، مع منظومة طاقة شمسية متكاملة.'],
      photos: [],
      video: ''
    },
    {
      id: 'kh-s150', status: 'sold', type: 'شقة',
      title: 'شقة مفروشة بإطلالة على الحزام الأخضر',
      area: 'مشروع دمر', sub: 'الجزيرة 10',
      price: null, size: 150, beds: 3, floor: '', facing: 'قبلي غربي', finish: 'سوبر ديلوكس',
      features: ['مع الفرش', 'إطلالة على الحزام الأخضر'], desc: [], photos: ['psold150'], video: ''
    },
    {
      id: 'kh-s230', status: 'sold', type: 'دوبلكس',
      title: 'دوبلكس بمدخل مستقل وسطح',
      area: 'دمشق', sub: '',
      price: null, size: 120, sizeNote: 'لكل طابق', beds: null, floor: 'دوبلكس', facing: 'شمالي غربي شرقي', finish: '',
      features: ['مدخل مستقل', 'سطح 120 م²'], desc: [], photos: ['psoldduplex'], video: ''
    }
  ]
};
