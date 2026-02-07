// Report data model and default readings
// This file contains the structure, default texts, and helpers for the numerology report

// Default readings for numbers 1-9
export const NUMBER_READINGS = {
    1: {
        firstName: "The number 1 in your first name indicates strong leadership qualities and independence. You are a self-starter with original ideas and the determination to achieve your goals. This energy brings confidence and the ability to pioneer new paths.",
        fullName: "With 1 as your expression number, you are meant to lead and inspire others. Your life purpose involves developing individuality and standing on your own two feet. You have the potential to be a trailblazer in your chosen field."
    },
    2: {
        firstName: "The number 2 in your first name shows you are diplomatic, intuitive, and cooperative. You excel in partnerships and have a natural gift for bringing harmony to relationships. Your sensitivity allows you to understand others deeply.",
        fullName: "Expression 2 indicates your life path involves cooperation, balance, and peacemaking. You serve as a mediator and work best in collaborative environments. Your gentle strength lies in your ability to unite opposing forces."
    },
    3: {
        firstName: "The number 3 bestows creativity, self-expression, and joy. You have natural artistic talents and the gift of communication. Your optimistic nature and enthusiasm inspire those around you.",
        fullName: "With 3 as your expression, you are here to create and communicate. Whether through art, writing, speaking, or performing, your purpose involves bringing joy and beauty to the world through creative expression."
    },
    4: {
        firstName: "The number 4 in your first name brings stability, practicality, and strong work ethic. You are reliable, organized, and build lasting foundations. Your systematic approach ensures steady progress toward goals.",
        fullName: "Expression 4 means you are here to build something lasting. You bring order to chaos and have the patience to see long-term projects through. Your life purpose involves creating security and structure for yourself and others."
    },
    5: {
        firstName: "The number 5 brings freedom, versatility, and dynamic change. You are adventurous, adaptable, and thrive on variety. Your quick mind and curiosity lead you to diverse experiences.",
        fullName: "With 5 as your expression, your purpose involves embracing change and helping others adapt. You are a catalyst for progress, bringing fresh perspectives and the courage to break free from limitations."
    },
    6: {
        firstName: "The number 6 in your first name indicates responsibility, love, and nurturing qualities. You have a strong sense of duty to family and community. Your warmth and care create harmony in your environment.",
        fullName: "Expression 6 means you are here to serve, heal, and nurture. Your life purpose involves taking responsibility for the well-being of others while maintaining balance. You create beauty and harmony wherever you go."
    },
    7: {
        firstName: "The number 7 brings wisdom, introspection, and spiritual depth. You are analytical, intuitive, and drawn to uncovering life's deeper truths. Your contemplative nature leads to profound insights.",
        fullName: "With 7 as your expression, you are a seeker of truth and wisdom. Your life purpose involves developing spiritual understanding and sharing your insights with others. You bridge the material and spiritual worlds."
    },
    8: {
        firstName: "The number 8 brings power, abundance, and material mastery. You have natural executive ability and understand how to manifest success. Your energy is focused on achievement and recognition.",
        fullName: "Expression 8 indicates you are here to master the material world. Your purpose involves achieving success and using your power and resources to benefit others. You have the ability to create lasting prosperity."
    },
    9: {
        firstName: "The number 9 in your first name shows compassion, wisdom, and humanitarian ideals. You are generous, understanding, and see the bigger picture. Your heart embraces all of humanity.",
        fullName: "With 9 as your expression, you are here to serve humanity and complete important cycles. Your life purpose involves selfless giving, artistic expression, and inspiring others through your wisdom and compassion."
    }
};

// Behavioral changes text
export const BEHAVIORAL_CHANGES = [
    "Enhanced confidence and clarity in decision-making",
    "Improved relationships and communication with loved ones",
    "Greater alignment with your life's purpose",
    "Increased opportunities and synchronicities",
    "Better financial flow and abundance",
    "Stronger intuition and inner guidance",
    "More harmonious energy in daily interactions"
];

// Instructions template
export const WRITING_INSTRUCTIONS = {
    color: "Blue or Green ink pen",
    times: "5 times daily",
    duration: "21 to 180 days",
    method: "Write your new name spelling clearly and with intention, focusing on the positive vibrations you wish to attract."
};

