import clsx from "clsx"
import { ButtonHTMLAttributes, memo, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    pending?: boolean
    onClick?(event: React.MouseEvent<HTMLButtonElement>): void
    children: ReactNode
}

const Button = ({ onClick, pending, children, type = "button", className }: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx("btn-outline btn border-white text-white", pending && "loading", className)}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default memo(Button)
