import React, { useState, useRef, useEffect } from 'react';

function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 코끼리공장 ESG 대시보드 도우미입니다. 궁금하신 점을 물어보세요. 📊',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

      // CORS 프록시를 사용 (프로덕션 환경)
      const isProduction = window.location.hostname !== 'localhost';
      const finalUrl = isProduction
        ? `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`
        : API_URL;

      console.log('Request URL:', finalUrl);
      console.log('Is Production:', isProduction);

      const response = await fetch(finalUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ulid: ULID,
          prompt: `당신은 코끼리공장 ESG 대시보드의 전문 도우미입니다. 사용자의 질문에 친절하고 상세하게 답변해주세요.\n\n사용자 질문: ${input.trim()}`,
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

      if (data.message) {
        content = data.message;
      } else if (data.data) {
        content = data.data;
      } else if (data.result) {
        content = data.result;
      } else if (data.response) {
        content = data.response;
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

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '안녕하세요! 코끼리공장 ESG 대시보드 도우미입니다. 궁금하신 점을 물어보세요. 📊',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="page-header" style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0',
        color: 'white'
      }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '3rem 2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
            💬 AI 챗봇
          </h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            ESG 대시보드에 대해 무엇이든 물어보세요
          </p>
        </div>
      </div>

      <div className="main-content">
        <div className="section" style={{ padding: 0, height: 'calc(100vh - 400px)', minHeight: '600px' }}>
          {/* 챗봇 컨테이너 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            {/* 챗봇 헤더 */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>🐘</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>코끼리공장 ESG 도우미</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    {isLoading ? '답변 입력 중...' : '온라인'}
                  </div>
                </div>
              </div>
              <button
                onClick={clearChat}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                🔄 대화 초기화
              </button>
            </div>

            {/* 메시지 영역 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '2rem',
              backgroundColor: '#F9FAFB',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
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
                    maxWidth: '70%',
                    padding: '1rem 1.25rem',
                    borderRadius: message.role === 'user' ? '1.5rem 1.5rem 0.25rem 1.5rem' : '1.5rem 1.5rem 1.5rem 0.25rem',
                    backgroundColor: message.role === 'user' ? '#10B981' : 'white',
                    color: message.role === 'user' ? 'white' : '#374151',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    wordBreak: 'break-word',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {message.content}
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    color: '#9CA3AF',
                    marginTop: '0.5rem',
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
                    padding: '1rem 1.25rem',
                    borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <form onSubmit={handleSubmit} style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderTop: '1px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
                  disabled={isLoading}
                  rows={3}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'none',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10B981'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: isLoading || !input.trim() ? '#D1D5DB' : '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s',
                    whiteSpace: 'nowrap'
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
                  {isLoading ? '전송 중...' : '📤 전송'}
                </button>
              </div>
              <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: '#6B7280' }}>
                💡 팁: ESG 지표, 데이터 분석, 보고서 작성 등에 대해 질문해보세요.
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 타이핑 애니메이션 CSS */}
      <style>{`
        .typing-dot {
          width: 10px;
          height: 10px;
          borderRadius: 50%;
          backgroundColor: #10B981;
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

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

        @media (max-width: 768px) {
          .section {
            height: calc(100vh - 300px) !important;
            min-height: 500px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatbotPage;

