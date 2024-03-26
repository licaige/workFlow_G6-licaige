import { createFiber } from "./createFiber";
import { isArray, isStringOrNumber, Placement, Update } from "./utils";
// 如果某一个类型的key值和类型相同，同一层级才进行复用
function deleteChild(returnFiber, childToDelete) {
    if(returnFiber.deletions) {
        returnFiber.deletions.push(childToDelete)
    } else {
        returnFiber.deletions = [childToDelete]
    }
}

function placeChild(
    newFiber,
    lastPlacedIndex,
    newIndex,
    shouldTrackSideEffects // 初次渲染（false）还是更新（true）
  ) {
    // 把当前下标记录到 Fiber 上  
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      return lastPlacedIndex;
    }
    const current = newFiber.alternate;
  
    if (current) {
      const oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // move
        newFiber.flags = Placement;
        return lastPlacedIndex;
      } else {
        return oldIndex;
      }
    } else {
      newFiber.flags = Placement;
      return lastPlacedIndex;
    }
}

function mapRemainingChildren(currentFirstChild) {
    const existingChildren = new Map();
    let existingChild = currentFirstChild;
    while (existingChild) {
      existingChildren.set(
        existingChild.key || existingChild.index,
        existingChild
      );
      existingChild = existingChild.sibling;
    }
    return existingChildren;
}

// 删除节点链表,头结点是currentFirstChild
function deleteRemainingChildren(returnFiber, currentFirstChild) {
    let childToDelete = currentFirstChild;
    while (childToDelete) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
}

export function reconcileChildren(returnFiber, children) {
    if(isStringOrNumber(children)) {
        return
    }
    const newChildren = isArray(children) ? children : [children]
    let previousNewFiber = null;
    let shouldTrackSideEffects = !!returnFiber.alternate
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child
    let nextOldFiber = null
    // 上一次协调的返回的位置
    let lastPlacedIndex = 0;
    let newIdx = 0;

    // * 1. 找到能复用的节点，如果碰到不能复用的，那就停止
    for(; oldFiber && newIdx < newChildren.length; newIdx++) {
        const newChild = newChildren[newIdx]
        if(newChild === null) {
            continue
        }

        if(oldFiber.index > newIdx) {
            nextOldFiber = oldFiber
            oldFiber = null
        } else {
            nextOldFiber = oldFiber.sibling
        }

        const same = sameNode(newChild, oldFiber)

        if(!same) {
            if(oldFiber === null) {
                oldFiber = nextOldFiber
            }
            break;
        }

        const newFiber = createFiber(newChild, returnFiber)

        Object.assign(newFiber, {
            alternate: oldFiber,
            flags: Update,
            stateNode: oldFiber.stateNode
        })

        lastPlacedIndex = placeChild(
            newFiber,
            lastPlacedIndex,
            newIdx,
            shouldTrackSideEffects // 初次渲染（false）还是更新（true）
        )
        
        // 如果是头节点
        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        // 这一次 Fiber 就是下一次 Fiber 的上一个 Fiber
        previousNewFiber = newFiber
        // 往后指向
        oldFiber = nextOldFiber
    }

    // * 2. 已经找到了能复用的节点，如果老节点还有的话，直接删除
    if(newIdx === newChildren.length) {
        deleteRemainingChildren(returnFiber, oldFiber)
        return
    }

    // * 3.
    // 1). 初次渲染
    // 2). 老节点已经复用完了，但新节点还有，那就再新增插入
    if(!oldFiber) {
        for (; newIdx < newChildren.length; newIdx++) {
            const newChild = newChildren[newIdx]
            if(newChild === null) {
                continue
            }
            const newFiber = createFiber(newChild, returnFiber)
            // 记录当前的位置
            lastPlacedIndex = placeChild(
                newFiber,
                lastPlacedIndex,
                newIdx,
                shouldTrackSideEffects // 初次渲染（false）还是更新（true）
            )

            // const same = sameNode(newFiber, oldFiber)
            
            // if(same) {
            //     Object.assign(newFiber, {
            //         alternate: oldFiber,
            //         flags: Update,
            //         stateNode: oldFiber.stateNode
            //     })
            // }
    
            // if(!same && oldFiber) {
            //     deleteChild(returnFiber, oldFiber)
            // }
    
            // if(oldFiber) {
            //     oldFiber = oldFiber.sibling
            // }
    
            if(previousNewFiber === null) {
                returnFiber.child = newFiber
            } else {
                previousNewFiber.sibling = newFiber;
            }
    
            previousNewFiber = newFiber
        }
        return
    }

    // * 4. 如果更新阶段，老节点还有，但是新节点没了，老节点全部删除
    const existingChildren = mapRemainingChildren(oldFiber);
    for (; newIdx < newChildren.length; newIdx++) {
        const newChild = newChildren[newIdx]
        if(newChild === null) {
            continue
        }
        const newFiber = createFiber(newChild, returnFiber)
        let matchedFiber = existingChildren.get(newFiber.key || newFiber.index)
        if(matchedFiber) {
            existingChildren.delete(matchedFiber.key || matchedFiber.index)
            Object.assign(newFiber, {
                alternate: matchedFiber,
                flags: Update,
                stateNode: matchedFiber.stateNode
            })
        }
        
        lastPlacedIndex = placeChild(
            newFiber,
            lastPlacedIndex,
            newIdx,
            shouldTrackSideEffects // 初次渲染（false）还是更新（true）
        )

        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
    }

    // *5. 检查还有没有oldFiber
    if(shouldTrackSideEffects) {
        existingChildren.forEach(child => deleteChild(returnFiber, child))
    }
}


function sameNode(a, b) {
    return a && b && a.key === b.key && a.type === b.type
}