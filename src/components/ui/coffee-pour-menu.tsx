'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export type CoffeeVessel = 'demitasse' | 'glass-mug' | 'cup' | 'tall-glass'
export type CoffeeLiquid = 'espresso' | 'water' | 'milk'

export interface CoffeeLayer {
  type: CoffeeLiquid
  amount: number
}

export interface CoffeeItem {
  id: string
  name: string
  subtitle?: string
  description?: string
  vessel: CoffeeVessel
  layers: CoffeeLayer[]
  crema?: boolean
  foam?: number
  art?: 'heart' | 'none'
  blend?: number
}

export interface CoffeePourMenuProps {
  items?: CoffeeItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (id: string) => void
  className?: string
}

export const DEFAULT_COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    subtitle: '30 ml · bold',
    description: 'a short, intense shot with golden crema',
    vessel: 'demitasse',
    layers: [{ type: 'espresso', amount: 0.72 }],
    crema: true,
  },
  {
    id: 'americano',
    name: 'Americano',
    subtitle: '240 ml · smooth',
    description: 'espresso over hot water',
    vessel: 'glass-mug',
    layers: [
      { type: 'water', amount: 0.54 },
      { type: 'espresso', amount: 0.24 },
    ],
    crema: true,
    blend: 0.9,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    subtitle: '180 ml · velvety',
    description: 'espresso with steamed milk and foam',
    vessel: 'cup',
    layers: [
      { type: 'espresso', amount: 0.3 },
      { type: 'milk', amount: 0.44 },
    ],
    foam: 0.14,
    art: 'heart',
  },
  {
    id: 'latte',
    name: 'Latte',
    subtitle: '300 ml · mellow',
    description: 'espresso with lots of steamed milk and microfoam',
    vessel: 'tall-glass',
    layers: [
      { type: 'espresso', amount: 0.25 },
      { type: 'milk', amount: 0.51 },
    ],
    foam: 0.11,
    blend: 0.15,
  },
]

const liquidColors: Record<CoffeeLiquid, string> = {
  espresso: '#4a2b1a',
  water: '#dcecf7',
  milk: '#f7f0e8',
}

const vesselStyles: Record<CoffeeVessel, { label: string; width: number; height: number }> = {
  demitasse: { label: 'Demitasse', width: 100, height: 118 },
  'glass-mug': { label: 'Mug', width: 120, height: 146 },
  cup: { label: 'Cup', width: 130, height: 132 },
  'tall-glass': { label: 'Tall glass', width: 110, height: 170 },
}

