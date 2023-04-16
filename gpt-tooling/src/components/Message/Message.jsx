import colors from 'tailwindcss/colors'

const Message = ({
    component = 'p',
    user = {},
    text = 'Pure CSS Sexiness',
    linearGradientColor = colors.slate[950],
    radialGradientColorFrom = colors.sky[950],
    radialGradientColorTo = colors.indigo[950],
    hueRotate = 'hue-rotate-60',
    blendMode = 'multiply'
}) => {
    return (
        <component style={{
            border: 'double 2px transparent',
            backgroundImage: `linear-gradient(to bottom right, ${linearGradientColor}, ${linearGradientColor}), radial-gradient(circle at top left, ${radialGradientColorFrom}, ${radialGradientColorTo})`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box'
        }} className={`px-4 py-2 hover:cursor-pointer rounded-md relative bg-blend-${blendMode} hover:${hueRotate} transition duration-300 hover:duration-300`}>
            <div className="px-4 py-2 rounded text-stone-400 bg-transparent">
                {text}
            </div>
        </component>
    )
}

export default Message