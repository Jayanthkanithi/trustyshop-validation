import { useState } from "react";

const ImageGallery = ({ images, alt }: { images: string[]; alt: string }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border bg-muted aspect-[4/3]">
        <img
          src={images[selected]}
          alt={`${alt} - Image ${selected + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 transition-all ${
                i === selected ? "border-primary glow-primary" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
