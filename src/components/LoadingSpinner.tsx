export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 transition-opacity duration-300"></div>
    </div>
  )
}