function CoffeeStage({ item }: { item: CoffeeItem }) {
  const reducedMotion = useReducedMotion()

  const layerHeights = item.layers.map((layer, index) => ({
    ...layer,
    y: 55 + (index * 18) % 25,
  }))

  return (
    <div className="relative flex h-[280px] w-full items-end justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_rgba(255,255,255,0)_36%),linear-gradient(180deg,#1a120f_0%,#120d0b_100%)]">
      <motion.div
        initial={reducedMotion ? false : { y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        <svg
          viewBox="0 0 220 220"
          className="h-[220px] w-[220px] drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
          role="img"
          aria-label={`${item.name} drink illustration`}
        >
          <defs>
            <linearGradient id={`cup-glow-${item.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
            </linearGradient>
          </defs>

          <ellipse cx="110" cy="198" rx="84" ry="18" fill="rgba(0,0,0,0.25)" />

          {item.vessel === 'demitasse' && (
            <g>
              <path d="M65 60 h90 a14 14 0 0 1 14 14 v52 a34 34 0 0 1 -34 34 h-50 a34 34 0 0 1 -34 -34 v-52 a14 14 0 0 1 14 -14 z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              <path d="M80 50 h60 v12 h-60z" fill="rgba(255,255,255,0.18)" />
              <path d="M98 64 h24 v46 h-24z" fill="url(#cup-glow-${item.id})" />
              <path d="M148 78 a18 18 0 0 1 0 34" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="4" strokeLinecap="round" />
              <path d="M55 74 h71" stroke="rgba(255,255,255,0.15)" strokeWidth="6" strokeLinecap="round" />
              <path d="M68 46 h84 a14 14 0 0 1 14 14 v5 h-112 v-5 a14 14 0 0 1 14 -14 z" fill="rgba(230,190,150,0.35)" />
            </g>
          )}

          {item.vessel === 'glass-mug' && (
            <g>
              <path d="M60 36 h100 a18 18 0 0 1 18 18 v70 a26 26 0 0 1 -26 26 h-84 a26 26 0 0 1 -26 -26 v-70 a18 18 0 0 1 18 -18 z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <path d="M160 70 q24 8 24 28 q0 20 -24 30" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="5" strokeLinecap="round" />
              <path d="M154 40 h26 a10 10 0 0 1 10 10 v56" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round" />
              <path d="M61 64 h98" stroke="rgba(255,255,255,0.15)" strokeWidth="10" strokeLinecap="round" />
            </g>
          )}

          {item.vessel === 'cup' && (
            <g>
              <path d="M52 54 h118 a18 18 0 0 1 18 18 v52 a22 22 0 0 1 -22 22 h-90 a22 22 0 0 1 -22 -22 v-52 a18 18 0 0 1 18 -18 z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <path d="M170 72 q20 8 20 24 q0 16 -20 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="5" strokeLinecap="round" />
              <path d="M67 44 h84 a18 18 0 0 1 18 18 v8 h-120 v-8 a18 18 0 0 1 18 -18 z" fill="rgba(255,255,255,0.18)" />
              <path d="M63 76 h92" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}

          {item.vessel === 'tall-glass' && (
            <g>
              <path d="M74 22 h72 a12 12 0 0 1 12 12 v116 a28 28 0 0 1 -28 28 h-40 a28 28 0 0 1 -28 -28 v-116 a12 12 0 0 1 12 -12 z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.42)" strokeWidth="2" />
              <path d="M62 26 h95" stroke="rgba(255,255,255,0.18)" strokeWidth="8" strokeLinecap="round" />
            </g>
          )}

          <g transform="translate(0 0)">
            {layerHeights.map((layer, index) => {
              const fill = liquidColors[layer.type]
              const height = item.vessel === 'tall-glass' ? 24 + (index * 12) : 22 + (index * 10)
              const yBase = 154 - index * 18

              return (
                <motion.rect
                  key={`${layer.type}-${index}`}
                  x={item.vessel === 'demitasse' ? 76 : item.vessel === 'cup' ? 66 : item.vessel === 'glass-mug' ? 72 : 78}
                  y={yBase - height}
                  width={item.vessel === 'cup' ? 90 : item.vessel === 'glass-mug' ? 80 : 70}
                  height={height}
                  rx={18}
                  fill={fill}
                  opacity={0.96}
                  initial={reducedMotion ? false : { scaleY: 0.3, opacity: 0.3 }}
                  animate={{ scaleY: 1, opacity: 0.96 }}
                  transition={{ duration: 0.5 + index * 0.08, ease: 'easeOut' }}
                />
              )
            })}

            {item.crema && (
              <motion.path
                d="M58 50 h104 a10 10 0 0 1 10 10 v8 H48 v-8 a10 10 0 0 1 10 -10 z"
                fill="rgba(255,196,96,0.75)"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}

            {item.art === 'heart' && (
              <path
                d="M110 121 c-8 -12 -18 -16 -25 -12 c-8 5 -9 17 -2 24 c8 9 27 18 27 18 s19 -9 27 -18 c7 -7 6 -19 -2 -24 c-7 -4 -17 0 -25 12 z"
                fill="rgba(255,255,255,0.65)"
                opacity={0.8}
              />
            )}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

export function CoffeePourMenu({
  items = DEFAULT_COFFEE_ITEMS,
  defaultValue,
  value,
  onValueChange,
  className,
}: CoffeePourMenuProps) {
  const isControlled = value !== undefined
  const [selected, setSelected] = React.useState(defaultValue ?? items[0]?.id ?? '')

  const currentValue = isControlled ? value : selected
  const currentItem = items.find((item) => item.id === currentValue) ?? items[0]

  const setValue = (next: string) => {
    if (!isControlled) {
      setSelected(next)
    }
    onValueChange?.(next)
  }

  return (
    <div className={cn('grid gap-6 rounded-[2rem] border border-white/10 bg-stone-900/80 p-3 shadow-2xl backdrop-blur-md md:grid-cols-[1.2fr_1.3fr] md:p-6', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200/80">Pour menu</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Coffee Bar</h2>
          </div>
          <div className="rounded-full border border-amber-200/20 bg-amber-100/5 px-3 py-1 text-xs text-amber-100/80">
            {items.length} drinks
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => {
            const active = item.id === currentValue

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setValue(item.id)}
                className={cn(
                  'flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-colors',
                  active
                    ? 'border-amber-300/50 bg-amber-500/10 shadow-[inset_0_0_0_1px_rgba(252,211,77,0.3)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                )}
                aria-pressed={active}
              >
                <div className="space-y-1">
                  <div className="text-lg font-medium text-white">{item.name}</div>
                  {item.subtitle && <div className="text-sm text-stone-300">{item.subtitle}</div>}
                </div>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-stone-950/50 text-xs text-stone-300">
                  {vesselStyles[item.vessel].label.slice(0, 2)}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="rounded-[1.7rem] border border-white/10 bg-stone-950/70 p-4 shadow-inner shadow-black/30">
        {currentItem && (
          <div className="space-y-4">
            <CoffeeStage item={currentItem} />

            <div className="space-y-3 px-1">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-200/70">Selected</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{currentItem.name}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200">
                  {vesselStyles[currentItem.vessel].label}
                </div>
              </div>

              {currentItem.description && <p className="text-sm text-stone-300">{currentItem.description}</p>}

              <div className="flex flex-wrap gap-2 text-xs text-stone-300">
                {currentItem.layers.map((layer, index) => (
                  <span key={`${layer.type}-${index}`} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5">
                    {layer.type} {layer.amount.toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
