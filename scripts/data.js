/**
 * Wizarding World Data Store
 * Lore-accurate data for Houses, Characters, Spells, Beasts, and Sorting Hat Quiz
 */

export const HOUSES_DATA = {
  gryffindor: {
    id: "gryffindor",
    name: "Gryffindor",
    founder: "Godric Gryffindor",
    animal: "Lion",
    element: "Fire",
    colors: ["#740001", "#D3A625"],
    primaryColor: "#740001",
    accentColor: "#d3a625",
    glowColor: "rgba(211, 166, 37, 0.4)",
    motto: "Where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
    ghost: "Nearly Headless Nick",
    commonRoom: "Gryffindor Tower, behind the Portrait of the Fat Lady on the Seventh Floor.",
    commonRoomName: "Gryffindor Tower & Hearth",
    entrance: "Seventh Floor corridor, guarded by the Portrait of the Fat Lady in pink silk.",
    passwords: "Caput Draconis, Fortuna Major, Scurvy Cur, Mimbulus Mimbletonia, Baubles",
    atmosphere: "A warm, circular hall bathed in amber firelight, full of deep squashy armchairs, rich scarlet tapestries, and arched windows looking out across the Hogwarts grounds and Quidditch pitch.",
    dormitory: "Two winding spiral staircases lead to the dormitories, where four-poster beds are draped in deep crimson velvet curtains.",
    specialFeatures: "Enchanted staircase spell: If boys attempt to ascend the girls' staircase, the stone steps instantly melt into a polished stone slide.",
    traits: ["Bravery", "Chivalry", "Daring", "Courage", "Determination"],
    crestImage: "assets/images/crest-gryffindor.jpg",
    relic: "The Sword of Godric Gryffindor"
  },
  slytherin: {
    id: "slytherin",
    name: "Slytherin",
    founder: "Salazar Slytherin",
    animal: "Serpent",
    element: "Water",
    colors: ["#1a472a", "#aaaaaa"],
    primaryColor: "#1a472a",
    accentColor: "#2ecc71",
    glowColor: "rgba(46, 204, 113, 0.4)",
    motto: "Where you'll meet your real friends, those cunning folk use any means to achieve their ends.",
    ghost: "The Bloody Baron",
    commonRoom: "Slytherin Dungeon, extending beneath the Black Lake with eerie greenish light.",
    commonRoomName: "Slytherin Dungeon & Subterranean Vault",
    entrance: "A damp stone wall in the Hogwarts Dungeons, concealed behind a bare stretch of masonry.",
    passwords: "Pure-Blood (spoken clearly to the bare stone wall)",
    atmosphere: "A long, low underground room with rough stone walls, high-backed carved leather sofas, glowing greenish lamps hanging from chains, and an elaborate carved mantelpiece over a crackling hearth.",
    dormitory: "Subterranean dormitories where ancient four-poster beds feature green silk hangings, with water lapping rhythmically against the stone walls.",
    specialFeatures: "Windows look directly into the depths of the Black Lake, where students frequently watch the Giant Squid and Grindylows drift by.",
    traits: ["Ambition", "Cunning", "Resourcefulness", "Leadership", "Self-Preservation"],
    crestImage: "assets/images/crest-slytherin.jpg",
    relic: "Salazar Slytherin's Locket"
  },
  ravenclaw: {
    id: "ravenclaw",
    name: "Ravenclaw",
    founder: "Rowena Ravenclaw",
    animal: "Eagle",
    element: "Air",
    colors: ["#0e1a40", "#946b2d"],
    primaryColor: "#0e1a40",
    accentColor: "#4ea8de",
    glowColor: "rgba(78, 168, 222, 0.4)",
    motto: "Wit beyond measure is man's greatest treasure.",
    ghost: "The Grey Lady (Helena Ravenclaw)",
    commonRoom: "Ravenclaw Tower on the west side of Hogwarts, requiring answering a riddle to enter.",
    commonRoomName: "Ravenclaw Observatory & Spire",
    entrance: "Top of a tall spiral staircase in the West Tower; a smooth plank of aged wood with a bronze eagle door knocker.",
    passwords: "No fixed password; the bronze eagle speaks a philosophical riddle (e.g., 'Which came first, the phoenix or the flame?')",
    atmosphere: "An airy, circular room lined with graceful arched windows hung with blue and bronze silks, domed ceilings painted with celestial constellations, and bookcases packed with ancient tomes.",
    dormitory: "Turret rooms high in the sky with four-poster beds covered in sky-blue eiderdowns, with the whistling wind singing against the glass.",
    specialFeatures: "A life-sized statue of Rowena Ravenclaw carved in white marble stands opposite the entrance, wearing her legendary Diadem.",
    traits: ["Intelligence", "Wisdom", "Wit", "Creativity", "Curiosity"],
    crestImage: "assets/images/crest-ravenclaw.jpg",
    relic: "Rowena Ravenclaw's Diadem"
  },
  hufflepuff: {
    id: "hufflepuff",
    name: "Hufflepuff",
    founder: "Helga Hufflepuff",
    animal: "Badger",
    element: "Earth",
    colors: ["#ecb939", "#372e29"],
    primaryColor: "#ecb939",
    accentColor: "#f39c12",
    glowColor: "rgba(243, 156, 18, 0.4)",
    motto: "Where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.",
    ghost: "The Fat Friar",
    commonRoom: "Hufflepuff Basement near the Hogwarts kitchens, entered through a stack of barrels.",
    commonRoomName: "Hufflepuff Hearth & Barrel Sanctuary",
    entrance: "A nook on the right side of the kitchen corridor, hidden in a stack of large barrels.",
    passwords: "Tapping the barrel two from the bottom, in the middle of the second row, in the rhythm of 'Helga Hufflepuff'.",
    atmosphere: "A cozy, round, low-ceilinged room always suffused with warm golden sunlight, filled with yellow hanging plants, polished honey-colored wood, and copper lamps reflecting off the stone hearth.",
    dormitory: "Circular wooden tunnels lead to the sleeping quarters, fitted with warm wooden bedsteads, patchwork quilts, and copper bed-warmers.",
    specialFeatures: "Flawless security enchantment: If an intruder taps the wrong barrel or the wrong rhythm, one of the lids bursts open and drench them in vinegar.",
    traits: ["Loyalty", "Patience", "Fair Play", "Hard Work", "Kindness"],
    crestImage: "assets/images/crest-hufflepuff.jpg",
    relic: "Helga Hufflepuff's Cup"
  }
};

