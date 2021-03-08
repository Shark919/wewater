import shoppingCart from '@iconify/icons-jam/shopping-cart';
import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import CartDropdown from "../CartDropdown/CartDropdown";
import './style.less';

const CartIcon = ({ t }) => {

	const [cart]: any = useContext(AppContext);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const productsCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';
	const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : '';

	return (
		<>
			<button className="woo-menu-cart-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
				<div>
					{totalPrice ? <span className="woo-next-cart-price mr-2">{totalPrice}</span> : ''}
					<span className="woo-next-cart-icon-container">
						<span role="img" aria-label="cart-icon"><Icon icon={shoppingCart} /> {t('Einkaufswagen')}</span>
						{productsCount ? <span className="woo-next-cart-count">{productsCount}</span> : ''}
					</span>
				</div>
			</button>
			<CartDropdown isDropdownOpen={isDropdownOpen} />
		</>

	)
};

export default CartIcon;
