import PageHeaderNav from '@/commons/components/Layout/HomeLayout/PageHeaderNav';
import ShopDetailForm from '@/pages/Shop/ShopDetail/components/ShopDetailForm/ShopDetailForm';
import ShopDetailGallery from '@/pages/Shop/ShopDetail/components/ShopDetailGallery/ShopDetailGallery';
import useShopDetailController from '@/pages/Shop/ShopDetail/ShopDetailController';

export default function ShopDetail() {
  const {
    productDetailData,
    productDetailDataIsFetching,
    productDetailDataIsRefetch,
    // selectedVariant,
    // setSelectedVariant,
  } = useShopDetailController();

  return (
    <>
      <PageHeaderNav navigations={[{label: "Home", link: '/'}, {label: "Shop", link: '/shop'}, {label: `${productDetailData?.data.name}`}]} />
      <section className="container mt-1">
        <section id="shop-product-detail">
          {/* <ShopProductDetailGallery images={product.images!} />
          <ShopProductDetailForm product={product} category={category} /> */}
          <ShopDetailGallery images={productDetailData?.data?.images} />
          <ShopDetailForm
            productDetailData={productDetailData?.data!}
            isPending={productDetailDataIsFetching}
            refetch={productDetailDataIsRefetch}
            // selectedVariant={selectedVariant}
            // setSelectedVariant={setSelectedVariant}
          />
        </section>
        <section
          style={{
            marginTop: '5rem',
          }}
        >
          {/* <ShopProductDetailTable
						category_type={mainProduct.category_type}
					/> */}
        </section>
      </section>
    </>
  );
}
