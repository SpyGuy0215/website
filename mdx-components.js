export function useMDXComponents(components) {
  return {
      h1: ({children}) => <h1 className={'font-inter text-6xl font-bold mb-10'}>{children}</h1>,
      h2: ({children}) => <h2 className={'font-inter text-4xl font-bold my-8'}>{children}</h2>,
      p: ({children}) => <p className={'font-inter leading-8 text-lg'}>{children}</p>,
      ...components
  }
}