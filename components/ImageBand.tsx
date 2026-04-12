type Props = {
  image: string;
  heightClass?: string;
  overlay?: boolean;
  caption?: string;
};

export function ImageBand({ image, heightClass = 'h-64 md:h-96', overlay = false, caption }: Props) {
  return (
    <div className={`relative w-full ${heightClass}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" aria-hidden />
      ) : null}
      {caption ? (
        <div className="container-page relative flex h-full items-end pb-8 md:pb-12">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/80">
            {caption}
          </p>
        </div>
      ) : null}
    </div>
  );
}
