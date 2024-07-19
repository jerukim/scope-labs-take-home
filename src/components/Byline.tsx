import { Fragment } from 'react'

export function Byline({ items }: { items: (string | number)[] }) {
  return (
    <div className="flex gap-x-1 text-sm text-gray-500">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span>{item}</span>
          {i < items.length - 1 && <span>•</span>}
        </Fragment>
      ))}
    </div>
  )
}
