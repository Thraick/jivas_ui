import { z } from "zod";


export const entitySetSchema = z.object({
  id: z.string(),
  entity: z.string(),
});

export const stateResponseSchema = z.object({
  id: z.string(),
  type_: z.string(),
  published: z.boolean(),
  text: z.string(),
});

export const statePromptSchema = z.object({
  id: z.string(),
  prompt: z.string(),
})

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

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  published: z.boolean(),
  description: z.string(),
  nlu_confidence: z.number(),
  ner_confidence: z.number(),
  sen_confidence: z.number(),
});


// const agentsSchema = z.object({
//   published: z.boolean(),
//   name: z.string(),
//   description: z.string(),
//   confidence: z.number(),
//   states: z.array(stateSchema),
// });



// export type AgentsType = z.infer<typeof agentsSchema>;
export type AgentType = z.infer<typeof agentSchema>;
export type StatesType = z.infer<typeof stateSchema>;
export type StateType = z.infer<typeof statSchema>;
export type ResponseType = z.infer<typeof stateResponseSchema>;
export type PromptsType = z.infer<typeof statePromptSchema>;
export type EntitySetType = z.infer<typeof entitySetSchema>;
