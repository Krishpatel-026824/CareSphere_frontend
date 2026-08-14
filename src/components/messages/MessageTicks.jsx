const palettes = {
  onTeal: {
    sent: '#C8EFEA',
    delivered: '#C8EFEA',
    read: '#B8F0FF',
  },
  light: {
    sent: '#8696A0',
    delivered: '#8696A0',
    read: '#53BDEB',
  },
}

const singleTick =
  'M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267c.16.15.407.14.56-.014l6.388-8.048a.366.366 0 0 0-.064-.512z'

const doubleTick =
  'M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.541l1.32 1.266c.16.15.407.14.56-.014l6.388-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185c.16.15.407.14.56-.014l6.388-8.048a.365.365 0 0 0-.063-.51z'

export default function MessageTicks({ status = 'sent', variant = 'onTeal' }) {
  const isSingle = status === 'sent'
  const colors = palettes[variant] || palettes.onTeal

  return (
    <svg
      viewBox="0 0 16 15"
      width={isSingle ? 12 : 16}
      height="11"
      aria-hidden="true"
      className="block shrink-0"
    >
      <path fill={colors[status] || colors.sent} d={isSingle ? singleTick : doubleTick} />
    </svg>
  )
}