// Disclaimer text
export const DISCLAIMER = `This numerology report is provided for guidance and self-reflection purposes only. The recommendations and insights shared are based on ancient numerological principles and are meant to complement, not replace, your own judgment and decision-making.

Nirrvana Citrin and the practitioner make no guarantees regarding specific outcomes. Your free will and choices ultimately shape your destiny. Use this information as a tool for self-discovery and personal growth.`;

// Lucky attributes by Life Path number
export const LUCKY_ATTRIBUTES = {
    1: {
        colors: "Gold, Yellow, Orange",
        numbers: "1, 10, 19, 28",
        planet: "Sun",
        crystals: "Ruby, Garnet, Tiger Eye"
    },
    2: {
        colors: "White, Cream, Light Green",
        numbers: "2, 11, 20, 29",
        planet: "Moon",
        crystals: "Pearl, Moonstone, Jade"
    },
    3: {
        colors: "Yellow, Purple, Mauve",
        numbers: "3, 12, 21, 30",
        planet: "Jupiter",
        crystals: "Amethyst, Yellow Sapphire, Citrine"
    },
    4: {
        colors: "Blue, Grey, Khaki",
        numbers: "4, 13, 22, 31",
        planet: "Rahu (North Node)",
        crystals: "Hessonite, Blue Sapphire, Lapis Lazuli"
    },
    5: {
        colors: "Green, Light Grey, White",
        numbers: "5, 14, 23",
        planet: "Mercury",
        crystals: "Emerald, Green Tourmaline, Peridot"
    },
    6: {
        colors: "Blue, Pink, Rose",
        numbers: "6, 15, 24",
        planet: "Venus",
        crystals: "Diamond, Opal, Rose Quartz"
    },
    7: {
        colors: "White, Light Yellow, Light Green",
        numbers: "7, 16, 25",
        planet: "Ketu (South Node)",
        crystals: "Cat's Eye, Moonstone, Clear Quartz"
    },
    8: {
        colors: "Black, Dark Blue, Purple",
        numbers: "8, 17, 26",
        planet: "Saturn",
        crystals: "Blue Sapphire, Amethyst, Black Onyx"
    },
    9: {
        colors: "Red, Pink, Coral",
        numbers: "9, 18, 27",
        planet: "Mars",
        crystals: "Red Coral, Bloodstone, Ruby"
    }
};

// Default report state
export const getDefaultReportData = () => ({
    // Client Info
    clientName: '',
    birthDate: '',

    // Lucky Attributes (auto-filled based on Life Path, but editable)
    luckyColors: '',
    luckyNumbers: '',
    rulingPlanet: '',
    recommendedCrystals: '',

    // Birth Core Numbers (Old/Current Name)
    oldNameFull: '',
    oldBD: '',
    oldLP: '',
    oldFirstName: '',
    oldExpression: '',
    oldSoulUrge: '',
    oldSecretSelf: '',
    oldFirstNameTotal: '',
    oldExpressionTotal: '',

    // Suggested Core Numbers (New Name)
    newNameFull: '',
    newBD: '',
    newLP: '',
    newFirstName: '',
    newExpression: '',
    newSoulUrge: '',
    newSecretSelf: '',
    newFirstNameTotal: '',
    newExpressionTotal: '',

    // Ratings
    oldFirstNameRating: 'Average',
    oldFullNameRating: 'Average',
    newFirstNameRating: 'Excellent',
    newFullNameRating: 'Excellent',

    // Readings (auto-generated but editable)
    oldFirstNameReading: '',
    oldFullNameReading: '',
    newFirstNameReading: '',
    newFullNameReading: '',

    // Instructions
    writingColor: WRITING_INSTRUCTIONS.color,
    writingTimes: WRITING_INSTRUCTIONS.times,
    writingDuration: WRITING_INSTRUCTIONS.duration,
    writingMethod: WRITING_INSTRUCTIONS.method,

    // Additional
    practitionerNotes: '',
    year: new Date().getFullYear().toString(),

    // KUA
    gender: '',
    kuaNumber: ''
});

// Rating options
export const RATING_OPTIONS = [
    'Poor',
    'Below Average',
    'Average',
    'Good',
    'Very Good',
    'Excellent',
    'Outstanding'
];
