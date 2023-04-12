// import React, { useRef, useState } from 'react'
// import './CRUD.css'

// function Crud() {
//     const list = [
//         {
//             pid: 1, 
//             pname: "HP",
//             pdesc: "2222",
//             pfile:" "
//         },
//         {
//             pid: 2, 
//             pname: "Dell",
//             pdesc: "2445",
//             pfile:" "
//         },
//     ]
//     const [lists, setList] = useState(list)
//     const [updateState, setUpdateState] = useState(-1)
//     return(
//         <div className='crud'>
//             <div>
//             <AddList setList = {setList }/>
//             <form onSubmit={handleSubmit}>
//             <table>
//                 {
//                     lists.map((current) => (
//                         updateState === current.pid ? <EditList current={current} lists={lists} setList={setList}/> :
//                         <tr>
//                             <td>{current.pid}</td>
//                             <td>{current.pname}</td>
//                             <td>{current.pdesc}</td>
//                             <td>{current.pfile}</td>
//                             <td>
//                                 <button className='edit' onClick={() => handleEdit(current.pid)}>Edit</button>
//                                 <button className='delete' type='button' onClick={() => handleDelete(current.pid)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))
//                 }
//             </table>
//             </form>
//             </div>
//         </div>
//     )

//     function handleEdit(pid) {
//         setUpdateState(pid)
//     }
//     function handleDelete(pid) {
//         const newlist = lists.filter((li) => li.pid !== pid)
//         setList(newlist)
//     }
//     function handleSubmit(event) {
//         event.preventDefault()
//         const pid = event.target.elements.pid.value
//         const pname = event.target.elements.pname.value
//         const pdesc = event.target.elements.pdesc.value
//         const pfile=event.target.elements.pfile.File
//         const newlist = lists.map((li) => (
//             li.pid === updateState ? {...li, pid:pid,pname:pname, pdesc: pdesc,pfile:pfile} : li
//         ))

//         setList(newlist)
//         setUpdateState(-1)
//     }
// }

// function EditList({current, lists, setList}) {
//     function handInputpname(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.pid === current.pid ? {...li, pname :value} : li
//         ))

//         setList(newlist)
//     }
//     function handInputpdesc(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.pid === current.pid ? {...li, pdesc :value} : li
//         ))

//         setList(newlist)
//     }
//     function handInputpfile(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.pid === current.pid ? {...li, pfile :File} : li
//         ))

//         setList(newlist)
//     }
//     function handInputpid(event) {
//         const value = event.target.value;
//         const newlist = lists.map((li) => (
//             li.pid === current.pid ? {...li, pid :value} : li
//         ))

//         setList(newlist)
//     }
//     return(
//         <tr>
//             <td><input type="tex" onChange={handInputpid} name='pid' value={current.pid}/></td>
//             <td><input type="text" onChange={handInputpname} name='pname' value={current.pname}/></td>
//             <td><input type="text" onChange={handInputpdesc} name='pdesc' value={current.pdesc}/></td>
//             <td><input type="file" onChange={handInputpfile} name='pfile' value={current.pfile}/></td>
//             <td><button type='submit'>Update</button></td>
//         </tr>
//     )
// }

// function AddList({setList}) {
//     const nameRef = useRef()
//     const idRef = useRef()
//     const pdesc=useRef()
//     const pfile=useRef()
    

//     function handleSubmit(event) {
//         event.preventDefault();
//         const pid=event.target.elements.pid.value;
//         const pname = event.target.elements.pname.value;
//         const pdesc = event.target.elements.pdesc.value;
//         const pfile=event.target.elements.pfile.File;


//         const newlist = {
//             pid: 3,
//             pname,
//             pdesc,
//             pfile
//         }
//         setList((prevList)=> {
//             return prevList.concat(newlist)
//         })
//         nameRef.current.value = ""
//         idRef.current.value = ""
//         pdesc.current.value=""
//         pfile.current.value=""
//     }
//     return(
//         <form className='addForm' onSubmit={handleSubmit}>
//             <label>Project Name:</label>
//             <input type="text" name="pname" placeholder="Enter Project Name" ref={nameRef}/>
//             <br/>
//             <label>Project ID:</label>
//             <input type="text" name="pid" placeholder="Enter ProjectID" ref={idRef}/>
//             <br/>
//             <label>Project File:</label>
//             <input type="file" name="pfile" placeholder="Enter Project file" ref={pfile}/>
//             <br/>
//             <label>Project Description: </label>
//             <input type="text" name="pdesc" placeholder="Enter Project Description" ref={pdesc}/>
//             <button type="submit">Add</button>
//         </form>
//     )
// }

// export default Crud;

import React, { useRef, useState } from 'react'
import './CRUD.css'

function CRUD() {
    const list = [
        {
            id: 1, 
            name: "HP",
            price: "2222"
        },
        {
            id: 2, 
            name: "Dell",
            price: "2445"
        },
       
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return(
        <div className='crud'>
            <div>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.name}</td>
                            <td>{current.price}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                                <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    )
    

    function handleEdit(id) {
        setUpdateState(id)
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const price = event.target.elements.price.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name, price: price} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputname(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name :value} : li
        ))

        setList(newlist)
    }
    function handInputprice(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, price :value} : li
        ))

        setList(newlist)
    }
    return(
        <tr className='tr'>
            <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handInputprice} name='price' value={current.price}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const nameRef = useRef()
    const priceRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value;
        const newlist = {
            id: 3,
            name,
            price
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        nameRef.current.value = ""
        priceRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" ref={nameRef}/>
            <input type="text" name="price" placeholder="Enter Price" ref={priceRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;