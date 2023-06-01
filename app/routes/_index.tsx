import type { V2_MetaFunction } from "@remix-run/node";
import { Button } from "components/ui/button";
import { TypeOf, boolean, z } from "zod";
import FSidebar from "./fbsidebar";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Home" }];
};

export default function Index() {
  const formValues = {
    published: true
  }

  const ww = true;
  const qq = "true"

  const www = z.coerce.boolean().parse(ww); // => true
  const qqq = z.coerce.boolean().parse(qq); // => true



  return (
    <>

      {/* <div>hello</div> */}
      {/* <FSidebar /> */}
      {/* <h1>{www} ww</h1>
    <h1>{qqq} qq</h1>
      {formValues.published ? <label className="relative inline-flex items-center cursor-pointer ">
        <input
          name="published"
          type="checkbox"
          className="sr-only peer"
          checked={false}
          onChange={(e) => console.log(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

        :
        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            name="published"
            type="checkbox"
            className="sr-only peer"
            checked={true}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>}
 */}

      {/* 
      <label className="relative inline-flex items-center cursor-pointer ">
        <input
          name="published"
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          name="published"
          type="checkbox"
          defaultChecked={true}
          className="sr-only peer"
        />
        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${formValues.published ? 'peer-checked:bg-blue-600' : ''}`}></div>
      </label> */}



    </>
  );
}



export const entitySetSchema = z.object({
  id: z.string(),
  entity: z.string(),
});


// Define the state response schema
export const stateResponseSchema = z.object({
  id: z.string(),
  type_: z.string(),
  published: z.boolean(),
  text: z.string(),
});

export const statePromptsSchema = z.object({
  text: z.string()
})
// Define the state schema
const stateSchema = z.object({
  type: z.string(),
  name: z.string(),
  published: z.boolean(),
  prompts: z.array(z.string()),
  replies: z.array(z.unknown()),
  state_responses: z.array(stateResponseSchema),
});

export const statSchema = z.object({
  id: z.string(),
  type_: z.string(),
  name: z.string(),
  published: z.boolean()
})

// export const agentSchema = z.object({
//   published: z.boolean(),
//   name: z.string(),
//   description: z.string(),
//   confidence: z.number(),
// })

// const isBooleanString = (val: string): boolean => /^(true|false)$/i.test(val);

// const transformBooleanString = (val: boolean | string): boolean => {
//   if (typeof val === 'boolean') {
//     return val;
//   }
//   if (isBooleanString(val)) {
//     return val === 'true';
//   }
//   throw new Error('Value must be a boolean or a string representation of a boolean ("true" or "false").');
// };


const transformToBoolean = (value: string): boolean => {
  if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  } else {
    throw new Error('Invalid boolean string representation.');
  }
};

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  published: z.boolean(),
  description: z.string(),
  nlu_confidence: z.number(),
  ner_confidence: z.number(),
  sen_confidence: z.number(),
});

// Define the main data schema
const agentsSchema = z.object({
  published: z.boolean(),
  name: z.string(),
  description: z.string(),
  confidence: z.number(),
  states: z.array(stateSchema),
});



export type AgentsType = z.infer<typeof agentsSchema>;
export type AgentType = z.infer<typeof agentSchema>;
export type StatesType = z.infer<typeof stateSchema>;
export type StateType = z.infer<typeof statSchema>;
export type ResponseType = z.infer<typeof stateResponseSchema>;
export type PromptsType = z.infer<typeof statePromptsSchema>;
export type EntitySetType = z.infer<typeof entitySetSchema>;