export const THEMES_DATA = {
  dark: {
    id: "dark",
    name: "Hogwarts Nocturne",
    subtitle: "Classic Twilight & Fireplace Glow",
    iconType: "emoji",
    icon: "🌙",
    primaryColor: "#0a0b10",
    accentColor: "#d4af37",
    glowColor: "rgba(212, 175, 55, 0.4)",
    bgPrimary: "#0a0b10",
    bgSecondary: "#12141f",
    heroImage: "assets/images/hogwarts-twilight.jpg",
    particleKey: "gold",
    isSnow: false
  },
  winter: {
    id: "winter",
    name: "Snowy Winter at Hogwarts",
    subtitle: "Frozen Lake & Falling Snow",
    iconType: "emoji",
    icon: "❄️",
    primaryColor: "#060a12",
    accentColor: "#a5d8ff",
    glowColor: "rgba(165, 216, 255, 0.55)",
    bgPrimary: "#060a12",
    bgSecondary: "#0b1222",
    heroImage: "assets/images/hogwarts-winter.jpg",
    particleKey: "winter",
    isSnow: true
  },
  sunset: {
    id: "sunset",
    name: "Golden Sunset Solstice",
    subtitle: "Amber Waters & Radiant Rays",
    iconType: "emoji",
    icon: "🌅",
    primaryColor: "#110c08",
    accentColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
    bgPrimary: "#110c08",
    bgSecondary: "#1a120b",
    heroImage: "assets/images/hogwarts-sunset.jpg",
    particleKey: "gold",
    isSnow: false
  }
};

