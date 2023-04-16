import colors from "tailwindcss/colors"
import Message from "../../components/Message"

const DesignSystem = ({
    colorWeight = 950
}) => {
   return (
    <main className="flex min-h-screen flex-wrap flex-row items-center justify-center bg-slate-950 gap-4">
        <p>Design System layout</p>
        <Message
            linearGradientColor={colors.emerald[colorWeight]}
            radialGradientColorFrom={colors.green[colorWeight]}
            radialGradientColorTo={colors.teal[colorWeight]}
        />
        <Message
            linearGradientColor={colors.cyan[colorWeight]}
            radialGradientColorFrom={colors.teal[colorWeight]}
            radialGradientColorTo={colors.sky[colorWeight]}
        />
        <Message />
        <Message
            linearGradientColor={colors.indigo[colorWeight]}
            radialGradientColorFrom={colors.blue[colorWeight]}
            radialGradientColorTo={colors.violet[colorWeight]}
        />
        <Message
            linearGradientColor={colors.violet[colorWeight]}
            radialGradientColorFrom={colors.indigo[colorWeight]}
            radialGradientColorTo={colors.purple[colorWeight]}
        />
        <Message
            linearGradientColor={colors.purple[colorWeight]}
            radialGradientColorFrom={colors.violet[colorWeight]}
            radialGradientColorTo={colors.fuchsia[colorWeight]}
        />
        <Message
            linearGradientColor={colors.pink[colorWeight]}
            radialGradientColorFrom={colors.fuchsia[colorWeight]}
            radialGradientColorTo={colors.rose[colorWeight]}
        />
        <Message
            linearGradientColor={colors.red[colorWeight]}
            radialGradientColorFrom={colors.rose[colorWeight]}
            radialGradientColorTo={colors.orange[colorWeight]}
        />
        <Message
            linearGradientColor={colors.orange[colorWeight]}
            radialGradientColorFrom={colors.red[colorWeight]}
            radialGradientColorTo={colors.amber[colorWeight]}
        />
        <Message
            linearGradientColor={colors.amber[colorWeight]}
            radialGradientColorFrom={colors.orange[colorWeight]}
            radialGradientColorTo={colors.yellow[colorWeight]}
        />
    </main>
   )
}

export default DesignSystem
