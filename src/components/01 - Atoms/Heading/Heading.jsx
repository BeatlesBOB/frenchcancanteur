import './Heading.scss'

export default function Heading({Tag,children,type}) {   
    return (
        <Tag className={`heading headin--${type}`}>
            {children}
        </Tag>
    )
    
}