export const CHARACTERS_DATA = [
  {
    id: "harry-potter",
    name: "Harry Potter",
    title: "The Boy Who Lived",
    house: "gryffindor",
    role: "student",
    image: "assets/images/harry-potter.jpg",
    wand: "11\" Holly, Phoenix Feather core (supple)",
    patronus: "Stag",
    boggart: "Dementor",
    bio: "The only known survivor of the Killing Curse, Harry became a symbol of hope against Lord Voldemort. Known for his exceptional defense skills, Parseltongue, and leadership of Dumbledore's Army.",
    quote: "I'll be in my bedroom, making no noise and pretending I don't exist... until adventure calls.",
    skills: ["Seeker (Quidditch)", "Defense Against Dark Arts", "Parseltongue", "Patronus Charm"],
    iconicAchievement: "Defeated Lord Voldemort at the Battle of Hogwarts (1998)"
  },
  {
    id: "hermione-granger",
    name: "Hermione Granger",
    title: "The Brightest Witch of Her Age",
    house: "gryffindor",
    role: "student",
    image: "assets/images/hermione.jpg",
    wand: "10¾\" Vine wood, Dragon Heartstring core",
    patronus: "Otter",
    boggart: "Failure / Professor McGonagall telling her she failed all exams",
    bio: "Muggle-born witch renowned for her unparalleled intellect, encyclopedia-like knowledge of magic, and fierce loyalty. Co-founder of S.P.E.W. and pivotal in destroying Voldemort's Horcruxes.",
    quote: "Books! And cleverness! There are more important things — friendship and bravery.",
    skills: ["Transfiguration", "Charms Mastery", "Arithmancy", "Ancient Runes"],
    iconicAchievement: "Brewed Polyjuice Potion at age 12; masterminded the Horcrux hunt"
  },
  {
    id: "albus-dumbledore",
    name: "Albus Percival Wulfric Brian Dumbledore",
    title: "Headmaster of Hogwarts & Supreme Mugwump",
    house: "gryffindor",
    role: "staff",
    image: "assets/images/dumbledore.jpg",
    wand: "15\" Elder wood, Thestral tail hair (The Elder Wand)",
    patronus: "Phoenix",
    boggart: "The corpse of his sister Ariana",
    bio: "Widely regarded as the greatest wizard of modern times. Defeated Gellert Grindelwald in 1945, discovered the twelve uses of dragon's blood, and founded the Order of the Phoenix.",
    quote: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    skills: ["Alchemy Mastery", "Wandless & Nonverbal Magic", "Legilimency", "Elemental Fire Magic"],
    iconicAchievement: "Wielded the Elder Wand for over 50 years; orchestrated Voldemort's downfall"
  },
  {
    id: "severus-snape",
    name: "Severus Snape",
    title: "Potions Master & The Half-Blood Prince",
    house: "slytherin",
    role: "staff",
    image: "assets/images/snape.jpg",
    wand: "13½\" Ebony wood, Dragon Heartstring core",
    patronus: "Doe (Silver Doe)",
    boggart: "Lord Voldemort",
    bio: "A master of Potions and Occlumency who served as a double agent of unmatched courage for Dumbledore. Creator of iconic spells like Sectumsempra and Muffliato.",
    quote: "After all this time? — Always.",
    skills: ["Potions Mastery", "Master Occlumens & Legilimens", "Spell Invention", "Flight without Broom"],
    iconicAchievement: "Maintained complete mind-shielding against Voldemort for decades"
  },
  {
    id: "draco-malfoy",
    name: "Draco Malfoy",
    title: "Slytherin Prefect & Seeker",
    house: "slytherin",
    role: "student",
    image: "assets/images/draco-malfoy.jpg",
    wand: "10\" Hawthorn, Unicorn hair core (reasonably springy)",
    patronus: "Incapable of producing a corporeal Patronus",
    boggart: "Lord Voldemort",
    bio: "Born into the ancient aristocratic Malfoy family. Though raised in pure-blood supremacy, he struggled with remorse and conscience during the Second Wizarding War.",
    quote: "You'll soon find out some wizarding families are much better than others, Potter.",
    skills: ["Occlumency", "Potions", "Quidditch Seeker", "Dueling"],
    iconicAchievement: "Repaired the Vanishing Cabinet connecting Borgin and Burkes to the Room of Requirement"
  },
  {
    id: "luna-lovegood",
    name: "Luna Lovegood",
    title: "The Dreamer & Quibbler Contributor",
    house: "ravenclaw",
    role: "student",
    image: "assets/images/luna-lovegood.jpg",
    wand: "Unknown wood & core (second wand fashioned by Ollivander)",
    patronus: "Hare",
    boggart: "Her father Xenophilius suffering",
    bio: "Eccentric, open-minded, and fiercely loyal Ravenclaw who perceives truths others miss. A stalwart member of Dumbledore's Army who fought valiantly at the Department of Mysteries.",
    quote: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.",
    skills: ["Magical Zoology", "Non-traditional thinking", "Ravenclaw Riddles", "Dueling"],
    iconicAchievement: "Helped Harry identify Rowena Ravenclaw's Lost Diadem"
  },
  {
    id: "cedric-diggory",
    name: "Cedric Diggory",
    title: "Hogwarts Triwizard Champion & Hufflepuff Captain",
    house: "hufflepuff",
    role: "student",
    image: "assets/images/cedric-diggory.jpg",
    wand: "12¼\" Ash, Unicorn hair core (pleasantly springy)",
    patronus: "Unknown",
    boggart: "Lord Voldemort",
    bio: "The embodiment of Hufflepuff virtues: brave, honorable, extraordinarily modest, and fiercely fair. Co-winner of the Triwizard Tournament alongside Harry Potter.",
    quote: "Take it together. It's still a Hogwarts victory. We'll touch it at the same time.",
    skills: ["Transfiguration", "Quidditch Seeker", "Charms", "Leadership"],
    iconicAchievement: "Navigated the Triwizard Maze with honor and shared tournament victory"
  },
  {
    id: "minerva-mcgonagall",
    name: "Minerva McGonagall",
    title: "Deputy Headmistress & Head of Gryffindor",
    house: "gryffindor",
    role: "staff",
    image: "assets/images/mcgonagall.jpg",
    wand: "9½\" Fir wood, Dragon Heartstring core",
    patronus: "Silver Tabby Cat (with spectacle markings)",
    boggart: "Lord Voldemort",
    bio: "Registered Animagus (tabby cat) and world-renowned Transfiguration authority. Fierce protector of Hogwarts students who commanded the castle's statues during the Final Battle.",
    quote: "Hogwarts is threatened! Man the boundaries, protect us, do your duty to our school!",
    skills: ["Animagus (Cat)", "Transfiguration Mastery", "Defensive Wards", "Duelling"],
    iconicAchievement: "Cast Piertotum Locomotor bringing Hogwarts' gargoyles and statues to life"
  },
  {
    id: "ron-weasley",
    name: "Ron Weasley",
    title: "Keeper of Gryffindor & Auror",
    house: "gryffindor",
    role: "student",
    image: "assets/images/ron-weasley.jpg",
    wand: "14\" Willow, Unicorn hair core",
    patronus: "Jack Russell Terrier",
    boggart: "Acromantula (Giant Spider)",
    bio: "Harry Potter's fiercely loyal best friend and strategist. Known for his keen tactical mind in Wizard's Chess, his bravery against overwhelming odds, and his steadfast defense of those he loves.",
    quote: "If you want to kill Harry, you'll have to kill us too!",
    skills: ["Wizard's Chess Grandmaster", "Quidditch Keeper", "Parseltongue Mimicry", "Sword Dueling"],
    iconicAchievement: "Destroyed Salazar Slytherin's Locket Horcrux using the Sword of Gryffindor"
  },
  {
    id: "sirius-black",
    name: "Sirius Black",
    title: "Padfoot & Marauder",
    house: "gryffindor",
    role: "order",
    image: "assets/images/sirius-black.jpg",
    wand: "12\" Ebony wood, Dragon Heartstring (etched runes)",
    patronus: "Non-corporeal / Bear-like hound",
    boggart: "Lord Voldemort",
    bio: "Godfather to Harry Potter and rebel heir of the ancient House of Black. A gifted Animagus who could transform at will into a giant black dog, and the first wizard in history to escape Azkaban unaided.",
    quote: "We've all got both light and dark inside us. What matters is the part we choose to act on.",
    skills: ["Animagus (Black Dog)", "Nonverbal Magic", "Marauder's Map Co-Creator", "Acrobatic Duelling"],
    iconicAchievement: "Escaped the fortress of Azkaban without outside assistance"
  },
  {
    id: "remus-lupin",
    name: "Remus John Lupin",
    title: "Moony & Defense Against the Dark Arts Professor",
    house: "gryffindor",
    role: "staff",
    image: "assets/images/remus-lupin.jpg",
    wand: "10¼\" Cypress, Unicorn hair core (pliable)",
    patronus: "Wolf",
    boggart: "The Full Moon",
    bio: "Gentle scholar and brilliant educator who taught Harry the Patronus Charm. Despite bearing the curse of lycanthropy, he remained one of the bravest and most compassionate champions of the Order of the Phoenix.",
    quote: "It is the quality of one's convictions that determines success, not the number of followers.",
    skills: ["Patronus Mastery", "Dark Creature Expertise", "Duelling", "Marauder's Map Co-Creator"],
    iconicAchievement: "Taught third-year students to successfully cast the advanced Patronus Charm"
  },
  {
    id: "rubeus-hagrid",
    name: "Rubeus Hagrid",
    title: "Keeper of Keys and Grounds & Professor",
    house: "gryffindor",
    role: "staff",
    image: "assets/images/hagrid.jpg",
    wand: "16\" Oak (concealed in pink umbrella)",
    patronus: "None",
    boggart: "Lord Voldemort",
    bio: "Half-giant with an immense heart and an unyielding affection for dangerous creatures. He introduced Harry Potter to the magical world on his eleventh birthday and stood beside him through every battle.",
    quote: "What's comin' will come, an' we'll meet it when it does.",
    skills: ["Magical Creature Taming", "Giant Physical Resilience", "Cross-Breeding Beasts", "Unyielding Loyalty"],
    iconicAchievement: "Reared Aragog the Acromantula, Norbert the Dragon, and Buckbeak the Hippogriff"
  },
  {
    id: "lord-voldemort",
    name: "Tom Marvolo Riddle (Lord Voldemort)",
    title: "The Dark Lord & Heir of Slytherin",
    house: "slytherin",
    role: "dark-forces",
    image: "assets/images/lord-voldemort.jpg",
    wand: "13½\" Yew, Phoenix Feather core (Twin to Harry's wand)",
    patronus: "None (Never experienced genuine pure love)",
    boggart: "His own death",
    bio: "The most dangerous dark wizard of all time. Heir of Salazar Slytherin, he split his soul into seven Horcruxes in his ruthless pursuit of immortality and conquered the Ministry before his downfall at Hogwarts.",
    quote: "There is no good and evil, there is only power, and those too weak to seek it.",
    skills: ["Parseltongue", "Horcrux Creation", "Unsupported Flight", "Dark Charms Invention"],
    iconicAchievement: "Severed his soul into seven Horcruxes and achieved unsupported flight"
  },
  {
    id: "bellatrix-lestrange",
    name: "Bellatrix Lestrange (née Black)",
    title: "Lieutenant of the Dark Lord",
    house: "slytherin",
    role: "dark-forces",
    image: "assets/images/bellatrix-lestrange.jpg",
    wand: "12¾\" Walnut, Dragon Heartstring core (rigid)",
    patronus: "None",
    boggart: "Lord Voldemort abandoning her",
    bio: "The Dark Lord's most lethal, fanatic lieutenant. Extraordinarily skilled duellist trained in the Dark Arts by Voldemort himself, notorious for her cruelty and mastery of the Unforgivable Curses.",
    quote: "I killed Sirius Black! I killed Sirius Black! Are you going to get me?",
    skills: ["Cruciatus Curse Mastery", "Dual-Wand Dueling", "Occlumency", "Dark Combat Reflexes"],
    iconicAchievement: "Defeated multiple Order of the Phoenix duelists in the Department of Mysteries"
  },
  {
    id: "filius-flitwick",
    name: "Filius Flitwick",
    title: "Head of Ravenclaw & Charms Master",
    house: "ravenclaw",
    role: "staff",
    image: "assets/images/flitwick.jpg",
    wand: "Unknown length and core (supple and balanced)",
    patronus: "Non-corporeal",
    boggart: "Lord Voldemort",
    bio: "Part-goblin wizard and former champion duellist possessing an encyclopedic mastery of charms and enchantments. Co-architect of Hogwarts' protective defensive wards during the Final Battle.",
    quote: "Swish and flick, remember, swish and flick!",
    skills: ["Duelling Champion", "Charms Mastery", "Enchanted Wards", "Choir Conducting"],
    iconicAchievement: "Defeated Death Eater Antonin Dolohov in single combat during the Battle of Hogwarts"
  },
  {
    id: "newt-scamander",
    name: "Newton Artemis Fido Scamander",
    title: "Famed Magizoologist & Author",
    house: "hufflepuff",
    role: "student",
    image: "assets/images/newt-scamander.jpg",
    wand: "Lime, Shell, Bone, and Mother-of-Pearl core",
    patronus: "Kelpie",
    boggart: "Having to work in an office",
    bio: "Celebrated Magizoologist whose magnum opus, Fantastic Beasts and Where to Find Them, became an essential Hogwarts textbook. Instrumental in combating Gellert Grindelwald across the globe.",
    quote: "My philosophy is that worrying means you suffer twice.",
    skills: ["Magical Zoology", "Beast Communication", "Tracking & Fieldwork", "Nonverbal Charms"],
    iconicAchievement: "Authored 'Fantastic Beasts and Where to Find Them' and captured Grindelwald in New York"
  },
  {
    id: "nymphadora-tonks",
    name: "Nymphadora Tonks",
    title: "Metamorphmagus & Auror",
    house: "hufflepuff",
    role: "order",
    image: "assets/images/tonks.jpg",
    wand: "Unknown wood and core (flexible)",
    patronus: "Jack Rabbit (later Wolf)",
    boggart: "Losing her loved ones",
    bio: "A born Metamorphmagus with the rare gift to transmute her appearance at will. Trained by Mad-Eye Moody, she became a top-tier Auror and a courageous front-line fighter for the Order of the Phoenix.",
    quote: "Don't call me Nymphadora, Remus. It's Tonks.",
    skills: ["Metamorphmagus (Shape-shifting)", "Stealth & Concealment", "Auror Combat Dueling", "Espionage"],
    iconicAchievement: "Top graduate of the Auror training academy under Alastor 'Mad-Eye' Moody"
  }
];

