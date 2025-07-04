export interface Quote {
  text: string;
  author: string;
  topic: string;
}

export const quotesDatabase: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    topic: "motivation",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    topic: "motivation",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    topic: "motivation",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    topic: "motivation",
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "Albert Schweitzer",
    topic: "success",
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    topic: "success",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    topic: "success",
  },
  {
    text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett",
    topic: "success",
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    topic: "wisdom",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    topic: "wisdom",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    topic: "wisdom",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    topic: "wisdom",
  },
  {
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    author: "Lao Tzu",
    topic: "love",
  },
  {
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
    topic: "love",
  },
  {
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Unknown",
    topic: "love",
  },
  {
    text: "Where there is love there is life.",
    author: "Mahatma Gandhi",
    topic: "love",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    topic: "happiness",
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    topic: "happiness",
  },
  {
    text: "Happiness is when what you think, what you say, and what you do are in harmony.",
    author: "Mahatma Gandhi",
    topic: "happiness",
  },
  {
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius",
    topic: "happiness",
  },
  {
    text: "A leader is one who knows the way, goes the way, and shows the way.",
    author: "John C. Maxwell",
    topic: "leadership",
  },
  {
    text: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",
    author: "Ronald Reagan",
    topic: "leadership",
  },
  {
    text: "Leadership is not about being in charge. It's about taking care of those in your charge.",
    author: "Simon Sinek",
    topic: "leadership",
  },
  {
    text: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others.",
    author: "Jack Welch",
    topic: "leadership",
  },
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    topic: "creativity",
  },
  {
    text: "The creative adult is the child who survived.",
    author: "Ursula K. Le Guin",
    topic: "creativity",
  },
  {
    text: "Creativity takes courage.",
    author: "Henri Matisse",
    topic: "creativity",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    topic: "creativity",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    topic: "perseverance",
  },
  {
    text: "Perseverance is not a long race; it is many short races one after the other.",
    author: "Walter Elliot",
    topic: "perseverance",
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
    topic: "perseverance",
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
    topic: "perseverance",
  },
];

export function getQuotesByTopic(topic: string): Quote[] {
  const normalizedTopic = topic.toLowerCase().trim();
  const exactMatches = quotesDatabase.filter(
    (quote) => quote.topic.toLowerCase() === normalizedTopic
  );
  if (exactMatches.length >= 3) {
    return exactMatches.slice(0, 3);
  }
  const partialMatches = quotesDatabase.filter(
    (quote) =>
      quote.topic.toLowerCase().includes(normalizedTopic) ||
      quote.text.toLowerCase().includes(normalizedTopic) ||
      quote.author.toLowerCase().includes(normalizedTopic)
  );
  const allMatches = [...exactMatches, ...partialMatches];
  const uniqueMatches = allMatches.filter(
    (quote, index, self) =>
      index ===
      self.findIndex((q) => q.text === quote.text && q.author === quote.author)
  );
  return uniqueMatches.slice(0, 3);
}

export function getAllTopics(): string[] {
  const topics = [...new Set(quotesDatabase.map((quote) => quote.topic))];
  return topics.sort();
}
