import { useState, useEffect } from 'react'
import {
  Eye,
  Sun,
  Heart,
  Zap,
  ArrowRight,
  Check,
  Home,
  Shield,
  AlertTriangle,
  Thermometer,
  Moon,
  Sunrise,
  Sunset,
  BookOpen,
  Sparkles,
} from 'lucide-react'

export function DemoPage() {
  const [page, setPage] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const pageNames = ['概览', '守护', '生活']

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden paper-texture page-tone-3 stain-green relative">
      {/* Subtle paper fold lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-full bg-paper-stain/20" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-paper-stain/10" />
      </div>

      {/* === Navigation === */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 sticky top-0 bg-paper/90 backdrop-blur-sm border-b border-paper-stain/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-presence/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-presence animate-breathe-present" />
          </div>
          <span className="text-xl font-serif font-semibold text-ink">ReLife</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Page navigation buttons */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-paper-fold/50 border border-paper-stain/30">
            {pageNames.map((name, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans transition-colors ${
                  page === i
                    ? 'bg-ink text-paper'
                    : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <a
            href="/relife/ambient"
            className="hidden sm:inline-flex px-4 py-2 bg-ink text-paper rounded text-sm font-sans font-medium hover:bg-ink-secondary transition-colors"
          >
            打开
          </a>
        </div>
      </nav>

      {/* === Page Content === */}
      {page === 0 && <OverviewPage />}
      {page === 1 && <CarePage />}
      {page === 2 && <LifePage />}

      {/* === Footer === */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-paper-stain/40">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-presence animate-breathe" />
            <span className="text-ink-subtle text-sm font-serif">ReLife · 被遗忘的设备重新呼吸</span>
          </div>
          <p className="text-ink-subtle text-xs font-sans">
            使用 TRAE IDE 构建 · TRAE AI 创造力大赛 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ============================================================
   PAGE 1 — 概览 (Overview)
   ============================================================ */
function OverviewPage() {
  return (
    <>
      {/* === Hero === */}
      <section className="relative z-10 px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Left: Text */}
            <div className="md:col-span-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-5 text-ink">
                让遗忘的设备，
                <br />
                <span className="text-presence">重新呼吸。</span>
              </h1>

              <p className="text-base md:text-lg text-ink-secondary font-serif leading-relaxed max-w-xl mb-8">
                ReLife 将任何闲置手机变成一个安静的 AI 伙伴。
                不需要新硬件，不需要安装 App。
                只是让旧设备，重新有了生命。
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/relife/ambient"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-paper rounded font-sans font-medium hover:bg-ink-secondary transition-colors"
                >
                  体验 ReLife
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-paper-stain rounded text-ink-secondary font-sans hover:bg-paper-fold transition-colors"
                >
                  了解更多
                </a>
              </div>
            </div>

            {/* Right: Phone mockup on paper */}
            <div className="md:col-span-2 flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* === AI Margin Note === */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div className="flex justify-end">
          <div className="animate-margin-note">
            <p className="font-hand text-circadian text-lg leading-relaxed max-w-xs text-right">
              "每个被遗忘的设备，
              <br />
              都在等待被重新看见。"
            </p>
            <p className="font-hand text-ink-subtle text-sm mt-1 text-right">— ReLife</p>
          </div>
        </div>
      </div>

      {/* === Features === */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-ink">
              五个安静的 AI 代理
            </h2>
            <p className="text-ink-secondary font-serif max-w-xl mx-auto">
              它们在后台默默工作，感知你的存在、节奏、健康和家居。
              你不需要操作它们，它们自然地陪伴你。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FeatureCard
              icon={<Eye className="w-5 h-5" />}
              title="存在感知"
              subtitle="Presence Agent"
              desc="基于摄像头的动作检测，知道你在还是不在。坐下来时会轻声问候。隐私优先：所有处理在设备本地完成。"
              accent="presence"
              rotation="-0.5deg"
            />
            <FeatureCard
              icon={<Sun className="w-5 h-5" />}
              title="昼夜节律"
              subtitle="Circadian Agent"
              desc="动态色温和亮度适应你的生物钟。清晨唤醒，白天助力专注，夜晚温柔地帮你入眠。"
              accent="circadian"
              rotation="0.7deg"
            />
            <FeatureCard
              icon={<Heart className="w-5 h-5" />}
              title="健康守护"
              subtitle="Health Agent"
              desc="被动体征监测与跌倒检测。温和的提醒，紧急情况自动通知联系人。不只是数据，是关心。"
              accent="health"
              rotation="1deg"
            />
            <FeatureCard
              icon={<Zap className="w-5 h-5" />}
              title="专注陪伴"
              subtitle="Focus Agent"
              desc="与昼夜节律同步的番茄钟。能量下降时提醒休息，高峰时守护深度工作。不打扰，只陪伴。"
              accent="context"
              rotation="-0.8deg"
            />
            <FeatureCard
              icon={<Home className="w-5 h-5" />}
              title="智能家居"
              subtitle="Smart Home Agent"
              desc="感知你的情绪，自动调节灯光色温、空调温度。语音指令控制全屋设备。你累了，灯光变暖；你专注，空气清凉。"
              accent="health"
              rotation="0.5deg"
            />
          </div>
        </div>
      </section>

      {/* === Cross-Platform === */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="ledger-card p-8 md:p-12 paper-texture">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-ink">
                  iPhone 或 Android，
                  <br />
                  都能成为 ReLife。
                </h2>
                <p className="text-ink-secondary font-serif mb-6 leading-relaxed">
                  ReLife 是一个渐进式 Web 应用，在 iOS Safari 和 Android Chrome 上完美运行。
                  添加到主屏幕后，就像原生 App 一样——零应用商店摩擦。
                </p>
                <div className="space-y-3">
                  <CheckItem text="iOS：添加到主屏幕，独立模式运行" />
                  <CheckItem text="Android：作为 PWA 全屏安装" />
                  <CheckItem text="支持过去 8 年内的任何手机" />
                  <CheckItem text="Service Worker 离线支持" />
                  <CheckItem text="无需应用商店审核" />
                </div>
              </div>
              <div className="flex justify-center gap-6">
                {/* iPhone */}
                <div className="relative">
                  <div className="w-36 h-72 rounded-[2.8rem] bg-ink p-[3px] shadow-lg">
                    <div className="w-full h-full rounded-[2.6rem] bg-paper overflow-hidden relative paper-texture">
                      {/* Dynamic Island */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-ink rounded-full z-10" />
                      {/* Status bar */}
                      <div className="absolute top-7 left-0 right-0 flex justify-between px-4 z-10">
                        <span className="text-[8px] font-sans text-ink-subtle">9:41</span>
                        <div className="flex items-center gap-0.5">
                          <div className="w-2 h-1 bg-ink-subtle rounded-[1px]" />
                          <div className="w-2 h-1 bg-ink-subtle rounded-[1px]" />
                        </div>
                      </div>
                      {/* Screen content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
                        <div className="w-6 h-6 rounded-full bg-presence/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-presence animate-breathe-present" />
                        </div>
                        <span className="text-ink font-serif text-xs">ReLife</span>
                        <span className="text-ink-subtle text-[8px] font-sans">iPhone</span>
                      </div>
                      {/* Home indicator */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-ink-subtle/40 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Android */}
                <div className="relative">
                  <div className="w-36 h-72 rounded-[2rem] bg-ink p-[3px] shadow-lg">
                    <div className="w-full h-full rounded-[1.8rem] bg-paper overflow-hidden relative paper-texture">
                      {/* Punch hole camera */}
                      <div className="absolute top-2.5 left-4 w-2 h-2 bg-ink rounded-full z-10" />
                      {/* Status bar */}
                      <div className="absolute top-4 right-3 flex items-center gap-0.5 z-10">
                        <div className="w-1.5 h-1.5 bg-ink-subtle rounded-full" />
                        <div className="w-3 h-1.5 border border-ink-subtle rounded-[2px]" />
                      </div>
                      {/* Screen content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
                        <div className="w-6 h-6 rounded-full bg-presence/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-presence animate-breathe-present" />
                        </div>
                        <span className="text-ink font-serif text-xs">ReLife</span>
                        <span className="text-ink-subtle text-[8px] font-sans">Android</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section id="demo" className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-ink">
            亲眼看看它
          </h2>
          <p className="text-ink-secondary font-serif mb-8">
            点击下方启动完整的 ReLife 陪伴界面。手机横屏效果最佳，但任何设备都可以。
          </p>
          <a
            href="/relife/ambient"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-paper rounded font-serif font-medium text-lg hover:bg-ink-secondary transition-colors"
          >
            启动 ReLife
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="font-hand text-ink-subtle text-sm mt-5">
            在手机上，点击分享 → 添加到主屏幕，获得完整体验
          </p>
        </div>
      </section>
    </>
  )
}

/* ============================================================
   PAGE 2 — 守护 (Care)
   ============================================================ */
function CarePage() {
  return (
    <>
      {/* === Health Monitoring Detailed === */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24 bg-paper-fold/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-health/15 mb-4">
              <Heart className="w-3 h-3 text-health" />
              <span className="text-xs font-sans text-health">健康守护系统</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-ink">
              安静地守护，在需要时出现
            </h2>
            <p className="text-ink-secondary font-serif max-w-xl mx-auto">
              ReLife 的健康监测不是监控，而是陪伴。三层守护，层层递进。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HealthLayerCard
              number="01"
              icon={<Eye className="w-5 h-5" />}
              title="被动感知"
              subtitle="完全不打扰"
              points={[
                '摄像头动作模式分析',
                '判断久坐、异常静止',
                '手机加速度传感器监测步态',
                '所有处理在设备本地完成',
                '不上传任何个人数据',
              ]}
              color="presence"
              note="就像在远处安静地看着，不打扰你的专注"
            />
            <HealthLayerCard
              number="02"
              icon={<Shield className="w-5 h-5" />}
              title="温和提醒"
              subtitle="手写旁注风格"
              points={[
                '久坐 50 分钟 → 提醒起身',
                '下午精力低谷 → 建议散步',
                '睡眠不足 → 建议早睡',
                '不说"异常"，说"今天有点不同"',
                '保持尊严，不制造焦虑',
              ]}
              color="circadian"
              note="就像朋友轻声提醒，不是医生下达指令"
            />
            <HealthLayerCard
              number="03"
              icon={<AlertTriangle className="w-5 h-5" />}
              title="紧急响应"
              subtitle="跌倒检测"
              points={[
                '摄像头姿态识别 + 手机加速度双重判断',
                '检测跌倒后先温柔询问"你还好吗？"',
                '30 秒无回应 → 自动通知紧急联系人',
                '附带位置和时间信息',
                '可自定义紧急联系人',
              ]}
              color="health"
              note="只在真正需要时干预，守护安全但不侵犯隐私"
            />
          </div>

          {/* === Heart Rate Detection === */}
          <div className="mt-12 ledger-card paper-texture p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-health/15 flex items-center justify-center">
                <Heart className="w-5 h-5 text-health animate-pulse" />
              </div>
              <h3 className="font-serif font-semibold text-ink">心率如何被检测？</h3>
            </div>
            <div className="space-y-3 text-sm text-ink-secondary font-serif">
              <p>
                <span className="text-ink font-medium">远程光电容积描记法（rPPG）</span>
                ：通过前置摄像头捕捉面部皮肤的微小红光反射变化，来估算心率。
              </p>
              <p>
                当心脏搏动时，面部血液量会有微小变化，导致肤色亮度的周期性波动——
                人眼看不见，但摄像头可以捕捉。
              </p>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-health flex-shrink-0" />
                <span>无需接触，无需额外硬件</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-health flex-shrink-0" />
                <span>设备本地处理，数据不外传</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-health flex-shrink-0" />
                <span>结合运动传感双重验证</span>
              </div>
              <p className="text-xs text-ink-subtle mt-2 font-hand">
                注：此功能用于健康趋势参考，不能替代医疗设备诊断。
              </p>
            </div>
          </div>

          {/* === Core Modes Section Heading === */}
          <div className="text-center mb-8 mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-context/15 mb-4">
              <BookOpen className="w-3 h-3 text-context" />
              <span className="text-xs font-sans text-context">核心模式</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3 text-ink">
              两种模式，一种陪伴
            </h2>
            <p className="text-ink-secondary font-serif max-w-xl mx-auto">
              ReLife 通过陪伴与记忆两种模式，成为你生活中安静的伙伴
            </p>
          </div>

          {/* === Companion & Memory Mode Cards === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="ledger-card paper-texture p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-circadian/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-circadian" />
                </div>
                <h3 className="font-serif font-semibold text-ink">陪伴模式是什么？</h3>
              </div>
              <div className="space-y-3 text-sm text-ink-secondary font-serif">
                <p>
                  陪伴模式是 ReLife 的核心——它是一个<span className="text-ink font-medium">始终在线、几乎不操作</span>的环境界面。
                </p>
                <p>
                  把旧手机横放在桌上，显示着时间、天气、一个呼吸的墨点。
                  像一盏安静的灯，默默感知你的存在。
                </p>
                <p>你不需要打开 App，不需要滑动屏幕。
                  <br />
                  它就在那里，像一本翻开的笔记本。</p>
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-circadian flex-shrink-0" />
                  <span>横屏放置，作为桌面摆件</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-circadian flex-shrink-0" />
                  <span>昼夜节律自动调光</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-circadian flex-shrink-0" />
                  <span>手写旁注式 AI 提醒</span>
                </div>
              </div>
            </div>

            <div className="ledger-card paper-texture p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-context/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-context" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-ink mb-2">记忆模式是什么？</h3>
                  <p className="font-hand text-ink-secondary leading-relaxed text-sm">
                    记忆模式记录 ReLife 悄悄记下的点点滴滴——
                    不是数据日志，而是一本被 AI 写了旁注的日记。
                    <br />
                    <br />
                    "今天走路比昨天少了一半。"
                    <br />
                    "你下午 3 点时最专注。"
                    <br />
                    "上周你睡得最好的是周三晚上。"
                    <br />
                    <br />
                    记忆不是为了监控你，而是让你知道——你被关注着。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================================
   PAGE 3 — 生活 (Life)
   ============================================================ */
function LifePage() {
  return (
    <>
      {/* === Smart Home Integration === */}
      <section className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-circadian/15 mb-4">
              <Home className="w-3 h-3 text-circadian" />
              <span className="text-xs font-sans text-circadian">智能家居集成</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-ink">
              如何连接和控制智能家具？
            </h2>
            <p className="text-ink-secondary font-serif max-w-xl mx-auto">
              ReLife 通过多种方式与你的智能家居设备无缝协作。
              无论你使用什么品牌，都能轻松接入。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <IntegrationCard
              icon={<Zap className="w-6 h-6" />}
              title="Wi-Fi 直连模式"
              desc="ReLife 通过 Wi-Fi 直接与本地智能家居设备通信。支持主流协议：Wi-Fi、蓝牙、Zigbee、Z-Wave。无需云端中转，响应更快，隐私更安全。"
              items={['小米米家', '华为智慧生活', 'Apple HomeKit', 'Amazon Alexa', 'Google Home']}
              color="context"
            />
            <IntegrationCard
              icon={<Home className="w-6 h-6" />}
              title="智能家居网关接入"
              desc="如果你的设备通过网关控制（如米家网关、Aqara网关），ReLife 可以直接连接网关获取所有设备状态，并通过网关发送控制指令。"
              items={['米家网关', 'Aqara 网关', '飞利浦 Hue 桥接器', 'Sonos 音箱']}
              color="presence"
            />
            <IntegrationCard
              icon={<Thermometer className="w-6 h-6" />}
              title="红外遥控学习"
              desc="对于传统家电（如旧空调、老式电视），ReLife 可以通过外接红外发射器学习遥控器指令，将它们变成智能设备。"
              items={['空调', '电视', '投影仪', '风扇', '机顶盒']}
              color="circadian"
            />
            <IntegrationCard
              icon={<Zap className="w-6 h-6" />}
              title="API 云接入"
              desc="支持通过智能家居平台的开放 API 进行云端控制。当本地连接不可用时自动切换到云端模式。"
              items={['米家 API', '涂鸦智能', 'Home Assistant', 'Homebridge']}
              color="health"
            />
          </div>

          {/* === Emotion Mapping === */}
          <div className="ledger-card p-8 paper-texture mb-12">
            <h3 className="text-xl font-serif font-semibold text-ink mb-6 text-center">
              情绪 → 环境 自动映射
            </h3>
            <p className="text-ink-secondary text-sm font-serif text-center mb-8">
              ReLife 感知你的情绪状态，自动调节全屋设备，创造最适合当下的环境。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-paper-stain">
                    <th className="text-left py-3 px-4 font-serif text-ink font-semibold">你的情绪</th>
                    <th className="text-left py-3 px-4 font-serif text-ink font-semibold">灯光</th>
                    <th className="text-left py-3 px-4 font-serif text-ink font-semibold">空调</th>
                    <th className="text-left py-3 px-4 font-serif text-ink font-semibold">窗帘</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-paper-stain/50">
                    <td className="py-4 px-4 font-serif text-ink">😌 平静</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">60% · 自然绿 #A4B494</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">关闭</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">打开</td>
                  </tr>
                  <tr className="border-b border-paper-stain/50">
                    <td className="py-4 px-4 font-serif text-ink">🎯 专注</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">台灯 95% · 冷光 #7C9D96 · 客厅灯关</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">22°C 清凉</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">打开（自然光）</td>
                  </tr>
                  <tr className="border-b border-paper-stain/50">
                    <td className="py-4 px-4 font-serif text-ink">😴 疲倦</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">20% · 暗暖光 #8C7A66</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">26°C 温暖</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">关闭（暗下来）</td>
                  </tr>
                  <tr className="border-b border-paper-stain/50">
                    <td className="py-4 px-4 font-serif text-ink">⚡ 活力</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">85% · 明亮自然色</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">23°C 清爽</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">打开</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif text-ink">😰 紧张</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">40% · 柔和暖光 #D0C9A6</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">25°C 舒适</td>
                    <td className="py-4 px-4 font-serif text-ink-secondary">半开</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* === Circadian Rhythm Integration === */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <CircadianCard
              icon={<Sunrise className="w-5 h-5" />}
              title="清晨"
              desc="灯光逐渐变亮变暖，模拟日出唤醒"
              color="presence"
            />
            <CircadianCard
              icon={<Sun className="w-5 h-5" />}
              title="白天"
              desc="冷白光 + 高亮度，助力专注工作"
              color="circadian"
            />
            <CircadianCard
              icon={<Sunset className="w-5 h-5" />}
              title="傍晚"
              desc="暖光 + 渐暗，帮助分泌褪黑素"
              color="health"
            />
            <CircadianCard
              icon={<Moon className="w-5 h-5" />}
              title="深夜"
              desc="仅留极暗夜灯，不打扰睡眠"
              color="context"
            />
          </div>

          {/* === Voice Commands === */}
          <div className="mt-12 ledger-card p-6 paper-texture max-w-3xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-circadian/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-circadian" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-ink mb-2">语音指令，中英双语</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">开灯 / Turn on light</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">冷光 / Cool light</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">温度 24 度 / 24 degrees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">我累了 / I'm tired</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">专注模式 / Focus mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-circadian" />
                    <span className="font-hand text-ink-secondary">开窗帘 / Open curtain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === Presence Integration === */}
          <div className="mt-8 flex justify-center">
            <div className="ledger-card px-6 py-4">
              <p className="font-hand text-presence text-sm">
                "你离开房间时，灯光和空调会自动关闭。
                <br />
                你回来时，一切恢复到你离开前的样子。"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === AI Note Between Sections === */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-4">
        <div className="ledger-card p-4 paper-texture">
          <p className="font-hand text-presence text-base">
            你知道吗？全球有超过 50 亿部旧手机被闲置。
            <br />
            ReLife 让它们重新成为有意义的存在。
          </p>
        </div>
      </div>

      {/* === Why Choose ReLife === */}
      <section id="how" className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3 text-ink">
              为什么选择 ReLife？
            </h2>
            <p className="text-ink-secondary font-serif max-w-xl mx-auto">
              不是因为它是最先进的，而是因为它是最适合你的。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <WhyCard
              title="你的旧手机，还能陪伴你"
              points={[
                '抽屉里的旧手机，不用再躺着',
                '给它一个新的生命，让它继续服务',
                '不用买新设备，省钱又环保',
                '你知道它在做什么，隐私在本地处理',
              ]}
              accent="presence"
            />
            <WhyCard
              title="安静陪伴，不打扰生活"
              points={[
                'AI 在后台默默工作，你不需要操作它',
                '没有弹窗、没有通知轰炸',
                '只是在你需要时轻声提醒',
                '像一本安静的笔记本，会思考但不会喊',
              ]}
              accent="circadian"
            />
            <WhyCard
              title="为家人，也为自己"
              points={[
                '长者友好：大字模式、语音交互',
                '健康守护：跌倒检测、温和提醒',
                '专注陪伴：帮你找到最佳工作节奏',
                '昼夜节律：顺应身体的自然节律',
              ]}
              accent="health"
            />
          </div>

          <div className="mt-8 ledger-card p-6 paper-texture max-w-2xl mx-auto">
            <p className="font-hand text-presence text-lg leading-relaxed text-center">
              "ReLife 不是 AI App 假装成笔记本，
              <br />
              它是一本笔记本，恰好会思考。"
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================================
   Sub-Components
   ============================================================ */

function PhoneMockup() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const d = new Date()
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      {/* Vertical phone */}
      <div className="w-44 h-72 rounded-[2rem] bg-ink p-[3px] shadow-lg hidden lg:block">
        <div className="w-full h-full rounded-[1.7rem] bg-paper overflow-hidden relative paper-texture">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-ink rounded-full z-10" />
          {/* Status bar */}
          <div className="absolute top-6 left-0 right-0 flex justify-between px-3 z-10">
            <span className="text-[7px] font-sans text-ink-subtle">{time}</span>
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-0.8 bg-ink-subtle rounded-[1px]" />
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pt-4">
            <div className="w-5 h-5 rounded-full bg-presence/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-presence animate-breathe-present" />
            </div>
            <span className="text-ink font-serif text-xs">ReLife</span>

            <div className="flex gap-2 mt-2">
              <div className="w-7 h-7 rounded bg-paper-fold/80 border border-paper-stain/60 flex items-center justify-center">
                <Heart className="w-3 h-3 text-health" />
              </div>
              <div className="w-7 h-7 rounded bg-paper-fold/80 border border-paper-stain/60 flex items-center justify-center">
                <Sun className="w-3 h-3 text-circadian" />
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.8 bg-ink-subtle/40 rounded-full" />
        </div>
      </div>

      {/* Subtle shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-paper-stain/15 rounded-full blur-lg" />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  subtitle,
  desc,
  accent,
  rotation,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  desc: string
  accent: string
  rotation: string
}) {
  const accentColors: Record<string, string> = {
    presence: 'text-presence',
    circadian: 'text-circadian',
    health: 'text-health',
    context: 'text-context',
  }

  const accentBgColors: Record<string, string> = {
    presence: 'bg-presence/15',
    circadian: 'bg-circadian/15',
    health: 'bg-health/15',
    context: 'bg-context/15',
  }

  return (
    <div
      className="ledger-card paper-texture p-6 md:p-8 animate-page-corner"
      style={{ transform: `rotate(${rotation})` }}
    >
      <div className={`w-10 h-10 rounded ${accentBgColors[accent]} flex items-center justify-center mb-4 ${accentColors[accent]}`}>
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-lg font-serif font-semibold text-ink">{title}</h3>
        <span className="text-xs text-ink-subtle font-sans">{subtitle}</span>
      </div>
      <p className="text-ink-secondary font-serif text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function WhyCard({
  title,
  points,
  accent,
}: {
  title: string
  points: string[]
  accent: string
}) {
  const accentColors: Record<string, string> = {
    presence: 'text-presence',
    circadian: 'text-circadian',
    health: 'text-health',
  }

  return (
    <div className="ledger-card paper-texture p-6">
      <h3 className="text-lg font-serif font-semibold text-ink mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary font-serif">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accentColors[accent]}`} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-presence" />
      <span className="text-ink-secondary text-sm font-serif">{text}</span>
    </div>
  )
}

function HealthLayerCard({
  number,
  icon,
  title,
  subtitle,
  points,
  color,
  note,
}: {
  number: string
  icon: React.ReactNode
  title: string
  subtitle: string
  points: string[]
  color: string
  note: string
}) {
  const colorMap: Record<string, { text: string; bg: string }> = {
    presence: { text: 'text-presence', bg: 'bg-presence/15' },
    circadian: { text: 'text-circadian', bg: 'bg-circadian/15' },
    health: { text: 'text-health', bg: 'bg-health/15' },
    context: { text: 'text-context', bg: 'bg-context/15' },
  }

  const colors = colorMap[color]

  return (
    <div className="ledger-card paper-texture p-6 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-bl-full opacity-50`} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-sans text-ink-subtle">{number}</span>
          <div className={`w-10 h-10 rounded ${colors.bg} flex items-center justify-center ${colors.text}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-serif font-semibold text-ink mb-1">{title}</h3>
        <p className="text-xs font-sans text-ink-subtle mb-4">{subtitle}</p>
        <ul className="space-y-2 mb-4">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary font-serif">
              <Check className={`w-3 h-3 flex-shrink-0 mt-0.5 ${colors.text}`} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p className="font-hand text-xs text-ink-subtle italic">{note}</p>
      </div>
    </div>
  )
}

function IntegrationCard({
  icon,
  title,
  desc,
  items,
  color,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  items: string[]
  color: string
}) {
  const colorMap: Record<string, { text: string; bg: string }> = {
    presence: { text: 'text-presence', bg: 'bg-presence/15' },
    circadian: { text: 'text-circadian', bg: 'bg-circadian/15' },
    health: { text: 'text-health', bg: 'bg-health/15' },
    context: { text: 'text-context', bg: 'bg-context/15' },
  }

  const colors = colorMap[color]

  return (
    <div className="ledger-card paper-texture p-6">
      <div className={`w-12 h-12 rounded ${colors.bg} flex items-center justify-center mb-4 ${colors.text}`}>
        {icon}
      </div>
      <h3 className="text-lg font-serif font-semibold text-ink mb-2">{title}</h3>
      <p className="text-sm text-ink-secondary font-serif mb-4">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-2 py-1 text-xs font-sans rounded bg-paper-fold text-ink-subtle">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CircadianCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
}) {
  const colorMap: Record<string, { text: string; bg: string }> = {
    presence: { text: 'text-presence', bg: 'bg-presence/15' },
    circadian: { text: 'text-circadian', bg: 'bg-circadian/15' },
    health: { text: 'text-health', bg: 'bg-health/15' },
    context: { text: 'text-context', bg: 'bg-context/15' },
  }

  const colors = colorMap[color]

  return (
    <div className="ledger-card paper-texture p-4 text-center">
      <div className={`w-10 h-10 mx-auto rounded ${colors.bg} flex items-center justify-center mb-3 ${colors.text}`}>
        {icon}
      </div>
      <h4 className="font-serif font-semibold text-ink mb-1">{title}</h4>
      <p className="text-xs text-ink-secondary font-serif">{desc}</p>
    </div>
  )
}
