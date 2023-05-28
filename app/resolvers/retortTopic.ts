import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createRetortTopic =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("create_retort_topic", ctx)
        return res
    }
})


export const editRetortTopic =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("update_retort_topic", ctx)
        return res
    }
})





export const deleteRetortTopic =  createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_retort_topic", ctx)
        return res
    }
})

