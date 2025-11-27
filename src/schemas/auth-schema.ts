import {z} from "zod";

export const LoginSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    username: z.string().min(3, "Username is required"),
    email: z.email("Invalid email"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female"], { message: "Select a gender" }),
    phone: z.string().min(8, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterValues = z.infer<typeof RegisterSchema>;