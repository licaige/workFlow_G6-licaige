describe('Vue VNode Diff', () => {
  it('1. 左边查找', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
      [{ key: 'a' }, { key: 'b' }, { key: 'd' }, { key: 'e' }],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    // 第一次调用次数
    expect(patch.mock.calls.length).toBe(2)
    // 第一次调用的第一个参数
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
  })

  it('2. 右边边查找', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
      [{ key: 'd' }, { key: 'e' }, { key: 'b' }, { key: 'c' }],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    expect(patch.mock.calls.length).toBe(2)
    expect(patch.mock.calls[0][0]).toBe('c')
    expect(patch.mock.calls[1][0]).toBe('b')
  })

  it('3. 老节点没了，新节点还有', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [{ key: 'a' }, { key: 'b' }],
      [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    expect(patch.mock.calls.length).toBe(2)
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
    expect(mountElement.mock.calls[0][0]).toBe('c')
  })

  it('4. 老节点还有，新节点没了', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
      [{ key: 'a' }, { key: 'b' }],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    // 第一次调用次数
    expect(patch.mock.calls.length).toBe(2)
    // 第一次调用的第一个参数
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
    expect(unmount.mock.calls[0][0]).toBe('c')
  })

  it('5. 删掉老的：在老的里面存在，新的里面不存在', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'e' },
        { key: 'f' },
        { key: 'g' }
      ],
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'd' },
        { key: 'c' },
        { key: 'f' },
        { key: 'g' }
      ],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    // 第一次调用次数
    expect(patch.mock.calls.length).toBe(6)
    // 第一次调用的第一个参数
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
    expect(patch.mock.calls[2][0]).toBe('g')
    expect(patch.mock.calls[3][0]).toBe('f')
    expect(patch.mock.calls[4][0]).toBe('c')
    expect(patch.mock.calls[5][0]).toBe('d')
    // e在新的里面没有调用删除
    expect(unmount.mock.calls[0][0]).toBe('e')
    // e在新的里面没有调用删除
    expect(unmount.mock.calls.length).toBe(1)
  })

  it('6. 中间对比的移动逻辑：节点存在新的和老的里面，但是位置变了', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'e' },
        { key: 'f' },
        { key: 'g' }
      ],
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'e' },
        { key: 'c' },
        { key: 'd' },
        { key: 'f' },
        { key: 'g' }
      ],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    // 第一次调用次数
    expect(patch.mock.calls.length).toBe(7)
    // 第一次调用的第一个参数
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
    expect(patch.mock.calls[2][0]).toBe('g')
    expect(patch.mock.calls[3][0]).toBe('f')
    expect(patch.mock.calls[4][0]).toBe('c')
    expect(patch.mock.calls[5][0]).toBe('d')
    expect(patch.mock.calls[6][0]).toBe('e')
    // e在新的里面需要移动
    expect(move.mock.calls[0][0]).toBe('e')
    // e需要移动到c的前面
    expect(move.mock.calls[0][1]).toBe('c')
    // e在新的里面需要移动
    expect(move.mock.calls.length).toBe(1)
  })

  it('7. 中间对比的创建逻辑：节点存在新节点里，但旧节点里没有，就需要创建它', () => {
    const mountElement = jest.fn()
    const patch = jest.fn()
    const unmount = jest.fn()
    const move = jest.fn()
    const { vueDiff } = require('../vue-diff')
    vueDiff(
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'f' },
        { key: 'g' }
      ],
      [
        { key: 'a' },
        { key: 'b' },
        { key: 'e' },
        { key: 'd' },
        { key: 'c' },
        { key: 'f' },
        { key: 'g' }
      ],
      {
        mountElement,
        patch,
        unmount,
        move
      }
    )
    // 第一次调用次数
    expect(patch.mock.calls.length).toBe(6)
    // 第一次调用的第一个参数
    expect(patch.mock.calls[0][0]).toBe('a')
    expect(patch.mock.calls[1][0]).toBe('b')
    expect(patch.mock.calls[2][0]).toBe('g')
    expect(patch.mock.calls[3][0]).toBe('f')
    expect(patch.mock.calls[4][0]).toBe('c')
    expect(patch.mock.calls[5][0]).toBe('d')
    // e在新的里面需要创建
    expect(mountElement.mock.calls[0][0]).toBe('e')
    // e在新的里面需要创建
    expect(mountElement.mock.calls.length).toBe(1)
  })

})
