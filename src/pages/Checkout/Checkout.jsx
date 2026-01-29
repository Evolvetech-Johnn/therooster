import { useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, QrCode } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatters';
import './Checkout.css';

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');

// ... (Effect hooks same as before)

// ... (handleFinishOrder same as before)

// ... (render success same as before)

  const deliveryFee = 5.00;

  return (
    <div className="container checkout-page">
      <h1>Finalizar Pedido</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleFinishOrder}>
            <section className="form-section">
                <h3>Endereço de Entrega</h3>
                <div className="form-group">
                    <label>Endereço Completo</label>
                    <input type="text" placeholder="Rua, Número, Bairro" required defaultValue="Rua Exemplo, 123" />
                </div>
                <div className="form-group">
                    <label>Complemento</label>
                    <input type="text" placeholder="Apto, Bloco, etc." />
                </div>
            </section>

            <section className="form-section">
                <h3>Pagamento</h3>
                <div className="payment-grid">
                    <div 
                        className={`payment-card ${paymentMethod === 'pix' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('pix')}
                    >
                        <QrCode size={32} />
                        <span>PIX</span>
                    </div>
                    <div 
                        className={`payment-card ${paymentMethod === 'credit' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('credit')}
                    >
                        <CreditCard size={32} />
                        <span>Cartão</span>
                    </div>
                    <div 
                        className={`payment-card ${paymentMethod === 'cash' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('cash')}
                    >
                        <Banknote size={32} />
                        <span>Dinheiro</span>
                    </div>
                </div>
                {/* Hidden input to satisfy form data requirement if needed, or stick to state */}
                <input type="hidden" name="paymentMethod" value={paymentMethod} />
            </section>

            <div className="order-summary-mini">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="summary-row">
                    <span>Entrega</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="summary-row total">
                    <span>Total a pagar</span>
                    <strong>{formatCurrency(subtotal + deliveryFee)}</strong>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                {loading ? 'Processando...' : 'Confirmar Pedido'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
