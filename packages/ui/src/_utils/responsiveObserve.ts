export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>

export const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']