export const ddata = [
  {
    "published": false,
    "name": "agent x",
    "description": "This is classified",
    "confidence": 0.75,
    "states": [
      {
        "type": "state",
        "name": "greet",
        "published": false,
        "prompts": ["Hi", "Hello", "Hiya"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": false,
            "text": "Hello, how may I help you?"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm Eldon Marks. I'm the inventor of TrueSelph and I'd be happy to answer any questions about the product that you may have."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "demonstration",
        "published": false,
        "prompts": ["Can you give me a demonstration of how it works?", "Show me how it works", "I'd like to see it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end."
          },
          {
            "type": "response",
            "published": true,
            "text": "You're looking at it.."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "what_is_it",
        "published": true,
        "prompts": ["Can you explain how the product functions in more detail", "What is true self", "What's it all about", "How can I use it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "TrueSelph allows you to create an interactive version of yourself to put on your website, mobile app, or kiosk so you can truly connect with people in an infinitely scalable way."
          },
          {
            "type": "response",
            "published": true,
            "text": "There are so many ways that you can use TrueSelph, but I'd recommend you use it to boost sales and brand awareness as you drive engagements and increase conversion rates. You can put your customer sales rep on your website, mobile app, or kiosk to offer that next-gen experience for visitors, just like what they did to me."
          }
        ]
      },
      {
        "type": "state",
        "name": "goodbye",
        "published": true,
        "prompts": ["Bye", "Talk to you later", "Goodbye", "See you later, have a great day!"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "It was nice chatting with you."
          },
          {
            "type": "response",
            "published": true,
            "text": "See you later, it was nice talking to you."
          }
        ]
      },
      {
        "type": "state",
        "name": "confused",
        "published": true,
        "prompts": [],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hmm.. I'm not sure I can help with that one"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm sorry, I'm not sure."
          }
        ]
      }
    ]
  },
  {
    "published": true,
    "name": "Agent Y",
    "description": "This is classified. This is classified. This is classified. This is classified. This is classified. This is classified",
    "confidence": 0.75,
    "states": [
      {
        "type": "state",
        "name": "greet",
        "published": true,
        "prompts": ["Hi", "Hello", "Hiya"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hello, how may I help you?"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm Eldon Marks. I'm the inventor of TrueSelph and I'd be happy to answer any questions about the product that you may have."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "demonstration",
        "published": true,
        "prompts": ["Can you give me a demonstration of how it works?", "Show me how it works", "I'd like to see it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end."
          },
          {
            "type": "response",
            "published": true,
            "text": "You're looking at it.."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "what_is_it",
        "published": true,
        "prompts": ["Can you explain how the product functions in more detail", "What is true self", "What's it all about", "How can I use it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "TrueSelph allows you to create an interactive version of yourself to put on your website, mobile app, or kiosk so you can truly connect with people in an infinitely scalable way."
          },
          {
            "type": "response",
            "published": true,
            "text": "There are so many ways that you can use TrueSelph, but I'd recommend you use it to boost sales and brand awareness as you drive engagements and increase conversion rates. You can put your customer sales rep on your website, mobile app, or kiosk to offer that next-gen experience for visitors, just like what they did to me."
          }
        ]
      },
      {
        "type": "state",
        "name": "goodbye",
        "published": true,
        "prompts": ["Bye", "Talk to you later", "Goodbye", "See you later, have a great day!"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "It was nice chatting with you."
          },
          {
            "type": "response",
            "published": true,
            "text": "See you later, it was nice talking to you."
          }
        ]
      },
      {
        "type": "state",
        "name": "confused",
        "published": true,
        "prompts": [],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hmm.. I'm not sure I can help with that one"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm sorry, I'm not sure."
          }
        ]
      }
    ]
  },
  {
    "published": true,
    "name": "Agent Z",
    "description": "This is classified. This is classified. This is classified. This is classified. This is classified. This is classified",
    "confidence": 0.75,
    "states": [
      {
        "type": "state",
        "name": "greet",
        "published": true,
        "prompts": ["Hi", "Hello", "Hiya"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hello, how may I help you?"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm Eldon Marks. I'm the inventor of TrueSelph and I'd be happy to answer any questions about the product that you may have."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "demonstration",
        "published": true,
        "prompts": ["Can you give me a demonstration of how it works?", "Show me how it works", "I'd like to see it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end."
          },
          {
            "type": "response",
            "published": true,
            "text": "You're looking at it.."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "what_is_it",
        "published": true,
        "prompts": ["Can you explain how the product functions in more detail", "What is true self", "What's it all about", "How can I use it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "TrueSelph allows you to create an interactive version of yourself to put on your website, mobile app, or kiosk so you can truly connect with people in an infinitely scalable way."
          },
          {
            "type": "response",
            "published": true,
            "text": "There are so many ways that you can use TrueSelph, but I'd recommend you use it to boost sales and brand awareness as you drive engagements and increase conversion rates. You can put your customer sales rep on your website, mobile app, or kiosk to offer that next-gen experience for visitors, just like what they did to me."
          }
        ]
      },
      {
        "type": "state",
        "name": "goodbye",
        "published": true,
        "prompts": ["Bye", "Talk to you later", "Goodbye", "See you later, have a great day!"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "It was nice chatting with you."
          },
          {
            "type": "response",
            "published": true,
            "text": "See you later, it was nice talking to you."
          }
        ]
      },
      {
        "type": "state",
        "name": "confused",
        "published": true,
        "prompts": [],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hmm.. I'm not sure I can help with that one"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm sorry, I'm not sure."
          }
        ]
      }
    ]
  },
  {
    "published": true,
    "name": "Agent U",
    "description": "This is classified. This is classified. This is classified. This is classified. This is classified. This is classified",
    "confidence": 0.75,
    "states": [
      {
        "type": "state",
        "name": "greet",
        "published": true,
        "prompts": ["Hi", "Hello", "Hiya"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hello, how may I help you?"
          },
          {
            "type": "response",
            "published": false,
            "text": "I'm Eldon Marks. I'm the inventor of TrueSelph and I'd be happy to answer any questions about the product that you may have."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "demonstration",
        "published": true,
        "prompts": ["Can you give me a demonstration of how it works?", "Show me how it works", "I'd like to see it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Sure, there is no better demonstration than this one. This interaction is powered by true self. Just between us, it's not a Zoom call. There's no one on the other end."
          },
          {
            "type": "response",
            "published": true,
            "text": "You're looking at it.."
          }
        ]
      },
      {
        "type": "qa_state",
        "name": "what_is_it",
        "published": true,
        "prompts": ["Can you explain how the product functions in more detail", "What is true self", "What's it all about", "How can I use it"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "TrueSelph allows you to create an interactive version of yourself to put on your website, mobile app, or kiosk so you can truly connect with people in an infinitely scalable way."
          },
          {
            "type": "response",
            "published": true,
            "text": "There are so many ways that you can use TrueSelph, but I'd recommend you use it to boost sales and brand awareness as you drive engagements and increase conversion rates. You can put your customer sales rep on your website, mobile app, or kiosk to offer that next-gen experience for visitors, just like what they did to me."
          }
        ]
      },
      {
        "type": "state",
        "name": "goodbye",
        "published": true,
        "prompts": ["Bye", "Talk to you later", "Goodbye", "See you later, have a great day!"],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "It was nice chatting with you."
          },
          {
            "type": "response",
            "published": true,
            "text": "See you later, it was nice talking to you."
          }
        ]
      },
      {
        "type": "state",
        "name": "confused",
        "published": true,
        "prompts": [],
        "replies": [],
        "state_responses": [
          {
            "type": "response",
            "published": true,
            "text": "Hmm.. I'm not sure I can help with that one"
          },
          {
            "type": "response",
            "published": true,
            "text": "I'm sorry, I'm not sure."
          }
        ]
      }
    ]
  }
]