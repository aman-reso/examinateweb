"use client";
import { Check, X, Loader2 } from "lucide-react";

type StatusType = "idle" | "loading" | "success" | "error";
type VariantType = "primary" | "secondary";

interface ActionButtonProps {
    text: string;
    onClick: () => void | Promise<void>;
    variant?: VariantType;
    width?: string; // Tailwind width class, e.g. "w-40"
    height?: string; // Tailwind height class, e.g. "h-12"
    status?: StatusType;
    className?: string;
}

export default function ActionButton({
                                         text,
                                         onClick,
                                         variant = "primary",
                                         width = "w-full",
                                         height = "h-12",
                                         status = "idle", // external status
                                         className = "",
                                     }: ActionButtonProps) {
    const isDisabled = status === "loading" || status === "success";

    const handleClick = async () => {
        if (!isDisabled) {
            await onClick();
        }
    };

    const baseStyle = `rounded-md font-medium transition-all flex items-center justify-center gap-2 ${width} ${height}`;

    const variantStyle =
        variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-blue-600 text-blue-600 hover:bg-blue-50";

    const statusStyle =
        status === "success"
            ? "bg-green-500 text-white border-none"
            : status === "error"
                ? "bg-red-500 text-white border-none"
                : variantStyle;

    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={`${baseStyle} ${statusStyle} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {status === "loading" && <Loader2 className="animate-spin w-4 h-4" />}
            {status === "success" && <Check className="w-4 h-4" />}
            {status === "error" && <X className="w-4 h-4" />}
            {(status === "idle" || status === "loading") && <span>{text}</span>}
        </button>
    );
}

