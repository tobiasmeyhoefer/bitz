/**
 * Renders a loading skeleton for a 3D scene.
 *
 * The `LoadingSkeleton` component renders a canvas element with a fixed size to simulate a loading 3D scene.
 * The `ThreeSkeleton` component wraps the `LoadingSkeleton` and centers it within a container.
 *
 * These components are typically used as placeholders while the actual 3D scene is being loaded, to provide a smooth user experience.
 */
// import "./tailwind.css";
// import { Skeleton, SVGSkeleton } from "./Skeleton";

const LoadingSkeleton = () => (
  <>
    <div className="overflow-visible md:h-[400px] h-[300px]">
      <div className="overflow-visible">
        <div>
          <canvas width="1287" height="800"></canvas>
        </div>
      </div>
    </div>
  </>
);

const ThreeSkeleton = () => (
  <div className="flex justify-center w-full h-full p-10">
    <LoadingSkeleton />
  </div>
);

export default ThreeSkeleton;