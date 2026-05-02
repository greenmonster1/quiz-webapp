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
  { minPct: 80, message: "Excellent! You're a trivia master! 🇺🇸" },
  { minPct: 50, message: 'Good effort! Keep practicing. 💪' },
  { minPct:  0, message: "Keep studying — you'll get there! 📚" },
];

export const QUESTION_BANK = new InjectionToken<QuizQuestion[]>('QUESTION_BANK', {
  providedIn: 'root',
  factory: () => CIVICS_QUESTION_BANK,
});

// Source: USCIS 2025 Civics Test (128 questions, M-1778 09/25)
// Omitted: Q23, Q29, Q61, Q62 (answers vary by state/district)
// Q30, Q38, Q39, Q57: hardcoded to current officeholders as of 2025
// isAsterisk: true marks the 20 questions eligible for the 65+/20-year exemption
export const CIVICS_QUESTION_BANK: QuizQuestion[] = [
  // ── A: Principles of American Government ───────────────────────────────
  {
    id: 1,
    text: 'What is the form of government of the United States?',
    options: [
      { key: 'A', text: 'Republic' },
      { key: 'B', text: 'Monarchy' },
      { key: 'C', text: 'Oligarchy' },
      { key: 'D', text: 'Theocracy' },
    ],
    correctKey: 'A',
  },
  {
    id: 2,
    text: 'What is the supreme law of the land?',
    options: [
      { key: 'A', text: 'The Declaration of Independence' },
      { key: 'B', text: 'The Bill of Rights' },
      { key: 'C', text: 'The U.S. Constitution' },
      { key: 'D', text: 'The Federalist Papers' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 3,
    text: 'Name one thing the U.S. Constitution does.',
    options: [
      { key: 'A', text: 'Declares independence from Britain' },
      { key: 'B', text: 'Protects the rights of the people' },
      { key: 'C', text: 'Establishes the military draft' },
      { key: 'D', text: 'Creates political parties' },
    ],
    correctKey: 'B',
  },
  {
    id: 4,
    text: 'The U.S. Constitution starts with "We the People." What does that mean?',
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
      { key: 'B', text: 'By Supreme Court ruling' },
      { key: 'C', text: 'By popular referendum' },
      { key: 'D', text: 'Through the amendment process' },
    ],
    correctKey: 'D',
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
      { key: 'B', text: 'It says America is free from British control' },
      { key: 'C', text: 'It established the Supreme Court' },
      { key: 'D', text: 'It gave women the right to vote' },
    ],
    correctKey: 'B',
  },
  {
    id: 9,
    text: 'What founding document said the American colonies were free from Britain?',
    options: [
      { key: 'A', text: 'U.S. Constitution' },
      { key: 'B', text: 'Bill of Rights' },
      { key: 'C', text: 'Declaration of Independence' },
      { key: 'D', text: 'Federalist Papers' },
    ],
    correctKey: 'C',
  },
  {
    id: 10,
    text: 'Which of the following is an important idea found in the Declaration of Independence and the U.S. Constitution?',
    options: [
      { key: 'A', text: 'Equality' },
      { key: 'B', text: 'Monarchy' },
      { key: 'C', text: 'Manifest Destiny' },
      { key: 'D', text: 'Isolationism' },
    ],
    correctKey: 'A',
  },
  {
    id: 11,
    text: 'The words "Life, Liberty, and the pursuit of Happiness" are in what founding document?',
    options: [
      { key: 'A', text: 'U.S. Constitution' },
      { key: 'B', text: 'Bill of Rights' },
      { key: 'C', text: 'Federalist Papers' },
      { key: 'D', text: 'Declaration of Independence' },
    ],
    correctKey: 'D',
  },
  {
    id: 12,
    text: 'What is the economic system of the United States?',
    options: [
      { key: 'A', text: 'Socialism' },
      { key: 'B', text: 'Capitalism' },
      { key: 'C', text: 'Communism' },
      { key: 'D', text: 'Feudalism' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 13,
    text: 'What is the rule of law?',
    options: [
      { key: 'A', text: 'The government is above the law' },
      { key: 'B', text: 'Only military leaders must obey the law' },
      { key: 'C', text: 'No one is above the law' },
      { key: 'D', text: 'Laws apply only to citizens, not leaders' },
    ],
    correctKey: 'C',
  },
  {
    id: 14,
    text: 'Many documents influenced the U.S. Constitution. Name one.',
    options: [
      { key: 'A', text: 'Emancipation Proclamation' },
      { key: 'B', text: 'Monroe Doctrine' },
      { key: 'C', text: 'Federalist Papers' },
      { key: 'D', text: 'Marshall Plan' },
    ],
    correctKey: 'C',
  },
  {
    id: 15,
    text: 'There are three branches of government. Why?',
    options: [
      { key: 'A', text: 'To give the president more power' },
      { key: 'B', text: 'So one part does not become too powerful' },
      { key: 'C', text: 'To allow states to govern themselves' },
      { key: 'D', text: 'To speed up the lawmaking process' },
    ],
    correctKey: 'B',
  },
  // ── B: System of Government ────────────────────────────────────────────
  {
    id: 16,
    text: 'Name the three branches of government.',
    options: [
      { key: 'A', text: 'Executive, military, and judicial' },
      { key: 'B', text: 'Legislative, executive, and judicial' },
      { key: 'C', text: 'Federal, state, and local' },
      { key: 'D', text: 'Senate, House, and president' },
    ],
    correctKey: 'B',
  },
  {
    id: 17,
    text: 'The President of the United States is in charge of which branch of government?',
    options: [
      { key: 'A', text: 'Legislative branch' },
      { key: 'B', text: 'Judicial branch' },
      { key: 'C', text: 'Executive branch' },
      { key: 'D', text: 'Military branch' },
    ],
    correctKey: 'C',
  },
  {
    id: 18,
    text: 'What part of the federal government writes laws?',
    options: [
      { key: 'A', text: 'The Supreme Court' },
      { key: 'B', text: 'The President' },
      { key: 'C', text: 'The Cabinet' },
      { key: 'D', text: 'U.S. Congress' },
    ],
    correctKey: 'D',
  },
  {
    id: 19,
    text: 'What are the two parts of the U.S. Congress?',
    options: [
      { key: 'A', text: 'The Senate and the Supreme Court' },
      { key: 'B', text: 'The House and the Cabinet' },
      { key: 'C', text: 'The Senate and House of Representatives' },
      { key: 'D', text: 'The President and the Senate' },
    ],
    correctKey: 'C',
  },
  {
    id: 20,
    text: 'Name one power of the U.S. Congress.',
    options: [
      { key: 'A', text: 'Appoints federal judges' },
      { key: 'B', text: 'Declares war' },
      { key: 'C', text: 'Signs bills into law' },
      { key: 'D', text: 'Commands the military' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 21,
    text: 'How many U.S. senators are there?',
    options: [
      { key: 'A', text: 'Fifty (50)' },
      { key: 'B', text: 'Four hundred thirty-five (435)' },
      { key: 'C', text: 'One hundred (100)' },
      { key: 'D', text: 'Two hundred (200)' },
    ],
    correctKey: 'C',
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
  // Q23 skipped (answers vary by state)
  {
    id: 24,
    text: 'How many voting members are in the House of Representatives?',
    options: [
      { key: 'A', text: 'One hundred (100)' },
      { key: 'B', text: 'Two hundred (200)' },
      { key: 'C', text: 'Five hundred (500)' },
      { key: 'D', text: 'Four hundred thirty-five (435)' },
    ],
    correctKey: 'D',
  },
  {
    id: 25,
    text: 'How long is a term for a member of the House of Representatives?',
    options: [
      { key: 'A', text: 'Two (2) years' },
      { key: 'B', text: 'Four (4) years' },
      { key: 'C', text: 'Six (6) years' },
      { key: 'D', text: 'Eight (8) years' },
    ],
    correctKey: 'A',
  },
  {
    id: 26,
    text: 'Why do U.S. representatives serve shorter terms than U.S. senators?',
    options: [
      { key: 'A', text: 'To reduce the number of elections' },
      { key: 'B', text: 'To give them less power than senators' },
      { key: 'C', text: 'To more closely follow public opinion' },
      { key: 'D', text: 'Because the Constitution requires it for budget reasons' },
    ],
    correctKey: 'C',
  },
  {
    id: 27,
    text: 'How many senators does each state have?',
    options: [
      { key: 'A', text: 'One (1)' },
      { key: 'B', text: 'Two (2)' },
      { key: 'C', text: 'Three (3)' },
      { key: 'D', text: 'Varies by population' },
    ],
    correctKey: 'B',
  },
  {
    id: 28,
    text: 'Why does each state have two senators?',
    options: [
      { key: 'A', text: 'To match the number of representatives' },
      { key: 'B', text: 'Because the president appoints one per state' },
      { key: 'C', text: 'Equal representation — the Great Compromise' },
      { key: 'D', text: 'To balance the Supreme Court' },
    ],
    correctKey: 'C',
  },
  // Q29 skipped (answers vary by district)
  {
    id: 30,
    text: 'What is the name of the Speaker of the House of Representatives now?',
    options: [
      { key: 'A', text: 'Chuck Schumer' },
      { key: 'B', text: 'Mike Johnson' },
      { key: 'C', text: 'Mitch McConnell' },
      { key: 'D', text: 'Kevin McCarthy' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 31,
    text: 'Who does a U.S. senator represent?',
    options: [
      { key: 'A', text: 'Only the voters who elected them' },
      { key: 'B', text: 'Citizens of their state' },
      { key: 'C', text: 'The entire United States' },
      { key: 'D', text: 'Their political party' },
    ],
    correctKey: 'B',
  },
  {
    id: 32,
    text: 'Who elects U.S. senators?',
    options: [
      { key: 'A', text: 'The president' },
      { key: 'B', text: 'State legislatures' },
      { key: 'C', text: 'Citizens from their state' },
      { key: 'D', text: 'The Electoral College' },
    ],
    correctKey: 'C',
  },
  {
    id: 33,
    text: 'Who does a member of the House of Representatives represent?',
    options: [
      { key: 'A', text: 'Citizens of their entire state' },
      { key: 'B', text: 'Citizens in their congressional district' },
      { key: 'C', text: 'All U.S. citizens equally' },
      { key: 'D', text: 'Citizens of neighboring states' },
    ],
    correctKey: 'B',
  },
  {
    id: 34,
    text: 'Who elects members of the House of Representatives?',
    options: [
      { key: 'A', text: 'State governors' },
      { key: 'B', text: 'The Senate' },
      { key: 'C', text: 'Citizens from their congressional district' },
      { key: 'D', text: 'The Electoral College' },
    ],
    correctKey: 'C',
  },
  {
    id: 35,
    text: 'Some states have more representatives than other states. Why?',
    options: [
      { key: 'A', text: 'Because some states have been in the union longer' },
      { key: 'B', text: 'Because of the state\'s population' },
      { key: 'C', text: 'Because some states pay more federal taxes' },
      { key: 'D', text: 'Because the president appoints additional representatives' },
    ],
    correctKey: 'B',
  },
  {
    id: 36,
    text: 'The President of the United States is elected for how many years?',
    options: [
      { key: 'A', text: 'Two (2) years' },
      { key: 'B', text: 'Six (6) years' },
      { key: 'C', text: 'Eight (8) years' },
      { key: 'D', text: 'Four (4) years' },
    ],
    correctKey: 'D',
    isAsterisk: true,
  },
  {
    id: 37,
    text: 'The President of the United States can serve only two terms. Why?',
    options: [
      { key: 'A', text: 'Because of the 22nd Amendment' },
      { key: 'B', text: 'Because of the 25th Amendment' },
      { key: 'C', text: 'Because of the Bill of Rights' },
      { key: 'D', text: 'Because of a Supreme Court ruling' },
    ],
    correctKey: 'A',
  },
  {
    id: 38,
    text: 'What is the name of the President of the United States now?',
    options: [
      { key: 'A', text: 'Joe Biden' },
      { key: 'B', text: 'Barack Obama' },
      { key: 'C', text: 'Donald Trump' },
      { key: 'D', text: 'George W. Bush' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 39,
    text: 'What is the name of the Vice President of the United States now?',
    options: [
      { key: 'A', text: 'Mike Pence' },
      { key: 'B', text: 'Kamala Harris' },
      { key: 'C', text: 'Tim Walz' },
      { key: 'D', text: 'JD Vance' },
    ],
    correctKey: 'D',
    isAsterisk: true,
  },
  {
    id: 40,
    text: 'If the president can no longer serve, who becomes president?',
    options: [
      { key: 'A', text: 'The Speaker of the House' },
      { key: 'B', text: 'The Secretary of State' },
      { key: 'C', text: 'The Vice President' },
      { key: 'D', text: 'The Senate Majority Leader' },
    ],
    correctKey: 'C',
  },
  {
    id: 41,
    text: 'Name one power of the president.',
    options: [
      { key: 'A', text: 'Overrules Supreme Court decisions' },
      { key: 'B', text: 'Writes and passes laws' },
      { key: 'C', text: 'Signs bills into law' },
      { key: 'D', text: 'Elects Supreme Court justices' },
    ],
    correctKey: 'C',
  },
  {
    id: 42,
    text: 'Who is Commander in Chief of the U.S. military?',
    options: [
      { key: 'A', text: 'The Secretary of Defense' },
      { key: 'B', text: 'The Chairman of the Joint Chiefs of Staff' },
      { key: 'C', text: 'The Vice President' },
      { key: 'D', text: 'The President' },
    ],
    correctKey: 'D',
  },
  {
    id: 43,
    text: 'Who signs bills to become laws?',
    options: [
      { key: 'A', text: 'The Speaker of the House' },
      { key: 'B', text: 'The Senate Majority Leader' },
      { key: 'C', text: 'The President' },
      { key: 'D', text: 'The Chief Justice' },
    ],
    correctKey: 'C',
  },
  {
    id: 44,
    text: 'Who vetoes bills?',
    options: [
      { key: 'A', text: 'The Supreme Court' },
      { key: 'B', text: 'The Senate' },
      { key: 'C', text: 'The President' },
      { key: 'D', text: 'The House of Representatives' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 45,
    text: 'Who appoints federal judges?',
    options: [
      { key: 'A', text: 'The Senate' },
      { key: 'B', text: 'The House of Representatives' },
      { key: 'C', text: 'The Vice President' },
      { key: 'D', text: 'The President' },
    ],
    correctKey: 'D',
  },
  {
    id: 46,
    text: 'The executive branch has many parts. Name one.',
    options: [
      { key: 'A', text: 'Supreme Court' },
      { key: 'B', text: 'Senate' },
      { key: 'C', text: 'Cabinet' },
      { key: 'D', text: 'House of Representatives' },
    ],
    correctKey: 'C',
  },
  {
    id: 47,
    text: 'What does the President\'s Cabinet do?',
    options: [
      { key: 'A', text: 'Writes laws for the president to sign' },
      { key: 'B', text: 'Oversees federal elections' },
      { key: 'C', text: 'Advises the President' },
      { key: 'D', text: 'Commands the military' },
    ],
    correctKey: 'C',
  },
  {
    id: 48,
    text: 'Which of the following is a Cabinet-level position?',
    options: [
      { key: 'A', text: 'Chief Justice of the Supreme Court' },
      { key: 'B', text: 'Secretary of State' },
      { key: 'C', text: 'Speaker of the House' },
      { key: 'D', text: 'Senate Majority Leader' },
    ],
    correctKey: 'B',
  },
  {
    id: 49,
    text: 'Why is the Electoral College important?',
    options: [
      { key: 'A', text: 'It directly elects members of Congress' },
      { key: 'B', text: 'It provides a compromise between popular and congressional selection of the president' },
      { key: 'C', text: 'It appoints Supreme Court justices' },
      { key: 'D', text: 'It approves the federal budget' },
    ],
    correctKey: 'B',
  },
  {
    id: 50,
    text: 'What is one part of the judicial branch?',
    options: [
      { key: 'A', text: 'The Cabinet' },
      { key: 'B', text: 'The Senate' },
      { key: 'C', text: 'The Supreme Court' },
      { key: 'D', text: 'The Department of Justice' },
    ],
    correctKey: 'C',
  },
  {
    id: 51,
    text: 'What does the judicial branch do?',
    options: [
      { key: 'A', text: 'Writes new laws for Congress to pass' },
      { key: 'B', text: 'Reviews laws to decide if they are constitutional' },
      { key: 'C', text: 'Enforces laws through the police' },
      { key: 'D', text: 'Approves the federal budget' },
    ],
    correctKey: 'B',
  },
  {
    id: 52,
    text: 'What is the highest court in the United States?',
    options: [
      { key: 'A', text: 'The Court of Appeals' },
      { key: 'B', text: 'The District Court' },
      { key: 'C', text: 'The Supreme Court' },
      { key: 'D', text: 'The Federal Circuit Court' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 53,
    text: 'How many seats are on the Supreme Court?',
    options: [
      { key: 'A', text: 'Seven (7)' },
      { key: 'B', text: 'Eleven (11)' },
      { key: 'C', text: 'Five (5)' },
      { key: 'D', text: 'Nine (9)' },
    ],
    correctKey: 'D',
  },
  {
    id: 54,
    text: 'How many Supreme Court justices are usually needed to decide a case?',
    options: [
      { key: 'A', text: 'Three (3)' },
      { key: 'B', text: 'Five (5)' },
      { key: 'C', text: 'Seven (7)' },
      { key: 'D', text: 'Nine (9)' },
    ],
    correctKey: 'B',
  },
  {
    id: 55,
    text: 'How long do Supreme Court justices serve?',
    options: [
      { key: 'A', text: 'Four (4) years' },
      { key: 'B', text: 'Ten (10) years' },
      { key: 'C', text: 'For life' },
      { key: 'D', text: 'Six (6) years' },
    ],
    correctKey: 'C',
  },
  {
    id: 56,
    text: 'Supreme Court justices serve for life. Why?',
    options: [
      { key: 'A', text: 'To reward distinguished legal service' },
      { key: 'B', text: 'Because the Constitution requires a minimum of 30 years' },
      { key: 'C', text: 'To be independent of politics' },
      { key: 'D', text: 'To match the terms of U.S. senators' },
    ],
    correctKey: 'C',
  },
  {
    id: 57,
    text: 'Who is the Chief Justice of the United States now?',
    options: [
      { key: 'A', text: 'Sonia Sotomayor' },
      { key: 'B', text: 'Clarence Thomas' },
      { key: 'C', text: 'Samuel Alito' },
      { key: 'D', text: 'John Roberts' },
    ],
    correctKey: 'D',
  },
  {
    id: 58,
    text: 'Name one power that is only for the federal government.',
    options: [
      { key: 'A', text: 'Give driver\'s licenses' },
      { key: 'B', text: 'Provide fire departments' },
      { key: 'C', text: 'Declare war' },
      { key: 'D', text: 'Approve zoning laws' },
    ],
    correctKey: 'C',
  },
  {
    id: 59,
    text: 'Name one power that is only for the states.',
    options: [
      { key: 'A', text: 'Print paper money' },
      { key: 'B', text: 'Declare war' },
      { key: 'C', text: 'Make treaties with foreign nations' },
      { key: 'D', text: 'Give a driver\'s license' },
    ],
    correctKey: 'D',
  },
  {
    id: 60,
    text: 'What is the purpose of the 10th Amendment?',
    options: [
      { key: 'A', text: 'It abolished slavery' },
      { key: 'B', text: 'It gave women the right to vote' },
      { key: 'C', text: 'It established the Supreme Court' },
      { key: 'D', text: 'Powers not given to the federal government belong to the states or the people' },
    ],
    correctKey: 'D',
  },
  // Q61 skipped (governor — answers vary by state)
  // Q62 skipped (state capital — answers vary by state)
  // ── C: Rights and Responsibilities ────────────────────────────────────
  {
    id: 63,
    text: 'Which of the following describes one of the four amendments about voting rights in the U.S. Constitution?',
    options: [
      { key: 'A', text: 'Only property owners may vote' },
      { key: 'B', text: 'Citizens eighteen (18) and older can vote' },
      { key: 'C', text: 'Only men born in the United States may vote' },
      { key: 'D', text: 'Senators appoint eligible voters in their states' },
    ],
    correctKey: 'B',
  },
  {
    id: 64,
    text: 'Who can vote in federal elections, run for federal office, and serve on a jury in the United States?',
    options: [
      { key: 'A', text: 'Any resident, including non-citizens' },
      { key: 'B', text: 'Only people born in the United States' },
      { key: 'C', text: 'U.S. citizens' },
      { key: 'D', text: 'Anyone over the age of 21' },
    ],
    correctKey: 'C',
  },
  {
    id: 65,
    text: 'Which of the following is a right of everyone living in the United States?',
    options: [
      { key: 'A', text: 'Freedom of speech' },
      { key: 'B', text: 'The right to vote in all elections' },
      { key: 'C', text: 'The right to hold federal office' },
      { key: 'D', text: 'The right to receive government benefits' },
    ],
    correctKey: 'A',
  },
  {
    id: 66,
    text: 'What do we show loyalty to when we say the Pledge of Allegiance?',
    options: [
      { key: 'A', text: 'The president' },
      { key: 'B', text: 'The Constitution' },
      { key: 'C', text: 'The military' },
      { key: 'D', text: 'The United States' },
    ],
    correctKey: 'D',
    isAsterisk: true,
  },
  {
    id: 67,
    text: 'Which of the following is a promise new citizens make in the Oath of Allegiance?',
    options: [
      { key: 'A', text: 'Give up loyalty to other countries' },
      { key: 'B', text: 'Pay a citizenship tax each year' },
      { key: 'C', text: 'Serve at least two years in the military' },
      { key: 'D', text: 'Learn a second language within five years' },
    ],
    correctKey: 'A',
  },
  {
    id: 68,
    text: 'How can people become United States citizens?',
    options: [
      { key: 'A', text: 'By living in the U.S. for 10 years without a visa' },
      { key: 'B', text: 'By paying a citizenship fee to the president' },
      { key: 'C', text: 'Through naturalization' },
      { key: 'D', text: 'By automatically gaining citizenship when marrying a U.S. citizen' },
    ],
    correctKey: 'C',
  },
  {
    id: 69,
    text: 'Which of the following is an example of civic participation in the United States?',
    options: [
      { key: 'A', text: 'Avoiding jury duty' },
      { key: 'B', text: 'Voting' },
      { key: 'C', text: 'Refusing to pay taxes' },
      { key: 'D', text: 'Moving to a different state' },
    ],
    correctKey: 'B',
  },
  {
    id: 70,
    text: 'What is one way Americans can serve their country?',
    options: [
      { key: 'A', text: 'Avoid all political activity' },
      { key: 'B', text: 'Move to Washington, D.C.' },
      { key: 'C', text: 'Pay taxes' },
      { key: 'D', text: 'Own property in multiple states' },
    ],
    correctKey: 'C',
  },
  {
    id: 71,
    text: 'Why is it important to pay federal taxes?',
    options: [
      { key: 'A', text: 'To fund state governments only' },
      { key: 'B', text: 'To pay for the president\'s salary only' },
      { key: 'C', text: 'It is required by law to fund the federal government' },
      { key: 'D', text: 'To support international aid programs exclusively' },
    ],
    correctKey: 'C',
  },
  {
    id: 72,
    text: 'Why is it important for men ages 18–25 to register for the Selective Service?',
    options: [
      { key: 'A', text: 'To receive a driver\'s license' },
      { key: 'B', text: 'To qualify for federal student loans' },
      { key: 'C', text: 'It is required by law' },
      { key: 'D', text: 'To become eligible to vote' },
    ],
    correctKey: 'C',
  },
  // ── A: Colonial Period and Independence ───────────────────────────────
  {
    id: 73,
    text: 'The colonists came to America for many reasons. Name one.',
    options: [
      { key: 'A', text: 'To escape cold European winters' },
      { key: 'B', text: 'To find gold and silver for the king' },
      { key: 'C', text: 'Religious freedom' },
      { key: 'D', text: 'To establish trade routes with Asia' },
    ],
    correctKey: 'C',
  },
  {
    id: 74,
    text: 'Who lived in America before the Europeans arrived?',
    options: [
      { key: 'A', text: 'Spanish colonists' },
      { key: 'B', text: 'African settlers' },
      { key: 'C', text: 'Asian explorers' },
      { key: 'D', text: 'American Indians' },
    ],
    correctKey: 'D',
    isAsterisk: true,
  },
  {
    id: 75,
    text: 'What group of people was taken and sold as slaves?',
    options: [
      { key: 'A', text: 'Native Americans' },
      { key: 'B', text: 'Europeans' },
      { key: 'C', text: 'Africans' },
      { key: 'D', text: 'Asian immigrants' },
    ],
    correctKey: 'C',
  },
  {
    id: 76,
    text: 'What war did the Americans fight to win independence from Britain?',
    options: [
      { key: 'A', text: 'The War of 1812' },
      { key: 'B', text: 'The Civil War' },
      { key: 'C', text: 'The American Revolution' },
      { key: 'D', text: 'The French and Indian War' },
    ],
    correctKey: 'C',
  },
  {
    id: 77,
    text: 'Name one reason why the Americans declared independence from Britain.',
    options: [
      { key: 'A', text: 'Britain refused to trade with the colonies' },
      { key: 'B', text: 'Taxation without representation' },
      { key: 'C', text: 'Britain invaded from Canada' },
      { key: 'D', text: 'The colonies wanted to join France' },
    ],
    correctKey: 'B',
  },
  {
    id: 78,
    text: 'Who wrote the Declaration of Independence?',
    options: [
      { key: 'A', text: 'George Washington' },
      { key: 'B', text: 'Benjamin Franklin' },
      { key: 'C', text: 'John Adams' },
      { key: 'D', text: 'Thomas Jefferson' },
    ],
    correctKey: 'D',
    isAsterisk: true,
  },
  {
    id: 79,
    text: 'When was the Declaration of Independence adopted?',
    options: [
      { key: 'A', text: 'July 4, 1776' },
      { key: 'B', text: 'July 4, 1789' },
      { key: 'C', text: 'July 4, 1787' },
      { key: 'D', text: 'July 4, 1783' },
    ],
    correctKey: 'A',
  },
  {
    id: 80,
    text: 'The American Revolution had many important events. Name one.',
    options: [
      { key: 'A', text: 'The Battle of Gettysburg' },
      { key: 'B', text: 'The Battle of Bunker Hill' },
      { key: 'C', text: 'The Battle of Midway' },
      { key: 'D', text: 'The Battle of the Bulge' },
    ],
    correctKey: 'B',
  },
  {
    id: 81,
    text: 'Which of the following was one of the 13 original states?',
    options: [
      { key: 'A', text: 'Texas' },
      { key: 'B', text: 'California' },
      { key: 'C', text: 'Florida' },
      { key: 'D', text: 'Virginia' },
    ],
    correctKey: 'D',
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
    text: 'The Federalist Papers supported passage of the U.S. Constitution. Name one of the writers.',
    options: [
      { key: 'A', text: 'Thomas Jefferson' },
      { key: 'B', text: 'John Adams' },
      { key: 'C', text: 'James Madison' },
      { key: 'D', text: 'Patrick Henry' },
    ],
    correctKey: 'C',
  },
  {
    id: 84,
    text: 'Why were the Federalist Papers important?',
    options: [
      { key: 'A', text: 'They declared independence from Britain' },
      { key: 'B', text: 'They helped people understand and supported passing the U.S. Constitution' },
      { key: 'C', text: 'They established the Bill of Rights' },
      { key: 'D', text: 'They ended the Revolutionary War' },
    ],
    correctKey: 'B',
  },
  {
    id: 85,
    text: 'Benjamin Franklin is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Led the Continental Army to victory' },
      { key: 'B', text: 'Sole author of the Declaration of Independence' },
      { key: 'C', text: 'First Postmaster General of the United States' },
      { key: 'D', text: 'Drafted the U.S. Constitution alone' },
    ],
    correctKey: 'C',
  },
  {
    id: 86,
    text: 'George Washington is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Wrote the Declaration of Independence' },
      { key: 'B', text: '"Father of Our Country" and first president of the United States' },
      { key: 'C', text: 'Led the Union Army in the Civil War' },
      { key: 'D', text: 'Authored the Bill of Rights' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 87,
    text: 'Thomas Jefferson is famous for many things. Name one.',
    options: [
      { key: 'A', text: '"Father of the Constitution"' },
      { key: 'B', text: 'First Secretary of the Treasury' },
      { key: 'C', text: 'General of the Continental Army' },
      { key: 'D', text: 'Writer of the Declaration of Independence' },
    ],
    correctKey: 'D',
  },
  {
    id: 88,
    text: 'James Madison is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'First president of the United States' },
      { key: 'B', text: '"Father of the Constitution"' },
      { key: 'C', text: 'Author of the Declaration of Independence' },
      { key: 'D', text: 'First Postmaster General of the United States' },
    ],
    correctKey: 'B',
  },
  {
    id: 89,
    text: 'Alexander Hamilton is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Third president of the United States' },
      { key: 'B', text: 'Writer of the Declaration of Independence' },
      { key: 'C', text: 'First Secretary of the Treasury' },
      { key: 'D', text: 'Commander at the Battle of Gettysburg' },
    ],
    correctKey: 'C',
  },
  // ── B: 1800s ──────────────────────────────────────────────────────────
  {
    id: 90,
    text: 'What territory did the United States buy from France in 1803?',
    options: [
      { key: 'A', text: 'Alaska' },
      { key: 'B', text: 'Texas' },
      { key: 'C', text: 'Florida' },
      { key: 'D', text: 'Louisiana Territory' },
    ],
    correctKey: 'D',
  },
  {
    id: 91,
    text: 'Name one war fought by the United States in the 1800s.',
    options: [
      { key: 'A', text: 'World War I' },
      { key: 'B', text: 'World War II' },
      { key: 'C', text: 'The Civil War' },
      { key: 'D', text: 'The Korean War' },
    ],
    correctKey: 'C',
  },
  {
    id: 92,
    text: 'Name the U.S. war between the North and the South.',
    options: [
      { key: 'A', text: 'The Revolutionary War' },
      { key: 'B', text: 'The War of 1812' },
      { key: 'C', text: 'The Civil War' },
      { key: 'D', text: 'The Spanish-American War' },
    ],
    correctKey: 'C',
  },
  {
    id: 93,
    text: 'The Civil War had many important events. Name one.',
    options: [
      { key: 'A', text: 'The Battle of Midway' },
      { key: 'B', text: 'The Emancipation Proclamation' },
      { key: 'C', text: 'D-Day' },
      { key: 'D', text: 'The Battle of the Bulge' },
    ],
    correctKey: 'B',
  },
  {
    id: 94,
    text: 'Abraham Lincoln is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Wrote the Declaration of Independence' },
      { key: 'B', text: 'Led the Continental Army' },
      { key: 'C', text: 'Freed the slaves (Emancipation Proclamation)' },
      { key: 'D', text: '"Father of the Constitution"' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 95,
    text: 'What did the Emancipation Proclamation do?',
    options: [
      { key: 'A', text: 'Ended World War I' },
      { key: 'B', text: 'Gave women the right to vote' },
      { key: 'C', text: 'Freed the slaves' },
      { key: 'D', text: 'Established the Supreme Court' },
    ],
    correctKey: 'C',
  },
  {
    id: 96,
    text: 'What U.S. war ended slavery?',
    options: [
      { key: 'A', text: 'The Revolutionary War' },
      { key: 'B', text: 'The War of 1812' },
      { key: 'C', text: 'World War I' },
      { key: 'D', text: 'The Civil War' },
    ],
    correctKey: 'D',
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
      { key: 'A', text: 'After the Revolutionary War' },
      { key: 'B', text: 'In 1776' },
      { key: 'C', text: 'After the Civil War, with the 15th Amendment (1870)' },
      { key: 'D', text: 'After World War I' },
    ],
    correctKey: 'C',
  },
  {
    id: 99,
    text: 'Name one leader of the women\'s rights movement in the 1800s.',
    options: [
      { key: 'A', text: 'Rosa Parks' },
      { key: 'B', text: 'Eleanor Roosevelt' },
      { key: 'C', text: 'Susan B. Anthony' },
      { key: 'D', text: 'Harriet Beecher Stowe' },
    ],
    correctKey: 'C',
  },
  // ── C: Recent American History ─────────────────────────────────────────
  {
    id: 100,
    text: 'Name one war fought by the United States in the 1900s.',
    options: [
      { key: 'A', text: 'The Civil War' },
      { key: 'B', text: 'The Revolutionary War' },
      { key: 'C', text: 'The War of 1812' },
      { key: 'D', text: 'World War II' },
    ],
    correctKey: 'D',
  },
  {
    id: 101,
    text: 'Why did the United States enter World War I?',
    options: [
      { key: 'A', text: 'Because Japan attacked Pearl Harbor' },
      { key: 'B', text: 'Because Germany attacked U.S. ships' },
      { key: 'C', text: 'To stop the spread of communism' },
      { key: 'D', text: 'Because of a treaty obligation with Japan' },
    ],
    correctKey: 'B',
  },
  {
    id: 102,
    text: 'When did all women get the right to vote?',
    options: [
      { key: 'A', text: '1776' },
      { key: 'B', text: '1865' },
      { key: 'C', text: '1920' },
      { key: 'D', text: '1945' },
    ],
    correctKey: 'C',
  },
  {
    id: 103,
    text: 'What was the Great Depression?',
    options: [
      { key: 'A', text: 'A major military defeat in World War I' },
      { key: 'B', text: 'A period of extreme political corruption' },
      { key: 'C', text: 'The longest economic recession in modern history' },
      { key: 'D', text: 'A natural disaster affecting the Great Plains' },
    ],
    correctKey: 'C',
  },
  {
    id: 104,
    text: 'When did the Great Depression start?',
    options: [
      { key: 'A', text: '1917' },
      { key: 'B', text: '1929' },
      { key: 'C', text: '1933' },
      { key: 'D', text: '1941' },
    ],
    correctKey: 'B',
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
      { key: 'A', text: 'Germany invaded France' },
      { key: 'B', text: 'The Soviet Union attacked Alaska' },
      { key: 'C', text: 'Japan attacked Pearl Harbor' },
      { key: 'D', text: 'To stop communism in Korea' },
    ],
    correctKey: 'C',
  },
  {
    id: 107,
    text: 'Dwight Eisenhower is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'President during the Great Depression' },
      { key: 'B', text: 'Led the Union Army in the Civil War' },
      { key: 'C', text: 'General during World War II' },
      { key: 'D', text: 'Authored the Marshall Plan' },
    ],
    correctKey: 'C',
  },
  {
    id: 108,
    text: 'Who was the United States\' main rival during the Cold War?',
    options: [
      { key: 'A', text: 'China' },
      { key: 'B', text: 'Germany' },
      { key: 'C', text: 'Japan' },
      { key: 'D', text: 'Soviet Union (USSR)' },
    ],
    correctKey: 'D',
  },
  {
    id: 109,
    text: 'During the Cold War, what was one main concern of the United States?',
    options: [
      { key: 'A', text: 'Economic recession' },
      { key: 'B', text: 'Communism' },
      { key: 'C', text: 'Mass immigration' },
      { key: 'D', text: 'Natural disasters' },
    ],
    correctKey: 'B',
  },
  {
    id: 110,
    text: 'Why did the United States enter the Korean War?',
    options: [
      { key: 'A', text: 'To stop the spread of communism' },
      { key: 'B', text: 'Because North Korea attacked Pearl Harbor' },
      { key: 'C', text: 'To protect oil supplies in the region' },
      { key: 'D', text: 'Because of a defense treaty with Japan' },
    ],
    correctKey: 'A',
  },
  {
    id: 111,
    text: 'Why did the United States enter the Vietnam War?',
    options: [
      { key: 'A', text: 'To protect trade routes in the Pacific' },
      { key: 'B', text: 'Because of a direct attack on U.S. soil' },
      { key: 'C', text: 'To stop the spread of communism' },
      { key: 'D', text: 'Because of a United Nations mandate' },
    ],
    correctKey: 'C',
  },
  {
    id: 112,
    text: 'What did the civil rights movement do?',
    options: [
      { key: 'A', text: 'Fought to end the Vietnam War' },
      { key: 'B', text: 'Fought to end racial discrimination' },
      { key: 'C', text: 'Fought for women\'s voting rights' },
      { key: 'D', text: 'Fought for workers\' rights to unionize' },
    ],
    correctKey: 'B',
  },
  {
    id: 113,
    text: 'Martin Luther King, Jr. is famous for many things. Name one.',
    options: [
      { key: 'A', text: 'Led the women\'s suffrage movement' },
      { key: 'B', text: 'First African American president' },
      { key: 'C', text: 'Fought for civil rights and equality for all Americans' },
      { key: 'D', text: 'Wrote the Emancipation Proclamation' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 114,
    text: 'Why did the United States enter the Persian Gulf War?',
    options: [
      { key: 'A', text: 'Because Iraq attacked U.S. ships in the Gulf' },
      { key: 'B', text: 'To stop the spread of communism' },
      { key: 'C', text: 'To force the Iraqi military from Kuwait' },
      { key: 'D', text: 'Because of a terrorist attack on U.S. soil' },
    ],
    correctKey: 'C',
  },
  {
    id: 115,
    text: 'What major event happened on September 11, 2001 in the United States?',
    options: [
      { key: 'A', text: 'The U.S. declared war on the Soviet Union' },
      { key: 'B', text: 'Terrorists attacked the United States' },
      { key: 'C', text: 'A major hurricane struck New York City' },
      { key: 'D', text: 'The U.S. stock market crashed' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 116,
    text: 'Name one U.S. military conflict after the September 11, 2001 attacks.',
    options: [
      { key: 'A', text: 'The Korean War' },
      { key: 'B', text: 'The Vietnam War' },
      { key: 'C', text: 'The Persian Gulf War' },
      { key: 'D', text: 'War in Afghanistan' },
    ],
    correctKey: 'D',
  },
  {
    id: 117,
    text: 'Name one American Indian tribe in the United States.',
    options: [
      { key: 'A', text: 'Aztec' },
      { key: 'B', text: 'Maya' },
      { key: 'C', text: 'Cherokee' },
      { key: 'D', text: 'Inca' },
    ],
    correctKey: 'C',
  },
  {
    id: 118,
    text: 'Name one example of an American innovation.',
    options: [
      { key: 'A', text: 'The steam engine' },
      { key: 'B', text: 'The printing press' },
      { key: 'C', text: 'Landing on the moon' },
      { key: 'D', text: 'The telescope' },
    ],
    correctKey: 'C',
  },
  // ── Symbols and Holidays ───────────────────────────────────────────────
  {
    id: 119,
    text: 'What is the capital of the United States?',
    options: [
      { key: 'A', text: 'New York City' },
      { key: 'B', text: 'Philadelphia' },
      { key: 'C', text: 'Boston' },
      { key: 'D', text: 'Washington, D.C.' },
    ],
    correctKey: 'D',
  },
  {
    id: 120,
    text: 'Where is the Statue of Liberty?',
    options: [
      { key: 'A', text: 'Washington, D.C.' },
      { key: 'B', text: 'Philadelphia, Pennsylvania' },
      { key: 'C', text: 'New York Harbor' },
      { key: 'D', text: 'Boston Harbor' },
    ],
    correctKey: 'C',
  },
  {
    id: 121,
    text: 'Why does the flag have 13 stripes?',
    options: [
      { key: 'A', text: 'For the 13 amendments in the Bill of Rights' },
      { key: 'B', text: 'For the 13 original colonies' },
      { key: 'C', text: 'For the 13 founding fathers' },
      { key: 'D', text: 'For the 13 years of the Revolutionary War' },
    ],
    correctKey: 'B',
    isAsterisk: true,
  },
  {
    id: 122,
    text: 'Why does the flag have 50 stars?',
    options: [
      { key: 'A', text: 'For the 50 largest cities in the United States' },
      { key: 'B', text: 'One star for each state' },
      { key: 'C', text: 'For the 50 years since independence' },
      { key: 'D', text: 'One star for each senator' },
    ],
    correctKey: 'B',
  },
  {
    id: 123,
    text: 'What is the name of the national anthem?',
    options: [
      { key: 'A', text: 'America the Beautiful' },
      { key: 'B', text: 'My Country, \'Tis of Thee' },
      { key: 'C', text: 'The Star-Spangled Banner' },
      { key: 'D', text: 'God Bless America' },
    ],
    correctKey: 'C',
  },
  {
    id: 124,
    text: 'The Nation\'s first motto was "E Pluribus Unum." What does that mean?',
    options: [
      { key: 'A', text: 'Liberty and justice for all' },
      { key: 'B', text: 'In God we trust' },
      { key: 'C', text: 'Out of many, one' },
      { key: 'D', text: 'United we stand' },
    ],
    correctKey: 'C',
  },
  {
    id: 125,
    text: 'What is Independence Day?',
    options: [
      { key: 'A', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'B', text: 'A holiday to honor people currently serving in the military' },
      { key: 'C', text: 'A holiday to celebrate U.S. independence from Britain' },
      { key: 'D', text: 'A holiday to honor the founding fathers\' birthdays' },
    ],
    correctKey: 'C',
  },
  {
    id: 126,
    text: 'Which of the following is a national U.S. holiday?',
    options: [
      { key: 'A', text: 'Super Bowl Sunday' },
      { key: 'B', text: 'Valentine\'s Day' },
      { key: 'C', text: 'Thanksgiving Day' },
      { key: 'D', text: 'Earth Day' },
    ],
    correctKey: 'C',
    isAsterisk: true,
  },
  {
    id: 127,
    text: 'What is Memorial Day?',
    options: [
      { key: 'A', text: 'A holiday to honor people currently serving in the military' },
      { key: 'B', text: 'A holiday to celebrate U.S. independence' },
      { key: 'C', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'D', text: 'A holiday to honor all past presidents' },
    ],
    correctKey: 'C',
  },
  {
    id: 128,
    text: 'What is Veterans Day?',
    options: [
      { key: 'A', text: 'A holiday to honor soldiers who died in military service' },
      { key: 'B', text: 'A holiday to honor people who have served in the U.S. military' },
      { key: 'C', text: 'A holiday to celebrate the end of World War II' },
      { key: 'D', text: 'A holiday to honor the founding fathers' },
    ],
    correctKey: 'B',
  },
];

// Legacy alias — kept so nothing else breaks if imported elsewhere
export const QUIZ_QUESTIONS = CIVICS_QUESTION_BANK;
