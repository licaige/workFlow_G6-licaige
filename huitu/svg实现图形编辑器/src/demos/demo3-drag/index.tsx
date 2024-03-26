import React, { useEffect, useRef } from "react";
import { GraphicEditorCore } from "./graphic-editor";
import { ISprite } from "./type";
import RectSpriteMeta from "./sprites/rect";
import LineSpriteMeta from "./sprites/line";

const defaultSpriteList: ISprite[] = [
  {
    id: "RectSprite1",
    type: "RectSprite",
    props: {
      // fill: "#fdc5bf"
      fill: "#eee"
    },
    attrs: {
      coordinate: { x: 100, y: 100 },
      size: { width: 160, height: 100 },
      angle: 30
    }
  },
  // {
  //   id: "RectSprite2",
  //   type: "RectSprite",
  //   props: {
  //     fill: "#fdc5bf"
  //   },
  //   attrs: {
  //     coordinate: { x: 380, y: 100 },
  //     size: { width: 160, height: 100 },
  //     angle: 0
  //   }
  // },
  {
    id: "LineSpriteMeta1",
    type: "LineSprite",
    props: {
      stroke: "#84db92",
      strokeWidth: 3,
      x1: 0,
      y1: 0,
      x2: 160,
      y2: 100
    },
    attrs: {
      coordinate: { x: 100, y: 240 },
      size: { width: 160, height: 100 },
      angle: 0
    }
  }
];

const Demo = () => {
  const editorRef = useRef<GraphicEditorCore>();
  useEffect(() => {
    const api = editorRef.current;
    api?.registerSprite(RectSpriteMeta);
    api?.registerSprite(LineSpriteMeta);

    api?.addSpriteToStage(defaultSpriteList);
  }, []);
  return <GraphicEditorCore ref={editorRef as any} width={800} height={560} />;
};

export default Demo;
