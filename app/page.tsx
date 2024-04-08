'use client';
import { useId, useRef, useState } from 'react';
interface Shape {
  id: string;
  type: 'rectangle' | 'circle';
  startX: number;
  startY: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

function App() {
  const [shapes, setShapes] = useState<Shape[]>([]); // 도형 Array
  const [newShape, setNewShape] = useState<Shape | null>(null); // 새로운 도형
  const [isDrawing, setIsDrawing] = useState<boolean>(false); // 그리는 중
  const [drawMode, setDrawMode] = useState<'rectangle' | 'circle'>('rectangle'); // 도형 타입
  const id = useId(); // id 생성
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  // MouseEvent의 e.nativeEvent 에서 offset 값을 가져올 경우 좌표가 정확하지 않는 이슈가 있어서 ref로 다시 계산
  const getOffset = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    return {
      offsetX,
      offsetY,
    };
  };

  // 마우스클릭 시점의 좌표를 새로운 도형 객체로 만든다.
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = getOffset(e);
    setIsDrawing(true);
    setNewShape({
      id: id + shapes.length,
      type: drawMode,
      startX: offsetX,
      startY: offsetY,
      left: offsetX,
      top: offsetY,
      width: 0,
      height: 0,
    });
  };

  // 마우스를 움직이는 동안 새로운 도형 객체를 업데이트 한다.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || !newShape) return;
    const { offsetX, offsetY } = getOffset(e);

    const width = offsetX - newShape.startX;
    const height = offsetY - newShape.startY;
    const temp = {
      ...newShape,
      left: width > 0 ? newShape.startX : offsetX,
      top: height > 0 ? newShape.startY : offsetY,
      width: Math.abs(width),
      height: Math.abs(height),
    };
    setNewShape(temp);
  };

  // 마우스 클릭을 떼면 새로운 도형 객체를 기존 도형 Array로 추가한다.
  const handleMouseUp = () => {
    setIsDrawing(false);

    // 새로운 객체 생성시에 width, height 이 0일때 점으로 도형 생성 방지
    if (!newShape || newShape.width < 1 || newShape.height < 1) {
      setNewShape(null);
      return false;
    }

    setShapes([...shapes, newShape]);
    setNewShape(null);
  };

  // 도형 타입을 변경한다.
  const changeDrawMode = (mode: 'rectangle' | 'circle') => {
    setDrawMode(mode);
  };

  // 도형 클릭해서 선택 기능
  const handleSelectedMouseDown = (shape: Shape) => {
    setSelectedShape(shape);
    setIsMoving(true);
  };

  // 도형 선택 후 해당 좌표값 업데이트
  const handleSelectedMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMoving || !selectedShape) return;
    const { offsetX, offsetY } = getOffset(e);
    setShapes(shapes.map((d) => (d.id === selectedShape?.id ? { ...d, left: offsetX - d.width / 2, top: offsetY - d.height / 2 } : d)));
  };

  // 도형 이동 종료
  const handleSelectedMouseUp = () => {
    setIsMoving(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <h1>도형 그림판</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => changeDrawMode('rectangle')} className={drawMode === 'rectangle' ? 'active' : ''}>
          사각형 그리기
        </button>
        <button onClick={() => changeDrawMode('circle')} className={drawMode === 'circle' ? 'active' : ''}>
          원 그리기
        </button>
      </div>
      <div ref={canvasRef} className='canvas' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={shape.type + (selectedShape?.id === shape.id ? ' selected' : '')}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleSelectedMouseDown(shape);
            }}
            onMouseMove={handleSelectedMouseMove}
            onMouseUp={handleSelectedMouseUp}
            style={{
              position: 'absolute',
              left: shape.left + 'px',
              top: shape.top + 'px',
              width: shape.width + 'px',
              height: shape.height + 'px',
              borderRadius: shape.type === 'rectangle' ? 0 : '50%',
              border: '1px solid black',
              cursor: 'pointer',
            }}
          ></div>
        ))}
        {newShape && (
          <div
            className={newShape.type}
            style={{
              position: 'absolute',
              left: newShape.left + 'px',
              top: newShape.top + 'px',
              width: newShape.width + 'px',
              height: newShape.height + 'px',
              borderRadius: newShape.type === 'rectangle' ? 0 : '50%',
              border: '1px solid black',
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
