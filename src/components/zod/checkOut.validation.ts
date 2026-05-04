import z from "zod";

export const orderSchema = z.object({
    street: z
        .string()
        .min(5, "Address is too short (min 5 characters)")
        .max(100, "Address is too long (max 100 characters)"),

    apartment: z
        .string()
        .min(1, "Apartment or House info is required")
        .max(50, "Too long"),

    phone: z
        .string()
        .min(11, "Phone number must be at least 11 digits")
        .max(15, "Phone number is too long")
        .regex(/^[0-9+]+$/, "Invalid phone number format"),

    note: z.string(),
});