export const SPELLS_DATA = [
  {
    id: "lumos",
    name: "Lumos",
    incantation: "Lumos",
    pronunciation: "LOO-mos",
    category: "Charm",
    effect: "Ignites a brilliant beam of wandlight at the tip.",
    counter: "Nox",
    color: "#fffae6",
    fxType: "lumos",
    description: "The Wand-Lighting Charm creates an ethereal beam of pure golden-white light at the caster's wand tip, piercing darkness and dispelling supernatural shadows."
  },
  {
    id: "nox",
    name: "Nox",
    incantation: "Nox",
    pronunciation: "NOKS",
    category: "Counter-Charm",
    effect: "Extinguishes wandlight instantly, returning to night.",
    counter: "Lumos",
    color: "#b4c6e7",
    fxType: "nox",
    description: "The Wand-Extinguishing Charm immediately douses the light created by Lumos, allowing stealth and quiet darkness."
  },
  {
    id: "expecto-patronum",
    name: "Expecto Patronum",
    incantation: "Expecto Patronum",
    pronunciation: "ex-PEK-toh puh-TROH-num",
    category: "Defense Against the Dark Arts",
    effect: "Conjures a silver guardian fueled by supreme happiness.",
    counter: "None",
    color: "#c0e8ff",
    fxType: "patronus",
    description: "The most famous and difficult defensive charm. Manifests pure positive energy into a silver patronus that repels Dementors and Lethifolds."
  },
  {
    id: "wingardium-leviosa",
    name: "Wingardium Leviosa",
    incantation: "Wingardium Leviosa",
    pronunciation: "win-GAR-dee-um lev-ee-OH-sa",
    category: "Charm",
    effect: "Levitates objects smoothly through the air with a swish and flick.",
    counter: "Finite Incantatem",
    color: "#f39c12",
    fxType: "levitate",
    description: "The Levitation Charm allows the caster to make objects float smoothly through mid-air. Remember: swish and flick, and gar-dee-OH-sa, not gar-dee-oh-SAH!"
  },
  {
    id: "alohomora",
    name: "Alohomora",
    incantation: "Alohomora",
    pronunciation: "uh-LOH-huh-MOR-uh",
    category: "Charm",
    effect: "Unlocks doors, windows, and secret vaults sealed by mundane locks.",
    counter: "Colloportus",
    color: "#e67e22",
    fxType: "alohomora",
    description: "Known as the Thief's Friend, this ancient charm unlocks doors and opens secret chambers. In this realm, casting it unlocks the Owner's Secret Vault!"
  },
  {
    id: "stupefy",
    name: "Stupefy",
    incantation: "Stupefy",
    pronunciation: "STOO-puh-fye",
    category: "Duelling / Defense",
    effect: "Emits a brilliant scarlet bolt that renders targets unconscious.",
    counter: "Rennervate",
    color: "#e74c3c",
    fxType: "stupefy",
    description: "The Stunning Spell is the bread-and-butter of wizarding duels, knocking out opponents in a blinding scarlet flash without causing permanent harm."
  },
  {
    id: "avada-kedavra",
    name: "Avada Kedavra",
    incantation: "Avada Kedavra",
    pronunciation: "uh-VAH-duh kuh-DAH-vruh",
    category: "Unforgivable Curse",
    effect: "A blinding flash of emerald green light causing instantaneous death.",
    counter: "Sacrificial Love Protection",
    color: "#2ecc71",
    fxType: "curse",
    description: "The Killing Curse produces a rushing sound like wind and an intense blinding flash of green light. Strictly forbidden by the Ministry of Magic under penalty of Azkaban."
  },
  {
    id: "accio",
    name: "Accio",
    incantation: "Accio",
    pronunciation: "AK-ee-oh",
    category: "Charm",
    effect: "Summons distant objects directly into the caster's grasp.",
    counter: "Anti-Summoning Charms",
    color: "#3498db",
    fxType: "accio",
    description: "The Summoning Charm calls targets across vast distances. Famously summoned Harry's Firebolt broom during the First Task of the Triwizard Tournament."
  },
  {
    id: "riddikulus",
    name: "Riddikulus",
    incantation: "Riddikulus",
    pronunciation: "rih-DIH-kyoo-lus",
    category: "Defense / Charm",
    effect: "Transforms a fearsome Boggart into an amusing, laughable shape.",
    counter: "Laughter",
    color: "#f1c40f",
    fxType: "riddikulus",
    description: "The Boggart-Banishing Charm relies on the caster's humor and imagination. Envisioning something hilarious forces the shape-shifting boggart to assume a comical form, dispelling fear."
  },
  {
    id: "sectumsempra",
    name: "Sectumsempra",
    incantation: "Sectumsempra",
    pronunciation: "sec-tum-SEM-prah",
    category: "Dark Arts / Curse",
    effect: "Slashes the target with invisible blade cuts and lacerations.",
    counter: "Vulnera Sanentur",
    color: "#c0392b",
    fxType: "sectumsempra",
    description: "Invented by Severus Snape ('For Enemies') during his time as the Half-Blood Prince. Slashes victims as though struck by a sword, causing severe, bleeding wounds that resist ordinary healing."
  },
  {
    id: "petrificus-totalus",
    name: "Petrificus Totalus",
    incantation: "Petrificus Totalus",
    pronunciation: "peh-TRIF-ih-kus toh-TAH-lus",
    category: "Duelling / Curse",
    effect: "Snaps the victim's limbs rigid as stone in full body paralysis.",
    counter: "Finite Incantatem",
    color: "#5dade2",
    fxType: "petrificus",
    description: "The Full Body-Bind Curse instantly snaps the victim's arms to their sides and binds their legs together, causing them to topple rigid as stone while remaining fully conscious."
  }
];

