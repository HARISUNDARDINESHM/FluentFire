import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs, query, limit, writeBatch, doc } from 'firebase/firestore';

// -----------------------------------------------------------------------------
// DATASETS (Expanded to support ~600 questions)
// -----------------------------------------------------------------------------

// Adjectives: [Word, Synonym, Antonym]
// Goal: 150 items -> 150 Synonyms + 150 Antonyms = 300 Vocabulary Questions
const adjectives = [
    ['Happy', 'Joyful', 'Sad'], ['Big', 'Huge', 'Small'], ['Fast', 'Rapid', 'Slow'], ['Beautiful', 'Gorgeous', 'Ugly'],
    ['Smart', 'Intelligent', 'Stupid'], ['Rich', 'Wealthy', 'Poor'], ['Hard', 'Difficult', 'Easy'], ['Funny', 'Humorous', 'Serious'],
    ['Angry', 'Furious', 'Calm'], ['Tired', 'Exhausted', 'Energetic'], ['Brave', 'Courageous', 'Cowardly'], ['Calm', 'Peaceful', 'Chaotic'],
    ['Eager', 'Keen', 'Indifferent'], ['Faithful', 'Loyal', 'Disloyal'], ['Gentle', 'Tender', 'Rough'], ['Kind', 'Benevolent', 'Cruel'],
    ['Lively', 'Vibrant', 'Dull'], ['Nice', 'Pleasant', 'Unpleasant'], ['Obedient', 'Compliant', 'Rebellious'], ['Proud', 'Arrogant', 'Humble'],
    ['Strong', 'Powerful', 'Weak'], ['Victorious', 'Successful', 'Failing'], ['Witty', 'Clever', 'Dull'], ['Young', 'Juvenile', 'Old'],
    ['Zealous', 'Passionate', 'Apathetic'], ['Ancient', 'Antique', 'Modern'], ['Brief', 'Concise', 'Long'], ['Clean', 'Spotless', 'Dirty'],
    ['Clumsy', 'Awkward', 'Graceful'], ['Drab', 'Dull', 'Bright'], ['Famous', 'Renowned', 'Unknown'], ['Fierce', 'Ferocious', 'Gentle'],
    ['Gifted', 'Talented', 'Inept'], ['Glorious', 'Magnificent', 'Terrible'], ['Grumpy', 'Irritable', 'Cheerful'], ['Handsome', 'Good-looking', 'Ugly'],
    ['Helpful', 'Useful', 'Useless'], ['Hungry', 'Starving', 'Full'], ['Important', 'Significant', 'Trivial'], ['Innocent', 'Guiltless', 'Guilty'],
    ['Itchy', 'Irritating', 'Soothing'], ['Jealous', 'Envious', 'Content'], ['Jolly', 'Merry', 'Miserable'], ['Lazy', 'Sluggish', 'Active'],
    ['Lucky', 'Fortunate', 'Unlucky'], ['Mysterious', 'Enigmatic', 'Obvious'], ['Nasty', 'Unpleasant', 'Nice'], ['Nervous', 'Anxious', 'Confident'],
    ['Noisy', 'Loud', 'Quiet'], ['Odd', 'Strange', 'Normal'], ['Panicky', 'Alarmed', 'Calm'], ['Perfect', 'Flawless', 'Imperfect'],
    ['Plain', 'Simple', 'Fancy'], ['Polite', 'Courteous', 'Rude'], ['Poor', 'Destitute', 'Rich'], ['Powerful', 'Mighty', 'Weak'],
    ['Prickly', 'Thorny', 'Smooth'], ['Putrid', 'Rotten', 'Fresh'], ['Puzzled', 'Confused', 'Clear'], ['Real', 'Genuine', 'Fake'],
    ['Relieved', 'Comforted', 'Worried'], ['Repulsive', 'Disgusting', 'Attractive'], ['Scary', 'Frightening', 'Comforting'],
    ['Selfish', 'Egocentric', 'Generous'], ['Shiny', 'Glossy', 'Dull'], ['Shy', 'Bashful', 'Bold'], ['Silly', 'Foolish', 'Wise'],
    ['Sleepy', 'Drowsy', 'Awake'], ['Smiling', 'Grinning', 'Frowning'], ['Sore', 'Painful', 'Painless'], ['Sparkling', 'Glistening', 'Dull'],
    ['Splendid', 'Magnificent', 'Poor'], ['Stormy', 'Turbulent', 'Calm'], ['Strange', 'Odd', 'Normal'], ['Stupid', 'Dumb', 'Smart'],
    ['Successful', 'Triumphant', 'Failed'], ['Super', 'Excellent', 'Bad'], ['Talented', 'Gifted', 'Unskilled'], ['Tame', 'Domesticated', 'Wild'],
    ['Tasty', 'Delicious', 'Disgusting'], ['Terrible', 'Awful', 'Wonderful'], ['Thankful', 'Grateful', 'Ungrateful'], ['Thoughtful', 'Considerate', 'Thoughtless'],
    ['Thoughtless', 'Inconsiderate', 'Thoughtful'], ['Tight', 'Constricted', 'Loose'], ['Tiny', 'Miniature', 'Huge'], ['Troubled', 'Distrubed', 'Calm'],
    ['Ugly', 'Unattractive', 'Beautiful'], ['Uninterested', 'Bored', 'Interested'], ['Unsightly', 'Ugly', 'Attractive'], ['Unusual', 'Rare', 'Common'],
    ['Upset', 'Distressed', 'Happy'], ['Uptight', 'Tense', 'Relaxed'], ['Vast', 'Enormous', 'Tiny'], ['Victorious', 'Winning', 'Losing'],
    ['Vivacious', 'Lively', 'Dull'], ['Wandering', 'Roaming', 'Stationary'], ['Weary', 'Tired', 'Energetic'], ['Wicked', 'Evil', 'Good'],
    ['Wide', 'Broad', 'Narrow'], ['Wild', 'Untamed', 'Tame'], ['Worried', 'Anxious', 'Calm'], ['Wrong', 'Incorrect', 'Right'],
    ['Zany', 'Crazy', 'Serious'], ['Zealous', 'Enthusiastic', 'Apathetic'], ['Afraid', 'Scared', 'Brave'], ['Agreeable', 'Pleasant', 'Disagreeable'],
    ['Ambitious', 'Driven', 'Lazy'], ['Amused', 'Entertained', 'Bored'], ['Annoyed', 'Irritated', 'Pleased'], ['Ashamed', 'Embarrassed', 'Proud'],
    ['Awful', 'Terrible', 'Excellent'], ['Bad', 'Poor', 'Good'], ['Better', 'Superior', 'Worse'], ['Black', 'Dark', 'White'],
    ['Blue', 'Sad', 'Happy'], ['Blushing', 'Rosy', 'Pale'], ['Bored', 'Uninterested', 'Excited'], ['Brainy', 'Smart', 'Stupid'],
    ['Brave', 'Heroic', 'Cowardly'], ['Breakable', 'Fragile', 'Unbreakable'], ['Busy', 'Occupied', 'Idle'], ['Careful', 'Cautious', 'Careless'],
    ['Cautious', 'Careful', 'Reckless'], ['Charming', 'Delightful', 'Obnoxious'], ['Cheerful', 'Happy', 'Sad'],
    ['Clear', 'Transparent', 'Opaque'], ['Cloudy', 'Overcast', 'Sunny'], ['Colorful', 'Vibrant', 'Colorless'], ['Comfortable', 'Cozy', 'Uncomfortable'],
    ['Concerned', 'Worried', 'Unconcerned'], ['Condemned', 'Doomed', 'Saved'], ['Confused', 'Puzzled', 'Clear'], ['Cooperative', 'Helpful', 'Uncooperative']
    // Total ~120 adjectives * 2 = 240 questions
];

