import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, QrCode, Truck, ShoppingBag } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useOrder } from "../../contexts/OrderContext";
import { formatCurrency } from "../../utils/formatters";
import OrderTracker from "../../components/order/OrderTracker";
import "./Checkout.css";
import toast from "react-hot-toast";

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const { addOrder, orders } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [orderType, setOrderType] = useState("delivery"); // 'delivery' or 'pickup'
  const [createdOrderId, setCreatedOrderId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Faça login para continuar");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0 && !success) {
      toast("Seu carrinho está vazio");
      navigate("/catalogo");
    }
  }, [isAuthenticated, cartItems, navigate, success]);

  const deliveryFee = orderType === "delivery" ? 5.0 : 0;
  const total = subtotal + deliveryFee;

  const handleFinishOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newOrder = {
        customer: user?.name || "Cliente",
        items: cartItems
          .map((item) => `${item.quantity}x ${item.name}`)
          .join(", "),
        total: total,
        type: orderType,
        paymentMethod: paymentMethod,
      };

      const createdOrder = addOrder(newOrder);
      setCreatedOrderId(createdOrder.id);

      setLoading(false);
      setSuccess(true);
      clearCart();
      toast.success("Pedido realizado com sucesso!");
    }, 1500);
  };

  // Get real-time status from context if order exists
  const currentOrder = createdOrderId
    ? orders.find((o) => o.id === createdOrderId)
    : null;

  const getStepFromStatus = (status) => {
    switch (status) {
      case "Recebido":
        return 1;
      case "Preparando":
        return 2;
      case "Pronto":
        return 3;
      case "Saiu p/ Entrega":
      case "Pronto p/ Retirada":
      case "Entregue":
      case "Retirado":
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = currentOrder ? getStepFromStatus(currentOrder.status) : 1;

  if (success) {
    return (
      <div className="container checkout-page success-view">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Pedido Confirmado!</h2>
          <p>Obrigado pela sua compra, {user?.name}.</p>
          <p>Seu pedido está sendo preparado com carinho.</p>
          <p className="order-id-display">
            Pedido: <strong>{createdOrderId}</strong>
          </p>

          <OrderTracker orderType={orderType} currentStep={currentStep} />

          <div className="success-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/catalogo")}
            >
              Fazer Novo Pedido
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <h1>Finalizar Pedido</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleFinishOrder}>
          <section className="form-section">
            <h3>Tipo de Pedido</h3>
            <div className="order-type-grid">
              <div
                className={`payment-card ${orderType === "delivery" ? "selected" : ""}`}
                onClick={() => setOrderType("delivery")}
              >
                <Truck size={32} />
                <span>Entrega</span>
              </div>
              <div
                className={`payment-card ${orderType === "pickup" ? "selected" : ""}`}
                onClick={() => setOrderType("pickup")}
              >
                <ShoppingBag size={32} />
                <span>Retirada</span>
              </div>
            </div>
          </section>

          {orderType === "delivery" && (
            <section className="form-section">
              <h3>Endereço de Entrega</h3>
              <div className="form-group">
                <label>Endereço Completo</label>
                <input
                  type="text"
                  placeholder="Rua, Número, Bairro"
                  required
                  defaultValue="Rua Exemplo, 123"
                />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input type="text" placeholder="Apto, Bloco, etc." />
              </div>
            </section>
          )}

          {orderType === "pickup" && (
            <section className="form-section">
              <h3>Retirada no Balcão</h3>
              <div className="pickup-info">
                <p>
                  <strong>Endereço:</strong> Rua do Galo, 100 - Centro
                </p>
                <p>
                  Seu pedido estará pronto em aproximadamente 30-40 minutos.
                </p>
              </div>
            </section>
          )}

          <section className="form-section">
            <h3>Pagamento</h3>
            <div className="payment-grid">
              <div
                className={`payment-card ${paymentMethod === "pix" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("pix")}
              >
                <QrCode size={32} />
                <span>PIX</span>
              </div>
              <div
                className={`payment-card ${paymentMethod === "credit" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("credit")}
              >
                <CreditCard size={32} />
                <span>Cartão</span>
              </div>
              <div
                className={`payment-card ${paymentMethod === "cash" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                <Banknote size={32} />
                <span>Dinheiro</span>
              </div>
            </div>
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
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
          >
            {loading ? "Processando..." : "Confirmar Pedido"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