export const BEASTS_DATA = [
  {
    id: "phoenix",
    name: "Fawkes the Phoenix",
    species: "Phoenix",
    classification: "XXXX (Not due to aggression, but because exceedingly few wizards can tame it)",
    image: "assets/images/phoenix.jpg",
    habitat: "Mountain peaks of Egypt, India, and China; Hogwarts Headmaster's Office",
    abilities: [
      "Rebirth from its own ashes on Burning Day",
      "Healing tears capable of curing basilisk venom",
      "Immense carrying strength (can lift several people)",
      "Sweet, heart-stirring song that increases courage in the pure of heart"
    ],
    lore: "Fawkes served as Albus Dumbledore's loyal companion. His feathers formed the magical cores inside both Harry Potter's and Lord Voldemort's twin wands."
  },
  {
    id: "buckbeak",
    name: "Buckbeak the Hippogriff",
    species: "Hippogriff",
    classification: "XXX (Competent wizards should cope)",
    image: "assets/images/buckbeak.jpg",
    habitat: "Highlands of Europe; Hogwarts Forbidden Forest edge",
    abilities: [
      "Majestic aerial flight with eagle wings",
      "Deadly razor-sharp talons and beak",
      "Fierce pride and loyalty to those who respect proper etiquette"
    ],
    lore: "One must always maintain uninterrupted eye contact and bow to a Hippogriff before approaching. Rescued from unjust execution with the Time-Turner by Harry and Hermione."
  },
  {
    id: "niffler",
    name: "The Niffler",
    species: "Niffler",
    classification: "XXX",
    image: "assets/images/niffler.jpg",
    habitat: "Britain (underground lairs up to twenty feet below surface)",
    abilities: [
      "Uncanny magnetic attraction to shiny gold, jewels, and silver",
      "Bottomless belly pouch with Undetectable Extension Charm properties",
      "Gentle and affectionate, though destructive to indoor furniture"
    ],
    lore: "Nifflers are long-snouted, black-furred burrowing creatures beloved by Goblins for treasure hunting, though notorious for causing chaos in jewelry shops."
  },
  {
    id: "thestral",
    name: "Thestral",
    species: "Winged Horse",
    classification: "XXXX",
    image: "assets/images/thestral.jpg",
    habitat: "Forbidden Forest of Hogwarts",
    abilities: [
      "Visible only to those who have witnessed and emotionally understood death",
      "Unmatched sense of direction across continents",
      "Ghostly reptilian winged flight with silent velocity"
    ],
    lore: "Often wrongly regarded as an omen of misfortune due to their skeletal appearance, Thestrals are actually gentle, intelligent, and fiercely loyal beasts."
  },
  {
    id: "horntail",
    name: "Hungarian Horntail",
    species: "Dragon",
    classification: "XXXXX (Known wizard killer / impossible to train)",
    image: "assets/images/horntail.jpg",
    habitat: "Hungarian crags and mountain peaks",
    abilities: [
      "Fierce jet of flame reaching up to fifty feet",
      "Deadly spiked tail and razor-sharp bronze horns",
      "Exceptional speed and agility in aerial combat"
    ],
    lore: "Considered the most dangerous of all dragon breeds. Harry Potter famously faced a nesting Hungarian Horntail during the First Task of the Triwizard Tournament."
  },
  {
    id: "basilisk",
    name: "Salazar's Basilisk",
    species: "King of Serpents",
    classification: "XXXXX",
    image: "assets/images/basilisk.jpg",
    habitat: "Chamber of Secrets deep beneath Hogwarts Castle",
    abilities: [
      "Instantaneous lethal gaze to anyone looking directly into its eyes",
      "Petrifying indirect reflection gaze",
      "Deadly venom that destroys Horcruxes and dissolves virtually any substance"
    ],
    lore: "Bred by Salazar Slytherin and sealed within the Chamber of Secrets for a thousand years until awakened by Tom Riddle. Slain by Harry Potter with the Sword of Gryffindor."
  }
];

