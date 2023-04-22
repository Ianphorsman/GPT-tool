import colors from 'tailwindcss/colors'

const Button = ({
  user = {},
  children,
  onClick,
  linearGradientColor = colors.slate[950],
  radialGradientColorFrom = colors.sky[950],
  radialGradientColorTo = colors.indigo[950]
}) => {

  return (
    <div onClick={onClick} style={{
      border: 'double 2px transparent',
      backgroundImage: `linear-gradient(to bottom right, ${linearGradientColor}, ${linearGradientColor}), radial-gradient(circle at top left, ${radialGradientColorFrom}, ${radialGradientColorTo})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box'
    }} className={`px-4 py-2 rounded-md bg-blend-color-burn active:saturate-200 active:brightness-200 active:filter hover:cursor-pointer hover:brightness-150 relative hover:hue-rotate-90 transition duration-300 hover:duration-300`}>
      <button className="px-4 py-2 rounded text-stone-400 bg-transparent">
          {children}
      </button>
    </div>
  )
}

export default Button
