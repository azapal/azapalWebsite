<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/utils'

// Define button variants
const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9  px-3',
        lg: 'h-11  px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>

const props = defineProps<{
  variant?: ButtonVariantProps['variant']
  size?: ButtonVariantProps['size']
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  class?: string
}>()

const classes = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :class="classes"
  >
    <slot name="children"></slot>
  </button>
</template>