export const SORTING_HAT_QUESTIONS = [
  {
    id: 1,
    prompt: "A roaring thunderstorm breaks over Hogwarts Castle at midnight. Where do you find yourself?",
    options: [
      { text: "Standing upon the highest astronomy rampart, wand drawn, exhilarated by the raw tempest.", house: "gryffindor", score: 3 },
      { text: "Deep within the silent dungeon archives, brewing a rare potion while the storm hides your work.", house: "slytherin", score: 3 },
      { text: "Curled by the library hearth with ancient star charts, decoding the mystical patterns of the lightning.", house: "ravenclaw", score: 3 },
      { text: "In the cozy common room preparing warm butterbeer and comforting younger students frightened by the thunder.", house: "hufflepuff", score: 3 }
    ]
  },
  {
    id: 2,
    prompt: "You come across a four-way crossroads in the Forbidden Forest. Which path beckons you?",
    options: [
      { text: "The winding cobbled trail illuminated by golden lantern light leading toward glory and danger.", house: "gryffindor", score: 3 },
      { text: "The shadowed mossy path descending into an ancient stone vault rumored to house forgotten power.", house: "slytherin", score: 3 },
      { text: "The narrow cliffside ledge lined with glowing runic inscriptions and celestial vistas.", house: "ravenclaw", score: 3 },
      { text: "The warm earthen path bordered by fragrant wild herbs, sweet berries, and soft woodland footsteps.", house: "hufflepuff", score: 3 }
    ]
  },
  {
    id: 3,
    prompt: "Which ancient magical artifact would you choose to safeguard?",
    options: [
      { text: "The Sword of Gryffindor: capable of absorbing only that which makes it stronger.", house: "gryffindor", score: 3 },
      { text: "The Resurrection Stone: command over secrets beyond the veil of mortality.", house: "slytherin", score: 3 },
      { text: "The Lost Diadem of Ravenclaw: bestowing infinite wisdom and razor-sharp intellect.", house: "ravenclaw", score: 3 },
      { text: "The Golden Cup of Helga Hufflepuff: imbued with healing, hospitality, and life-nourishing magic.", house: "hufflepuff", score: 3 }
    ]
  },
  {
    id: 4,
    prompt: "If you could brew any draught in the Potions Dungeon, which would you craft?",
    options: [
      { text: "Felix Felicis — Liquid Luck: To seize daring, impossible triumphs against all odds.", house: "gryffindor", score: 3 },
      { text: "Veritaserum or Elixir of Power: To outmaneuver adversaries and learn the hidden truth.", house: "slytherin", score: 3 },
      { text: "Wit-Sharpening Potion: To decipher untranslatable prophecies and expand human understanding.", house: "ravenclaw", score: 3 },
      { text: "Draught of Peace & Amortentia: To bring harmony, heal sorrow, and protect family and friends.", house: "hufflepuff", score: 3 }
    ]
  },
  {
    id: 5,
    prompt: "How would you like to be remembered by future generations of witches and wizards?",
    options: [
      { text: "As the hero who stood unwavering on the front lines when everyone else faltered.", house: "gryffindor", score: 3 },
      { text: "As the visionary ruler who commanded respect and built an enduring empire.", house: "slytherin", score: 3 },
      { text: "As the scholar whose revolutionary discoveries changed the wizarding world forever.", house: "ravenclaw", score: 3 },
      { text: "As the steadfast friend who never turned their back on someone in need.", house: "hufflepuff", score: 3 }
    ]
  }
];

