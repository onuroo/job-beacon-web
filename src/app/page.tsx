import ExampleComponent from '@/components/ExampleComponent'

export default function Home() {
  return (
    <div className="p-4 md:ml-64 pt-20">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
        <ExampleComponent />
      </div>
    </div>
  )
}
