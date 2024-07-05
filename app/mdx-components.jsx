import {Heading} from '@/app/components/mdx/heading/Heading'

export function useMDXComponents(components){
    return{
        h1: Index,
        ...components
    }
}