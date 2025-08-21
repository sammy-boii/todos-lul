const EmailTemplate = ({ otp }: { otp: string }) => {
  return (
    <html>
      <head>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Verification Code</title>
        {/* Web font fallbacks for better email client support */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            /* Email client resets */
            body, table, td, p, a, li, blockquote { 
              -webkit-text-size-adjust: 100%; 
              -ms-text-size-adjust: 100%; 
            }
            table, td { 
              mso-table-lspace: 0pt; 
              mso-table-rspace: 0pt; 
            }
            img { 
              -ms-interpolation-mode: bicubic; 
            }
            
            /* Custom styles */
            .email-container {
              background: linear-gradient(135deg, #000000 0%, #111111 100%);
              min-height: 100vh;
            }
            
            .card-shadow {
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            }
            
            .otp-code {
              background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
              border: 2px solid #333333;
              border-radius: 12px;
              padding: 20px 32px;
              font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
              font-size: 32px;
              font-weight: 700;
              letter-spacing: 8px;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              display: inline-block;
              margin: 8px 0;
            }
            
            .brand-gradient {
              background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .subtle-border {
              border-top: 1px solid #334155;
            }
          `}
        </style>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#000000',
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: '1.6',
          color: '#ffffff'
        }}
      >
        {/* Outer container */}
        <table
          width='100%'
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            padding: '40px 20px'
          }}
        >
          <tr>
            <td align='center' valign='top'>
              {/* Main email card */}
              <table
                width='600'
                cellPadding={0}
                cellSpacing={0}
                border={0}
                style={{
                  maxWidth: '600px',
                  backgroundColor: '#111111',
                  borderRadius: '16px',
                  border: '1px solid #2a2a2a',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                }}
              >
                {/* Header with gradient accent */}
                <tr>
                  <td>
                    <table
                      width='100%'
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                    >
                      <tr>
                        <td
                          style={{
                            background:
                              'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                            padding: '32px 40px 24px',
                            textAlign: 'center',
                            borderBottom: '1px solid #333333'
                          }}
                        >
                          <h1
                            style={{
                              margin: '0 0 8px',
                              fontSize: '28px',
                              fontWeight: '700',
                              color: '#ffffff',
                              letterSpacing: '-0.025em'
                            }}
                          >
                            Verification Required
                          </h1>

                          <p
                            style={{
                              margin: 0,
                              fontSize: '16px',
                              color: '#cccccc',
                              fontWeight: '500'
                            }}
                          >
                            Secure access to your account
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Main content */}
                <tr>
                  <td style={{ padding: '40px' }}>
                    <table
                      width='100%'
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                    >
                      <tr>
                        <td style={{ textAlign: 'center' }}>
                          <p
                            style={{
                              margin: '0 0 32px',
                              fontSize: '18px',
                              color: '#ffffff',
                              fontWeight: '500',
                              lineHeight: '1.7'
                            }}
                          >
                            Please use the following verification code to
                            complete your authentication:
                          </p>

                          {/* OTP Code */}
                          <table
                            width='100%'
                            cellPadding={0}
                            cellSpacing={0}
                            border={0}
                          >
                            <tr>
                              <td style={{ textAlign: 'center' }}>
                                <div
                                  style={{
                                    backgroundColor: '#1a1a1a',
                                    border: '2px solid #333333',
                                    borderRadius: '12px',
                                    padding: '24px 40px',
                                    margin: '32px auto',
                                    display: 'inline-block',
                                    boxShadow:
                                      '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: '36px',
                                      fontFamily:
                                        "'Courier New', Monaco, Menlo, Consolas, monospace",
                                      fontWeight: '700',
                                      color: '#ffffff',
                                      letterSpacing: '8px',
                                      textAlign: 'center',
                                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                                    }}
                                  >
                                    {otp}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Security notice */}
                <tr>
                  <td>
                    <table
                      width='100%'
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                    >
                      <tr>
                        <td
                          style={{
                            padding: '32px 40px',
                            backgroundColor: '#0a0a0a',
                            borderTop: '1px solid #333333',
                            borderRadius: '0 0 16px 16px'
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #333333',
                              borderRadius: '8px',
                              padding: '20px',
                              textAlign: 'center'
                            }}
                          >
                            <p
                              style={{
                                margin: '0 0 12px',
                                fontSize: '14px',
                                color: '#fbbf24',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                              }}
                            >
                              <span>⚠️</span> Security Notice
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: '14px',
                                color: '#cccccc',
                                lineHeight: '1.5'
                              }}
                            >
                              If you didn't request this verification code,
                              please ignore this email and consider securing
                              your account.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td>
                    <table
                      width='100%'
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                    >
                      <tr>
                        <td
                          style={{
                            padding: '24px 40px',
                            textAlign: 'center',
                            backgroundColor: '#0a0a0a',
                            borderTop: '1px solid #1a1a1a'
                          }}
                        >
                          <p
                            style={{
                              margin: '0 0 8px',
                              fontSize: '14px',
                              color: '#888888',
                              fontWeight: '500'
                            }}
                          >
                            <span
                              style={{ color: '#3b82f6', fontWeight: '600' }}
                            >
                              Todo App
                            </span>
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '12px',
                              color: '#666666'
                            }}
                          >
                            &copy; {new Date().getFullYear()} XYZ Company, Inc.
                            All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}

export default EmailTemplate
