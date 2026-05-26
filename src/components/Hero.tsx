import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">

        <div className="space-y-8">
          <div className="inline-flex px-4 py-2 rounded-full glass text-sm">
            New Collection
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Elevate Your <br />

            <span className="gradient-text">
              Style, Elevate
            </span>

            <br />
            Your Life.
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Premium clothing crafted for comfort,
            designed for style.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white font-semibold shadow-soft">
              Shop Now
            </button>

            <button className="px-8 py-4 rounded-2xl border border-gray-300 dark:border-white/10">
              Explore Collections
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl" />

          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
            alt="fashion"
            width={600}
            height={700}
            className="relative rounded-[40px] object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}