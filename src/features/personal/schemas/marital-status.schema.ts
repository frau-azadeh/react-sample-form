import z from "zod";

const singleSchema = z.object({
    maritalStatus : z.literal("single"),
});
const marridSchema = z.object({
    maritalStatus: z.literal("marrid"),
    spouseName: z
        .string()
        .trim()
        .min(2,"نام همسر باید حداقل 2 کاراکتر باشد")
        .max(100, "نام همسر نباید بیشتر از 100 کاراکتر باشد"),

    marriageDate: z 
        .string()
        .min(1, "تاریخ ازدواج را وارد کنید")
});
export const maritalStatusSchema = z.discriminatedUnion("maritalStatus",[singleSchema, marridSchema],);
export type MaritalStatusFormInput = z.input<typeof maritalStatusSchema>
export type MaritalStatusFormValues = z.output<typeof maritalStatusSchema>