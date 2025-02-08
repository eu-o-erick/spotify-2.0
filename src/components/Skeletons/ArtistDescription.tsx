import BgGradient from "../BgGradient";

export default function DescriptionArtistSkeleton() {
  return (
    <section className="relative mb-20">
      <BgGradient />

      <div className="relative z-[2] container pt-24 pb-11 flex gap-6 max-lg:pt-16 max-sm:px-3 max-sm:py-8 max-sm:flex-col max-sm:gap-4  animate-pulse">
        <div className="flex justify-between items-start">
          <div className="bg-secondary rounded-[4px] w-[300px] h-[300px] max-lg:w-48 max-lg:h-48 max-lg:rounded-sm" />

          <div className="flex items-end gap-1.5 sm:hidden">
            <span className="bg-secondary h-4 w-14 rounded-sm" />
            <span className="bg-secondary w-16 h-5 rounded-full" />
          </div>
        </div>

        <div className="flex flex-1 max-sm:items-end  animate-pulse">
          <div className="flex-1 flex flex-col justify-between py-2 max-sm:py-0">
            <div className="flex flex-col">
              <p className="flex items-center gap-1 opacity-70">
                <span className="bg-secondary w-5 h-5 rounded-full max-lg:w-4 max-lg:h-4" />
                <span className="bg-secondary w-36 h-4 rounded-sm max-sm:w-28" />
              </p>

              <span className="bg-secondary h-8 w-64 rounded-sm mt-6 mb-4 max-lg:mt-2 max-sm:h-6 max-sm:w-44 max-sm:mt-7 max-sm:mb-3" />

              <span className="bg-secondary h-5 w-48 rounded-sm max-sm:h-4 max-sm:w-32" />
            </div>

            <div className="flex items-end gap-1 max-sm:hidden">
              <span className="bg-secondary h-4 w-14 rounded-sm" />
              <span className="bg-secondary w-20 h-6 rounded-full" />
            </div>
          </div>

          <ul className="flex items-start gap-3 max-sm:gap-2">
            <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
            <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
            <li className="bg-secondary w-5 h-5 rounded-sm max-sm:w-4 max-lg:h-4" />
          </ul>
        </div>
      </div>
    </section>
  );
}
