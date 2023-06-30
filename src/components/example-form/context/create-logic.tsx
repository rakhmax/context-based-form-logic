import { useMutation } from "@tanstack/react-query"
import { FC, PropsWithChildren, createContext } from "react"
import { ExampleFormFields, ExampleFormContext } from "../example-form"

export interface CreateLogicProps extends PropsWithChildren {
    data: { projectId: number }
    onSubmitted?: () => void
    onError?: () => void
}

const Context = createContext<ExampleFormContext>(null!);

export const Provider: FC<CreateLogicProps> = ({ children, data, onSubmitted, onError }) => {
    const { projectId } = data

    const { mutateAsync: create } = useMutation({
        mutationFn: (data: ExampleFormFields) => {
            console.log(projectId);

            return new Promise((res) => {
                setTimeout(() => res(data), 2000)
            })
        },
        onError,
        onSuccess: onSubmitted,
    })

    return (
        <Context.Provider value={{
            submitButtonTitle: 'Добавить',
            title: "Создание TO-DO",
            onSubmit: create,
        }}>
            {children}
        </Context.Provider>
    )
}

export const CreateLogic = Object.assign(Provider, { Context })
