import Header from '@/components/layout/Header'
import MainContent from '@/components/layout/MainContent'

export default function Home() {
  return (
    <div className='w-screen h-screen flex flex-col relative'>
      <div className='w-full absolute z-10 p-2'>
        <Header />
      </div>
      <MainContent />
    </div>
  )
}