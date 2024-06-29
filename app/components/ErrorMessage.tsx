import type { FC } from 'react'

interface ErrorMessageProps {
  error: {
    message: string
    code?: string
    errors?: {
      message: string
    }[]
  }
  className?: string
}

const ErrorMessages: FC<ErrorMessageProps> = ({ error, className }) => {
  return (
    <div
      className={`${className} flex flex-col text-red py-2.5 px-4 border border-solid border-red`}
    >
      <span>{error.message}</span>
      {error.errors && error.errors?.length > 0 && (
        <ul className="list-disc list-inside">
          {error.errors.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ErrorMessages
