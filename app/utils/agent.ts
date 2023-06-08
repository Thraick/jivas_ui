export const agent = {
  jid: "urn:uuid:adbc1b52-ff09-4b61-a750-9b43ce7b11a0",
  published: true,
  name: "Agent X",
  description: "This is classified",
  intent_confidence: 0.3,
  entity_confidence: 0.1,
  sentiment_confidence: 0.1,
  response_confidence: 0.1,
  states: [
    {
      type: "state",
      name: "greet",
      published: true,
      prompts: ["Hi", "Hello", "Hiya"],
      replies: [],
      state_responses: [
        {
          type: "response",
          published: true,
          text: "Hello, how may I help you?",
        },
        {
          type: "response",
          published: true,
          text: "I'm Eldon Marks. I'm the inventor of TrueSelph and I'd be happy to answer any questions about the product that you may have.",
        },
      ],
    },
    {
      type: "qa_state",
      name: "what_is_it",
      published: true,
      prompts: [
        "Can you explain how the product functions in more detail",
        "What is true self",
        "What's it all about",
        "How can I use it",
      ],
      replies: [],
      state_responses: [
        {
          type: "qa_response",
          published: true,
          text: "TrueSelph allows you to create an interactive version of yourself to put on your website, mobile app, or kiosk so you can truly connect with people in an infinitely scalable way.",
        },
        {
          type: "qa_response",
          published: true,
          text: "There are so many ways that you can use TrueSelph, but I'd recommend you use it to boost sales and brand awareness as you drive engagements and increase conversion rates. You can put your customer sales rep on your website, mobile app, or kiosk to offer that next-gen experience for visitors, just like what they did to me.",
        },
      ],
    },
    {
      type: "qa_state",
      name: "demonstration",
      published: true,
      prompts: [
        "Can you give me a demonstration of how it works?",
        "Show me how it works",
        "I'd like to see it",
      ],
      replies: [],
      state_responses: [
        {
          type: "qa_response",
          published: true,
          text: "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end.",
        },
        {
          type: "qa_response",
          published: true,
          text: "You're looking at it..",
        },
      ],
    },
    {
      type: "state",
      name: "goodbye",
      published: true,
      prompts: [
        "Bye",
        "Talk to you later",
        "Goodbye",
        "See you later, have a great day!",
      ],
      replies: [],
      state_responses: [
        {
          type: "qa_response",
          published: true,
          text: "It was nice chatting with you.",
        },
        {
          type: "qa_response",
          published: true,
          text: "See you later, it was nice talking to you.",
        },
      ],
    },
    {
      type: "ner_state",
      name: "handle_introduction",
      published: true,
      prompts: [
        "My name is John Doe what it yours?",
        "I am Janet",
        "They call me Marcus Webley",
      ],
      replies: [],
      entity_set: ["name"],
      training_data: [
        "My name is [Marcus Webley](name)",
        "They call me [John Doe](name)",
        "I'm [Margaret Fraser](name)",
        "[Jonathan](name) is my name",
      ],
      state_responses: [
        {
          type: "ner_response",
          entity_set: ["name"],
          published: true,
          template: "It's nice to meet you {{name}}. Where do you live?",
          transition_state: "where_do_you_live",
        },
      ],
    },
    {
      type: "ner_state",
      name: "where_do_you_live",
      competency: "handle_introduction",
      published: true,
      prompts: [],
      replies: [],
      entity_set: ["address"],
      training_data: [
        "I live at [223 Wren Lane](address)",
        "Oh I'm from [Guyana](address)",
        "I live over at [Floral Park, North Ruimveldt]](address)",
        "[123 Peaceful Lane](address)",
      ],
      state_responses: [
        {
          type: "ner_response",
          entity_set: ["address"],
          published: true,
          template: "It's nice to know that you live in {{address}}",
        },
      ],
    },
    {
      type: "state",
      name: "send_message",
      published: true,
      prompts: [
        "I would like to send a message",
        "Allow me to send a message",
        "Send a message",
      ],
      replies: [],
      state_responses: [
        {
          type: "response",
          published: true,
          text: "Who would you like to send it to?",
          transition_state: "prompt_for_message_contact",
        },
        {
          type: "response",
          published: true,
          text: "Sure, who is it going to?",
          transition_state: "prompt_for_message_contact",
        },
      ],
    },
    {
      type: "ner_state",
      name: "prompt_for_message_contact",
      competency: "send_message",
      published: true,
      prompts: [],
      replies: [],
      entity_set: ["contact"],
      training_data: [
        "[Cindy August](contact)",
        "I would like to send it to [Eldon Marks](contact)",
        "Send it to [Dora](contact)",
      ],
      state_responses: [
        {
          type: "ner_response",
          entity_set: ["contact"],
          published: true,
          template: "What message would you like to send to {{contact}}?",
          transition_state: "compose_message_body",
        },
      ],
    },
    {
      type: "ner_state",
      name: "compose_message_body",
      competency: "send_message",
      published: true,
      prompts: [],
      replies: [],
      entity_set: ["message"],
      training_data: [
        "This is my message [can you pick up groceries](message)",
        "Tell him that [this is a good bit of things to say](message)",
        "[Making my way down town coming back home](message)",
      ],
      state_responses: [
        {
          type: "ner_response",
          entity_set: ["message"],
          published: true,
          template: "Got it, ready to send message? {{message}}",
          transition_state: "confirm_message_send",
        },
      ],
    },
    {
      type: "qa_state",
      name: "confirm_message_send",
      competency: "send_message",
      published: true,
      prompts: [
        "Yes",
        "Sure",
        "Nevermind",
        "Yep please send it",
        "Send it",
        "Don't send it",
      ],
      replies: [],
      state_responses: [
        {
          type: "qa_response",
          published: true,
          text: "Ok, I'll forget it",
        },
        {
          type: "qa_response",
          published: true,
          text: "Affirmative, your message was sent",
        },
      ],
    },
    {
      type: "state",
      name: "confused",
      published: true,
      prompts: [],
      replies: [],
      state_responses: [
        {
          type: "response",
          published: true,
          text: "Hmm.. I'm not sure I can help with that one",
        },
        {
          type: "response",
          published: true,
          text: "I'm sorry, I'm not sure.",
        },
      ],
    },
  ],
};

export type Agent = typeof agent;
