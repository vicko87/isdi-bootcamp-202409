export default function Input({ type, id, autoComplete, placeholder, value, onInput, ref, className, disabled }) {
    return <input className={className} placeholder={placeholder} id={id} type={type} value={value} onInput={onInput} autoComplete={autoComplete} disabled={disabled} />
}