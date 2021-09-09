//Dependencies
import Link,{LinkProps} from "next/link"
import Image from "next/image"


const CustomLink =(props: React.ComponentProps<"a"> & LinkProps)=>{
  console.log(props.href)
  const {href} = props
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if(isInternalLink)  return <Link href={href}><a {...props}/></Link>

  return <a target="_blank" rel="noopener noreferrer" {...props} />

}

const MDXComponents = {
    a: CustomLink,
    Image
}

export default MDXComponents;