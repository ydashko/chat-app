import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';

const botResponses = [
  "Интересно!",
  "Расскажи подробнее.",
  "Я вас понял.",
  "Прекрасно!",
  "Хороший вопрос!",
  "Продолжайте!",
  "Замечательно!",
];

const MAX_LENGTH = 300; // максимальная длина сообщения

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, addMessage, isTyping, setIsTyping } = useChatStore();
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    if (input.length > MAX_LENGTH) {
      alert(`Сообщение не должно превышать ${MAX_LENGTH} символов.`);
      return;
    }

    addMessage({ sender: 'user', text: input });
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      addMessage({
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
      });
      setIsTyping(false);
    }, Math.random() * 1500 + 500); // ответ через 0.5-2 секунды
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="message bot typing">Бот печатает...</div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Введите сообщение..."
          maxLength={MAX_LENGTH}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
}
