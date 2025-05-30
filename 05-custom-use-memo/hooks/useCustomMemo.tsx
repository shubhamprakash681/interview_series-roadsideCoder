import { useRef } from "react";

const useCustomMemo = <T,>(cb: () => T, deps: any[]) => {
  const memoizedValue = useRef<{ value: T; deps: any[] }>(null);

  const recalculateResult = () => {
    console.log("Recalculating value...");

    memoizedValue.current = {
      value: cb(),
      deps: [...deps],
    };
  };
  if (memoizedValue.current === null || deps.length === 0 || deps.length !== memoizedValue.current.deps.length) {
    recalculateResult();
  } else if (memoizedValue.current && deps.some((dep, index) => dep !== memoizedValue.current!.deps[index])) {
    recalculateResult();
  }

  return memoizedValue.current?.value;
};

export default useCustomMemo;
