type TestimonialSectionProps = {
  message: string;
  author: string;
};

export default function TestimonialSection({ message, author }: TestimonialSectionProps) {
  return (
    <section
      className="px-6 md:px-12 py-10 flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #FCE3DA 0%, #E6F7A6 100%)",
      }}
    >
      <blockquote className="text-center max-w-3xl text-2xl md:text-3xl font-medium text-black leading-snug mb-4">
        “{message}”
      </blockquote>
      <cite className="text-center text-md md:text-lg font-medium text-black/70">
        — {author}
      </cite>
    </section>
  );
}
