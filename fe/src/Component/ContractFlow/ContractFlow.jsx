import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { COMPANY, CONTRACT_STATUS, ROUTES } from "../../constants";
import { getProductById, formatPrice } from "../../data/products";
import Navbar from "../Navbar/Navbar";
import "./ContractFlow.css";

const STEPS = [
  { key: "propose", label: "De xuat" },
  { key: "review", label: "Xem xet" },
  { key: "preon_verify", label: `${COMPANY.NAME} Xac nhan` },
  { key: "sign", label: "Ky hop dong" },
  { key: "done", label: "Hoan tat" },
];

function ContractFlow() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const product = productId ? getProductById(productId) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    productName: product?.name || "",
    quantity: product ? "5" : "",
    unit: "tan",
    pricePerUnit: product ? String(product.price) : "",
    deliveryDate: "",
    paymentTerms: "50_50",
    notes: "",
    farmerName: user?.role === "farmer" ? user.fullName : "",
    enterpriseName: user?.role === "enterprise" ? user.fullName : "",
  });
  const [agreed, setAgreed] = useState({ terms: false, preon: false });

  const totalValue = (parseFloat(form.quantity) || 0) * (parseFloat(form.pricePerUnit) || 0) * 1000;
  const commission = totalValue * COMPANY.COMMISSION_RATE / 100;

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (currentStep === 0) return form.productName && form.quantity && form.pricePerUnit && form.deliveryDate;
    if (currentStep === 3) return agreed.terms && agreed.preon;
    return true;
  };

  const nextStep = () => { if (canAdvance() && currentStep < STEPS.length - 1) setCurrentStep(s => s + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(s => s - 1); };

  return (
    <>
      <Navbar />
      <div className="contract-flow-page">
        <Container>
          <button className="cf-back" onClick={() => navigate(-1)}>Quay lai</button>

          <div className="cf-header">
            <h2>Tao Hop Dong Bao Tieu</h2>
            <p>Luong ky hop dong qua trung gian <strong>{COMPANY.NAME}</strong> -- dam bao quyen loi hai ben</p>
          </div>

          {/* Step Progress */}
          <div className="cf-steps">
            {STEPS.map((step, i) => (
              <div key={step.key} className={`cf-step ${i <= currentStep ? "active" : ""} ${i < currentStep ? "done" : ""}`}>
                <div className="cf-step-dot">{i < currentStep ? <span className="check-inline" /> : <span className="step-num">{i + 1}</span>}</div>
                <span>{step.label}</span>
                {i < STEPS.length - 1 && <div className="cf-step-line" />}
              </div>
            ))}
          </div>

          <div className="cf-body">
            {/* Step 0: Propose */}
            {currentStep === 0 && (
              <div className="cf-card">
                <h3>Thong tin hop dong</h3>
                <div className="cf-form">
                  <div className="cf-row">
                    <div className="cf-field">
                      <label>San pham *</label>
                      <input value={form.productName} onChange={e => handleChange("productName", e.target.value)} placeholder="VD: Thanh Long Ruot Do" />
                    </div>
                    <div className="cf-field">
                      <label>So luong *</label>
                      <div className="cf-input-group">
                        <input type="number" value={form.quantity} onChange={e => handleChange("quantity", e.target.value)} placeholder="VD: 5" />
                        <select value={form.unit} onChange={e => handleChange("unit", e.target.value)}>
                          <option value="tan">tan</option>
                          <option value="kg">kg</option>
                          <option value="thung">thung</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="cf-row">
                    <div className="cf-field">
                      <label>Gia moi {form.unit} (VND) *</label>
                      <input type="number" value={form.pricePerUnit} onChange={e => handleChange("pricePerUnit", e.target.value)} placeholder="VD: 15000" />
                    </div>
                    <div className="cf-field">
                      <label>Ngay giao hang *</label>
                      <input type="date" value={form.deliveryDate} onChange={e => handleChange("deliveryDate", e.target.value)} />
                    </div>
                  </div>

                  <div className="cf-row">
                    <div className="cf-field">
                      <label>Phuong thuc thanh toan</label>
                      <select value={form.paymentTerms} onChange={e => handleChange("paymentTerms", e.target.value)}>
                        <option value="50_50">50% dat coc -- 50% khi nhan hang</option>
                        <option value="30_70">30% dat coc -- 70% khi nhan hang</option>
                        <option value="100_delivery">100% khi nhan hang</option>
                        <option value="100_upfront">100% tra truoc</option>
                      </select>
                    </div>
                    <div className="cf-field">
                      <label>Ben doi tac</label>
                      <input
                        value={user?.role === "farmer" ? form.enterpriseName : form.farmerName}
                        onChange={e => handleChange(user?.role === "farmer" ? "enterpriseName" : "farmerName", e.target.value)}
                        placeholder={user?.role === "farmer" ? "Ten doanh nghiep" : "Ten nong dan / HTX"}
                      />
                    </div>
                  </div>

                  <div className="cf-field full">
                    <label>Ghi chu them</label>
                    <textarea value={form.notes} onChange={e => handleChange("notes", e.target.value)} rows={3} placeholder="Yeu cau dac biet, tieu chuan chat luong..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Review */}
            {currentStep === 1 && (
              <div className="cf-card">
                <h3>Xem xet hop dong</h3>
                <div className="cf-summary">
                  <div className="cf-summary-row"><span>San pham:</span><strong>{form.productName}</strong></div>
                  <div className="cf-summary-row"><span>So luong:</span><strong>{form.quantity} {form.unit}</strong></div>
                  <div className="cf-summary-row"><span>Don gia:</span><strong>{formatPrice(parseFloat(form.pricePerUnit) || 0)}/{form.unit}</strong></div>
                  <div className="cf-summary-row"><span>Ngay giao:</span><strong>{form.deliveryDate || "--"}</strong></div>
                  <div className="cf-summary-row"><span>Thanh toan:</span><strong>{form.paymentTerms === "50_50" ? "50/50" : form.paymentTerms === "30_70" ? "30/70" : form.paymentTerms === "100_delivery" ? "100% khi nhan" : "100% tra truoc"}</strong></div>
                  <div className="cf-summary-row"><span>Nha san xuat:</span><strong>{form.farmerName || "--"}</strong></div>
                  <div className="cf-summary-row"><span>Doanh nghiep:</span><strong>{form.enterpriseName || "--"}</strong></div>

                  <hr />
                  <div className="cf-summary-row total"><span>Tong gia tri:</span><strong>{formatPrice(totalValue)}</strong></div>
                  <div className="cf-summary-row fee"><span>Phi {COMPANY.NAME} ({COMPANY.COMMISSION_RATE}%):</span><strong>{formatPrice(commission)}</strong></div>
                  {form.notes && <div className="cf-summary-row"><span>Ghi chu:</span><strong>{form.notes}</strong></div>}
                </div>
              </div>
            )}

            {/* Step 2: PreOnic Verification */}
            {currentStep === 2 && (
              <div className="cf-card center">
                <div className="cf-verify-icon"><span className="shield-icon large" /></div>
                <h3>{COMPANY.NAME} dang xac minh</h3>
                <p>He thong dang kiem tra thong tin hai ben va xac nhan hop dong hop le.</p>

                <div className="cf-verify-items">
                  <div className="cf-verify-item done"><span className="check-inline" /> Xac minh danh tinh nguoi ban</div>
                  <div className="cf-verify-item done"><span className="check-inline" /> Xac minh danh tinh nguoi mua</div>
                  <div className="cf-verify-item done"><span className="check-inline" /> Kiem tra gia thi truong</div>
                  <div className="cf-verify-item done"><span className="check-inline" /> Kiem tra nang luc cung ung</div>
                  <div className="cf-verify-item done"><span className="check-inline" /> {COMPANY.NAME} phe duyet hop dong</div>
                </div>

                <div className="cf-verify-badge">
                  <span className="shield-icon" />
                  <div>
                    <strong>Hop dong duoc {COMPANY.NAME} bao ve</strong>
                    <p>Phi dich vu {COMPANY.COMMISSION_RATE}% -- Bao hiem giao dich -- Ho tro giai quyet tranh chap</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Sign */}
            {currentStep === 3 && (
              <div className="cf-card">
                <h3>Ky hop dong dien tu</h3>

                <div className="cf-contract-doc">
                  <div className="cf-doc-header">
                    <h4>HOP DONG BAO TIEU NONG SAN</h4>
                    <p>So: PRE-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</p>
                  </div>
                  <div className="cf-doc-body">
                    <p>Hop dong bao tieu <strong>{form.quantity} {form.unit} {form.productName}</strong> voi don gia <strong>{formatPrice(parseFloat(form.pricePerUnit) || 0)}/{form.unit}</strong>.</p>
                    <p>Tong gia tri: <strong>{formatPrice(totalValue)}</strong> | Phi dich vu {COMPANY.NAME}: <strong>{formatPrice(commission)}</strong></p>
                    <p>Ngay giao hang: <strong>{form.deliveryDate}</strong></p>
                    <p>Ben ban: {form.farmerName || "--"} | Ben mua: {form.enterpriseName || "--"}</p>
                    <p>Trung gian: <strong>{COMPANY.FULL_NAME}</strong></p>
                  </div>
                </div>

                <div className="cf-checkboxes">
                  <label>
                    <input type="checkbox" checked={agreed.terms} onChange={e => setAgreed(p => ({ ...p, terms: e.target.checked }))} />
                    <span>Toi dong y voi <button type="button" className="cf-link-btn">dieu khoan hop dong</button> va cam ket thuc hien dung noi dung</span>
                  </label>
                  <label>
                    <input type="checkbox" checked={agreed.preon} onChange={e => setAgreed(p => ({ ...p, preon: e.target.checked }))} />
                    <span>Toi dong y phi dich vu {COMPANY.COMMISSION_RATE}% cho {COMPANY.NAME} -- doi lai duoc bao ve giao dich</span>
                  </label>
                </div>

                <div className="cf-sign-area">
                  <div className="cf-signature-box">
                    <p>Chu ky cua ban</p>
                    <div className="cf-signature-pad">{user?.fullName || "Ky ten tai day"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Done */}
            {currentStep === 4 && (
              <div className="cf-card center">
                <div className="cf-done-icon"><span className="done-check-icon" /></div>
                <h3>Hop dong da duoc ky thanh cong!</h3>
                <p>Ma hop dong: <strong>PRE-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}</strong></p>

                <div className="cf-done-summary">
                  <div><span>San pham:</span><strong>{form.productName}</strong></div>
                  <div><span>Gia tri:</span><strong>{formatPrice(totalValue)}</strong></div>
                  <div><span>Phi {COMPANY.NAME}:</span><strong>{formatPrice(commission)}</strong></div>
                  <div><span>Trang thai:</span><strong className="text-success">{CONTRACT_STATUS.ACTIVE}</strong></div>
                </div>

                <div className="cf-done-actions">
                  <button className="cf-btn primary" onClick={() => navigate(user?.role === "enterprise" ? ROUTES.ENTERPRISE : ROUTES.FARMER)}>
                    Ve Dashboard
                  </button>
                  <button className="cf-btn outline" onClick={() => navigate(ROUTES.MESSAGING)}>
                    Nhan tin doi tac
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 4 && (
              <div className="cf-nav">
                <button className="cf-btn outline" onClick={prevStep} disabled={currentStep === 0}>Quay lai</button>
                <button className="cf-btn primary" onClick={nextStep} disabled={!canAdvance()}>
                  {currentStep === 3 ? "Ky hop dong" : "Tiep tuc"}
                </button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default ContractFlow;
