interface DividerProps {
  className?: string
  center?: boolean
}

// Ornamental rule echoing the original "separateur" graphic, drawn in CSS.
export default function Divider({ className = '', center = true }: DividerProps) {
  return (
    <div className={`${center ? 'mx-auto' : ''} ${className}`}>
      <span className="divider-rule block" />
    </div>
  )
}
