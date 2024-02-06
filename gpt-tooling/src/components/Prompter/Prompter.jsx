
import PropTypes from 'prop-types'
import { Join, Button, Input, Loading, Tooltip } from 'react-daisyui'

const Prompter = ({
  input,
  handleSubmit,
  handleShow,
  handleInputChange,
  stop,
  isLoading
}) => {
  return (
    <form
      className="flex flex-row self-center w-full p-4 max-w-prose"
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
          className="join-item flex-1"
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
          {isLoading ? (
            <Button onClick={stop}>
              <Loading variant="ring" color="warning" />
              <small>Stop</small>
            </Button>
          ) : (
            'Chat'
          )}
        </Button>
      </Join>
    </form>
  )
}

Prompter.propTypes = {
  onSubmit: PropTypes.func
}

export default Prompter
