import { toast } from "sonner";

function showToast(type: "success" | "error", message: string) {
  const style: React.CSSProperties & { "--normal-bg": string; "--normal-text": string; "--normal-border": string } =
    type === "success"
      ? {
          "--normal-bg": "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-text": "var(--color-white)",
          "--normal-border": "light-dark(var(--color-green-600), var(--color-green-400))",
        }
      : {
          "--normal-bg": "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
          "--normal-text": "var(--color-white)",
          "--normal-border": "transparent",
        };
  toast[type](message, { position: "top-center", style });
}

export { showToast };