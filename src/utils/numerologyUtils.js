// Chaldean Letter Values (constant - moved outside component)
export const CHALDEAN_LETTER_VALUES = {
    "A": 1, "I": 1, "J": 1, "Q": 1, "Y": 1,
    "B": 2, "K": 2, "R": 2,
    "C": 3, "G": 3, "L": 3, "S": 3,
    "D": 4, "M": 4, "T": 4,
    "E": 5, "H": 5, "N": 5, "X": 5,
    "U": 6, "V": 6, "W": 6,
    "O": 7, "Z": 7,
    "F": 8, "P": 8
};

// Number Meanings for tooltips/descriptions
export const NUMBER_MEANINGS = {
    1: {
        title: "The Leader",
        description: "Independence, individuality, new beginnings, ambition, and pioneering spirit.",
        keywords: ["Leadership", "Originality", "Independence"]
    },
    2: {
        title: "The Peacemaker",
        description: "Partnership, diplomacy, balance, cooperation, and sensitivity.",
        keywords: ["Harmony", "Partnership", "Intuition"]
    },
    3: {
        title: "The Creative",
        description: "Self-expression, creativity, communication, joy, and artistic talent.",
        keywords: ["Expression", "Creativity", "Joy"]
    },
    4: {
        title: "The Builder",
        description: "Stability, hard work, practicality, organization, and determination.",
        keywords: ["Foundation", "Discipline", "Order"]
    },
    5: {
        title: "The Freedom Seeker",
        description: "Change, freedom, adventure, versatility, and dynamic energy.",
        keywords: ["Adventure", "Change", "Freedom"]
    },
    6: {
        title: "The Nurturer",
        description: "Responsibility, love, harmony, family, and domestic affairs.",
        keywords: ["Love", "Responsibility", "Care"]
    },
    7: {
        title: "The Seeker",
        description: "Spirituality, wisdom, introspection, analysis, and inner knowledge.",
        keywords: ["Wisdom", "Spirituality", "Analysis"]
    },
    8: {
        title: "The Powerhouse",
        description: "Abundance, power, success, material achievement, and authority.",
        keywords: ["Success", "Abundance", "Authority"]
    },
    9: {
        title: "The Humanitarian",
        description: "Completion, wisdom, humanitarianism, selflessness, and universal love.",
        keywords: ["Compassion", "Wisdom", "Completion"]
    }
};

/**
 * Reduces a number to a single digit (1-9)
 * Keeps reducing until < 10
 */
export const reduceToSingleDigit = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return 0;

    while (num > 9) {
        num = num.toString().split('').reduce((acc, curr) => acc + Number(curr), 0);
    }
    return num;
};

/**
 * Calculates the sum of digits in a string
 */
export const sumDigits = (str) => {
    if (!str) return 0;
    return str.toString().split('').reduce((acc, curr) => {
        const num = Number(curr);
        return acc + (isNaN(num) ? 0 : num);
    }, 0);
};

/**
 * Calculate Birth Date Number
 */
export const calculateBirthDate = (date) => {
    const sum = sumDigits(date);
    return reduceToSingleDigit(sum);
};

/**
 * Calculate Life Path Number
 */
export const calculateLifePath = (date, month, year) => {
    const sum = sumDigits(date) + sumDigits(month) + sumDigits(year);
    return reduceToSingleDigit(sum);
};

/**
 * Calculate KUA Number
 */
export const calculateKua = (year, gender) => {
    if (!year || !gender) return null;

    const yearSum = sumDigits(year);
    const reducedYear = reduceToSingleDigit(yearSum);

    let kua;
    if (gender === 'male') {
        kua = 11 - reducedYear;
        // Handle edge case where result might be > 9
        if (kua > 9) kua = reduceToSingleDigit(kua);
        // Special case: if result is 5, male becomes 2
        if (kua === 5) kua = 2;
    } else if (gender === 'female') {
        kua = 4 + reducedYear;
        // Handle edge case where result might be > 9
        if (kua > 9) kua = reduceToSingleDigit(kua);
        // Special case: if result is 5, female becomes 8
        if (kua === 5) kua = 8;
    }

    return kua;
};

/**
 * Calculate name-based numbers using Chaldean system
 */
export const calculateNameNumbers = (name) => {
    if (!name) {
        return { fn: 0, fnTotal: 0, su: 0, ss: 0, exp: 0, expTotal: 0 };
    }

    const trimmedName = name.trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || '';
    const vowels = ['A', 'E', 'I', 'O', 'U'];

    // First Name calculation
    const firstNameSum = firstName.split('').reduce((acc, curr) => {
        const upper = curr.toUpperCase();
        return acc + (CHALDEAN_LETTER_VALUES[upper] || 0);
    }, 0);

    // Expression (full name)
    const expressionSum = trimmedName.split('').reduce((acc, curr) => {
        const upper = curr.toUpperCase();
        return acc + (CHALDEAN_LETTER_VALUES[upper] || 0);
    }, 0);

    // Soul Urge (vowels only)
    const soulUrgeSum = trimmedName.split('').reduce((acc, curr) => {
        const upper = curr.toUpperCase();
        if (vowels.includes(upper)) {
            return acc + (CHALDEAN_LETTER_VALUES[upper] || 0);
        }
        return acc;
    }, 0);

    // Secret Self (consonants only)
    const secretSelfSum = trimmedName.split('').reduce((acc, curr) => {
        const upper = curr.toUpperCase();
        if (!vowels.includes(upper) && upper >= 'A' && upper <= 'Z') {
            return acc + (CHALDEAN_LETTER_VALUES[upper] || 0);
        }
        return acc;
    }, 0);

    return {
        fn: reduceToSingleDigit(firstNameSum),
        fnTotal: firstNameSum,
        su: reduceToSingleDigit(soulUrgeSum),
        ss: reduceToSingleDigit(secretSelfSum),
        exp: reduceToSingleDigit(expressionSum),
        expTotal: expressionSum
    };
};

/**
 * Validate date input
 */
export const validateDate = (date) => {
    const num = parseInt(date, 10);
    return !isNaN(num) && num >= 1 && num <= 31;
};

/**
 * Validate month input
 */
export const validateMonth = (month) => {
    const num = parseInt(month, 10);
    return !isNaN(num) && num >= 1 && num <= 12;
};

/**
 * Validate year input
 */
export const validateYear = (year) => {
    const num = parseInt(year, 10);
    return !isNaN(num) && num >= 1900 && num <= 2100;
};
