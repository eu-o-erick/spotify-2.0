import { Fragment } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function TrackTableSkeletonComponent() {
  return (
    <Fragment>
      <tr>
        <td className="pb-4" />
      </tr>

      {Array(5)
        .fill(0)
        .map((_, i) => (
          <SkeletonTrackItemComponent key={i} />
        ))}
    </Fragment>
  );
}

function SkeletonTrackItemComponent() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="flex items-center justify-center">
          <div className="bg-secondary w-4 h-4 rounded-sm max-sm:w-3 max-sm:h-3" />
        </div>
      </td>

      <td>
        <div className="flex flex-col gap-2 py-3">
          <div className="flex bg-secondary w-44 h-5 rounded-sm max-sm:w-36 max-sm:h-[18px]" />

          <div className="flex bg-secondary w-24 h-4 rounded-sm" />
        </div>
      </td>

      <td>
        <div className="flex gap-1 items-center justify-end">
          <div className="mr-14 max-md:mr-4">
            <div className="flex items-center max-md:hidden">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative w-4 h-4 cursor-pointer p-0.5">
                  <FaStar className="absolute top-0 left-0 w-[calc(100%-2px)] h-[calc(100%-2px)] text-secondary md:group-hover:text-main transition-all" />
                </div>
              ))}
            </div>

            <div className="relative w-4 h-4 md:hidden">
              <FaStar className="absolute top-0 left-0 w-full h-full text-secondary" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-zinc-500 bg-opacity-5 rounded-md h-[33px] w-[54px]" />

            <div className="flex flex-col mx-2">
              <div className="flex justify-center items-center text-zinc-700">
                <IoIosArrowUp />
              </div>

              <div className="flex justify-center items-center text-zinc-700">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
