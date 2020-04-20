import react, {useState, components} from 'react'

const Post = props => 
(
    <div>
        <h3>{props.title}</h3>
        <img src={props.img} key={props.key} style={props.style}/>
    </div>
);


export default Post