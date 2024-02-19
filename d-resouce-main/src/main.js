const noop = () => {};
export * from "./utils";

import { ModeType, errEnum, dirReadEntry } from "./utils";
export class ResHandle {
  constructor(options) {
    this.targetDom = options.targetDom;
    this.dragoverFuc = options.dragoverFuc || noop;
    this.dragleaveFuc = options.dragleaveFuc || noop;
    this.beforeReadFuc = options.beforeReadFuc;
    this.readDataFuc = options.readDataFuc || noop;
    this.validFuc = options.validFuc;
    // filter resouce
    this.filterFuc = options.filterFuc;
    // data Format --- array tree
    this.mode = options.mode || ModeType.Array;
    // 只读文件（树形 tree 下设置无效）
    this.onlyFile = options.onlyFile || false;

    this.bindFuc = null;
    this.targetOverFlag = false;
    this.init();
  }
  init() {
    if (this.targetDom) {
      this.bindFuc = {
        dragFuc: this.dragFuc.bind(this),
        getDrapFile: this.getDrapFile.bind(this),
        pasteFuc: this.pasteFuc.bind(this),
        mouseFuc: this.mouseFuc.bind(this),
      };
      this.targetDom.addEventListener(
        "mouseenter",
        this.bindFuc.mouseFuc,
        false
      );
      this.targetDom.addEventListener(
        "mouseleave",
        this.bindFuc.mouseFuc,
        false
      );
      // this.targetDom.addEventListener('paste', this.bindFuc.pasteFuc, false)
      document.addEventListener("paste", this.bindFuc.pasteFuc, false);
      this.targetDom.addEventListener("dragover", this.bindFuc.dragFuc, false);
      this.targetDom.addEventListener("dragleave", this.bindFuc.dragFuc, false);
      this.targetDom.addEventListener("drop", this.bindFuc.getDrapFile, false);
    }
  }
  destroy() {
    this.targetDom.removeEventListener("dragover", this.bindFuc.dragFuc, false);
    this.targetDom.removeEventListener(
      "dragleave",
      this.bindFuc.dragFuc,
      false
    );
    this.targetDom.removeEventListener("drop", this.bindFuc.getDrapFile, false);
    this.bindFuc = null;
  }
  mouseFuc(e) {
    if (e.type === "mouseenter") {
      this.targetOverFlag = true;
    } else {
      // mouseleave
      this.targetOverFlag = false;
    }
  }
  dragFuc(e) {
    e.stopPropagation();
    e.preventDefault();
    // if (!e.currentTarget.contains(e.relatedTarget)) {
    //   this.dragOver = false
    // }
    this[e.type === "dragover" ? "dragoverFuc" : "dragleaveFuc"].call(e.target);
    return this;
  }
  getDrapFile(e) {
    // 取消 hover 效果
    this.dragFuc(e);
    // 获取文件列表对象
    this.addDataTransfer(e.dataTransfer);
  }
  pasteFuc(e) {
    // 不在拖拽区域，不处理
    if (!this.targetOverFlag) return;
    const activeEl = document.activeElement;
    // 在拖拽区域内的输入框黏贴，不处理
    if (/textarea|input/i.test(activeEl.nodeName)) return;
    this.addDataTransfer(e.clipboardData);
  }
  errHanlder(err, cb) {
    // console.log('errHanlder=====', err)
    if (err?.message !== errEnum.stop) {
      cb && cb();
    }
  }
  addDataTransfer(dataTransfer) {
    let ifRead = true;
    if (typeof this.beforeReadFuc === "function") {
      ifRead = this.beforeReadFuc();
    }
    if (ifRead && dataTransfer?.items?.length) {
      const entrys = [];
      for (let i = 0; i < dataTransfer.items.length; i++) {
        const dataTransferTtem = dataTransfer.items[i];
        let entry;
        // if (dataTransferTtem.getAsEntry) {
        //   entry =
        //     dataTransferTtem.getAsEntry() || dataTransferTtem.getAsFile();
        // } else if (dataTransferTtem.webkitGetAsEntry) {
        //   entry =
        //     dataTransferTtem.webkitGetAsEntry() ||
        //     dataTransferTtem.getAsFile();
        // } else {
        //   entry = dataTransferTtem.getAsFile();
        // }
        entry = dataTransferTtem.webkitGetAsEntry();
        if (entry) {
          entrys.push(entry);
        }
        this;
      }
      return this.getContent(entrys).then(
        (blockContent) => {
          if (typeof this.readDataFuc === "function") {
            this.readDataFuc(blockContent);
          }
        },
        (err) => {
          this.errHanlder(err);
        }
      );
    }
  }
  getContent(entrys) {
    return new Promise((resolve, reject) => {
      const blockContent = [];
      const forEach = (i) => {
        const v = entrys[i];
        if (!v) {
          return resolve(blockContent);
        }
        const fucHanlder =
          this.mode === "tree"
            ? "getFileSystemEntryTree"
            : "getFileSystemEntryArray";
        this[fucHanlder](v, "").then(
          function (results) {
            blockContent.push(...results);
            forEach(i + 1);
          },
          (err) => {
            this.errHanlder(err);
          }
        );
      };
      forEach(0);
    });
  }
  ifPushValid(targetItem) {
    if (typeof this.filterFuc === "function") {
      return this.filterFuc(targetItem);
    } else {
      return true;
    }
  }
  pushItem(list, item) {
    if (this.ifPushValid(item)) {
      list.push(item);
      return item;
    }
    return null;
  }
  entryForEach() {}
  // 文件处理
  entryFileHandler(fileEntry, { resolve, reject }, formatter) {
    const res = [];
    fileEntry.file((file) => {
      const fileItem = formatter(file);
      if (typeof this.validFuc === "function") {
        const isPass = this.validFuc(fileItem);
        if (!isPass) {
          return reject(new Error(errEnum.stop));
        }
        this.pushItem(res, fileItem);
        resolve(res);
      } else {
        this.pushItem(res, fileItem);
        resolve(res);
      }
    });
  }
  getFileSystemEntryTree(entry, path = "") {
    return new Promise((resolve, reject) => {
      if (!entry) {
        resolve([]);
        return;
      }

      if (entry.isFile) {
        this.entryFileHandler(entry, { resolve, reject }, (file) => {
          return {
            size: file.size,
            fullPath: path + file.name,
            name: file.name,
            type: file.type,
            file,
          };
        });
        return;
      }

      if (entry.isDirectory) {
        let directoryEntry = entry;
        const curDir = {
          fullPath: path + directoryEntry.name,
          name: directoryEntry.name,
          totalSize: 0,
          type: "text/directory",
          file: new File([], path + directoryEntry.name, {
            type: "text/directory",
          }),
          child: [],
        };
        if (!this.ifPushValid(curDir)) {
          return reject(new Error(errEnum.filter));
        }
        dirReadEntry(directoryEntry, {
          endFuc: () => {
            curDir.totalSize = curDir.child.reduce((acc, cur) => {
              return acc + (cur?.size || cur?.totalSize);
            }, 0);
            return resolve([curDir]);
          },
          excFuc: (entryItem, { next }) => {
            this.getFileSystemEntryTree(
              entryItem,
              path + directoryEntry.name + "/"
            ).then(
              (results) => {
                // 父子建立关系(results有可能是空数组)
                curDir.child.push(...results);
                next();
              },
              (err) => {
                this.errHanlder(err, () => {
                  next();
                });
              }
            );
          },
        });
        return;
      }

      resolve([]);
    });
  }
  getFileSystemEntryArray(entry, path = "") {
    return new Promise((resolve, reject) => {
      if (!entry) {
        resolve([]);
        return;
      }

      if (entry.isFile) {
        this.entryFileHandler(entry, { resolve, reject }, (file) => {
          return {
            size: file.size,
            fullPath: path + file.name,
            name: file.name,
            type: file.type,
            file,
          };
        });
        return;
      }

      if (entry.isDirectory) {
        let directoryEntry = entry;
        const uploadFiles = [];
        const curDir = {
          fullPath: path + directoryEntry.name,
          name: directoryEntry.name,
          totalSize: 0,
          type: "text/directory",
          file: new File([], path + directoryEntry.name, {
            type: "text/directory",
          }),
        };
        if (!this.onlyFile) {
          // 文件夹
          const pushRes = this.pushItem(uploadFiles, curDir);
          if (!pushRes) {
            // 文件夹被过滤
            return reject(new Error(errEnum.filter));
          }
        }
        dirReadEntry(directoryEntry, {
          endFuc: () => {
            if (!this.onlyFile) {
              // 默认第一个是文件夹，后面是其下的文件
              uploadFiles[0].totalSize = uploadFiles.reduce((acc, cur) => {
                return acc + (cur?.size || 0);
              }, 0);
            }
            return resolve(uploadFiles);
          },
          excFuc: (entryItem, { next }) => {
            /**
             * 11/22/33/q.txt   回调函数内顺序为
             * uploadFiles 中有 33，results 为 q.txt
             * uploadFiles 中有 22，results 为 33, q.txt
             * uploadFiles 中有 11，results 为 22, 33, q.txt
             */
            this.getFileSystemEntryArray(
              entryItem,
              path + directoryEntry.name + "/"
            ).then(
              (results) => {
                // 父子建立关系(results有可能是空数组)
                console.log("results===", results);
                uploadFiles.push(...results);
                next();
              },
              (err) => {
                this.errHanlder(err, () => {
                  next();
                });
              }
            );
          },
        });
        return;
      }

      resolve([]);
    });
  }
}
