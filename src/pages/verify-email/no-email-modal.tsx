import { useEffect } from 'react'
import Owl from '../../assets/owl.svg'
import CloseButton from '../../assets/close-button.svg'

interface OTPInputProps {
  isOpen: boolean
  onClose: () => void
}

const NoEmailModal = ({ isOpen, onClose }: OTPInputProps) => {
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'modal-overlay') {
      onClose()
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/27 flex justify-center items-end md:items-center z-999"
      onClick={handleOutsideClick}
    >
      <div className="relative bg-white px-8 py-10 w-full rounded-t-3xl md:rounded-3xl shadow-lg md:w-[60%] lg:w-1/2 xl:w-1/3 3xl:w-1/4 text-center duration-300">
        <button
          className="hidden absolute top-6 right-6 text-gray-600 md:block cursor-pointer"
          onClick={onClose}
        >
          <img src={CloseButton} alt="Close Button" />
        </button>
        <img src={Owl} alt="Owl Icon" className="mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">Didn't Get the Email?</h2>
        <ul className="text-gray-600 font-semibold text-left list-disc list-inside">
          <li>
            Check your spam or junk folder - Sometimes, emails get filtered.
          </li>
          <li>Wait a few minutes - It may take a moment to arrive.</li>
          <li>Resend the email - Tap the button to send it again.</li>
          <li>Check if your email is correct - Sometimes, we make mistakes.</li>
        </ul>
      </div>
    </div>
  )
}

export default NoEmailModal
