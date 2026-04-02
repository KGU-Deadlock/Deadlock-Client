import { toast as sonnerToast } from "sonner";

export const toastError = (message: string) =>
  sonnerToast.error(message, { duration: 3000 });

export const toastSuccess = (message: string) =>
  sonnerToast.success(message, { duration: 3000 });
