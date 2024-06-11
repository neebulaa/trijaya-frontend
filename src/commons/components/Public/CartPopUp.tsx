import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { separator } from '@/commons/utils/Currency/Currency';
import useShoppingCartController from '@/pages/ShoppingCart/ShoppingCartController';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

type CartPopupProps = {
  close: Function;
};

export default function CartPopUp({ close }: CartPopupProps) {
  /** Controller */
  const { cartData, cartDataIsFetching, cartTotal } = useShoppingCartController();

  return (
    <section
      className="popup-cart"
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          close();
        }
      }}
    >
      <div
        className="popup-cart-content"
        style={{
          top: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          right: 0,
          left: 'initial',
          translate: '0 0',
        }}
      >
        {cartDataIsFetching ? (
          <Skeleton />
        ) : (
          <>
            <h2>Shopping Cart</h2>
            <hr className="mt-1-05 mb-1" />

            {!cartData || cartData.length < 1 ? (
              <div className="py-5">
                <h4 className="semibold">No items in cart</h4>
              </div>
            ) : (
              <>
                <div className="popup-cart-products">
                  {cartData.map((cart: any, key) => (
                    <div className="popup-cart-product" key={key}>
                      <img
                        src={ApiImgUrl(cart.image)}
                        alt={`${import.meta.env.VITE_APP_NAME} - ` + cart.name}
                      />
                      <div className="popup-cart-product-desc w-100">
                        <div className="popup-cart-product-title">
                          <h3>{cart.name}</h3>
                          <p>{cart.quantity} items</p>
                        </div>
                        <p className="popup-cart-product-price">{`Rp ${separator(
                          cart.price * cart.quantity
                        )}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="mt-2 mb-1" />
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-semibold">Total</h3>
                  <h2 className="highlight">Rp {separator(cartTotal)}</h2>
                </div>
              </>
            )}
            <Link to="/cart">
              <button className="btn w-100" onClick={() => close()}>
                Show Shopping Cart
              </button>
            </Link>
            <Link to="/shop">
              <button className="btn btn-tertiary w-100 mt-05" onClick={() => close()}>
                Go Shopping
              </button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
