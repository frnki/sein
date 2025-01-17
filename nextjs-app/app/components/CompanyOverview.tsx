"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BrandValues from "./BrandValues";
import History from "./History";

export default function CompanyOverview() {
  return (
    <>
      <HeroSection />
      {/* <BrandValues /> */}
      
      {/* <ProjectsSection /> */}
    </>
  );
}


function HeroSection() {
  return (
    <div className="relative min-h-[100vh] w-full bg-black">
      {/* Enhanced Blue Lens Flare Effect with Movement */}
      <div className="absolute inset-0">
        {/* First set (Upper Right) - Enhanced */}
        <div className="absolute top-[25vh] right-[15%] -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-600/10 blur-[150px] animate-float-slower-wide" />
        <div className="absolute top-[25vh] right-[20%] -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sky-500/15 blur-[120px] animate-float-slow-wide" />
        <div className="absolute top-[25vh] right-[18%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-float-wide" />
        <div className="absolute top-[23vh] right-[22%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-400/15 blur-[80px] animate-float-slower-wide" />
        <div className="absolute top-[27vh] right-[25%] -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-blue-300/20 blur-[40px] animate-float-slow-wide" />

        {/* Second set (Upper Left) - Enhanced */}
        <div className="absolute top-[35%] left-[15%] w-[900px] h-[900px] rounded-full bg-blue-600/10 blur-[130px] animate-float-slower-wide" />
        <div className="absolute top-[38%] left-[18%] w-[700px] h-[700px] rounded-full bg-sky-500/12 blur-[110px] animate-float-slow-wide" />
        <div className="absolute top-[32%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[90px] animate-float-wide" />
        <div className="absolute top-[36%] left-[22%] w-[300px] h-[300px] rounded-full bg-blue-400/20 blur-[60px] animate-float-slower-wide" />
        <div className="absolute top-[34%] left-[25%] w-[150px] h-[150px] rounded-full bg-cyan-300/25 blur-[30px] animate-float-slow-wide" />

        {/* Third set (Lower Right) - Enhanced */}
        <div className="absolute bottom-[35%] right-[12%] w-[850px] h-[850px] rounded-full bg-blue-600/12 blur-[120px] animate-float-slower-wide" />
        <div className="absolute bottom-[38%] right-[15%] w-[650px] h-[650px] rounded-full bg-sky-500/15 blur-[100px] animate-float-slow-wide" />
        <div className="absolute bottom-[32%] right-[18%] w-[450px] h-[450px] rounded-full bg-cyan-500/18 blur-[80px] animate-float-wide" />
        <div className="absolute bottom-[36%] right-[20%] w-[250px] h-[250px] rounded-full bg-blue-400/20 blur-[50px] animate-float-slower-wide" />
        <div className="absolute bottom-[34%] right-[22%] w-[125px] h-[125px] rounded-full bg-cyan-300/25 blur-[25px] animate-float-slow-wide" />

        {/* Fourth set (Lower Left) - Enhanced */}
        <div className="absolute bottom-[5%] left-[8%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px] animate-float-slower-wide" />
        <div className="absolute bottom-[8%] left-[12%] w-[600px] h-[600px] rounded-full bg-sky-500/12 blur-[100px] animate-float-slow-wide" />
        <div className="absolute bottom-[6%] left-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[80px] animate-float-wide" />
        <div className="absolute bottom-[10%] left-[18%] w-[200px] h-[200px] rounded-full bg-blue-400/20 blur-[40px] animate-float-slower-wide" />
        <div className="absolute bottom-[7%] left-[20%] w-[100px] h-[100px] rounded-full bg-cyan-300/25 blur-[20px] animate-float-slow-wide" />

        {/* Additional small accent highlights */}
        <div className="absolute top-[15%] right-[30%] w-[50px] h-[50px] rounded-full bg-blue-200/30 blur-[10px] animate-float-wide" />
        <div className="absolute top-[40%] left-[28%] w-[40px] h-[40px] rounded-full bg-cyan-200/40 blur-[8px] animate-float-slow-wide" />
        <div className="absolute bottom-[42%] right-[25%] w-[60px] h-[60px] rounded-full bg-blue-200/35 blur-[12px] animate-float-wide" />
        <div className="absolute bottom-[12%] left-[32%] w-[45px] h-[45px] rounded-full bg-cyan-200/45 blur-[9px] animate-float-slow-wide" />
        
        {/* Tiny bright spots */}
        {/* <div className="absolute top-[22%] right-[35%] w-[15px] h-[15px] rounded-full bg-blue-100/50 blur-[3px] animate-float-wide" />
        <div className="absolute top-[45%] left-[40%] w-[20px] h-[20px] rounded-full bg-cyan-100/60 blur-[4px] animate-float-slow-wide" />
        <div className="absolute bottom-[38%] right-[42%] w-[25px] h-[25px] rounded-full bg-blue-100/55 blur-[5px] animate-float-wide" />
        <div className="absolute bottom-[15%] left-[38%] w-[18px] h-[18px] rounded-full bg-cyan-100/65 blur-[4px] animate-float-slow-wide" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-white text-7xl md:text-9xl font-bold leading-tight mb-8">
            Detail is Everything
          </h1>

          <div className="space-y-6">
            <p className="text-2xl md:text-4xl text-white font-light">
              Timeless quality <br />
              Innovated by Design
            </p>

            <p className="text-xl text-gray-400">
              세심한 디테일에 대한 끊임없는 탐구와
              <br />
              장인정신으로 완성되는 공간 디자인.
              <br />
              모든 순간이 의미있는 작품이 됩니다.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div> */}

      <div className="container mx-auto px-4 relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex items-center justify-center">
              <p className="text-[280px] font-bold leading-none text-white">世<br/>人</p>
            </div>

            <div className="space-y-8 flex flex-col justify-center">
              <div className="space-y-4">
                <h2 className="text-5xl font-light text-white">Philosophy</h2>
                <p className="text-7xl font-bold text-white">
                  Harmony of Human & Urban Environment
                </p>
              </div>
              <div className="space-y-6 text-xl text-gray-400">
                <p>
                  세인환경디자인은 공공시설물을 통한 행복한 삶을 추구합니다.
                </p>
                <p>
                  빠르게 급변하는 도시환경과 새로운 가치로 대두되는 공공환경에
                  대해 다양한 욕구를 세인환경디자인의 열정과 도전정신으로 그려
                  나가고자 합니다.
                </p>
                <p>
                  세인환경디자인은 도시 공간과 관련 다양한 분야의 융합과
                  다학제적인 사고를 바탕으로 기본기능에 충실한 합리적인 디자인,
                  친환경적, 친인간적인 디자인을 기본이념으로 두고 있습니다.
                </p>
                <p>
                  혁신적인 자세와 유연한 사고로 디자인, 설계, 제작, 시공 모두
                  최고의 품질로 이용자들이 만족하는 풍요로운 환경을 만들어
                  가겠습니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BrandValues />
      <History />
    </div>
  );
}

function ProjectsSection() {
  return (
    <div className="relative bg-neutral-950 text-white py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-16"
        >
          <div className="space-y-8">
            <h2 className="text-5xl font-light">Projects</h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              세인의 프로젝트는 단순한 시공을 넘어, 공간과 사람을 연결하는
              이야기를 담고 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "친수형 파고라 프로젝트",
                description:
                  "친환경 디자인으로 도시와 자연을 연결하는 혁신적 접근",
                stats: ["프로젝트 기간: 6개월", "고객 만족도: 97%"],
              },
              {
                title: "공공 공간 설계",
                description:
                  "사용자 친화적 설계로 지역 사회에 새로운 가능성을 제시",
                stats: ["수상: 디자인 혁신 대상"],
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden"
              >
                <div className="relative h-[400px]">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:opacity-75" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-light mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="space-y-1">
                      {project.stats.map((stat, i) => (
                        <p key={i} className="text-sm text-gray-400">
                          {stat}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
