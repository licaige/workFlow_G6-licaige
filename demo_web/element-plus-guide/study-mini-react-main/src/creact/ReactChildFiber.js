import { createFiber } from "./createFiber"
import { isArray, isStringOrNumber, Placement, Update } from "./utils"

function deleteChild(returnFiber, childToDelete) {
    if(returnFiber.deletions) {
        returnFiber.deletions.push(childToDelete)
    }else{
        returnFiber.deletions = [childToDelete]
    }
}

function placeChild(
    newFiber,
    lastPlacedIndex,
    newIndex,
    shouldTrackSideEffects // 初次渲染（false）还是更新（true）
  ) {
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

    let previousNewFiber = null
    let shouldTrackSideEffects = !!returnFiber.alternate
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child
    let nextOldFiber = null
    let lastPlacedIndex = 0
    let newIndex = 0

    // * 1. 找到能复用的节点，如果碰到不能复用的，那就停止
    for(; oldFiber && newIndex < newChildren.length; newIndex++) {
        const newChild = newChildren[newIndex]
        if(newChild === null) {
            continue
        }

        if(oldFiber.index > newIndex) {
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
            break
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
            newIndex,
            shouldTrackSideEffects // 初次渲染（false）还是更新（true）
        ) 
        
        if(previousNewFiber === null) {
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }

        previousNewFiber = newFiber
        oldFiber = nextOldFiber

    }

    // * 2. 已经找到了能复用的节点，如果老节点还有的话，直接删除
    if(newIndex === newChildren.length) {
        deleteRemainingChildren(returnFiber, oldFiber)
        return
    }

    // * 3.
    // 1). 初次渲染
    // 2). 老节点已经复用完了，但新节点还有，那就再新增插入
    if(!oldFiber) {

        for(; newIndex < newChildren.length; newIndex++) {
            const newChild = newChildren[newIndex]
            if(newChild === null) {
                continue
            }
            const newFiber = createFiber(newChild, returnFiber)
            
            lastPlacedIndex = placeChild(
                newFiber,
                lastPlacedIndex,
                newIndex,
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
                previousNewFiber.sibling = newFiber
            }
    
            previousNewFiber = newFiber
        }

        return 
    }

    // * 4. 如果更新阶段，老节点还有，但是新节点没了，老节点全部删除
    const existingChildren = mapRemainingChildren(oldFiber);

    for(; newIndex < newChildren.length; newIndex++) {
        const newChild = newChildren[newIndex]
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
            newIndex,
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

// export function reconcileChildren(returnFiber, children) {
//     if(isStringOrNumber(children)) {
//         return
//     }
//     const newChildren = isArray(children) ? children : [children]

//     let previousNewFiber = null
//     let oldFiber = returnFiber.alternate && returnFiber.alternate.child
//     for(let i = 0; i < newChildren.length; i++) {
//         const newChild = newChildren[i]
//         if(newChild === null) {
//             continue
//         }
//         const newFiber = createFiber(newChild, returnFiber)
//         const same = sameNode(newFiber, oldFiber)
//         if(same) {
//             Object.assign(newFiber, {
//                 alternate: oldFiber,
//                 flags: Update,
//                 stateNode: oldFiber.stateNode
//             })
//         }

//         if(!same && oldFiber) {
//             deleteChild(returnFiber, oldFiber)
//         }

//         if(oldFiber) {
//             oldFiber = oldFiber.sibling
//         }

//         if(previousNewFiber === null) {
//             returnFiber.child = newFiber
//         } else {
//             previousNewFiber.sibling = newFiber
//         }

//         previousNewFiber = newFiber
//     }

// }

function sameNode(a, b) {
    return a && b && a.key===b.key && a.type===b.type
}