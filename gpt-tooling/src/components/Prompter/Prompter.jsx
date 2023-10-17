
import PropTypes from 'prop-types'
import { Join, Button, Input } from 'react-daisyui'

const Prompter = ({
  input,
  handleSubmit,
  handleShow,
  handleInputChange
}) => {
  return (
    <form
      className="flex flex-row justify-center p-4"
      onSubmit={handleSubmit}
    >
      <Join className="flex flex-row w-full justify-center">
        <Button
          className="join-item rounded-l-full"
          color="secondary"
          onClick={handleShow}
          type="button"
        >
          Settings
        </Button>
        <Input
          className="join-item max-w-prose flex-1"
          color="secondary"
          placeholder="Type your prompt here..."
          value={input}
          onChange={handleInputChange}
        />
        <Button
          className="join-item rounded-r-full"
          color="secondary"
          type="submit"
        >
          Chat
        </Button>
      </Join>
    </form>
  )
}

Prompter.propTypes = {
  onSubmit: PropTypes.func
}

export default Prompter
