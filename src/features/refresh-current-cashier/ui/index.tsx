import { memo } from "react"
import { Button } from "src/shared/ui/button"

interface RefreshCurrentCashierProps {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void
    pending: boolean
}
export const RefreshCurrentCashier = memo(({ onClick, pending }: RefreshCurrentCashierProps) => {
    return (
        <Button onClick={onClick} pending={pending}>
            Обновить
        </Button>
    )
})

RefreshCurrentCashier.displayName = "RefreshCurrentCashier"
