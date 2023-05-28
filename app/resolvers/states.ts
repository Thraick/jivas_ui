import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createState = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_create_state", ctx)
        return res
    }
})


export const updateState = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_update_state", ctx)
        return res
    }
})




export const deleteState = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve({
        ctx
    }) {
        const res = await httpRequest("_delete_state", ctx)
        return res
    }
})



export function liststate(ctx = {}){
    const res = httpRequest("_list_states", ctx)
    return res
}
