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