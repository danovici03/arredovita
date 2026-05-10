import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images?.length) {
    return (
      <div className="aspect-[5/4] w-full rounded-[2rem] bg-brand-light" />
    )
  }

  const [hero, ...rest] = images

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] bg-brand-light img-zoom-wrapper"
        id={hero.id}
      >
        {!!hero.url && (
          <Image
            src={hero.url}
            priority
            fetchPriority="high"
            alt="Product image 1"
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {rest.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-brand-light img-zoom-wrapper"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 1}
                  alt={`Product image ${index + 2}`}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
