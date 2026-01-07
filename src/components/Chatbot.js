import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 코끼리공장 ESG 대시보드 도우미입니다. 궁금하신 점을 물어보세요. 📊',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Potens AI API 호출 (환경 변수 사용)
      const API_URL = process.env.REACT_APP_POTENS_API_URL || 'https://potens.ai/pota/keb187z2zmm4w9q62std7k08';
      const API_KEY = process.env.REACT_APP_POTENS_API_KEY;
      const ULID = process.env.REACT_APP_POTENS_ULID;
      const MODEL = process.env.REACT_APP_POTENS_MODEL || 'claude-4-sonnet';

      if (!API_KEY || !ULID) {
        throw new Error('API 설정이 누락되었습니다.');
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ulid: ULID,
          prompt: `당신은 코끼리공장 ESG 대시보드의 도우미입니다. 사용자의 질문에 친절하고 정확하게 답변해주세요.\n\n사용자 질문: ${input.trim()}`,
          model: MODEL
        })
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();

      // 디버깅: 응답 데이터 구조 확인
      console.log('API Response:', data);

      // 응답 데이터에서 실제 메시지 추출
      let content = '응답을 받을 수 없습니다.';

      if (data.data) {
        content = data.data;
      } else if (data.result) {
        content = data.result;
      } else if (data.response) {
        content = data.response;
      } else if (data.message) {
        content = data.message;
      } else if (typeof data === 'string') {
        content = data;
      } else {
        // 전체 응답을 JSON으로 표시
        console.error('Unexpected response format:', data);
        content = `응답 형식 오류. 전체 응답: ${JSON.stringify(data)}`;
      }

      const assistantMessage = {
        role: 'assistant',
        content: content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);

      let errorContent = '죄송합니다. 일시적인 오류가 발생했습니다.';

      if (error.message === 'API 설정이 누락되었습니다.') {
        errorContent = '⚠️ API 설정이 누락되었습니다. .env 파일을 확인해주세요.';
      } else if (error.message === 'API 요청 실패') {
        errorContent = '❌ API 요청이 실패했습니다. 네트워크 연결을 확인해주세요.';
      } else {
        errorContent = `오류: ${error.message}`;
      }

      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* 챗봇 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          fontSize: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#059669';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#10B981';
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* 챗봇 윈도우 */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          width: '380px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          overflow: 'hidden',
          border: '1px solid #E5E7EB'
        }}>
          {/* 헤더 */}
          <div style={{
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            borderRadius: '1rem 1rem 0 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ fontSize: '1.5rem' }}>🐘</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>ESG 도우미</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>코끼리공장 챗봇</div>
              </div>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#F9FAFB',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: message.role === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                  backgroundColor: message.role === 'user' ? '#10B981' : 'white',
                  color: message.role === 'user' ? 'white' : '#374151',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  wordBreak: 'break-word',
                  lineHeight: '1.5'
                }}>
                  {message.content}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#9CA3AF',
                  marginTop: '0.25rem',
                  paddingLeft: message.role === 'user' ? '0' : '0.5rem',
                  paddingRight: message.role === 'user' ? '0.5rem' : '0'
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem 1rem 1rem 0',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div className="typing-dot" style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      animation: 'typing 1.4s infinite'
                    }}></div>
                    <div className="typing-dot" style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      animation: 'typing 1.4s infinite 0.2s'
                    }}></div>
                    <div className="typing-dot" style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      animation: 'typing 1.4s infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <form onSubmit={handleSubmit} style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderTop: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#10B981'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: isLoading || !input.trim() ? '#D1D5DB' : '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && input.trim()) {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && input.trim()) {
                    e.currentTarget.style.backgroundColor = '#10B981';
                  }
                }}
              >
                전송
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 타이핑 애니메이션 CSS */}
      <style>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 2rem) !important;
            height: calc(100vh - 10rem) !important;
            right: 1rem !important;
            bottom: 5rem !important;
          }
        }
      `}</style>
    </>
  );
}

export default Chatbot;

