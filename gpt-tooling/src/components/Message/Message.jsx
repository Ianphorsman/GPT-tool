const Message = ({
    component = 'p',
    user = {},
    text = 'This is some message text'
}) => {
    return (
        <component style={{ borderImage: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.2)) 2px round' }} className="px-4 py-2 bg-gradient-to-tl from-pink-300 to-white before:rounded-lg before:opacity-25 before:bg-gradient-to-br before:from-white before:to-pink-300 before:top-0 before:left-0 before:w-full before:h-full rounded relative before:content-[''] before:absolute before:-z-10">
            <div className="px-4 py-2 rounded bg-white shadow">
                {text}
            </div>
        </component>
    )
}

export default Message