import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createAgent = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_create_agent", ctx)
        return res
    }
})


export const updateAgent = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_update_agent", ctx)
        return res
    }
})




export const deleteAgent = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_delete_agent", ctx)
        return res
    }
})



export function listAgent(ctx = {}){
    const res = httpRequest("_list_agents", ctx)
    return res
}
