import colors from 'tailwindcss/colors'

const Button = ({
  children,
  onClick,
  linearGradientColor = colors.slate[950],
  radialGradientColorFrom = colors.indigo[950],
  radialGradientColorTo = colors.sky[950],
  style = {
    border: 'double 2px transparent',
    backgroundImage: `linear-gradient(to bottom right, ${linearGradientColor}, ${linearGradientColor}), radial-gradient(circle at top left, ${radialGradientColorFrom}, ${radialGradientColorTo})`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box'
  }
}) => {

  return (
    <div onClick={onClick} style={style} className={`w-max px-4 py-2 bg-blend-color-burn active:saturate-200 active:brightness-200 active:filter hover:cursor-pointer hover:brightness-150 relative hover:hue-rotate-90 transition duration-300 hover:duration-300`}>
      <button className="px-4 py-2 text-stone-400 bg-transparent">
        {children}
      </button>
    </div>
  )
}

export default Button
