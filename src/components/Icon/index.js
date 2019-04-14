import React from 'react'

export default function index(props={type:'circle',size:24}) {
    let {size} = props;
return (
    <i data-feather={props.type} width={size} height={size} {...props}></i>
  )
}
