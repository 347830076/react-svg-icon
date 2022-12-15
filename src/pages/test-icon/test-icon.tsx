// 图标预览页面
import styles from './test-icon.module.scss'
import Icon from '@/components/icon/icon'
import classNames from 'classnames'
import React, { useState } from 'react'
import { message, Empty } from 'antd'

export default function TestIcon() {
  // 默认icon大小
  const DEFAULT_FONT_SIZE = 36
  const [fontSize] = useState(DEFAULT_FONT_SIZE)

  // 保存本地图标的路径
  const SVG_DIR = '@/assets/imgs/icons'

  // 获取本地图标
  const getLocalIcons = () => {
    let icons = []
    try {
      icons = require.context('@/assets/imgs/icons', false, /\.svg$/).keys()
        .map(name => name.replace(/^\.\/([\w-]+)\.svg/, '$1'))
      return icons
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('本地图标 获取error :>> ', error)
      return []
    }
  }

  // 本地图标
  const localIcons = getLocalIcons()

  // 点击复制(icon代码或icon名字)
  const handleIconClick = async(iconName: string, copyType: number) => {
    try {
      await navigator.clipboard.writeText(copyType === 1 ? `<Icon class='icon ${iconName}' type='${iconName}' />` : iconName)
  
      message.success(`${iconName}的${copyType === 1 ? '代码' : '名称'}复制成功!`)
    } catch (error) {
      message.error('复制失败,您的浏览器不支持复制功能或需切换成localhost域名')
    }
  }

  // icon列表
  const renderIconList = (iconNames: string[]) => (
    <ul className={styles.iconList}>
      {iconNames.map(iconName => (
        <li className={styles.iconItem} key={iconName}>
          <Icon className={classNames([styles.icon, iconName])} size={fontSize || DEFAULT_FONT_SIZE} type={iconName} onClick={() => handleIconClick(iconName, 1)} />
          <p className={styles.iconName} onClick={() => handleIconClick(iconName, 2)}>{iconName}</p>
        </li>
      ))}
    </ul>
  )

  // // 改变fontSize大小
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value: inputValue } = e.target
  //   setFontSize(Number(inputValue))
  // }

  // const tips = <ul>
  //   <p>Tips：</p>
  //   <li>1.如果发现 icon 不能改变颜色，则检查下该svg是否有自带颜色 stroke='#262626' 或 fill='#262626' 。在确保图标完整的情况下可删除svg的 stroke 或 fill 属性，或者让UI同事做下去色处理后再重新替换有问题的svg。</li>
  //   <li>2.注意本地icon的svg命名别跟iconfont上的icon名字重复。</li>
  // </ul>

  const inputFontSize = <p className={styles.tips}>
    <span>点击图标复制图标代码, 点击icon名字复制名字</span>
    {/* <span>调整icon大小 <Input className={styles.inputFontSize} value={fontSize} type="number" placeholder="px" onChange={handleChange}></Input> px</span> */}
  </p>

  return (
    <section className={styles.testIconPage}>
      {/* <h1 className={styles.title}>图标预览页面</h1> */}
      {
        localIcons && localIcons.length ? (
          <>
            {/* <Alert type="warning" message={tips} closable /> */}
            {inputFontSize}
            {renderIconList(localIcons)}
          </>
        ) : <Empty description={`暂无发现本地 icon，可在 ${SVG_DIR} 里添加 svg 文件。`}></Empty>
      }
    </section>
  )
}