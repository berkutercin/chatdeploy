export const mockConversations = [
  {
    id: 1,
    title: 'Welcome Chat',
    lastMessage: 'Hello! How can I help you today?',
    timestamp: '2 min ago'
  },
  {
    id: 2,
    title: 'Project Discussion',
    lastMessage: 'Let me help you with that project',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    title: 'Code Review',
    lastMessage: 'The code looks good overall',
    timestamp: '3 hours ago'
  },
  {
    id: 4,
    title: 'Design Ideas',
    lastMessage: 'Here are some design suggestions',
    timestamp: 'Yesterday'
  }
];

export const mockMessages = {
  1: [
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'ai',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: 'I need help with a project',
      sender: 'user',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      text: "I'd be happy to help you with your project! Could you tell me more about what you're working on?",
      sender: 'ai',
      timestamp: '10:31 AM'
    }
  ],
  2: [
    {
      id: 1,
      text: 'Can you review my code?',
      sender: 'user',
      timestamp: '9:15 AM'
    },
    {
      id: 2,
      text: 'Of course! Please share the code you\'d like me to review.',
      sender: 'ai',
      timestamp: '9:15 AM'
    }
  ],
  3: [],
  4: []
};