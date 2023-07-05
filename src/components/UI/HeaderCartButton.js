import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../store/cart-context';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHightlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numberOfItems = items.reduce(
        (curNumber, item) => curNumber + item.amount,
        0
    );

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHightlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHightlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;
