import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        setMessage('✅ Compte créé ! Vérifie ton email pour confirmer.')
      } else {
        await signIn(email, password)
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {isSignUp ? '📝 Créer un compte' : '🔐 Connexion GMAO'}
        </h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="ton@email.com"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
              placeholder="Min. 6 caractères"
            />
          </div>

          {error && <div style={styles.error}>❌ {error}</div>}
          {message && <div style={styles.success}>{message}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Chargement...' : (isSignUp ? 'Créer le compte' : 'Se connecter')}
          </button>
        </form>

        <button
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
            setMessage('')
          }}
          style={styles.toggle}
        >
          {isSignUp 
            ? '← Déjà un compte ? Se connecter' 
            : "Pas encore de compte ? S'inscrire →"}
        </button>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    margin: '0 0 30px 0',
    textAlign: 'center',
    color: '#333',
    fontSize: '28px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#555'
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    transition: 'transform 0.2s'
  },
  toggle: {
    marginTop: '20px',
    width: '100%',
    padding: '10px',
    background: 'transparent',
    border: 'none',
    color: '#667eea',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500
  },
  error: {
    padding: '12px',
    background: '#fee',
    color: '#c33',
    borderRadius: '8px',
    fontSize: '14px'
  },
  success: {
    padding: '12px',
    background: '#efe',
    color: '#3a3',
    borderRadius: '8px',
    fontSize: '14px'
  }
}