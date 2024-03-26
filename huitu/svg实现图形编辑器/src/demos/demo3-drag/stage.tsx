// 舞台
export const Stage = ({ width, height, children, ...rest }: any) => {
  return (
    <svg
      {...rest}
      className="stage-container"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{
        width,
        height,
        outline: "1px solid #ddd"
      }}
    >
      {children}
    </svg>
  );
};
