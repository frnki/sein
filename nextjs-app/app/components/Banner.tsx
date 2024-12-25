import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative w-full h-[600px]">
      <Image
        src="/images/banner-acrotower.jpg"
        alt="Acrotower Tea House"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30">
        <div className="container mx-auto h-full flex flex-col justify-center items-start px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            세인디자인
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            혁신적인 디자인으로 공간의 가치를 높이는 건축 디자인 전문가 그룹
          </p>
        </div>
      </div>
    </div>
  )
} 