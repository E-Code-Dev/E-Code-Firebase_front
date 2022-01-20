import type { VFC, ChangeEventHandler } from 'react'
import TextAreaEpisode from './styled'

type EpisodeTextAreaProps = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  value?: string
}

const EpisodeTextArea: VFC<EpisodeTextAreaProps> = (props) => {
  const { onChange, value } = props

  return <TextAreaEpisode onChange={onChange} value={value} />
}

export default EpisodeTextArea
