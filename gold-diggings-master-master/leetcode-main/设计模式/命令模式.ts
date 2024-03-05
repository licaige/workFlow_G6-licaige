


// Cooker类
class Cooker {
    cook() { console.log("cook something") }
    stop() { console.log("stop cooking") }
}

// 使用高阶函数模拟commend类(封装命令的execute,pause,redo等等)
const CookCommand = (cooker: Cooker) => {
    return {
        execute: () => { cooker.cook() },  // 执行命令
        pause: () => { cooker.stop() },    // 终止命令
        redo: () => { cooker.stop(); cooker.cook() } // 重启命令
    }
}

// 创建commend
let cookCommand = CookCommand(new Cooker())

// 操作命令对象
cookCommand.execute()
cookCommand.pause()
cookCommand.redo()


// 宏命令(一组命令的集合)
function createMacroCommand() {
    return {
        commandList: [],  // 命令队列
        add: (command) => { this.commandList.push(command) }, // 添加宏
        excute: () => {
            this.commandList.forEach(c => c.excute) // 批量执行宏
        }
    }
}

// 添加多个宏命令
const macroCommand = createMacroCommand()
macroCommand.add(cookCommand)
macroCommand.add(cookCommand)
macroCommand.add(cookCommand)

// 批量执行命令
macroCommand.excute()


