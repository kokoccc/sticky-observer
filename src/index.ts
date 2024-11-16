type TCallback = Function

type TRoot = HTMLElement | undefined

type TOffsets = {
  top?: Number
  right?: Number
  bottom?: Number
  left?: Number
}

type TOffsetValues = TOffsets[keyof TOffsets]

type TDirection = 'top'|'right'|'bottom'|'left'

const getOffsetPx = (value: Number|unknown): String => {
  const offset = typeof value === 'number' ? -(value + 1) : 0
  return `${offset}px`
}

const getOptions = (offsets: TOffsets = {}, root: TRoot) => {
  const top = getOffsetPx(offsets.top)
  const right = getOffsetPx(offsets.right)
  const bottom = getOffsetPx(offsets.bottom)
  const left = getOffsetPx(offsets.left)

  const rootMargin = [top, right, bottom, left].join(' ')
  const threshold = [0, 1]

  return { root, rootMargin, threshold }
}

const checkSticky = (
  { boundingClientRect, rootBounds }: IntersectionObserverEntry,
  offset: TOffsetValues,
  direction: TDirection
) => {
  if (typeof offset !== 'number' || !rootBounds) return false

  const diff = direction === 'top' || direction === 'left'
    ? rootBounds[direction] - boundingClientRect[direction]
    : boundingClientRect[direction] - rootBounds[direction]

  const min = 0
  const max = 2

  return diff > min && diff < max
}

/**
 * Creates a new Intersection Observer instance for observing the element's stickiness state.
 *
 * @param {Function} callback - A function to be called whenever the target element's intersection with the root element changes.
 * @param {Object} [offsets] - An object containing the offset values for the sticky behavior.
 * @param {number} [offsets.top] - The offset from the top of the root element or viewport.
 * @param {number} [offsets.right] - The offset from the right of the root element or viewport.
 * @param {number} [offsets.bottom] - The offset from the bottom of the root element or viewport.
 * @param {number} [offsets.left] - The offset from the left of the root element or viewport.
 * @param {Element} [root] - The root element to use for intersection calculations. If undefined, the browser viewport is used.
 *
 * @returns {IntersectionObserver} - A new Intersection Observer instance.
 */
export default function(
  callback: TCallback,
  offsets: TOffsets = {},
  root: TRoot = undefined
) {
  const options = getOptions(offsets, root)

  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const [entry] = entries
  
    const isTop = checkSticky(entry, offsets.top, 'top')
    const isRight = checkSticky(entry, offsets.right, 'right')
    const isBottom = checkSticky(entry, offsets.bottom, 'bottom')
    const isLeft = checkSticky(entry, offsets.left, 'left')
  
    const isStuck = isTop || isRight || isBottom || isLeft
  
    callback({ isTop, isRight, isBottom, isLeft, isStuck }, entries, observer)
  }

  return new IntersectionObserver(observerCallback, options)
}
