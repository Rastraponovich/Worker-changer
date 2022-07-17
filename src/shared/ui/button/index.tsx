import clsx from "clsx"
import { ButtonHTMLAttributes, ReactNode, memo } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    pending?: boolean
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void
    children: ReactNode
}

export const Button = memo(({ onClick, pending, children, type = "button", className }: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx("btn btn-outline border-white text-white", pending && "loading", className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"
