/**
 * ============================================================================
 * AYS YOGA FOUNDATION - EDITABLE MASTER CONTENT & MEDIA CONFIGURATION
 * ============================================================================
 * 
 * INSTRUCTIONS FOR USERS / DEVELOPERS:
 * You can edit any text, image URL, video URL, or social media handle directly
 * in this file. Changes here will instantly reflect throughout the entire website.
 * 
 * You can also use the interactive on-screen "Edit Content & Media" button
 * at the bottom of the website to test edits live and export your changes.
 */

import heroImg from '../assets/images/hero_yoga_practice_1792776018675.jpg';
import aboutImg from '../assets/images/about_mysore_shala_1792776041623.jpg';
import projectImg from '../assets/images/project_seva_community_1792776019969.jpg';
import resourcesImg from '../assets/images/ashtanga_resources_mantra_1792776020422.jpg';

export interface FoundationData {
  general: {
    foundationName: string;
    tagline: string;
    subTagline: string;
    establishedYear: string;
    lineageTradition: string;
    location: string;
    mysoreMapsUrl?: string;
    bangaloreLocationTitle: string;
    bangaloreAddress: string;
    bangaloreMapsUrl: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    instagramUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
    taxExemptionNotice: string;
    section80GReg?: string;
    panNumber?: string;
    formspreeEndpoint?: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroVideoUrl: string; // YouTube or direct video embed link
    overviewTitle: string;
    overviewParagraph1: string;
    overviewParagraph2: string;
    quoteText: string;
    quoteAuthor: string;
    quoteSource: string;
  };
  about: {
    title: string;
    subtitle: string;
    image: string;
    lineageTitle: string;
    lineageStory: string;
    vedantaTitle: string;
    vedantaExplanation: string;
    mission: string;
    vision: string;
    coreValues: Array<{ title: string; description: string }>;
    teachers: Array<{
      name: string;
      role: string;
      bio: string;
      yearsOfPractice: string;
      avatar: string;
    }>;
    guruProfile?: {
      name: string;
      role: string;
      experience: string;
      bioParagraph1: string;
      bioParagraph2: string;
      bioParagraph3: string;
      journeyTitle: string;
      journeyDescription: string;
      lineageInspirations: Array<{
        name: string;
        tradition: string;
      }>;
      images: {
        centreImage: string;
        centreCaption: string;
        lineageImage: string;
        lineageCaption: string;
      };
    };
  };
  projects: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    videoUrl?: string;
    goalAmount: number;
    raisedAmount: number;
    beneficiariesCount: string;
    status: 'Active' | 'Completed' | 'Ongoing';
    location: string;
  }>;
  testimonials: Array<{
    id: string;
    author: string;
    role: string;
    location: string;
    category: 'Practitioner' | 'Seva Outreach' | 'Teacher Training' | 'Community';
    quote: string;
    year: string;
    avatar?: string;
  }>;
  donations: {
    headline: string;
    subheadline: string;
    impactBreakdown: Array<{
      percentage: number;
      label: string;
      description: string;
    }>;
    presetAmounts: number[];
    bankDetails: {
      accountName: string;
      bankName: string;
      accountNumber: string;
      ifscSwiftCode: string;
      upiId: string;
      qrCodeImage?: string;
    };
  };
  bankDetails?: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
    section80GReg?: string;
    panNumber?: string;
    qrCodeImage?: string;
    donationFormspreeEndpoint?: string;
  };
  ashtangaResources: {
    title: string;
    introduction: string;
    image: string;
    openingMantra: {
      title: string;
      sanskrit: string;
      transliteration: string;
      translation: string;
      audioNote: string;
    };
    closingMantra: {
      title: string;
      sanskrit: string;
      transliteration: string;
      translation: string;
      audioNote: string;
    };
    eightLimbs: Array<{
      limbNumber: number;
      sanskritName: string;
      englishName: string;
      meaning: string;
      practicalApplication: string;
    }>;
    recommendedReadings: Array<{
      title: string;
      author: string;
      description: string;
    }>;
  };
  galleryInstagram: Array<{
    id: string;
    caption: string;
    imageUrl: string;
    postUrl: string;
    type: 'image' | 'video';
  }>;
}

