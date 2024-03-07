let hookIndex = 0;
function useXXX() {
  hookIndex++;
}

useXXX();
useXXX();
useXXX();
console.log(hookIndex);