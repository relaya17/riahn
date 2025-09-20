import dynamic from 'next/dynamic'

// טעינה דינמית של האפליקציה
const TaskApp = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">טוען Task Manager...</p>
      </div>
    </div>
  )
})

export default function TasksPage() {
  return <TaskApp />
}
