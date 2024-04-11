import store from '@/store'
import { hotkeys } from './hotKeys.js'
import { DataUri } from '@antv/x6'
const voidFn = () => {}
const menuEvent = {
    toolbar: {
        iframe: {
            values: [
                {
                    name: 'format',
                    hotkey: 'Ctrl+Shift+P',
                    text: '格式面板',
                    event: hotkeys['Ctrl+Shift+P']
                },
                {
                    name: 'thumbnail',
                    hotkey: 'Ctrl+Shift+O',
                    text: '缩略图',
                    event: hotkeys['Ctrl+Shift+O']
                }
            ]
        },
        zoom: {
            values: [
                {
                    name: 'resetView',
                    hotkey: 'Ctrl+H',
                    text: 'Reset View',
                    event: hotkeys['Ctrl+H']
                },
                {
                    name: 'fitWindow',
                    hotkey: 'Ctrl+Shift+H',
                    text: 'Fit Window',
                    event: hotkeys['Ctrl+Shift+H']
                },
                {
                    name: '25',
                    text: '25%'
                },
                {
                    name: '50',
                    text: '50%'
                },
                {
                    name: '75',
                    text: '75%'
                },
                {
                    name: '100',
                    text: '100%'
                },
                {
                    name: '125',
                    text: '125%'
                },
                {
                    name: '150',
                    text: '150%'
                },
                {
                    name: '200',
                    text: '200%'
                },
                {
                    name: '300',
                    text: '300%'
                },
                {
                    name: '400',
                    hotkey: '',
                    text: '400%'
                }
            ],
            event: (graph, value) => {
                graph.zoomTo(value / 100)
                let zoomValue = graph.zoom() * 100
                zoomValue = `${Math.round(zoomValue)}%`
                store.dispatch("setZoomValue", zoomValue)
                return graph.zoom()
            }
        },
        zoomIn: {
            hotkey: 'Ctrl+=',
            event: hotkeys['Ctrl+=']
        },
        zoomOut: {
            hotkey: 'Ctrl+-',
            event: hotkeys['Ctrl+-']
        },
        undo: {
            hotkey: 'Ctrl+Z',
            event: hotkeys['Ctrl+Z']
        },
        redo: {
            hotkey: 'Ctrl+Shift+Z',
            event: hotkeys['Ctrl+Shift+Z']
        },
        delete: {
            hotkey: 'Delete',
            event: hotkeys['Delete']
        },
        grid: {
            hotkey: 'Ctrl+Shift+G',
            event: hotkeys['Ctrl+Shift+G']
        },
        copy: {
            hotkey: '',
            event: (graph, e) => {
                hotkeys['Ctrl+C'](graph, e)
                hotkeys['Ctrl+V'](graph, e)
            }
        },
        cut: {
            hotkey: 'Ctrl+X',
            event: hotkeys['Ctrl+X']
        },
        bold: {
            hotkey: 'Ctrl+B',
            event: hotkeys['Ctrl+B']
        },
        italic: {
            hotkey: 'Ctrl+I',
            event: hotkeys['Ctrl+I']
        },
        strikethrough: {
            hotkey: 'Ctrl+Shift+X',
            event: hotkeys['Ctrl+Shift+X']
        },
        underline: {
            hotkey: 'Ctrl+U',
            event: hotkeys['Ctrl+U']
        }
    },
    menubar: {
        file: [
            {
                text: 'New File',
                name: 'newFile',
                hotkey: 'Ctrl+N',
                event: hotkeys['Ctrl+N'] || voidFn
            },
            {
                text: 'New Window',
                name: 'newWindow',
                hotkey: 'Ctrl+Shift+N',
                event: hotkeys['Ctrl+Shift+N'] || voidFn
            },
            {
                name: 'divider'
            },
            {
                text: 'Open',
                name: 'open',
                hotkey: 'Ctrl+O',
                event: hotkeys['Ctrl+O'] || voidFn
            },
            {
                text: 'Open Workspace...',
                name: 'openWorkspace',
                hotkey: ''
            },
            {
                name: 'divider'
            },
            {
                text: 'Export',
                arrow: true,
                children: [
                    {
                        text: 'SVG',
                        name: 'svg',
                        event: (graph, e) => {
                            let graphName = store.getters.currentGraphName
                            graph.toSVG((dataUri) => {
                                // 下载
                                DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), `${graphName}.svg`)
                            })
                        }
                    },
                    {
                        text: 'PNG',
                        name: 'png',
                        event: (graph, e) => {
                            let graphName = store.getters.currentGraphName
                            graph.toPNG((dataUri) => {
                                // 下载
                                DataUri.downloadDataUri(dataUri, `${graphName}.png`)
                            })
                        }
                    },
                    {
                        text: 'JPEG',
                        name: 'jpeg',
                        event: (graph, e) => {
                            let graphName = store.getters.currentGraphName
                            graph.toJPEG((dataUri) => {
                                // 下载
                                DataUri.downloadDataUri(dataUri, `${graphName}.jpeg`)
                            })
                        }
                    }
                ],
                disabled: false
            },
            {
                text: 'Save',
                name: 'save',
                hotkey: 'Ctrl+S',
                event: hotkeys['Ctrl+S'] || voidFn
            },
            {
                text: 'Save As...',
                name: 'saveAs',
                hotkey: 'Ctrl+Shift+S',
                event: hotkeys['Ctrl+Shift+S'] || voidFn
            },
            {
                text: 'Save All',
                name: 'saveAll',
                hotkey: 'Ctrl+Alt+S',
                event: hotkeys['Ctrl+Alt+S'] || voidFn
            }
        ],
        edit: [
            {
                text: 'Undo',
                name: 'undo',
                hotkey: 'Ctrl+Z',
                event: hotkeys['Ctrl+Z'] || voidFn,
                disabled: false
            },
            {
                text: 'Redo',
                name: 'redo',
                hotkey: 'Ctrl+Shift+Z',
                event: hotkeys['Ctrl+Shift+Z'] || voidFn,
                disabled: false
            },
            {
                name: 'divider'
            },
            {
                text: 'Cut',
                name: 'cut',
                hotkey: 'Ctrl+X',
                event: hotkeys['Ctrl+X'] || voidFn,
                disabled: true
            },
            {
                text: 'Copy',
                name: 'copy',
                hotkey: 'Ctrl+C',
                event: hotkeys['Ctrl+C'] || voidFn,
                disabled: true
            },
            {
                text: 'Paste',
                name: 'paste',
                hotkey: 'Ctrl+V',
                event: hotkeys['Ctrl+V'] || voidFn,
                disabled: true
            },
            {
                name: 'divider'
            },
            {
                text: 'Find',
                name: 'find',
                hotkey: 'Ctrl+F',
                event: hotkeys['Ctrl+F'] || voidFn,
                disabled: false
            },
            {
                text: 'Replace',
                name: 'replace',
                hotkey: 'Ctrl+Alt+F',
                event: hotkeys['Ctrl+Alt+F'] || voidFn,
                disabled: false
            }
        ],
        view: [
            {
                text: 'Zen Mode',
                name: 'zen',
                hotkey: 'Ctrl+K+Z',
                event: hotkeys['Ctrl+K+Z'] || voidFn,
                disabled: false
            },
            {
                text: 'Full Screen',
                name: 'fullscreen',
                hotkey: 'Ctrl+Shift+F',
                event: hotkeys['Ctrl+Shift+F'] || voidFn,
                disabled: false
            },
            {
                name: 'divider'
            },
            {
                text: 'Appearance',
                arrow: true,
                children: [
                    {
                        text: 'Show Side Bar',
                        name: 'side-bar'
                    },
                    {
                        text: 'Show Status Bar',
                        name: 'status-bar'
                    },
                    {
                        text: 'Show Activity Bar',
                        name: 'activity-bar'
                    },
                    {
                        text: 'Show Editor Area',
                        name: 'editor-area'
                    },
                    {
                        text: 'Show Panel',
                        name: 'show-panel'
                    }
                ],
                disabled: false
            },
            {
                name: 'divider'
            },
            {
                text: 'Zoom In',
                name: 'zoomin',
                hotkey: 'Ctrl +',
                event: hotkeys['Ctrl+='] || voidFn,
                disabled: false
            },
            {
                text: 'Zoom Out',
                name: 'zoomout',
                hotkey: 'Ctrl -',
                event: hotkeys['Ctrl+-'] || voidFn,
                disabled: false
            }
        ],
        help: [
            {
                text: 'Welcome',
                name: 'welcome',
                hotkey: '',
                event: voidFn,
                disabled: false
            },
            {
                text: 'Documention',
                name: 'documention',
                hotkey: '',
                event: voidFn,
                disabled: false
            },
            {
                text: 'Aoubt',
                name: 'about',
                hotkey: '',
                event: voidFn,
                disabled: false
            }
        ]
    }
}
export default menuEvent