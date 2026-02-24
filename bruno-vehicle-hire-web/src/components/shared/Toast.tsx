import { useEffect, useState } from 'react'

interface ToastProps {
    message: string
    type?: 'error' | 'success'
    duration?: number
    onClose: () => void
}

export default function Toast({
    message,
    type = 'error',
    duration = 4000,
    onClose,
}: ToastProps) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(onClose, 300)
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const styles = {
        error: 'bg-red-600 text-white',
        success: 'bg-green-600 text-white',
    }

    return (
        <div
            className={`fixed bottom-10 right-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${styles[type]} ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={() => {
                    setVisible(false)
                    setTimeout(onClose, 300)
                }}
                className="text-white/70 hover:text-white transition-colors"
            >
                ✕
            </button>
        </div>
    )
}