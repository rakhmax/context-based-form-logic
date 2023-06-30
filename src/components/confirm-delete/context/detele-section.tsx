import { useMutation } from "@tanstack/react-query"
import { FC, PropsWithChildren, createContext } from "react"
import { ConfirmDeleteFormContext } from "../confirm-delete"

export interface DeleteSectionProps extends PropsWithChildren {
    data: { projectId: number, sectionId: number }
    onSubmitted?: () => void
    onError?: () => void
}

const Context = createContext<ConfirmDeleteFormContext>(null!);

export const Provider: FC<DeleteSectionProps> = ({ children, data, onSubmitted, onError }) => {
    const { projectId, sectionId } = data

    const { mutateAsync: remove } = useMutation({
        mutationFn: () => {
            console.log(projectId, sectionId);

            return new Promise((res) => {
                setTimeout(() => res(null), 2000)
            })
        },
        onError,
        onSuccess: onSubmitted,
    })

    return (
        <Context.Provider value={{
            title: "Вы уверены, что хотите удалить секцию?",
            onSubmit: remove,
        }}>
            {children}
        </Context.Provider>
    )
}

export const DeleteSection = Object.assign(Provider, { Context })
