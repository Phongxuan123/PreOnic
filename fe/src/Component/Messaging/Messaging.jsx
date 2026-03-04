import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { COMPANY } from "../../constants";
import Navbar from "../Navbar/Navbar";
import "./Messaging.css";

const mockConversations = [
  {
    id: 1,
    name: "HTX Hoa Thang",
    avatar: "HT",
    role: "farmer",
    lastMessage: "Vang, chung toi co the giao 5 tan vao ngay 15/02",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Healthy Harvest Co.",
    avatar: "HH",
    role: "enterprise",
    lastMessage: "Hop dong da duoc phe duyet, vui long kiem tra",
    time: "09:15",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Farm H'Hen Nie",
    avatar: "HN",
    role: "farmer",
    lastMessage: "Ca phe Robusta dot nay rat tot",
    time: "Hom qua",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Global Grains",
    avatar: "GG",
    role: "enterprise",
    lastMessage: "Chung toi muon tang san luong dat hang",
    time: "Hom qua",
    unread: 1,
    online: false,
  },
];

const mockMessages = {
  1: [
    { id: 1, sender: "them", text: "Chao anh/chi, ben minh muon hoi ve dot Thanh Long sap toi", time: "09:00" },
    { id: 2, sender: "me", text: "Chao ban! Vang, dot Thanh Long ruot do du kien thu hoach 15/10. Ben minh can bao nhieu a?", time: "09:05" },
    { id: 3, sender: "them", text: "Ben minh can khoang 5 tan, gia thoa thuan theo hop dong truoc duoc khong?", time: "09:10" },
    { id: 4, sender: "me", text: "Duoc a! Gia 15,000 VND/kg theo cam ket. Anh/chi muon ky hop dong moi khong?", time: "09:15" },
    { id: 5, sender: "them", text: "Vang, chung toi co the giao 5 tan vao ngay 15/02", time: "10:30" },
  ],
  2: [
    { id: 1, sender: "them", text: "Hop dong #PRE-ENT-2026-1523 da duoc phe duyet", time: "08:30" },
    { id: 2, sender: "them", text: "Hop dong da duoc phe duyet, vui long kiem tra va xac nhan giao hang", time: "09:15" },
    { id: 3, sender: "me", text: "Cam on! Toi se kiem tra va xac nhan ngay.", time: "09:20" },
  ],
  3: [
    { id: 1, sender: "them", text: "Ca phe Robusta dot nay rat tot, SCA score 82+", time: "Hom qua" },
    { id: 2, sender: "me", text: "Tuyet voi! Gui mau de nghiem thu nhe.", time: "Hom qua" },
  ],
  4: [
    { id: 1, sender: "them", text: "Chung toi muon tang san luong dat hang len 20 tan/thang", time: "Hom qua" },
  ],
};

function Messaging() {
  useAuth();
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(1);
  const [inputText, setInputText] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat, messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { id: Date.now(), sender: "me", text: inputText, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
    setConversations(prev => prev.map(c => c.id === activeChat ? { ...c, lastMessage: inputText, time: newMsg.time } : c));
    setInputText("");
  };

  const activePerson = conversations.find(c => c.id === activeChat);
  const currentMessages = messages[activeChat] || [];
  const filteredConversations = conversations.filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className="messaging-page">
        <Container fluid className="messaging-container">
          <div className="messaging-layout">
            {/* LEFT — Conversation List */}
            <div className="msg-sidebar">
              <div className="msg-sidebar-header">
                <h3><span className="msg-header-icon" /> Tin nhan</h3>
                <button className="back-btn" onClick={() => navigate(-1)}>Quay lai</button>
              </div>

              <div className="msg-search">
                <input type="text" placeholder="Tim kiem cuoc tro chuyen..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>

              <div className="msg-list">
                {filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    className={`msg-item ${activeChat === conv.id ? "active" : ""}`}
                    onClick={() => setActiveChat(conv.id)}
                  >
                    <div className="msg-item-avatar">
                      {conv.avatar}
                      {conv.online && <span className="online-dot"></span>}
                    </div>
                    <div className="msg-item-content">
                      <div className="msg-item-top">
                        <h4>{conv.name}</h4>
                        <span className="msg-time">{conv.time}</span>
                      </div>
                      <p className="msg-preview">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Chat */}
            <div className="msg-chat">
              {activePerson ? (
                <>
                  <div className="msg-chat-header">
                    <div className="chat-person">
                      <div className="msg-item-avatar">{activePerson.avatar}{activePerson.online && <span className="online-dot"></span>}</div>
                      <div>
                        <h4>{activePerson.name}</h4>
                        <span className="chat-status">{activePerson.online ? "Dang hoat dong" : "Offline"}</span>
                      </div>
                    </div>
                    <div className="chat-actions">
                      <button className="chat-action-btn contract-action" title="Tao hop dong"><span className="action-icon contract-a-icon" /></button>
                      <button className="chat-action-btn call-action" title="Goi dien"><span className="action-icon call-a-icon" /></button>
                      <button className="chat-action-btn more-action" title="Them">...</button>
                    </div>
                  </div>

                  <div className="msg-chat-body">
                    <div className="preon-notice">
                      <span className="shield-icon" />
                      <p>Cuoc tro chuyen duoc bao ve boi {COMPANY.NAME}. Moi thoa thuan nen duoc ky ket qua hop dong dien tu de dam bao quyen loi.</p>
                    </div>

                    {currentMessages.map(msg => (
                      <div key={msg.id} className={`msg-bubble ${msg.sender}`}>
                        <p>{msg.text}</p>
                        <span className="msg-bubble-time">{msg.time}</span>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="msg-chat-input">
                    <button className="attach-btn" title="Dinh kem"><span className="attach-icon" /></button>
                    <input
                      type="text"
                      placeholder="Nhap tin nhan..."
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSend()}
                    />
                    <button className="send-btn" onClick={handleSend} disabled={!inputText.trim()}>Gui</button>
                  </div>
                </>
              ) : (
                <div className="msg-empty">
                  <div className="empty-msg-icon" />
                  <p>Chon cuoc tro chuyen de bat dau</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Messaging;
