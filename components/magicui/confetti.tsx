/**
 * A React component that renders a canvas and provides an API to trigger confetti animations.
 *
 * The `Confetti` component creates a canvas element and initializes a `canvas-confetti` instance. It provides an API to fire confetti animations, either automatically on mount or manually through the `fire` method.
 *
 * The `ConfettiButton` component is a button that triggers a confetti animation when clicked, with the confetti origin centered on the button.
 *
 * @param {Props} props - The props for the `Confetti` component.
 * @param {ConfettiOptions} [props.options] - Options for the confetti animation.
 * @param {ConfettiGlobalOptions} [props.globalOptions] - Global options for the confetti animation.
 * @param {boolean} [props.manualstart] - If true, the confetti animation will not start automatically on mount.
 * @param {ReactNode} [props.children] - Additional content to render inside the `Confetti` component.
 *
 * @param {ConfettiButtonProps} props - The props for the `ConfettiButton` component.
 * @param {ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement }} [props.options] - Options for the confetti animation.
 * @param {React.ReactNode} [props.children] - The content to render inside the `ConfettiButton` component.
 */
import { Button, ButtonProps } from "@/components/ui/button";
import confetti from "canvas-confetti";
import type { ReactNode } from "react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type {
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";

import type { CreateTypes as ConfettiInstance } from "canvas-confetti";

type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiRef = Api | null;

const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null); // confetti instance

  const canvasRef = useCallback(
    // https://react.dev/reference/react-dom/components/common#ref-callback
    // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        // <canvas> is mounted => create the confetti instance
        if (instanceRef.current) return; // if not already created
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        // <canvas> is unmounted => reset and destroy instanceRef
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions],
  );

  // `fire` is a function that calls the instance() with `opts` merged with `options`
  const fire = useCallback(
    (opts = {}) => instanceRef.current?.({ ...options, ...opts }),
    [options],
  );

  const api = useMemo(
    () => ({
      fire,
    }),
    [fire],
  );

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

Confetti.displayName = "Confetti";

interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions &
    ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
  children?: React.ReactNode;
}

function ConfettiButton({ options, children, ...props }: ConfettiButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    confetti({
      ...options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}

ConfettiButton.displayName = "ConfettiButton";


export { Confetti, ConfettiButton };

export default Confetti;
