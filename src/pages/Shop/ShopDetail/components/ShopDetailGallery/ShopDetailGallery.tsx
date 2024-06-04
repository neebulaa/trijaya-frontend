// ShopDetailGallery.tsx
import IconChevronLeft from '@/commons/assets/icons/IconChevronLeft';
import IconChevronRight from '@/commons/assets/icons/IconChevronRight';
import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { BaseModel } from '@/types/base';
import useShopDetailGalleryController from '@/pages/Shop/ShopDetail/components/ShopDetailGallery/ShopDetailGalleryController';

export interface ImageType extends BaseModel {
  productId: null | string | number;
  path: string;
  secondary: boolean;
  extraLarge: null | string;
  large: null | string;
  medium: null | string;
  small: null | string;
}

type ShopDetailGalleryProps = {
  images: ImageType[];
};

export default function ShopDetailGallery({ images = [] }: ShopDetailGalleryProps) {
  const {
    highlightedImage,
    setHighlightedImage,
    isMobile,
    gallery,
    subsCount,
    index,
    setIndex,
    maxIndex,
    getElementProperty,
  } = useShopDetailGalleryController(images);

  return (
    <>
      <section className="shop-product-detail-gallery" ref={gallery}>
        <div className="main">
          <img
            src={ApiImgUrl(highlightedImage.path)}
            alt={`${import.meta.env.VITE_APP_NAME} - ${highlightedImage.path}`}
          />
        </div>
        <div className={`subs-container ${isMobile ? 'mobile' : ''}`}>
          {!isMobile && index > 0 && (
            <button
              className="navigator navigator-left"
              onClick={() => setIndex((prev) => prev - 1)}
            >
              <IconChevronLeft width="25" height="25" />
            </button>
          )}

          {!isMobile && index < maxIndex && (
            <button
              className="navigator navigator-right"
              onClick={() => setIndex((prev) => prev + 1)}
            >
              <IconChevronRight width="25" height="25" />
            </button>
          )}

          {!isMobile && (
            <div
              className="container-content"
              style={{
                translate: `-${
                  isMobile
                    ? 0
                    : index == 0
                    ? 0
                    : ((parseInt(getElementProperty(gallery.current!, '--gallery-width')) +
                        parseInt(getElementProperty(gallery.current!, '--gallery-gap'))) /
                        Math.floor(subsCount / 2)) *
                        index -
                      (images.length % 2 === 1 && index == maxIndex
                        ? 1 *
                          ((parseInt(getElementProperty(gallery.current!, '--gallery-width')) +
                            parseInt(getElementProperty(gallery.current!, '--gallery-gap'))) /
                            subsCount)
                        : 0)
                }px`,
              }}
            >
              {Array(Math.ceil(images.length / subsCount))
                .fill(0)
                .map((_, i) => (
                  <div className="subs" key={i}>
                    {images.slice(i * subsCount, (i + 1) * subsCount).map((image) => (
                      <div
                        key={image.id}
                        className="sub cursor-pointer"
                        onClick={() => setHighlightedImage(image)}
                      >
                        <img
                          src={ApiImgUrl(image.path)}
                          alt={`${import.meta.env.VITE_APP_NAME} - ${image.id}`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}

          {isMobile && (
            <div className="container-content mobile">
              {images.map((image) => (
                <div key={image.id} className="sub" onClick={() => setHighlightedImage(image)}>
                  <img
                    src={ApiImgUrl(image.path)}
                    alt={`${import.meta.env.VITE_APP_NAME} - ${image.id}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}