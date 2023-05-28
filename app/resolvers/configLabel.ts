import { createResolver } from "remix-server-kit";
import * as z from 'zod';
import { httpRequest } from "~/utils/httpRequest";


export const createLabel = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("create_label", ctx)
        return res
    }
})


export const editLabel = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("update_label", ctx)
        return res
    }
})





export const deleteLabel = createResolver({
    schema: z.object({
        ctx: z.record(z.any())
    }),

    async resolve ({
        ctx
    }) {
        const res = await httpRequest("delete_label", ctx)
        return res
    }
})

