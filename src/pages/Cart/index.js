import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete
} from 'react-icons/md';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

/** ACTIONS */
import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const dispatch = useDispatch();

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalValue, product) => {
        return totalValue + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount)
    }))
  );

  function increment(p) {
    dispatch(CartActions.updateAmountRequest(p.id, p.amount + 1));
  }

  function decrement(p) {
    dispatch(CartActions.updateAmountRequest(p.id, p.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
            <tr key={p.title}>
              <td>
                <img src={p.image} alt={p.title} />
              </td>
              <td>
                <strong>{p.title}</strong>
                <span>{p.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(p)}>
                    <MdRemoveCircleOutline size={20} color="#7951c1" />
                  </button>
                  <input type="number" readOnly value={p.amount} />
                  <button type="button" onClick={() => increment(p)}>
                    <MdAddCircleOutline size={20} color="#7951c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{p.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removeFromCart(p.id))}
                >
                  <MdDelete size={20} color="#7951c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
