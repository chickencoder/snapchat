import { useRef } from 'react'
import { useRouter } from 'next/router'

export default function Camera() {
  const fileRef = useRef(null)
  const router = useRouter()

  async function sendPhoto(event) {
    const file = event.target.files[0]
    const res = await fetch(`/api/upload`)

    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const { id } = await upload.json()

    if (upload.ok) {
      alert('Send your snap')
      router.push(`/send?post=${id}`)
    } else {
      alert('Failed lol.')
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        onChange={sendPhoto}
        accept="image/png, image/jpeg"
        className="hidden"
      />
      <button onClick={(e) => fileRef.current.click()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-8 h-8 text-green-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  )
}