export const initialFoundationData: FoundationData = {
  general: {
    foundationName: "AYS Yoga Foundation",
    tagline: "Dedicated to Traditional Ashtanga Yoga & Advaita Vedanta Lineage",
    subTagline: "Preserving ancient yogic science, community seva initiatives, and classical wisdom for global wellbeing.",
    establishedYear: "2014",
    lineageTradition: "Mysore Ashtanga Yoga (Sri T. Krishnamacharya & Sri K. Pattabhi Jois Parampara)",
    location: "47, Hoshahalli, v, Palavalli, Pavagada, Karnataka 572136",
    mysoreMapsUrl: "https://maps.app.goo.gl/zU76gdr351CCLkZR8",
    bangaloreLocationTitle: "Bangalore Location (Sadashiva Nagar)",
    bangaloreAddress: "3rd floor, 469, 6th Main Rd, opp. Prinky’s Art Studio, Sadashiva Nagar, Armane Nagar, Bengaluru, Karnataka 560080",
    bangaloreMapsUrl: "https://www.google.com/maps/place/Flex+%26+Flow/@13.0084732,77.5756517,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17006f8a197b:0xa4626ce12b154ffc!8m2!3d13.008468!4d77.5782266!16s%2Fg%2F11vt6tm40n?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
    email: "contact@aysyogafoundation.org",
    phone: "+91 97427 34499",
    whatsappNumber: "+91 97427 34499",
    instagramUrl: "https://www.instagram.com/aysyogafoundation",
    facebookUrl: "https://www.facebook.com/aysyogafoundation",
    youtubeUrl: "https://www.youtube.com/@aysyogafoundation",
    taxExemptionNotice: "Registered non-profit charitable trust. Donations eligible for tax deduction under Section 80G (Reg: AALTA9453AF20261) | AYS Foundation PAN: AALTA9453A.",
    section80GReg: "AALTA9453AF20261",
    panNumber: "AALTA9453A",
    formspreeEndpoint: "https://formspree.io/f/mnppnnee",
  },
  home: {
    heroTitle: "Breath, Lineage, and Compassionate Action",
    heroSubtitle: "A living sanctuary uniting traditional Ashtanga Vinyasa Yoga, timeless Vedanta inquiry, and humanitarian Seva to elevate consciousness and serve humanity.",
    heroImage: "/assets/aistudio/srinivas-main-namaste_28018e47.jpeg",
    heroVideoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Replace with your Shala/Foundation YouTube video ID
    overviewTitle: "AYS Yoga Foundation – Mission & Vision 🌿",
    overviewParagraph1: "Preserving Ashtanga Yoga Tradition • Transforming Lives • Serving Humanity",
    overviewParagraph2: "To preserve, practise, and spread the authentic tradition of Ashtanga Yoga and share the transformative wisdom of yoga, pranayama, meditation, and conscious living with people from all walks of life.",
    quoteText: "Yoga is an internal practice. The rest is just a circus. Practice, practice, and all is coming.",
    quoteAuthor: "Sri K. Pattabhi Jois",
    quoteSource: "Yoga Mala (1962)",
  },
  about: {
    title: "About the Foundation & Our Sacred Lineage",
    subtitle: "Carrying forward the pure transmission of Ashtanga Yoga and Vedanta through disciplined study, devotion, and community service.",
    image: aboutImg,
    lineageTitle: "The Lineage of Ashtanga Yoga (Parampara)",
    lineageStory: "In Indian spiritual traditions, knowledge is not merely accumulated through books; it is passed down directly from Guru to disciple through Parampara—an unbroken line of direct transmission. Our practice and teaching methodology flow directly from Sri Tirumalai Krishnamacharya and his disciple Sri K. Pattabhi Jois of Mysore. We preserve the original Vinyasa Krama system, where movement, ujjayi breath, bandhas (internal energy locks), and drishti (focused gaze) synthesize into active meditation.",
    vedantaTitle: "Vedanta: The Philosophical Crown",
    vedantaExplanation: "While Ashtanga asana and pranayama purify the physical and energetic vessels, the philosophy of Advaita Vedanta clarifies the nature of the Seer. Drawing upon the Upanishads, the Bhagavad Gita, and Shankaracharya's commentaries, we guide seekers to discover that beneath all transient fluctuations of mind and identity lies one indivisible, peaceful Consciousness (Brahman).",
    mission: "To impart the uncompromised practice of Ashtanga Yoga and Vedanta philosophy to earnest seekers, while directing collective resources to alleviate suffering through grassroots community welfare and cultural preservation.",
    vision: "A world where the sacred inner discipline of yoga fosters holistic health, emotional resilience, universal compassion, and selfless service across generations.",
    coreValues: [
      {
        title: "Parampara (Authentic Lineage)",
        description: "Faithful adherence to the traditional vinyasa counts, Sanskrit mantras, and ethical foundations without commercial dilution."
      },
      {
        title: "Seva (Selfless Outreach)",
        description: "Transforming the energy cultivated in daily practice into tangible humanitarian support for vulnerable communities."
      },
      {
        title: "Svādhyāya (Self-Study & Inquiry)",
        description: "Continuous contemplation of sacred scriptures, mind observations, and philosophical contemplation under wise guidance."
      },
      {
        title: "Ahimsā & Inclusivity",
        description: "Welcoming practitioners of all backgrounds, cultures, and physical capabilities in an environment of non-harm and respect."
      }
    ],
    teachers: [
      {
        name: "Srinivasa Reddy",
        role: "Yoga Guru & Dedicated Practitioner",
        bio: "Devoted seven years to dedicated Yoga practice, Pranayama, Meditation, and conscious living, inspired by the unbroken Ashtanga tradition.",
        yearsOfPractice: "7+ Years Sincere Practice",
        avatar: "/assets/aistudio/sharath-yoga-centre.jpg_3533f600.jpeg"
      }
    ],
    guruProfile: {
      name: "Srinivasa Reddy",
      role: "Yoga Guru",
      experience: "Seven Years of Dedicated Practice & Learning",
      bioParagraph1: "He has devoted seven years to dedicated Yoga practice and learning, with a particular focus on the traditional practices of Ashtanga Yoga, Pranayama, Meditation, and conscious living.",
      bioParagraph2: "His journey has taken him across different parts of India, including the Himalayas, where he travelled to explore, learn, practice, and deepen his understanding of Yoga, meditation, nature, and the inner journey.",
      bioParagraph3: "For Srinivasa, Yoga is not merely a practice of physical postures. It is a holistic way of life that develops discipline, clarity, health, awareness, compassion, balance, and self-realisation.",
      journeyTitle: "Yoga Journey & Spiritual Exploration",
      journeyDescription: "Srinivasa’s Yoga journey has been shaped by years of sincere practice, study, travel, and direct experience. Over seven years of practice across India and the Himalayan regions, his experience has strengthened his belief that true Yoga is an inward journey—a process of discovering the deeper potential within every human being.",
      lineageInspirations: [
        {
          name: "Tirumalai Krishnamacharya",
          tradition: "Pranayama tradition"
        },
        {
          name: "K. Pattabhi Jois",
          tradition: "Ashtanga Yoga tradition"
        },
        {
          name: "Sharath R. Jois",
          tradition: "Ashtanga Yoga"
        }
      ],
      images: {
        centreImage: "/assets/aistudio/sharath-yoga-centre.jpg_3533f600.jpeg",
        centreCaption: "Srinivasa Reddy at Sharath Yoga Centre, Mysuru",
        lineageImage: "/assets/aistudio/lineage-respect.jpg_ac055bdc.jpeg",
        lineageCaption: "Direct Transmission & Guru Pranam with Paramaguru Sharath R. Jois"
      }
    }
  },
  projects: [
    {
      id: "project-rural-school-yoga",
      title: "Yoga & Mindful Nutrition for Rural Schools",
      category: "Education & Child Health",
      description: "Bringing classical Surya Namaskar, pranayama, and healthy morning nutrition to underprivileged rural primary schools across Karnataka.",
      longDescription: "Our flagship educational outreach initiative conducts daily morning yoga sessions in 14 rural village schools. Certified teachers teach breathing techniques, posture alignment, and concentration exercises to over 1,450 children, paired with wholesome organic porridge and fruit to support their learning and immunity.",
      image: projectImg,
      goalAmount: 18000,
      raisedAmount: 14250,
      beneficiariesCount: "1,450+ Students",
      status: "Active",
      location: "Chamrajnagar & Mysuru Rural Districts"
    },
    {
      id: "project-vedic-manuscript",
      title: "Vedic Chanting & Palm Leaf Manuscript Preservation",
      category: "Cultural Heritage",
      description: "Digitizing ancient palm-leaf treatises on Yoga Chikitsa, pranayama, and Vedanta, while running free youth chanting workshops.",
      longDescription: "Working with traditional scholars and archivists, we have digitized over 85 rare palm-leaf manuscripts and Sanskrit commentaries. The project also sponsors traditional recitation training so that the acoustic resonance and meter of Vedic chanting remain a living oral art.",
      image: resourcesImg,
      goalAmount: 12000,
      raisedAmount: 10400,
      beneficiariesCount: "85 Manuscripts / 240 Chanting Students",
      status: "Active",
      location: "Heritage Archive, Srirangapatna"
    },
    {
      id: "project-elders-health",
      title: "Free Gentle Yoga & Health Camps for Rural Elders",
      category: "Healthcare & Elders",
      description: "Bi-weekly community clinics offering therapeutic chair yoga, joint mobility, blood pressure screening, and herbal Ayurvedic oils.",
      longDescription: "Recognizing that rural elders often lack access to restorative healthcare, our volunteer medical and yoga teams host bi-weekly wellness clinics. Over 800 elderly villagers receive gentle therapeutic movement instruction, joint pain alleviation therapy, and free Ayurvedic consultations.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      goalAmount: 9500,
      raisedAmount: 9500,
      beneficiariesCount: "820+ Elders Supported",
      status: "Completed",
      location: "Hunsur & Nanjangud Taluks"
    },
    {
      id: "project-heritage-shala",
      title: "Eco-Friendly Traditional Shala Restoration & Sanctuary",
      category: "Ashram & Environment",
      description: "Restoring our heritage practice shala using eco-limestone, rainwater harvesting, solar illumination, and a medicinal herb garden.",
      longDescription: "Preserving architectural heritage while adopting zero-carbon ecological practices. The restoration employs local artisans, utilizes breathable terracotta tiles and lime plaster, and sustains a community herbal nursery supplying local Ayurvedic remedies.",
      image: aboutImg,
      goalAmount: 25000,
      raisedAmount: 17800,
      beneficiariesCount: "Community & Global Sangha",
      status: "Active",
      location: "Heritage Shala Compound"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Elena Rostova",
      role: "Ashtanga Practitioner & Teacher",
      location: "Vienna, Austria",
      category: "Practitioner",
      quote: "Practicing at AYS Yoga Foundation transformed not just my asana, but how I breathe through life's trials. The devotion to the traditional Mysore method, without ego or shortcuts, is profoundly rare in today's world.",
      year: "Practicing since 2018",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-2",
      author: "Shashidhar Murthy",
      role: "Headmaster, Government Primary School",
      location: "Gundlupet, Karnataka",
      category: "Seva Outreach",
      quote: "Before the foundation started their yoga and nutrition program, our student attendance was low and children struggled with attention. Today, the morning Surya Namaskar and warm meal have brought joyful vitality to our entire school.",
      year: "Partner since 2021",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-3",
      author: "David Chen",
      role: "Software Architect & Student",
      location: "San Francisco, USA",
      category: "Practitioner",
      quote: "The integration of Advaita Vedanta philosophy alongside the physical vigor of the Ashtanga Primary Series gave me the mental clarity I desperately needed. It answered the 'why' behind the practice.",
      year: "Student since 2019",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-4",
      author: "Priya Chandrashekar",
      role: "Yoga Sadhaka & Chanting Student",
      location: "Bengaluru, India",
      category: "Teacher Training",
      quote: "Learning the Patanjali Yoga Sutras in their authentic Sanskrit meter under Vidushi Meenakshi opened my heart. AYS Foundation is an oasis of true spiritual dignity and sincerity.",
      year: "Student since 2022",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ],
  donations: {
    headline: "Support Our Seva & Heritage Preservation",
    subheadline: "Every contribution directly funds rural yoga education, free community yoga and meditation camps . We practice 100% financial transparency.",
    impactBreakdown: [
      {
        percentage: 72,
        label: "Direct Community Seva",
        description: "Child nutrition, school yoga mats, free medical camps, and elder assistance."
      },
      {
        percentage: 18,
        label: "Heritage & Teaching Scholarships",
        description: "Manuscript preservation, traditional teacher stipends, and full student scholarships."
      },
      {
        percentage: 10,
        label: "Operations & Transparency",
        description: "Auditing, legal compliance, water harvesting maintenance, and facility care."
      }
    ],
    presetAmounts: [500, 1000, 2500, 5000, 10000],
    bankDetails: {
      accountName: "Ashtanga Yoga Samarpana Charitable Trust",
      bankName: "HDFC Bank (Pavagada Branch)",
      accountNumber: "50200117951130",
      ifscSwiftCode: "HDFC0008217",
      upiId: "9742734499@hdfc",
      qrCodeImage: "/assets/aistudio/image_dbfd4481.png"
    }
  },
  bankDetails: {
    accountName: "Ashtanga Yoga Samarpana Charitable Trust",
    bankName: "HDFC Bank (Pavagada Branch)",
    accountNumber: "50200117951130",
    ifscCode: "HDFC0008217",
    upiId: "9742734499@hdfc",
    section80GReg: "AALTA9453AF20261",
    panNumber: "AALTA9453A",
    qrCodeImage: "/assets/aistudio/image_dbfd4481.png",
    donationFormspreeEndpoint: "https://formspree.io/f/mnppnjqe"
  },
  ashtangaResources: {
    title: "Ashtanga Yoga & Vedanta Sacred Resources",
    introduction: "Classical study materials, Sanskrit mantras, transliterations, and philosophical foundations for earnest practitioners and teachers.",
    image: resourcesImg,
    openingMantra: {
      title: "Ashtanga Yoga Opening Mantra",
      sanskrit: "ॐ वन्दे गुरूणां चरणारविन्दे संदर्शितस्वात्मसुखावहबोधे ।\nनिःश्रेयसे जाङ्गलिकायमाने संसारहालाहलमोहशान्त्यै ॥\nआबाहुपुरुषाकारं शङ्खचक्रासिधारिणम् ।\nसहस्रशिरसं श्वेतं प्रणमामि पतञ्जलिम् ॥ ॐ",
      transliteration: "Om\nVande Gurūṇāṁ caraṇāravinde\nSandarśita-svātma-sukhāva-bodhe\nNiḥ-śreyase jāṅgalikāyamāne\nSaṁsāra-hālāhala-moha-śāntyai\n\nĀbāhu-puruṣākāraṁ\nŚaṅkha-cakrāsi-dhāriṇam\nSahasra-śirasaṁ śvetaṁ\nPraṇamāmi Patañjalim\nOm",
      translation: "I bow to the lotus feet of the supreme Gurus, who uncover the knowledge of the bliss of our true Self. They act as the jungle physician, capable of pacifying the poisonous delusion of repetitive worldly illusion.\n\nTo Patanjali, an incarnation of Adisesha, white in color with a thousand radiant heads, who holds the conch (divine sound), discus (wheel of time), and sword of discrimination—I offer my reverent salutations.",
      audioNote: "Chanted traditionally before commencing the Ashtanga practice."
    },
    closingMantra: {
      title: "Mangala Mantra (Closing Peace Invocation)",
      sanskrit: "ॐ स्वस्तिप्रजाभ्यः परिपालयन्तां न्यायेन मार्गेण महीं महीशाः ।\nगोब्राह्मणेभ्यः शुभमस्तु नित्यं लोकाः समस्ताः सुखिनो भवन्तु ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
      transliteration: "Om\nSvasti-prajābhyaḥ paripālayantāṁ\nNyāyena mārgeṇa mahīṁ mahīśāḥ\nGo-brāhmaṇebhyaḥ śubham-astu nityaṁ\nLokāḥ samastāḥ sukhino bhavantu\n\nOm Śāntiḥ Śāntiḥ Śāntiḥ",
      translation: "May all beings enjoy peace, health, and prosperity. May rulers govern the earth with justice and righteousness. May the sacred and wise ever be protected. May all realms and living beings everywhere know true happiness and liberation.\n\nOm Peace, Peace, Perfect Peace.",
      audioNote: "Chanted traditionally in seated posture at the conclusion of practice."
    },
    eightLimbs: [
      {
        limbNumber: 1,
        sanskritName: "Yama",
        englishName: "Universal Ethical Restraints",
        meaning: "The 5 moral vows toward society: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (preservation of vital energy), and Aparigraha (non-possessiveness).",
        practicalApplication: "Conducting actions with tenderness, speaking truth constructively, and freeing oneself from compulsive greed."
      },
      {
        limbNumber: 2,
        sanskritName: "Niyama",
        englishName: "Personal Observances",
        meaning: "The 5 internal disciplines: Saucha (purity of body & mind), Santosha (contentment), Tapas (ardent dedication), Svadhyaya (self-reflection & sacred study), and Ishvara Pranidhana (surrender to the Divine).",
        practicalApplication: "Maintaining morning cleanliness, accepting life's conditions without complaint, and dedicating daily practice as an offering."
      },
      {
        limbNumber: 3,
        sanskritName: "Asana",
        englishName: "Steady Meditative Posture",
        meaning: "Sthira-sukham asanam—posture that is at once steady, aligned, and comfortable. Purification of the nervous system and nadis.",
        practicalApplication: "Practicing the Mysore Ashtanga sequence with breath synchronization rather than competitive acrobatics."
      },
      {
        limbNumber: 4,
        sanskritName: "Pranayama",
        englishName: "Breath & Energy Regulation",
        meaning: "Conscious regulation of inhalation (puraka), retention (kumbhaka), and exhalation (rechaka) to refine life-force (Prana).",
        practicalApplication: "Calming the autonomic nervous system through slow, oceanic Ujjayi breathing and Nadi Shodhana."
      },
      {
        limbNumber: 5,
        sanskritName: "Pratyahara",
        englishName: "Sensory Inward Turning",
        meaning: "Withdrawing the sensory organs from external temptations, just as a tortoise draws its limbs into its shell.",
        practicalApplication: "Cultivating Drishti (internal focal points) during practice so the senses cease wandering outward."
      },
      {
        limbNumber: 6,
        sanskritName: "Dharana",
        englishName: "Single-Pointed Concentration",
        meaning: "Binding the attention to a solitary anchor—such as the navel center, heart lotus, or an auspicious mantra.",
        practicalApplication: "Fixing the mind uninterruptedly upon the rhythm of breathing during seated stillness."
      },
      {
        limbNumber: 7,
        sanskritName: "Dhyana",
        englishName: "Unbroken Meditation",
        meaning: "A continuous, uninterrupted flow of awareness toward the object of contemplation, like oil poured from one vessel into another.",
        practicalApplication: "The effortless settling of the mind into silence where subject and contemplation begin to harmonize."
      },
      {
        limbNumber: 8,
        sanskritName: "Samadhi",
        englishName: "Self-Realization & Oneness",
        meaning: "The culmination of Yoga where the illusion of separate individuality dissolves, revealing the infinite, peaceful Self.",
        practicalApplication: "Living in spontaneous peace, freedom from fear, and universal love toward all beings."
      }
    ],
    recommendedReadings: [
      {
        title: "The Yoga Sutras of Patanjali",
        author: "Maharishi Patanjali / Commentary by Swami Satchidananda",
        description: "The foundational psychological and spiritual blueprint detailing the eight limbs and mental liberation."
      },
      {
        title: "Yoga Mala",
        author: "Sri K. Pattabhi Jois",
        description: "The authoritative manual describing the philosophy, ethical foundation, and Primary Series vinyasas."
      },
      {
        title: "The Bhagavad Gita",
        author: "Sri Krishna Dvaipayana Vyasa",
        description: "The supreme dialogue on Karma Yoga (action), Bhakti Yoga (devotion), and Jnana Yoga (knowledge)."
      },
      {
        title: "Vivekachudamani (Crest-Jewel of Discrimination)",
        author: "Adi Shankaracharya",
        description: "The quintessential poetic treatise on Advaita Vedanta and the discernment between the real and unreal."
      }
    ]
  },
  galleryInstagram: [
    {
      id: "ig-1",
      caption: "Sunrise Mysore practice at the Shala. Breath, drishti, and surrendering each vinyasa. #AshtangaYoga #MysoreParampara",
      imageUrl: heroImg,
      postUrl: "https://www.instagram.com/p/ashtanga-mysore-shala",
      type: "image"
    },
    {
      id: "ig-2",
      caption: "Our weekly rural school yoga seva. Smiling faces chanting Om and learning Surya Namaskar under the banyan tree. #YogaSeva",
      imageUrl: projectImg,
      postUrl: "https://www.instagram.com/p/rural-school-yoga-seva",
      type: "image"
    },
    {
      id: "ig-3",
      caption: "Morning Sanskrit chanting of the Patanjali invocations and Upanishadic peace mantras. #VedicChanting #Vedanta",
      imageUrl: resourcesImg,
      postUrl: "https://www.instagram.com/p/vedic-chanting-preservation",
      type: "image"
    },
    {
      id: "ig-4",
      caption: "Quiet dawn inside our traditional timber shala. The sacred space awaits today's practitioners. #ShalaSanctuary",
      imageUrl: aboutImg,
      postUrl: "https://www.instagram.com/p/mysore-heritage-shala",
      type: "image"
    }
  ]
};
