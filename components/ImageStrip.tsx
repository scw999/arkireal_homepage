type Props = {
  images: string[];
  heightClass?: string;
};

export function ImageStrip({ images, heightClass = 'h-48 md:h-64' }: Props) {
  if (!images.length) return null;
  return (
    <div className={`grid w-full gap-1 md:gap-2 ${heightClass}`} style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0,1fr))` }}>
      {images.map((src, i) => (
        <div
          key={src + i}
          className="h-full bg-paper-card bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      ))}
    </div>
  );
}
