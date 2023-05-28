import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createReplace = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("create_replace", ctx)
        return res
    }
})


export const editReplace = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("update_replace", ctx)
        return res
    }
})





export const deleteReplace = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_replace", ctx)
        return res
    }
})

