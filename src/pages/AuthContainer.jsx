import React, { useState } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

const AuthContainer = () => {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      {showSignIn ? (
        <SignIn onSwitchToSignUp={() => setShowSignIn(false)} />
      ) : (
        <SignUp onSwitchToSignIn={() => setShowSignIn(true)} />
      )}
    </>
  )
}

export default AuthContainer
