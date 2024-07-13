export function useMDXComponents(components) {
  return {
      h1: ({children}) => <h1 className={'font-inter text-6xl font-bold mb-10 leading-tight'}>{children}</h1>,
      h2: ({children}) => <h2 className={'font-inter text-4xl font-bold my-8'}>{children}</h2>,
      p: ({children}) => <p className={'font-inter leading-8 text-lg'}>{children}</p>,
      pre: ({children}) => <pre className={'bg-gray-800 p-4 my-2 rounded-md text-wrap overflow-x-auto'}>{children}</pre>,
      ul: ({children}) => <ul className={'list-disc my-3'}>{children}</ul>,
      li: ({children}) => <li className={'font-inter text-lg mb-3'}>{children}</li>,
      ...components
  }
}