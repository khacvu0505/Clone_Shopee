import RegisterHeader from 'src/components/RegisterHeader'
import Footer from 'src/components/Footer'

interface RegisterProps {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: RegisterProps) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
