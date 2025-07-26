import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T, any, any>, // More permissive typing
  options: Omit<UseFormProps<T>, "resolver"> = {}
) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "all",
    ...options,
  });

  return {
    ...form,
  };
}
