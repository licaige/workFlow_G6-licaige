import React from 'react'

export const ThemeContext:any = React.createContext({
  theme:'dark',
  toggleTheme:()=>{}
})

export const OtherContext:any = React.createContext('default')