export const HOGWARTS_MAP_LOCATIONS = [
  {
    id: "great-hall",
    name: "The Great Hall & Kitchens",
    coordinates: "Central Ground Floor",
    mapX: 50,
    mapY: 52,
    walker: "Albus Dumbledore",
    walkerHouse: "gryffindor",
    description: "Four massive house tables beneath an enchanted sky ceiling reflecting outdoor weather, illuminated by thousands of floating wax candles.",
    secret: "Tickling the pear on the still-life painting of a fruit bowl reveals the secret entrance to the vast underground kitchens maintained by house-elves.",
    passage: "Passageway connects behind the High Table directly into the Slytherin Dungeons and Staff Wing."
  },
  {
    id: "potions-dungeon",
    name: "Potions Dungeon & Black Lake",
    coordinates: "Sub-level 2, Slytherin Quarters",
    mapX: 25,
    mapY: 76,
    walker: "Severus Snape",
    walkerHouse: "slytherin",
    description: "Cold stone cellar lined with pickled specimens in glass jars, bubbling pewter cauldrons, and damp green torches flickering against the walls.",
    secret: "The blank stone wall opposite cauldron number seven swings open upon speaking 'Pure-Blood', opening a sub-aquatic passage directly into the Black Lake shore.",
    passage: "Runs beneath the lakebed toward the boathouse and Forbidden Forest fringes."
  },
  {
    id: "room-of-requirement",
    name: "The Room of Requirement",
    coordinates: "Seventh Floor, Left Corridor",
    mapX: 72,
    mapY: 34,
    walker: "Harry Potter",
    walkerHouse: "gryffindor",
    description: "The 'Come and Go Room' only appears when someone is in real need of it, magically equipped with whatever the seeker requires.",
    secret: "Pacing three times past the tapestry of Barnabas the Barmy while concentrating on your exact need reveals the brass door. Contains the secret Hog's Head tunnel created by Aberforth Dumbledore.",
    passage: "Secret exit runs directly into the Hog's Head Inn in Hogsmeade village, bypassing all castle wards."
  },
  {
    id: "astronomy-tower",
    name: "The Astronomy Tower",
    coordinates: "Highest Turret of Hogwarts",
    mapX: 82,
    mapY: 15,
    walker: "Minerva McGonagall",
    walkerHouse: "gryffindor",
    description: "The highest parapet in the castle, where students observe planetary spheres and alignments with brass telescopes under the nocturnal sky.",
    secret: "A secret winding spiral stair behind the third gargoyle descends directly into the Headmaster's private study without passing through the central tower.",
    passage: "Direct aerial vantage with hidden owl perches connected to the Owlery rookery."
  },
  {
    id: "gryffindor-tower",
    name: "Gryffindor Common Room",
    coordinates: "Seventh Floor, Eastern Turret",
    mapX: 36,
    mapY: 26,
    walker: "Hermione Granger",
    walkerHouse: "gryffindor",
    description: "A circular, cozy room filled with scarlet squashy armchairs, a roaring fireplace, and majestic tapestries looking out toward the Quidditch pitch.",
    secret: "Guarded by the portrait of the Fat Lady. An old chute behind the portrait frame acts as an emergency slide down to the first-floor entrance hall.",
    passage: "Narrow spiral stairway leads to the Boys' and Girls' dormitories and the ancient spell repository."
  },
  {
    id: "chamber-of-secrets",
    name: "Chamber of Secrets Entrance",
    coordinates: "Second Floor Girls' Lavatory",
    mapX: 58,
    mapY: 74,
    walker: "Argus Filch & Mrs. Norris",
    walkerHouse: "staff",
    description: "The out-of-order bathroom haunted by Moaning Myrtle, hiding the legendary underground vault carved by Salazar Slytherin.",
    secret: "Hissing 'Open' in Parseltongue at the copper sink with the tiny snake scratch opens a deep stone pipe slide plunging miles into the castle foundations.",
    passage: "Vast subterranean tunnels connecting beneath the Great Lake and the deepest Hogwarts aqueducts."
  },
  {
    id: "whomping-willow",
    name: "The Whomping Willow",
    coordinates: "Castle Grounds / Boundary",
    mapX: 14,
    mapY: 42,
    walker: "Remus Lupin",
    walkerHouse: "gryffindor",
    description: "A violent, enchanted willow tree planted in 1971 to conceal a secret tunnel leading beyond the castle boundary.",
    secret: "Pressing the knot at the base of the trunk with a long branch paralyzes the tree, revealing the subterranean tunnel leading to the Shrieking Shack in Hogsmeade.",
    passage: "One of the seven secret passageways mapped by James Potter, Sirius Black, Remus Lupin, and Peter Pettigrew."
  },
  {
    id: "headmaster-sanctum",
    name: "Headmaster's Gargoyle Staircase",
    coordinates: "Third Floor Corridor",
    mapX: 62,
    mapY: 18,
    walker: "Fawkes the Phoenix",
    walkerHouse: "gryffindor",
    description: "A magnificent spiral moving stone staircase guarded by an enchanted stone gargoyle that springs to life upon hearing the correct password.",
    secret: "Speaking wizarding confections (e.g. 'Lemon Drop', 'Acid Pops', 'Cockroach Cluster') causes the gargoyle to leap aside, revealing the rotating staircase.",
    passage: "Contains the Pensieve cabinet, portraits of past Headmasters, and the Sorting Hat's resting shelf."
  }
];
