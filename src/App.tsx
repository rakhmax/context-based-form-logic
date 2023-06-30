import { useState } from 'react'
import './App.css'
import { ExampleForm } from './components/example-form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfirmDeleteForm } from './components/confirm-delete'

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDelSectionModalOpen, setIsDelSectionModalOpen] = useState(false)
  const [isDelUnitModalOpen, setIsDelUnitModalOpen] = useState(false)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ExampleForm.Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ExampleForm.CreateLogic data={{ projectId: 1 }}>
          <ExampleForm
            context={ExampleForm.CreateLogic.Context}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </ExampleForm.CreateLogic>
      </ExampleForm.Modal>

      <ExampleForm.Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <ExampleForm.UpdateLogic data={{ todoId: 1, projectId: 1 }}>
          <ExampleForm
            context={ExampleForm.UpdateLogic.Context}
            onCancel={() => setIsUpdateModalOpen(false)}
          />
        </ExampleForm.UpdateLogic>
      </ExampleForm.Modal>

      <ConfirmDeleteForm.Modal
        isOpen={isDelSectionModalOpen}
        onClose={() => setIsDelSectionModalOpen(false)}
      >
        <ConfirmDeleteForm.DeleteSection data={{ sectionId: 1, projectId: 1 }}>
          <ConfirmDeleteForm
            context={ConfirmDeleteForm.DeleteSection.Context}
            onCancel={() => setIsDelSectionModalOpen(false)}
          />
        </ConfirmDeleteForm.DeleteSection>
      </ConfirmDeleteForm.Modal>

      <ConfirmDeleteForm.Modal
        isOpen={isDelUnitModalOpen}
        onClose={() => setIsDelUnitModalOpen(false)}
      >
        <ConfirmDeleteForm.DeleteUnit
          data={{ unitId: 1, projectId: 1 }}
          onSubmitted={() => setIsDelUnitModalOpen(false)}
        >
          <ConfirmDeleteForm
            context={ConfirmDeleteForm.DeleteUnit.Context}
            onCancel={() => setIsDelUnitModalOpen(false)}
          />
        </ConfirmDeleteForm.DeleteUnit>
      </ConfirmDeleteForm.Modal>

      <button onClick={() => setIsCreateModalOpen(true)}>create</button>
      <button onClick={() => setIsUpdateModalOpen(true)}>update</button>
      <button onClick={() => setIsDelSectionModalOpen(true)}>del section</button>
      <button onClick={() => setIsDelUnitModalOpen(true)}>del unit</button>
    </QueryClientProvider>
  )
}

export default App
