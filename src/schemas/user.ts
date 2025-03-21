import z from "zod";
export const userFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z
    .enum(["Admin", "User"], {
      errorMap: () => {
        return { message: "Role must be either 'Admin' or 'User'." };
      },
    })
    .refine((role) => role === "Admin" || role === "User", {
      message: "Invalid role. Allowed values are 'Admin' or 'User'.",
    }),
});
