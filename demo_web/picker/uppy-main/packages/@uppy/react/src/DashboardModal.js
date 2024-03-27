import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import DashboardPlugin from '@uppy/dashboard'
import { cssSize, locale, metaFields, plugins, uppy as uppyPropType } from './propTypes.js'
import getHTMLProps from './getHTMLProps.js'
import nonHtmlPropsHaveChanged from './nonHtmlPropsHaveChanged.js'

/**
 * React Component that renders a Dashboard for an Uppy instance in a Modal
 * dialog. Visibility of the Modal is toggled using the `open` prop.
 */

class DashboardModal extends Component {
  componentDidMount () {
    this.installPlugin()
  }

  componentDidUpdate (prevProps) {
    const { uppy, open, onRequestClose } = this.props
    if (prevProps.uppy !== uppy) {
      this.uninstallPlugin(prevProps)
      this.installPlugin()
    } else if (nonHtmlPropsHaveChanged(this.props, prevProps)) {
      const options = { ...this.props, onRequestCloseModal: onRequestClose }
      delete options.uppy
      this.plugin.setOptions(options)
    }
    if (prevProps.open && !open) {
      this.plugin.closeModal()
    } else if (!prevProps.open && open) {
      this.plugin.openModal()
    }
  }

  componentWillUnmount () {
    this.uninstallPlugin()
  }

  installPlugin () {
    const { id='react:DashboardModal', target=this.container, open, onRequestClose, uppy } = this.props
    const options = {
      ...this.props,
      id,
      target,
      onRequestCloseModal: onRequestClose,
    }
    delete options.uppy

    uppy.use(DashboardPlugin, options)

    this.plugin = uppy.getPlugin(options.id)
    if (open) {
      this.plugin.openModal()
    }
  }

  uninstallPlugin (props = this.props) {
    const { uppy } = props

    uppy.removePlugin(this.plugin)
  }

  render () {
    return h('div', {
      className: 'uppy-Container',
      ref: (container) => {
        this.container = container
      },
      ...getHTMLProps(this.props),
    })
  }
}

/* eslint-disable react/no-unused-prop-types */
DashboardModal.propTypes = {
  uppy: uppyPropType.isRequired,
  target: typeof window !== 'undefined' ? PropTypes.instanceOf(window.HTMLElement) : PropTypes.any,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeModalOnClickOutside: PropTypes.bool,
  disablePageScrollWhenModalOpen: PropTypes.bool,
  inline: PropTypes.bool,
  plugins,
  width: cssSize,
  height: cssSize,
  showProgressDetails: PropTypes.bool,
  note: PropTypes.string,
  metaFields,
  proudlyDisplayPoweredByUppy: PropTypes.bool,
  autoOpen: PropTypes.oneOf(['imageEditor', 'metaEditor', null]),
  animateOpenClose: PropTypes.bool,
  browserBackButtonClose: PropTypes.bool,
  closeAfterFinish: PropTypes.bool,
  disableStatusBar: PropTypes.bool,
  disableInformer: PropTypes.bool,
  disableThumbnailGenerator: PropTypes.bool,
  disableLocalFiles: PropTypes.bool,
  disabled: PropTypes.bool,
  hideCancelButton: PropTypes.bool,
  hidePauseResumeButton: PropTypes.bool,
  hideProgressAfterFinish: PropTypes.bool,
  hideRetryButton: PropTypes.bool,
  hideUploadButton: PropTypes.bool,
  showLinkToFileUploadResult: PropTypes.bool,
  showRemoveButtonAfterComplete: PropTypes.bool,
  showSelectedFiles: PropTypes.bool,
  waitForThumbnailsBeforeUpload: PropTypes.bool,
  fileManagerSelectionType: PropTypes.string,
  theme: PropTypes.string,
  // pass-through to ThumbnailGenerator
  thumbnailType: PropTypes.string,
  thumbnailWidth: PropTypes.number,
  locale,
}
// Must be kept in sync with @uppy/dashboard/src/Dashboard.tsx.
DashboardModal.defaultProps = {
  metaFields: [],
  plugins: [],
  inline: false,
  width: 750,
  height: 550,
  thumbnailWidth: 280,
  thumbnailType: 'image/jpeg',
  waitForThumbnailsBeforeUpload: false,
  showLinkToFileUploadResult: false,
  showProgressDetails: false,
  hideUploadButton: false,
  hideCancelButton: false,
  hideRetryButton: false,
  hidePauseResumeButton: false,
  hideProgressAfterFinish: false,
  note: null,
  closeModalOnClickOutside: false,
  closeAfterFinish: false,
  disableStatusBar: false,
  disableInformer: false,
  disableThumbnailGenerator: false,
  disablePageScrollWhenModalOpen: true,
  animateOpenClose: true,
  fileManagerSelectionType: 'files',
  proudlyDisplayPoweredByUppy: true,
  showSelectedFiles: true,
  showRemoveButtonAfterComplete: false,
  browserBackButtonClose: false,
  theme: 'light',
  autoOpen: false,
  disabled: false,
  disableLocalFiles: false,

  // extra
  open: undefined,
  target: undefined,
  locale: null,
  onRequestClose: undefined,
}

export default DashboardModal
