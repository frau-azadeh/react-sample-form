import {z} from "zod";

export const personalSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "نام باید حداقل 2 کاراکتر باشد"),
    lastName: z 
        .string()
        .trim()
        .min(2, "نام خانوادگی باید 2 کاراکتر باشد")
});
export type PersonalFormValues = z.infer<typeof personalSchema>