import React, { useRef, useState, useId } from 'react'
import { offset, shift, arrow, useFloating, FloatingPortal, Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopOverProp {
  children?: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  initalOpen?: boolean
  numberOffset?: number
  placement?: Placement
}

export default function Popover({
  children,
  className,
  renderPopover,
  initalOpen = false,
  numberOffset = -10,
  placement = 'bottom-end'
}: PopOverProp) {
  const [open, setIsOpen] = useState(initalOpen)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(numberOffset), shift(), arrow({ element: arrowRef })],
    placement
  })

  const id = useId()
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }

  return (
    <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
