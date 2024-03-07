import { useRef, useEffect } from 'react';
// const APP = () => {
//   const ref1 = useRef<HTMLElement>(null!);
//   const ref2 = useRef<HTMLElement | null>(null);
//   useEffect(() => {
//     console.log(ref2.current);
//     // TypeScript won't require null-check e.g. ref1 && ref1.current
//   });
//   return <div ref={ref1}> etc </div>;
// };
// console.log('APP: ', APP);

function TextInputWithFocusButton() {
  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null!);
  const onButtonClick = () => {
    // if (inputEl) {
    inputEl.current.focus();
    // }
  };
  return (
    <>
      {/* in addition, inputEl only can be used with input elements. Yay! */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
console.log('TextInputWithFocusButton: ', TextInputWithFocusButton);
