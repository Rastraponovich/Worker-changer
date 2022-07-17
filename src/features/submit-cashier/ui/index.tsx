import { memo } from "react"
import { Button } from "src/shared/ui/button"

interface SubmitCashierProps {
    pending: boolean
}
export const SubmitCashier = memo(({ pending }: SubmitCashierProps) => {
    return (
        <Button type="submit" className="bg-white text-sky-900" pending={pending}>
            Изменить
        </Button>
    )
})