// Verbs: [Base, Past, Continuous]
// Goal: 100 items -> 100 Past + 100 Continuous = 200 Grammar Questions
const verbs = [
    ['Run', 'Ran', 'Running'], ['Eat', 'Ate', 'Eating'], ['Sleep', 'Slept', 'Sleeping'], ['Go', 'Went', 'Going'],
    ['Buy', 'Bought', 'Buying'], ['Think', 'Thought', 'Thinking'], ['Catch', 'Caught', 'Catching'], ['Teach', 'Taught', 'Teaching'],
    ['Bring', 'Brought', 'Bringing'], ['Drive', 'Drove', 'Driving'], ['Break', 'Broke', 'Breaking'], ['Choose', 'Chose', 'Choosing'],
    ['Come', 'Came', 'Coming'], ['Do', 'Did', 'Doing'], ['Drink', 'Drank', 'Drinking'], ['Fall', 'Fell', 'Falling'],
    ['Fly', 'Flew', 'Flying'], ['Forget', 'Forgot', 'Forgetting'], ['Give', 'Gave', 'Giving'], ['Know', 'Knew', 'Knowing'],
    ['Make', 'Made', 'Making'], ['Pay', 'Paid', 'Paying'], ['Ride', 'Rode', 'Riding'], ['Rise', 'Rose', 'Rising'],
    ['See', 'Saw', 'Seeing'], ['Sing', 'Sang', 'Singing'], ['Speak', 'Spoke', 'Speaking'], ['Swim', 'Swam', 'Swimming'],
    ['Take', 'Took', 'Taking'], ['Write', 'Wrote', 'Writing'], ['Begin', 'Began', 'Beginning'], ['Bite', 'Bit', 'Biting'],
    ['Blow', 'Blew', 'Blowing'], ['Build', 'Built', 'Building'], ['Burn', 'Burnt', 'Burning'], ['Cost', 'Cost', 'Costing'],
    ['Cut', 'Cut', 'Cutting'], ['Dig', 'Dug', 'Digging'], ['Draw', 'Drew', 'Drawing'], ['Dream', 'Dreamt', 'Dreaming'],
    ['Feel', 'Felt', 'Feeling'], ['Fight', 'Fought', 'Fighting'], ['Find', 'Found', 'Finding'], ['Freeze', 'Froze', 'Freezing'],
    ['Get', 'Got', 'Getting'], ['Grow', 'Grew', 'Growing'], ['Hang', 'Hung', 'Hanging'], ['Hear', 'Heard', 'Hearing'],
    ['Hide', 'Hid', 'Hiding'], ['Hit', 'Hit', 'Hitting'], ['Hold', 'Held', 'Holding'], ['Hurt', 'Hurt', 'Hurting'],
    ['Keep', 'Kept', 'Keeping'], ['Lead', 'Led', 'Leading'], ['Leave', 'Left', 'Leaving'], ['Lend', 'Lent', 'Lending'],
    ['Let', 'Let', 'Letting'], ['Lie', 'Lay', 'Lying'], ['Light', 'Lit', 'Lighting'], ['Lose', 'Lost', 'Losing'],
    ['Mean', 'Meant', 'Meaning'], ['Meet', 'Met', 'Meeting'], ['Put', 'Put', 'Putting'], ['Quit', 'Quit', 'Quitting'],
    ['Read', 'Read', 'Reading'], ['Ring', 'Rang', 'Ringing'], ['Say', 'Said', 'Saying'], ['Sell', 'Sold', 'Selling'],
    ['Send', 'Sent', 'Sending'], ['Shake', 'Shook', 'Shaking'], ['Shine', 'Shone', 'Shining'], ['Shoot', 'Shot', 'Shooting'],
    ['Shut', 'Shut', 'Shutting'], ['Sit', 'Sat', 'Sitting'], ['Spend', 'Spent', 'Spending'], ['Stand', 'Stood', 'Standing'],
    ['Steal', 'Stole', 'Stealing'], ['Stick', 'Stuck', 'Sticking'], ['Strike', 'Struck', 'Striking'], ['Swear', 'Swore', 'Swearing'],
    ['Sweep', 'Swept', 'Sweeping'], ['Swing', 'Swung', 'Swinging'], ['Tear', 'Tore', 'Tearing'], ['Tell', 'Told', 'Telling'],
    ['Throw', 'Threw', 'Throwing'], ['Understand', 'Understood', 'Understanding'], ['Wake', 'Woke', 'Waking'], ['Wear', 'Wore', 'Wearing'],
    ['Win', 'Won', 'Winning'], ['Withdraw', 'Withdrew', 'Withdrawing'], ['Become', 'Became', 'Becoming'], ['Bend', 'Bent', 'Bending'],
    ['Bet', 'Bet', 'Betting'], ['Bind', 'Bound', 'Binding'], ['Bleed', 'Bled', 'Bleeding'], ['Breed', 'Bred', 'Breeding'],
    ['Broadcast', 'Broadcast', 'Broadcasting'], ['Burst', 'Burst', 'Bursting'], ['Cast', 'Cast', 'Casting'], ['Cling', 'Clung', 'Clinging']
    // ~100 Verbs * 2 = 200 Questions
];

