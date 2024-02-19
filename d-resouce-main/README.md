# 🔦 d-resouce

Web-based resource (file, folder) reading tool `If this library is helpful to you, I look forward to Star encouragement`

[简体中文](README.zh-CN.md) | English

## 🎲 Support

A tool built into web applications that facilitates resource (file and folder) reading, making development tasks more efficient and enjoyable.

Key Features:

- Drag-and-Drop Support: Allows users to drag and drop files and folders directly into the tool, simplifying resource import.
- Clipboard Support: Supports copying and pasting files from the clipboard.
- System File and Folder Selection: Enables users to select files or folders directly from their system.
- Multiple Data Formats: Offers data in two formats - as an array or in a tree structure, catering to different use cases.
- Read-Only files Mode: Supports read-only access to files.
- Real-Time Filtering: Provides real-time filtering of files and folders, making it easier to locate specific resources.
- Rule Validation: Offers real-time validation of file rules; if a file doesn't meet the specified criteria, the operation can be interrupted.
- Folder Size Tracking: Automatically calculates and displays the total size of all files within each level of a folder.
- Customizable UI Hooks: Exposes drag-and-drop hover and leave hooks, allowing for UI customization and enhanced user experiences.

## 🛵 Use

1. Install the `d-resouce` dependency

```shell
npm install d-resouce
```

2. Instantiate the `ResHandle` 

```js
import { ResHandle } from "d-resouce";

const resHandle = new ResHandle(options);
```
3. Use helper functions

```js
import { selectResource, selectFileChange, selectFolderChange, filterSize } from "d-resouce"

```

## 📒 Document

### options

|  Field   | Type  | Description | params |
|  ----  | ----  | ---- | ---- |
| targetDom  | HTMLElement | The DOM element associated with the drag-and-drop event | ---- |
| dragoverFuc  | Function | Hover event for the drag-and-drop object | Event object |
| dragleaveFuc  | Function | Leave event for the drag-and-drop object | Event object |
| beforeReadFuc  | Function | Hook function for reading drag-and-drop or paste events before data is read | ---- |
| readDataFuc  | Function | Hook function for reading drag-and-drop or paste events' results | Data assembled according to the specified mode |
| validFuc  | Function | All resources read are passed to this function; returning false aborts the read operation | File: size、fullPath、name、type、file |
| filterFuc  | Function | All resources read are passed to this function; returning false filters out the resource. Note: Filtering out a folder will exclude its contents from the read | Two types: files (parameters as in validFuc) and folders: totalSize, fullPath, name, type, file, children |
| mode  | String | Value can be 'array' or 'tree' | ---- |
| onlyFile  | Boolean | Indicates whether to read only files, ignoring folders | ---- |
| targetDom  | HTMLElement | The DOM element associated with the drag-and-drop event | ---- |

### other
|  Field   | Type  | Description | Enter params | Return params |
|  ----  | ----  | ---- | ---- | ---- |
| selectResource  | Function | Opens the system resource dialog for selecting resources | 1. Whether it's a directory upload 2. An object with additional attributes for the <input type="file>, for example: { multiple: true } | Native reading results |
| selectFolderChange  | Function | Handles folder upload and assembles data according to the specified mode | 1. Results from folder upload 2. Mode type ('array' or 'tree'). | Processed results |
| selectFileChange  | Function | Handles file upload results (without hierarchy) and does not require specifying a mode | 1. Results from file upload 2.Custom formatting method | Processed results (default format according to readDataFuc) |
| filterSize  | Function | Converts file sizes to specific units (B, KB, MB, GB, TB) | 1.File size | Size as a string with units (e.g., "2.5 MB") |


## 🙌 交流讨论

wetChat: yl66915
qq email: 1205836625@qq.com 
