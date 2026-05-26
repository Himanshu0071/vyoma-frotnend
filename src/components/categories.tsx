import Image from "next/image";

const categories = [
  {
    title: "Streetwear",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  },

  {
    title: "Minimal",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },

  {
    title: "Luxury",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
];

export default function Categories() {
  return (
    <section className="py-24">
      <div className="container-custom">

        <div className="mb-14">
          <p className="text-sm uppercase tracking-[4px] text-orange-400">
            Categories
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Shop By Style
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-[32px] cursor-pointer"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={500}
                height={500}
                className="w-full h-[450px] object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/30" />

              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}