# ReLife Website Design System

## 1. Brand Essence

ReLife = "被遗忘的设备重新呼吸"

网站视觉核心不是"科技感"，而是：
- 📜 被时间磨损的温度（old + nostalgic）
- 🌙 安静的陪伴感（ambient + non-intrusive）
- 🧠 隐形的智能（AI exists, but never shouts）
- 🪶 极低打扰设计（calm-first interface）

关键词：
Warm · Analog · Paper-like · Quiet Tech · Memory · Soft Intelligence

## 2. Visual Style Direction

**Overall Style:** "Vintage ledger × ambient AI interface × soft futuristic glow"

UI 像一本：
- 老账本
- 日记本
- 被扫描进数字世界的纸张

但里面的内容是 AI 在"轻声说话"。

## 3. Color System

### Base Palette（纸张系统）
- `#F3E9D7` - aged paper base
- `#E6D5B8` - darker paper fold
- `#C9B79C` - stains / shadows
- `#8C7A66` - ink faded brown

### Ink System（文字）
- `#2B2A28` - main ink (soft black, not pure black)
- `#5A5248` - secondary text
- `#8A7F73` - disabled / subtle text

### Accent (AI生命感)
- `#6D8B74` - calm green (presence agent)
- `#7C9D96` - mist teal (context agent)
- `#A4B494` - circadian warm green
- `#D0C9A6` - soft alert highlight

### Glow (very subtle)
- faint warm beige glow around active AI states
- no neon, only "paper lit from behind"

## 4. Typography

### Primary Font
- Noto Serif SC (中文正文)
- Cormorant Garamond (English serif)
- feeling: "old book / journal"

### Secondary Font (UI labels)
- Inter or SF Pro
- only for system UI, timestamps, buttons

### Handwritten Accent
- ZCOOL XiaoWei OR Caveat
- used for: AI notes, reminders, "ReLife suggestions"

## 5. Layout Philosophy

**Core Metaphor:** "A notebook with living ink inside"

### Structure
**Desktop:**
- Left: torn paper navigation strip
- Center: main ledger page (scrollable)
- Right: ambient AI panel (floating paper card)

**Mobile (important for your old phone concept):**
- Single column "scroll notebook"
- AI appears as sticky handwritten notes overlay

## 6. UI Components

### 6.1 Ledger Cards
Each module looks like a hand-pasted paper slip:
- slightly rotated (-1° to +1.5°)
- paper texture background
- ink border (not sharp line, slightly rough)

### 6.2 AI Messages (VERY IMPORTANT)
AI does NOT appear as chat bubbles.

Instead: handwritten margin notes on paper.

Example:
（右下角淡淡手写）
"你已经坐了 52 分钟，要不要休息一下？"
— ReLife

### 6.3 Presence Indicator
Instead of a status bar:
- a faint "breathing ink dot"
- changes intensity:
  - idle → barely visible
  - present → soft pulse
  - active interaction → slightly darker ink bloom

### 6.4 Navigation
Left sidebar looks like:
- stitched paper strip
- pinned with tape / clips
- icons drawn like ink sketches

Items:
- Home（首页）
- ReLife Mode（核心）
- Health Watch
- Context Memory
- Settings

## 7. Motion Design

**Philosophy:** "Nothing should feel like a UI animation. Everything should feel like ink settling."

### Rules
- No fast transitions
- 200–600ms ease-in-out only
- paper fade instead of slide
- slight blur-to-focus for AI emergence

### Key Animations
- AI note appears like ink soaking into paper
- cards "unfold" like page corners lifting
- ambient glow slowly warms screen at night

## 8. Imagery Style

**Use ONLY:**
- pencil sketches
- watercolor stains
- scanned paper textures
- coffee/desk/old room lighting
- old phone photos (soft blur)

**Avoid:**
- neon cyberpunk
- glossy 3D UI
- sharp gradients

## 9. Ambient AI Design Language

AI is not a chatbot.

AI is:
- marginalia (书页旁注)
- faint handwriting
- subtle corrections
- quiet suggestions

Example behaviors:
- "你今天走路比昨天慢一点" (health watcher)
- "天气变冷了，要不要关窗？" (context agent)
- "你有一条未读信息，但不紧急" (attention filter)

## 10. ReLife Signature Element

**"Living Page System"**

Every page has:
- slightly different paper tone
- unique stains / texture
- subtle aging differences

Meaning: no two screens feel identical — like real paper pages

## 11. Accessibility (Important for your elderly-care angle)

- high contrast ink mode toggle
- "large handwriting mode"
- voice-first interaction support
- minimal cognitive load UI
- no flashing or aggressive motion

## 12. Tone of Copywriting

Writing style:
- short sentences
- calm
- slightly poetic but not exaggerated

Example:
Instead of: "Your health metrics are abnormal"
Use: "今天你的状态有点不同。"

## 13. AI State System (for dev implementation)

- STATE_IDLE
- STATE_PRESENCE_DETECTED
- STATE_CONTEXT_ACTIVE
- STATE_HEALTH_MONITORING
- STATE_CIRCADIAN_MODE

Each state ONLY affects:
- ink tone
- subtle glow
- margin note frequency

## 14. Overall UI Rule (MOST IMPORTANT)

"If the user notices the UI, it has failed."

ReLife should feel like:
a notebook that happens to think
not an AI app pretending to be a notebook
