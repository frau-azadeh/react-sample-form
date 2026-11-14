import z from "zod";

export const formSchema = z.object({
    email: z
        .string()
        .min(1,"ایمیل الزامی است")
        .email("آدرس ایمیل معتبر نیست"),
})

export type formValue = z.infer<typeof formSchema>