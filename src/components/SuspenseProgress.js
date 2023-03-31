import { useEffect } from "react";
import { Suspense } from "react";
import { useRef } from "react";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

const SuspenseProgress = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (loading && ref.current) {
      ref.current.continuousStart();
    } else if (ref.current) {
      ref.current.complete();
    }
  }, [loading, ref]);

  const ProgressTrigger = ({ setLoading }) => {
    useEffect(() => {
      setLoading(true);
      return () => setLoading(false);
    }, [setLoading]);

    return null;
  };

  return (
    <div>
      <LoadingBar color="#1b5e20" ref={ref} waitingTime={300} />

      <Suspense fallback={<ProgressTrigger setLoading={setLoading} />}>
        {children}
      </Suspense>
    </div>
  );
};

export default SuspenseProgress;
