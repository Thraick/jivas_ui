// import { createResolver } from "remix-server-kit";
// import * as z from 'zod';
// import { httpRequest } from "~/utils/httpRequest";


// export const newFaqs = createResolver({
//     schema: z.object({
//         ctx: z.record(z.any())
//     }),

//     async resolve ({
//         ctx
//     }) {
//         const res = await httpRequest("new_faq", ctx)
//         return res
//     }
// })


// export const editFaqs = createResolver({
//     schema: z.object({
//         ctx: z.record(z.any())
//     }),

//     async resolve ({
//         ctx
//     }) {
//         const res = await httpRequest("update_faq", ctx)
//         return res
//     }
// })





// export const deleteFaqs = createResolver({
//     schema: z.object({
//         ctx: z.record(z.any())
//     }),

//     async resolve ({
//         ctx
//     }) {
//         const res = await httpRequest("delete_faq", ctx)
//         return res
//     }
// })

