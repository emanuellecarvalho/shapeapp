import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white/60',
        success: 'bg-[#1D9E75]/10 text-[#1D9E75]',
        warning: 'bg-[#EF9F27]/10 text-[#EF9F27]',
        info: 'bg-[#378ADD]/10 text-[#378ADD]',
        purple: 'bg-[#7F77DD]/10 text-[#7F77DD]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
