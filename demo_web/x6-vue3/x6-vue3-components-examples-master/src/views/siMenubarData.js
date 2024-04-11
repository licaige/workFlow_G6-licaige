export default [
    {
        text: "文件",
        items: [
            {
                left: "新建",
                right: ""
            },
            {
                left: "打开最近使用文件",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "123"
                    },
                    {
                        text: "123"
                    }
                ],
                divided: true
            },
            {
                left: "保存",
                right: "Ctrl+S"
            },
            {
                left: "另存为",
                right: "Ctrl+Shift+S",
                divided: true
            },
            {
                left: "重命名",
                right: ""
            },
            {
                left: "创建副本",
                right: "",
                divided: true
            },
            {
                left: "导入",
                right: ""
            },
            {
                left: "导出为",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "PNG"
                    },
                    {
                        text: "JPEG"
                    },
                    {
                        text: "SVG"
                    },
                    {
                        text: "PDF"
                    },
                    {
                        text: "HTML"
                    }
                ],
                divided: true
            },
            {
                left: "新增图库",
                right: "",
                divided: true
            },
            {
                left: "属性",
                right: "",
                divided: true
            },
            {
                left: "页面设置",
                right: ""
            },
            {
                left: "打印",
                right: "Ctrl+P",
                divided: true
            },
            {
                left: "关闭",
                right: ""
            }
        ]
    },
    {
        text: "编辑",
        items: [
            {
                left: "撤销",
                right: "Ctrl+Z"
            },
            {
                left: "重做",
                right: "Ctrl+Y",
                divided: true
            },
            {
                left: "剪切",
                right: "Ctrl+X"
            },
            {
                left: "复制",
                right: "Ctrl+C"
            },
            {
                left: "复制为图像",
                right: ""
            },
            {
                left: "黏贴",
                right: "Ctrl+V"
            },
            {
                left: "删除",
                right: "Delete",
                divided: true
            },
            {
                left: "创建副本",
                right: "Ctrl+D",
                divided: true
            },
            {
                left: "查找/替换",
                right: "Ctrl+F",
                divided: true
            },
            {
                left: "编辑数据",
                right: "Ctrl+M"
            },
            {
                left: "编辑提示",
                right: "Alt+Shift+T",
                divided: true
            },
            {
                left: "编辑样式",
                right: "Ctrl+E"
            },
            {
                left: "编辑几何图形",
                right: "Ctrl+Shift+M",
                divided: true
            },
            {
                left: "编辑文本",
                right: "F2/Enter",
                divided: true
            },
            {
                left: "选择顶点",
                right: "Ctrl+Shift+I"
            },
            {
                left: "选择边线",
                right: "Ctrl+Shift+E"
            },
            {
                left: "全选",
                right: "Ctrl+A"
            },
            {
                left: "全不选",
                right: "Ctrl+Shift+A",
                divided: true
            },
            {
                left: "锁定/解锁",
                right: "Ctrl+L"
            }
        ]
    },
    {
        text: "查看",
        items: [
            {
                left: "格式面板",
                right: "Ctrl+Shift+P",
                edit: true,
                defaultCheck: true
            },
            {
                left: "缩略图",
                right: "Ctrl+Shift+O",
                edit: true,
                defaultCheck: false,
                divided: true
            },
            {
                left: "搜索图形",
                right: "",
                edit: true,
                defaultCheck: true
            },
            {
                left: "便笺本",
                right: "",
                edit: true,
                defaultCheck: true
            },
            {
                left: "形状",
                right: "",
                divided: true
            },
            {
                left: "页面视图",
                right: "",
                edit: true,
                defaultCheck: true
            },
            {
                left: "页面比例",
                right: ""
            },
            {
                left: "单位",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "点(Points)",
                        edit: true,
                        defaultCheck: true
                    },
                    {
                        text: "英尺(Inches)",
                        edit: true,
                        defaultCheck: false
                    },
                    {
                        text: "毫米(Millimeters)",
                        edit: true,
                        defaultCheck: false
                    },
                    {
                        text: "Meters",
                        edit: true,
                        defaultCheck: false
                    }
                ],
                divided: true
            },
            {
                left: "滚动条",
                right: "",
                edit: true,
                defaultCheck: true
            },
            {
                left: "提示",
                right: "",
                edit: true,
                defaultCheck: true
            },
            {
                left: "标尺",
                right: "",
                edit: true,
                defaultCheck: false,
                divided: true
            },
            {
                left: "网格",
                right: "Ctrl+Shift+G",
                edit: true,
                defaultCheck: true
            },
            {
                left: "参考线",
                right: "",
                edit: true,
                defaultCheck: true,
                divided: true
            },
            {
                left: "重置视图",
                right: "Enter/Home"
            },
            {
                left: "放大",
                right: "Ctrl+Mousewheel"
            },
            {
                left: "缩小",
                right: "Ctrl+Mousewheel",
                divided: true
            },
            {
                left: "全屏",
                right: ""
            }
        ]
    },
    {
        text: "调整图形",
        items: [
            {
                left: "移至最前",
                right: "Ctrl+Shift+F"
            },
            {
                left: "移至最后",
                right: "Ctrl+Shift+B",
                divided: true
            },
            {
                left: "方向",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "水平翻转"
                    },
                    {
                        text: "垂直翻转"
                    },
                    {
                        text: "旋转"
                    }
                ]
            },
            {
                left: "旋转90°/翻转",
                right: "Ctrl+R"
            },
            {
                left: "对齐",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "左对齐"
                    },
                    {
                        text: "水平居中"
                    },
                    {
                        text: "右对齐"
                    },
                    {
                        text: "向上对齐"
                    },
                    {
                        text: "垂直居中"
                    },
                    {
                        text: "向下对齐"
                    }
                ],
                divided: true
            },
            {
                left: "布局",
                right: "",
                divided: true
            },
            {
                left: "组合",
                right: "Ctrl+G"
            },
            {
                left: "取消组合",
                right: "Ctrl+Shift+U"
            },
            {
                left: "移出组合",
                right: ""
            }
        ]
    },
    {
        text: "其他",
        items: [
            {
                left: "主题",
                right: "",
                rightIcon: true,
                children: [
                    {
                        text: "默认值",
                        edit: true,
                        defaultCheck: true
                    }
                ],
                divided: true
            },
            {
                left: "折叠/展开",
                right: "",
                edit: true,
                defaultCheck: true,
                divided: true
            },
            {
                left: "自动保存",
                right: "",
                edit: true,
                defaultCheck: true,
                divided: true
            }
        ]
    }
]



