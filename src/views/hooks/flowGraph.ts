import { Cell, FunctionExt, Graph, Node, Shape, View } from "@antv/x6"
import { Options } from "@antv/x6/lib/graph/options"
import './baseShape'

export default class FlowGraph {

  public static graph: Graph // 画布实例
  // 画布选项
  private static option: Partial<Options.Manual> ={
    width: 1920, height: 1080, 
    grid: { // 网格配置
      size: 10, visible: true, type: 'doubleMesh',
      args: [
        { color: '#cccccc', thickness: 1 },
        { color: '#5F95FF', thickness: 1, factor: 4 }
      ]
    },
    scroller: { // 滚动配置
      enabled: true, pageVisible: true, pageBreak: true, pannable: false
    },
    mousewheel: { // 鼠标缩放
      enabled: true, modifiers: ['ctrl', 'meta'], minScale: 0.5, maxScale: 2
    },
    selecting: { //  选择配置
      enabled: true, multiple: true, rubberband: true, movable: true, 
      // showNodeSelectionBox: true
    },
    connecting: { // 连接配置
      anchor: 'center', connectionPoint: 'anchor', allowBlank: true, allowMulti: true, highlight: true, snap: true,
      createEdge() { // 连接的过程中创建新的边
        return new Shape.Edge({ // 边的配置
          attrs: {
            line: {
              stroke: '#222c36', strokeWidth: 1,
              targetMarker: { name: 'classic', size: 8 }
            }
          },
          router: { name: 'manhattan' }
        })
      },
      validateConnection: ({ // 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
        sourceView,
        targetView,
        sourceMagnet,
        targetMagnet,
      }: any) => {
        if (sourceView === targetView) // 如果线头尾一样 不连接
          return false
        if (!sourceMagnet) // 如果线头不可以被连接
          return false
        if (!targetMagnet) // 如果线尾不可以被连接
          return false
        return true
      },
    },
    highlighting: { // 高亮配置
      magnetAvailable: {
        name: 'stroke',
        args: {
          padding: 4,
          attrs: { strokeWidth: 4, stroke: 'rgba(223,234,255)' }
        }
      }
    },
    // 对齐线开关 / 撤销/重做开关 / 剪切板开关 / 键盘快捷键开关
    snapline: true, history: true, clipboard: true, keyboard: true, 
    // 通过embedding可以将一个节点拖动到另一个节点中，使其成为另一节点的子节点
    embedding: {
      enabled: true,
      findParent(this: { getNodes: Function }, { node }: { node: Node }): any {
        const bbox = node.getBBox()
        return this.getNodes().filter((node: Node) => {
          // 只有 data.parent 为 true 的节点才是父节点
          const data = node.getData()
          if (data && data.parent) {
            const targetBBox = node.getBBox()
            return bbox.isIntersectWithRect(targetBBox)
          }
          return false
        })
      },
    }
  }
  // 初始化
  public static init() {
    // 初始化画布
    this.option.container = document.getElementById('testid')!
    this.graph = new Graph(this.option)
    return this.graph
  }
}