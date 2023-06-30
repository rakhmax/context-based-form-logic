import { Context, FC, ReactNode, useContext, useEffect } from "react"
import { Modal as BaseModal, ModalBaseProps } from "../modal"
import { useForm } from "react-hook-form"
import yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

// пишем в каждой форме интерфейс контекста, который нужно реализовать
export interface ExampleFormContext {
    submitButtonTitle: string
    title: ReactNode
    defaultData?: ExampleFormFields
    onSubmit: (data: ExampleFormFields) => void
}

export interface ExampleFormProps {
    context: Context<ExampleFormContext>
    onCancel: () => void
}

const schema = yup.object({
    title: yup.string().required("Поле не может быть пустым"),
    body: yup.string().required("Поле не может быть пустым"),
});

export type ExampleFormFields = yup.InferType<typeof schema>

export const Form: FC<ExampleFormProps> = ({ onCancel, context }) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const { defaultData, onSubmit, title, submitButtonTitle } = useContext<ExampleFormContext>(context)

    useEffect(() => {
        reset(defaultData)
    }, [defaultData])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseModal.Header>
                {title}
            </BaseModal.Header>
            <BaseModal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input type="text" {...register('title')} />
                    <textarea {...register('body')} />
                </div>
            </BaseModal.Body>
            <BaseModal.Footer align="center" gap="16">
                <button disabled={isSubmitting} onClick={onCancel}>
                    Отменить
                </button>
                <button type="submit" disabled={isSubmitting}>
                    {submitButtonTitle}
                </button>
            </BaseModal.Footer>
        </form>

    )
}

export const Modal: FC<ModalBaseProps> = ({ children, ...props }) => (
    <BaseModal width={480}  {...props}>
        {children}
    </BaseModal>
)


