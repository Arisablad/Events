import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="bg-blue-400">
      <Button color="primary">xd</Button>
    </div>
  )
}
