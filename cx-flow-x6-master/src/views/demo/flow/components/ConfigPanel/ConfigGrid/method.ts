import FlowGraph from '../../../graph/index';

export function gridOpt(globalGridAttr: any) {
  let options;
  if (globalGridAttr.type === 'doubleMesh') {
    options = {
      type: globalGridAttr.type,
      args: [
        {
          color: globalGridAttr.color,
          thickness: globalGridAttr.thickness,
        },
        {
          color: globalGridAttr.colorSecond,
          thickness: globalGridAttr.thicknessSecond,
          factor: globalGridAttr.factor,
        },
      ],
    };
  } else {
    options = {
      type: globalGridAttr.type,
      args: [
        {
          color: globalGridAttr.color,
          thickness: globalGridAttr.thickness,
        },
      ],
    };
  }
  const { graph } = FlowGraph;
  graph.drawGrid(options);
}

export function gridSizeOpt(globalGridAttr: any) {
  const { graph } = FlowGraph;
  graph.setGridSize(globalGridAttr.size);
}

const tryToJSON = (val: string) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
};

export function backGroundOpt(globalGridAttr: any) {
  const options = {
    color: globalGridAttr.bgColor,
    image: globalGridAttr.showImage ? 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*o-MuTpQaj7EAAAAAAAAAAABkARQnAQ' : undefined,
    repeat: globalGridAttr.repeat,
    angle: globalGridAttr.angle,
    size: tryToJSON(globalGridAttr.bgSize),
    position: tryToJSON(globalGridAttr.position),
    opacity: globalGridAttr.opacity,
  };
  const { graph } = FlowGraph;
  graph.drawBackground(options);
}
