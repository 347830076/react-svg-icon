import React, { FC } from 'react'
import styles from './icon.module.scss'
import classNames from 'classnames'

interface Props {
  type: string
  size?: string | number
  className?: string
  onClick?(e: React.MouseEvent): void
}

// svg图标默认点击事件
const handleClick = (e: React.MouseEvent): void => {
  // eslint-disable-next-line no-console
  // console.log('svg图标默认点击事件 e :>> ', e)
}

const Icon: FC<Props> = ({ className, size, type, onClick = handleClick }) => {

  const getStyle = () => {
    const style = {} as React.CSSProperties
    if (size) {
      style.fontSize = `${size}px`
    }
    return style
  }

  return (
    // <i className={classNames([styles.svgIcon, className])} style={getStyle()} onClick={onClick} >
      <svg className={classNames(styles.svgIcon, className)} aria-hidden="true" style={getStyle()} onClick={onClick}>
        <use xlinkHref={`#${type}`} />
      </svg>
    // </i>
  )
}

export default Icon
