import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createtfmNer = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("create_tfm_ner", ctx)
        return res
    }
})


export const edittfmNer = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("update_tfm_ner", ctx)
        return res
    }
})





export const deletetfmNer = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_tfm_ner", ctx)
        return res
    }
})



export const deletetfmNerContext = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_tfm_context", ctx)
        return res
    }
})

