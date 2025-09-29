import type { QRProps } from '@v-c/qrcode'

import type { Locale } from '../locale'

type ImageSettings = QRProps['imageSettings']

export type { ImageSettings, QRProps }

export type QRPropsCanvas = QRProps & HTMLCanvasElement

export type QRPropsSvg = QRProps & SVGSVGElement

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned'

export interface StatusRenderInfo {
  status: Exclude<QRStatus, 'active'>
  locale: Locale['QRCode']
  onRefresh?: () => void
}

export interface QRCodeProps extends QRProps {
  type?: 'canvas' | 'svg'
  prefixCls?: string
  icon?: string
  iconSize?: number | { width: number, height: number }
  bordered?: boolean
  errorLevel?: 'L' | 'M' | 'Q' | 'H'
  status?: QRStatus
  onRefresh?: () => void
  color?: string
}

export const QRCodeDefaultProps: QRCodeProps = {
  type: 'canvas',
  size: 160,
  color: 'rgba(0, 0, 0, 0.88)',
  errorLevel: 'M',
  status: 'active',
  bordered: true,
  prefixCls: 'ant-qr-code',
  bgColor: 'transparent',
} as const

export interface QRCodeEmits {
  refresh: () => void
}

export interface QRCodeSlots {
  statusRender: (info: StatusRenderInfo) => any
}

export interface QRcodeStatusProps {
  prefixCls: string
  locale?: Locale['QRCode']
  onRefresh?: QRCodeProps['onRefresh']
  status: StatusRenderInfo['status']
}
