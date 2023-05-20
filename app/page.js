import Image from 'next/image'
import Bg1 from "/public/bg1.jpg"
import Main from '@/components/Main'

export default function Home() {
  return (
    <main className="items-center">
      <div class="con w-screen bg-red-200 h-8">
        <h1>Mountain Star Zlatibor</h1>
        <p>Zlatibor is a mountain of exceptional beauty whose special geographical properties have made this mountain a real gem of western Serbia.</p>
        <a href="#">Learn more</a>
      </div>

      <div class="blank"></div>

      <div class="con second">
      </div>

      <div class="blank"></div>
    </main>
  )
}
