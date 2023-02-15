import z from 'zod'

const validationNoteSchema = z.object({
    createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    title: z.string().trim().min(5, "Title must be at least 5 characters long").max(100, "Title can't be more than 100 characters"),
    body: z.string().trim().min(10, "Body must be at least 10 characters long").max(1000, "Body can't be more than 1000 characters"),
    createdAt: z.date().default(() => new Date()),
});


validationNoteSchema.required({
    title: true,
    body: true
})


export default validationNoteSchema