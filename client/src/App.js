import {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios'


function App() {
  const [message,setMessage]=useState('')
  const [list,setList]=useState([])
  const lists=[]

  useEffect(()=>{
    const text={
      message:'herewelcome'
    }
    axios.post('http://localhost:5000/api/text',text).then(data=>{
      const record=data.data.msg.fulfillmentMessages[0].text.text[0]
      let conversation={
        who:'Triny',
        content:{
          text:record
        }
      }
      lists.push(conversation)
      setList([...list,lists])
    })
  },[])

  const showlists=(el)=>{
    return el.map((item,index)=>{
      const second=index++

      return (
        <div >
        <div className="chat-box" key={index}>
          <div className="name">{item[0]===undefined?'':item[0].who}</div>
          <div className="message">{item[0]===undefined?'':item[0].content.text}</div>
        </div>

        <div className="chat-box" key={second} >
          <div className="name">{item[1]===undefined?'':item[1].who}</div>
          <div className="message">{item[1]===undefined?'':item[1].content.text}</div>
        </div>
        </div>
      )
    })
  }
  

  const submitHandler=(e)=>{
    e.preventDefault()
    if(message==='')
    {
      return alert('please write you query')
    }
    let conversation={}
    const text={message}

    conversation={  
      who:'Me',
      content:{
        text:message
      }
    }
    if(lists===[]){
      lists.push(conversation)
      return setList(lists)
    }else{
      lists.push(conversation)
      setList([...list,lists])
    }

    axios.post('http://localhost:5000/api/text',text).then(data=>{

      const record=data.data.msg.fulfillmentMessages[0].text.text[0]
      conversation={
        who:'Triny',
        content:{
          text:record
        }
      }
      lists.push(conversation)
      setList([...list,lists])
       setMessage('')

    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className="main">
    <div className="chatArea">
      <div className="chat-heading">triny bot</div>
      <div className="chat-messages">
       {showlists(list)}
      </div>
    <div className="chat-input">
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="enter message" onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button type="submit">send</button>
      </form>
    </div>
  </div>
    </div>
  );
}

export default App;
