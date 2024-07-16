/**
 * A React component that renders a dot pattern SVG background.
 *
 * @param {DotPatternProps} props - The component props.
 * @param {number} [props.width=16] - The width of the dot pattern.
 * @param {number} [props.height=16] - The height of the dot pattern.
 * @param {number} [props.x=0] - The x-coordinate of the pattern.
 * @param {number} [props.y=0] - The y-coordinate of the pattern.
 * @param {number} [props.cx=1] - The x-coordinate of the circle in the pattern.
 * @param {number} [props.cy=1] - The y-coordinate of the circle in the pattern.
 * @param {number} [props.cr=1] - The radius of the circle in the pattern.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @returns {JSX.Element} - The rendered dot pattern SVG.
 */
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface DotPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  [key: string]: any
}
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cy} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}

export default DotPattern
