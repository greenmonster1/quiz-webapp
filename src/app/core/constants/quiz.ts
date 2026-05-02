import { InjectionToken } from '@angular/core';
import { QuizQuestion } from '../models/quiz';

export const SITE_URL = 'https://d27c0645hiq9es.cloudfront.net';

export const QUIZ_TITLE = 'U.S. Civics Quiz — 2025 Edition';
export const QUIZ_DESCRIPTION =
  'Test your knowledge of American government and history with questions from the official USCIS 2025 Civics Test.';

export const QUIZ_POOL_SIZE = 10;

export interface FeedbackTier {
  minPct: number; // inclusive lower bound, 0–100
  message: string;
}

// Sorted descending; first tier whose minPct <= score wins
export const FEEDBACK_THRESHOLDS: FeedbackTier[] = [
  { minPct: 80, message: "Excellent! You're a civics master! 🇺🇸" },
  { minPct: 50, message: 'Good effort! Keep practicing. 💪' },
  { minPct:  0, message: "Keep studying — you'll get there! 📚" },
];

export const QUESTION_BANK = new InjectionToken<QuizQuestion[]>('QUESTION_BANK', {
  providedIn: 'root',
  factory: () => CIVICS_QUESTION_BANK,
});

// Source: USCIS 2025 Civics Test — 128 Questions and Answers (M-1778, 09/25)
// Excluded: Q23, Q29, Q61, Q62 (answers vary by state/district/territory)
// Q30, Q38, Q39, Q57: officeholders as of 2025 — check uscis.gov/citizenship/testupdates for changes
// isAsterisk: true = 65/20 special consideration (20 questions eligible for senior/long-term resident exemption)
export const CIVICS_QUESTION_BANK: QuizQuestion[] = [

  // ── A: Principles of American Government ──────────────────────────────────
  {
    id: 1,
    text: 'What is the form of government of the United States?',
    options: [
      { key: 'A', text: 'Monarchy' },
      { key: 'B', text: 'Republic' },
      { key: 'C', text: 'Oligarchy' },
      { key: 'D', text: 'Theocracy' },
    ],
    correctKey: 'B',
  },
  {
    id: 2,
    text: 'What is the supreme law of the land?',
    options: [
      { key: 'A', text: 'The Declaration of Independence' },
      { key: 'B', text: 'The Federalist Papers' },
      { key: 'C', text: 'The U.S. Constitution' },
      { key: 'D', text: 'The Bill of Rights' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 3,
    text: 'Name one thing the U.S. Constitution does.',
    options: [
      { key: 'A', text: 'Declares independence from Britain' },
      { key: 'B', text: 'Establishes the military draft' },
      { key: 'C', text: 'Creates political parties' },
      { key: 'D', text: 'Protects the rights of the people' },
    ],
    correctKey: 'D',
  },
  {
    id: 4,
    text: 'The U.S. Constitution starts with the words "We the People." What does "We the People" mean?',
    options: [
      { key: 'A', text: 'The government rules the people' },
      { key: 'B', text: 'Only wealthy citizens have power' },
      { key: 'C', text: 'Popular sovereignty — the people govern themselves' },
      { key: 'D', text: 'The military protects the people' },
    ],
    correctKey: 'C',
  },
  {
    id: 5,
    text: 'How are changes made to the U.S. Constitution?',
    options: [
      { key: 'A', text: 'By presidential decree' },
      { key: 'B', text: 'Through the amendment process' },
      { key: 'C', text: 'By Supreme Court ruling' },
      { key: 'D', text: 'By popular referendum' },
    ],
    correctKey: 'B',
  },
  {
    id: 6,
    text: 'What does the Bill of Rights protect?',
    options: [
      { key: 'A', text: 'The basic rights of Americans' },
      { key: 'B', text: 'The rights of Congress only' },
      { key: 'C', text: 'The power of the president' },
      { key: 'D', text: 'The rules for elections' },
    ],
    correctKey: 'A',
  },
  {
    id: 7,
    text: 'How many amendments does the U.S. Constitution have?',
    options: [
      { key: 'A', text: 'Ten (10)' },
      { key: 'B', text: 'Twenty-seven (27)' },
      { key: 'C', text: 'Twenty-one (21)' },
      { key: 'D', text: 'Fifty (50)' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 8,
    text: 'Why is the Declaration of Independence important?',
    options: [
      { key: 'A', text: 'It created the three branches of government' },
      { key: 'B', text: 'It established the Supreme Court' },
      { key: 'C', text: 'It says America is free from British control' },
      { key: 'D', text: 'It gave women the right to vote' },
    ],
    correctKey: 'C',
  },
  {
    id: 9,
    text: 'What founding document said the American colonies were free from Britain?',
    options: [
      { key: 'A', text: 'U.S. Constitution' },
      { key: 'B', text: 'Declaration of Independence' },
      { key: 'C', text: 'Bill of Rights' },
      { key: 'D', text: 'Federalist Papers' },
    ],
    correctKey: 'B',
  },
  {
    id: 10,
    text: 'Name two important ideas from the Declaration of Independence and the U.S. Constitution.',
    options: [
      { key: 'A', text: 'Equality and Liberty' },
      { key: 'B', text: 'Taxation and Commerce' },
      { key: 'C', text: 'Monarchy and Tradition' },
      { key: 'D', text: 'Industry and Expansion' },
    ],
    correctKey: 'A',
  },
  {
    id: 11,
    text: 'The words "Life, Liberty, and the pursuit of Happiness" are in what founding document?',
    options: [
      { key: 'A', text: 'U.S. Constitution' },
      { key: 'B', text: 'Bill of Rights' },
      { key: 'C', text: 'Declaration of Independence' },
      { key: 'D', text: 'Federalist Papers' },
    ],
    correctKey: 'C',
  },
  {
    id: 12,
    text: 'What is the economic system of the United States?',
    options: [
      { key: 'A', text: 'Socialism' },
      { key: 'B', text: 'Capitalism' },
      { key: 'C', text: 'Communism' },
      { key: 'D', text: 'Mercantilism' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 13,
    text: 'What is the rule of law?',
    options: [
      { key: 'A', text: 'The president decides what is legal' },
      { key: 'B', text: 'Only Congress can create laws' },
      { key: 'C', text: 'No one is above the law' },
      { key: 'D', text: 'States may ignore federal law' },
    ],
    correctKey: 'C',
  },
  {
    id: 14,
    text: 'Many documents influenced the U.S. Constitution. Name one.',
    options: [
      { key: 'A', text: 'Declaration of Independence' },
      { key: 'B', text: 'Emancipation Proclamation' },
      { key: 'C', text: 'Gettysburg Address' },
      { key: 'D', text: 'Monroe Doctrine' },
    ],
    correctKey: 'A',
  },
  {
    id: 15,
    text: 'There are three branches of government. Why?',
    options: [
      { key: 'A', text: 'To increase government efficiency' },
      { key: 'B', text: 'So one part does not become too powerful' },
      { key: 'C', text: 'To create more government jobs' },
      { key: 'D', text: 'Because the states required it' },
    ],
    correctKey: 'B',
  },

  // ── B: System of Government ───────────────────────────────────────────────
  {
    id: 16,
    text: 'Name the three branches of government.',
    options: [
      { key: 'A', text: 'Legislative, executive, and judicial' },
      { key: 'B', text: 'Senate, House, and Cabinet' },
      { key: 'C', text: 'Federal, state, and local' },
      { key: 'D', text: 'Presidential, congressional, and judicial' },
    ],
    correctKey: 'A',
  },
  {
    id: 17,
    text: 'The President of the United States is in charge of which branch of government?',
    options: [
      { key: 'A', text: 'Legislative branch' },
      { key: 'B', text: 'Executive branch' },
      { key: 'C', text: 'Judicial branch' },
      { key: 'D', text: 'Federal branch' },
    ],
    correctKey: 'B',
  },
  {
    id: 18,
    text: 'What part of the federal government writes laws?',
    options: [
      { key: 'A', text: 'U.S. Congress' },
      { key: 'B', text: 'The President' },
      { key: 'C', text: 'The Supreme Court' },
      { key: 'D', text: 'The Cabinet' },
    ],
    correctKey: 'A',
  },
  {
    id: 19,
    text: 'What are the two parts of the U.S. Congress?',
    options: [
      { key: 'A', text: 'The House and the Cabinet' },
      { key: 'B', text: 'The Senate and the Supreme Court' },
      { key: 'C', text: 'Senate and House of Representatives' },
      { key: 'D', text: 'The Executive and the Legislature' },
    ],
    correctKey: 'C',
  },
  {
    id: 20,
    text: 'Name one power of the U.S. Congress.',
    options: [
      { key: 'A', text: 'Writes laws' },
      { key: 'B', text: 'Appoints federal judges' },
      { key: 'C', text: 'Commands the military' },
      { key: 'D', text: 'Enforces laws' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 21,
    text: 'How many U.S. senators are there?',
    options: [
      { key: 'A', text: 'Fifty (50)' },
      { key: 'B', text: 'One hundred (100)' },
      { key: 'C', text: 'Four hundred thirty-five (435)' },
      { key: 'D', text: 'Two hundred (200)' },
    ],
    correctKey: 'B',
  },
  {
    id: 22,
    text: 'How long is a term for a U.S. senator?',
    options: [
      { key: 'A', text: 'Two (2) years' },
      { key: 'B', text: 'Four (4) years' },
      { key: 'C', text: 'Six (6) years' },
      { key: 'D', text: 'Eight (8) years' },
    ],
    correctKey: 'C',
  },
  // Q23 excluded — "Who is one of your state's U.S. senators now?" (answers vary by state)
  {
    id: 24,
    text: 'How many voting members are in the House of Representatives?',
    options: [
      { key: 'A', text: 'Four hundred thirty-five (435)' },
      { key: 'B', text: 'One hundred (100)' },
      { key: 'C', text: 'Two hundred fifty (250)' },
      { key: 'D', text: 'Five hundred (500)' },
    ],
    correctKey: 'A',
  },
  {
    id: 25,
    text: 'How long is a term for a member of the House of Representatives?',
    options: [
      { key: 'A', text: 'Six (6) years' },
      { key: 'B', text: 'Two (2) years' },
      { key: 'C', text: 'Four (4) years' },
      { key: 'D', text: 'Eight (8) years' },
    ],
    correctKey: 'B',
  },
  {
    id: 26,
    text: 'Why do U.S. representatives serve shorter terms than U.S. senators?',
    options: [
      { key: 'A', text: 'To give them more time to campaign' },
      { key: 'B', text: 'Because the Constitution requires it' },
      { key: 'C', text: 'To more closely follow public opinion' },
      { key: 'D', text: 'Because their districts are smaller' },
    ],
    correctKey: 'C',
  },
  {
    id: 27,
    text: 'How many senators does each state have?',
    options: [
      { key: 'A', text: 'Two (2)' },
      { key: 'B', text: 'One (1)' },
      { key: 'C', text: 'Four (4)' },
      { key: 'D', text: "It depends on the state's population" },
    ],
    correctKey: 'A',
  },
  {
    id: 28,
    text: 'Why does each state have two senators?',
    options: [
      { key: 'A', text: 'Because there are two political parties' },
      { key: 'B', text: 'Equal representation — the Great Compromise' },
      { key: 'C', text: 'To match the number of House members' },
      { key: 'D', text: 'The states chose this in 1800' },
    ],
    correctKey: 'B',
  },
  // Q29 excluded — "Name your U.S. representative." (answers vary by district)
  {
    id: 30,
    text: 'What is the name of the Speaker of the House of Representatives now?',
    options: [
      { key: 'A', text: 'Mike Johnson' },
      { key: 'B', text: 'Nancy Pelosi' },
      { key: 'C', text: 'Kevin McCarthy' },
      { key: 'D', text: 'Paul Ryan' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 31,
    text: 'Who does a U.S. senator represent?',
    options: [
      { key: 'A', text: 'The president' },
      { key: 'B', text: 'Citizens of their state' },
      { key: 'C', text: 'The federal government' },
      { key: 'D', text: 'Citizens in their congressional district' },
    ],
    correctKey: 'B',
  },
  {
    id: 32,
    text: 'Who elects U.S. senators?',
    options: [
      { key: 'A', text: 'Citizens from their state' },
      { key: 'B', text: 'The state legislature' },
      { key: 'C', text: 'The Electoral College' },
      { key: 'D', text: 'The president' },
    ],
    correctKey: 'A',
  },
  {
    id: 33,
    text: 'Who does a member of the House of Representatives represent?',
    options: [
      { key: 'A', text: 'All citizens of the United States' },
      { key: 'B', text: 'Citizens of their state' },
      { key: 'C', text: 'Citizens in their congressional district' },
      { key: 'D', text: 'The federal government' },
    ],
    correctKey: 'C',
  },
  {
    id: 34,
    text: 'Who elects members of the House of Representatives?',
    options: [
      { key: 'A', text: 'The state legislature' },
      { key: 'B', text: 'Citizens from their congressional district' },
      { key: 'C', text: 'The Electoral College' },
      { key: 'D', text: 'The Senate' },
    ],
    correctKey: 'B',
  },
  {
    id: 35,
    text: 'Some states have more representatives than other states. Why?',
    options: [
      { key: 'A', text: "Because of the state's population" },
      { key: 'B', text: "Because of the state's geographic size" },
      { key: 'C', text: "Because of the state's wealth" },
      { key: 'D', text: 'Because of how long the state has been in the union' },
    ],
    correctKey: 'A',
  },
  {
    id: 36,
    text: 'The President of the United States is elected for how many years?',
    options: [
      { key: 'A', text: 'Two (2) years' },
      { key: 'B', text: 'Four (4) years' },
      { key: 'C', text: 'Six (6) years' },
      { key: 'D', text: 'Eight (8) years' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 37,
    text: 'The President of the United States can serve only two terms. Why?',
    options: [
      { key: 'A', text: 'Because of the 22nd Amendment' },
      { key: 'B', text: 'Because of the 14th Amendment' },
      { key: 'C', text: 'It is a tradition started by Congress' },
      { key: 'D', text: 'Because of the Bill of Rights' },
    ],
    correctKey: 'A',
  },
  {
    id: 38,
    text: 'What is the name of the President of the United States now?',
    options: [
      { key: 'A', text: 'Joe Biden' },
      { key: 'B', text: 'Donald Trump' },
      { key: 'C', text: 'Barack Obama' },
      { key: 'D', text: 'George W. Bush' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 39,
    text: 'What is the name of the Vice President of the United States now?',
    options: [
      { key: 'A', text: 'JD Vance' },
      { key: 'B', text: 'Kamala Harris' },
      { key: 'C', text: 'Mike Pence' },
      { key: 'D', text: 'Joe Biden' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 40,
    text: 'If the president can no longer serve, who becomes president?',
    options: [
      { key: 'A', text: 'The Speaker of the House' },
      { key: 'B', text: 'The Chief Justice' },
      { key: 'C', text: 'The Vice President' },
      { key: 'D', text: 'The Secretary of State' },
    ],
    correctKey: 'C',
  },
  {
    id: 41,
    text: 'Name one power of the president.',
    options: [
      { key: 'A', text: 'Writes laws' },
      { key: 'B', text: 'Vetoes bills' },
      { key: 'C', text: 'Declares war' },
      { key: 'D', text: 'Sets tax rates' },
    ],
    correctKey: 'B',
  },
  {
    id: 42,
    text: 'Who is Commander in Chief of the U.S. military?',
    options: [
      { key: 'A', text: 'The President' },
      { key: 'B', text: 'The Secretary of Defense' },
      { key: 'C', text: 'The Chairman of the Joint Chiefs' },
      { key: 'D', text: 'The Speaker of the House' },
    ],
    correctKey: 'A',
  },
  {
    id: 43,
    text: 'Who signs bills to become laws?',
    options: [
      { key: 'A', text: 'The Speaker of the House' },
      { key: 'B', text: 'The President' },
      { key: 'C', text: 'The Chief Justice' },
      { key: 'D', text: 'The Vice President' },
    ],
    correctKey: 'B',
  },
  {
    id: 44,
    text: 'Who vetoes bills?',
    options: [
      { key: 'A', text: 'The President' },
      { key: 'B', text: 'The Supreme Court' },
      { key: 'C', text: 'The Senate' },
      { key: 'D', text: 'The Speaker of the House' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 45,
    text: 'Who appoints federal judges?',
    options: [
      { key: 'A', text: 'The Senate' },
      { key: 'B', text: 'The Chief Justice' },
      { key: 'C', text: 'The President' },
      { key: 'D', text: 'The House of Representatives' },
    ],
    correctKey: 'C',
  },
  {
    id: 46,
    text: 'The executive branch has many parts. Name one.',
    options: [
      { key: 'A', text: 'The Supreme Court' },
      { key: 'B', text: 'The Cabinet' },
      { key: 'C', text: 'The Senate' },
      { key: 'D', text: 'The House of Representatives' },
    ],
    correctKey: 'B',
  },
  {
    id: 47,
    text: "What does the President's Cabinet do?",
    options: [
      { key: 'A', text: 'Writes new laws' },
      { key: 'B', text: 'Advises the President' },
      { key: 'C', text: 'Declares war' },
      { key: 'D', text: 'Confirms federal judges' },
    ],
    correctKey: 'B',
  },
  {
    id: 48,
    text: 'What are two Cabinet-level positions?',
    options: [
      { key: 'A', text: 'Chief of Staff and Press Secretary' },
      { key: 'B', text: 'General of the Army and National Security Advisor' },
      { key: 'C', text: 'Secretary of State and Attorney General' },
      { key: 'D', text: 'Senate Majority Leader and House Whip' },
    ],
    correctKey: 'C',
  },
  {
    id: 49,
    text: 'Why is the Electoral College important?',
    options: [
      { key: 'A', text: 'It decides who is elected president' },
      { key: 'B', text: 'It confirms Supreme Court justices' },
      { key: 'C', text: 'It writes the federal budget' },
      { key: 'D', text: 'It approves treaties with foreign nations' },
    ],
    correctKey: 'A',
  },
  {
    id: 50,
    text: 'What is one part of the judicial branch?',
    options: [
      { key: 'A', text: 'The Cabinet' },
      { key: 'B', text: 'The Supreme Court' },
      { key: 'C', text: 'The Senate' },
      { key: 'D', text: 'The Department of Justice' },
    ],
    correctKey: 'B',
  },
  {
    id: 51,
    text: 'What does the judicial branch do?',
    options: [
      { key: 'A', text: 'Reviews laws' },
      { key: 'B', text: 'Writes laws' },
      { key: 'C', text: 'Enforces laws' },
      { key: 'D', text: 'Declares war' },
    ],
    correctKey: 'A',
  },
  {
    id: 52,
    text: 'What is the highest court in the United States?',
    options: [
      { key: 'A', text: 'The Federal Court of Appeals' },
      { key: 'B', text: 'The District Court' },
      { key: 'C', text: 'The Supreme Court' },
      { key: 'D', text: 'The Court of International Trade' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 53,
    text: 'How many seats are on the Supreme Court?',
    options: [
      { key: 'A', text: 'Seven (7)' },
      { key: 'B', text: 'Nine (9)' },
      { key: 'C', text: 'Eleven (11)' },
      { key: 'D', text: 'Thirteen (13)' },
    ],
    correctKey: 'B',
  },
  {
    id: 54,
    text: 'How many Supreme Court justices are usually needed to decide a case?',
    options: [
      { key: 'A', text: 'Five (5)' },
      { key: 'B', text: 'Six (6)' },
      { key: 'C', text: 'Seven (7)' },
      { key: 'D', text: 'Nine (9)' },
    ],
    correctKey: 'A',
  },
  {
    id: 55,
    text: 'How long do Supreme Court justices serve?',
    options: [
      { key: 'A', text: 'Ten (10) years' },
      { key: 'B', text: 'Until age 70' },
      { key: 'C', text: 'For life' },
      { key: 'D', text: 'Six (6) year terms, renewable' },
    ],
    correctKey: 'C',
  },
  {
    id: 56,
    text: 'Supreme Court justices serve for life. Why?',
    options: [
      { key: 'A', text: 'To reward long service in government' },
      { key: 'B', text: 'To be independent of politics' },
      { key: 'C', text: 'Because the Constitution forbids removal' },
      { key: 'D', text: 'To ensure consistency in rulings' },
    ],
    correctKey: 'B',
  },
  {
    id: 57,
    text: 'Who is the Chief Justice of the United States now?',
    options: [
      { key: 'A', text: 'John Roberts' },
      { key: 'B', text: 'Clarence Thomas' },
      { key: 'C', text: 'Elena Kagan' },
      { key: 'D', text: 'Samuel Alito' },
    ],
    correctKey: 'A',
  },
  {
    id: 58,
    text: 'Name one power that is only for the federal government.',
    options: [
      { key: 'A', text: "Give a driver's license" },
      { key: 'B', text: 'Declare war' },
      { key: 'C', text: 'Provide fire departments' },
      { key: 'D', text: 'Approve zoning and land use' },
    ],
    correctKey: 'B',
  },
  {
    id: 59,
    text: 'Name one power that is only for the states.',
    options: [
      { key: 'A', text: 'Provide schooling and education' },
      { key: 'B', text: 'Print paper money' },
      { key: 'C', text: 'Declare war' },
      { key: 'D', text: 'Make treaties with foreign countries' },
    ],
    correctKey: 'A',
  },
  {
    id: 60,
    text: 'What is the purpose of the 10th Amendment?',
    options: [
      { key: 'A', text: 'It abolishes slavery' },
      { key: 'B', text: 'It gives women the right to vote' },
      { key: 'C', text: 'Powers not given to the federal government belong to the states or the people' },
      { key: 'D', text: 'It limits the president to two terms' },
    ],
    correctKey: 'C',
  },
  // Q61 excluded — "Who is the governor of your state now?" (answers vary by state)
  // Q62 excluded — "What is the capital of your state?" (answers vary by state)

  // ── C: Rights and Responsibilities ───────────────────────────────────────
  {
    id: 63,
    text: 'There are four amendments to the U.S. Constitution about who can vote. Describe one of them.',
    options: [
      { key: 'A', text: 'Only landowners can vote' },
      { key: 'B', text: 'Citizens must pass a civics test to vote' },
      { key: 'C', text: 'Citizens eighteen (18) and older can vote' },
      { key: 'D', text: 'Voting is required by law' },
    ],
    correctKey: 'C',
  },
  {
    id: 64,
    text: 'Who can vote in federal elections, run for federal office, and serve on a jury in the United States?',
    options: [
      { key: 'A', text: 'Anyone who pays taxes' },
      { key: 'B', text: 'U.S. citizens' },
      { key: 'C', text: 'Anyone who lives in the U.S.' },
      { key: 'D', text: 'Permanent residents only' },
    ],
    correctKey: 'B',
  },
  {
    id: 65,
    text: 'What are three rights of everyone living in the United States?',
    options: [
      { key: 'A', text: 'Right to vote, right to free housing, and right to education' },
      { key: 'B', text: 'Right to a job, freedom from taxes, and right to healthcare' },
      { key: 'C', text: 'Freedom of speech, freedom of religion, and the right to bear arms' },
      { key: 'D', text: 'Right to a trial, free college, and right to own land' },
    ],
    correctKey: 'C',
  },
  {
    id: 66,
    text: 'What do we show loyalty to when we say the Pledge of Allegiance?',
    options: [
      { key: 'A', text: 'The United States' },
      { key: 'B', text: 'The president' },
      { key: 'C', text: 'The Constitution only' },
      { key: 'D', text: 'The military' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 67,
    text: 'Name two promises that new citizens make in the Oath of Allegiance.',
    options: [
      { key: 'A', text: 'Learn English and pay a citizenship fee' },
      { key: 'B', text: 'Give up loyalty to other countries and defend the U.S. Constitution' },
      { key: 'C', text: 'Join the military and run for public office' },
      { key: 'D', text: 'Vote in every election and serve on a jury' },
    ],
    correctKey: 'B',
  },
  {
    id: 68,
    text: 'How can people become United States citizens?',
    options: [
      { key: 'A', text: 'By paying a citizenship fee' },
      { key: 'B', text: 'By living in the U.S. for one year' },
      { key: 'C', text: 'Naturalize' },
      { key: 'D', text: 'By learning English only' },
    ],
    correctKey: 'C',
  },
  {
    id: 69,
    text: 'What are two examples of civic participation in the United States?',
    options: [
      { key: 'A', text: 'Shop locally and recycle' },
      { key: 'B', text: 'Watch the news and own property' },
      { key: 'C', text: 'Vote and join a civic group' },
      { key: 'D', text: 'Travel freely and practice religion' },
    ],
    correctKey: 'C',
  },
  {
    id: 70,
    text: 'What is one way Americans can serve their country?',
    options: [
      { key: 'A', text: 'Vote' },
      { key: 'B', text: 'Own a business' },
      { key: 'C', text: 'Travel abroad' },
      { key: 'D', text: 'Speak a second language' },
    ],
    correctKey: 'A',
  },
  {
    id: 71,
    text: 'Why is it important to pay federal taxes?',
    options: [
      { key: 'A', text: 'To support state governments only' },
      { key: 'B', text: 'Required by law' },
      { key: 'C', text: 'To fund local fire departments' },
      { key: 'D', text: 'It is voluntary but encouraged' },
    ],
    correctKey: 'B',
  },
  {
    id: 72,
    text: 'It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.',
    options: [
      { key: 'A', text: 'Required by law' },
      { key: 'B', text: 'It earns them a tax credit' },
      { key: 'C', text: "It is required to get a driver's license" },
      { key: 'D', text: "It provides access to veterans' benefits" },
    ],
    correctKey: 'A',
  },

  // ── A: Colonial Period and Independence ───────────────────────────────────
  {
    id: 73,
    text: 'The colonists came to America for many reasons. Name one.',
    options: [
      { key: 'A', text: 'To build a monarchy' },
      { key: 'B', text: 'To establish a military base' },
      { key: 'C', text: 'Religious freedom' },
      { key: 'D', text: 'To trade with Native Americans' },
    ],
    correctKey: 'C',
  },
  {
    id: 74,
    text: 'Who lived in America before the Europeans arrived?',
    options: [
      { key: 'A', text: 'American Indians' },
      { key: 'B', text: 'African explorers' },
      { key: 'C', text: 'Chinese settlers' },
      { key: 'D', text: 'Vikings only' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 75,
    text: 'What group of people was taken and sold as slaves?',
    options: [
      { key: 'A', text: 'Native Americans only' },
      { key: 'B', text: 'Africans' },
      { key: 'C', text: 'Irish immigrants' },
      { key: 'D', text: 'Chinese laborers' },
    ],
    correctKey: 'B',
  },
  {
    id: 76,
    text: 'What war did the Americans fight to win independence from Britain?',
    options: [
      { key: 'A', text: 'American Revolution' },
      { key: 'B', text: 'The Civil War' },
      { key: 'C', text: 'The War of 1812' },
      { key: 'D', text: 'The French and Indian War' },
    ],
    correctKey: 'A',
  },
  {
    id: 77,
    text: 'Name one reason why the Americans declared independence from Britain.',
    options: [
      { key: 'A', text: 'Britain refused to trade with the colonies' },
      { key: 'B', text: 'Britain invaded France' },
      { key: 'C', text: 'Taxation without representation' },
      { key: 'D', text: 'Britain banned immigration to the colonies' },
    ],
    correctKey: 'C',
  },
  {
    id: 78,
    text: 'Who wrote the Declaration of Independence?',
    options: [
      { key: 'A', text: 'George Washington' },
      { key: 'B', text: 'Thomas Jefferson' },
      { key: 'C', text: 'Benjamin Franklin' },
      { key: 'D', text: 'John Adams' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 79,
    text: 'When was the Declaration of Independence adopted?',
    options: [
      { key: 'A', text: 'July 4, 1776' },
      { key: 'B', text: 'September 17, 1787' },
      { key: 'C', text: 'March 4, 1789' },
      { key: 'D', text: 'December 15, 1791' },
    ],
    correctKey: 'A',
  },
  {
    id: 80,
    text: 'The American Revolution had many important events. Name one.',
    options: [
      { key: 'A', text: 'Battle of Gettysburg' },
      { key: 'B', text: 'Battle of Bunker Hill' },
      { key: 'C', text: 'Battle of Midway' },
      { key: 'D', text: 'Battle of the Bulge' },
    ],
    correctKey: 'B',
  },
  {
    id: 81,
    text: 'There were 13 original states. Name five.',
    options: [
      { key: 'A', text: 'New Hampshire, Massachusetts, New York, Virginia, and Georgia' },
      { key: 'B', text: 'Ohio, Florida, Texas, California, and Nevada' },
      { key: 'C', text: 'Kentucky, Tennessee, Missouri, Indiana, and Illinois' },
      { key: 'D', text: 'Michigan, Wisconsin, Iowa, Minnesota, and Oregon' },
    ],
    correctKey: 'A',
  },
  {
    id: 82,
    text: 'What founding document was written in 1787?',
    options: [
      { key: 'A', text: 'Declaration of Independence' },
      { key: 'B', text: 'Bill of Rights' },
      { key: 'C', text: 'U.S. Constitution' },
      { key: 'D', text: 'Emancipation Proclamation' },
    ],
    correctKey: 'C',
  },
  {
    id: 83,
    text: 'The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.',
    options: [
      { key: 'A', text: 'James Madison' },
      { key: 'B', text: 'Thomas Jefferson' },
      { key: 'C', text: 'John Adams' },
      { key: 'D', text: 'George Washington' },
    ],
    correctKey: 'A',
  },
  {
    id: 84,
    text: 'Why were the Federalist Papers important?',
    options: [
      { key: 'A', text: 'They declared independence from Britain' },
      { key: 'B', text: 'They helped people understand the U.S. Constitution' },
      { key: 'C', text: 'They established the Supreme Court' },
      { key: 'D', text: 'They ended the Revolutionary War' },
    ],
    correctKey: 'B',
  },
  {
    id: 85,
    text: 'Benjamin Franklin is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'First president of the United States' },
      { key: 'B', text: 'Writer of the U.S. Constitution' },
      { key: 'C', text: 'Inventor' },
      { key: 'D', text: 'General of the Continental Army' },
    ],
    correctKey: 'C',
  },
  {
    id: 86,
    text: 'George Washington is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Writer of the Declaration of Independence' },
      { key: 'B', text: 'First president of the United States' },
      { key: 'C', text: 'First Secretary of the Treasury' },
      { key: 'D', text: 'Chief Justice of the Supreme Court' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 87,
    text: 'Thomas Jefferson is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Writer of the Declaration of Independence' },
      { key: 'B', text: 'First president of the United States' },
      { key: 'C', text: 'General during the Revolutionary War' },
      { key: 'D', text: 'One of the writers of the Federalist Papers' },
    ],
    correctKey: 'A',
  },
  {
    id: 88,
    text: 'James Madison is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'First president of the United States' },
      { key: 'B', text: 'Writer of the Declaration of Independence' },
      { key: 'C', text: '"Father of the Constitution"' },
      { key: 'D', text: 'First Secretary of State' },
    ],
    correctKey: 'C',
  },
  {
    id: 89,
    text: 'Alexander Hamilton is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Third president of the United States' },
      { key: 'B', text: 'First Secretary of the Treasury' },
      { key: 'C', text: 'General of the Continental Army' },
      { key: 'D', text: 'Writer of the Declaration of Independence' },
    ],
    correctKey: 'B',
  },

  // ── B: 1800s ──────────────────────────────────────────────────────────────
  {
    id: 90,
    text: 'What territory did the United States buy from France in 1803?',
    options: [
      { key: 'A', text: 'Louisiana Territory' },
      { key: 'B', text: 'Alaska' },
      { key: 'C', text: 'Florida' },
      { key: 'D', text: 'Texas' },
    ],
    correctKey: 'A',
  },
  {
    id: 91,
    text: 'Name one war fought by the United States in the 1800s.',
    options: [
      { key: 'A', text: 'World War I' },
      { key: 'B', text: 'Civil War' },
      { key: 'C', text: 'Vietnam War' },
      { key: 'D', text: 'Korean War' },
    ],
    correctKey: 'B',
  },
  {
    id: 92,
    text: 'Name the U.S. war between the North and the South.',
    options: [
      { key: 'A', text: 'The Civil War' },
      { key: 'B', text: 'The Revolutionary War' },
      { key: 'C', text: 'The War of 1812' },
      { key: 'D', text: 'The Spanish-American War' },
    ],
    correctKey: 'A',
  },
  {
    id: 93,
    text: 'The Civil War had many important events. Name one.',
    options: [
      { key: 'A', text: 'Battle of Bunker Hill' },
      { key: 'B', text: 'Emancipation Proclamation' },
      { key: 'C', text: 'Boston Tea Party' },
      { key: 'D', text: 'Battle of Midway' },
    ],
    correctKey: 'B',
  },
  {
    id: 94,
    text: 'Abraham Lincoln is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Freed the slaves (Emancipation Proclamation)' },
      { key: 'B', text: 'Wrote the Declaration of Independence' },
      { key: 'C', text: 'Led the Union Army as general' },
      { key: 'D', text: 'Founded the Republican Party' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 95,
    text: 'What did the Emancipation Proclamation do?',
    options: [
      { key: 'A', text: 'Gave women the right to vote' },
      { key: 'B', text: 'Ended the Civil War' },
      { key: 'C', text: 'Freed the slaves' },
      { key: 'D', text: 'Created the 14th Amendment' },
    ],
    correctKey: 'C',
  },
  {
    id: 96,
    text: 'What U.S. war ended slavery?',
    options: [
      { key: 'A', text: 'The Civil War' },
      { key: 'B', text: 'The Revolutionary War' },
      { key: 'C', text: 'The War of 1812' },
      { key: 'D', text: 'The Mexican-American War' },
    ],
    correctKey: 'A',
  },
  {
    id: 97,
    text: 'What amendment says all persons born or naturalized in the United States are U.S. citizens?',
    options: [
      { key: 'A', text: '13th Amendment' },
      { key: 'B', text: '14th Amendment' },
      { key: 'C', text: '15th Amendment' },
      { key: 'D', text: '19th Amendment' },
    ],
    correctKey: 'B',
  },
  {
    id: 98,
    text: 'When did all men get the right to vote?',
    options: [
      { key: 'A', text: 'After the Civil War — 15th Amendment (1870)' },
      { key: 'B', text: 'At the founding — U.S. Constitution (1789)' },
      { key: 'C', text: 'After World War I — 19th Amendment (1920)' },
      { key: 'D', text: 'After World War II — 26th Amendment (1971)' },
    ],
    correctKey: 'A',
  },
  {
    id: 99,
    text: "Name one leader of the women's rights movement in the 1800s.",
    options: [
      { key: 'A', text: 'Harriet Beecher Stowe' },
      { key: 'B', text: 'Clara Barton' },
      { key: 'C', text: 'Susan B. Anthony' },
      { key: 'D', text: 'Rosa Parks' },
    ],
    correctKey: 'C',
  },

  // ── C: Recent American History and Other Important Historical Information ──
  {
    id: 100,
    text: 'Name one war fought by the United States in the 1900s.',
    options: [
      { key: 'A', text: 'World War II' },
      { key: 'B', text: 'The Civil War' },
      { key: 'C', text: 'The Revolutionary War' },
      { key: 'D', text: 'The War of 1812' },
    ],
    correctKey: 'A',
  },
  {
    id: 101,
    text: 'Why did the United States enter World War I?',
    options: [
      { key: 'A', text: 'Because Japan attacked Pearl Harbor' },
      { key: 'B', text: 'Because Germany attacked U.S. civilian ships' },
      { key: 'C', text: 'To stop the spread of communism' },
      { key: 'D', text: 'Because Britain asked for help' },
    ],
    correctKey: 'B',
  },
  {
    id: 102,
    text: 'When did all women get the right to vote?',
    options: [
      { key: 'A', text: '1920' },
      { key: 'B', text: '1865' },
      { key: 'C', text: '1945' },
      { key: 'D', text: '1776' },
    ],
    correctKey: 'A',
  },
  {
    id: 103,
    text: 'What was the Great Depression?',
    options: [
      { key: 'A', text: 'A period of military conflict in Europe' },
      { key: 'B', text: 'The longest economic recession in modern history' },
      { key: 'C', text: 'A drought that affected the Midwest in the 1930s' },
      { key: 'D', text: 'A political crisis during World War II' },
    ],
    correctKey: 'B',
  },
  {
    id: 104,
    text: 'When did the Great Depression start?',
    options: [
      { key: 'A', text: 'The stock market crash of 1929' },
      { key: 'B', text: 'The end of World War I in 1918' },
      { key: 'C', text: 'The election of Franklin Roosevelt in 1932' },
      { key: 'D', text: 'The attack on Pearl Harbor in 1941' },
    ],
    correctKey: 'A',
  },
  {
    id: 105,
    text: 'Who was president during the Great Depression and World War II?',
    options: [
      { key: 'A', text: 'Harry Truman' },
      { key: 'B', text: 'Woodrow Wilson' },
      { key: 'C', text: 'Franklin Roosevelt' },
      { key: 'D', text: 'Herbert Hoover' },
    ],
    correctKey: 'C',
  },
  {
    id: 106,
    text: 'Why did the United States enter World War II?',
    options: [
      { key: 'A', text: 'The bombing of Pearl Harbor' },
      { key: 'B', text: 'Germany invaded France' },
      { key: 'C', text: 'To stop the spread of communism' },
      { key: 'D', text: 'Britain requested military support' },
    ],
    correctKey: 'A',
  },
  {
    id: 107,
    text: 'Dwight Eisenhower is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Led the U.S. during the Great Depression' },
      { key: 'B', text: 'General during World War II' },
      { key: 'C', text: 'Writer of the New Deal programs' },
      { key: 'D', text: 'First president to serve three terms' },
    ],
    correctKey: 'B',
  },
  {
    id: 108,
    text: "Who was the United States' main rival during the Cold War?",
    options: [
      { key: 'A', text: 'Soviet Union' },
      { key: 'B', text: 'China' },
      { key: 'C', text: 'Germany' },
      { key: 'D', text: 'Japan' },
    ],
    correctKey: 'A',
  },
  {
    id: 109,
    text: 'During the Cold War, what was one main concern of the United States?',
    options: [
      { key: 'A', text: 'Environmental destruction' },
      { key: 'B', text: 'Communism' },
      { key: 'C', text: 'Immigration' },
      { key: 'D', text: 'Economic recession' },
    ],
    correctKey: 'B',
  },
  {
    id: 110,
    text: 'Why did the United States enter the Korean War?',
    options: [
      { key: 'A', text: 'Because Korea attacked Japan' },
      { key: 'B', text: 'To gain access to Korean resources' },
      { key: 'C', text: 'To stop the spread of communism' },
      { key: 'D', text: 'Because the United Nations required it' },
    ],
    correctKey: 'C',
  },
  {
    id: 111,
    text: 'Why did the United States enter the Vietnam War?',
    options: [
      { key: 'A', text: 'To stop the spread of communism' },
      { key: 'B', text: 'Because Vietnam attacked U.S. ships' },
      { key: 'C', text: 'To protect U.S. trade routes in Asia' },
      { key: 'D', text: 'Because France asked for help' },
    ],
    correctKey: 'A',
  },
  {
    id: 112,
    text: 'What did the civil rights movement do?',
    options: [
      { key: 'A', text: "Advocated for women's right to vote" },
      { key: 'B', text: 'Fought to end racial discrimination' },
      { key: 'C', text: 'Opposed the Vietnam War' },
      { key: 'D', text: 'Promoted immigration reform' },
    ],
    correctKey: 'B',
  },
  {
    id: 113,
    text: 'Martin Luther King, Jr. is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Fought for civil rights' },
      { key: 'B', text: 'Led the U.S. military during World War II' },
      { key: 'C', text: 'Wrote the Emancipation Proclamation' },
      { key: 'D', text: 'Founded the NAACP' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 114,
    text: 'Why did the United States enter the Persian Gulf War?',
    options: [
      { key: 'A', text: 'To stop the spread of communism' },
      { key: 'B', text: 'Because Iraq attacked U.S. forces' },
      { key: 'C', text: 'To force the Iraqi military from Kuwait' },
      { key: 'D', text: 'To protect oil pipelines in Saudi Arabia' },
    ],
    correctKey: 'C',
  },
  {
    id: 115,
    text: 'What major event happened on September 11, 2001 in the United States?',
    options: [
      { key: 'A', text: 'Terrorists attacked the United States' },
      { key: 'B', text: 'The United States declared war on Iraq' },
      { key: 'C', text: 'A major hurricane hit New York City' },
      { key: 'D', text: 'The U.S. economy experienced a crash' },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 116,
    text: 'Name one U.S. military conflict after the September 11, 2001 attacks.',
    options: [
      { key: 'A', text: 'Korean War' },
      { key: 'B', text: 'War in Afghanistan' },
      { key: 'C', text: 'Vietnam War' },
      { key: 'D', text: 'Persian Gulf War' },
    ],
    correctKey: 'B',
  },
  {
    id: 117,
    text: 'Name one American Indian tribe in the United States.',
    options: [
      { key: 'A', text: 'Cherokee' },
      { key: 'B', text: 'Aztec' },
      { key: 'C', text: 'Inca' },
      { key: 'D', text: 'Maya' },
    ],
    correctKey: 'A',
  },
  {
    id: 118,
    text: 'Name one example of an American innovation.',
    options: [
      { key: 'A', text: 'The printing press' },
      { key: 'B', text: 'The steam engine' },
      { key: 'C', text: 'Airplane' },
      { key: 'D', text: 'The telescope' },
    ],
    correctKey: 'C',
  },

  // ── Symbols and Holidays ──────────────────────────────────────────────────
  {
    id: 119,
    text: 'What is the capital of the United States?',
    options: [
      { key: 'A', text: 'Washington, D.C.' },
      { key: 'B', text: 'New York City' },
      { key: 'C', text: 'Philadelphia' },
      { key: 'D', text: 'Boston' },
    ],
    correctKey: 'A',
  },
  {
    id: 120,
    text: 'Where is the Statue of Liberty?',
    options: [
      { key: 'A', text: 'Washington, D.C.' },
      { key: 'B', text: 'New York Harbor' },
      { key: 'C', text: 'Philadelphia' },
      { key: 'D', text: 'Boston Harbor' },
    ],
    correctKey: 'B',
  },
  {
    id: 121,
    text: 'Why does the flag have 13 stripes?',
    options: [
      { key: 'A', text: 'To represent the 13 original presidents' },
      { key: 'B', text: 'To represent the 13 amendments in the Bill of Rights' },
      { key: 'C', text: 'Because there were 13 original colonies' },
      { key: 'D', text: 'To honor the 13 years of the Revolutionary War' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 122,
    text: 'Why does the flag have 50 stars?',
    options: [
      { key: 'A', text: 'One star for each state' },
      { key: 'B', text: 'To represent the 50 amendments to the Constitution' },
      { key: 'C', text: 'To honor 50 years of independence' },
      { key: 'D', text: 'One star for each president' },
    ],
    correctKey: 'A',
  },
  {
    id: 123,
    text: 'What is the name of the national anthem?',
    options: [
      { key: 'A', text: 'America the Beautiful' },
      { key: 'B', text: 'The Star-Spangled Banner' },
      { key: 'C', text: "My Country, 'Tis of Thee" },
      { key: 'D', text: 'God Bless America' },
    ],
    correctKey: 'B',
  },
  {
    id: 124,
    text: 'The Nation\'s first motto was "E Pluribus Unum." What does that mean?',
    options: [
      { key: 'A', text: 'Out of many, one' },
      { key: 'B', text: 'In God we trust' },
      { key: 'C', text: 'Freedom and justice for all' },
      { key: 'D', text: 'United we stand' },
    ],
    correctKey: 'A',
  },
  {
    id: 125,
    text: 'What is Independence Day?',
    options: [
      { key: 'A', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'B', text: 'A holiday to honor people in the U.S. military' },
      { key: 'C', text: 'A holiday to celebrate U.S. independence from Britain' },
      { key: 'D', text: 'A holiday to honor the first president' },
    ],
    correctKey: 'C',
  },
  {
    id: 126,
    text: 'Name three national U.S. holidays.',
    options: [
      { key: 'A', text: 'Thanksgiving Day, Independence Day, and Veterans Day' },
      { key: 'B', text: "Super Bowl Sunday, St. Patrick's Day, and Valentine's Day" },
      { key: 'C', text: 'Groundhog Day, Tax Day, and Election Day' },
      { key: 'D', text: "Mother's Day, Father's Day, and Arbor Day" },
    ],
    correctKey: 'A',
    isAsterisk: true,
  },
  {
    id: 127,
    text: 'What is Memorial Day?',
    options: [
      { key: 'A', text: 'A holiday to celebrate U.S. independence' },
      { key: 'B', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'C', text: 'A holiday to honor all people in the U.S. military' },
      { key: 'D', text: 'A holiday to remember the founding fathers' },
    ],
    correctKey: 'B',
  },
  {
    id: 128,
    text: 'What is Veterans Day?',
    options: [
      { key: 'A', text: 'A holiday to celebrate U.S. independence from Britain' },
      { key: 'B', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'C', text: 'A holiday to honor people in the U.S. military' },
      { key: 'D', text: 'A holiday to remember the Civil War' },
    ],
    correctKey: 'C',
  },
];
