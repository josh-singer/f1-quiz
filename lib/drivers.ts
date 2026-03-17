export interface Driver {
  id: string;
  name: string;
  team: string;
  wikiTitle: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export const DRIVERS: Driver[] = [
  {
    id: "verstappen",
    name: "Max Verstappen",
    team: "Red Bull Racing",
    wikiTitle: "Max_Verstappen",
    colors: { primary: "#1B3A5C", secondary: "#FFD700", text: "#ffffff" },
  },
  {
    id: "lawson",
    name: "Liam Lawson",
    team: "Red Bull Racing",
    wikiTitle: "Liam_Lawson_(racing_driver)",
    colors: { primary: "#1B3A5C", secondary: "#FFD700", text: "#ffffff" },
  },
  {
    id: "hamilton",
    name: "Lewis Hamilton",
    team: "Ferrari",
    wikiTitle: "Lewis_Hamilton",
    colors: { primary: "#DC0000", secondary: "#ffffff", text: "#ffffff" },
  },
  {
    id: "leclerc",
    name: "Charles Leclerc",
    team: "Ferrari",
    wikiTitle: "Charles_Leclerc",
    colors: { primary: "#DC0000", secondary: "#ffffff", text: "#ffffff" },
  },
  {
    id: "russell",
    name: "George Russell",
    team: "Mercedes",
    wikiTitle: "George_Russell_(racing_driver)",
    colors: { primary: "#00413b", secondary: "#00D2BE", text: "#ffffff" },
  },
  {
    id: "antonelli",
    name: "Andrea Kimi Antonelli",
    team: "Mercedes",
    wikiTitle: "Kimi_Antonelli",
    colors: { primary: "#00413b", secondary: "#00D2BE", text: "#ffffff" },
  },
  {
    id: "norris",
    name: "Lando Norris",
    team: "McLaren",
    wikiTitle: "Lando_Norris",
    colors: { primary: "#cc6600", secondary: "#000000", text: "#ffffff" },
  },
  {
    id: "piastri",
    name: "Oscar Piastri",
    team: "McLaren",
    wikiTitle: "Oscar_Piastri",
    colors: { primary: "#cc6600", secondary: "#000000", text: "#ffffff" },
  },
  {
    id: "alonso",
    name: "Fernando Alonso",
    team: "Aston Martin",
    wikiTitle: "Fernando_Alonso",
    colors: { primary: "#00594F", secondary: "#CEDC00", text: "#ffffff" },
  },
  {
    id: "stroll",
    name: "Lance Stroll",
    team: "Aston Martin",
    wikiTitle: "Lance_Stroll",
    colors: { primary: "#00594F", secondary: "#CEDC00", text: "#ffffff" },
  },
  {
    id: "gasly",
    name: "Pierre Gasly",
    team: "Alpine",
    wikiTitle: "Pierre_Gasly",
    colors: { primary: "#0055a5", secondary: "#FF69B4", text: "#ffffff" },
  },
  {
    id: "doohan",
    name: "Jack Doohan",
    team: "Alpine",
    wikiTitle: "Jack_Doohan",
    colors: { primary: "#0055a5", secondary: "#FF69B4", text: "#ffffff" },
  },
  {
    id: "sainz",
    name: "Carlos Sainz",
    team: "Williams",
    wikiTitle: "Carlos_Sainz_Jr.",
    colors: { primary: "#041E42", secondary: "#00A0DD", text: "#ffffff" },
  },
  {
    id: "albon",
    name: "Alex Albon",
    team: "Williams",
    wikiTitle: "Alexander_Albon",
    colors: { primary: "#041E42", secondary: "#00A0DD", text: "#ffffff" },
  },
  {
    id: "tsunoda",
    name: "Yuki Tsunoda",
    team: "Racing Bulls",
    wikiTitle: "Yuki_Tsunoda",
    colors: { primary: "#1B3C6E", secondary: "#E8002D", text: "#ffffff" },
  },
  {
    id: "hadjar",
    name: "Isack Hadjar",
    team: "Racing Bulls",
    wikiTitle: "Isack_Hadjar",
    colors: { primary: "#1B3C6E", secondary: "#E8002D", text: "#ffffff" },
  },
  {
    id: "bearman",
    name: "Oliver Bearman",
    team: "Haas",
    wikiTitle: "Oliver_Bearman",
    colors: { primary: "#1a1a1a", secondary: "#E8002D", text: "#ffffff" },
  },
  {
    id: "ocon",
    name: "Esteban Ocon",
    team: "Haas",
    wikiTitle: "Esteban_Ocon",
    colors: { primary: "#1a1a1a", secondary: "#E8002D", text: "#ffffff" },
  },
  {
    id: "hulkenberg",
    name: "Nico Hulkenberg",
    team: "Sauber",
    wikiTitle: "Nico_Hülkenberg",
    colors: { primary: "#006B3C", secondary: "#ffffff", text: "#ffffff" },
  },
  {
    id: "bortoleto",
    name: "Gabriel Bortoleto",
    team: "Sauber",
    wikiTitle: "Gabriel_Bortoleto",
    colors: { primary: "#006B3C", secondary: "#ffffff", text: "#ffffff" },
  },
];

export const QUESTIONS = [
  "You got P2. You're soaked with champagne. P1 is doing an interview. What do you do?",
  "Where do you go during your off week?",
  "You are instructed to let your teammate pass. What do you do?",
  "It's lap 1, turn 1. Verstappen is Verstappening as you try for the inside corner. What do you do?",
  "Box Box or YOLO?",
  "You qualify P7. How do you feel?",
  "You get cut out of the edit in Drive to Survive. What do you do?",
];