// Nouns: [Singular, Plural]
// Goal: 100 items -> 100 Grammar Questions
const nouns = [
    ['Dog', 'Dogs'], ['Cat', 'Cats'], ['Bus', 'Buses'], ['Box', 'Boxes'], ['Lady', 'Ladies'],
    ['Man', 'Men'], ['Woman', 'Women'], ['Child', 'Children'], ['Tooth', 'Teeth'], ['Foot', 'Feet'],
    ['Mouse', 'Mice'], ['Leaf', 'Leaves'], ['Wolf', 'Wolves'], ['Knife', 'Knives'], ['City', 'Cities'],
    ['Baby', 'Babies'], ['Toy', 'Toys'], ['Key', 'Keys'], ['Monkey', 'Monkeys'], ['Day', 'Days'],
    ['Person', 'People'], ['Life', 'Lives'], ['Tomato', 'Tomatoes'], ['Potato', 'Potatoes'], ['Hero', 'Heroes'],
    ['Echo', 'Echoes'], ['Shelf', 'Shelves'], ['Thief', 'Thieves'], ['Wife', 'Wives'], ['Half', 'Halves'],
    ['Focus', 'Foci'], ['Cactus', 'Cacti'], ['Fungus', 'Fungi'], ['Nucleus', 'Nuclei'], ['Syllabus', 'Syllabi'],
    ['Analysis', 'Analyses'], ['Diagnosis', 'Diagnoses'], ['Oasis', 'Oases'], ['Thesis', 'Theses'], ['Crisis', 'Crises'],
    ['Phenomenon', 'Phenomena'], ['Criterion', 'Criteria'], ['Datum', 'Data'], ['Bacterium', 'Bacteria'], ['Curriculum', 'Curricula'],
    ['Goose', 'Geese'], ['Sheep', 'Sheep'], ['Fish', 'Fish'], ['Deer', 'Deer'], ['Species', 'Species'],
    ['Aircraft', 'Aircraft'], ['Series', 'Series'], ['Offspring', 'Offspring'], ['Salmon', 'Salmon'], ['Trout', 'Trout'],
    ['Mousse', 'Mousses'], ['House', 'Houses'], ['Computer', 'Computers'], ['Phone', 'Phones'], ['Table', 'Tables'],
    ['Chair', 'Chairs'], ['Book', 'Books'], ['Pen', 'Pens'], ['Pencil', 'Pencils'], ['Cup', 'Cups'],
    ['Bottle', 'Bottles'], ['Plate', 'Plates'], ['Spoon', 'Spoons'], ['Fork', 'Forks'], ['Window', 'Windows'],
    ['Door', 'Doors'], ['Car', 'Cars'], ['Truck', 'Trucks'], ['Bike', 'Bikes'], ['Train', 'Trains'],
    ['Plane', 'Planes'], ['Boat', 'Boats'], ['Ship', 'Ships'], ['School', 'Schools'], ['Teacher', 'Teachers'],
    ['Student', 'Students'], ['Doctor', 'Doctors'], ['Nurse', 'Nurses'], ['King', 'Kings'], ['Queen', 'Queens'],
    ['Prince', 'Princes'], ['Princess', 'Princesses'], ['Actor', 'Actors'], ['Artist', 'Artists'], ['Driver', 'Drivers'],
    ['Worker', 'Workers'], ['Player', 'Players'], ['Singer', 'Singers'], ['Dancer', 'Dancers'], ['Writer', 'Writers']
    // ~95 Nouns * 1 = 95 Questions
];

