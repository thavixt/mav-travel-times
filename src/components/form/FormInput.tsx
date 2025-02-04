export function FormInput({ defaultValue, type = 'text', label, name, radioOptions }: {
  defaultValue: string | number | boolean;
  label: string;
  name: string;
  type?: 'text' | 'number' | 'checkbox' | 'radio';
  radioOptions?: Record<string, string>;
}) {
  if (type === 'radio' && radioOptions) {
    return (
      <div className="w-full grid grid-cols-[minmax(100px,1fr)_minmax(100px,2fr)] grid-rows-1 gap-2">
        <label htmlFor={name}>{label}:</label>
        <div className="flex flex-col px-1">
          {Object.entries(radioOptions).map(([key, value]) => (
            <div key={`${name}-${key}`} className="flex space-x-2">
              <input type="radio" id={key} name={name} value={value} defaultChecked={defaultValue === key} />
              <label htmlFor={key}>{value}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'checkbox') {
    return (
      <div className="w-full grid grid-cols-[minmax(100px,1fr)_minmax(100px,2fr)] grid-rows-1 gap-2">
        <label htmlFor={name}>{label}:</label>
        <div className="px-1">
          <input id={name} name={name} defaultChecked={defaultValue as boolean} type={type} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex space-x-2 items-center justify-between">
      <label htmlFor={name}>{label}:</label>
      <input defaultValue={defaultValue as (string | number)} id={name} name={name} type={type} />
    </div>
  )
}