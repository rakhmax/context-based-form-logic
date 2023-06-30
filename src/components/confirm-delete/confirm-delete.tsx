import { Context, FC, ReactNode, useContext } from "react"
import { Modal as BaseModal, ModalBaseProps } from "../modal"
import { useForm } from "react-hook-form"

// пишем в каждой форме интерфейс контекста, который нужно реализовать
export interface ConfirmDeleteFormContext {
    title: ReactNode
    onSubmit: () => void
}

export interface ConfirmDeleteFormProps {
    context: Context<ConfirmDeleteFormContext>
    onCancel: () => void
}

export const Form: FC<ConfirmDeleteFormProps> = ({ context, onCancel }) => {
    const { handleSubmit, formState: { isSubmitting } } = useForm()

    const { onSubmit, title } = useContext<ConfirmDeleteFormContext>(context)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseModal.Header>
                {title}
            </BaseModal.Header>
            <BaseModal.Footer align="center" gap="16">
                <button disabled={isSubmitting} onClick={onCancel}>
                    Отменить
                </button>
                <button type="submit" disabled={isSubmitting}>
                    Удалить
                </button>
            </BaseModal.Footer>
        </form>

    )
}

export const Modal: FC<ModalBaseProps> = ({ children, ...props }) => (
    <BaseModal width={300} {...props}>
        {children}
    </BaseModal>
)
