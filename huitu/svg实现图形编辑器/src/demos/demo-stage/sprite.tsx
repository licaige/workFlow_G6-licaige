// 精灵
export const Sprite = ({ x, y, children }) => {
  return (
    <g className="sprite-container" transform={`translate(${x}, ${y})`}>
      {children}
    </g>
  );
};
