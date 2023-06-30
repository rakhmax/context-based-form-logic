import { useMutation, useQuery } from "@tanstack/react-query"
import { FC, PropsWithChildren, createContext } from "react"
import { ExampleFormFields, ExampleFormContext } from "../example-form"

export interface UpdateLogicProps extends PropsWithChildren {
    data: { todoId: number, projectId: number }
    onSubmitted?: () => void
    onError?: () => void
}

const Context = createContext<ExampleFormContext>(null!);

export const Provider: FC<UpdateLogicProps> = ({ children, data, onSubmitted, onError }) => {
    const { todoId, projectId } = data

    const { data: todo } = useQuery<{ userId: number; id: number; title: string; body: string }>({
        queryKey: ['todo', todoId],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${todoId}`).then(res => res.json()),
        enabled: !!todoId
    })

    // обязательно mutateAsync, чтобы корректно работал isSubmitting из useForm
    const { mutateAsync: update } = useMutation({
        mutationFn: (data: ExampleFormFields) => {
            console.log(todoId, projectId);

            return new Promise((res) => {
                setTimeout(() => res(data), 2000)
            })
        },
        onError,
        onSuccess: onSubmitted,
    })

    return (
        <Context.Provider value={{
            submitButtonTitle: 'Сохранить',
            title: "Обновление TO-DO",
            onSubmit: update,
            defaultData: todo
        }}>
            {children}
        </Context.Provider>
    )
}

export const UpdateLogic = Object.assign(Provider, { Context })