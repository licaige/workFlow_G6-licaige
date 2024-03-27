import type { I18n } from '@uppy/utils/lib/Translator'
import { h } from 'preact'

interface PermissionsScreenProps {
  icon: () => JSX.Element | null
  hasAudio: boolean
  i18n: I18n
}

export default (props: PermissionsScreenProps): JSX.Element => {
  const { icon, hasAudio, i18n } = props
  return (
    <div className="uppy-Audio-permissons">
      <div className="uppy-Audio-permissonsIcon">{icon()}</div>
      <h1 className="uppy-Audio-title">
        {hasAudio ? i18n('allowAudioAccessTitle') : i18n('noAudioTitle')}
      </h1>
      <p>
        {hasAudio ?
          i18n('allowAudioAccessDescription')
        : i18n('noAudioDescription')}
      </p>
    </div>
  )
}
