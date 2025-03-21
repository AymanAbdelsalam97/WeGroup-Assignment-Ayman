import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CreateUser } from "@/core/api/user/actions";
import { userFormSchema } from "@/schemas/user";

// Form validation schema
type TFormFieldConfig = {
  name: "name" | "email" | "role";
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
};

type UserFormValues = z.infer<typeof userFormSchema>;

type TAddUserFormProps = {
  setIsFormVisible: (isVisible: boolean) => void;
  userData?: UserFormValues;
};

export function AddUserForm({ setIsFormVisible }: TAddUserFormProps) {
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Default form values
  const defaultValues: Partial<UserFormValues> = {
    name: "",
    email: "",
    role: "User",
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });
  const mutation = useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    setIsSubmitting(true);

    try {
      // Call mutation function
      await mutation.mutateAsync(values);
      setIsFormVisible(false);
    } catch (error) {
      setIsSubmitting(false);
      form.setError("email", {
        type: "manual",
        message: (error as Error).message || "Failed to create user",
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };
  const handleFormVisibility = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-7xl shadow-xl rounded-xl overflow-hidden bg-white p-0">
        <div className="bg-primary p-6">
          <h1 className="text-2xl font-bold text-white">Create New User</h1>
          <p className="text-blue-100 mt-1">
            Complete the form below to add a user to the system
          </p>
        </div>

        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="w-full space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {formFields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      render={({ field: formField }) => (
                        <FormItem className="space-y-3 bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                          <FormLabel className="font-semibold text-base text-gray-800">
                            {field.label}
                          </FormLabel>
                          <FormControl className="space-y-2">
                            {field.type === "select" ? (
                              <Select
                                {...formField}
                                onValueChange={formField.onChange}
                                defaultValue={formField.value}
                              >
                                <SelectTrigger className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                  <SelectValue
                                    placeholder={`Select a ${field.label.toLowerCase()}`}
                                  />
                                </SelectTrigger>
                                <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                                  {field.options?.map((option) => (
                                    <SelectItem
                                      key={option}
                                      value={option}
                                      className="text-gray-700 hover:bg-blue-50"
                                    >
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                type={field.type || "text"}
                                placeholder={field.placeholder}
                                {...formField}
                                className="w-full border rounded-lg p-3 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              />
                            )}
                          </FormControl>
                          {form.formState.errors && (
                            <FormMessage className="text-sm font-medium text-red-500">
                              {form.formState.errors[field.name]?.message}
                            </FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
                  onClick={handleFormVisibility}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-70 min-w-[140px]"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create User
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

const formFields: TFormFieldConfig[] = [
  {
    name: "name" as const,
    label: "Name",
    placeholder: "John Doe",
    type: "text",
  },
  {
    name: "email" as const,
    label: "Email",
    placeholder: "john.doe@example.com",
    type: "email",
  },
  {
    name: "role" as const,
    label: "Role",
    type: "select",
    options: ["Admin", "User"],
  },
];
