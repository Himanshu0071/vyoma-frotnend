import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center py-10">
      <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">

        <div className="space-y-6">
          <div className="inline-flex px-4 py-2 rounded-full glass text-sm">
            New Collection
          </div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight">
            Elevate Your <br />

            <span className="gradient-text">
              Style, Elevate
            </span>

            <br />
            Your Life.
          </h1>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Premium clothing crafted for comfort,
            designed for style.
          </p>

          <div className="flex flex-wrap gap-4">

            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1356d0] via-[#9A1951] to-[#FA5303] text-white font-semibold shadow-soft">
              Shop Now
            </button>

            <button className="px-8 py-4 rounded-2xl border border-gray-300 dark:border-white/10">
              Explore Collections
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-3xl" />

          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt="fashion"
            width={520}
            height={620}
            className="relative rounded-[40px] object-cover shadow-soft max-h-[80vh] w-auto"
          />
        </div>
      </div>
    </section>
  );
}