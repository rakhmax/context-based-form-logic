import { useMutation } from "@tanstack/react-query"
import { FC, PropsWithChildren, createContext } from "react"
import { ConfirmDeleteFormContext } from "../confirm-delete"

export interface DeleteUnitProps extends PropsWithChildren {
    data: { projectId: number, unitId: number }
    onSubmitted?: () => void
    onError?: () => void
}

const Context = createContext<ConfirmDeleteFormContext>(null!);

export const Provider: FC<DeleteUnitProps> = ({ children, data, onSubmitted, onError }) => {
    const { projectId, unitId } = data

    const { mutateAsync: remove } = useMutation({
        mutationFn: () => {
            console.log(projectId, unitId);

            return new Promise((res) => {
                setTimeout(() => res(null), 2000)
            })
        },
        onError,
        onSuccess: onSubmitted,
    })

    return (
        <Context.Provider value={{
            title: "Вы уверены, что хотите удалить оборудование?",
            onSubmit: remove,
        }}>
            {children}
        </Context.Provider>
    )
}

export const DeleteUnit = Object.assign(Provider, { Context })
