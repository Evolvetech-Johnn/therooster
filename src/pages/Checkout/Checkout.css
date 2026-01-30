import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, QrCode, Truck, ShoppingBag } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useOrder } from "../../contexts/OrderContext";
import { useStore } from "../../contexts/StoreContext";
import { formatCurrency } from "../../utils/formatters";
import OrderTracker from "../../components/order/OrderTracker";
import "./Checkout.css";
import toast from "react-hot-toast";

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const { addOrder, orders } = useOrder();
  const { storeConfig } = useStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [orderType, setOrderType] = useState("delivery"); // 'delivery' or 'pickup'
  const [createdOrderId, setCreatedOrderId] = useState(null);

  // Form States
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "São Paulo", // Default or fetched
    state: "SP",
  });
  const [changeFor, setChangeFor] = useState("");

  const isOpen = storeConfig?.isOpen ?? true;

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

  const deliveryFee = orderType === "delivery" ? (storeConfig?.deliveryFee || 5.0) : 0;
  const total = subtotal + deliveryFee;

  // Input Masking
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    setPhone(value);
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setAddress({ ...address, cep: value });
  };

  const handleFinishOrder = async (e) => {
    e.preventDefault();

    if (!isOpen) {
      toast.error("Desculpe, a loja está fechada no momento.");
      return;
    }

    // Validation
    if (!phone || phone.length < 14) { // (11) 91234-5678 is 15 chars, (11) 1234-5678 is 14 chars
      toast.error("Por favor, informe um telefone válido.");
      return;
    }

    if (orderType === "delivery") {
      if (!address.street || !address.number || !address.neighborhood || !address.cep) {
        toast.error("Por favor, preencha todos os campos obrigatórios do endereço.");
        return;
      }
    }

    if (paymentMethod === "cash" && changeFor) {
        // Optional: Validate if changeFor is greater than total
        // Simple check just to ensure it's not text garbage if needed
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const fullAddress = orderType === "delivery" 
        ? `${address.street}, ${address.number} - ${address.neighborhood} (${address.cep})${address.complement ? ` - ${address.complement}` : ''}`
        : "Retirada no Local";

      const newOrder = {
        customer: user?.name || "Cliente",
        phone: phone,
        items: cartItems.map((item) => `${item.quantity}x ${item.name}`).join(", "),
        itemsList: cartItems,
        total: total,
        type: orderType,
        paymentMethod: paymentMethod,
        changeFor: paymentMethod === "cash" ? changeFor : null,
        address: fullAddress,
        deliveryFee: deliveryFee,
        status: "Recebido", // Initial status
        createdAt: new Date().toISOString()
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
      case "Recebido": return 1;
      case "Preparando": return 2;
      case "Pronto": return 3;
      case "Saiu p/ Entrega":
      case "Pronto p/ Retirada":
      case "Entregue":
      case "Retirado": return 4;
      default: return 1;
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
            
            {/* Contact Info */}
            <section className="form-section">
                <h3>Contato</h3>
                <div className="form-group">
                    <label>Telefone / WhatsApp</label>
                    <input 
                        type="text" 
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={15}
                        required
                    />
                </div>
            </section>

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
              <div className="form-row">
                  <div className="form-group" style={{ flex: '1' }}>
                    <label>CEP</label>
                    <input
                      type="text"
                      placeholder="00000-000"
                      value={address.cep}
                      onChange={handleCepChange}
                      maxLength={9}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ flex: '2' }}>
                      <label>Cidade</label>
                      <input type="text" value={address.city} disabled />
                  </div>
              </div>
              
              <div className="form-row">
                <div className="form-group" style={{ flex: '3' }}>
                    <label>Rua</label>
                    <input
                    type="text"
                    placeholder="Nome da rua"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    required
                    />
                </div>
                <div className="form-group" style={{ flex: '1' }}>
                    <label>Número</label>
                    <input
                    type="text"
                    placeholder="123"
                    value={address.number}
                    onChange={(e) => setAddress({...address, number: e.target.value})}
                    required
                    />
                </div>
              </div>

              <div className="form-row">
                  <div className="form-group" style={{ flex: '1' }}>
                    <label>Bairro</label>
                    <input
                        type="text"
                        placeholder="Bairro"
                        value={address.neighborhood}
                        onChange={(e) => setAddress({...address, neighborhood: e.target.value})}
                        required
                    />
                  </div>
              </div>

              <div className="form-group">
                <label>Complemento (Opcional)</label>
                <input 
                    type="text" 
                    placeholder="Apto, Bloco, Ponto de referência" 
                    value={address.complement}
                    onChange={(e) => setAddress({...address, complement: e.target.value})}
                />
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
                  Seu pedido estará pronto em aproximadamente {storeConfig?.waitTime || '30-40 min'}.
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

            {paymentMethod === "pix" && (
              <div
                className="payment-info-box"
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "var(--bg-input)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Chave PIX (CNPJ): 00.000.000/0001-00
                </p>
                <small>O pagamento será confirmado na entrega/retirada.</small>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label>Troco para quanto? (Deixe vazio se não precisar)</label>
                <input
                  type="text"
                  placeholder="R$ 50,00"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                />
              </div>
            )}
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