const generateQuestions = () => {
    let questions = [];

    // --------------------------------------------------------
    // TOTAL TARGET: ~600 Questions
    // --------------------------------------------------------

    // --- VOCABULARY SECTION (~300 Qs) ---

    // 1. Synonyms (Adjectives) - ~120 questions
    adjectives.forEach(([word, synonym, antonym]) => {
        questions.push({
            type: 'vocabulary',
            difficulty: 'easy',
            question: `Which word is a synonym for "${word}"?`,
            options: [synonym, antonym, 'Blue', 'Slow', 'Sad', 'Cold'].sort(() => 0.5 - Math.random()).slice(0, 4),
            correctAnswer: synonym,
            explanation: `"${synonym}" means almost the same as "${word}".`
        });
    });

    // 2. Antonyms (Adjectives) - ~120 questions
    adjectives.forEach(([word, synonym, antonym]) => {
        questions.push({
            type: 'vocabulary',
            difficulty: 'medium',
            question: `Which word is an antonym (opposite) for "${word}"?`,
            options: [synonym, antonym, 'Loud', 'Hot', 'Bright', 'Old'].sort(() => 0.5 - Math.random()).slice(0, 4),
            correctAnswer: antonym,
            explanation: `"${antonym}" is the opposite of "${word}".`
        });
    });

    // 3. Definitions/Context (Manual Mix) - ~60 questions (Simulated by repeating hard adjs)
    const hardAdjs = adjectives.slice(50, 110);
    hardAdjs.forEach(([word, syn, ant]) => {
        questions.push({
            type: 'vocabulary',
            difficulty: 'hard',
            question: `What is the meaning of "${word}"?`,
            options: [`Similar to ${syn}`, `Opposite of ${syn}`, `Related to food`, `A type of animal`].sort(() => 0.5 - Math.random()),
            correctAnswer: `Similar to ${syn}`,
            explanation: `"${word}" means ${syn}.`
        });
    });

    // --- GRAMMAR SECTION (~300 Qs) ---

    // 4. Past Tense (Verbs) - ~100 questions
    verbs.forEach(([base, past, continuous]) => {
        questions.push({
            type: 'grammar',
            difficulty: 'easy',
            question: `What is the past tense of "${base}"?`,
            options: [past, continuous, base + 'ed', base + 's'].sort(() => 0.5 - Math.random()),
            correctAnswer: past,
            explanation: `The past tense of "${base}" is "${past}".`
        });
    });

    // 5. Present Continuous (Verbs) - ~100 questions
    verbs.forEach(([base, past, continuous]) => {
        questions.push({
            type: 'grammar',
            difficulty: 'medium',
            question: `Complete the sentence: "They are _____ right now." (${base})`,
            options: [continuous, past, base, base + 's'].sort(() => 0.5 - Math.random()),
            correctAnswer: continuous,
            explanation: `Present continuous uses "are" + verb-ing ("${continuous}").`
        });
    });

    // 6. Plurals (Nouns) - ~95 questions
    nouns.forEach(([sing, plur]) => {
        questions.push({
            type: 'grammar',
            difficulty: 'easy',
            question: `What is the plural of "${sing}"?`,
            options: [plur, sing + 's', sing + 'es', sing + 'ies'].filter((v, i, self) => self.indexOf(v) === i).sort(() => 0.5 - Math.random()).slice(0, 4),
            correctAnswer: plur,
            explanation: `The plural of "${sing}" is "${plur}".`
        });
    });

    return questions;
};

export const seedQuestions = async () => {
    // Check count
    const snapshotAll = await getDocs(collection(db, "questions"));
    const currentCount = snapshotAll.size;

    if (currentCount < 500) { // Update threshold to ensure we seed to 600
        console.log(`Current count ${currentCount}. Seeding invalid/low amount to reaching ~600...`);
        const questions = generateQuestions();

        // Batch write (limited to 500 per batch)
        // We have ~600 questions, so we need chunks.
        const chunkSize = 400;
        for (let i = 0; i < questions.length; i += chunkSize) {
            const chunk = questions.slice(i, i + chunkSize);
            const batch = writeBatch(db);
            chunk.forEach((q) => {
                const docRef = doc(collection(db, "questions"));
                batch.set(docRef, q);
            });
            await batch.commit();
            console.log(`Seeded batch ${i / chunkSize + 1}`);
        }

        console.log(`Seeded total ${questions.length} questions!`);
    } else {
        console.log(`Questions already exist (${currentCount}), skipping seed.`);
    }
};
